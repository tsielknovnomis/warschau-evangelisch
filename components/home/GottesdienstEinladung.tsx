import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { getNextEvent } from "@/lib/seed/events";
import { siteConfig } from "@/lib/site-config";
import { formatDate, formatTime } from "@/lib/format";

export function GottesdienstEinladung() {
  const next = getNextEvent();
  return (
    <section className="border-t border-line bg-bg py-20 lg:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Invitation copy */}
          <div>
            <p className="kicker">Unsere Gottesdienste</p>
            <h2 className="mt-4 font-display text-3xl font-medium leading-tight text-aubergine sm:text-[2.6rem]">
              Du bist herzlich eingeladen
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink/85">
              Wir feiern alle zwei Wochen sonntags um {siteConfig.service.time} — im
              Advent jeden Sonntag — im Lutherischen Zentrum in der{" "}
              {siteConfig.address.street}, meist mit Heiligem Abendmahl.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Komm einfach vorbei, so wie du bist. Es gibt nichts vorzubereiten — und
              wer mag, bleibt danach auf einen Kaffee.
            </p>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2">
              <Link href="/gottesdienste" className="font-body font-semibold text-aubergine underline decoration-gold/60 underline-offset-4 hover:text-gold-deep">
                Alle Termine
              </Link>
              <Link href="/gottesdienste/anfahrt" className="font-body font-semibold text-aubergine underline decoration-gold/60 underline-offset-4 hover:text-gold-deep">
                So findest du uns
              </Link>
            </div>
          </div>

          {/* Next service card — quiet, informative */}
          <div className="rounded-[4px] border border-line bg-surface">
            <div className="border-l-[3px] border-gold p-7 sm:p-9">
              <p className="font-body text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-gold-deep">
                {next ? "Der nächste Gottesdienst" : "Gottesdienste"}
              </p>
              {next ? (
                <>
                  <p className="mt-3 font-display text-2xl leading-snug text-aubergine">
                    {formatDate(next.startsAt)}
                  </p>
                  <p className="mt-1 text-lg text-ink/80">
                    {formatTime(next.startsAt)} · {siteConfig.address.street}
                  </p>
                  <p className="mt-3 text-muted">{next.title}</p>
                  {next.withCommunion && (
                    <p className="mt-1 text-sm italic text-muted">mit Heiligem Abendmahl</p>
                  )}
                </>
              ) : (
                <p className="mt-3 leading-relaxed text-muted">
                  Gerade ist Sommerpause. Die nächsten Termine kündigen wir hier und in
                  unserer WhatsApp-Gruppe an — schreib uns gern jederzeit.
                </p>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
