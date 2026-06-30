import type { ChurchEvent } from "@/lib/types";
import { formatDate, formatTime } from "@/lib/format";

export function EventCard({ event, highlight = false }: { event: ChurchEvent; highlight?: boolean }) {
  return (
    <article
      className={`flex flex-col gap-2 rounded-[4px] border p-5 sm:flex-row sm:items-center sm:gap-6 ${
        highlight
          ? "border-gold/50 bg-aubergine-deep text-bg"
          : "border-line bg-surface"
      }`}
    >
      <div className={`sm:w-48 sm:shrink-0 sm:border-r sm:pr-6 ${highlight ? "sm:border-white/15" : "sm:border-line"}`}>
        <p className={`font-display text-lg ${highlight ? "text-white" : "text-aubergine"}`}>
          {formatDate(event.startsAt)}
        </p>
        <p className={`text-sm ${highlight ? "text-gold-soft" : "text-muted"}`}>
          {formatTime(event.startsAt)}
        </p>
      </div>
      <div className="flex-1">
        <h3 className={`font-display text-xl ${highlight ? "text-white" : "text-aubergine"}`}>
          {event.title}
        </h3>
        <p className={`mt-1 text-sm ${highlight ? "text-bg/70" : "text-muted"}`}>{event.location}</p>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {event.withCommunion && (
            <span className={`rounded-full px-2.5 py-0.5 text-xs ${highlight ? "bg-white/10 text-gold-soft" : "bg-aubergine-50 text-aubergine-700"}`}>
              mit Heiligem Abendmahl
            </span>
          )}
          {event.isSpecial && (
            <span className={`rounded-full px-2.5 py-0.5 text-xs ${highlight ? "bg-gold/20 text-gold-soft" : "bg-gold-tint text-gold-deep"}`}>
              besonderer Gottesdienst
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
