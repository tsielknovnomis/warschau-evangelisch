# Backend & Admin-Panel — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Team pflegt Termine + Aktuelles über ein geschütztes `/admin`; öffentliche Seiten lesen aus Supabase; Änderungen sofort live.

**Architecture:** Supabase (Postgres + Auth + RLS) als Datenquelle. `lib/data/*` (async) ersetzt `lib/seed/*` bei gleichen Typen. `/admin` mit E-Mail+Passwort-Login (Supabase Auth), CRUD über Server Actions mit `revalidatePath`.

**Tech Stack:** Next.js 16, `@supabase/ssr`, Supabase, Zod, Vitest, Netlify.

**Spec:** `docs/superpowers/specs/2026-07-01-backend-admin-design.md`

---

## File map
- `lib/supabase/server.ts` — server client (cookies) für Lesen + auth'd Schreiben
- `lib/supabase/middleware.ts` — Session-Refresh Helper
- `middleware.ts` (root) — schützt `/admin/*`
- `lib/data/mappers.ts` — row(snake)↔Typ(camel)
- `lib/data/events.ts`, `lib/data/news.ts` — async Query-Funktionen (ersetzen `lib/seed/*`)
- `lib/actions/events.ts`, `lib/actions/news.ts` — Server Actions (CRUD + revalidate + Zod)
- `app/admin/layout.tsx`, `app/admin/page.tsx`, `app/admin/login/page.tsx`
- `app/admin/termine/**`, `app/admin/aktuelles/**` — Listen + Formulare
- `components/admin/*` — Form-/Listen-Bausteine
- `supabase/migrations/*.sql`, `supabase/seed.sql`
- `.env.local` (gitignored), `.env.example`

---

### Task 0: Supabase-Projekt + Env
- [ ] Projekt via MCP anlegen (EU-Region), Org wählen, `confirm_cost`. Projektname `warschau-evangelisch`.
- [ ] URL + anon key holen (`get_project_url`, `get_publishable_keys`).
- [ ] `.env.local` schreiben: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`. `.env.example` mit Platzhaltern. `.env.local` in `.gitignore` prüfen.
- [ ] `pnpm add @supabase/ssr @supabase/supabase-js zod`
- Verify: `pnpm build` läuft noch (keine Nutzung yet).

### Task 1: DB-Migration (Tabellen + RLS)
- [ ] `apply_migration` mit SQL: Tabellen `events`, `news` exakt nach Spec §3 (uuid pk, Spalten, checks, defaults). Index auf `events(starts_at)`, `news(published_at)`, unique `news(slug)`.
- [ ] RLS aktivieren; Policies: `select` für `anon`+`authenticated`; `insert/update/delete` nur `authenticated`.
- [ ] `get_advisors` (security) prüfen → keine offenen RLS-Warnungen.
- Verify: `list_tables` zeigt beide Tabellen mit RLS enabled.

### Task 2: Supabase-Clients
- [ ] `lib/supabase/server.ts`: `createServerClient` aus `@supabase/ssr` mit `cookies()` (Next 16 async cookies). Export `getSupabase()`.
- [ ] `lib/supabase/middleware.ts` + root `middleware.ts`: Session refresh; wenn Pfad `/admin` und keine Session → redirect `/admin/login`. `matcher: ['/admin/:path*']`.
- Verify: `pnpm build` grün; `/admin` (noch leer) redirectet.

### Task 3: data-Layer (async, ersetzt seed)
- [ ] `lib/data/mappers.ts`: `rowToEvent`, `rowToNews`. **Test zuerst** (`lib/data/mappers.test.ts`): snake→camel korrekt, null-Felder.
- [ ] `lib/data/events.ts`: `getUpcomingEvents()`, `getNextEvent()` (async, order by starts_at, Filter ab jetzt). `lib/data/news.ts`: `getNews()` (pinned first, dann published_at desc), `getPinnedNews()`, `getNewsBySlug()`.
- Verify: `pnpm vitest run lib/data` grün.

### Task 4: Konsumenten auf async umstellen + seed entfernen
- [ ] Imports von `@/lib/seed/events` → `@/lib/data/events`, `@/lib/seed/news` → `@/lib/data/news` in: `app/layout.tsx`, `app/gottesdienste/page.tsx`, `app/aktuelles/[slug]/page.tsx` (auch `generateStaticParams` async), `app/sitemap.ts`, `components/home/AktuellesTeaser.tsx`, `components/home/GottesdienstEinladung.tsx`. Aufrufe `await`en (Komponenten async machen).
- [ ] `dynamicParams` bleibt default true in `aktuelles/[slug]`.
- [ ] `lib/seed/events.ts` + `lib/seed/news.ts` löschen (sermons.ts bleibt).
- Verify: `pnpm build` grün (mit leerer DB → „keine Termine"-Fallback greift).

### Task 5: Auth (Login + Logout)
- [ ] `app/admin/login/page.tsx`: Formular (E-Mail, Passwort) → Server Action `signIn` (`supabase.auth.signInWithPassword`), Fehler anzeigen, bei Erfolg redirect `/admin`.
- [ ] Logout Server Action (`supabase.auth.signOut`) + Button im Admin-Layout.
- Verify: Playwright/manuell — falsche Daten → Fehler; (Account aus Task 9) → Login klappt, `/admin` erreichbar.

### Task 6: Admin-Shell
- [ ] `app/admin/layout.tsx`: geschützt (Session-Check), Kopf mit Nav (Termine · Aktuelles · Logout), Markenlook.
- [ ] `app/admin/page.tsx`: Zähler (kommende Termine, News gesamt) + Links.
- Verify: eingeloggt sichtbar, ausgeloggt redirect.

### Task 7: Admin — Termine (CRUD)
- [ ] `lib/actions/events.ts`: Zod-Schema; `createEvent`, `updateEvent`, `deleteEvent`; jede ruft `revalidatePath('/')` + `revalidatePath('/gottesdienste')`.
- [ ] `app/admin/termine/page.tsx` (Liste, chronologisch), `.../neu/page.tsx`, `.../[id]/page.tsx` (Formular, `components/admin/EventForm.tsx`). Löschen mit `confirm`.
- Verify: anlegen/bearbeiten/löschen; danach `/gottesdienste` zeigt Änderung sofort.

### Task 8: Admin — Aktuelles (CRUD)
- [ ] `lib/actions/news.ts`: Zod (Slug-Format, Pflichtfelder); `createNews`, `updateNews`, `deleteNews`; `revalidatePath('/')`, `/gottesdienste`, `/aktuelles/[slug]`, `/sitemap.xml`. Slug-Vorschlag aus Titel.
- [ ] `app/admin/aktuelles/*` analog zu Termine, `components/admin/NewsForm.tsx`.
- Verify: CRUD + neue News erscheint auf `/gottesdienste#aktuelles` und unter `/aktuelles/<slug>`.

### Task 9: Startinhalte + erster Account
- [ ] `supabase/seed.sql` mit den bisherigen Platzhalter-Terminen/-News (aus dem alten seed) → einmalig einspielen, damit die Seite nicht leer ist.
- [ ] Einen Admin-Account anlegen (MCP/Studio) mit Platzhalter-Mail; in OPEN_ITEMS notieren, dass echte Team-Accounts + echte Inhalte vom Verein kommen.
- Verify: Home/Termine zeigen Inhalte; Login mit dem Account klappt.

### Task 10: Env auf Netlify + Deploy + Verify
- [ ] `netlify env:set` für `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- [ ] `netlify deploy --build --prod`.
- [ ] Live-Verify: öffentliche Seiten laden Daten; `/admin` geschützt; Login + eine Mutation live sichtbar; `get_advisors` sauber.
- [ ] `PROJECT_STATE.md` + `OPEN_ITEMS.md` aktualisieren.

---

## Self-Review
- **Spec-Abdeckung:** §1 Scope→T4/T7/T8; §3 Datenmodell→T1; §4 Auth/RLS→T1/T2/T5; §5 data-Layer→T3/T4; §6 Panel→T6/T7/T8; §7 Revalidation→T7/T8 (+dynamicParams T4); §8 Tests→T3; §9 Env→T0/T10; §10 offene Punkte→T9. Abgedeckt.
- **Placeholder:** keine offenen „TBD"; T9 Team-Accounts/Inhalte sind bewusst extern (Spec §10).
- **Typkonsistenz:** Funktionsnamen identisch zu bisherigen seed-Signaturen (`getUpcomingEvents/getNextEvent/getNews/getPinnedNews/getNewsBySlug`) → Konsumenten brauchen nur `await`.
