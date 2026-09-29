# Always-Current Date Content Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make every date-dependent element (bar, next-service card, upcoming list, news) correct at any moment, with cancellations, empty states and expiring manual texts.

**Architecture:** Pure, `now`-parameterised logic modules (`service-status`, `news-visibility`, `admin-warnings`) are the single source of truth. Public pages use ISR (`revalidate = 3600`); time-critical UI is client-side and re-evaluates with the browser clock via `useNow`, so cached HTML never shows a past service.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript strict, Tailwind v4, Vitest (jsdom), Zod.

**Spec:** `docs/superpowers/specs/2026-09-29-always-current-design.md`

## Global Constraints

- All dates/times are Europe/Warsaw wall-clock; day strings are `YYYY-MM-DD`.
- A service stays relevant until **3 h after start**; "Sommerpause" wording only in **June–August**.
- Pin without `showUntil` is active for at most **30 days** after `publishedAt`.
- Admin "no service" warning horizon: **28 days**, suppressed in June–August.
- New stored fields are optional/nullable — existing Netlify Blobs data must keep working.
- Max 800 lines/file, 80 lines/function. Code/comments English, UI copy German (Du-Form).
- No production deploy (merge to `main`) without Moritz's confirmation.

---

### Task 1: Date helpers + service status logic

**Files:**
- Modify: `lib/datetime.ts` (append helpers)
- Modify: `lib/types.ts` (ChurchEvent: `cancelled?`, `cancelNote?`)
- Create: `lib/service-status.ts`
- Test: `lib/__tests__/service-status.test.ts`

**Interfaces:**
- Produces: `warsawDay(ms: number): string`, `warsawMonth(ms: number): number`,
  `GRACE_MS`, `isSummer(now)`, `relevantEvents(events, now): ChurchEvent[]`,
  `serviceStatus(events, now): ServiceStatus`, `barParts(status): BarParts`,
  `effectiveAnnouncement({announcement, announcementUntil}, now): string | null`,
  types `ServiceStatus`, `BarParts = { label: string; text: string; href?: string }`.

- [ ] **Step 1: Append to `lib/datetime.ts`**

```ts
const dayFmt = new Intl.DateTimeFormat("en-CA", {
  timeZone: TZ,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

/** Warsaw calendar day of an instant, as "YYYY-MM-DD" (sortable string). */
export function warsawDay(ms: number): string {
  return dayFmt.format(new Date(ms));
}

/** Warsaw calendar month (1–12) of an instant. */
export function warsawMonth(ms: number): number {
  return Number(warsawDay(ms).slice(5, 7));
}
```

- [ ] **Step 2: Extend `ChurchEvent` in `lib/types.ts`** (after `language`)

```ts
  cancelled?: boolean // service does not take place — shown struck through
  cancelNote?: string | null // e.g. invitation to another service instead
```

- [ ] **Step 3: Write failing tests `lib/__tests__/service-status.test.ts`**

```ts
import { describe, it, expect } from "vitest";
import type { ChurchEvent } from "@/lib/types";
import {
  relevantEvents,
  serviceStatus,
  barParts,
  effectiveAnnouncement,
} from "@/lib/service-status";

const ev = (id: string, startsAt: string, extra: Partial<ChurchEvent> = {}): ChurchEvent => ({
  id,
  title: "Gottesdienst",
  startsAt,
  endsAt: null,
  location: "ul. Miodowa 21",
  description: null,
  isSpecial: false,
  withCommunion: false,
  language: "de",
  ...extra,
});
const t = (iso: string) => new Date(iso).getTime();

const sep27 = ev("sep27", "2026-09-27T07:30:00Z"); // So 09:30 Warsaw (CEST)
const oct11 = ev("oct11", "2026-10-11T07:30:00Z");

describe("relevantEvents", () => {
  it("drops services more than 3 h past their start and sorts ascending", () => {
    expect(relevantEvents([oct11, sep27], t("2026-09-29T11:00:00Z")).map((e) => e.id)).toEqual(["oct11"]);
  });
});

describe("serviceStatus", () => {
  it("never reports a past service as next (the 27.09. bug)", () => {
    const s = serviceStatus([sep27, oct11], t("2026-09-29T11:00:00Z"));
    expect(s.kind === "next" && s.next.id).toBe("oct11");
    expect(barParts(s)).toEqual({
      label: "Herzlich eingeladen",
      text: "Gottesdienst am So., 11. Oktober, 09:30 Uhr",
    });
  });

  it("shows the service as today until 3 h after start", () => {
    const during = serviceStatus([oct11], t("2026-10-11T09:00:00Z"));
    expect(during.kind === "next" && during.today).toBe(true);
    expect(barParts(during).label).toBe("Heute");
    expect(serviceStatus([oct11], t("2026-10-11T10:31:00Z")).kind).toBe("none");
  });

  it("handles the DST switch on 25.10.2026", () => {
    const s = serviceStatus([ev("oct25", "2026-10-25T08:30:00Z")], t("2026-10-25T07:00:00Z"));
    expect(barParts(s)).toEqual({ label: "Heute", text: "Gottesdienst um 09:30 Uhr — herzlich willkommen!" });
  });

  it("skips a cancelled service and announces it before the next one", () => {
    const cancelled = { ...sep27, cancelled: true, cancelNote: "Einladung nach Święta Trójca" };
    const s = serviceStatus([cancelled, oct11], t("2026-09-22T10:00:00Z"));
    expect(s.kind === "next" && s.next.id).toBe("oct11");
    expect(barParts(s)).toEqual({
      label: "Bitte beachten",
      text: "Am So., 27. September entfällt der Gottesdienst · Nächster Gottesdienst: So., 11. Oktober, 09:30 Uhr",
    });
  });

  it("ignores a cancellation that lies after the next service", () => {
    const later = ev("oct25", "2026-10-25T08:30:00Z", { cancelled: true });
    const s = serviceStatus([oct11, later], t("2026-10-01T10:00:00Z"));
    expect(s.kind === "next" && s.cancelled).toBeNull();
  });

  it("uses neutral wording without events outside summer", () => {
    const s = serviceStatus([], t("2026-11-30T10:00:00Z"));
    expect(s).toEqual({ kind: "none", summer: false, cancelled: null });
    expect(barParts(s).label).toBe("Gottesdienste");
    expect(barParts(s).href).toMatch(/chat\.whatsapp\.com/);
  });

  it("uses Sommerpause wording only in summer", () => {
    expect(barParts(serviceStatus([], t("2026-07-15T10:00:00Z"))).label).toBe("Sommerpause ☀");
    const summerGap = serviceStatus([ev("sep13", "2026-09-13T07:30:00Z")], t("2026-07-15T10:00:00Z"));
    expect(barParts(summerGap).label).toBe("Sommerpause ☀");
    const winterGap = serviceStatus([ev("feb08", "2026-02-08T08:30:00Z")], t("2026-01-05T10:00:00Z"));
    expect(barParts(winterGap).label).toBe("Herzlich eingeladen");
  });
});

describe("effectiveAnnouncement", () => {
  const s = { announcement: "Hinweis", announcementUntil: "2026-09-30" };
  it("shows the custom text through the end of its last day (Warsaw)", () => {
    expect(effectiveAnnouncement(s, t("2026-09-30T20:00:00Z"))).toBe("Hinweis");
    expect(effectiveAnnouncement(s, t("2026-09-30T22:30:00Z"))).toBeNull();
  });
  it("keeps a custom text without end date", () => {
    expect(effectiveAnnouncement({ announcement: "X", announcementUntil: null }, t("2030-01-01T00:00:00Z"))).toBe("X");
  });
});
```

- [ ] **Step 4: Run** `pnpm vitest run lib/__tests__/service-status.test.ts` → FAIL (module missing).

- [ ] **Step 5: Create `lib/service-status.ts`**

```ts
import type { ChurchEvent } from "@/lib/types";
import { siteConfig } from "@/lib/site-config";
import { warsawDay, warsawMonth } from "@/lib/datetime";

/** A service stays "current" until this long after its start. */
export const GRACE_MS = 3 * 60 * 60 * 1000;
const DAY_MS = 86_400_000;
/** Gaps longer than this during summer read as "Sommerpause". */
const BREAK_GAP_DAYS = 20;
const TZ = "Europe/Warsaw";

const dayFmt = new Intl.DateTimeFormat("de-DE", { weekday: "short", day: "numeric", month: "long", timeZone: TZ });
const timeFmt = new Intl.DateTimeFormat("de-DE", { hour: "2-digit", minute: "2-digit", timeZone: TZ });

export type ServiceStatus =
  | { kind: "next"; next: ChurchEvent; today: boolean; onBreak: boolean; cancelled: ChurchEvent | null }
  | { kind: "none"; summer: boolean; cancelled: ChurchEvent | null };

export type BarParts = { label: string; text: string; href?: string };

const startMs = (e: ChurchEvent) => new Date(e.startsAt).getTime();

/** June–August in Warsaw: the parish's summer break season. */
export function isSummer(now: number): boolean {
  const m = warsawMonth(now);
  return m >= 6 && m <= 8;
}

/** Events that are not over yet (start + grace in the future), soonest first. */
export function relevantEvents(events: ChurchEvent[], now: number): ChurchEvent[] {
  return events
    .filter((e) => startMs(e) + GRACE_MS > now)
    .sort((a, b) => startMs(a) - startMs(b));
}

/** What the site should say about services at instant `now`. */
export function serviceStatus(events: ChurchEvent[], now: number): ServiceStatus {
  const relevant = relevantEvents(events, now);
  const next = relevant.find((e) => !e.cancelled) ?? null;
  const cancelled =
    relevant.find((e) => e.cancelled && (!next || startMs(e) < startMs(next))) ?? null;
  if (!next) return { kind: "none", summer: isSummer(now), cancelled };
  const start = startMs(next);
  return {
    kind: "next",
    next,
    today: warsawDay(start) === warsawDay(now),
    onBreak: isSummer(now) && (start - now) / DAY_MS > BREAK_GAP_DAYS,
    cancelled,
  };
}

const day = (e: ChurchEvent) => dayFmt.format(new Date(e.startsAt));
const time = (e: ChurchEvent) => timeFmt.format(new Date(e.startsAt));
const when = (e: ChurchEvent) => `${day(e)}, ${time(e)} Uhr`;
const SOON = "Die nächsten Termine geben wir bald bekannt";

/** Automatic announcement-bar content — public bar AND admin preview. */
export function barParts(status: ServiceStatus): BarParts {
  const whatsapp = siteConfig.social.whatsapp;
  if (status.kind === "none") {
    if (status.cancelled) {
      return { label: "Bitte beachten", text: `Am ${day(status.cancelled)} entfällt der Gottesdienst. ${SOON}.`, href: whatsapp };
    }
    const text = `${SOON} — aktuelle Infos in unserer WhatsApp-Gruppe.`;
    return { label: status.summer ? "Sommerpause ☀" : "Gottesdienste", text, href: whatsapp };
  }
  const { next, cancelled, today, onBreak } = status;
  if (cancelled) {
    return { label: "Bitte beachten", text: `Am ${day(cancelled)} entfällt der Gottesdienst · Nächster Gottesdienst: ${when(next)}` };
  }
  if (today) return { label: "Heute", text: `Gottesdienst um ${time(next)} Uhr — herzlich willkommen!` };
  if (onBreak) {
    return { label: "Sommerpause ☀", text: `Der nächste Gottesdienst ist am ${when(next)}. Du bist herzlich eingeladen!` };
  }
  return { label: "Herzlich eingeladen", text: `Gottesdienst am ${when(next)}` };
}

/** The custom bar text, or null once its last day (inclusive, Warsaw) is over. */
export function effectiveAnnouncement(
  s: { announcement: string | null; announcementUntil: string | null },
  now: number,
): string | null {
  if (!s.announcement) return null;
  if (s.announcementUntil && warsawDay(now) > s.announcementUntil) return null;
  return s.announcement;
}
```

- [ ] **Step 6: Run** the test file → PASS.
- [ ] **Step 7: Commit** `feat: add service status logic with cancellations and grace window`

---

### Task 2: News visibility logic

**Files:**
- Modify: `lib/types.ts` (NewsItem: `showUntil?: string | null`)
- Create: `lib/news-visibility.ts`
- Test: `lib/__tests__/news-visibility.test.ts`

**Interfaces:**
- Consumes: `warsawDay` (Task 1)
- Produces: `PIN_MAX_DAYS`, `isNewsExpired(n, now)`, `isPinActive(n, now)`,
  `splitNews(news, now): { current: NewsItem[]; expired: NewsItem[] }`

- [ ] **Step 1: Extend `NewsItem`** (after `publishedAt`)

```ts
  showUntil?: string | null // YYYY-MM-DD (Warsaw), inclusive — afterwards archived
```

- [ ] **Step 2: Failing tests `lib/__tests__/news-visibility.test.ts`**

```ts
import { describe, it, expect } from "vitest";
import type { NewsItem } from "@/lib/types";
import { isNewsExpired, isPinActive, splitNews } from "@/lib/news-visibility";

const item = (id: string, publishedAt: string, extra: Partial<NewsItem> = {}): NewsItem => ({
  id, slug: id, title: id, body: "", excerpt: "", coverImage: null, pinned: false, publishedAt, ...extra,
});
const t = (iso: string) => new Date(iso).getTime();
const now = t("2026-09-29T11:00:00Z");

describe("news visibility", () => {
  it("expires after the showUntil day (inclusive, Warsaw)", () => {
    const n = item("a", "2026-09-01T10:00:00Z", { showUntil: "2026-09-28" });
    expect(isNewsExpired(n, now)).toBe(true);
    expect(isNewsExpired({ ...n, showUntil: "2026-09-29" }, now)).toBe(false);
    expect(isNewsExpired({ ...n, showUntil: null }, now)).toBe(false);
  });

  it("ends a pin without end date after 30 days", () => {
    expect(isPinActive(item("old", "2026-06-21T10:00:00Z", { pinned: true }), now)).toBe(false);
    expect(isPinActive(item("new", "2026-09-10T10:00:00Z", { pinned: true }), now)).toBe(true);
  });

  it("keeps a dated pin until its end date", () => {
    const n = item("d", "2026-06-01T10:00:00Z", { pinned: true, showUntil: "2026-10-31" });
    expect(isPinActive(n, now)).toBe(true);
  });

  it("splits into current (active pins first, then newest) and expired", () => {
    const { current, expired } = splitNews(
      [
        item("staleP", "2026-06-21T10:00:00Z", { pinned: true }),
        item("newest", "2026-09-24T10:00:00Z"),
        item("pin", "2026-09-01T10:00:00Z", { pinned: true, showUntil: "2026-10-31" }),
        item("gone", "2026-08-01T10:00:00Z", { showUntil: "2026-08-31" }),
      ],
      now,
    );
    expect(current.map((n) => n.id)).toEqual(["pin", "newest", "staleP"]);
    expect(expired.map((n) => n.id)).toEqual(["gone"]);
  });
});
```

- [ ] **Step 3: Run** → FAIL.
- [ ] **Step 4: Create `lib/news-visibility.ts`**

```ts
import type { NewsItem } from "@/lib/types";
import { warsawDay } from "@/lib/datetime";

/** A pin without end date is honoured for at most this many days. */
export const PIN_MAX_DAYS = 30;
const DAY_MS = 86_400_000;

const publishedMs = (n: NewsItem) => new Date(n.publishedAt).getTime();
const newestFirst = (a: NewsItem, b: NewsItem) => publishedMs(b) - publishedMs(a);

export function isNewsExpired(n: NewsItem, now: number): boolean {
  return Boolean(n.showUntil) && warsawDay(now) > (n.showUntil as string);
}

export function isPinActive(n: NewsItem, now: number): boolean {
  if (!n.pinned || isNewsExpired(n, now)) return false;
  if (n.showUntil) return true;
  return now - publishedMs(n) <= PIN_MAX_DAYS * DAY_MS;
}

/** Current news (active pins first, then newest) and expired news (newest first). */
export function splitNews(news: NewsItem[], now: number): { current: NewsItem[]; expired: NewsItem[] } {
  const current = news
    .filter((n) => !isNewsExpired(n, now))
    .sort((a, b) => Number(isPinActive(b, now)) - Number(isPinActive(a, now)) || newestFirst(a, b));
  const expired = news.filter((n) => isNewsExpired(n, now)).sort(newestFirst);
  return { current, expired };
}
```

- [ ] **Step 5: Run** → PASS. **Step 6: Commit** `feat: add news expiry and pin time limit`

---

### Task 3: Admin warnings logic

**Files:**
- Modify: `lib/data/settings.ts` (`announcementUntil: string | null`)
- Create: `lib/admin-warnings.ts`
- Test: `lib/__tests__/admin-warnings.test.ts`

**Interfaces:**
- Consumes: `relevantEvents`, `isSummer` (Task 1); `isNewsExpired`, `isPinActive` (Task 2)
- Produces: `adminWarnings({ events, news, settings, now }): string[]`; `SiteSettings.announcementUntil`

- [ ] **Step 1: `lib/data/settings.ts`** — add `announcementUntil: string | null;` to `SiteSettings`,
  `announcementUntil: null` to `DEFAULTS`, and `announcementUntil: s.announcementUntil || null,` in `getSettings`.

- [ ] **Step 2: Failing tests `lib/__tests__/admin-warnings.test.ts`**

```ts
import { describe, it, expect } from "vitest";
import type { ChurchEvent, NewsItem } from "@/lib/types";
import { adminWarnings } from "@/lib/admin-warnings";

const t = (iso: string) => new Date(iso).getTime();
const ev = (startsAt: string, cancelled = false): ChurchEvent => ({
  id: startsAt, title: "Gottesdienst", startsAt, endsAt: null, location: "", description: null,
  isSpecial: false, withCommunion: false, language: "de", cancelled,
});
const noBar = { announcement: null, announcementUntil: null, barHidden: false };

describe("adminWarnings", () => {
  it("warns when no service is planned in the next 4 weeks (outside summer)", () => {
    const w = adminWarnings({ events: [ev("2026-11-29T08:30:00Z", false)], news: [], settings: noBar, now: t("2026-10-12T10:00:00Z") });
    expect(w).toHaveLength(1);
    expect(w[0]).toMatch(/nächsten 4 Wochen/);
  });

  it("counts cancelled services as missing", () => {
    const w = adminWarnings({ events: [ev("2026-10-25T08:30:00Z", true)], news: [], settings: noBar, now: t("2026-10-12T10:00:00Z") });
    expect(w[0]).toMatch(/nächsten 4 Wochen/);
  });

  it("stays quiet in summer and when a service is planned", () => {
    expect(adminWarnings({ events: [], news: [], settings: noBar, now: t("2026-07-15T10:00:00Z") })).toEqual([]);
    expect(adminWarnings({ events: [ev("2026-10-11T07:30:00Z")], news: [], settings: noBar, now: t("2026-09-29T10:00:00Z") })).toEqual([]);
  });

  it("flags custom bar texts that are expired or undated", () => {
    const base = { events: [ev("2026-10-11T07:30:00Z")], news: [], now: t("2026-09-29T10:00:00Z") };
    expect(adminWarnings({ ...base, settings: { ...noBar, announcement: "X", announcementUntil: "2026-09-01" } })[0]).toMatch(/abgelaufen/);
    expect(adminWarnings({ ...base, settings: { ...noBar, announcement: "X" } })[0]).toMatch(/ohne Enddatum/);
  });

  it("reports pins that ended automatically", () => {
    const news: NewsItem[] = [{ id: "s", slug: "s", title: "Sommerpause", body: "", excerpt: "", coverImage: null, pinned: true, publishedAt: "2026-06-21T10:00:00Z" }];
    const w = adminWarnings({ events: [ev("2026-10-11T07:30:00Z")], news, settings: noBar, now: t("2026-09-29T10:00:00Z") });
    expect(w[0]).toMatch(/„Sommerpause“/);
  });
});
```

- [ ] **Step 3: Run** → FAIL. **Step 4: Create `lib/admin-warnings.ts`**

```ts
import type { ChurchEvent, NewsItem } from "@/lib/types";
import type { SiteSettings } from "@/lib/data/settings";
import { isSummer, relevantEvents } from "@/lib/service-status";
import { isNewsExpired, isPinActive, PIN_MAX_DAYS } from "@/lib/news-visibility";
import { warsawDay } from "@/lib/datetime";

const LOOKAHEAD_DAYS = 28;
const DAY_MS = 86_400_000;

/** Plain-language hints for the admin dashboard about content that is (about to be) stale. */
export function adminWarnings(input: {
  events: ChurchEvent[];
  news: NewsItem[];
  settings: SiteSettings;
  now: number;
}): string[] {
  const { events, news, settings, now } = input;
  const out: string[] = [];

  const horizon = now + LOOKAHEAD_DAYS * DAY_MS;
  const planned = relevantEvents(events, now).some(
    (e) => !e.cancelled && new Date(e.startsAt).getTime() <= horizon,
  );
  if (!planned && !isSummer(now)) {
    out.push(
      "In den nächsten 4 Wochen ist kein Gottesdienst eingetragen — auf der Website steht deshalb „Die nächsten Termine geben wir bald bekannt“.",
    );
  }

  if (settings.announcement) {
    if (settings.announcementUntil && warsawDay(now) > settings.announcementUntil) {
      out.push("Der eigene Text der Info-Leiste ist abgelaufen und wird nicht mehr angezeigt — bitte löschen oder ein neues Datum setzen.");
    } else if (!settings.announcementUntil) {
      out.push("Die Info-Leiste zeigt einen eigenen Text ohne Enddatum — bitte prüfen, ob er noch stimmt.");
    }
  }

  for (const n of news) {
    if (n.pinned && !isNewsExpired(n, now) && !isPinActive(n, now)) {
      out.push(`„${n.title}“ ist nicht mehr oben angepinnt (nach ${PIN_MAX_DAYS} Tagen automatisch beendet) — noch aktuell? Sonst bitte löschen.`);
    }
  }
  return out;
}
```

- [ ] **Step 5: Run** → PASS. **Step 6: Commit** `feat: add admin staleness warnings`

---

### Task 4: Public site — fresh bar, card, list and news

**Files:**
- Create: `lib/use-now.ts`, `lib/clock.ts`, `components/home/NextServiceCard.tsx`, `components/events/UpcomingEventList.tsx`
- Modify: `app/(site)/layout.tsx`, `components/layout/NextServiceBar.tsx`, `components/home/GottesdienstEinladung.tsx`,
  `components/events/EventCard.tsx`, `app/(site)/gottesdienste/page.tsx`, `components/home/AktuellesTeaser.tsx`
- Delete: `lib/announcement.ts` (replaced by `lib/service-status.ts`)

**Interfaces:**
- Consumes: Tasks 1–2.
- Produces: `useNow(serverNow: number): number`; `currentTime(): number`;
  `<NextServiceCard events serverNow />`; `<UpcomingEventList events serverNow />`;
  `NextServiceBar` props `{ events, serverNow, announcement, announcementUntil, barHidden }`.

- [ ] **Step 1: `lib/clock.ts`** — `export function currentTime(): number { return Date.now(); }`
  (render-time "now" for server components; statically rendered pages call it at ISR time).
- [ ] **Step 2: `lib/use-now.ts`**

```ts
"use client";

import { useSyncExternalStore } from "react";

const TICK_MS = 60_000;

function subscribe(onChange: () => void): () => void {
  const id = setInterval(onChange, TICK_MS);
  return () => clearInterval(id);
}

function getSnapshot(): number {
  return Math.floor(Date.now() / TICK_MS) * TICK_MS;
}

/**
 * Browser clock at minute precision. Uses `serverNow` during SSR and hydration,
 * then the real clock — so a cached page can never show stale "next" data.
 */
export function useNow(serverNow: number): number {
  return useSyncExternalStore(subscribe, getSnapshot, () => serverNow);
}
```

- [ ] **Step 3: `app/(site)/layout.tsx`** — add `export const revalidate = 3600;`, load `getAllEvents()` and
  `getSettings()`, compute `serverNow = currentTime()`, pass
  `events={relevantEvents(all, serverNow).slice(0, 8)} serverNow={serverNow} announcement={settings.announcement} announcementUntil={settings.announcementUntil} barHidden={settings.barHidden}` to `NextServiceBar`.
- [ ] **Step 4: `NextServiceBar`** — replace `event/onBreak` props; inside:
  `const now = useNow(serverNow); const custom = effectiveAnnouncement({ announcement, announcementUntil }, now); const auto = barParts(serviceStatus(events, now));`
  `hasContent = !barHidden`; render `auto.text` inside `<a href={auto.href} target="_blank" rel="noopener noreferrer" className="underline decoration-gold/50 underline-offset-2">` when `auto.href` is set; effect deps `[hasContent, custom, auto.text, dismissed]`.
- [ ] **Step 5: `EventCard`** — when `event.cancelled`: never highlighted, date `line-through` + muted, red-tinted badge "Entfällt", show `cancelNote` (fallback "Dieser Gottesdienst entfällt.") instead of location.
- [ ] **Step 6: `UpcomingEventList`** (client): `relevantEvents(events, useNow(serverNow))`; highlight first non-cancelled; `ShowMore initialCount={3}`; empty text: summer → "Zurzeit ist Sommerpause. Die nächsten Termine geben wir bald bekannt — schreib uns gern jederzeit." else → "Die nächsten Termine geben wir bald bekannt. Aktuelle Infos findest du in unserer WhatsApp-Gruppe."
- [ ] **Step 7: `NextServiceCard`** (client) — card markup moved out of `GottesdienstEinladung`; kicker "Heute" / "Der nächste Gottesdienst" / "Gottesdienste"; optional note "Am {day} entfällt der Gottesdienst." when `status.cancelled`; none-state text season-aware + WhatsApp link.
- [ ] **Step 8: `GottesdienstEinladung`** — copy: "Wir feiern jeden 2. und 4. Sonntag im Monat um {time} im Lutherischen Zentrum in der {street}, meist mit Heiligem Abendmahl."; render `<NextServiceCard events={relevantEvents(await getAllEvents(), now).slice(0, 8)} serverNow={now} />`.
- [ ] **Step 9: `/gottesdienste` page** — events via `UpcomingEventList`; news via `splitNews(await getNews(), now)`, render `[...current, ...expired]` in `ShowMore initialCount={Math.min(3, current.length)}`, "· angepinnt" only if `isPinActive`; if `current.length === 0` show "Zurzeit gibt es keine neuen Beiträge." above the toggle.
- [ ] **Step 10: `AktuellesTeaser`** — `splitNews(await getNews(), currentTime()).current.slice(0, 3)`.
- [ ] **Step 11: Delete `lib/announcement.ts`**; run `pnpm lint && pnpm vitest run` → clean.
- [ ] **Step 12: Commit** `feat: keep public service info current via ISR and client clock`

---

### Task 5: Admin — cancellations, end dates, warnings

**Files:**
- Modify: `lib/actions/events.ts`, `lib/actions/news.ts`, `lib/actions/settings.ts`, `lib/event-templates.ts`,
  `components/admin/EventForm.tsx`, `components/admin/EventRow.tsx`, `components/admin/NewsForm.tsx`,
  `components/admin/NewsRow.tsx`, `components/admin/SettingsForm.tsx`, `app/admin/page.tsx`,
  `app/admin/termine/[id]/page.tsx`

**Interfaces:** Consumes Tasks 1–3. Form field names: `cancelled` (checkbox), `cancel_note`,
`show_until` (date), `announcement_until` (date).

- [ ] **Step 1: Event action** — schema `cancelled: z.boolean(), cancel_note: z.string().nullable()`; parse
  `cancelled: formData.get("cancelled") === "on"`, `cancel_note: String(formData.get("cancel_note") ?? "").trim() || null`;
  store `cancelled: v.cancelled, cancelNote: v.cancelled ? v.cancel_note : null` in create + update.
- [ ] **Step 2: News action** — `show_until: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Datum ungültig").nullable()`; parse
  `String(formData.get("show_until") ?? "").trim() || null`; store `showUntil: v.show_until`.
- [ ] **Step 3: Settings action** — `announcementUntil` from `announcement_until` (valid `YYYY-MM-DD` or null).
- [ ] **Step 4: Templates** — `EventTemplate` gains `cancelled?: boolean; cancelNote?: string`; add
  `{ key: "ausfall", label: "Ausfall (Gottesdienst entfällt)", title: "Gottesdienst entfällt", startsAt: () => nextSunday(9, 30), description: "", isSpecial: false, cancelled: true, cancelNote: "Wir laden herzlich ein, den polnischen Gottesdienst in der Dreifaltigkeitskirche (Kościół Świętej Trójcy, pl. Małachowskiego) mitzufeiern." }`.
- [ ] **Step 5: EventForm** — state `cancelled`, `cancelNote` (from event/template; `applyTemplate` sets both);
  checkbox "Fällt aus (wird durchgestrichen angezeigt)"; when checked, textarea `cancel_note` "Hinweis zum Ausfall".
- [ ] **Step 6: EventRow** — badge "Fällt aus" for cancelled, title struck through; `app/admin/page.tsx`: `nextId`
  from `serviceStatus`; `app/admin/termine/[id]`: render `InviteText` only if `!event.cancelled`.
- [ ] **Step 7: NewsForm** — date input `show_until` "Anzeigen bis (optional)" with hint
  "Danach verschwindet der Beitrag von der Startseite und wandert unter „Ältere Beiträge“. Angepinnte Beiträge ohne Datum bleiben höchstens 30 Tage oben."; NewsRow badges "Abgelaufen" / "📌 Angepinnt" (only if `isPinActive`) / "📌 Anpinnung beendet".
- [ ] **Step 8: SettingsForm** — date input `announcement_until` "Eigener Text anzeigen bis (optional)"; preview shows
  automatic bar when the entered end date is before today; `autoParts` prop typed `BarParts` (never null).
- [ ] **Step 9: Admin page** — compute `now`, `status = serviceStatus(events, now)`, `warnings = adminWarnings(...)`;
  amber box above the tabs listing warnings; greeting uses `status`; `SettingsForm autoParts={barParts(status)}`.
- [ ] **Step 10:** `pnpm lint && pnpm vitest run && pnpm build` → clean. **Commit** `feat: admin support for cancellations, end dates and staleness warnings`

---

### Task 6: Verification + docs

- [ ] `pnpm build && pnpm start` locally; with seed/dev data check: bar, homepage card, `/gottesdienste` list
  (cancelled rendering), news archive toggle, admin warnings, Ausfall template. Screenshot mobile + desktop.
- [ ] Update `PROJECT_STATE.md` (Recently Done, Recent Decisions) and `CLAUDE.md` (ISR + client clock note).
- [ ] Commit `docs: record always-current design`. Ask Moritz before merging to `main` (production deploy).
