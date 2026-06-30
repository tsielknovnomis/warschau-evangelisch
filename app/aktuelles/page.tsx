import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/content/PageHeader";
import { Card } from "@/components/ui/Card";
import { getNews } from "@/lib/seed/news";
import { formatShortDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Aktuelles",
  description: "Neuigkeiten und Ankündigungen aus unserer Gemeinde.",
};

export default function Page() {
  const news = getNews();
  return (
    <>
      <PageHeader title="Aktuelles" eyebrow="Aus der Gemeinde" />
      <Container className="py-12">
        <div className="space-y-5">
          {news.map((n) => (
            <Card key={n.id}>
              <p className="font-body text-xs font-semibold uppercase tracking-[0.12em] text-gold-deep">
                {formatShortDate(n.publishedAt)}
                {n.pinned && <span className="ml-2 text-aubergine">· angepinnt</span>}
              </p>
              <h2 className="mt-1 font-display text-2xl text-aubergine">{n.title}</h2>
              <p className="mt-2 text-muted">{n.excerpt}</p>
              <Link
                href={`/aktuelles/${n.slug}`}
                className="mt-3 inline-block text-sm font-semibold text-aubergine hover:underline"
              >
                Weiterlesen →
              </Link>
            </Card>
          ))}
        </div>
      </Container>
    </>
  );
}
