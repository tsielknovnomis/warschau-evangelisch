# CLAUDE.md — warschau-evangelisch

## Was das ist
Relaunch der Website der **Deutschsprachigen Evangelischen Seelsorge in Warschau** (DEGWAW) —
deutschsprachige evangelisch-lutherische Gemeinde, eingetragener Verein (KRS 0000590323).
Ersetzt die alte WordPress-Seite. Inhalt & Struktur bleiben im Kern erhalten, Optik/Technik neu
("behutsam klassisch": würdevoll, Aubergine #480048, Lutherrose).

## Stack (real)
- **Next.js 16** (App Router), **TypeScript strict**, **Tailwind CSS v4** (CSS-first `@theme`)
- Content: statische Kernseiten als Markdown in `content/pages/de/` (react-markdown + gray-matter)
- Dynamische Daten (News/Predigten/Termine): aktuell **typed seed** in `lib/seed/` — Plan 2 ersetzt durch **Supabase**
- Karte: Leaflet/OpenStreetMap (kein Google). Predigt-Videos: 2-Klick-YouTube (DSGVO).
- Tests: Vitest. Deploy: Netlify.

## Commands
- `pnpm dev` — Dev-Server (Port 3000)
- `pnpm build` — Production-Build (38 Seiten static/SSG)
- `pnpm test` — Vitest
- `pnpm lint` — ESLint

## Wichtige Konventionen
- **Eine Fakten-Quelle:** `lib/site-config.ts` (Adresse, Bank, Kontakt, Personen, Social). Nichts duplizieren.
- **Offene Fakten** sind mit `verify: true` / `TODO(verify)` markiert — siehe `OPEN_ITEMS.md`. NICHT als final behandeln.
- Seed-Module (`lib/seed/*.ts`) liefern exakt die Interfaces aus `lib/types.ts` — beim Supabase-Umbau (Plan 2) nur die Datenquelle tauschen, Komponenten bleiben.
- Hard-Limits: max 800 Zeilen/File, 80 Zeilen/Function.
- Sprache i18n-ready (next-intl installiert, aktuell nur DE).

## Status & Doku
- `PROJECT_STATE.md` — Logbuch (zuerst lesen)
- `SPEC.md` — Bauvorlage
- `OPEN_ITEMS.md` — offene Fakten (vor Go-Live klären)
- `scraped/` — Archiv + Analyse der Alt-Seite (Referenz für Migration)
- `docs/superpowers/plans/` — Implementierungspläne

## URLs
- Preview: https://warschau-evangelisch-relaunch.netlify.app
- Production (alt, noch WordPress): https://warschau-evangelisch.de — **nicht anfassen bis Go-Live freigegeben**

## Nicht vergessen
- Production-Domain-Switch + echte Bankdaten/Pfarrer erst nach Freigabe durch Moritz/Gemeinde.
