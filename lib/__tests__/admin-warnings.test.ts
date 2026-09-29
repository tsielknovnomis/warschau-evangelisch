import { describe, it, expect } from "vitest";
import type { ChurchEvent, NewsItem } from "@/lib/types";
import { adminWarnings } from "@/lib/admin-warnings";

const t = (iso: string) => new Date(iso).getTime();
const ev = (startsAt: string, cancelled = false): ChurchEvent => ({
  id: startsAt,
  title: "Gottesdienst",
  startsAt,
  endsAt: null,
  location: "",
  description: null,
  isSpecial: false,
  withCommunion: false,
  language: "de",
  cancelled,
});
const noBar = { announcement: null, announcementUntil: null, barHidden: false };

describe("adminWarnings", () => {
  it("warns when no service is planned in the next 4 weeks (outside summer)", () => {
    const w = adminWarnings({ events: [ev("2026-11-29T08:30:00Z")], news: [], settings: noBar, now: t("2026-10-12T10:00:00Z") });
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
    const news: NewsItem[] = [
      { id: "s", slug: "s", title: "Sommerpause", body: "", excerpt: "", coverImage: null, pinned: true, publishedAt: "2026-06-21T10:00:00Z" },
    ];
    const w = adminWarnings({ events: [ev("2026-10-11T07:30:00Z")], news, settings: noBar, now: t("2026-09-29T10:00:00Z") });
    expect(w[0]).toMatch(/„Sommerpause“/);
  });
});
