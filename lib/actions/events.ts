"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { readDoc, writeDoc } from "@/lib/storage";
import { isAdmin } from "@/lib/actions/guard";
import { warsawLocalToIso } from "@/lib/datetime";
import type { ChurchEvent } from "@/lib/types";

const EventSchema = z.object({
  title: z.string().trim().min(1, "Titel fehlt"),
  starts_at: z.string().min(1, "Beginn fehlt"),
  location: z.string().trim().min(1, "Ort fehlt"),
  description: z.string().nullable(),
  is_special: z.boolean(),
});
// Note: `language`, `endsAt` and `withCommunion` are intentionally not part
// of the form (always German; no end time; every service includes communion).
// New events get the defaults; updates leave stored values untouched.

export type FormState = { error?: string };

const KEY = "events";
const NOT_ALLOWED = { error: "Nicht angemeldet — bitte lade die Seite neu und melde dich an." };

function parse(formData: FormData) {
  return EventSchema.safeParse({
    title: String(formData.get("title") ?? ""),
    starts_at: String(formData.get("starts_at") ?? ""),
    location: String(formData.get("location") ?? ""),
    description: (String(formData.get("description") ?? "").trim() || null),
    is_special: formData.get("is_special") === "on",
  });
}

function revalidateEvents() {
  revalidatePath("/", "layout");
  revalidatePath("/gottesdienste");
}

export async function createEvent(_prev: FormState, formData: FormData): Promise<FormState> {
  if (!(await isAdmin())) return NOT_ALLOWED;
  const parsed = parse(formData);
  if (!parsed.success) return { error: parsed.error.issues[0].message };
  const v = parsed.data;

  const events = await readDoc<ChurchEvent[]>(KEY, []);
  events.push({
    id: crypto.randomUUID(),
    title: v.title,
    startsAt: warsawLocalToIso(v.starts_at),
    endsAt: null,
    location: v.location,
    description: v.description,
    isSpecial: v.is_special,
    withCommunion: false,
    language: "de",
  });
  await writeDoc(KEY, events);
  revalidateEvents();
  redirect("/admin?tab=termine");
}

export async function updateEvent(id: string, _prev: FormState, formData: FormData): Promise<FormState> {
  if (!(await isAdmin())) return NOT_ALLOWED;
  const parsed = parse(formData);
  if (!parsed.success) return { error: parsed.error.issues[0].message };
  const v = parsed.data;

  const events = await readDoc<ChurchEvent[]>(KEY, []);
  const idx = events.findIndex((e) => e.id === id);
  if (idx === -1) return { error: "Termin nicht gefunden." };
  events[idx] = {
    ...events[idx],
    title: v.title,
    startsAt: warsawLocalToIso(v.starts_at),
    location: v.location,
    description: v.description,
    isSpecial: v.is_special,
  };
  await writeDoc(KEY, events);
  revalidateEvents();
  redirect("/admin?tab=termine");
}

export async function deleteEvent(id: string) {
  if (!(await isAdmin())) redirect("/admin/login");
  const events = await readDoc<ChurchEvent[]>(KEY, []);
  await writeDoc(KEY, events.filter((e) => e.id !== id));
  revalidateEvents();
  redirect("/admin?tab=termine");
}
