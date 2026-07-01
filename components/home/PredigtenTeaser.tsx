import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { YouTubeLite } from "@/components/sermons/YouTubeLite";
import { getLatestSermon } from "@/lib/seed/sermons";
import { siteConfig } from "@/lib/site-config";

export function PredigtenTeaser() {
  const sermon = getLatestSermon();
  if (!sermon) return null;

  return (
    <section className="border-t border-line bg-bg py-20 lg:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal>
            <p className="kicker">Zum Reinhören</p>
            <h2 className="mt-4 font-display text-3xl font-medium leading-tight text-aubergine sm:text-[2.6rem]">
              Worte, die bleiben
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink/85">
              Du kannst nicht jeden Sonntag dabei sein? Unsere Predigten nehmen wir
              auf — hör rein, wann immer du magst, und mach dir selbst ein Bild.
            </p>
            <p className="mt-3 text-base text-muted">
              {sermon.scripture ? <span className="italic">{sermon.scripture} · </span> : null}
              zuletzt: „{sermon.title}"
            </p>
            <p className="mt-7">
              <a
                href={siteConfig.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body font-semibold text-aubergine underline decoration-gold/60 underline-offset-4 hover:text-gold-deep"
              >
                Alle Predigten auf YouTube
              </a>
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <YouTubeLite id={sermon.youtubeId} title={sermon.title} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
