import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/site-config";

export function Ansprechpartner() {
  const { people, contact, social } = siteConfig;
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

        {/* WhatsApp — the most personal, everyday way to reach us & the community */}
        <div className="mt-8 flex flex-col gap-5 rounded-[4px] border border-gold/40 bg-surface p-7 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
          <div>
            <h3 className="font-display text-xl text-aubergine">
              Am persönlichsten: unsere WhatsApp-Gruppe
            </h3>
            <p className="mt-1.5 max-w-2xl text-muted">
              Hier erreichst du uns direkt und bist mitten in der Gemeinschaft — wir
              teilen Termine, Neuigkeiten und kleine Momente aus dem Gemeindeleben.
            </p>
          </div>
          <a
            href={social.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center justify-center gap-2.5 rounded-[3px] bg-aubergine px-6 py-3 font-body text-base font-semibold tracking-wide text-bg shadow-sm transition-all duration-200 hover:bg-aubergine-deep hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-parchment-deep"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 shrink-0" aria-hidden>
              <path d="M17.5 14.4c-.3-.1-1.7-.8-1.9-.9-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.3 5.1 4.6.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2z" />
            </svg>
            Zur WhatsApp-Gruppe
          </a>
        </div>
      </Container>
    </section>
  );
}
