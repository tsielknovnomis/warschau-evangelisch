import Link from "next/link";
import { Hero } from "@/components/content/Hero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SpendenkontoCard } from "@/components/content/SpendenkontoCard";
import { YouTubeLite } from "@/components/sermons/YouTubeLite";
import { getNextEvent } from "@/lib/seed/events";
import { getLatestSermon } from "@/lib/seed/sermons";
import { getNews } from "@/lib/seed/news";
import { formatDate, formatTime } from "@/lib/format";

const leitbild = [
  { title: "Was wir glauben", text: "Wir sind der evangelisch-lutherischen Tradition verbunden, aber offen für alle Menschen — unabhängig von Konfession, Nationalität oder Herkunft." },
  { title: "Gottesdienste", text: "Im Jahresverlauf alle zwei Wochen, im Advent jeden Sonntag, in der Regel mit Heiligem Abendmahl und anschließendem Gemeindekaffee." },
  { title: "Gemeinschaft", text: "Kindergottesdienste, Konfirmandenunterricht, Hauskreise und Familiengottesdienste — eine junge Gemeinschaft mit vielen Familien." },
];

export default function HomePage() {
  const nextEvent = getNextEvent();
  const sermon = getLatestSermon();
  const news = getNews().slice(0, 2);

  return (
    <>
      <Hero />

      {/* Next service + latest sermon */}
      <Container className="py-16">
        <div className="grid gap-8 lg:grid-cols-2">
          <Card tone="cream" className="flex flex-col">
            <p className="font-sans text-sm font-semibold uppercase tracking-wider text-coral">
              Nächster Gottesdienst
            </p>
            {nextEvent ? (
              <div className="mt-3 flex-1">
                <h2 className="font-serif text-2xl text-aubergine">{nextEvent.title}</h2>
                <p className="mt-3 text-lg">{formatDate(nextEvent.startsAt)}</p>
                <p className="text-muted">
                  {formatTime(nextEvent.startsAt)} · {nextEvent.location}
                </p>
                {nextEvent.withCommunion && (
                  <p className="mt-2 text-sm text-muted">mit Heiligem Abendmahl</p>
                )}
              </div>
            ) : (
              <p className="mt-3 flex-1 text-muted">Zurzeit keine Termine angekündigt.</p>
            )}
            <div className="mt-5">
              <Button href="/gottesdienste" variant="secondary">
                Alle Termine
              </Button>
            </div>
          </Card>

          {sermon && (
            <div>
              <p className="font-sans text-sm font-semibold uppercase tracking-wider text-coral">
                Neueste Predigt
              </p>
              <div className="mt-3">
                <YouTubeLite id={sermon.youtubeId} title={sermon.title} />
              </div>
              <p className="mt-3 text-sm text-muted">
                {sermon.scripture ? `${sermon.scripture} · ` : ""}
                <Link href="/predigten" className="hover:text-aubergine">
                  Weitere Predigten ansehen
                </Link>
              </p>
            </div>
          )}
        </div>
      </Container>

      {/* Leitbild */}
      <section className="bg-cream py-16">
        <Container>
          <SectionHeading eyebrow="Unsere Gemeinde" lead="Eine deutschsprachige evangelische Gemeinde im Herzen Warschaus.">
            Was uns ausmacht
          </SectionHeading>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {leitbild.map((s) => (
              <div key={s.title}>
                <h3 className="font-serif text-xl text-aubergine">{s.title}</h3>
                <p className="mt-2 text-muted">{s.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Button href="/ueber-uns" variant="secondary">
              Mehr über uns
            </Button>
          </div>
        </Container>
      </section>

      {/* Aktuelles */}
      <Container className="py-16">
        <SectionHeading eyebrow="Aktuelles">Neuigkeiten aus der Gemeinde</SectionHeading>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {news.map((n) => (
            <Card key={n.id} className="flex flex-col">
              <h3 className="font-serif text-xl text-aubergine">{n.title}</h3>
              <p className="mt-2 flex-1 text-muted">{n.excerpt}</p>
              <Link
                href={`/aktuelles/${n.slug}`}
                className="mt-4 text-sm font-semibold text-aubergine hover:underline"
              >
                Weiterlesen →
              </Link>
            </Card>
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
