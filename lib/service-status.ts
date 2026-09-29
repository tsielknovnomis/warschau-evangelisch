import type { ChurchEvent } from "@/lib/types";
import { siteConfig } from "@/lib/site-config";
import { warsawDay, warsawMonth } from "@/lib/datetime";

/** A service stays "current" until this long after its start. */
export const GRACE_MS = 3 * 60 * 60 * 1000;
const DAY_MS = 86_400_000;
/** Gaps longer than this during summer read as "Sommerpause". */
const BREAK_GAP_DAYS = 20;
const TZ = "Europe/Warsaw";

const dayFmt = new Intl.DateTimeFormat("de-DE", {
  weekday: "short",
  day: "numeric",
  month: "long",
  timeZone: TZ,
});
const timeFmt = new Intl.DateTimeFormat("de-DE", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: TZ,
});

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

/** "So., 27. September" */
export const serviceDay = (e: ChurchEvent) => dayFmt.format(new Date(e.startsAt));
const time = (e: ChurchEvent) => timeFmt.format(new Date(e.startsAt));
const when = (e: ChurchEvent) => `${serviceDay(e)}, ${time(e)} Uhr`;
const SOON = "Die nächsten Termine geben wir bald bekannt";

/** Automatic announcement-bar content — public bar AND admin preview. */
export function barParts(status: ServiceStatus): BarParts {
  const whatsapp = siteConfig.social.whatsapp;
  if (status.kind === "none") {
    if (status.cancelled) {
      return {
        label: "Bitte beachten",
        text: `Am ${serviceDay(status.cancelled)} entfällt der Gottesdienst. ${SOON}.`,
        href: whatsapp,
      };
    }
    const text = `${SOON} — aktuelle Infos in unserer WhatsApp-Gruppe.`;
    return { label: status.summer ? "Sommerpause ☀" : "Gottesdienste", text, href: whatsapp };
  }
  const { next, cancelled, today, onBreak } = status;
  if (cancelled) {
    return {
      label: "Bitte beachten",
      text: `Am ${serviceDay(cancelled)} entfällt der Gottesdienst · Nächster Gottesdienst: ${when(next)}`,
    };
  }
  if (today) {
    return { label: "Heute", text: `Gottesdienst um ${time(next)} Uhr — herzlich willkommen!` };
  }
  if (onBreak) {
    return {
      label: "Sommerpause ☀",
      text: `Der nächste Gottesdienst ist am ${when(next)}. Du bist herzlich eingeladen!`,
    };
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
