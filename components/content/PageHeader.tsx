import { Container } from "@/components/ui/Container";

/**
 * Standard page header band for inner pages.
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
    <div className="border-b border-line bg-cream">
      <Container className="py-12 sm:py-16">
        {eyebrow && (
          <p className="mb-2 font-sans text-sm font-semibold uppercase tracking-wider text-coral">
            {eyebrow}
          </p>
        )}
        <h1 className="font-serif text-3xl font-semibold text-aubergine sm:text-4xl">
          {title}
        </h1>
        {lead && <p className="mt-4 max-w-2xl text-lg text-muted">{lead}</p>}
      </Container>
    </div>
  );
}
