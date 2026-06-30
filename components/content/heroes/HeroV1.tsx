import Image from "next/image";
import { Lutherrose } from "@/components/content/Lutherrose";

export function HeroV1() {
  return (
    <section className="relative isolate min-h-[88vh] overflow-hidden bg-bg sm:min-h-[92vh]">
      {/* Altar fills the hero — atmospheric, never dark */}
      <Image
        src="/images/altar-miodowa.png"
        alt="Altar im Lutherischen Zentrum an der ul. Miodowa in Warschau — aufgeschlagene Bibel und Kruzifix im warmen Kerzenlicht"
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-[68%_center] sm:object-[72%_center]"
      />

      {/* Soft LIGHT gradient — keeps the left/bottom legible without a dark wash */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-bg via-bg/85 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-bg via-bg/30 to-transparent sm:via-transparent"
      />

      {/* Content */}
      <div className="mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-center px-5 py-24 sm:min-h-[92vh] sm:px-8">
        <div className="max-w-xl">
          <p
            className="kicker reveal flex items-center gap-3"
            style={{ animationDelay: "0.05s" }}
          >
            <Lutherrose className="h-6 w-6 shrink-0 drop-shadow-sm" aria-hidden />
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
            Ein offenes Haus, ein bekanntes Lied, ein vertrautes Wort — mitten in
            der Stadt. Komm vorbei, wie du bist, und nimm dir Zeit für das, was
            trägt.
          </p>

          <div
            className="reveal mt-10"
            style={{ animationDelay: "0.42s" }}
          >
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

      {/* Quiet location caption, lower-right */}
      <p className="absolute bottom-6 right-5 z-10 hidden font-body text-sm italic text-muted sm:right-8 sm:block">
        Lutherisches Zentrum · ul. Miodowa 21
      </p>
    </section>
  );
}
