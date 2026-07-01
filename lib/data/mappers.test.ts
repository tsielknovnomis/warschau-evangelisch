import { describe, it, expect } from "vitest";
import { rowToEvent, rowToNews, type EventRow, type NewsRow } from "@/lib/data/mappers";

describe("rowToEvent", () => {
  it("maps snake_case row to camelCase ChurchEvent", () => {
    const row: EventRow = {
      id: "e1",
      title: "Gottesdienst",
      starts_at: "2026-09-06T09:30:00+02:00",
      ends_at: null,
      location: "ul. Miodowa 21",
      description: null,
      is_special: true,
      with_communion: true,
      language: "de",
    };
    expect(rowToEvent(row)).toEqual({
      id: "e1",
      title: "Gottesdienst",
      startsAt: "2026-09-06T09:30:00+02:00",
      endsAt: null,
      location: "ul. Miodowa 21",
      description: null,
      isSpecial: true,
      withCommunion: true,
      language: "de",
    });
  });
});

describe("rowToNews", () => {
  it("maps snake_case row to camelCase NewsItem", () => {
    const row: NewsRow = {
      id: "n1",
      slug: "sommerpause",
      title: "Sommerpause",
      body: "Text",
      excerpt: "Kurz",
      cover_image: null,
      pinned: true,
      published_at: "2026-06-21T10:00:00+02:00",
    };
    expect(rowToNews(row)).toEqual({
      id: "n1",
      slug: "sommerpause",
      title: "Sommerpause",
      body: "Text",
      excerpt: "Kurz",
      coverImage: null,
      pinned: true,
      publishedAt: "2026-06-21T10:00:00+02:00",
    });
  });
});
