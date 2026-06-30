import { Container } from "@/components/ui/Container";

/**
 * Standard page header band for inner pages — aubergine, gold-accented.
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
    <div className="relative overflow-hidden border-b border-gold/30 bg-aubergine-deep text-bg">
      {/* faint rays */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 opacity-[0.12]"
        style={{
          background:
            "repeating-conic-gradient(from 0deg, var(--gold-soft) 0deg 0.4deg, transparent 0.4deg 8deg)",
          maskImage: "radial-gradient(circle, black 0%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(circle, black 0%, transparent 70%)",
        }}
      />
      <Container className="relative py-14 sm:py-20">
        {eyebrow && (
          <p className="mb-3 font-body text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-gold-soft">
            {eyebrow}
          </p>
        )}
        <h1 className="font-display text-4xl font-medium text-white sm:text-5xl">
          {title}
        </h1>
        {lead && <p className="mt-4 max-w-2xl text-lg text-bg/75">{lead}</p>}
      </Container>
    </div>
  );
}
