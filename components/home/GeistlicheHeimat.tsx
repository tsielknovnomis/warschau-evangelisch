import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";

// Board decision (30.07.): this block moved from /ueber-uns to the homepage,
// replacing the previous "Eine Gemeinschaft, in der man ankommt" section.
const themen = [
  {
    title: "Gottesdienst feiern",
    text: "Wir feiern jeden zweiten und vierten Sonntag im Monat Gottesdienst, im Advent jeden Sonntag — auf Deutsch und mit Heiligem Abendmahl. Bitte beachte die aktuellen Infos auf dieser Webseite und in unserer WhatsApp-Gruppe.",
  },
  {
    title: "Gemeinschaft erleben",
    text: "Nach dem Gottesdienst gibt es Gelegenheit für weiteren Austausch bei Kaffee und Kuchen. Dazu kommen Hauskreise und Konfirmandenunterricht bei Bedarf — viele Gelegenheiten, einander näher kennenzulernen.",
  },
  {
    title: "Besondere Momente",
    text: "Festliche Weihnachtsgottesdienste, Gastmusiker und Gastprediger sowie gelegentliche Ausflüge. Taufe, Trauung oder Trauer — wir begleiten dich an den Wendepunkten des Lebens.",
  },
];

export function GeistlicheHeimat() {
  return (
    <section className="border-t border-line bg-parchment-deep py-16 lg:py-20">
      <Container>
        <Reveal>
          <div className="max-w-2xl">
            <p className="kicker">Das macht uns aus</p>
            <h2 className="mt-4 font-display text-3xl font-medium leading-tight text-aubergine sm:text-[2.4rem]">
              Geistliche Heimat —
              <br />
              über die Sprache hinaus
            </h2>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {themen.map((t, i) => (
            <Reveal key={t.title} delay={i * 0.06}>
              <div className="border-t border-gold/40 pt-5">
                <span className="font-display text-2xl italic text-gold-deep">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-xl text-aubergine">{t.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{t.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
