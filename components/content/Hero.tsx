import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-bg">
      {/* top hairline */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:py-24">
        {/* Text column */}
        <div className="relative z-10">
          <p className="kicker reveal" style={{ animationDelay: "0.05s" }}>
            Evangelisch-lutherische Gemeinde · Warschau
          </p>
          <h1
            className="reveal mt-5 font-display text-5xl font-medium leading-[1.05] text-aubergine sm:text-6xl"
            style={{ animationDelay: "0.15s" }}
          >
            Herzlich
            <br />
            <span className="italic text-gold-deep">willkommen</span>
          </h1>
          <p
            className="reveal mt-6 max-w-md text-lg leading-relaxed text-ink/80"
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
            <Button href="/gottesdienste" variant="gold" size="lg">
              Gottesdienste &amp; Termine
            </Button>
            <Button href="/ueber-uns" variant="secondary" size="lg">
              Unsere Gemeinde
            </Button>
          </div>
        </div>

        {/* Arch image column */}
        <div className="relative">
          {/* radiant halo behind the arch */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 opacity-[0.18]"
            style={{
              background:
                "repeating-conic-gradient(from 0deg at 50% 45%, var(--gold) 0deg 0.4deg, transparent 0.4deg 7deg)",
              maskImage:
                "radial-gradient(circle at 50% 45%, black 10%, transparent 62%)",
              WebkitMaskImage:
                "radial-gradient(circle at 50% 45%, black 10%, transparent 62%)",
            }}
          />
          <div
            className="reveal relative mx-auto w-full max-w-[26rem]"
            style={{ animationDelay: "0.3s" }}
          >
            {/* the arch */}
            <div className="relative aspect-[3/4] overflow-hidden rounded-t-[13rem] border border-gold/60 shadow-[0_18px_50px_-20px_rgba(44,10,41,0.55)]">
              <Image
                src="/images/altar-miodowa.png"
                alt="Altar der Gemeinde in der ul. Miodowa, Warschau"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 26rem"
                className="object-cover object-center"
              />
              <div className="pointer-events-none absolute inset-0 rounded-t-[13rem] ring-1 ring-inset ring-white/10" />
              {/* subtle aubergine wash at the foot */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-aubergine-deep/45 to-transparent" />
            </div>
            {/* gold base line */}
            <div className="mx-auto mt-4 h-px w-2/3 bg-gradient-to-r from-transparent via-gold to-transparent" />
            <p className="mt-3 text-center font-body text-sm italic text-muted">
              Lutherisches Zentrum · ul. Miodowa 21
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
