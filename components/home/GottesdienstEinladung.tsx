import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { NextServiceCard } from "@/components/home/NextServiceCard";
import { getAllEvents } from "@/lib/data/events";
import { relevantEvents } from "@/lib/service-status";
import { siteConfig } from "@/lib/site-config";
import { currentTime } from "@/lib/clock";

export async function GottesdienstEinladung() {
  const events = await getAllEvents();
  const now = currentTime();
  return (
    <section className="border-t border-line bg-parchment-deep py-20 lg:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Invitation copy */}
          <Reveal>
            <p className="kicker">Unsere Gottesdienste</p>
            <h2 className="mt-4 font-display text-3xl font-medium leading-tight text-aubergine sm:text-[2.6rem]">
              Du bist herzlich eingeladen
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink/85">
              Wir feiern jeden 2. und 4. Sonntag im Monat um {siteConfig.service.time} im
              Lutherischen Zentrum in der {siteConfig.address.street}, meist mit
              Heiligem Abendmahl.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Komm einfach vorbei, so wie du bist. Es gibt nichts vorzubereiten — und
              wer mag, bleibt danach auf einen Kaffee.
            </p>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2">
              <Link href="/gottesdienste" className="font-body font-semibold text-aubergine underline decoration-gold/60 underline-offset-4 hover:text-gold-deep">
                Alle Termine
              </Link>
              <Link href="/anfahrt" className="font-body font-semibold text-aubergine underline decoration-gold/60 underline-offset-4 hover:text-gold-deep">
                So findest du uns
              </Link>
            </div>
          </Reveal>

          {/* Next service card — quiet, informative */}
          <Reveal delay={0.1} className="rounded-[4px] border border-line bg-surface">
            <NextServiceCard events={relevantEvents(events, now).slice(0, 8)} serverNow={now} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
