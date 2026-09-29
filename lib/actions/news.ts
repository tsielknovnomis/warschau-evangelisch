"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { readDoc, writeDoc } from "@/lib/storage";
import { isAdmin } from "@/lib/actions/guard";
import { warsawLocalToIso } from "@/lib/datetime";
import type { NewsItem } from "@/lib/types";
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
  show_until: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "„Anzeigen bis“: Datum ungültig").nullable(),
});

const KEY = "news";
const NOT_ALLOWED = { error: "Nicht angemeldet — bitte lade die Seite neu und melde dich an." };

function parse(formData: FormData) {
  return NewsSchema.safeParse({
    title: String(formData.get("title") ?? ""),
    slug: String(formData.get("slug") ?? ""),
    excerpt: String(formData.get("excerpt") ?? ""),
    body: String(formData.get("body") ?? ""),
    pinned: formData.get("pinned") === "on",
    published_at: String(formData.get("published_at") ?? ""),
    show_until: String(formData.get("show_until") ?? "").trim() || null,
  });
}

function revalidateNews(slug: string) {
  revalidatePath("/", "layout");
  revalidatePath("/gottesdienste");
  revalidatePath(`/aktuelles/${slug}`);
  revalidatePath("/sitemap.xml");
}

export async function createNews(_prev: FormState, formData: FormData): Promise<FormState> {
  if (!(await isAdmin())) return NOT_ALLOWED;
  const parsed = parse(formData);
  if (!parsed.success) return { error: parsed.error.issues[0].message };
  const v = parsed.data;

  const news = await readDoc<NewsItem[]>(KEY, []);
  if (news.some((n) => n.slug === v.slug)) return { error: "Dieser Slug ist schon vergeben." };
  news.push({
    id: crypto.randomUUID(),
    slug: v.slug,
    title: v.title,
    body: v.body,
    excerpt: v.excerpt,
    coverImage: null,
    pinned: v.pinned,
    publishedAt: warsawLocalToIso(v.published_at),
    showUntil: v.show_until,
  });
  await writeDoc(KEY, news);
  revalidateNews(v.slug);
  redirect("/admin?tab=aktuelles");
}

export async function updateNews(id: string, oldSlug: string, _prev: FormState, formData: FormData): Promise<FormState> {
  if (!(await isAdmin())) return NOT_ALLOWED;
  const parsed = parse(formData);
  if (!parsed.success) return { error: parsed.error.issues[0].message };
  const v = parsed.data;

  const news = await readDoc<NewsItem[]>(KEY, []);
  if (news.some((n) => n.slug === v.slug && n.id !== id)) {
    return { error: "Dieser Slug ist schon vergeben." };
  }
  const idx = news.findIndex((n) => n.id === id);
  if (idx === -1) return { error: "Beitrag nicht gefunden." };
  news[idx] = {
    ...news[idx],
    slug: v.slug,
    title: v.title,
    body: v.body,
    excerpt: v.excerpt,
    pinned: v.pinned,
    publishedAt: warsawLocalToIso(v.published_at),
    showUntil: v.show_until,
  };
  await writeDoc(KEY, news);
  revalidateNews(v.slug);
  if (oldSlug !== v.slug) revalidatePath(`/aktuelles/${oldSlug}`);
  redirect("/admin?tab=aktuelles");
}

export async function deleteNews(id: string, slug: string) {
  if (!(await isAdmin())) redirect("/admin/login");
  const news = await readDoc<NewsItem[]>(KEY, []);
  await writeDoc(KEY, news.filter((n) => n.id !== id));
  revalidateNews(slug);
  redirect("/admin?tab=aktuelles");
}
