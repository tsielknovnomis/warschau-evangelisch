import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SpendenkontoCard } from "@/components/content/SpendenkontoCard";

export function SpendenBlock() {
  return (
    <section className="border-t border-line bg-parchment-deep py-20 lg:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <p className="kicker">Unterstützen</p>
            <h2 className="mt-4 font-display text-3xl font-medium leading-tight text-aubergine sm:text-[2.6rem]">
              Unsere Arbeit möglich machen
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink/85">
              Unsere Gemeinde finanziert sich ausschließlich aus freiwilligen
              Zuwendungen ihrer Mitglieder und Freunde. Wer unsere Arbeit unterstützen
              möchte, ist herzlich eingeladen — über jede Gabe freuen wir uns, und sei
              sie noch so klein.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Du möchtest dich enger einbringen oder Mitglied werden? Auch das geht
              ganz unkompliziert.
            </p>
            <p className="mt-7">
              <Link href="/ueber-uns/verein/beitritt" className="font-body font-semibold text-aubergine underline decoration-gold/60 underline-offset-4 hover:text-gold-deep">
                Mitglied werden
              </Link>
            </p>
          </div>
          <SpendenkontoCard />
        </div>
      </Container>
    </section>
  );
}
