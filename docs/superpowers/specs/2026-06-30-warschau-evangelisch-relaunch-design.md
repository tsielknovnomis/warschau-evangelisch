# SPEC — Relaunch warschau-evangelisch.de

**Projekt:** Neubau der Website der *Deutschsprachigen Evangelischen Seelsorge in Warschau* (DEGWAW)
**Datum:** 2026-06-30 · **Status:** Entwurf (vom Auftraggeber zu reviewen)
**Grundlage:** Vollständiger Scrape + Analyse der Alt-Seite (`scraped/`), Entscheidungen mit Auftraggeber.

> Diese Spec ist die verbindliche Bauvorlage. Offene Fakten siehe [OPEN_ITEMS.md](OPEN_ITEMS.md).
> Leitsatz: **Gleiche Seele, besseres Handwerk.** Inhalt & Struktur bleiben im Kern erhalten,
> Technik und Optik werden neu und solide gebaut — Charakter „behutsam klassisch", würdevoll-kirchlich.

---

## 1. Ziele & Nicht-Ziele

### Ziele
- Vollständiger technischer Neubau der Alt-Seite (WordPress → Next.js).
- **Inhalt & Navigationsstruktur erhalten**, behutsam modernisiert.
- **Leichtes Backend**, mit dem das Gemeinde-Team **Aktuelles, Predigten und Termine** selbst pflegt.
- **Predigt-/Gottesdienst-Archiv** der ~113 Alt-Beiträge als durchsuchbares Archiv migrieren.
- Behutsam-klassisches, würdevolles Redesign; A11y- und Mobile-tauglich.
- **i18n-ready** (Deutsch jetzt, Polnisch später ergänzbar).

### Nicht-Ziele (YAGNI)
- Keine Online-Zahlungen/Stripe — Spende bleibt **Banküberweisung + QR** wie bisher.
- Kein Mehrsprachen-Content jetzt (nur die technische Vorbereitung).
- Kein Mitglieder-Login/Community-Bereich. Beitritt bleibt **PDF + E-Mail** (optional schlankes Online-Formular).
- Keine Migration von WordPress-Artefakten (Author-/Category-Archive, Pagination, Trash).
- Kein Newsletter, kein Blog-Kommentarsystem.

---

## 2. Tech-Stack & Architektur

| Layer | Wahl | Begründung |
|---|---|---|
| Framework | **Next.js 15 (App Router)**, TypeScript strict | Server Components, gutes Supabase/Netlify-Ökosystem |
| Styling | **Tailwind CSS** + CSS-Variablen für Design-Tokens | schnelle, konsistente Umsetzung des Design-Systems |
| UI-Primitives | **shadcn/ui** (selektiv) | zugängliche Basis-Komponenten (Dialog, Accordion, Form) |
| Backend/DB/Auth | **Supabase** (Postgres + Auth + Storage) | Redaktions-Login, Tabellen für News/Predigten/Termine, Bild-Uploads |
| i18n | **next-intl**, `localePrefix: 'as-needed'` (DE ohne URL-Präfix, `/pl` später) | Deutsch jetzt, PL später ohne Umbau |
| Deployment | **Netlify** (Continuous Deploy ab GitHub) | Free Tier, Preview-Deploys |
| Versionierung | Git + eigenes GitHub-Repo | pro Projekt ein Repo |

**Rendering-Strategie:**
- Statische Kernseiten (Über uns, Geschichte, Verein, Satzung, Anfahrt, Links, Materialien, Beitrittserklärung): **Server Components**, Inhalt aus dem Code/MDX (pflegt Moritz).
- Dynamische Bereiche (Aktuelles, Predigten, Termine): aus **Supabase** geladen, ISR/Revalidate für Performance.
- Redaktions-Backend unter `/admin` (Auth-geschützt).

**Architektur-Grenzen (jede Unit eine Aufgabe):**
```
app/
  (site)/            ← öffentliche Seiten (de)
  admin/             ← Redaktions-Backend (auth)
  api/               ← Route Handlers (Kontaktformular, iCal-Export)
components/
  layout/            ← Header, Footer, Nav, AnnouncementBar
  content/           ← Accordion, Bibelvers, SpendenkontoCard, ...
  sermons/ events/ news/   ← Domänen-Komponenten
lib/
  supabase/          ← Client/Server-Clients, Typen
  content/           ← MDX-Loader für Kernseiten
content/             ← MDX-Quellen der statischen Seiten (DE)
  pages/de/*.mdx
  archive/*.mdx      ← migrierte 113 Alt-Beiträge
```
Hard-Limits beachten: **max 800 Zeilen/File, 80 Zeilen/Function.**

---

## 3. Informationsarchitektur

### 3.1 Hauptnavigation (erhalten, leicht geglättet)
```
Start                  → /
Gottesdienste          → /gottesdienste
  ├─ Termine           → /gottesdienste          (Termin-Modul)
  └─ Anfahrt           → /gottesdienste/anfahrt
Predigten              → /predigten              (NEU als eigener Menüpunkt: Archiv + Videos)
Über uns               → /ueber-uns
  ├─ Geschichte        → /ueber-uns/geschichte
  └─ Verein            → /ueber-uns/verein
       ├─ Beitrittserklärung → /ueber-uns/verein/beitritt
       └─ Satzung            → /ueber-uns/verein/satzung
Aktuelles              → /aktuelles              (NEU sichtbar: News/Ankündigungen)
```
Sekundär/Footer: Materialien (`/materialien`), Links (`/links`), Archiv (`/archiv`), Impressum (`/impressum`), Datenschutz (`/datenschutz`).

**Begründung der Änderungen ggü. Alt-Seite:**
- **Eine Startseite.** Die alte Doppelung `index` + `home` wird zu einer modernen Startseite zusammengeführt; der alte Blog-Stream wird zu „Aktuelles" + „Predigten".
- **„Predigten" wird eigener Menüpunkt** (war nur Sidebar-Widget) — es ist das aktivste Element.
- **„Aktuelles"** ersetzt das hartkodierte Oster-Banner durch ein pflegbares News-Modul.
- Leere Alt-Seiten (`naechster-gottesdienst`, `beitraege`) entfallen.
- **Impressum + Datenschutz** neu (DSGVO-Pflicht, fehlten/unvollständig).

### 3.2 URL-Migration & Redirects
- Alte Slugs → neue kanonische URLs per `next.config` Redirects (301).
- Beispiele: `/gottesdiensttermine` → `/gottesdienste`; `/gottesdiensttermine/anfahrt` → `/gottesdienste/anfahrt`; `/uber-uns/*` → `/ueber-uns/*`; alte Satzungs-Doppel-URL → `/ueber-uns/verein/satzung`.
- Alle ~113 Alt-Beitrags-Slugs → `/archiv/<normalisierter-slug>` (Mapping-Tabelle aus `.firecrawl/urls-posts.txt`).
- `http://` → `https://` global.

---

## 4. Seiten im Detail (Content-Quelle je Seite)

| Seite | Quelle | Inhalt |
|---|---|---|
| **Start** `/` | statisch + dynamisch | Hero (Altar + Begrüßung + Bibelvers), nächster Gottesdienst (aus Termin-Modul), neueste Predigt (Video), „Aktuelles"-Teaser (1–3 News), Leitbild-Kurzform, Spendenkonto-Karte, Footer |
| **Gottesdienste/Termine** `/gottesdienste` | Backend | Termin-Liste (kommende), Rhythmus-Erklärung, Sommerpause-Hinweis, Ort, iCal-Abo |
| **Anfahrt** `/gottesdienste/anfahrt` | statisch | Adresse (Miodowa 21, 00-246), ÖPNV (jakdojade), Veturilo, Zugang Schillera/2. Stock/Synodalsaal, **Karte** (OpenStreetMap/Leaflet) |
| **Predigten** `/predigten` | Backend | Predigt-Archiv (Karten: Datum, Titel, Bibelstelle, YouTube-2-Klick-Embed), Filter/Suche, Link zum YouTube-Kanal |
| **Über uns** `/ueber-uns` | statisch (MDX) | Selbstbeschreibung (9-Punkte-Liste), Leitbild-Sektionen, Ansprechpartner (Pfarrer `TODO(verify)`, Vorstand), Kontakt-E-Mails |
| **Geschichte** `/ueber-uns/geschichte` | statisch (MDX) | Vollständiger Geschichtstext (migriert) |
| **Verein** `/ueber-uns/verein` | statisch (MDX) | Vereinszweck, KRS 0000590323, Link zu Satzung & Beitritt |
| **Satzung** `/ueber-uns/verein/satzung` | statisch (MDX) | Vollständige Satzung §§1–33 (migriert) |
| **Beitrittserklärung** `/ueber-uns/verein/beitritt` | statisch | 3-Schritte-Anleitung + PDF-Download (+ optional Online-Formular v2) |
| **Aktuelles** `/aktuelles` | Backend | News-/Ankündigungsliste (ersetzt Oster-Banner-Hardcode) |
| **Materialien** `/materialien` | statisch | Liedtext „Möge die Straße…" + PDF |
| **Links** `/links` | statisch | kuratierte Linkliste (auf `https` geprüft, tote raus) |
| **Archiv** `/archiv` | migriert (MDX) | durchsuchbares Verzeichnis der ~113 Alt-Beiträge (2015–2021) |
| **Impressum / Datenschutz** | statisch | NEU — Vereinsdaten, Verantwortlicher, DSGVO |

---

## 5. Backend-Datenmodell (Supabase)

Drei Inhaltstypen + Auth. RLS: öffentlich **lesbar** (nur `published`), schreibbar nur für eingeloggte Redakteure.

```sql
-- news (Aktuelles / Ankündigungen)
news(
  id uuid pk, slug text unique, title text, body markdown,
  excerpt text, cover_image text, pinned bool,          -- pinned = Banner-Ersatz
  published bool, published_at timestamptz,
  created_at, updated_at
)

-- sermons (Predigten)
sermons(
  id uuid pk, slug text unique, title text, preached_on date,
  preacher text, scripture text,                        -- Bibelstelle
  youtube_id text, summary markdown, audio_url text null,
  published bool, created_at, updated_at
)

-- events (Gottesdienst-Termine)
events(
  id uuid pk, title text, starts_at timestamptz, ends_at timestamptz null,
  location text default 'ul. Miodowa 21, 2. Stock (Synodalsaal)',
  description markdown null, is_special bool,            -- z.B. Ostern/ökumenisch
  with_communion bool, language text default 'de',
  published bool, created_at, updated_at
)

-- profiles (Redakteure) — an Supabase auth.users gekoppelt
profiles(id uuid pk -> auth.users, display_name text, role text)  -- role: editor|admin
```

**Admin-Backend** (`/admin`, Auth via Supabase): einfache CRUD-Masken für `news`, `sermons`, `events`. Bild-Upload nach Supabase Storage. Markdown-Editor (klein, z.B. Textarea + Vorschau). Bewusst minimal — „leichtes Backend".

**Öffentliche Reads:** Server Components mit `@supabase/ssr`, nur `published = true`. Termine: kommende nach `starts_at` sortiert; Predigten: nach `preached_on` desc; News: `pinned` zuerst.

**iCal-Export:** `app/api/events/ical/route.ts` generiert `.ics` aus `events` (ersetzt den alten Google-Feed).

---

## 6. Design-System („behutsam klassisch")

### 6.1 Farben (Tokens als CSS-Variablen)
| Token | Wert | Verwendung |
|---|---|---|
| `--aubergine` (Primär) | `#480048` | Marke: Header-Band, Headings-Akzent, Links, aktive Nav |
| `--aubergine-700/600/300/100` | abgestufte Tints/Shades | Hover, Flächen, Rahmen, dezente Hintergründe |
| `--cream` | `#F6F3ED` | warmer Sektions-/Karten-Hintergrund |
| `--coral` (Akzent, sparsam) | `#F3595B` | nur primäre CTAs/Hervorhebung |
| `--ink` (Text) | `#2E2A2E` | Fließtext — dunkler als alt (#666) für WCAG-AA |
| `--muted` | `#6B656B` | Sekundärtext, Captions |
| `--line` | `#E4DFE0` | dezente Trennlinien (weniger hart als #DDD) |
| `--bg` | `#FFFFFF` | Grundhintergrund |
Kontrast: alle Text/BG-Kombis ≥ WCAG-AA. Koralle nur als Fläche mit weißem Bold-Text als CTA.

### 6.2 Typografie
- **Headings & Bibelverse:** ruhige Serif für den „kirchlich-würdevollen" Charakter — **Spectral** (selbst gehostet via `next/font`; dokumentierte Alternative: Lora). Finale Wahl wird in der Design-Phase mit einem Mockup-Vergleich bestätigt.
- **Body & UI:** **Open Sans** beibehalten (Kontinuität zur Alt-Seite), selbst gehostet.
- **Skala:** Body **18px** / line-height **1.6** (statt 14px/2em); H1 ~clamp(2.2rem,5vw,3.2rem), H2 ~1.9rem, H3 ~1.4rem. Maßvolle Maßeinheiten, keine gesperrten Versalien als Fließtext.

### 6.3 Layout
- Fluider zentrierter Container (max ~`72rem`/1152px Content, breitere Bänder full-bleed).
- Aubergine-**Header-Band** mit Lutherrose + Wortmarke links, Nav rechts; Mobile = Burger/Drawer.
- **Announcement-Bar** (oben, schmal) = oberste **gepinnte News** (dynamisch, nicht hardcodiert).
- Großzügiger Weißraum, sparsame Linien, klare Sektions-Rhythmik.
- Breakpoints: 640 / 768 / 1024 / 1280.

### 6.4 Kernkomponenten
- **Header / Nav / Drawer**, **AnnouncementBar**, **Footer** (Spendenkonto, Sitemap, Kontakt, Social: YouTube/Instagram/Facebook, KRS-Badge, dynamisches `© <Jahr>`).
- **Hero** (Altar-Bild + ruhiges Aubergine-Overlay + Headline + Bibelvers).
- **Accordion** (Leitbild) mit echten ARIA-Attributen.
- **Bibelvers/Blockquote** (Serif, würdevoll, ohne 2015er-Uppercase).
- **SermonCard** + **YouTubeLite** (DSGVO-2-Klick-Embed).
- **EventList / EventCard** (+ „nächster Gottesdienst"-Hervorhebung).
- **NewsCard / NewsTeaser**.
- **SpendenkontoCard** (Kontodaten + QR-Platzhalter bis Konto bestätigt).
- **Map** (Leaflet/OSM, kein Google).
- **Button** (sanfter Radius 4–6px, ruhige Hover/Focus-Ringe, kein Hard-Shadow).

### 6.5 Assets
- **Lutherrose** als **SVG nachbauen** (skaliert scharf) + Favicon/Icon-Set ableiten.
- **Altar Miodowa** als Hero (optimiert, `next/image`).
- Stockbilder (Pixabay wheat/fruit/table) → durch lizenzfreie/eigene Motive ersetzen oder weglassen.
- Flickr-Fotos (2025/12) **nicht verwenden** (keine Lizenz).

---

## 7. Medien & Social
- **Predigt-Videos:** YouTube bleibt Hosting; Einbindung als **2-Klick/Consent-Embed** (lite-youtube, lädt YouTube erst nach Klick → DSGVO). YouTube-Kanal verlinkt.
- **Social:** Footer-Icons → **YouTube-Kanal, Instagram, Facebook** (`facebook.com/warschauevangelisch`). **Twitter/X raus.**
- Videos zusätzlich vorsorglich als Backup-Liste dokumentiert (`ASSET_INVENTORY.md`).

---

## 8. Content-Migration
- **Kernseiten** (Über uns, Geschichte, Verein, Satzung, Materialien, Links, Anfahrt, Beitritt): Markdown aus `scraped/content/` → **MDX** unter `content/pages/de/`, redaktionell geglättet (Tippfehler, tote Links, Adressen korrigiert).
- **Archiv (~113 Posts):** Skript wandelt `scraped/content/<post>.md` → `content/archive/<slug>.mdx` mit Frontmatter (Datum, Titel, Originalbild). Durchsuchbares Verzeichnis unter `/archiv`. Bilder aus `scraped/assets/images/` übernehmen.
- **Fakten** zentral in `lib/site-config.ts` (Adresse, Bank, Kontakt, Personen) — eine Quelle, `TODO(verify)`-markiert für offene Punkte.

---

## 9. A11y, SEO, Datenschutz
- Semantisches HTML, ARIA für Accordion/Drawer/Dialog, Fokus-Ringe, Skip-Link, Tastatur-Navigation, Alt-Texte.
- Meta/OG pro Seite, `sitemap.xml`, `robots.txt`, strukturierte Daten (Organization/Church, Events).
- **Datenschutz/Impressum** vollständig; YouTube erst nach Consent; keine unnötigen Cookies; E-Mail-Adressen geschützt darstellen.

---

## 10. Implementierungs-Phasen (Grob; Detail im Plan)
1. **Scaffold:** Next.js + TS + Tailwind + shadcn + ESLint/Prettier, Git-Repo, Netlify-Setup, `site-config`.
2. **Design-System:** Tokens, Fonts, Basis-Komponenten (Header/Footer/Nav/Button/Bibelvers), Lutherrose-SVG.
3. **Statische Kernseiten** aus migriertem Content (MDX-Pipeline).
4. **Supabase:** Schema/Migrationen, RLS, Clients, Seed.
5. **Dynamische Module:** Termine, Predigten (YouTubeLite), Aktuelles + Startseite-Komposition.
6. **Admin-Backend** (`/admin`, Auth, CRUD).
7. **Archiv-Migration** (~113 Posts) + Suche.
8. **Redirects, SEO, A11y, Datenschutz/Impressum.**
9. **Verifikation** (Build, Lighthouse, Mobile, Links) + Mockup-Screenshots für Moritz.

---

## 11. Offene Punkte
Siehe [OPEN_ITEMS.md](OPEN_ITEMS.md): Bankkonto + QR, amtierender Pfarrer. Bis dahin Arbeitsannahmen mit `TODO(verify)`.

## 12. Review-Hinweis
Diese Spec wurde autonom erstellt (Auftraggeber abwesend, autonomes Arbeiten autorisiert).
**Bitte bei Rückkehr prüfen** — insbesondere: Navigation/IA (§3), Backend-Umfang (§5), Design-Richtung (§6).
