"use client";

import { useEffect, useRef, useState } from "react";
import type { ChurchEvent } from "@/lib/types";

const dateFmt = new Intl.DateTimeFormat("de-DE", {
  weekday: "short",
  day: "numeric",
  month: "long",
  timeZone: "Europe/Warsaw",
});
const timeFmt = new Intl.DateTimeFormat("de-DE", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Europe/Warsaw",
});

export function NextServiceBar({
  event,
  onBreak,
  announcement = null,
  barHidden = false,
}: {
  event: ChurchEvent | null;
  onBreak: boolean;
  announcement?: string | null;
  barHidden?: boolean;
}) {
  const [dismissed, setDismissed] = useState(false);
  const [overflow, setOverflow] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);

  const hasContent = !barHidden && (Boolean(announcement) || Boolean(event));

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
  }, [hasContent, announcement, event, dismissed]);

  if (!hasContent || dismissed) return null;

  const start = event ? new Date(event.startsAt) : null;
  const date = start ? dateFmt.format(start) : "";
  const time = start ? timeFmt.format(start) : "";

  const Content = () =>
    announcement ? (
      <span className="font-medium text-bg/90">{announcement}</span>
    ) : (
      <>
        <span className="font-semibold uppercase tracking-[0.13em] text-gold-soft">
          {onBreak ? "Sommerpause ☀" : "Herzlich eingeladen"}
        </span>
        <span aria-hidden className="mx-2 text-gold/50">·</span>
        <span className="font-medium text-bg/90">
          {onBreak
            ? `Der nächste Gottesdienst ist am ${date}, ${time} Uhr. Du bist herzlich eingeladen!`
            : `Gottesdienst am ${date}, ${time} Uhr`}
        </span>
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
            <Content />
          </span>

          {overflow ? (
            <div className="flex w-max animate-marquee whitespace-nowrap">
              <span className="pr-16">
                <Content />
              </span>
              <span className="pr-16" aria-hidden>
                <Content />
              </span>
            </div>
          ) : (
            <span className="whitespace-nowrap">
              <Content />
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
