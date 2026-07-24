import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/content/PageHeader";
import { Reveal } from "@/components/motion/Reveal";
import { Lutherrose } from "@/components/content/Lutherrose";
import { bibleserverUrl } from "@/lib/bible";

export const metadata: Metadata = {
  title: "Was wir wollen und glauben",
  description:
    "Unser Leitbild: Wir laden zu einem Leben mit Jesus Christus ein — als Suchende, die gemeinsam auf dem Weg sind. Deutschsprachige evangelisch-lutherische Gemeinde in Warschau.",
};

const sections = [
  {
    heading: "Einladen — zu einem Leben mit Christus",
    text: "Durch gemeinsame Gottesdienste und andere Aktivitäten wollen wir möglichst viele Menschen zu einem Leben mit einer persönlichen Beziehung zu Jesus Christus einladen. Wir wollen uns selbst und anderen helfen, durch Jesus Orientierung, Stärkung, Heilung, Befreiung und Versöhnung mit Gott zu finden.",
  },
  {
    heading: "Gemeinsam auf dem Weg — mit Fragen und Zweifeln",
    text: "Dabei verstehen wir uns alle als Suchende mit Fragen und Zweifeln, die gemeinsam auf dem Weg sind, Gott, wie er sich in Jesus Christus zeigt und uns ganz nahe kommen will, immer besser kennenzulernen. Wir glauben, dass er der Weg und die Wahrheit und das Leben ist, und möchten im Vertrauen auf seine Kraft, Liebe und Vergebung unser Leben führen. Deshalb wollen wir füreinander Sorge tragen und Begleitung auf dem Lebensweg anbieten. Maßgebliche Quelle, Regel und Richtschnur ist dabei Gottes Wort in der Heiligen Schrift des Alten und Neuen Testaments.",
  },
  {
    heading: "Der Gottesdienst — Mitte unseres Gemeindelebens",
    text: "Zentrum des Gemeindelebens sind die Gottesdienste, in denen wir gemeinsam die Begegnung mit Gott suchen, Ihm die Ehre geben, auf Sein Wort hören und geistlich auftanken. Durch Seine Nähe erleben wir Stärkung und Ermutigung, heilende und in das Leben eingreifende Veränderung. Dabei schätzen wir biblisch begründete Predigten, die sich auf unseren Alltag beziehen und den Glauben stärken, eine lebendige Liturgie und das Heilige Abendmahl, durch das wir sichtbar Gemeinschaft mit Christus und untereinander haben.",
  },
];

export default function Page() {
  return (
    <>
      <PageHeader
        title="Was wir wollen und glauben"
        eyebrow="Unser Leitbild"
        lead="Woran wir uns orientieren — und wozu wir jeden Menschen herzlich einladen."
      />

      {/* Scripture band — deep aubergine stage, quote right-aligned (board format) */}
      <section className="relative overflow-hidden border-b border-gold/30 bg-aubergine-deep py-20 lg:py-24">
        {/* Ornamental Lutherrose, softly glowing on the left */}
        <div aria-hidden className="pointer-events-none absolute -left-16 top-1/2 -translate-y-1/2 opacity-[0.14]">
          <Lutherrose className="h-72 w-72 lg:h-96 lg:w-96" alt="" />
        </div>
        <Container className="relative">
          <Reveal>
            <figure className="ml-auto max-w-2xl border-r-[3px] border-gold pr-5 text-right sm:pr-6">
              <blockquote className="font-display text-xl italic leading-snug text-white sm:text-2xl">
                „Ich bin der Weg und die Wahrheit und das Leben; niemand kommt zum
                Vater als nur durch mich.“
              </blockquote>
              <figcaption className="mt-2 font-body text-xs font-semibold uppercase tracking-[0.18em] text-gold-soft">
                <a
                  href={bibleserverUrl("Johannes 14,6")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  Johannes 14,6
                </a>
              </figcaption>
            </figure>
          </Reveal>
        </Container>
      </section>

      {/* The leitbild as a path — a golden line with three stations */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="relative mx-auto max-w-3xl">
            {/* the way */}
            <div
              aria-hidden
              className="absolute bottom-2 left-[7px] top-2 w-px bg-gradient-to-b from-gold/70 via-gold/40 to-transparent"
            />
            <div className="space-y-14 lg:space-y-16">
              {sections.map((s, i) => (
                <Reveal key={s.heading} delay={i * 0.05}>
                  <div className="relative pl-10 sm:pl-14">
                    {/* station marker on the line */}
                    <span
                      aria-hidden
                      className="absolute left-0 top-2 h-[15px] w-[15px] rounded-full border-2 border-gold bg-surface shadow-[0_0_0_4px_rgba(163,133,79,0.15)]"
                    />
                    <span className="font-display text-2xl italic leading-none text-gold-deep">
                      0{i + 1}
                    </span>
                    <h2 className="mt-2 font-display text-2xl font-medium leading-snug text-aubergine sm:text-[1.7rem]">
                      {s.heading}
                    </h2>
                    <p className="mt-4 text-lg leading-relaxed text-ink/85">{s.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Gentle onward invitation */}
      <section className="border-t border-line bg-parchment-deep py-16 lg:py-20">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <Lutherrose className="mx-auto h-9 w-9" alt="" />
              <h2 className="mt-5 font-display text-2xl font-medium text-aubergine sm:text-3xl">
                Erlebe es am besten selbst
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-lg text-muted">
                Der beste Ort, uns kennenzulernen, ist der Gottesdienst — komm einfach
                vorbei, so wie du bist.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
                <Link
                  href="/gottesdienste"
                  className="rounded-[3px] bg-aubergine px-6 py-3 font-body font-semibold text-bg shadow-sm transition-colors hover:bg-aubergine-deep"
                >
                  Zu den Gottesdiensten
                </Link>
                <Link
                  href="/ueber-uns"
                  className="inline-flex items-center font-body font-semibold text-aubergine underline decoration-gold/60 underline-offset-4 hover:text-gold-deep"
                >
                  Mehr über unsere Gemeinde
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
