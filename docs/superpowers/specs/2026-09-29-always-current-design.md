# Always-current date content — Design

**Date:** 2026-09-29 · **Status:** approved by Moritz (chat, 29.09.)

## Problem
Public pages are statically rendered and only re-rendered on admin saves or deploys.
Everything derived from "now" (next service, announcement bar, upcoming list) freezes.
Observed: on 29.09. the bar and homepage card still showed 27.09. (page rendered 24.09.).
Further gaps: no concept of cancelled services; "Sommerpause" shown for any 20+ day gap
and whenever no event exists; manual texts (pinned news, custom bar text) never expire;
homepage copy "alle zwei Wochen …" contradicts the board's wording.

## Decisions (from Q&A)
- Cancellations are **shown** as cancelled (struck through, "Entfällt" + note) and skipped
  by "next service"; the bar mentions an upcoming cancellation before the next service.
- No upcoming event → neutral "Die nächsten Termine geben wir bald bekannt" + WhatsApp hint;
  "Sommerpause" wording only in summer (June–August, Warsaw time).
- News get optional "Anzeigen bis" date; afterwards: off the homepage, pin ends, moves into
  the collapsed "Ältere Beiträge" on /gottesdienste, detail URL stays reachable.

## Design
1. **Freshness, two layers**
   - `export const revalidate = 3600` on the public `(site)` layout → ISR, at most hourly.
     No deploy, no Netlify deploy credits.
   - Client guard: bar, next-service card and upcoming list receive the relevant events and
     re-evaluate with the browser clock (`useNow`, `useSyncExternalStore`, minute tick), so a
     cached page can never show a past service as "next".
   - A service stays relevant until **3 h after start** (09:30 → 12:30); on its day it reads "Heute".
2. **Pure status logic** `lib/service-status.ts` — single source for bar, card, admin preview:
   `relevantEvents(events, now)`, `serviceStatus(events, now)`, `barParts(status)`,
   `effectiveAnnouncement(settings, now)`. All take `now` explicitly → unit-testable.
3. **Cancellations**: `ChurchEvent.cancelled?: boolean`, `cancelNote?: string | null`
   (optional → existing stored data stays valid). Admin checkbox "Fällt aus" + note,
   template "Ausfall". EventCard/EventRow badges; invite-text generator hidden when cancelled.
4. **Expiring manual content** `lib/news-visibility.ts`: `NewsItem.showUntil?: string | null`
   (YYYY-MM-DD, inclusive, Warsaw). Pin is active only while not expired and — without
   `showUntil` — at most 30 days after `publishedAt`. `SiteSettings.announcementUntil`
   (YYYY-MM-DD) — expired custom text falls back to the automatic bar.
5. **Admin warnings** `lib/admin-warnings.ts`: no service within 28 days (outside summer),
   expired custom bar text, custom bar text without end date, auto-expired pins.
6. Homepage copy aligned: "jeden 2. und 4. Sonntag im Monat".

## Out of scope
Recurring-rule generation of services; changing content only reachable via `/admin`
(Simon removes the old "Sommerpause" news item).

## Testing
Vitest for the three pure modules with fixed instants (incl. DST end 25.10.2026, same-day
grace window, summer vs. winter, cancellation before/without next service). Then
`pnpm lint`, `pnpm build`, local production run + browser check. One production deploy
(merge to `main`) only after Moritz confirms.
