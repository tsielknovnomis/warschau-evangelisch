# Warschau-Evangelisch — Website der Gemeinde

Website der **Deutschsprachigen Evangelischen Seelsorge in Warschau** (DEGWAW) — einer deutschsprachigen evangelisch-lutherischen Gemeinde in Warschau, organisiert als eingetragener Verein (KRS 0000590323).

- **Preview:** https://warschau-evangelisch-relaunch.netlify.app
- **Produktion (nach Go-Live):** https://warschau-evangelisch.de
- **Admin-Panel:** `/admin` (Team-Passwort)

Die Seite ersetzt die alte WordPress-Website. Design: „behutsam klassisch" — Aubergine `#480048`, Antikgold, Lutherrose, Serifentypografie (Fraunces + Spectral).

## Was die Seite kann

- **Öffentliche Seiten:** Start, Termine & Aktuelles, Glaube (Leitbild), Anfahrt (Google Maps mit Consent), Über uns, Geschichte, Verein/Beitritt/Satzung, Predigten-Teaser (YouTube 2-Klick), Impressum & Datenschutz (DSGVO, Cookie-Banner)
- **Admin-Panel** (`/admin`): Das Gemeinde-Team pflegt **Termine, Aktuelles und die Info-Leiste** selbst — Änderungen sind **sofort live**, ganz ohne Deployment. Mit Termin-Vorlagen (z. B. „Gottesdienst, nächster Sonntag 09:30") und fertigen Einladungstexten zum Kopieren (WhatsApp/E-Mail × Du/Sie).

## Tech-Stack

| Baustein | Technologie |
|---|---|
| Framework | Next.js 16 (App Router, Server Actions), React 19, TypeScript strict |
| Styling | Tailwind CSS v4 (CSS-first `@theme` in `app/globals.css`) |
| Inhalte (Kernseiten) | Markdown in `content/pages/de/` (react-markdown + gray-matter) |
| Inhalte (Termine/News/Leiste) | **Netlify Blobs** (Store `content`, JSON-Dokumente) — lokal `.data/`, Fallback `data/seed/` |
| Auth (Admin) | Team-Passwort (Env `ADMIN_PASSWORD`) + HMAC-signierte Session-Cookies (`lib/auth.ts`) |
| Tests | Vitest |
| Hosting | Netlify (Auto-Deploy bei Push auf `main`) |

Keine Datenbank, keine externen Dienste, keine laufenden Kosten.

## Lokale Entwicklung

Voraussetzungen: Node 20+, [pnpm](https://pnpm.io).

```bash
pnpm install
cp .env.example .env.local   # ADMIN_PASSWORD eintragen (beliebiger Wert für lokal)
pnpm dev                     # http://localhost:3000
```

- Inhalte kommen lokal aus `.data/*.json` (wird beim ersten Speichern im Admin angelegt); solange nichts gespeichert wurde, greift der Seed-Fallback aus `data/seed/`.
- `pnpm build` — Produktions-Build · `pnpm test` — Tests · `pnpm lint` — ESLint

## Inhalte pflegen

| Was | Wo | Live nach… |
|---|---|---|
| Termine, Aktuelles, Info-Leiste | **Admin-Panel** `/admin` | sofort |
| Kernseiten-Texte (Über uns, Glaube, Impressum …) | `content/pages/de/*.md` bzw. die Seiten unter `app/(site)/` | Git-Push (Auto-Deploy) |
| Zentrale Fakten (Adresse, Bank, Kontakte, Social-Links) | `lib/site-config.ts` — **einzige Quelle**, nichts duplizieren | Git-Push |
| Predigten-Liste | `lib/seed/sermons.ts` | Git-Push |

## Projektstruktur

```
app/
├── (site)/          öffentliche Seiten (statisch/SSG)
├── admin/           Admin-Panel (dynamisch, per Middleware geschützt)
├── layout.tsx       Root-Layout (Fonts, Metadata)
└── sitemap.ts, robots.ts, opengraph-image.png, icon.png
components/
├── admin/           Panel-Bausteine (Formulare, Listen, Einladungstext …)
├── content/, home/, events/, layout/, ui/, motion/, consent/
content/pages/de/    Kernseiten als Markdown
data/seed/           Start-Inhalte (Fallback, solange kein Blob existiert)
lib/
├── actions/         Server Actions (jede Mutation prüft isAdmin())
├── data/            Lese-Funktionen (events, news, settings)
├── storage.ts       Netlify Blobs ↔ lokale .data/ ↔ Seed-Fallback
├── auth.ts          Team-Passwort + Session-Tokens
└── site-config.ts   zentrale Fakten
scripts/             QR-Code-Generatoren (Spenden-Überweisung, WhatsApp)
scraped/             Archiv der alten WordPress-Seite (nur Referenz)
social/              Social-Media-Paket (Content-Ideen, Bios, Profilbilder)
```

## Deployment

Netlify baut automatisch bei jedem Push auf `main`. Nötige Konfiguration in Netlify:

- Env-Variable **`ADMIN_PASSWORD`** (Team-Passwort fürs Admin-Panel; Änderung macht alle Sessions ungültig → danach einmal neu deployen)
- Inhalte liegen im Netlify-Blobs-Store `content` der jeweiligen Site

## Nützliche Skripte

```bash
node scripts/generate-donation-qr.mjs   # Spenden-QR (poln. Überweisungsformat) neu erzeugen
node scripts/generate-whatsapp-qr.mjs   # WhatsApp-Gruppen-QR neu erzeugen
```

(Jeweils nach Änderung der Bankdaten bzw. des Einladungslinks ausführen — Ausgabe landet in `public/images/`.)

## Weitere Dokumentation

- **`OPEN_ITEMS.md`** — offene Punkte + kompletter Go-Live-/Umzugsplan (selbsterklärend)
- **`PROJECT_STATE.md`** — Projekt-Logbuch (Status, Entscheidungen)
- **`CLAUDE.md`** — Konventionen (u. a. Zeiten immer `Europe/Warsaw`, Bibelstellen via `Bibelvers`-Komponente verlinken, max. 800 Zeilen/Datei)
- **`SPEC.md`** — ursprüngliche Bauvorlage

---

*Fragen zur Website: Moritz Thelen · Inhaltliches: Vorstand der Gemeinde (vorstand@warschau-evangelisch.de)*
