"use client";

import { useState } from "react";
import type { ChurchEvent } from "@/lib/types";
import { formatDate, formatTime } from "@/lib/format";

type Channel = "whatsapp" | "email";
type Form = "du" | "sie";

const RULE = "────────────────────────────";

function buildText(event: ChurchEvent, channel: Channel, form: Form): string {
  const date = formatDate(event.startsAt);
  const time = formatTime(event.startsAt);
  const du = form === "du";
  const isMiodowa = event.location.includes("Miodowa");
  const zugang = isMiodowa ? "\n📍 Zugang über die ul. Leona Schillera" : "";
  // don't repeat the coffee invitation if the description already mentions it
  const mentionsCoffee = (event.description ?? "").toLowerCase().includes("kaffee");

  if (channel === "whatsapp") {
    return [
      `🕊️ ${event.title}`,
      `📅 ${date}, ${time}`,
      `📍 ${event.location}`,
      ...(event.description ? [event.description] : []),
      "",
      du ? "Wir freuen uns auf dich!" : "Wir freuen uns auf Sie!",
    ].join("\n");
  }

  return [
    `Betreff: Herzliche Einladung — ${event.title} am ${date}`,
    "",
    "Liebe Gemeinde,",
    "",
    `herzliche Einladung zu unserem ${event.title}:`,
    "",
    RULE,
    `🕊️ ${event.title}`,
    `📅 ${date}, ${time}`,
    `📍 ${event.location}${zugang}`,
    RULE,
    ...(event.description ? ["", event.description] : []),
    ...(mentionsCoffee
      ? []
      : [
          "",
          "Im Anschluss gibt es beim Kirchenkaffee Gelegenheit zum persönlichen Austausch — Beiträge wie Kuchen, Kekse oder Tee sind herzlich willkommen.",
        ]),
    "",
    du
      ? "Leite diese Einladung gern an Freunde und Bekannte weiter — jede und jeder ist herzlich willkommen. Alle Termine findest du auch auf unserer Website:"
      : "Leiten Sie diese Einladung gern an Freunde und Bekannte weiter — jede und jeder ist herzlich willkommen. Alle Termine finden Sie auch auf unserer Website:",
    "https://warschau-evangelisch.de/gottesdienste",
    "",
    "Herzliche Grüße",
    "Deutschsprachige Evangelische Seelsorge in Warschau",
  ].join("\n");
}

function Toggle<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <div className="inline-flex rounded-[5px] border border-line bg-surface p-0.5">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          className={`rounded-[4px] px-3 py-1 text-sm font-semibold transition-colors ${
            value === o.value ? "bg-aubergine text-bg" : "text-aubergine hover:bg-aubergine-50"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

/** Ready-to-copy invitation text — WhatsApp/email × Du/Sie. */
export function InviteText({ event }: { event: ChurchEvent }) {
  const [channel, setChannel] = useState<Channel>("whatsapp");
  const [form, setForm] = useState<Form>("du");
  const [copied, setCopied] = useState(false);

  const text = buildText(event, channel, form);

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
      <p className="font-body text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-gold-deep">
        Einladungstext zum Kopieren
      </p>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <Toggle
            value={channel}
            onChange={(v) => setChannel(v)}
            options={[
              { value: "whatsapp", label: "WhatsApp" },
              { value: "email", label: "E-Mail" },
            ]}
          />
          <Toggle
            value={form}
            onChange={(v) => setForm(v)}
            options={[
              { value: "du", label: "Du" },
              { value: "sie", label: "Sie" },
            ]}
          />
        </div>
        <button
          type="button"
          onClick={copy}
          className={`shrink-0 rounded-[3px] px-3.5 py-1.5 text-sm font-semibold transition-colors ${
            copied ? "bg-green-700 text-white" : "bg-aubergine text-bg hover:bg-aubergine-deep"
          }`}
        >
          {copied ? "Kopiert ✓" : "Kopieren"}
        </button>
      </div>
      <pre className="mt-3 whitespace-pre-wrap rounded border border-line bg-surface p-4 font-body text-[0.92rem] leading-relaxed text-ink">
        {text}
      </pre>
      {channel === "email" && (
        <p className="mt-2 text-xs text-muted">
          Die erste Zeile ist der Betreff — beim Einfügen in die Mail einfach dorthin verschieben.
        </p>
      )}
    </div>
  );
}
