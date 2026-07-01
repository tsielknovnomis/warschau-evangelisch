"use client";

import { Children, useState, type ReactNode } from "react";

/**
 * Shows the first `initialCount` children; the rest render on demand
 * (conditional rendering — collapsed items are not in the initial HTML).
 */
export function ShowMore({
  children,
  initialCount = 3,
  moreLabel,
  lessLabel = "Weniger anzeigen",
}: {
  children: ReactNode;
  initialCount?: number;
  /** "{n}" is replaced with the number of hidden items. */
  moreLabel: string;
  lessLabel?: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const items = Children.toArray(children);
  const hidden = items.length - initialCount;

  const visible = expanded ? items : items.slice(0, initialCount);

  return (
    <>
      {visible}
      {hidden > 0 && (
        <button
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="mt-1 inline-flex items-center gap-2 font-body text-sm font-semibold text-aubergine transition-colors hover:text-gold-deep"
        >
          {expanded ? lessLabel : moreLabel.replace("{n}", String(hidden))}
          <span
            aria-hidden
            className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
          >
            ↓
          </span>
        </button>
      )}
    </>
  );
}
