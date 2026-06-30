import Image from "next/image";
import { Lutherrose } from "@/components/content/Lutherrose";

export function HeroV4() {
  return (
    <section className="relative overflow-hidden bg-bg">
      {/* faint centered glow — keeps the page light, never a dark wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[60%] bg-gradient-to-b from-aubergine-50/50 to-transparent"
      />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-5 py-24 text-center sm:px-8 sm:py-32">
        {/* tiny emblem — restraint over a big photo */}
        <Lutherrose
          className="reveal h-12 w-12 drop-shadow-[0_6px_16px_rgba(72,0,72,0.18)]"
          style={{ animationDelay: "0.05s" }}
        />

        <p
          className="kicker reveal mt-8 flex items-center gap-3"
          style={{ animationDelay: "0.12s" }}
        >
          <span className="h-px w-6 bg-gold/60" />
          Evangelisch · auf Deutsch · in Warschau
          <span className="h-px w-6 bg-gold/60" />
        </p>

        <h1
          className="reveal mt-7 font-display text-[2.9rem] font-medium leading-[1.05] tracking-[-0.01em] text-aubergine sm:text-[4.5rem]"
          style={{ animationDelay: "0.2s" }}
        >
          Eine Heimat
          <br />
          <span className="italic text-gold-deep">auf Deutsch.</span>
        </h1>

        <p
          className="reveal mt-8 max-w-md font-body text-lg leading-relaxed text-ink/80 sm:text-xl"
          style={{ animationDelay: "0.3s" }}
        >
          Eine kleine, lebendige Gemeinde mitten in der Stadt. Komm vorbei,
          wie du bist — wir freuen uns auf dich.
        </p>

        {/* slim arch detail — the altar, reduced to a tasteful glimpse */}
        <div
          className="reveal relative mt-14 w-full max-w-[15rem]"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="relative aspect-[3/4] overflow-hidden rounded-t-full border border-gold/40 shadow-[0_18px_50px_-26px_rgba(72,0,72,0.4)]">
            <Image
              src="/images/altar-miodowa.png"
              alt="Altar der Gemeinde im Lutherischen Zentrum, ul. Miodowa, Warschau"
              fill
              priority
              sizes="(max-width: 640px) 60vw, 15rem"
              className="object-cover object-center"
            />
            {/* soft light gradient — legible, never heavy */}
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bg/40 to-transparent"
            />
          </div>
          <div className="mx-auto mt-5 h-px w-2/3 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
          <p className="mt-3 font-body text-sm italic text-muted">
            Lutherisches Zentrum · ul. Miodowa 21
          </p>
        </div>

        {/* one gentle link — no buttons, no sales */}
        <a
          href="#willkommen"
          className="reveal group mt-12 inline-flex items-center gap-2 font-body text-base font-semibold text-aubergine transition-colors hover:text-gold-deep"
          style={{ animationDelay: "0.5s" }}
        >
          Lern uns kennen
          <span className="transition-transform group-hover:translate-y-0.5" aria-hidden>
            ↓
          </span>
        </a>
      </div>
    </section>
  );
}
