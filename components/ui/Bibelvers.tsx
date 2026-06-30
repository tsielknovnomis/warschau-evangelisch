import type { ReactNode } from "react";

/**
 * A Bible verse / quotation — dignified display serif, gold rule.
 */
export function Bibelvers({
  children,
  cite,
  className = "",
}: {
  children: ReactNode;
  cite?: string;
  className?: string;
}) {
  return (
    <figure className={`border-l-2 border-gold pl-5 ${className}`}>
      <blockquote className="font-display text-xl italic leading-relaxed text-aubergine-700">
        {children}
      </blockquote>
      {cite && (
        <figcaption className="mt-2 font-body text-sm not-italic tracking-wide text-muted">
          {cite}
        </figcaption>
      )}
    </figure>
  );
}
