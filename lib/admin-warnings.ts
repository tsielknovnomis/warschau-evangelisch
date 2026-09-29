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
      out.push(
        "Der eigene Text der Info-Leiste ist abgelaufen und wird nicht mehr angezeigt — bitte löschen oder ein neues Datum setzen.",
      );
    } else if (!settings.announcementUntil) {
      out.push("Die Info-Leiste zeigt einen eigenen Text ohne Enddatum — bitte prüfen, ob er noch stimmt.");
    }
  }

  for (const n of news) {
    if (n.pinned && !isNewsExpired(n, now) && !isPinActive(n, now)) {
      out.push(
        `„${n.title}“ ist nicht mehr oben angepinnt (nach ${PIN_MAX_DAYS} Tagen automatisch beendet) — noch aktuell? Sonst bitte löschen.`,
      );
    }
  }
  return out;
}
