import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <Image
        src="/images/altar-miodowa.png"
        alt="Altar der Gemeinde in der ul. Miodowa"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-aubergine-900/90 via-aubergine/80 to-aubergine/55" />
      <div className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="max-w-2xl text-white">
          <p className="font-sans text-sm font-semibold uppercase tracking-wider text-white/75">
            Evangelisch-lutherische Gemeinde · Warschau
          </p>
          <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight text-white sm:text-5xl">
            Herzlich willkommen
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/90">
            Deutschsprachige Christinnen und Christen, die zeitweise oder dauerhaft in
            und um Warschau leben — offen für alle, die in deutscher Sprache Gott
            begegnen, Gemeinschaft erleben und eine geistige Heimat finden möchten.
          </p>
          <figure className="mt-7 border-l-2 border-white/40 pl-5">
            <blockquote className="font-serif text-xl italic text-white/95">
              „Kommt her zu mir alle, die ihr mühselig und beladen seid; ich will euch
              erquicken."
            </blockquote>
            <figcaption className="mt-2 text-sm text-white/70">— Matthäus 11,28</figcaption>
          </figure>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/gottesdienste" variant="primary" size="lg">
              Gottesdienste
            </Button>
            <Button
              href="/ueber-uns"
              size="lg"
              className="border border-white/40 text-white hover:bg-white/10"
            >
              Über uns
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
