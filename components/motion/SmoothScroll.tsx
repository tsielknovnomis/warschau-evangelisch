"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Momentum smooth scrolling (Lenis) for the whole page — the eased, weighted
 * feel you notice while scrolling, not just on anchor clicks. Anchor links
 * (e.g. "Lern uns kennen ↓") are handled smoothly too, offset for the sticky
 * header. Disabled entirely under prefers-reduced-motion.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();

  if (reduce) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.1,
        smoothWheel: true,
        anchors: { offset: -96 },
      }}
    >
      {children}
    </ReactLenis>
  );
}
