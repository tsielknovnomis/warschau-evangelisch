import type { ChurchEvent } from "@/lib/types";
import { formatDate, formatTime } from "@/lib/format";

export function EventCard({ event, highlight = false }: { event: ChurchEvent; highlight?: boolean }) {
  return (
    <article
      className={`flex flex-col gap-1 rounded-lg border p-5 sm:flex-row sm:items-center sm:gap-6 ${
        highlight ? "border-aubergine bg-aubergine-50" : "border-line bg-white"
      }`}
    >
      <div className="sm:w-44 sm:shrink-0">
        <p className="font-serif text-lg text-aubergine">{formatDate(event.startsAt)}</p>
        <p className="text-sm text-muted">{formatTime(event.startsAt)}</p>
      </div>
      <div className="flex-1">
        <h3 className="font-serif text-xl text-aubergine">{event.title}</h3>
        <p className="mt-1 text-sm text-muted">{event.location}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {event.withCommunion && (
            <span className="rounded-full bg-cream px-2.5 py-0.5 text-xs text-aubergine-600">
              mit Heiligem Abendmahl
            </span>
          )}
          {event.isSpecial && (
            <span className="rounded-full bg-coral/10 px-2.5 py-0.5 text-xs text-coral-600">
              besonderer Gottesdienst
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
