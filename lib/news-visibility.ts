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
export function splitNews(
  news: NewsItem[],
  now: number,
): { current: NewsItem[]; expired: NewsItem[] } {
  const current = news
    .filter((n) => !isNewsExpired(n, now))
    .sort((a, b) => Number(isPinActive(b, now)) - Number(isPinActive(a, now)) || newestFirst(a, b));
  const expired = news.filter((n) => isNewsExpired(n, now)).sort(newestFirst);
  return { current, expired };
}
