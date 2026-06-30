import type { NewsItem } from "@/lib/types";

// Seed news. Plan 2 replaces these reads with Supabase queries (same shape).
// The `pinned` item drives the AnnouncementBar (replaces the old hard-coded banner).

const news: NewsItem[] = [
  {
    id: "n1",
    slug: "sommerpause-2026",
    title: "Sommerpause — nächster Gottesdienst am 6. September",
    body: "Während der Sommerferien pausieren unsere Gottesdienste. Nach der Pause feiern wir am 6. September 2026 um 09:30 Uhr den Einschulungsgottesdienst. Auf Anfrage sind wir auch in der Ferienzeit für Sie da — setzen Sie sich gerne mit uns in Verbindung.",
    excerpt:
      "Während der Sommerferien pausieren die Gottesdienste. Nächster Termin: 6. September, Einschulungsgottesdienst.",
    coverImage: null,
    pinned: true,
    publishedAt: "2026-06-21T10:00:00+02:00",
  },
  {
    id: "n2",
    slug: "konfirmandenunterricht",
    title: "Konfirmandenunterricht im neuen Zyklus",
    body: "Im Zweijahreszyklus bieten wir wieder Konfirmandenunterricht an. Interessierte Familien melden sich bitte unter info@warschau-evangelisch.de.",
    excerpt:
      "Im Zweijahreszyklus bieten wir wieder Konfirmandenunterricht an — Anmeldung per E-Mail.",
    coverImage: null,
    pinned: false,
    publishedAt: "2026-02-01T10:00:00+01:00",
  },
  {
    id: "n3",
    slug: "erntedankgottesdienst-2026",
    title: "Erntedankgottesdienst am 4. Oktober",
    body: "Am 4. Oktober 2026 feiern wir um 09:30 Uhr unseren Erntedankgottesdienst — ein Familiengottesdienst mit anschließendem Gemeindekaffee. Wir freuen uns auf dich.",
    excerpt:
      "Am 4. Oktober feiern wir Erntedank — ein Familiengottesdienst mit anschließendem Gemeindekaffee.",
    coverImage: null,
    pinned: false,
    publishedAt: "2026-09-10T10:00:00+02:00",
  },
];

export function getNews(): NewsItem[] {
  return [...news].sort(
    (a, b) =>
      Number(b.pinned) - Number(a.pinned) ||
      +new Date(b.publishedAt) - +new Date(a.publishedAt),
  );
}

export function getPinnedNews(): NewsItem | null {
  return news.find((n) => n.pinned) ?? null;
}

export function getNewsBySlug(slug: string): NewsItem | null {
  return news.find((n) => n.slug === slug) ?? null;
}
