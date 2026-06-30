import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/site-config";

export function Ansprechpartner() {
  const { people, contact } = siteConfig;
  return (
    <section className="border-t border-line bg-parchment-deep py-16 lg:py-20">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <p className="kicker">Die Menschen dahinter</p>
            <h2 className="mt-4 font-display text-3xl font-medium leading-tight text-aubergine sm:text-[2.4rem]">
              Du erreichst uns ganz direkt
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink/85">
              Unsere Gemeinde lebt vom Engagement vieler — vom Pfarrer bis zu den
              ehrenamtlichen Mitgliedern des Vorstands. Hast du eine Frage, möchtest du
              dich vorstellen oder einfach mehr wissen? Schreib uns. Wir antworten
              persönlich.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-[4px] border border-line bg-surface p-6">
              <p className="font-body text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-gold-deep">
                Pfarrer
              </p>
              <p className="mt-2 font-display text-xl text-aubergine">{people.pastor.name}</p>
              <a href={`mailto:${contact.pastor}`} className="mt-3 inline-block text-sm text-aubergine underline decoration-gold/50 underline-offset-2 hover:text-gold-deep">
                {contact.pastor}
              </a>
            </div>
            <div className="rounded-[4px] border border-line bg-surface p-6">
              <p className="font-body text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-gold-deep">
                Vorstand
              </p>
              <ul className="mt-2 space-y-0.5 text-ink/85">
                {people.board.map((name) => (
                  <li key={name} className="font-display text-lg">{name}</li>
                ))}
              </ul>
              <a href={`mailto:${contact.general}`} className="mt-3 inline-block text-sm text-aubergine underline decoration-gold/50 underline-offset-2 hover:text-gold-deep">
                {contact.general}
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
