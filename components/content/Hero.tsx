import Image from "next/image";
import { Lutherrose } from "@/components/content/Lutherrose";
import { Button } from "@/components/ui/Button";
import { bibleserverUrl } from "@/lib/bible";

export function Hero() {
  return (
    <section className="relative isolate min-h-[82vh] overflow-hidden bg-bg sm:min-h-[88vh]">
      {/* Altar fills the hero — atmospheric, never dark */}
      <Image
        src="/images/altar-miodowa.png"
        alt="Altar im Lutherischen Zentrum an der ul. Miodowa in Warschau — aufgeschlagene Bibel und Kruzifix im warmen Kerzenlicht"
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-[72%_center] sm:object-[50%_30%]"
      />

      {/* Soft LIGHT gradients — keep the left/bottom legible without a dark wash */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-bg via-bg/85 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-bg via-bg/30 to-transparent sm:via-transparent"
      />

      {/* Content */}
      <div className="mx-auto flex min-h-[82vh] max-w-6xl flex-col justify-center px-5 py-24 sm:min-h-[88vh] sm:px-8">
        <div className="max-w-xl">
          <p
            className="kicker reveal flex items-center gap-3"
            style={{ animationDelay: "0.05s" }}
          >
            <Lutherrose className="h-6 w-6 shrink-0 drop-shadow-sm" alt="" />
            Evangelisch · auf Deutsch · in Warschau
          </p>

          <h1
            className="reveal mt-6 font-display text-[3.1rem] font-medium leading-[1.02] text-aubergine sm:text-[5rem]"
            style={{ animationDelay: "0.15s" }}
          >
            Schön, dass du
            <br />
            <span className="italic text-gold-deep">hier bist.</span>
          </h1>

          <p
            className="reveal mt-7 max-w-md font-body text-lg leading-relaxed text-ink/90 sm:text-xl"
            style={{ animationDelay: "0.28s" }}
          >
            Wir sind die deutschsprachige evangelisch-lutherische Gemeinde in
            Warschau — ein offenes Haus für alle, die hier Gottesdienst in ihrer
            Sprache feiern und Gemeinschaft finden möchten.
          </p>

          <div
            className="reveal mt-10 flex flex-wrap items-center gap-x-7 gap-y-4"
            style={{ animationDelay: "0.42s" }}
          >
            <Button href="/gottesdienste" variant="primary" size="lg">
              Zu den Gottesdiensten
            </Button>
            <a
              href="#willkommen"
              className="group inline-flex items-center gap-2.5 font-body text-base font-semibold text-aubergine transition-colors hover:text-gold-deep"
            >
              Lern uns kennen
              <span
                className="transition-transform duration-300 group-hover:translate-y-1"
                aria-hidden
              >
                ↓
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Scripture + quiet location caption, lower-right (board-picked spot) */}
      <figure className="absolute bottom-24 right-5 z-10 hidden max-w-md text-right sm:right-8 sm:block lg:bottom-28">
        <blockquote className="font-display text-lg italic leading-snug text-aubergine">
          „Kommt her zu mir alle, die ihr mühselig und beladen seid. Ich will euch
          erquicken."
        </blockquote>
        <figcaption className="mt-1 font-body text-xs font-semibold uppercase tracking-[0.16em] text-gold-deep">
          <a
            href={bibleserverUrl("Matthäus 11,28")}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-aubergine"
          >
            Matthäus 11,28
          </a>
        </figcaption>
      </figure>
    </section>
  );
}
