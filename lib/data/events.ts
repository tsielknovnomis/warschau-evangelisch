import { readDoc } from "@/lib/storage";
import type { ChurchEvent } from "@/lib/types";

const KEY = "events";

/** All events sorted by start time (ascending). */
export async function getAllEvents(): Promise<ChurchEvent[]> {
  const events = await readDoc<ChurchEvent[]>(KEY, []);
  return [...events].sort((a, b) => +new Date(a.startsAt) - +new Date(b.startsAt));
}

/** Upcoming services (from now on), soonest first. */
export async function getUpcomingEvents(): Promise<ChurchEvent[]> {
  const now = Date.now();
  return (await getAllEvents()).filter((e) => +new Date(e.startsAt) >= now);
}

/** The single next upcoming service, or null. */
export async function getNextEvent(): Promise<ChurchEvent | null> {
  return (await getUpcomingEvents())[0] ?? null;
}

export async function getEventById(id: string): Promise<ChurchEvent | null> {
  return (await getAllEvents()).find((e) => e.id === id) ?? null;
}
