import type { ChurchEvent } from "@/lib/types";
import { formatDate, formatTime } from "@/lib/format";

export function EventCard({ event, highlight = false }: { event: ChurchEvent; highlight?: boolean }) {
  const cancelled = Boolean(event.cancelled);
  const hl = highlight && !cancelled;
  return (
    <article
      className={`flex flex-col gap-2 rounded-[4px] border p-5 sm:flex-row sm:items-center sm:gap-6 ${
        hl
          ? "border-gold/50 bg-aubergine-deep text-bg"
          : cancelled
            ? "border-dashed border-line bg-surface/60"
            : "border-line bg-surface"
      }`}
    >
      <div className={`sm:w-48 sm:shrink-0 sm:border-r sm:pr-6 ${hl ? "sm:border-white/15" : "sm:border-line"}`}>
        <p
          className={`font-display text-lg ${
            hl ? "text-white" : cancelled ? "text-muted line-through decoration-1" : "text-aubergine"
          }`}
        >
          {formatDate(event.startsAt)}
        </p>
        <p className={`text-sm ${hl ? "text-gold-soft" : "text-muted"} ${cancelled ? "line-through" : ""}`}>
          {formatTime(event.startsAt)}
        </p>
      </div>
      <div className="flex-1">
        {cancelled ? (
          <>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-red-800">
                Entfällt
              </span>
              <h3 className="font-display text-xl text-muted line-through decoration-1">{event.title}</h3>
            </div>
            <p className="mt-1.5 text-sm text-ink/80">
              {event.cancelNote || "Dieser Gottesdienst entfällt."}
            </p>
          </>
        ) : (
          <>
            <h3 className={`font-display text-xl ${hl ? "text-white" : "text-aubergine"}`}>
              {event.title}
            </h3>
            <p className={`mt-1 text-sm ${hl ? "text-bg/70" : "text-muted"}`}>{event.location}</p>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {event.isSpecial && (
                <span className={`rounded-full px-2.5 py-0.5 text-xs ${hl ? "bg-gold/20 text-gold-soft" : "bg-gold-tint text-gold-deep"}`}>
                  besonderer Gottesdienst
                </span>
              )}
            </div>
          </>
        )}
      </div>
    </article>
  );
}
