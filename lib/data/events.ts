import { getSupabasePublic } from "@/lib/supabase/public";
import { rowToEvent } from "@/lib/data/mappers";
import type { ChurchEvent } from "@/lib/types";

/** Upcoming services (from now on), soonest first. */
export async function getUpcomingEvents(): Promise<ChurchEvent[]> {
  const supabase = getSupabasePublic();
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .gte("starts_at", new Date().toISOString())
    .order("starts_at", { ascending: true });
  if (error || !data) return [];
  return data.map(rowToEvent);
}

/** The single next upcoming service, or null. */
export async function getNextEvent(): Promise<ChurchEvent | null> {
  const events = await getUpcomingEvents();
  return events[0] ?? null;
}

/** All events (past + future) — used by the admin list. */
export async function getAllEvents(): Promise<ChurchEvent[]> {
  const supabase = getSupabasePublic();
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("starts_at", { ascending: true });
  if (error || !data) return [];
  return data.map(rowToEvent);
}

export async function getEventById(id: string): Promise<ChurchEvent | null> {
  const supabase = getSupabasePublic();
  const { data } = await supabase.from("events").select("*").eq("id", id).maybeSingle();
  return data ? rowToEvent(data) : null;
}
