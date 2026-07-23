import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/content/PageHeader";
import { EventCard } from "@/components/events/EventCard";
import { Card } from "@/components/ui/Card";
import { ShowMore } from "@/components/ui/ShowMore";
import { getUpcomingEvents } from "@/lib/data/events";
import { getNews } from "@/lib/data/news";
import { siteConfig } from "@/lib/site-config";
import { formatShortDate } from "@/lib/format";
import { bibleserverUrl } from "@/lib/bible";

export const metadata: Metadata = {
  title: "Termine & Aktuelles",
  description:
    "Kommende Gottesdienste und Neuigkeiten aus unserer deutschsprachigen Gemeinde in Warschau.",
};

export default async function Page() {
  const [events, news] = await Promise.all([getUpcomingEvents(), getNews()]);

  return (
    <>
      <PageHeader
        title="Termine & Aktuelles"
        eyebrow="Was bei uns ansteht"
        lead={`Wir feiern in der Regel in der ${siteConfig.address.street}, 2. Stock (Synodalsaal). ${siteConfig.service.rhythm}`}
      />

      {/* Scripture that carries this page (from the legacy site) */}
      <Container className="pt-10">
        <figure className="ml-auto max-w-2xl border-r-[3px] border-gold/60 pr-5 text-right sm:pr-6">
          <blockquote className="font-display text-lg italic leading-snug text-aubergine sm:text-xl">
            „Denn wo zwei oder drei versammelt sind in meinem Namen, da bin ich
            mitten unter ihnen."
          </blockquote>
          <figcaption className="mt-1.5 font-body text-xs font-semibold uppercase tracking-[0.16em] text-gold-deep">
            <a
              href={bibleserverUrl("Matthäus 18,20")}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-aubergine"
            >
              Matthäus 18,20
            </a>
          </figcaption>
        </figure>
      </Container>

      {/* Termine */}
      <Container className="py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_18rem]">
          <div>
            <h2 className="font-display text-2xl font-medium text-aubergine">Kommende Gottesdienste</h2>
            <div className="mt-5 space-y-4">
              {events.length > 0 ? (
                <ShowMore
                  initialCount={3}
                  moreLabel="Alle Termine anzeigen ({n} weitere)"
                >
                  {events.map((e, i) => (
                    <EventCard key={e.id} event={e} highlight={i === 0} />
                  ))}
                </ShowMore>
              ) : (
                <p className="text-muted">
                  Zurzeit ist Sommerpause. Die nächsten Termine kündigen wir hier an — schreib uns
                  gern jederzeit.
                </p>
              )}
            </div>
          </div>

          <aside className="space-y-5">
            {/* WhatsApp — news & schedule changes land here first */}
            <div className="rounded-[4px] border border-gold/40 bg-gold-tint/50 p-6">
              <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-gold-deep">
                Bleib dabei
              </p>
              <h3 className="mt-2 font-display text-lg text-aubergine">Immer informiert</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Neue Termine und kurzfristige Änderungen teilen wir zuerst in unserer
                WhatsApp-Gruppe — schau einfach rein.
              </p>
              {/* Scan to join — for anyone reading this on a desktop screen */}
              <div className="mt-4 flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/whatsapp-qr.svg"
                  alt="QR-Code: WhatsApp-Gruppe beitreten"
                  width={80}
                  height={80}
                  className="h-20 w-20 shrink-0 rounded-[3px] border border-line bg-white p-1"
                />
                <p className="text-xs leading-relaxed text-muted">
                  Am Rechner? Scan den Code einfach mit der Handy-Kamera.
                </p>
              </div>
              <a
                href={siteConfig.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-[3px] bg-aubergine px-4 py-2.5 font-body text-sm font-semibold text-bg shadow-sm transition-colors hover:bg-aubergine-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 shrink-0" aria-hidden>
                  <path d="M17.5 14.4c-.3-.1-1.7-.8-1.9-.9-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.3 5.1 4.6.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2z" />
                </svg>
                Zur WhatsApp-Gruppe
              </a>
            </div>
            <Card tone="cream">
              <h3 className="font-display text-lg text-aubergine">Ort</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {siteConfig.address.street}
                <br />
                {siteConfig.address.postalCode} {siteConfig.address.city}
              </p>
              <Link href="/anfahrt" className="mt-3 inline-block text-sm font-semibold text-aubergine hover:text-gold-deep">
                Anfahrt &amp; Karte →
              </Link>
            </Card>
          </aside>
        </div>
      </Container>

      {/* Aktuelles */}
      <section id="aktuelles" className="scroll-mt-24 border-t border-line bg-parchment-deep py-14 lg:py-16">
        <Container>
          <h2 className="font-display text-2xl font-medium text-aubergine">Aktuelles aus der Gemeinde</h2>
          <div className="mt-6 space-y-4">
            {news.length > 0 ? (
              <ShowMore
                initialCount={3}
                moreLabel="Ältere Beiträge anzeigen ({n} weitere)"
              >
                {news.map((n) => (
                  <Link
                    key={n.id}
                    href={`/aktuelles/${n.slug}`}
                    className="group block rounded-[4px] border border-line bg-surface p-6 transition-all hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-md"
                  >
                    <p className="font-body text-xs font-semibold uppercase tracking-[0.12em] text-gold-deep">
                      {formatShortDate(n.publishedAt)}
                      {n.pinned && <span className="ml-2 text-aubergine">· angepinnt</span>}
                    </p>
                    <h3 className="mt-1.5 font-display text-xl text-aubergine">{n.title}</h3>
                    <p className="mt-2 text-muted">{n.excerpt}</p>
                    <span className="mt-3 inline-block font-body text-sm font-semibold text-aubergine group-hover:text-gold-deep">
                      Weiterlesen →
                    </span>
                  </Link>
                ))}
              </ShowMore>
            ) : (
              <p className="text-muted">Zurzeit gibt es keine Neuigkeiten.</p>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
