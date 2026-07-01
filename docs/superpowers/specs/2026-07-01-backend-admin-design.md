# Backend & Admin-Panel — Design (Termine + Aktuelles)

**Goal:** Ein passwortgeschütztes `/admin` in der bestehenden Next.js-App, mit dem das
Gemeinde-Team **Termine (Gottesdienste)** und **Aktuelles (News)** selbst pflegt.
Die öffentliche Website liest diese Daten künftig aus **Supabase** statt aus den
typed seed-Modulen. Änderungen sind nach dem Speichern sofort live.

**Tech:** Next.js 16 (App Router, Server Components + Server Actions), Supabase
(Postgres + Auth + Row-Level-Security), `@supabase/ssr`, Zod (Validierung), Netlify.

---

## 1. Scope

**Im Scope**
- Supabase als Datenquelle für **Events** und **News**.
- `/admin`-Panel: Login + CRUD (Anlegen/Bearbeiten/Löschen) für Termine & News.
- On-demand Revalidation: Speichern → betroffene öffentliche Seiten sofort aktuell.
- Migration: `lib/seed/events.ts` + `lib/seed/news.ts` → Supabase-Abfragen.

**Nicht im Scope** (bewusst)
- Predigten (bleiben unverändert, seed/statisch), Predigt-Sektion der Startseite bleibt wie sie ist.
- Bild-Upload / Supabase Storage (später ergänzbar).
- Kernseiten (Markdown in `content/pages/de/`) — bleiben im Code.
- Archiv, Materialien, mehrsprachigkeit.

**Unverändert:** Die Typen in `lib/types.ts` (`ChurchEvent`, `NewsItem`) bleiben 1:1.
Alle konsumierenden Komponenten bleiben — sie erhalten dieselben Typen, nur `async`/`await`.

---

## 2. Architektur

```
Öffentliche Seiten (SSG/ISR)  ──lesen──►  lib/data/*.ts  ──►  Supabase (anon, RLS: public read)
        ▲                                                          ▲
        │ revalidatePath() nach CRUD                               │ schreiben (authenticated)
        │                                                          │
   /admin (geschützt)  ──Server Actions──►  lib/data/*.ts (mutations)
        ▲
   Supabase Auth (E-Mail + Passwort, Session-Cookie)
```

- **Lesen:** Server Components rufen `lib/data/events.ts` / `lib/data/news.ts` (async) auf.
  Diese ersetzen die bisherigen `lib/seed/*`-Funktionen bei gleichem Namen & Rückgabetyp.
- **Schreiben:** Nur im `/admin` über Server Actions; RLS lässt Schreiben nur für eingeloggte Nutzer zu.
- **Aktualität:** Jede Mutation ruft `revalidatePath(...)` für die betroffenen Seiten.

---

## 3. Datenmodell (Supabase)

Zwei Tabellen, 1:1 zu den bestehenden Typen. Spalten `snake_case` in Postgres, das
data-Layer mappt auf die `camelCase`-Felder der TS-Typen.

### `events`  (→ `ChurchEvent`)
| Spalte | Typ | Notiz |
|---|---|---|
| id | uuid pk default gen_random_uuid() | |
| title | text not null | |
| starts_at | timestamptz not null | → `startsAt` |
| ends_at | timestamptz null | → `endsAt` |
| location | text not null | Default „ul. Miodowa 21, 2. Stock (Synodalsaal)" im Formular |
| description | text null | |
| is_special | boolean not null default false | → `isSpecial` |
| with_communion | boolean not null default false | → `withCommunion` |
| language | text not null default 'de' | check in ('de','pl','multi') |
| created_at | timestamptz default now() | Sortier-/Audit-Hilfe |

### `news`  (→ `NewsItem`)
| Spalte | Typ | Notiz |
|---|---|---|
| id | uuid pk default gen_random_uuid() | |
| slug | text not null unique | im Formular aus Titel vorgeschlagen, editierbar |
| title | text not null | |
| body | text not null | Markdown |
| excerpt | text not null | |
| cover_image | text null | vorerst immer null (kein Upload) |
| pinned | boolean not null default false | steuert die obere Leiste / Announcement |
| published_at | timestamptz not null default now() | → `publishedAt` |
| created_at | timestamptz default now() | |

**RLS (beide Tabellen):**
- `SELECT`: erlaubt für alle (anon) — öffentliche Website liest.
- `INSERT/UPDATE/DELETE`: nur `auth.role() = 'authenticated'`.

Migrationen liegen unter `supabase/migrations/` (Supabase CLI). Optionaler Seed
(`supabase/seed.sql`) füllt die aktuellen Platzhalter-Termine/-News als Startinhalt,
damit die Seite nicht leer ist; das Team ersetzt sie im Panel.

---

## 4. Auth & Sicherheit

- **Supabase Auth**, E-Mail + Passwort. Team-Accounts werden **einmalig manuell**
  angelegt (Supabase Studio / Admin-API). **Keine Selbst-Registrierung** (Sign-up aus).
- **Login-Seite:** `/admin/login`. Nach Login Session-Cookie via `@supabase/ssr`.
- **Schutz:** `middleware.ts` (oder ein `/admin`-Layout-Guard) leitet nicht-eingeloggte
  Zugriffe auf `/admin/*` zu `/admin/login`. Logout-Button im Panel.
- **RLS** ist die eigentliche Sicherheitsgrenze (nicht nur die UI): Schreiben serverseitig
  nur mit gültiger Session. Der `service_role`-Key wird **nie** im Client verwendet.
- **Keys:** `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Client/Server-Lesen);
  Schreiben läuft über den auth'd Server-Client (anon key + Session). `service_role`
  nur für einmalige Migrations-/Admin-Skripte, als Netlify-Env, nie im Bundle.

---

## 5. Datenzugriffs-Layer (`lib/data/`)

Ersetzt `lib/seed/`. Gleiche Funktionsnamen & Rückgabetypen wie bisher, aber `async`:

- `lib/data/events.ts`: `getUpcomingEvents()`, `getNextEvent()` → `Promise<...>`
- `lib/data/news.ts`: `getNews()`, `getPinnedNews()`, `getNewsBySlug(slug)` → `Promise<...>`
- `lib/data/mappers.ts`: row (snake_case) → TS-Typ (camelCase).
- `lib/supabase/server.ts`: Server-Supabase-Client (Cookies) via `@supabase/ssr`.
- `lib/supabase/admin-actions.ts` (o.ä.): Server Actions für Create/Update/Delete + `revalidatePath`.

Konsumenten, die auf `await` umgestellt werden (bereits identifiziert):
`app/layout.tsx` (getNextEvent), `app/gottesdienste/page.tsx`, `app/aktuelles/[slug]/page.tsx`
(inkl. `generateStaticParams` → async), `app/sitemap.ts`, `components/home/AktuellesTeaser.tsx`,
`components/home/GottesdienstEinladung.tsx`. (`PredigtenTeaser`/Sermon-Pfad bleibt seed.)

---

## 6. Admin-Panel (UX)

Routen unter `app/admin/`:
- `/admin` — Übersicht (kurze Zähler: kommende Termine, News) + Navigation.
- `/admin/termine` — Liste (chronologisch), Buttons Neu / Bearbeiten / Löschen.
- `/admin/termine/neu`, `/admin/termine/[id]` — Formular.
- `/admin/aktuelles` — Liste (nach Datum), gleiche Aktionen.
- `/admin/aktuelles/neu`, `/admin/aktuelles/[id]` — Formular.
- `/admin/login`, Logout-Action.

**Formulare:** schlicht, im Markenlook (Aubergine/Gold, Fraunces/Spectral). Felder
entsprechen den Tabellen. News-Slug wird aus dem Titel vorgeschlagen (editierbar).
**Validierung:** Zod serverseitig in den Server Actions (Pflichtfelder, Slug-Format,
Datum). Löschen mit Bestätigungs-Rückfrage. Erfolg/Fehler als schlichte Meldung.

**Größenlimits beachten:** Server Actions & Formulare in fokussierte Dateien halten
(≤ 800 Zeilen/Datei, ≤ 80 Zeilen/Funktion).

---

## 7. Rendering & Aktualität

- Öffentliche Seiten bleiben statisch/ISR und lesen zur Build-/Revalidate-Zeit aus Supabase.
- **On-demand Revalidation:** Nach jeder Mutation ruft die Server Action die passenden
  `revalidatePath(...)` auf:
  - Termine → `/`, `/gottesdienste` (und Layout-Leiste über `/`).
  - News → `/`, `/gottesdienste`, `/aktuelles/[slug]`, `/sitemap.xml`.
- Ergebnis: Team speichert → Seite in Sekunden aktuell, Auslieferung bleibt schnell.
- **Neue News-Detailseiten:** `app/aktuelles/[slug]` behält `generateStaticParams` (async),
  aber `dynamicParams = true` (Default) bleibt aktiv, damit ein frisch angelegter Slug
  auch ohne Rebuild on-demand gerendert wird (kein 404).

---

## 8. Testing

- **Vitest** für `lib/data/mappers.ts` (row↔Typ) und die Query-Helper (mit gemocktem Client).
- Ein Rendering-Smoke-Test: Seiten bauen mit leerer und gefüllter Datenlage (Fallback „keine Termine").
- Manuell/Playwright vor Go-Live: Login, je 1× Anlegen/Bearbeiten/Löschen pro Bereich,
  Revalidation sichtbar; RLS-Check (ausgeloggt kann nicht schreiben).

---

## 9. Umgebung & Deployment

- Neues Supabase-Projekt (EU-Region). Migrationen via Supabase CLI.
- Netlify-Env: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  (+ `SUPABASE_SERVICE_ROLE_KEY` nur falls für Setup-Skripte nötig, nicht im Client).
- Lokale `.env.local` (gitignored), `.env.example` dokumentiert die Keys.

---

## 10. Offene Punkte (Verein / vor Go-Live)

- Supabase-Projekt anlegen (Moritz) + Team-Accounts (E-Mail/Passwort) einmalig einrichten.
- Echte erste Termine/News eintragen (ersetzen die Platzhalter).
- (Später optional: Bild-Upload, Predigt-Pflege, Archiv.)
