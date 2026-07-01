import Link from "next/link";
import { getNews } from "@/lib/data/news";
import { deleteNews } from "@/lib/actions/news";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { formatShortDate } from "@/lib/format";

export default async function AktuellesList() {
  const news = await getNews();
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-medium text-aubergine">Aktuelles</h1>
        <Link
          href="/admin/aktuelles/neu"
          className="rounded-[3px] bg-aubergine px-4 py-2 text-sm font-semibold text-bg hover:bg-aubergine-deep"
        >
          + Neuer Beitrag
        </Link>
      </div>
      {news.length === 0 ? (
        <p className="mt-8 text-muted">Noch keine Beiträge angelegt.</p>
      ) : (
        <div className="mt-6 divide-y divide-line rounded-[6px] border border-line bg-surface">
          {news.map((n) => (
            <div key={n.id} className="flex items-center justify-between gap-4 px-5 py-3">
              <div>
                <p className="font-display text-lg text-aubergine">
                  {n.title}
                  {n.pinned && <span className="ml-2 text-xs font-semibold text-gold-deep">angepinnt</span>}
                </p>
                <p className="text-sm text-muted">{formatShortDate(n.publishedAt)}</p>
              </div>
              <div className="flex shrink-0 gap-4">
                <Link href={`/admin/aktuelles/${n.id}`} className="text-sm font-semibold text-aubergine hover:text-gold-deep">
                  Bearbeiten
                </Link>
                <DeleteButton action={deleteNews.bind(null, n.id, n.slug)} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
