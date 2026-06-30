import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Lutherrose } from "@/components/content/Lutherrose";
import { siteConfig } from "@/lib/site-config";
import { getNextEvent } from "@/lib/seed/events";
import { formatDate, formatTime } from "@/lib/format";

export function HeroB() {
  const next = getNextEvent();

  return (
    <section className="relative overflow-hidden bg-bg">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-0 lg:py-20">
        {/* Photo panel — large, atmospheric, kept light (no dark overlay) */}
        <div
          className="reveal relative order-1 lg:order-2 lg:-mr-6"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-gold/40 shadow-[0_28px_80px_-32px_rgba(72,0,72,0.45)] sm:aspect-[3/4]">
            <Image
              src="/images/altar-miodowa.png"
              alt="Aufgeschlagene Bibel und Kruzifix auf dem hell erleuchteten Altar in der ul. Miodowa, Warschau"
              fill
              priority
              sizes="(max-width: 1024px) 92vw, 40rem"
              className="object-cover object-center"
            />
            {/* light gradient from below so any overlapping text stays legible */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/55 via-transparent to-bg/10"
            />
          </div>
        </div>

        {/* Floating invitation card — overlaps the photo on desktop */}
        <div className="relative order-2 z-10 lg:order-1 lg:mr-[-3rem]">
          <div
            className="reveal rounded-[1.75rem] border border-line bg-surface/95 p-7 shadow-[0_24px_70px_-34px_rgba(72,0,72,0.5)] backdrop-blur-sm sm:p-9 lg:p-10"
            style={{ animationDelay: "0.05s" }}
          >
            <p className="kicker flex items-center gap-3">
              <Lutherrose className="h-7 w-7 shrink-0" />
              Evangelisch-lutherisch · Warschau
            </p>

            <h1 className="mt-5 font-display text-[2.6rem] font-medium leading-[1.04] text-aubergine sm:text-5xl">
              Ein Platz für Sie ist
              <br />
              <span className="italic text-gold-deep">schon gedeckt.</span>
            </h1>

            <p className="mt-5 max-w-md text-lg leading-relaxed text-ink/85">
              Eine kleine, herzliche deutschsprachige Gemeinde — Familien, Singles,
              Neu-Warschauer. Kommen Sie einfach vorbei, Sie sind willkommen.
            </p>

            {/* Next service — the concrete reason to come */}
            <div className="mt-7 rounded-2xl border border-gold/30 bg-gold-tint/60 p-5">
              <p className="font-body text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-gold-deep">
                {next?.isSpecial ? "Nächster Gottesdienst · besonders" : "Nächster Gottesdienst"}
              </p>
              {next ? (
                <>
                  <p className="mt-2 font-display text-xl leading-snug text-aubergine">
                    {next.title}
                  </p>
                  <p className="mt-1 text-base text-ink/80">
                    {formatDate(next.startsAt)}, {formatTime(next.startsAt)}
                    {next.withCommunion ? " · mit Abendmahl" : ""}
                  </p>
                </>
              ) : (
                <p className="mt-2 text-base leading-relaxed text-ink/80">
                  Aktuell ist Sommerpause. Schreiben Sie uns gern — wir feiern auch
                  außer der Reihe und sagen Ihnen den nächsten Termin.
                </p>
              )}
              <p className="mt-3 flex items-center gap-2 font-body text-sm text-muted">
                <span aria-hidden>📍</span>
                {siteConfig.address.street} · sonntags {siteConfig.service.time}
              </p>
            </div>

            {/* CTAs — Gottesdienst primary, WhatsApp the easy first step */}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href="/gottesdienste" variant="primary" size="lg">
                Zum Gottesdienst kommen
              </Button>
              <a
                href={siteConfig.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-[3px] border border-aubergine/30 bg-bg px-7 py-3.5 font-body text-base font-semibold tracking-wide text-aubergine transition-all duration-200 hover:border-gold hover:text-gold-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 shrink-0" aria-hidden>
                  <path d="M17.5 14.4c-.3-.1-1.7-.8-1.9-.9-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.3 5.1 4.6.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2z" />
                </svg>
                WhatsApp-Gruppe beitreten
              </a>
            </div>
            <p className="mt-3 text-sm italic text-muted">
              Der einfachste erste Schritt — kurz reinschnuppern, ganz unverbindlich.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
