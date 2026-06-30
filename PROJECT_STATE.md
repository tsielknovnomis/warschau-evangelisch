# PROJECT_STATE — warschau-evangelisch

**Status:** ✅ **Plan 1 fertig & live (Preview).** Komplette öffentliche Website gebaut (Next.js, 38 Seiten), deployed auf **https://warschau-evangelisch-relaunch.netlify.app** (Preview-Site, NICHT die echte Domain). Nächster Schritt: Plan 2 (Supabase-Backend) — und offene Fakten bestätigen (OPEN_ITEMS.md) vor echtem Go-Live.

## Ziel
Relaunch von https://warschau-evangelisch.de/ — komplett neu gebaut & modernisiert, **Inhalt & Struktur im Kern erhalten, Optik deutliches Redesign**. Alt: WordPress 7.0, Theme "Responsive Brix 4.9.13" (~2015), Inhalte 2015–2026.

## Entscheidungen (30.06.2026 — final mit Auftraggeber)
- **Stack:** Next.js 15 (App Router) + TS + Tailwind + shadcn/ui. **Supabase** (Auth + DB) als leichtes Backend. Deploy: Netlify.
- **Sprache:** Deutsch, technisch **i18n-ready** (PL später ergänzbar).
- **Termine:** **eigenes Termin-Modul im Backend** (kein Google Calendar mehr).
- **Backend pflegbar:** Aktuelles/News + Predigt-Archiv + Termine. Kernseiten (Über uns, Geschichte, Satzung …) pflegt Moritz im Code.
- **Design:** **behutsam klassisch** — kirchlich-würdevolle Identität bewahren (Aubergine #480048, Lutherrose), solide modernisieren (Typo-Skala, Spacing, A11y, responsiv).
- **Archiv:** Alle ~113 Alt-Beiträge (2015–2021) als durchsuchbares Archiv migrieren.
- **Medien:** YouTube-Predigten (DSGVO-2-Klick) + Instagram/Facebook. Twitter/X raus.
- **Adresse final geklärt:** ul. Miodowa 21, 00-246 Warszawa (offiziell bestätigt).

## Autonomie-Auftrag
Moritz ist abwesend und hat **autonomes Durcharbeiten** autorisiert ("mach einfach alles"): Spec → Plan → Build → Mockups. Offene Fakten in [OPEN_ITEMS.md](OPEN_ITEMS.md) mit `TODO(verify)` markieren, mit Arbeitsannahmen weiterbauen.

## Recently Done (30.06.2026) — Redesign
- **Design komplett überarbeitet** nach Feedback ("top notch, individueller, besser als alt"): neue Ästhetik **„Sakrales Editorial"** — warmes Pergament + Aubergine + Antikgold (Coral raus), **Fraunces** (Display) + **Spectral** (Body), Papierkörnung, Gold-Haarlinien.
- **Hero neu**: Altar-Bild im Kirchen-Rundbogen + Strahlenkranz + Page-Load-Animation.
- **Header**: zweistufig, hoher Kontrast, Gold-Underline-Nav.
- Alle Komponenten + Seiten überarbeitet, dunkler Aubergine-Footer/Spendenkonto. Neu deployed.

## Recently Done (Plan 1)
- **Spec + Plan** geschrieben (SPEC.md, docs/superpowers/plans/2026-06-30-public-site-foundation.md)
- **Plan 1 komplett gebaut**: Next.js 16 + Tailwind v4, Design-System (Aubergine, Lutherrose-SVG, Spectral+Open Sans), Layout (Header/Nav/Drawer/Footer/AnnouncementBar), Startseite, alle 10 Kernseiten (Content aus Alt-Seite migriert), Gottesdienste/Termine, Predigten (17, 2-Klick-YouTube), Aktuelles, durchsuchbares Archiv (112 Alt-Beiträge), Impressum/Datenschutz, OSM-Karte, Redirects, sitemap/robots, Favicon
- **Deployed** → https://warschau-evangelisch-relaunch.netlify.app (Preview)
- Adresse final geklärt: Miodowa 21, 00-246

## Next Up
- **Plan 2 — Supabase-Backend**: Tabellen (news/sermons/events) + Auth + Admin-CRUD unter /admin. Seed-Module in `lib/seed/` haben bereits das passende Interface → nur Datenquelle tauschen.
- **Plan 4 — Archiv-Detailseiten**: die 112 Alt-Beiträge als Einzelseiten + Redirects der alten Slugs.
- **Offene Fakten bestätigen** (OPEN_ITEMS.md): Bankkonto, QR-Code, amtierender Pfarrer.
- **Echter Go-Live**: Domain warschau-evangelisch.de auf neue Seite umstellen (erst nach Fakten-Freigabe).

## Offen (siehe OPEN_ITEMS.md)
Bankkonto, QR-Code, amtierender Pfarrer — vor echtem Go-Live bestätigen. Im Code mit `TODO(verify)` markiert.

## Recently Done
- Vollständiger Scrape: 126 Seiten (Markdown), 13 Kern-Seiten (Raw-HTML), 40 Bilder, 2 PDFs, Theme-CSS, 4 Screenshots
- Design-Tokens erfasst: Primär #480048 (Aubergine), Akzent #F3595B, Creme #F6F3ED, Open Sans
- 17 YouTube-Predigt-Videos + externe Links + Twitter @degwaw identifiziert

## Known Issues / Notizen
- Alt-Seite hat viel Karteileichen (`/__trashed`, author/category-Archive, 113 historische Gottesdienst-Posts)
- Predigt-Videos liegen auf YouTube (nicht selbst-gehostet) → Re-Hosting offen
- Stack für Neubau noch nicht entschieden (Default wäre Next.js, aber ggf. einfacher für nicht-technische Pflege)

## Verzeichnis
```
scraped/
├── content/       126 Seiten als Markdown (mit Frontmatter url/title/slug)
├── html/          13 Kern-Seiten als Raw-HTML
├── assets/
│   ├── images/    40 Bilder (year/month-Struktur erhalten)
│   ├── pdfs/      moege_die_strasse.pdf, Beitrittserklaerung.pdf
│   └── css/       Theme- + Plugin-CSS + Google-Fonts
├── screenshots/   Home (Desktop+Mobile), Gottesdienste, Über uns
├── SITE_STRUCTURE.md / DESIGN_SYSTEM.md / ASSET_INVENTORY.md / KEY_FACTS.md / SCRAPE_REPORT.md
.firecrawl/        Roh-Dumps & Manifeste (gitignored)
```
