import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function GeschichteTeaser() {
  return (
    <section className="border-t border-line bg-bg py-20 lg:py-24">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="reveal overflow-hidden rounded-[4px] border border-line shadow-sm" style={{ animationDelay: "0.1s" }}>
            <Image
              src="/images/warszawa-panorama.jpg"
              alt="Skyline von Warschau mit der Weichsel im Vordergrund"
              width={1920}
              height={662}
              sizes="(max-width: 1024px) 92vw, 36rem"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <p className="kicker">Seit über 40 Jahren</p>
            <h2 className="mt-4 font-display text-3xl font-medium leading-tight text-aubergine sm:text-[2.6rem]">
              Eine Gemeinde mit Geschichte
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink/85">
              Schon in den 1980er Jahren gab es deutschsprachige evangelische
              Seelsorge in Warschau. 2011 wurde die Gemeinde neu gegründet, seit 2015
              sind wir ein eingetragener Verein — getragen von Menschen, die hier,
              fern der alten Heimat, eine geistliche Heimat gefunden haben.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Wir arbeiten eng mit der Evangelisch-Augsburgischen Kirche in Polen und
              der Warschauer Trinitatisgemeinde zusammen.
            </p>
            <p className="mt-7">
              <Link href="/ueber-uns/geschichte" className="font-body font-semibold text-aubergine underline decoration-gold/60 underline-offset-4 hover:text-gold-deep">
                Unsere ganze Geschichte
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
