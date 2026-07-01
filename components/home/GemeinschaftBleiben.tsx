import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { siteConfig } from "@/lib/site-config";

export function GemeinschaftBleiben() {
  return (
    <section className="border-t border-line bg-bg py-20 lg:py-24">
      <Container width="narrow">
        <Reveal>
          <div className="rounded-[4px] border border-gold/30 bg-surface p-8 text-center sm:p-12">
            <p className="kicker justify-center" style={{ display: "flex" }}>
              In Verbindung bleiben
            </p>
            <h2 className="mt-4 font-display text-3xl font-medium leading-tight text-aubergine sm:text-[2.4rem]">
              Lern uns kennen — auch von zu Hause aus
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink/85">
              In unserer WhatsApp-Gruppe teilen wir, wann der nächste Gottesdienst ist,
              was in der Gemeinde gerade los ist und kleine Momente aus dem Gemeindeleben.
              Ein schöner Weg, uns kennenzulernen und dabei zu sein.
            </p>
            <div className="mt-8">
              <a
                href={siteConfig.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 rounded-[3px] bg-aubergine px-7 py-3.5 font-body text-base font-semibold tracking-wide text-bg shadow-sm transition-all duration-200 hover:bg-aubergine-deep hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 shrink-0" aria-hidden>
                  <path d="M17.5 14.4c-.3-.1-1.7-.8-1.9-.9-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.3 5.1 4.6.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2z" />
                </svg>
                Zur WhatsApp-Gruppe
              </a>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
