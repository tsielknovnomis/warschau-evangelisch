import Image from "next/image";
import { Lutherrose } from "@/components/content/Lutherrose";

export function HeroV2() {
  return (
    <section className="relative overflow-hidden bg-bg">
      {/* Word first — a centered, generous text opening */}
      <div className="mx-auto max-w-3xl px-5 pb-14 pt-20 text-center sm:px-8 sm:pb-20 sm:pt-28">
        <p
          className="reveal flex items-center justify-center gap-3 font-body text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-gold-deep"
          style={{ animationDelay: "0.05s" }}
        >
          <span className="h-px w-8 bg-gold/60" />
          Evangelisch · auf Deutsch · in Warschau
          <span className="h-px w-8 bg-gold/60" />
        </p>

        <div
          className="reveal mt-7 flex justify-center"
          style={{ animationDelay: "0.12s" }}
        >
          <Lutherrose className="h-10 w-10 opacity-90" />
        </div>

        <h1
          className="reveal mt-7 font-display text-[2.7rem] font-medium leading-[1.06] text-aubergine sm:text-6xl"
          style={{ animationDelay: "0.2s" }}
        >
          Eine Heimat
          <br />
          <span className="italic text-gold-deep">auf Deutsch.</span>
        </h1>

        <p
          className="reveal mx-auto mt-7 max-w-xl text-lg leading-relaxed text-ink/85 sm:text-xl"
          style={{ animationDelay: "0.3s" }}
        >
          Mitten in Warschau feiern wir Gottesdienst, singen, hören das Wort und
          bleiben füreinander da — eine kleine deutschsprachige Gemeinde, in der
          Platz für dich ist, so wie du bist.
        </p>

        <div className="reveal mt-9" style={{ animationDelay: "0.42s" }}>
          <a
            href="#willkommen"
            className="group inline-flex items-center gap-2 font-body text-base font-semibold text-aubergine transition-colors hover:text-gold-deep"
          >
            Lern uns kennen
            <span
              className="transition-transform group-hover:translate-y-0.5"
              aria-hidden
            >
              ↓
            </span>
          </a>
        </div>
      </div>

      {/* Then image — a cinematic full-bleed panorama band grounding us in the city */}
      <div
        className="reveal relative w-full"
        style={{ animationDelay: "0.5s" }}
      >
        <div className="relative aspect-[1920/662] max-h-[44vh] w-full overflow-hidden">
          <Image
            src="/images/warszawa-panorama.jpg"
            alt="Blick über die Weichsel auf die Skyline von Warschau"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Soft light gradient: blend the band into the page, keep it airy */}
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-bg to-transparent"
          />
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-bg/70 to-transparent"
          />
        </div>
        {/* Thin gold seam under the strip */}
        <div className="mx-auto h-px max-w-3xl bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
        <p className="mt-3 pb-2 text-center font-body text-sm italic text-muted">
          Lutherisches Zentrum · ul. Miodowa 21 · Warszawa
        </p>
      </div>
    </section>
  );
}
