import type { ReactNode } from "react";

/**
 * A Bible verse / quotation — dignified serif, no shouty uppercase.
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
    <figure className={`border-l-2 border-aubergine-300 pl-5 ${className}`}>
      <blockquote className="font-serif text-xl italic leading-relaxed text-aubergine-800">
        {children}
      </blockquote>
      {cite && (
        <figcaption className="mt-2 font-sans text-sm not-italic text-muted">
          — {cite}
        </figcaption>
      )}
    </figure>
  );
}
