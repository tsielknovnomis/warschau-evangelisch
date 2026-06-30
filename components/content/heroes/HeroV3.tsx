import Image from "next/image";
import { Lutherrose } from "@/components/content/Lutherrose";

export function HeroV3() {
  return (
    <section className="relative overflow-hidden bg-bg">
      <div className="mx-auto grid min-h-[88vh] max-w-[100rem] grid-cols-1 lg:min-h-screen lg:grid-cols-2">
        {/* Text panel — vertically centered, calm and warm */}
        <div className="order-2 flex items-center px-6 py-16 sm:px-10 lg:order-1 lg:px-16 xl:px-24">
          <div className="max-w-xl">
            <p
              className="reveal flex items-center gap-3 font-body text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-gold-deep"
              style={{ animationDelay: "0.05s" }}
            >
              <Lutherrose className="h-5 w-5 shrink-0" />
              Deutschsprachige evangelische Gemeinde · Warschau
            </p>
            <h1
              className="reveal mt-7 font-display text-5xl font-medium leading-[1.02] text-aubergine sm:text-6xl xl:text-[4.6rem]"
              style={{ animationDelay: "0.15s" }}
            >
              Komm,
              <br />
              <span className="italic text-gold-deep">wie du bist.</span>
            </h1>
            <p
              className="reveal mt-8 text-xl leading-relaxed text-ink/85"
              style={{ animationDelay: "0.28s" }}
            >
              Mitten in Warschau feiern wir Gottesdienst auf Deutsch — eine
              kleine, herzliche Gemeinde aus Familien, Alteingesessenen und
              Menschen, die gerade erst angekommen sind. Du bist willkommen,
              ganz ohne Anmeldung.
            </p>
            <div className="reveal mt-10" style={{ animationDelay: "0.42s" }}>
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
        </div>

        {/* Image panel — large, bleeds to the outer edge, rounded inner corners */}
        <div className="reveal relative order-1 min-h-[44vh] lg:order-2 lg:min-h-screen" style={{ animationDelay: "0.2s" }}>
          <div className="relative h-full w-full overflow-hidden lg:rounded-l-[2.5rem]">
            <Image
              src="/images/altar-miodowa.png"
              alt="Altar der Gemeinde im Lutherischen Zentrum, ul. Miodowa, Warschau"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
            {/* Soft light gradient at the inner seam keeps the caption legible */}
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-aubergine-deep/30 via-transparent to-transparent lg:bg-gradient-to-l"
            />
            <p className="absolute bottom-5 right-6 font-body text-sm italic text-parchment-deep drop-shadow-sm sm:bottom-7 sm:right-9">
              Lutherisches Zentrum · ul. Miodowa 21
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
