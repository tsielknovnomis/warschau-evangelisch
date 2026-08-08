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
          <Bibelvers cite="Matthäus 18,20">
            Wo zwei oder drei in meinem Namen versammelt sind, da bin ich mitten unter
            ihnen.
          </Bibelvers>
        </div>
      </Container>

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
