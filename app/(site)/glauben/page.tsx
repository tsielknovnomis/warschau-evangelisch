import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/content/PageHeader";
import { Reveal } from "@/components/motion/Reveal";
import { Lutherrose } from "@/components/content/Lutherrose";

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

      {/* Leading scripture — the heart of the page */}
      <section className="border-b border-line bg-parchment-deep py-16 lg:py-20">
        <Container>
          <Reveal>
            <figure className="mx-auto max-w-3xl text-center">
              <Lutherrose className="mx-auto h-10 w-10" alt="" />
              <blockquote className="mt-6 font-display text-2xl font-medium italic leading-snug text-aubergine sm:text-[2rem]">
                „Ich bin der Weg und die Wahrheit und das Leben; niemand kommt zum
                Vater als nur durch mich."
              </blockquote>
              <figcaption className="mt-4 font-body text-sm font-semibold uppercase tracking-[0.18em] text-gold-deep">
                Johannes 14,6
              </figcaption>
            </figure>
          </Reveal>
        </Container>
      </section>

      {/* The three movements of the leitbild */}
      <section className="py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-3xl space-y-12">
            {sections.map((s, i) => (
              <Reveal key={s.heading} delay={i * 0.05}>
                <div className="border-l-[3px] border-gold/60 pl-6 sm:pl-8">
                  <h2 className="font-display text-2xl font-medium leading-snug text-aubergine">
                    {s.heading}
                  </h2>
                  <p className="mt-4 text-lg leading-relaxed text-ink/85">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Gentle onward invitation */}
      <section className="border-t border-line bg-parchment-deep py-14 lg:py-16">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-2xl font-medium text-aubergine sm:text-3xl">
              Erlebe es am besten selbst
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-lg text-muted">
              Der beste Ort, uns kennenzulernen, ist der Gottesdienst — komm einfach
              vorbei, so wie du bist.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-x-7 gap-y-3">
              <Link
                href="/gottesdienste"
                className="rounded-[3px] bg-aubergine px-6 py-3 font-body font-semibold text-bg transition-colors hover:bg-aubergine-deep"
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
        </Container>
      </section>
    </>
  );
}
