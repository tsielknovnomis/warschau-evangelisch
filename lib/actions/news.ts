"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSupabaseServer } from "@/lib/supabase/server";
import { warsawLocalToIso } from "@/lib/datetime";
import type { FormState } from "@/lib/actions/events";

const NewsSchema = z.object({
  title: z.string().trim().min(1, "Titel fehlt"),
  slug: z
    .string()
    .trim()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug: nur Kleinbuchstaben, Zahlen und Bindestriche"),
  excerpt: z.string().trim().min(1, "Kurztext fehlt"),
  body: z.string().trim().min(1, "Inhalt fehlt"),
  pinned: z.boolean(),
  published_at: z.string().min(1, "Datum fehlt"),
});

function toIso(v: string): string {
  return warsawLocalToIso(v);
}

function parse(formData: FormData) {
  return NewsSchema.safeParse({
    title: String(formData.get("title") ?? ""),
    slug: String(formData.get("slug") ?? ""),
    excerpt: String(formData.get("excerpt") ?? ""),
    body: String(formData.get("body") ?? ""),
    pinned: formData.get("pinned") === "on",
    published_at: String(formData.get("published_at") ?? ""),
  });
}

function revalidateNews(slug: string) {
  revalidatePath("/");
  revalidatePath("/gottesdienste");
  revalidatePath(`/aktuelles/${slug}`);
  revalidatePath("/sitemap.xml");
}

export async function createNews(_prev: FormState, formData: FormData): Promise<FormState> {
  const parsed = parse(formData);
  if (!parsed.success) return { error: parsed.error.issues[0].message };
  const v = parsed.data;
  const supabase = await getSupabaseServer();
  const { error } = await supabase.from("news").insert({
    title: v.title,
    slug: v.slug,
    excerpt: v.excerpt,
    body: v.body,
    pinned: v.pinned,
    published_at: toIso(v.published_at),
  });
  if (error) {
    return { error: error.code === "23505" ? "Dieser Slug ist schon vergeben." : "Speichern fehlgeschlagen: " + error.message };
  }
  revalidateNews(v.slug);
  redirect("/admin/aktuelles");
}

export async function updateNews(id: string, oldSlug: string, _prev: FormState, formData: FormData): Promise<FormState> {
  const parsed = parse(formData);
  if (!parsed.success) return { error: parsed.error.issues[0].message };
  const v = parsed.data;
  const supabase = await getSupabaseServer();
  const { error } = await supabase.from("news").update({
    title: v.title,
    slug: v.slug,
    excerpt: v.excerpt,
    body: v.body,
    pinned: v.pinned,
    published_at: toIso(v.published_at),
  }).eq("id", id);
  if (error) {
    return { error: error.code === "23505" ? "Dieser Slug ist schon vergeben." : "Speichern fehlgeschlagen: " + error.message };
  }
  revalidateNews(v.slug);
  if (oldSlug !== v.slug) revalidatePath(`/aktuelles/${oldSlug}`);
  redirect("/admin/aktuelles");
}

export async function deleteNews(id: string, slug: string) {
  const supabase = await getSupabaseServer();
  await supabase.from("news").delete().eq("id", id);
  revalidateNews(slug);
  redirect("/admin/aktuelles");
}
