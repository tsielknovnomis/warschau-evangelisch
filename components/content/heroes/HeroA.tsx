import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Lutherrose } from "@/components/content/Lutherrose";
import { siteConfig } from "@/lib/site-config";
import { getNextEvent } from "@/lib/seed/events";
import { formatDate, formatTime } from "@/lib/format";

export function HeroA() {
  const next = getNextEvent();

  return (
    <section className="relative overflow-hidden bg-bg">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_0.82fr] lg:gap-16 lg:py-24">
        {/* Welcome + the service card (the hero) */}
        <div className="relative z-10">
          <p
            className="reveal flex items-center gap-3 font-body text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-gold-deep"
            style={{ animationDelay: "0.05s" }}
          >
            <span className="h-px w-8 bg-gold/60" />
            Evangelisch-lutherische Gemeinde · Warschau
          </p>
          <h1
            className="reveal mt-6 font-display text-[2.7rem] font-medium leading-[1.05] text-aubergine sm:text-[3.6rem]"
            style={{ animationDelay: "0.15s" }}
          >
            Sie sind herzlich{" "}
            <span className="italic text-gold-deep">eingeladen</span>.
          </h1>
          <p
            className="reveal mt-5 max-w-md text-lg leading-relaxed text-ink/85"
            style={{ animationDelay: "0.25s" }}
          >
            Eine kleine, warmherzige deutschsprachige Gemeinde — Familien, Singles,
            Neu-Warschauer. Kommen Sie einfach zum nächsten Gottesdienst vorbei.
          </p>

          {/* Next-service card */}
          <div
            className="reveal mt-8 max-w-md overflow-hidden rounded-[6px] border border-line bg-surface shadow-[0_24px_60px_-32px_rgba(72,0,72,0.45)]"
            style={{ animationDelay: "0.35s" }}
          >
            <div className="flex items-center justify-between gap-3 border-b border-line bg-aubergine-50 px-6 py-3">
              <span className="font-body text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-aubergine-700">
                Nächster Gottesdienst
              </span>
              <Lutherrose className="h-6 w-6 shrink-0" />
            </div>

            <div className="px-6 py-6">
              {next ? (
                <>
                  <p className="font-display text-[1.7rem] font-medium leading-tight text-aubergine">
                    {formatDate(next.startsAt)}
                  </p>
                  <p className="mt-1.5 font-body text-lg text-ink">
                    {formatTime(next.startsAt)} · {siteConfig.address.street}
                  </p>
                  <p className="mt-3 font-body text-[0.95rem] italic text-muted">
                    {next.title}
                  </p>
                  {next.withCommunion ? (
                    <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-gold/50 bg-gold-tint px-3 py-1 font-body text-[0.78rem] font-semibold tracking-wide text-gold-deep">
                      <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                      Mit Heiligem Abendmahl
                    </span>
                  ) : null}
                </>
              ) : (
                <>
                  <p className="font-display text-[1.6rem] font-medium leading-tight text-aubergine">
                    Sommerpause
                  </p>
                  <p className="mt-2 font-body text-[0.95rem] leading-relaxed text-muted">
                    Aktuell pausieren die Gottesdienste. Schreiben Sie uns gern — wir
                    sagen Ihnen, wann es weitergeht, und laden Sie persönlich ein.
                  </p>
                </>
              )}
            </div>

            <div className="flex flex-col gap-3 border-t border-line px-6 py-5 sm:flex-row">
              <Button
                href="/gottesdienste"
                variant="primary"
                size="lg"
                className="flex-1"
              >
                Komm vorbei
              </Button>
              <Link
                href={siteConfig.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp-Gruppe der Gemeinde beitreten (öffnet in neuem Tab)"
                className="flex flex-1 items-center justify-center gap-2 rounded-[3px] border border-aubergine/25 bg-bg px-5 py-3.5 font-body text-base font-semibold tracking-wide text-aubergine transition-all duration-200 hover:border-gold hover:text-gold-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
                  <path d="M17.5 14.4c-.3-.1-1.7-.8-1.9-.9-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.3 5.1 4.6.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2z" />
                </svg>
                WhatsApp-Gruppe
              </Link>
            </div>
          </div>

          <p
            className="reveal mt-4 max-w-md font-body text-sm leading-relaxed text-muted"
            style={{ animationDelay: "0.45s" }}
          >
            Noch unsicher? Treten Sie zuerst unserer WhatsApp-Gruppe bei — ganz
            unverbindlich. Dort lernen Sie uns kennen und werden persönlich
            eingeladen.
          </p>
        </div>

        {/* Supporting altar image */}
        <div
          className="reveal relative mx-auto hidden w-full max-w-[22rem] lg:block"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="relative aspect-[3/4] overflow-hidden rounded-t-[11rem] border border-gold/50 shadow-[0_20px_60px_-30px_rgba(72,0,72,0.4)]">
            <Image
              src="/images/altar-miodowa.png"
              alt="Geöffnete Bibel und Kruzifix auf dem beleuchteten Altar der Gemeinde, ul. Miodowa 21"
              fill
              priority
              sizes="(max-width: 1024px) 0px, 22rem"
              className="object-cover object-center"
            />
          </div>
          <p className="mt-4 text-center font-body text-sm italic text-muted">
            Lutherisches Zentrum · {siteConfig.address.street}
          </p>
        </div>
      </div>
    </section>
  );
}
