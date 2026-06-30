import Link from "next/link";
import { Container } from "@/components/ui/Container";

const ziele = [
  { href: "/ueber-uns/geschichte", title: "Geschichte", text: "Wie unsere Gemeinde über die Jahre gewachsen ist." },
  { href: "/ueber-uns/verein", title: "Verein & Mitgliedschaft", text: "Wer wir als Verein sind — und wie du Mitglied wirst." },
  { href: "/anfahrt", title: "Anfahrt", text: "So findest du den Weg zu uns in die ul. Miodowa." },
  { href: "/links", title: "Links", text: "Partnerkirchen, Bibel-Ressourcen und mehr." },
];

export function Wegweiser() {
  return (
    <section className="border-t border-line bg-bg py-20 lg:py-24">
      <Container>
        <div className="max-w-2xl">
          <p className="kicker">Mehr entdecken</p>
          <h2 className="mt-4 font-display text-3xl font-medium leading-tight text-aubergine sm:text-[2.6rem]">
            Schau dich weiter um
          </h2>
        </div>
        <div className="mt-12 grid gap-px overflow-hidden rounded-[4px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {ziele.map((z) => (
            <Link
              key={z.href}
              href={z.href}
              className="group flex flex-col bg-surface p-6 transition-colors hover:bg-aubergine-50"
            >
              <h3 className="font-display text-xl text-aubergine">{z.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{z.text}</p>
              <span className="mt-4 font-body text-sm font-semibold text-aubergine transition-transform group-hover:translate-x-0.5">
                Ansehen →
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
