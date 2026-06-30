import type { ReactNode } from "react";

type Tone = "plain" | "cream" | "dark";

const tones: Record<Tone, string> = {
  plain: "bg-surface border border-line",
  cream: "bg-aubergine-50 border border-aubergine-100",
  dark: "bg-aubergine-deep border border-gold/30 text-bg",
};

/**
 * Calm surface card.
 */
export function Card({
  children,
  tone = "plain",
  className = "",
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <div className={`rounded-[4px] ${tones[tone]} p-6 sm:p-7 ${className}`}>
      {children}
    </div>
  );
}
