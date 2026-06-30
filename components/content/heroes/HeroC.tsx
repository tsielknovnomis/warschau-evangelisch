import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Lutherrose } from "@/components/content/Lutherrose";
import { siteConfig } from "@/lib/site-config";
import { getNextEvent } from "@/lib/seed/events";
import { formatDate, formatTime } from "@/lib/format";

const trustFacts = [
  "Alle zwei Wochen sonntags",
  "Mit Gemeindekaffee danach",
  "Auf Deutsch, offen für alle",
];

export function HeroC() {
  const next = getNextEvent();

  return (
    <section className="relative overflow-hidden bg-bg">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-28">
        {/* Editorial text column */}
        <div className="relative z-10">
          <p
            className="kicker reveal flex items-center gap-3"
            style={{ animationDelay: "0.05s" }}
          >
            <Lutherrose className="h-6 w-6 shrink-0" />
            Evangelisch-lutherisch · Warschau
          </p>

          <h1
            className="reveal mt-6 font-display text-5xl font-medium leading-[1.02] text-aubergine sm:text-[4.5rem]"
            style={{ animationDelay: "0.15s" }}
          >
            Sonntags eine
            <br />
            <span className="italic text-gold-deep">geistige Heimat</span>
          </h1>

          <p
            className="reveal mt-7 max-w-lg text-lg leading-relaxed text-ink/85"
            style={{ animationDelay: "0.25s" }}
          >
            Eine kleine, herzliche deutschsprachige Gemeinde in der ul. Miodowa.
            Komm einfach vorbei — oder lern uns erst unverbindlich über unsere
            WhatsApp-Gruppe kennen. Du bist willkommen, so wie du bist.
          </p>

          {/* Next-service card */}
          <div
            className="reveal mt-8 max-w-lg rounded-[4px] border border-line bg-surface px-5 py-4 shadow-[0_12px_40px_-30px_rgba(72,0,72,0.5)]"
            style={{ animationDelay: "0.32s" }}
          >
            <p className="font-body text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-gold-deep">
              Nächster Gottesdienst
            </p>
            {next ? (
              <p className="mt-1.5 font-display text-lg leading-snug text-aubergine">
                {formatDate(next.startsAt)} · {formatTime(next.startsAt)}
                <span className="mt-0.5 block font-body text-sm not-italic text-muted">
                  {next.title}
                  {next.withCommunion ? " · mit Abendmahl" : ""}
                </span>
              </p>
            ) : (
              <p className="mt-1.5 font-display text-lg leading-snug text-aubergine">
                Aktuell Sommerpause
                <span className="mt-0.5 block font-body text-sm not-italic text-muted">
                  Sonst {siteConfig.service.time} · {siteConfig.address.street}.
                  Schreib uns gern — wir feiern auch außer der Reihe.
                </span>
              </p>
            )}
          </div>

          {/* CTA row — service primary, WhatsApp the easy first step */}
          <div
            className="reveal mt-7 flex flex-col gap-3 sm:flex-row sm:items-center"
            style={{ animationDelay: "0.42s" }}
          >
            <Button href="/gottesdienste" variant="primary" size="lg">
              Komm zum Gottesdienst
            </Button>
            <a
              href={siteConfig.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-[3px] border border-gold bg-gold-tint px-7 py-3.5 font-body text-base font-semibold tracking-wide text-aubergine-deep transition-all duration-200 hover:bg-gold hover:text-aubergine-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
                <path d="M17.5 14.4c-.3-.1-1.7-.8-1.9-.9-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.3 5.1 4.6.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2z" />
              </svg>
              WhatsApp-Gruppe beitreten
            </a>
          </div>
          <p
            className="reveal mt-2.5 font-body text-sm text-muted"
            style={{ animationDelay: "0.46s" }}
          >
            Unverbindlich, ohne Anmeldung — der einfachste erste Schritt.
          </p>

          {/* Slim trust strip */}
          <ul
            className="reveal mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-5 font-body text-sm text-ink/75"
            style={{ animationDelay: "0.52s" }}
          >
            {trustFacts.map((fact) => (
              <li key={fact} className="flex items-center gap-2">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-gold" />
                {fact}
              </li>
            ))}
          </ul>
        </div>

        {/* Refined church-arch image */}
        <div className="relative">
          <div
            className="reveal relative mx-auto w-full max-w-[23rem]"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-t-[11.5rem] border border-gold/50 shadow-[0_24px_70px_-30px_rgba(72,0,72,0.45)]">
              <Image
                src="/images/altar-miodowa.png"
                alt="Geöffnete Bibel und Kruzifix auf dem beleuchteten Altar der Gemeinde, ul. Miodowa, Warschau"
                fill
                priority
                sizes="(max-width: 1024px) 88vw, 23rem"
                className="object-cover object-center"
              />
            </div>
            <p className="mt-4 text-center font-body text-sm italic text-muted">
              Lutherisches Zentrum · {siteConfig.address.street}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
