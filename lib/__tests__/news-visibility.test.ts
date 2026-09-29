import { describe, it, expect } from "vitest";
import type { NewsItem } from "@/lib/types";
import { isNewsExpired, isPinActive, splitNews } from "@/lib/news-visibility";

const item = (id: string, publishedAt: string, extra: Partial<NewsItem> = {}): NewsItem => ({
  id,
  slug: id,
  title: id,
  body: "",
  excerpt: "",
  coverImage: null,
  pinned: false,
  publishedAt,
  ...extra,
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
