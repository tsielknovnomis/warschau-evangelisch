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
