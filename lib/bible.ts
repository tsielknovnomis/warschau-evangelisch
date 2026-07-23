/**
 * Link a scripture reference ("Matthäus 18,20") to bibleserver.com (Luther
 * translation) — the board wants every reference clickable as a gentle
 * nudge to read scripture directly.
 */
export function bibleserverUrl(ref: string): string {
  return `https://www.bibleserver.com/LUT/${encodeURIComponent(ref.replace(/\s+/g, ""))}`;
}
