import { readDoc } from "@/lib/storage";
import type { NewsItem } from "@/lib/types";

const KEY = "news";

/** All news: pinned first, then newest first. */
export async function getNews(): Promise<NewsItem[]> {
  const news = await readDoc<NewsItem[]>(KEY, []);
  return [...news].sort(
    (a, b) =>
      Number(b.pinned) - Number(a.pinned) ||
      +new Date(b.publishedAt) - +new Date(a.publishedAt),
  );
}

/** The pinned news item (drives the announcement), or null. */
export async function getPinnedNews(): Promise<NewsItem | null> {
  return (await getNews()).find((n) => n.pinned) ?? null;
}

export async function getNewsBySlug(slug: string): Promise<NewsItem | null> {
  return (await getNews()).find((n) => n.slug === slug) ?? null;
}

export async function getNewsById(id: string): Promise<NewsItem | null> {
  return (await getNews()).find((n) => n.id === id) ?? null;
}
