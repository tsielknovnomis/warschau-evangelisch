import Link from "next/link";
import type { ChurchEvent } from "@/lib/types";
import { deleteEvent } from "@/lib/actions/events";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { formatTime } from "@/lib/format";

const TZ = "Europe/Warsaw";
const wdFmt = new Intl.DateTimeFormat("de-DE", { weekday: "short", timeZone: TZ });
const dayFmt = new Intl.DateTimeFormat("de-DE", { day: "numeric", timeZone: TZ });
const monFmt = new Intl.DateTimeFormat("de-DE", { month: "short", year: "2-digit", timeZone: TZ });

/** One event in the dashboard list — calendar tile, badges, actions. */
export function EventRow({ event, isNext = false }: { event: ChurchEvent; isNext?: boolean }) {
  const d = new Date(event.startsAt);
  return (
    <div
      className={`flex items-center gap-4 px-4 py-3 sm:px-5 ${isNext ? "bg-gold-tint/40" : ""}`}
    >
      {/* calendar tile */}
      <div
        className={`flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-[6px] leading-none ${
          isNext ? "bg-aubergine text-bg" : "bg-aubergine-50 text-aubergine"
        }`}
      >
        <span className="text-[0.6rem] font-semibold uppercase tracking-wide opacity-80">
          {wdFmt.format(d)}
        </span>
        <span className="font-display text-xl font-medium">{dayFmt.format(d)}</span>
        <span className="text-[0.6rem] uppercase tracking-wide opacity-80">{monFmt.format(d)}</span>
      </div>

      {/* title + meta */}
      <div className="min-w-0 flex-1">
        <p className="truncate font-display text-lg leading-snug text-aubergine">
          {event.title}
        </p>
        <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
          <span>{formatTime(event.startsAt)}</span>
          {isNext && (
            <span className="rounded-full bg-aubergine px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-bg">
              Als Nächstes
            </span>
          )}
          {event.isSpecial && (
            <span className="rounded-full bg-gold-tint px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-gold-deep">
              Besonders
            </span>
          )}
        </div>
      </div>

      {/* actions */}
      <div className="flex shrink-0 items-center gap-3">
        <Link
          href={`/admin/termine/${event.id}`}
          className="rounded-[3px] border border-line px-3 py-1.5 text-sm font-semibold text-aubergine transition-colors hover:border-aubergine hover:bg-aubergine-50"
        >
          Bearbeiten
        </Link>
        <DeleteButton action={deleteEvent.bind(null, event.id)} />
      </div>
    </div>
  );
}
