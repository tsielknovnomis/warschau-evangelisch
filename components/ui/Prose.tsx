import type { ReactNode } from "react";

/**
 * Typographic wrapper for long-form / MDX content.
 * Styling lives in the `.prose-content` class in globals.css.
 */
export function Prose({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`prose-content ${className}`}>{children}</div>;
}
