// NOTE: Currently not rendered — the board (30.07.2026) replaced this section
// on the homepage with GeistlicheHeimat. Kept for possible later use.
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";

const einblicke = [
  {
    title: "Zusammen, nicht nebeneinander",
    text: "Nach jedem Gottesdienst bleiben wir bei Kaffee und Kuchen zusammen. Hier kommt man ins Gespräch — und aus Gesichtern werden Namen und Freunde.",
  },
  {
    title: "Für Familien und Kinder",
    text: "Während die Großen feiern, gibt es Kindergottesdienst. Und das Krippenspiel an Heiligabend ist jedes Jahr aufs Neue ein kleines Highlight.",
  },
  {
    title: "Mehr als nur sonntags",
    text: "Hauskreise, Konfirmandenunterricht, gemeinsame Ausflüge: Unsere Gemeinde lebt auch zwischen den Gottesdiensten — überall, wo Menschen zusammenkommen.",
  },
];

export function GemeindeLeben() {
  return (
    <section className="border-t border-line bg-parchment-deep py-20 lg:py-24">
      <Container>
        <Reveal>
          <div className="max-w-2xl">
            <p className="kicker">So ist es bei uns</p>
            <h2 className="mt-4 font-display text-3xl font-medium leading-tight text-aubergine sm:text-[2.6rem]">
              Eine Gemeinschaft, in der man ankommt
            </h2>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {einblicke.map((e, i) => (
              <div key={e.title} className="border-t border-gold/40 pt-5">
                <span className="font-display text-2xl italic text-gold-deep">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-xl text-aubergine">{e.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{e.text}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
