import type { Sermon } from "@/lib/types";

// Seed sermons — the 17 YouTube IDs embedded on the legacy site (scraped/ASSET_INVENTORY.md).
// Only the most recent has a confirmed title/date; the rest carry placeholder
// titles/dates (TODO(verify)) and exist so the UI is complete before Plan 2
// wires the real catalogue from Supabase.

const youtubeIds = [
  "xHjDEox-gTU",
  "yTNAwib4dco",
  "jFWpNCuo9NQ",
  "hRflmmGXaIs",
  "h3N-3up1_zA",
  "fOglfqmyVA8",
  "SWXNsoxTJjg",
  "MFcx9sAge40",
  "FzNhPVmOQAQ",
  "ECqKLOtuBwM",
  "C7Z8rqyGL7c",
  "BqCQcuy-4is",
  "AnlCTyzFjxA",
  "5s-HzWnWuUg",
  "4jV_M37EfQ4",
  "3qrFUgtQSnM",
  "03lmXWdb4HI",
];

// Bi-weekly dates counting back from the known latest sermon (2026-02-22).
function dateBack(weeksBack: number): string {
  const base = new Date("2026-02-22T00:00:00Z");
  base.setUTCDate(base.getUTCDate() - weeksBack * 14);
  return base.toISOString().slice(0, 10);
}

const known: Partial<Record<string, Pick<Sermon, "title" | "scripture" | "preacher">>> = {
  "xHjDEox-gTU": {
    title: "Der Versuchung widerstehen",
    scripture: "Matthäus 4,1–11",
    preacher: "Dr. Grzegorz Olek",
  },
};

const sermons: Sermon[] = youtubeIds.map((id, i) => {
  const k = known[id];
  return {
    id: `s${i + 1}`,
    slug: `predigt-${id}`,
    title: k?.title ?? `Predigt (Aufzeichnung ${i + 1})`,
    preachedOn: dateBack(i),
    preacher: k?.preacher ?? null,
    scripture: k?.scripture ?? null,
    youtubeId: id,
    summary: k ? null : "TODO(verify): Titel, Datum und Bibelstelle ergänzen.",
    audioUrl: null,
  };
});

export function getSermons(): Sermon[] {
  return [...sermons].sort(
    (a, b) => +new Date(b.preachedOn) - +new Date(a.preachedOn),
  );
}

export function getLatestSermon(): Sermon | null {
  return getSermons()[0] ?? null;
}

export function getSermonBySlug(slug: string): Sermon | null {
  return sermons.find((s) => s.slug === slug) ?? null;
}
