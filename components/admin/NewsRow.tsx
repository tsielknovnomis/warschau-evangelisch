import Link from "next/link";
import type { NewsItem } from "@/lib/types";
import { deleteNews } from "@/lib/actions/news";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { formatShortDate } from "@/lib/format";
import { isNewsExpired, isPinActive } from "@/lib/news-visibility";

const badge = "rounded-full px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide";

/** One news item in the dashboard list. */
export function NewsRow({ item, now }: { item: NewsItem; now: number }) {
  const expired = isNewsExpired(item, now);
  return (
    <div className="flex items-center gap-4 px-4 py-3 sm:px-5">
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <p className="truncate font-display text-lg leading-snug text-aubergine">{item.title}</p>
          {expired && <span className={`${badge} bg-parchment-deep text-muted`}>Abgelaufen</span>}
          {isPinActive(item, now) && <span className={`${badge} bg-gold-tint text-gold-deep`}>📌 Angepinnt</span>}
          {item.pinned && !expired && !isPinActive(item, now) && (
            <span className={`${badge} bg-parchment-deep text-muted`}>📌 Anpinnung beendet</span>
          )}
        </div>
        <p className="mt-0.5 truncate text-sm text-muted">
          {formatShortDate(item.publishedAt)} · {item.excerpt}
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <Link
          href={`/admin/aktuelles/${item.id}`}
          className="rounded-[3px] border border-line px-3 py-1.5 text-sm font-semibold text-aubergine transition-colors hover:border-aubergine hover:bg-aubergine-50"
        >
          Bearbeiten
        </Link>
        <DeleteButton action={deleteNews.bind(null, item.id, item.slug)} />
      </div>
    </div>
  );
}
