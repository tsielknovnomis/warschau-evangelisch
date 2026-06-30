import type { ReactNode } from "react";

/**
 * Calm surface card. `tone="cream"` for the warm section background.
 */
export function Card({
  children,
  tone = "plain",
  className = "",
}: {
  children: ReactNode;
  tone?: "plain" | "cream";
  className?: string;
}) {
  const tones = {
    plain: "bg-white border border-line",
    cream: "bg-cream border border-cream-deep",
  };
  return (
    <div className={`rounded-lg ${tones[tone]} p-6 sm:p-7 ${className}`}>
      {children}
    </div>
  );
}
