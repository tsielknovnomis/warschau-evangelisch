import { Container } from "@/components/ui/Container";

/**
 * Standard page header — light, clean, with a gold rule and aubergine title.
 */
export function PageHeader({
  title,
  lead,
  eyebrow,
}: {
  title: string;
  lead?: string;
  eyebrow?: string;
}) {
  return (
    <div className="border-b border-line bg-parchment-deep">
      <Container className="py-14 sm:py-18">
        {eyebrow && (
          <p className="mb-3 flex items-center gap-3 font-body text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-gold-deep">
            <span className="h-px w-7 bg-gold/60" />
            {eyebrow}
          </p>
        )}
        <h1 className="font-display text-4xl font-medium text-aubergine sm:text-[3.2rem]">
          {title}
        </h1>
        {lead && <p className="mt-4 max-w-2xl text-lg text-ink/80">{lead}</p>}
      </Container>
    </div>
  );
}
