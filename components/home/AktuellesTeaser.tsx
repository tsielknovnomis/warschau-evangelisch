import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { getNews } from "@/lib/seed/news";
import { formatShortDate } from "@/lib/format";

export function AktuellesTeaser() {
  const news = getNews().slice(0, 3);
  if (news.length === 0) return null;

  return (
    <section className="border-t border-line bg-parchment-deep py-20 lg:py-24">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="kicker">Aus der Gemeinde</p>
            <h2 className="mt-4 font-display text-3xl font-medium leading-tight text-aubergine sm:text-[2.6rem]">
              Was bei uns gerade passiert
            </h2>
          </div>
          <Link href="/gottesdienste#aktuelles" className="font-body font-semibold text-aubergine underline decoration-gold/60 underline-offset-4 hover:text-gold-deep">
            Alle Beiträge
          </Link>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {news.map((n) => (
            <Link
              key={n.id}
              href={`/aktuelles/${n.slug}`}
              className="group flex flex-col rounded-[4px] border border-line bg-surface p-6 transition-all hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-lg"
            >
              <p className="font-body text-xs font-semibold uppercase tracking-[0.12em] text-gold-deep">
                {formatShortDate(n.publishedAt)}
              </p>
              <h3 className="mt-2 font-display text-xl leading-snug text-aubergine">{n.title}</h3>
              <p className="mt-2 flex-1 leading-relaxed text-muted">{n.excerpt}</p>
              <span className="mt-4 font-body text-sm font-semibold text-aubergine group-hover:text-gold-deep">
                Weiterlesen →
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
