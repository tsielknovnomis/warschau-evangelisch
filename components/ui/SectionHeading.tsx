import type { ReactNode } from "react";

/**
 * Section heading with optional eyebrow label and lead text.
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
  const alignment = align === "center" ? "text-center mx-auto" : "";
  return (
    <div className={`max-w-2xl ${alignment}`}>
      {eyebrow && (
        <p className="mb-2 font-sans text-sm font-semibold uppercase tracking-wider text-coral">
          {eyebrow}
        </p>
      )}
      <As className="text-3xl sm:text-4xl font-semibold">{children}</As>
      {lead && <p className="mt-4 text-lg text-muted">{lead}</p>}
    </div>
  );
}
