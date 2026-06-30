import Link from "next/link";
import type { Sermon } from "@/lib/types";
import { formatShortDate } from "@/lib/format";

export function SermonCard({ sermon }: { sermon: Sermon }) {
  return (
    <Link
      href={`/predigten/${sermon.slug}`}
      className="group flex flex-col overflow-hidden rounded-[4px] border border-line bg-surface transition-all hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-lg"
    >
      <div className="relative flex aspect-video items-center justify-center overflow-hidden bg-gradient-to-br from-aubergine to-aubergine-deep">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.13]"
          style={{
            background:
              "repeating-conic-gradient(from 0deg at 50% 50%, var(--gold-soft) 0deg 0.4deg, transparent 0.4deg 9deg)",
            maskImage: "radial-gradient(circle, black 0%, transparent 65%)",
            WebkitMaskImage: "radial-gradient(circle, black 0%, transparent 65%)",
          }}
        />
        <span className="relative flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 bg-white/10 transition-transform group-hover:scale-110">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--gold-soft)" aria-hidden>
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
