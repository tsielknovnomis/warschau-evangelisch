"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSupabaseServer } from "@/lib/supabase/server";
import { warsawLocalToIso } from "@/lib/datetime";

const EventSchema = z.object({
  title: z.string().trim().min(1, "Titel fehlt"),
  starts_at: z.string().min(1, "Beginn fehlt"),
  location: z.string().trim().min(1, "Ort fehlt"),
  description: z.string().nullable(),
  is_special: z.boolean(),
  with_communion: z.boolean(),
});
// Note: `language` and `ends_at` are intentionally not part of the form
// (always German; no end time needed). Inserts use the column defaults/null;
// updates leave stored values untouched.

export type FormState = { error?: string };

/** datetime-local (Warsaw wall time) → UTC ISO, or null. */
function toIso(v: string | null): string | null {
  if (!v) return null;
  return warsawLocalToIso(v);
}

function parse(formData: FormData) {
  return EventSchema.safeParse({
    title: String(formData.get("title") ?? ""),
    starts_at: String(formData.get("starts_at") ?? ""),
    location: String(formData.get("location") ?? ""),
    description: (String(formData.get("description") ?? "").trim() || null),
    is_special: formData.get("is_special") === "on",
    with_communion: formData.get("with_communion") === "on",
  });
}

function toRow(v: z.infer<typeof EventSchema>) {
  return {
    title: v.title,
    starts_at: toIso(v.starts_at),
    location: v.location,
    description: v.description,
    is_special: v.is_special,
    with_communion: v.with_communion,
  };
}

function revalidateEvents() {
  revalidatePath("/");
  revalidatePath("/gottesdienste");
}

export async function createEvent(_prev: FormState, formData: FormData): Promise<FormState> {
  const parsed = parse(formData);
  if (!parsed.success) return { error: parsed.error.issues[0].message };
  const v = parsed.data;
  const supabase = await getSupabaseServer();
  const { error } = await supabase.from("events").insert(toRow(v));
  if (error) return { error: "Speichern fehlgeschlagen: " + error.message };
  revalidateEvents();
  redirect("/admin?tab=termine");
}

export async function updateEvent(id: string, _prev: FormState, formData: FormData): Promise<FormState> {
  const parsed = parse(formData);
  if (!parsed.success) return { error: parsed.error.issues[0].message };
  const v = parsed.data;
  const supabase = await getSupabaseServer();
  const { error } = await supabase.from("events").update(toRow(v)).eq("id", id);
  if (error) return { error: "Speichern fehlgeschlagen: " + error.message };
  revalidateEvents();
  redirect("/admin?tab=termine");
}

export async function deleteEvent(id: string) {
  const supabase = await getSupabaseServer();
  await supabase.from("events").delete().eq("id", id);
  revalidateEvents();
  redirect("/admin?tab=termine");
}
