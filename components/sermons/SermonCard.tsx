import Link from "next/link";
import type { Sermon } from "@/lib/types";
import { formatShortDate } from "@/lib/format";

export function SermonCard({ sermon }: { sermon: Sermon }) {
  return (
    <Link
      href={`/predigten/${sermon.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-line bg-white transition-shadow hover:shadow-md"
    >
      <div className="relative flex aspect-video items-center justify-center bg-gradient-to-br from-aubergine to-aubergine-900">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/30 transition-transform group-hover:scale-110">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="white" aria-hidden>
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-coral">
          {formatShortDate(sermon.preachedOn)}
        </p>
        <h3 className="mt-1 font-serif text-lg text-aubergine">{sermon.title}</h3>
        {sermon.scripture && (
          <p className="mt-1 text-sm text-muted">{sermon.scripture}</p>
        )}
      </div>
    </Link>
  );
}
