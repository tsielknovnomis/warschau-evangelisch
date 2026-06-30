import Link from "next/link";
import type { Sermon } from "@/lib/types";
import { formatShortDate } from "@/lib/format";
import { YouTubeThumb } from "@/components/sermons/YouTubeThumb";

export function SermonCard({ sermon }: { sermon: Sermon }) {
  return (
    <Link
      href={`/predigten/${sermon.slug}`}
      className="group flex flex-col overflow-hidden rounded-[4px] border border-line bg-surface transition-all hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-lg"
    >
      <div className="relative aspect-video overflow-hidden bg-aubergine-deep">
        <YouTubeThumb
          id={sermon.youtubeId}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div aria-hidden className="absolute inset-0 bg-aubergine-deep/15 transition-colors group-hover:bg-aubergine-deep/0" />
        <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-aubergine-deep/70 backdrop-blur-sm transition-transform group-hover:scale-110">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white" aria-hidden>
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="font-body text-xs font-semibold uppercase tracking-[0.12em] text-gold-deep">
          {formatShortDate(sermon.preachedOn)}
        </p>
        <h3 className="mt-1.5 font-display text-lg text-aubergine">{sermon.title}</h3>
        {sermon.scripture && (
          <p className="mt-1 text-sm italic text-muted">{sermon.scripture}</p>
        )}
      </div>
    </Link>
  );
}
