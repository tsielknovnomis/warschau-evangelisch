import type { ChurchEvent } from "@/lib/types";
import { siteConfig } from "@/lib/site-config";

const loc = `${siteConfig.address.street}, 2. Stock (Synodalsaal)`;

// Seed events. Plan 2 replaces these reads with Supabase queries (same shape).
// Seed dates lie after the current summer break (Sommerpause), so the
// "next service" section stays populated in the demo.
const events: ChurchEvent[] = [
  {
    id: "e1",
    title: "Einschulungsgottesdienst nach der Sommerpause",
    startsAt: "2026-09-06T09:30:00+02:00",
    endsAt: "2026-09-06T11:00:00+02:00",
    location: loc,
    description: "Erster Gottesdienst nach der Sommerpause, mit Segnung der Schulanfänger.",
    isSpecial: true,
    withCommunion: false,
    language: "de",
  },
  {
    id: "e2",
    title: "Gottesdienst mit Heiligem Abendmahl",
    startsAt: "2026-09-20T09:30:00+02:00",
    endsAt: null,
    location: loc,
    description: null,
    isSpecial: false,
    withCommunion: true,
    language: "de",
  },
  {
    id: "e3",
    title: "Erntedankgottesdienst",
    startsAt: "2026-10-04T09:30:00+02:00",
    endsAt: null,
    location: loc,
    description: "Familiengottesdienst zum Erntedankfest, anschließend Gemeindekaffee.",
    isSpecial: true,
    withCommunion: false,
    language: "de",
  },
];

export function getUpcomingEvents(now: Date = new Date()): ChurchEvent[] {
  return events
    .filter((e) => new Date(e.startsAt) >= now)
    .sort((a, b) => +new Date(a.startsAt) - +new Date(b.startsAt));
}

export function getAllEvents(): ChurchEvent[] {
  return [...events].sort(
    (a, b) => +new Date(a.startsAt) - +new Date(b.startsAt),
  );
}

export function getNextEvent(now: Date = new Date()): ChurchEvent | null {
  return getUpcomingEvents(now)[0] ?? null;
}
