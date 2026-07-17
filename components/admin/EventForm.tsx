"use client";

import { useActionState, useState } from "react";
import type { ChurchEvent } from "@/lib/types";
import type { FormState } from "@/lib/actions/events";
import { isoToWarsawLocal } from "@/lib/datetime";

const inp =
  "w-full rounded border border-line bg-surface px-3 py-2 text-ink outline-none focus:border-aubergine";
const lbl = "mb-1 block text-sm font-semibold text-ink";

const DEFAULT_LOCATION = "ul. Miodowa 21, 2. Stock (Synodalsaal)";

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

/** Next Sunday (never today) at the given time, as a datetime-local value. */
function nextSunday(hour: number, minute: number): string {
  const d = new Date();
  d.setDate(d.getDate() + (((7 - d.getDay()) % 7) || 7));
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(hour)}:${pad(minute)}`;
}

/** December 24 of the current (or next, if past) year at 16:00. */
function nextChristmasEve(): string {
  const now = new Date();
  const year = now > new Date(now.getFullYear(), 11, 24, 16) ? now.getFullYear() + 1 : now.getFullYear();
  return `${year}-12-24T16:00`;
}

type Template = {
  label: string;
  title: string;
  startsAt: () => string;
  description: string;
  isSpecial: boolean;
};

const TEMPLATES: Template[] = [
  {
    label: "Gottesdienst",
    title: "Gottesdienst",
    startsAt: () => nextSunday(9, 30),
    description: "",
    isSpecial: false,
  },
  {
    label: "Mit Gemeindekaffee",
    title: "Gottesdienst",
    startsAt: () => nextSunday(9, 30),
    description: "Im Anschluss laden wir herzlich zum Gemeindekaffee ein.",
    isSpecial: false,
  },
  {
    label: "Familiengottesdienst",
    title: "Familiengottesdienst",
    startsAt: () => nextSunday(9, 30),
    description: "Familiengottesdienst — Kinder sind besonders willkommen.",
    isSpecial: true,
  },
  {
    label: "Christvesper",
    title: "Christvesper mit Krippenspiel",
    startsAt: nextChristmasEve,
    description: "Heiligabend — mit dem Krippenspiel der Kinder.",
    isSpecial: true,
  },
];

export function EventForm({
  event,
  action,
}: {
  event?: ChurchEvent;
  action: (prev: FormState, fd: FormData) => Promise<FormState>;
}) {
  const [state, formAction, pending] = useActionState(action, {});
  const [title, setTitle] = useState(event?.title ?? "");
  const [startsAt, setStartsAt] = useState(event ? isoToWarsawLocal(event.startsAt) : "");
  const [location, setLocation] = useState(event?.location ?? DEFAULT_LOCATION);
  const [description, setDescription] = useState(event?.description ?? "");
  const [isSpecial, setIsSpecial] = useState(event?.isSpecial ?? false);

  function applyTemplate(t: Template) {
    setTitle(t.title);
    setStartsAt(t.startsAt());
    setLocation(DEFAULT_LOCATION);
    setDescription(t.description);
    setIsSpecial(t.isSpecial);
  }

  return (
    <div className="max-w-xl">
      {/* Templates — only when creating a new event */}
      {!event && (
        <div className="mb-6 rounded-[6px] border border-line bg-parchment-deep/60 p-4">
          <p className="font-body text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-gold-deep">
            Vorlage wählen (füllt das Formular aus)
          </p>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {TEMPLATES.map((t) => (
              <button
                key={t.label}
                type="button"
                onClick={() => applyTemplate(t)}
                className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm font-semibold text-aubergine transition-colors hover:border-aubergine hover:bg-aubergine-50"
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <form action={formAction} className="space-y-4">
        <label className="block">
          <span className={lbl}>Titel</span>
          <input
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className={inp}
          />
        </label>
        <label className="block sm:max-w-xs">
          <span className={lbl}>Wann? (Warschauer Zeit)</span>
          <input
            name="starts_at"
            type="datetime-local"
            value={startsAt}
            onChange={(e) => setStartsAt(e.target.value)}
            required
            className={inp}
          />
        </label>
        <label className="block">
          <span className={lbl}>Ort</span>
          <input
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className={inp}
          />
        </label>
        <label className="block">
          <span className={lbl}>Beschreibung (optional)</span>
          <textarea
            name="description"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={inp}
          />
        </label>
        <label className="flex items-center gap-2 text-sm text-ink">
          <input
            type="checkbox"
            name="is_special"
            checked={isSpecial}
            onChange={(e) => setIsSpecial(e.target.checked)}
          />{" "}
          Besonderer Gottesdienst
        </label>
        {state.error && <p className="text-sm text-red-700">{state.error}</p>}
        <button
          type="submit"
          disabled={pending}
          className="rounded-[3px] bg-aubergine px-5 py-2.5 font-semibold text-bg transition-colors hover:bg-aubergine-deep disabled:opacity-60"
        >
          {pending ? "Speichern…" : "Speichern"}
        </button>
      </form>
    </div>
  );
}
