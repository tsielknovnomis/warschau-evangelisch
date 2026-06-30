import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Lutherrose } from "@/components/content/Lutherrose";
import { siteConfig } from "@/lib/site-config";
import { getNextEvent } from "@/lib/seed/events";
import { formatDate, formatTime } from "@/lib/format";

const waIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-[1.15em] w-[1.15em]" aria-hidden>
    <path d="M17.5 14.4c-.3-.1-1.7-.8-1.9-.9-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.3 5.1 4.6.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2z" />
  </svg>
);

export function HeroD() {
  const next = getNextEvent();

  return (
    <section className="relative overflow-hidden bg-bg">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
        {/* Intro — personal invitation */}
        <div className="max-w-2xl">
          <p className="kicker reveal flex items-center gap-3" style={{ animationDelay: "0.05s" }}>
            <Lutherrose className="h-5 w-5" />
            Du bist eingeladen
          </p>
          <h1 className="reveal mt-5 font-display text-4xl font-medium leading-[1.05] text-aubergine sm:text-6xl" style={{ animationDelay: "0.12s" }}>
            Zwei Wege zu uns –<br />
            <span className="italic text-gold-deep">such dir deinen aus.</span>
          </h1>
          <p className="reveal mt-6 text-lg leading-relaxed text-ink/85" style={{ animationDelay: "0.2s" }}>
            Wir sind eine kleine, herzliche deutschsprachige Gemeinde in Warschau –
            Familien, Nachbarn, Neuankömmlinge. Komm sonntags vorbei, oder lern uns
            erst ganz unverbindlich kennen. Beides ist genau richtig.
          </p>
        </div>

        {/* Two paths */}
        <div className="mt-12 grid gap-5 lg:grid-cols-[1.15fr_1fr]">
          {/* Path 1 — attend a service (primary) */}
          <div className="reveal relative grid gap-6 overflow-hidden rounded-2xl border border-line bg-surface p-6 shadow-[0_24px_60px_-40px_rgba(72,0,72,0.45)] sm:grid-cols-[1fr_auto] sm:p-8" style={{ animationDelay: "0.3s" }}>
            <div>
              <p className="kicker">Weg 1 · Komm vorbei</p>
              <h2 className="mt-2 font-display text-2xl font-medium text-aubergine sm:text-[1.7rem]">
                Besuch einen Gottesdienst
              </h2>
              <dl className="mt-5 space-y-3 text-ink/90">
                <div className="flex items-baseline gap-3">
                  <dt className="w-20 shrink-0 font-body text-sm uppercase tracking-wide text-muted">Wann</dt>
                  <dd className="font-display text-lg">
                    {next ? (
                      <>
                        {formatDate(next.startsAt)}
                        <span className="block text-base text-ink/70">um {formatTime(next.startsAt)}</span>
                      </>
                    ) : (
                      <>
                        Sonntags um {siteConfig.service.time}
                        <span className="block text-base text-ink/70">Termine nach der Sommerpause folgen</span>
                      </>
                    )}
                  </dd>
                </div>
                <div className="flex items-baseline gap-3">
                  <dt className="w-20 shrink-0 font-body text-sm uppercase tracking-wide text-muted">Wo</dt>
                  <dd className="font-display text-lg">
                    {siteConfig.address.street}
                    <span className="block text-base text-ink/70">{siteConfig.address.city}</span>
                  </dd>
                </div>
              </dl>
              {next?.title && (
                <p className="mt-4 inline-flex rounded-full bg-aubergine-50 px-3 py-1 font-body text-sm text-aubergine-700">
                  {next.title}
                  {next.withCommunion ? " · mit Abendmahl" : ""}
                </p>
              )}
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href="/gottesdienste" variant="primary" size="lg">
                  Komm vorbei – alle Termine
                </Button>
              </div>
            </div>
            <div className="relative hidden w-40 overflow-hidden rounded-xl border border-gold/40 sm:block">
              <Image
                src="/images/altar-miodowa.png"
                alt="Beleuchteter Altar mit aufgeschlagener Bibel und Kruzifix in der Gemeinde an der ul. Miodowa"
                fill
                priority
                sizes="160px"
                className="object-cover object-center"
              />
            </div>
          </div>

          {/* Path 2 — WhatsApp (low-friction first step) */}
          <div className="reveal flex flex-col rounded-2xl border border-gold/45 bg-gold-tint p-6 shadow-[0_24px_60px_-40px_rgba(176,141,87,0.5)] sm:p-8" style={{ animationDelay: "0.4s" }}>
            <p className="kicker">Weg 2 · Der einfache erste Schritt</p>
            <h2 className="mt-2 font-display text-2xl font-medium text-aubergine sm:text-[1.7rem]">
              Erstmal kennenlernen
            </h2>
            <p className="mt-4 leading-relaxed text-ink/85">
              Noch nicht sicher? Tritt unserer WhatsApp-Gruppe bei. Dort bekommst du
              alles Wichtige mit – und wirst persönlich zum nächsten Gottesdienst
              eingeladen. Ganz ohne Verpflichtung.
            </p>
            <div className="mt-auto pt-6">
              <a
                href={siteConfig.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-[3px] bg-gold px-7 py-3.5 font-body text-base font-semibold tracking-wide text-aubergine-deep shadow-sm transition-all duration-200 hover:bg-gold-deep hover:text-bg hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-bg sm:w-auto"
              >
                {waIcon}
                WhatsApp-Gruppe beitreten
              </a>
            </div>
          </div>
        </div>

        {/* Trust line */}
        <p className="reveal mt-8 flex flex-wrap items-center gap-x-2 gap-y-1 font-body text-sm text-muted" style={{ animationDelay: "0.5s" }}>
          <span className="h-px w-6 bg-gold/60" aria-hidden />
          Familienfreundlich · auf Deutsch · seit Jahren ein Zuhause für Menschen aus aller Welt.
          <a href={`mailto:${siteConfig.contact.general}`} className="text-aubergine underline-offset-4 hover:text-gold-deep hover:underline">
            Schreib uns
          </a>
        </p>
      </div>
    </section>
  );
}
