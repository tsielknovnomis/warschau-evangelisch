"use client";

import { useEffect, useRef, useState } from "react";
import type { ChurchEvent } from "@/lib/types";
import { barParts, effectiveAnnouncement, serviceStatus } from "@/lib/service-status";
import { useNow } from "@/lib/use-now";

export function NextServiceBar({
  events,
  serverNow,
  announcement = null,
  announcementUntil = null,
  barHidden = false,
}: {
  /** Upcoming events (incl. cancelled) — re-filtered with the browser clock. */
  events: ChurchEvent[];
  serverNow: number;
  announcement?: string | null;
  announcementUntil?: string | null;
  barHidden?: boolean;
}) {
  const [dismissed, setDismissed] = useState(false);
  const [overflow, setOverflow] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);

  const now = useNow(serverNow);
  const custom = effectiveAnnouncement({ announcement, announcementUntil }, now);
  const auto = barParts(serviceStatus(events, now));
  const hasContent = !barHidden;

  useEffect(() => {
    if (!hasContent) return;
    const check = () => {
      const w = wrapRef.current;
      const m = measureRef.current;
      if (!w || !m) return;
      setOverflow(m.scrollWidth > w.clientWidth + 2);
    };
    check();
    const ro = new ResizeObserver(check);
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, [hasContent, custom, auto.text, dismissed]);

  if (!hasContent || dismissed) return null;

  const autoText = auto.href ? (
    <a
      href={auto.href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-bg/90 underline decoration-gold/50 underline-offset-2 hover:text-bg"
    >
      {auto.text}
    </a>
  ) : (
    <span className="font-medium text-bg/90">{auto.text}</span>
  );

  const content = custom ? (
    <span className="font-medium text-bg/90">{custom}</span>
  ) : (
    <>
      <span className="font-semibold uppercase tracking-[0.13em] text-gold-soft">
        {auto.label}
      </span>
      <span aria-hidden className="mx-2 text-gold/50">·</span>
      {autoText}
    </>
  );

  return (
    <div className="border-b border-white/10 bg-aubergine-deep">
      <div className="mx-auto flex max-w-6xl items-center gap-2 px-4 py-1 text-[0.72rem] sm:px-8 sm:py-1.5 sm:text-[0.8rem]">
        <div
          ref={wrapRef}
          className={`relative flex-1 overflow-hidden ${overflow ? "" : "flex justify-center"}`}
        >
          <span ref={measureRef} aria-hidden className="invisible absolute whitespace-nowrap">
            {content}
          </span>

          {overflow ? (
            <div className="flex w-max animate-marquee whitespace-nowrap">
              <span className="pr-16">
                {content}
              </span>
              <span className="pr-16" aria-hidden>
                {content}
              </span>
            </div>
          ) : (
            <span className="whitespace-nowrap">
              {content}
            </span>
          )}
        </div>

        <button
          onClick={() => setDismissed(true)}
          aria-label="Hinweis schließen"
          className="shrink-0 rounded p-0.5 text-bg/55 transition-colors hover:bg-white/10 hover:text-bg"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>
    </div>
  );
}
