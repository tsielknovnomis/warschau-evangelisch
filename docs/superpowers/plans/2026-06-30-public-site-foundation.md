# Public Site Foundation — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans (inline) to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the complete public-facing website for warschau-evangelisch.de — design system, layout, and all core pages with migrated content — as a fully working static Next.js app. Dynamic modules (Termine/Predigten/Aktuelles) render from a static seed now; Supabase wiring is Plan 2.

**Architecture:** Next.js 15 App Router (TypeScript strict). Tailwind + CSS-variable design tokens. Static core pages from MDX content (migrated from the scrape). Dynamic-looking sections (events, sermons, news) read from typed seed modules in `lib/seed/` with the SAME interface Supabase will later provide, so Plan 2 only swaps the data source. i18n-ready via next-intl (`localePrefix: 'as-needed'`, default `de`, no prefix).

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS, next/font (Spectral + Open Sans), next-intl, lite-youtube-embed, Leaflet (OSM), Vitest (logic tests), Playwright (visual checks).

**Source of truth for content:** `scraped/content/*.md`, `scraped/assets/`, and the 5 analysis docs in `scraped/`. Facts: `KEY_FACTS.md`. Open facts: `OPEN_ITEMS.md` (mark `TODO(verify)`).

---

## File Structure

```
app/
  layout.tsx                  root layout: fonts, <html lang>, metadata, AnnouncementBar+Header+Footer
  page.tsx                    Start (/)
  gottesdienste/page.tsx      Termine (seed)
  gottesdienste/anfahrt/page.tsx
  predigten/page.tsx          Sermon archive (seed)
  predigten/[slug]/page.tsx
  ueber-uns/page.tsx
  ueber-uns/geschichte/page.tsx
  ueber-uns/verein/page.tsx
  ueber-uns/verein/satzung/page.tsx
  ueber-uns/verein/beitritt/page.tsx
  aktuelles/page.tsx          News (seed)
  aktuelles/[slug]/page.tsx
  materialien/page.tsx
  links/page.tsx
  archiv/page.tsx             index of migrated posts (Plan 4 fills detail)
  impressum/page.tsx
  datenschutz/page.tsx
  sitemap.ts  robots.ts
components/
  layout/{Header,Nav,MobileDrawer,AnnouncementBar,Footer}.tsx
  ui/{Button,Container,SectionHeading,Prose,Bibelvers,Card}.tsx
  content/{SpendenkontoCard,KontaktBlock,Lutherrose}.tsx
  sermons/{SermonCard,SermonList,YouTubeLite}.tsx
  events/{EventCard,EventList,NextServiceBadge}.tsx
  news/{NewsCard,NewsTeaser}.tsx
  map/AnfahrtMap.tsx
lib/
  site-config.ts              all hard facts (address, bank, contacts, social, people)
  types.ts                    Event, Sermon, NewsItem, ArchiveEntry interfaces
  seed/{events,sermons,news}.ts   typed seed data (Plan 2 replaces with Supabase reads)
  content/mdx.ts              MDX loader for content/pages/de
  format.ts                   date/time helpers (de-DE)
content/pages/de/*.mdx         migrated core-page content
styles/tokens.css             CSS variables (colors, spacing, radius)
public/brand/                 lutherrose.svg, favicons, og image
scripts/migrate-archive.ts    (Plan 4) — placeholder noted, not built here
```

**Hard limits:** max 800 lines/file, 80 lines/function. Split when approaching.

---

## Phase A — Project Setup

### Task A1: Scaffold Next.js app in repo root

**Files:** creates `package.json`, `app/`, `tsconfig.json`, `next.config.ts`, `tailwind` config, `postcss`.

- [ ] **Step 1:** Scaffold with pnpm into current dir (non-interactive):
```bash
pnpm dlx create-next-app@latest . --ts --tailwind --app --eslint --src-dir=false \
  --import-alias "@/*" --use-pnpm --no-turbopack --yes
```
Expected: app created; if it warns about non-empty dir, allow it (scraped/, docs/, *.md coexist).
- [ ] **Step 2:** Verify dev server boots: `pnpm dev` → open http://localhost:3000 → default page renders. Stop server.
- [ ] **Step 3:** Add libs:
```bash
pnpm add next-intl lite-youtube-embed leaflet && pnpm add -D vitest @testing-library/react @vitejs/plugin-react jsdom @playwright/test
```
- [ ] **Step 4:** Confirm `pnpm build` succeeds (empty app). Expected: build passes.
- [ ] **Step 5:** Commit: `git add -A && git commit -m "chore: scaffold next.js app"`

### Task A2: Tooling config (vitest, strict TS, prettier)

- [ ] **Step 1:** Add `vitest.config.ts` (jsdom env, react plugin, `@` alias).
- [ ] **Step 2:** Ensure `tsconfig.json` has `"strict": true`.
- [ ] **Step 3:** Add `"test": "vitest run"` to package scripts.
- [ ] **Step 4:** Write smoke test `lib/__tests__/smoke.test.ts` asserting `1+1===2`; run `pnpm test` → PASS.
- [ ] **Step 5:** Commit: `chore: add vitest + strict ts config`.

### Task A3: Central site config + types (TDD)

**Files:** Create `lib/site-config.ts`, `lib/types.ts`, Test `lib/__tests__/site-config.test.ts`.

- [ ] **Step 1 (failing test):** assert `siteConfig.address.postalCode === '00-246'`, `siteConfig.bank.bic === 'PPABPLPK'`, `siteConfig.contact.general === 'info@warschau-evangelisch.de'`, and that `siteConfig.people.pastor.verify === true`.
- [ ] **Step 2:** Run → FAIL (module missing).
- [ ] **Step 3:** Implement `lib/types.ts` (interfaces: `Event`, `Sermon`, `NewsItem`, `ArchiveEntry`, `SiteConfig`) and `lib/site-config.ts` from `KEY_FACTS.md`:
  - address: `ul. Miodowa 21, 00-246 Warszawa`, access note (Schillera, 2. Stock, Synodalsaal)
  - bank: BNP Paribas, PLN `13 1600 1462 1728 8283 8000 0001`, EUR/IBAN `PL56 1600 1462 1728 8283 8000 0003`, BIC `PPABPLPK` — with `verify: true`
  - contacts: info@, pfarrer@
  - people: pastor `Dr. Grzegorz Olek` `{verify:true}`, board [Jürgen Wandel, Jens Boysen, Simon von Kleist]
  - social: youtube channel + playlist, instagram, facebook (`facebook.com/warschauevangelisch`); NO twitter
  - krs: `0000590323`
- [ ] **Step 4:** Run test → PASS.
- [ ] **Step 5:** Commit: `feat: central site config and domain types`.

---

## Phase B — Design System

### Task B1: Design tokens

**Files:** Create `styles/tokens.css`; modify `app/globals.css`, `tailwind.config.ts`.

- [ ] **Step 1:** `styles/tokens.css` with CSS vars from SPEC §6.1 (`--aubergine` + tints 700/600/300/100, `--cream`, `--coral`, `--ink #2E2A2E`, `--muted`, `--line`, `--bg`) and radii/spacing.
- [ ] **Step 2:** Map tokens into `tailwind.config.ts` theme.extend.colors (aubergine, cream, coral, ink, muted, line).
- [ ] **Step 3:** Import tokens in `globals.css`; set base body color/bg.
- [ ] **Step 4:** Build passes. Commit: `feat: design tokens (aubergine palette)`.

### Task B2: Self-hosted fonts

- [ ] **Step 1:** In `app/layout.tsx` load Spectral (headings/serif) + Open Sans (body) via `next/font/google`, expose as CSS vars `--font-serif`, `--font-sans`.
- [ ] **Step 2:** Wire Tailwind `fontFamily` serif/sans to the vars; set base type scale (body 18px, line-height 1.6).
- [ ] **Step 3:** Visual check via Playwright screenshot of a heading+paragraph. Commit: `feat: typography (spectral + open sans)`.

### Task B3: Lutherrose SVG + favicons

**Files:** `public/brand/lutherrose.svg`, `components/content/Lutherrose.tsx`, `app/icon.png`/favicons.

- [ ] **Step 1:** Recreate the Lutherrose as a clean SVG (Luther rose: black cross in red heart, white rose, blue field, gold ring) referencing `scraped/assets/images/2015/09/cropped-Lutherrose_small-1.png`. Keep it tasteful, single-color-friendly variant too.
- [ ] **Step 2:** `Lutherrose.tsx` renders the SVG with size/aria props.
- [ ] **Step 3:** Generate favicon set from the SVG (32/180/192/270) into app metadata.
- [ ] **Step 4:** Visual check render. Commit: `feat: lutherrose svg + favicons`.

### Task B4: Base UI primitives

**Files:** `components/ui/{Button,Container,SectionHeading,Prose,Bibelvers,Card}.tsx`; tests for Button + Bibelvers.

- [ ] **Step 1 (test):** Button renders children, variant classes (primary=coral, secondary=aubergine outline), focus ring; Bibelvers renders quote + citation in serif italic.
- [ ] **Step 2:** Run → FAIL.
- [ ] **Step 3:** Implement primitives: Container (max-w, padding), SectionHeading (serif), Prose (typography wrapper for MDX), Button (radius 6px, calm hover/focus, no hard shadow), Bibelvers (serif, dignified — no uppercase), Card (cream surface, soft border).
- [ ] **Step 4:** Run → PASS. Commit: `feat: base ui primitives`.

---

## Phase C — Layout

### Task C1: Header + Nav + Mobile Drawer

**Files:** `components/layout/{Header,Nav,MobileDrawer}.tsx`.

- [ ] **Step 1:** Header = aubergine band, Lutherrose + wordmark left, Nav right. Nav tree from SPEC §3.1 with dropdowns (Gottesdienste, Über uns→Verein). Active-state via `usePathname`.
- [ ] **Step 2:** MobileDrawer (<768px): burger → slide-in panel, accessible (focus trap, Esc, aria-expanded).
- [ ] **Step 3:** Playwright: desktop nav + mobile drawer open/close screenshots. Commit: `feat: header, nav, mobile drawer`.

### Task C2: AnnouncementBar

- [ ] **Step 1:** Thin top bar rendering the pinned news headline (from `lib/seed/news.ts`, `pinned:true`). Dismissible (session). If none pinned → not rendered.
- [ ] **Step 2:** Commit: `feat: announcement bar (pinned news)`.

### Task C3: Footer

**Files:** `components/layout/Footer.tsx`, `components/content/{SpendenkontoCard,KontaktBlock}.tsx`.

- [ ] **Step 1:** SpendenkontoCard (cream card: holder, bank, PLN/EUR/BIC from siteConfig, QR placeholder w/ `TODO(verify)` note until account confirmed).
- [ ] **Step 2:** KontaktBlock (address, service rhythm, email links obfuscated, KRS badge link).
- [ ] **Step 3:** Footer: Spendenkonto + sitemap links + Kontakt + social icons (YouTube/Instagram/Facebook) + dynamic `© {year}` + polish/german association name.
- [ ] **Step 4:** Commit: `feat: footer (spendenkonto, kontakt, social)`.

### Task C4: Root layout wiring + metadata

- [ ] **Step 1:** `app/layout.tsx`: `<html lang="de">`, fonts, tokens, AnnouncementBar+Header+children+Footer, default metadata (title template, OG image = Altar).
- [ ] **Step 2:** Build + full-page Playwright screenshot of layout shell. Commit: `feat: root layout + metadata`.

---

## Phase D — Start page

### Task D1: Hero

**Files:** `components/content/Hero.tsx`, copy Altar image to `public/brand/`.

- [ ] **Step 1:** Hero: Altar image (`next/image`), calm aubergine overlay, serif headline „Herzlich willkommen", Bibelvers (Mt 11,28). Responsive.
- [ ] **Step 2:** Visual check. Commit: `feat: hero`.

### Task D2: Home composition

**Files:** `app/page.tsx`; uses NextServiceBadge, SermonCard (latest), NewsTeaser, Leitbild accordion, SpendenkontoCard.

- [ ] **Step 1:** Compose Start: Hero → „Nächster Gottesdienst" (next event from seed) + „Neueste Predigt" (latest sermon, YouTubeLite) → „Aktuelles" teaser (top 2 news) → Leitbild (accordion, 5 sections from index.md) → Spendenkonto.
- [ ] **Step 2:** Full-page desktop + mobile screenshots. Commit: `feat: start page`.

---

## Phase E — Core static pages (content migration)

### Task E1: MDX pipeline + loader (TDD)

**Files:** `lib/content/mdx.ts`, `lib/__tests__/mdx.test.ts`, `@next/mdx` or `next-mdx-remote` setup.

- [ ] **Step 1 (test):** `getPage('ueber-uns')` returns `{frontmatter:{title}, content}` for a fixture MDX.
- [ ] **Step 2:** FAIL → implement loader (read `content/pages/de/<slug>.mdx`, parse frontmatter).
- [ ] **Step 3:** PASS. Commit: `feat: mdx content pipeline`.

### Task E2–E7: Build each core page from migrated content

For each page: create `content/pages/de/<slug>.mdx` from the matching `scraped/content/*.md` (clean tote links, fix address to Miodowa 21/00-246, mark pastor `TODO(verify)`), then the route renders it via Prose. Visual check + commit per page.

- [ ] **E2 Über uns** (`uber-uns.md`): 9-point self-description, Leitbild, Ansprechpartner (board + pastor TODO(verify)), contact emails.
- [ ] **E3 Geschichte** (`uber-uns__geschichte.md`): full history text.
- [ ] **E4 Verein + Satzung + Beitritt**: `uber-uns__verein.md` (KRS), full `…satzung….md` (§§1–33), `beitrittserklaerung.md` (3 steps + PDF from `scraped/assets/pdfs/Beitrittserklaerung.pdf` → `public/`).
- [ ] **E5 Anfahrt** (`gottesdiensttermine__anfahrt.md`): corrected address, ÖPNV/Veturilo, access note, `AnfahrtMap` (Leaflet/OSM, marker at Miodowa 21, 52.2459/21.0090). No Google.
- [ ] **E6 Materialien + Links**: `materialien.md` (Möge-die-Straße text + PDF), `links.md` (https-checked, dead links dropped).
- [ ] **E7 Impressum + Datenschutz**: NEW — association data, responsible person (pastor/board), DSGVO incl. YouTube-consent + Leaflet/OSM note.

Each: `feat: <page> page`.

---

## Phase F — Dynamic modules from seed

### Task F1: Types-first seed + sermons page

**Files:** `lib/seed/sermons.ts` (17 sermons: youtube ids from ASSET_INVENTORY, titles/dates where known), `components/sermons/*`, `app/predigten/page.tsx` + `[slug]`.

- [ ] **Step 1:** Seed sermons typed as `Sermon[]`. YouTubeLite = 2-click consent embed.
- [ ] **Step 2:** SermonList (cards: date, title, scripture, thumbnail) + filter; detail page = embed + summary.
- [ ] **Step 3:** Visual check. Commit: `feat: sermons (seed)`.

### Task F2: Events page + iCal note

**Files:** `lib/seed/events.ts`, `components/events/*`, `app/gottesdienste/page.tsx`.

- [ ] **Step 1:** Seed a few upcoming events (incl. Oster-GD 05.04.2026). EventList (upcoming sorted), NextServiceBadge, rhythm + Sommerpause text, location.
- [ ] **Step 2:** Commit: `feat: events/termine (seed)`.

### Task F3: News/Aktuelles page

**Files:** `lib/seed/news.ts`, `components/news/*`, `app/aktuelles/page.tsx` + `[slug]`.

- [ ] **Step 1:** Seed news incl. one pinned (Oster announcement → feeds AnnouncementBar). NewsCard list + detail.
- [ ] **Step 2:** Commit: `feat: aktuelles/news (seed)`.

### Task F4: Archive index placeholder

- [ ] **Step 1:** `app/archiv/page.tsx`: list ~113 entries from a generated `lib/seed/archive-index.ts` (slug+title+date parsed from `.firecrawl/pages-index.json`/`urls-posts.txt`), searchable. Detail pages = Plan 4.
- [ ] **Step 2:** Commit: `feat: archive index (seed)`.

---

## Phase G — Redirects, SEO, verification

### Task G1: Redirects + sitemap + robots

- [ ] **Step 1:** `next.config.ts` 301s: `/gottesdiensttermine*`→`/gottesdienste*`, `/uber-uns*`→`/ueber-uns*`, satzung legacy URL, archive slugs → `/archiv/<slug>`. `sitemap.ts`, `robots.ts`.
- [ ] **Step 2:** Commit: `feat: redirects, sitemap, robots`.

### Task G2: Build + A11y + visual verification

- [ ] **Step 1:** `pnpm build` clean (no type errors). `pnpm test` green.
- [ ] **Step 2:** Playwright pass: screenshot every route desktop+mobile into `scraped/../mockups/` for Moritz; check no console errors, basic axe a11y.
- [ ] **Step 3:** Commit: `chore: verification screenshots`.

### Task G3: Final review + PROJECT_STATE update

- [ ] **Step 1:** Update PROJECT_STATE (Recently Done) + note Plan 2 (Supabase) next.
- [ ] **Step 2:** Commit: `docs: update project state`.

---

## Self-Review (vs SPEC)

- **§3 IA / nav** → Tasks C1, G1 ✓  **§4 pages** → Phase E + F ✓  **§5 data model** → deferred to Plan 2 (seed mirrors interface) ✓ noted
- **§6 design system** → Phase B ✓  **§7 media/social** → F1 (YouTubeLite), C3 (social, no twitter) ✓
- **§8 migration** → Phase E (core), F4 (archive index), Plan 4 (archive detail) ✓
- **§9 a11y/seo/datenschutz** → C1 (aria), E7, G1, G2 ✓
- **Open facts** → site-config `verify:true` + `TODO(verify)` ✓
- **Placeholder scan:** seed modules are intentional + interface-compatible with Plan 2; no undefined types (all in `lib/types.ts`).
- **Gaps:** Supabase/admin (Plan 2/3) and archive detail (Plan 4) intentionally out of scope — each its own working deliverable.

**This plan produces a complete, deployable static site. Plans 2–4 layer the backend on top without rework.**
