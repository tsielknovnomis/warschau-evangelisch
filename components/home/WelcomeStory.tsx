import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";

export function WelcomeStory() {
  return (
    <section id="willkommen" className="scroll-mt-24 border-t border-line bg-bg py-20 lg:py-24">
      <Container>
        <Reveal>
        <div className="mx-auto max-w-3xl text-center">
          <p className="kicker">Willkommen</p>
          <h2 className="mt-4 font-display text-3xl font-medium leading-tight text-aubergine sm:text-[2.6rem]">
            Eine geistige Heimat — auf Deutsch, mitten in Warschau
          </h2>
          <p className="mt-7 text-xl leading-relaxed text-ink/85">
            Ob du seit Jahren hier lebst oder gerade erst angekommen bist: Bei uns
            feierst du Gottesdienst in deiner Sprache, triffst Menschen, denen es
            ähnlich geht, und findest ein Stück Zuhause.
          </p>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Wir sind der evangelisch-lutherischen Tradition verbunden — und offen
            für alle. Ganz gleich, woher du kommst, wie dein Glaube aussieht oder ob
            du einfach nur neugierig bist: Du musst niemanden kennen, um dazuzugehören.
          </p>
          <p className="mt-8">
            <Link
              href="/ueber-uns"
              className="font-body font-semibold text-aubergine underline decoration-gold/60 underline-offset-4 transition-colors hover:text-gold-deep"
            >
              Mehr über unsere Gemeinde
            </Link>
          </p>
        </div>
        </Reveal>
      </Container>
    </section>
  );
}
