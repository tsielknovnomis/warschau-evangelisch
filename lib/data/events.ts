import { readDoc } from "@/lib/storage";
import type { ChurchEvent } from "@/lib/types";

const KEY = "events";

/** All events sorted by start time (ascending). */
export async function getAllEvents(): Promise<ChurchEvent[]> {
  const events = await readDoc<ChurchEvent[]>(KEY, []);
  return [...events].sort((a, b) => +new Date(a.startsAt) - +new Date(b.startsAt));
}

// "Upcoming" / "next" depend on the current time — derive them with
// lib/service-status.ts (relevantEvents / serviceStatus), never here.

export async function getEventById(id: string): Promise<ChurchEvent | null> {
  return (await getAllEvents()).find((e) => e.id === id) ?? null;
}
