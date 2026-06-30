import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-aubergine-deep text-bg">
      {/* radiant halo across the whole hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[8%] top-1/2 h-[150%] w-[60%] -translate-y-1/2 opacity-[0.16]"
        style={{
          background:
            "repeating-conic-gradient(from 0deg at 50% 50%, var(--gold-soft) 0deg 0.35deg, transparent 0.35deg 7deg)",
          maskImage: "radial-gradient(circle at 50% 50%, black 5%, transparent 60%)",
          WebkitMaskImage: "radial-gradient(circle at 50% 50%, black 5%, transparent 60%)",
        }}
      />

      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-24">
        {/* Text column */}
        <div className="relative z-10">
          <p className="reveal flex items-center gap-3 font-body text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-gold" style={{ animationDelay: "0.05s" }}>
            <span className="h-px w-8 bg-gold/70" />
            Evangelisch-lutherische Gemeinde · Warschau
          </p>
          <h1
            className="reveal mt-5 font-display text-5xl font-medium leading-[1.04] text-white sm:text-[4.2rem]"
            style={{ animationDelay: "0.15s" }}
          >
            Herzlich
            <br />
            <span className="italic text-gold-soft">willkommen</span>
          </h1>
          <p
            className="reveal mt-6 max-w-md text-lg leading-relaxed text-bg/85"
            style={{ animationDelay: "0.25s" }}
          >
            Deutschsprachige Christinnen und Christen in und um Warschau — offen für
            alle, die in deutscher Sprache Gott begegnen, Gemeinschaft erleben und
            eine geistige Heimat finden möchten.
          </p>

          <figure
            className="reveal mt-8 border-l-2 border-gold pl-5"
            style={{ animationDelay: "0.35s" }}
          >
            <blockquote className="font-display text-xl italic leading-relaxed text-bg/90">
              „Kommt her zu mir alle, die ihr mühselig und beladen seid; ich will euch
              erquicken."
            </blockquote>
            <figcaption className="mt-2 font-body text-sm tracking-wide text-gold-soft">
              Matthäus 11,28
            </figcaption>
          </figure>

          <div
            className="reveal mt-9 flex flex-wrap gap-3"
            style={{ animationDelay: "0.45s" }}
          >
            <Button href="/gottesdienste" variant="gold" size="lg">
              Gottesdienste &amp; Termine
            </Button>
            <Button
              href="/ueber-uns"
              size="lg"
              className="border border-gold/50 text-bg hover:border-gold hover:text-gold-soft"
            >
              Unsere Gemeinde
            </Button>
          </div>
        </div>

        {/* Arch image column */}
        <div className="relative">
          <div
            className="reveal relative mx-auto w-full max-w-[25rem]"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-t-[12.5rem] border-2 border-gold/70 shadow-[0_24px_70px_-24px_rgba(0,0,0,0.7)]">
              <Image
                src="/images/altar-miodowa.png"
                alt="Altar der Gemeinde in der ul. Miodowa, Warschau"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 25rem"
                className="object-cover object-center"
              />
              <div className="pointer-events-none absolute inset-0 rounded-t-[12.5rem] ring-1 ring-inset ring-gold/20" />
            </div>
            <div className="mx-auto mt-4 h-px w-2/3 bg-gradient-to-r from-transparent via-gold to-transparent" />
            <p className="mt-3 text-center font-body text-sm italic text-bg/65">
              Lutherisches Zentrum · ul. Miodowa 21
            </p>
          </div>
        </div>
      </div>

      {/* clean transition to the parchment body */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
    </section>
  );
}
