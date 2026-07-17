"use client";

import { useState } from "react";
import type { ChurchEvent } from "@/lib/types";
import { formatDate, formatTime } from "@/lib/format";

/** Ready-to-copy invitation text (WhatsApp / email) for one event. */
export function InviteText({ event }: { event: ChurchEvent }) {
  const [copied, setCopied] = useState(false);

  const text = [
    "Herzliche Einladung! 🕊️",
    "",
    event.title,
    `📅 ${formatDate(event.startsAt)}, ${formatTime(event.startsAt)}`,
    `📍 ${event.location}`,
    ...(event.description ? ["", event.description] : []),
    "",
    "Du bist herzlich willkommen — komm einfach vorbei!",
  ].join("\n");

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // clipboard blocked — user can still select the text manually
    }
  }

  return (
    <div className="mt-10 max-w-xl rounded-[6px] border border-line bg-parchment-deep/60 p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="font-body text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-gold-deep">
          Text zum Kopieren — für WhatsApp &amp; Einladungs-E-Mail
        </p>
        <button
          type="button"
          onClick={copy}
          className={`shrink-0 rounded-[3px] px-3.5 py-1.5 text-sm font-semibold transition-colors ${
            copied
              ? "bg-green-700 text-white"
              : "bg-aubergine text-bg hover:bg-aubergine-deep"
          }`}
        >
          {copied ? "Kopiert ✓" : "Kopieren"}
        </button>
      </div>
      <pre className="mt-3 whitespace-pre-wrap rounded border border-line bg-surface p-4 font-body text-[0.95rem] leading-relaxed text-ink">
        {text}
      </pre>
    </div>
  );
}
