import type { ReactNode } from "react";
import { bibleserverUrl } from "@/lib/bible";

/**
 * A Bible verse / quotation — dignified display serif, gold rule.
 * The cite links to bibleserver.com (board decision: every scripture
 * reference should invite readers into the Bible itself).
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
          <a
            href={bibleserverUrl(cite)}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-gold/50 underline-offset-4 transition-colors hover:text-aubergine"
          >
            {cite}
          </a>
        </figcaption>
      )}
    </figure>
  );
}
