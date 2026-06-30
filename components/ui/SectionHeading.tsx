import type { ReactNode } from "react";

/**
 * Section heading with optional gold kicker label and lead text.
 */
export function SectionHeading({
  eyebrow,
  children,
  lead,
  align = "left",
  as: As = "h2",
}: {
  eyebrow?: string;
  children: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
}) {
  const center = align === "center";
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <p className="kicker flex items-center gap-3">
          {center && <span className="h-px w-8 bg-gold/60" />}
          {eyebrow}
          <span className="h-px w-8 bg-gold/60" />
        </p>
      )}
      <As className="mt-3 font-display text-3xl font-medium text-aubergine sm:text-[2.5rem]">
        {children}
      </As>
      {lead && <p className="mt-4 text-lg text-muted">{lead}</p>}
    </div>
  );
}
