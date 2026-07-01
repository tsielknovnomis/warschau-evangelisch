import type { ChurchEvent, NewsItem } from "@/lib/types";

export type EventRow = {
  id: string;
  title: string;
  starts_at: string;
  ends_at: string | null;
  location: string;
  description: string | null;
  is_special: boolean;
  with_communion: boolean;
  language: string;
};

export type NewsRow = {
  id: string;
  slug: string;
  title: string;
  body: string;
  excerpt: string;
  cover_image: string | null;
  pinned: boolean;
  published_at: string;
};

export function rowToEvent(r: EventRow): ChurchEvent {
  return {
    id: r.id,
    title: r.title,
    startsAt: r.starts_at,
    endsAt: r.ends_at,
    location: r.location,
    description: r.description,
    isSpecial: r.is_special,
    withCommunion: r.with_communion,
    language: r.language as ChurchEvent["language"],
  };
}

export function rowToNews(r: NewsRow): NewsItem {
  return {
    id: r.id,
    slug: r.slug,
    title: r.title,
    body: r.body,
    excerpt: r.excerpt,
    coverImage: r.cover_image,
    pinned: r.pinned,
    publishedAt: r.published_at,
  };
}
