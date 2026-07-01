import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Card wrapper for a dashboard section: icon, title, one-line description,
 * optional primary action (top right), content below.
 */
export function AdminSection({
  id,
  icon,
  title,
  description,
  actionHref,
  actionLabel,
  children,
}: {
  id: string;
  icon: ReactNode;
  title: string;
  description: string;
  actionHref?: string;
  actionLabel?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-20 overflow-hidden rounded-[8px] border border-line bg-surface shadow-sm"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-parchment-deep/60 px-5 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-aubergine text-bg">
            {icon}
          </span>
          <div>
            <h2 className="font-display text-xl font-medium leading-tight text-aubergine">{title}</h2>
            <p className="text-xs text-muted">{description}</p>
          </div>
        </div>
        {actionHref && (
          <Link
            href={actionHref}
            className="rounded-[3px] bg-aubergine px-4 py-2 text-sm font-semibold text-bg transition-colors hover:bg-aubergine-deep"
          >
            {actionLabel}
          </Link>
        )}
      </div>
      <div className="px-5 py-5 sm:px-6">{children}</div>
    </section>
  );
}
