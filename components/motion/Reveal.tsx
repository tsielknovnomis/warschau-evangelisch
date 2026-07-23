"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Scroll-triggered reveal — a gentle fade + rise as the element enters view.
 *
 * Progressive enhancement: the server HTML is fully VISIBLE (never ship
 * opacity-0 markup — if JS is slow or fails, the page must still read;
 * board reported exactly this on first load). After mount, only elements
 * below the fold are armed for the scroll animation; anything already on
 * screen simply stays visible.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 22,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const belowFold = el.getBoundingClientRect().top > window.innerHeight - 60;
    if (belowFold) setArmed(true);
  }, [reduce]);

  if (!armed || reduce) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
