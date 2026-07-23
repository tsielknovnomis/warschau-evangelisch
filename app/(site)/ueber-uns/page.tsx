import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/content/PageHeader";
import { Bibelvers } from "@/components/ui/Bibelvers";
import { Ansprechpartner } from "@/components/home/Ansprechpartner";

export const metadata: Metadata = {
  title: "Über uns",
  description:
    "Wir sind eine junge, internationale evangelisch-lutherische Gemeinde, die in Warschau Gottesdienste in deutscher Sprache feiert — offen für alle.",
};

const themen = [
  {
    title: "Gottesdienst feiern",
    text: "Wir feiern jeden zweiten und vierten Sonntag im Monat Gottesdienst, im Advent jeden Sonntag — auf Deutsch und mit Heiligem Abendmahl. Bitte beachte die aktuellen Infos auf dieser Webseite und in unserer WhatsApp-Gruppe.",
  },
  {
    title: "Gemeinschaft erleben",
    text: "Nach dem Gottesdienst gibt es Gelegenheit für weiteren Austausch bei Kaffee und Kuchen. Dazu kommen Hauskreise und Konfirmandenunterricht im Zweijahreszyklus — viele Gelegenheiten, einander näher kennenzulernen.",
  },
  {
    title: "Gelebtes Kirchenjahr",
    text: "Krippenspiel am Heiligabend, Ausschnitte aus dem Weihnachtsoratorium, ein Gemeindeausflug oder der Besuch eines Gastpredigers. Taufe, Trauung oder Trauer — wir begleiten dich in den großen Momenten des Lebens.",
  },
];

export default function Page() {
  return (
    <>
      <PageHeader
        title="Über uns"
        eyebrow="Unsere Gemeinde"
        lead="Eine junge, internationale evangelische Gemeinschaft, die in Warschau Gottesdienst in deutscher Sprache feiert."
      />

      {/* Identity */}
      <Container className="py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:gap-16">
          <div>
            <p className="text-xl leading-relaxed text-ink/85">
              Wir sind eine junge, lebendige Gemeinschaft evangelischer Christinnen und
              Christen unterschiedlicher Nationalitäten — viele von uns mit Familie.
              Unter dem Dach der <strong>Evangelisch-Augsburgischen Kirche in Polen</strong>{" "}
              feiern wir Gottesdienst auf Deutsch, mitten in Warschau.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              Unsere Gemeinde existiert mit Unterbrechungen seit den 1980er Jahren und
              wurde 2011 neu gegründet. Sie ist keine EKD-Auslandsgemeinde, sondern ein
              eingetragener Verein in enger Zusammenarbeit mit den polnischen Lutheranern.
            </p>
          </div>
          <Bibelvers cite="Matthäus 11,28">
            Kommt her zu mir alle, die ihr mühselig und beladen seid. Ich will euch
            erquicken.
          </Bibelvers>
        </div>
      </Container>

      {/* What we're about */}
      <section className="border-t border-line bg-parchment-deep py-16 lg:py-20">
        <Container>
          <div className="max-w-2xl">
            <p className="kicker">Das macht uns aus</p>
            <h2 className="mt-4 font-display text-3xl font-medium leading-tight text-aubergine sm:text-[2.4rem]">
              Geistliche Heimat — über die Sprache hinaus
            </h2>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {themen.map((t, i) => (
              <div key={t.title} className="border-t border-gold/40 pt-5">
                <span className="font-display text-2xl italic text-gold-deep">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-xl text-aubergine">{t.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{t.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Open to all */}
      <Container className="py-16 lg:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="kicker justify-center" style={{ display: "flex" }}>
            Offen für alle
          </p>
          <h2 className="mt-4 font-display text-3xl font-medium leading-tight text-aubergine sm:text-[2.4rem]">
            Du musst niemanden kennen, um dazuzugehören
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink/85">
            Wir sind der evangelisch-lutherischen Tradition verbunden — und offen für
            alle Menschen, unabhängig von Konfession, Nationalität oder Herkunft. Wer in
            deutscher Sprache Gott begegnen, Gemeinschaft erleben und eine geistige
            Heimat finden möchte, ist herzlich willkommen.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link href="/geschichte" className="font-body font-semibold text-aubergine underline decoration-gold/60 underline-offset-4 hover:text-gold-deep">
              Unsere Geschichte
            </Link>
            <Link href="/verein" className="font-body font-semibold text-aubergine underline decoration-gold/60 underline-offset-4 hover:text-gold-deep">
              Verein &amp; Mitgliedschaft
            </Link>
            <Link href="/gottesdienste" className="font-body font-semibold text-aubergine underline decoration-gold/60 underline-offset-4 hover:text-gold-deep">
              Termine
            </Link>
          </div>
        </div>
      </Container>

      {/* People / contact */}
      <Ansprechpartner />
    </>
  );
}
