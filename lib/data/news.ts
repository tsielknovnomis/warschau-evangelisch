import { getSupabasePublic } from "@/lib/supabase/public";
import { rowToNews } from "@/lib/data/mappers";
import type { NewsItem } from "@/lib/types";

/** All news: pinned first, then newest first. */
export async function getNews(): Promise<NewsItem[]> {
  const supabase = getSupabasePublic();
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .order("pinned", { ascending: false })
    .order("published_at", { ascending: false });
  if (error || !data) return [];
  return data.map(rowToNews);
}

/** The pinned news item (drives the announcement), or null. */
export async function getPinnedNews(): Promise<NewsItem | null> {
  const supabase = getSupabasePublic();
  const { data } = await supabase
    .from("news")
    .select("*")
    .eq("pinned", true)
    .order("published_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  return data ? rowToNews(data) : null;
}

export async function getNewsBySlug(slug: string): Promise<NewsItem | null> {
  const supabase = getSupabasePublic();
  const { data } = await supabase.from("news").select("*").eq("slug", slug).maybeSingle();
  return data ? rowToNews(data) : null;
}

export async function getNewsById(id: string): Promise<NewsItem | null> {
  const supabase = getSupabasePublic();
  const { data } = await supabase.from("news").select("*").eq("id", id).maybeSingle();
  return data ? rowToNews(data) : null;
}
