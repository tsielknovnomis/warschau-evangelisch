import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-bg">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-28">
        {/* Text column */}
        <div className="relative z-10">
          <p className="reveal flex items-center gap-3 font-body text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-gold-deep" style={{ animationDelay: "0.05s" }}>
            <span className="h-px w-8 bg-gold/60" />
            Evangelisch-lutherische Gemeinde · Warschau
          </p>
          <h1
            className="reveal mt-6 font-display text-5xl font-medium leading-[1.03] text-aubergine sm:text-[4.4rem]"
            style={{ animationDelay: "0.15s" }}
          >
            Herzlich
            <br />
            <span className="italic text-gold-deep">willkommen</span>
          </h1>
          <p
            className="reveal mt-7 max-w-md text-lg leading-relaxed text-ink/85"
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
            <blockquote className="font-display text-xl italic leading-relaxed text-aubergine-700">
              „Kommt her zu mir alle, die ihr mühselig und beladen seid; ich will euch
              erquicken."
            </blockquote>
            <figcaption className="mt-2 font-body text-sm tracking-wide text-muted">
              Matthäus 11,28
            </figcaption>
          </figure>

          <div
            className="reveal mt-9 flex flex-wrap gap-3"
            style={{ animationDelay: "0.45s" }}
          >
            <Button href="/gottesdienste" variant="primary" size="lg">
              Gottesdienste &amp; Termine
            </Button>
            <Button href="/ueber-uns" variant="secondary" size="lg">
              Unsere Gemeinde
            </Button>
          </div>
        </div>

        {/* Arch image column */}
        <div className="relative">
          {/* very faint halo */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[115%] w-[115%] -translate-x-1/2 -translate-y-1/2 opacity-[0.08]"
            style={{
              background:
                "repeating-conic-gradient(from 0deg at 50% 45%, var(--gold) 0deg 0.4deg, transparent 0.4deg 8deg)",
              maskImage: "radial-gradient(circle at 50% 45%, black 8%, transparent 60%)",
              WebkitMaskImage: "radial-gradient(circle at 50% 45%, black 8%, transparent 60%)",
            }}
          />
          <div
            className="reveal relative mx-auto w-full max-w-[24rem]"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-t-[12rem] border border-gold/50 shadow-[0_20px_60px_-28px_rgba(72,0,72,0.4)]">
              <Image
                src="/images/altar-miodowa.png"
                alt="Altar der Gemeinde in der ul. Miodowa, Warschau"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 24rem"
                className="object-cover object-center"
              />
            </div>
            <div className="mx-auto mt-4 h-px w-1/2 bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
            <p className="mt-3 text-center font-body text-sm italic text-muted">
              Lutherisches Zentrum · ul. Miodowa 21
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
