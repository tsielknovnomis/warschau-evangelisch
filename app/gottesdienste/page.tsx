import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/content/PageHeader";
import { EventCard } from "@/components/events/EventCard";
import { Card } from "@/components/ui/Card";
import { getUpcomingEvents } from "@/lib/seed/events";
import { getNews } from "@/lib/seed/news";
import { siteConfig } from "@/lib/site-config";
import { formatShortDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Termine & Aktuelles",
  description:
    "Kommende Gottesdienste und Neuigkeiten aus unserer deutschsprachigen Gemeinde in Warschau.",
};

export default function Page() {
  const events = getUpcomingEvents();
  const news = getNews();

  return (
    <>
      <PageHeader
        title="Termine & Aktuelles"
        eyebrow="Was bei uns ansteht"
        lead={`Wir feiern in der Regel in der ${siteConfig.address.street}, 2. Stock (Synodalsaal). ${siteConfig.service.rhythm}`}
      />

      {/* Termine */}
      <Container className="py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_18rem]">
          <div>
            <h2 className="font-display text-2xl font-medium text-aubergine">Kommende Gottesdienste</h2>
            <div className="mt-5 space-y-4">
              {events.length > 0 ? (
                events.map((e, i) => <EventCard key={e.id} event={e} highlight={i === 0} />)
              ) : (
                <p className="text-muted">
                  Zurzeit ist Sommerpause. Die nächsten Termine kündigen wir hier an — schreib uns
                  gern jederzeit.
                </p>
              )}
            </div>
          </div>

          <aside className="space-y-5">
            <Card tone="cream">
              <h3 className="font-display text-lg text-aubergine">Gut zu wissen</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{siteConfig.service.summerBreak}</p>
            </Card>
            <Card tone="cream">
              <h3 className="font-display text-lg text-aubergine">Ort</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {siteConfig.address.street}
                <br />
                {siteConfig.address.postalCode} {siteConfig.address.city}
                <br />
                {siteConfig.address.accessNote}
              </p>
              <Link href="/anfahrt" className="mt-3 inline-block text-sm font-semibold text-aubergine hover:text-gold-deep">
                Anfahrt &amp; Karte →
              </Link>
            </Card>
          </aside>
        </div>
      </Container>

      {/* Aktuelles */}
      <section id="aktuelles" className="scroll-mt-24 border-t border-line bg-parchment-deep py-14 lg:py-16">
        <Container>
          <h2 className="font-display text-2xl font-medium text-aubergine">Aktuelles aus der Gemeinde</h2>
          <div className="mt-6 space-y-4">
            {news.map((n) => (
              <Link
                key={n.id}
                href={`/aktuelles/${n.slug}`}
                className="group block rounded-[4px] border border-line bg-surface p-6 transition-all hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-md"
              >
                <p className="font-body text-xs font-semibold uppercase tracking-[0.12em] text-gold-deep">
                  {formatShortDate(n.publishedAt)}
                  {n.pinned && <span className="ml-2 text-aubergine">· angepinnt</span>}
                </p>
                <h3 className="mt-1.5 font-display text-xl text-aubergine">{n.title}</h3>
                <p className="mt-2 text-muted">{n.excerpt}</p>
                <span className="mt-3 inline-block font-body text-sm font-semibold text-aubergine group-hover:text-gold-deep">
                  Weiterlesen →
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
