import Link from "next/link";
import { Hero } from "@/components/content/Hero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { SpendenkontoCard } from "@/components/content/SpendenkontoCard";
import { YouTubeLite } from "@/components/sermons/YouTubeLite";
import { getNextEvent } from "@/lib/seed/events";
import { getLatestSermon } from "@/lib/seed/sermons";
import { getNews } from "@/lib/seed/news";
import { formatDate, formatTime, formatShortDate } from "@/lib/format";

const leitbild = [
  { n: "I", title: "Was wir glauben", text: "Der evangelisch-lutherischen Tradition verbunden, offen für alle Menschen — unabhängig von Konfession, Nationalität oder Herkunft." },
  { n: "II", title: "Gottesdienste", text: "Alle zwei Wochen, im Advent jeden Sonntag, meist mit Heiligem Abendmahl und anschließendem Gemeindekaffee." },
  { n: "III", title: "Gemeinschaft", text: "Kindergottesdienste, Konfirmandenunterricht, Hauskreise und Familiengottesdienste — eine junge Gemeinschaft mit vielen Familien." },
];

export default function HomePage() {
  const nextEvent = getNextEvent();
  const sermon = getLatestSermon();
  const news = getNews().slice(0, 2);

  return (
    <>
      <Hero />

      {/* Next service + latest sermon */}
      <Container className="py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="flex flex-col">
            <p className="kicker">Der nächste Gottesdienst</p>
            {nextEvent ? (
              <div className="mt-4 flex-1">
                <h2 className="font-display text-3xl font-medium text-aubergine">{nextEvent.title}</h2>
                <div className="mt-5 flex items-baseline gap-3">
                  <span className="font-display text-xl text-gold-deep">{formatDate(nextEvent.startsAt)}</span>
                </div>
                <p className="mt-1 text-muted">
                  {formatTime(nextEvent.startsAt)} · {nextEvent.location}
                </p>
                {nextEvent.withCommunion && (
                  <p className="mt-2 text-sm italic text-muted">mit Heiligem Abendmahl</p>
                )}
              </div>
            ) : (
              <p className="mt-4 flex-1 text-muted">Zurzeit keine Termine angekündigt.</p>
            )}
            <div className="mt-6">
              <Button href="/gottesdienste" variant="secondary">
                Alle Termine ansehen
              </Button>
            </div>
          </div>

          {sermon && (
            <div>
              <p className="kicker">Die neueste Predigt</p>
              <div className="mt-4">
                <YouTubeLite id={sermon.youtubeId} title={sermon.title} />
              </div>
              <p className="mt-3 text-sm text-muted">
                {sermon.scripture ? <span className="italic">{sermon.scripture} · </span> : ""}
                <Link href="/predigten" className="font-medium text-aubergine hover:text-gold-deep">
                  Weitere Predigten
                </Link>
              </p>
            </div>
          )}
        </div>
      </Container>

      {/* Leitbild — warm band */}
      <section className="relative border-y border-line bg-parchment-deep py-16 lg:py-20">
        <Container>
          <SectionHeading eyebrow="Unsere Gemeinde" lead="Eine deutschsprachige evangelische Gemeinde im Herzen Warschaus.">
            Was uns ausmacht
          </SectionHeading>
          <div className="mt-12 grid gap-10 sm:grid-cols-3">
            {leitbild.map((s) => (
              <div key={s.title} className="border-t border-gold/40 pt-5">
                <span className="font-display text-2xl italic text-gold-deep">{s.n}</span>
                <h3 className="mt-2 font-display text-xl text-aubergine">{s.title}</h3>
                <p className="mt-2 text-muted">{s.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Button href="/ueber-uns" variant="primary">
              Mehr über uns
            </Button>
          </div>
        </Container>
      </section>

      {/* Aktuelles */}
      <Container className="py-16 lg:py-20">
        <div className="flex items-end justify-between gap-4">
          <SectionHeading eyebrow="Aus der Gemeinde">Aktuelles</SectionHeading>
          <Link href="/aktuelles" className="hidden shrink-0 font-medium text-aubergine hover:text-gold-deep sm:block">
            Alle Beiträge →
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {news.map((n) => (
            <Link
              key={n.id}
              href={`/aktuelles/${n.slug}`}
              className="group flex flex-col rounded-[4px] border border-line bg-surface p-6 transition-all hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-lg"
            >
              <p className="font-body text-xs font-semibold uppercase tracking-[0.12em] text-gold-deep">
                {formatShortDate(n.publishedAt)}
              </p>
              <h3 className="mt-2 font-display text-xl text-aubergine">{n.title}</h3>
              <p className="mt-2 flex-1 text-muted">{n.excerpt}</p>
              <span className="mt-4 font-medium text-aubergine group-hover:text-gold-deep">Weiterlesen →</span>
            </Link>
          ))}
        </div>
      </Container>

      {/* Spendenkonto */}
      <Container className="pb-20">
        <SpendenkontoCard />
      </Container>
    </>
  );
}
