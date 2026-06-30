"use client";

import { useEffect, useRef, useState } from "react";
import type { ChurchEvent } from "@/lib/types";

const dateFmt = new Intl.DateTimeFormat("de-DE", {
  weekday: "short",
  day: "numeric",
  month: "long",
});
const timeFmt = new Intl.DateTimeFormat("de-DE", {
  hour: "2-digit",
  minute: "2-digit",
});

export function NextServiceBar({ event }: { event: ChurchEvent | null }) {
  const [dismissed, setDismissed] = useState(false);
  const [overflow, setOverflow] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!event) return;
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
  }, [event, dismissed]);

  if (!event || dismissed) return null;

  const date = dateFmt.format(new Date(event.startsAt));
  const time = timeFmt.format(new Date(event.startsAt));

  const Content = () => (
    <>
      <span className="font-semibold uppercase tracking-[0.13em]">Nächster Gottesdienst</span>
      <span aria-hidden className="mx-2 text-aubergine-deep/45">·</span>
      <span className="font-medium">
        {date} · {time} Uhr
      </span>
    </>
  );

  return (
    <div className="bg-gold text-aubergine-deep">
      <div className="mx-auto flex max-w-6xl items-center gap-2 px-4 py-1 text-[0.72rem] sm:px-8 sm:py-1.5 sm:text-[0.82rem]">
        <div
          ref={wrapRef}
          className={`relative flex-1 overflow-hidden ${overflow ? "" : "flex justify-center"}`}
        >
          {/* hidden measurer — always rendered to detect overflow */}
          <span
            ref={measureRef}
            aria-hidden
            className="invisible absolute whitespace-nowrap"
          >
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
          className="shrink-0 rounded p-0.5 text-aubergine-deep/70 transition-colors hover:bg-aubergine-deep/10 hover:text-aubergine-deep"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>
    </div>
  );
}
