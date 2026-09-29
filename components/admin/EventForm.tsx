"use client";

import { useActionState, useState } from "react";
import type { ChurchEvent } from "@/lib/types";
import type { FormState } from "@/lib/actions/events";
import { isoToWarsawLocal } from "@/lib/datetime";
import {
  EVENT_TEMPLATES,
  getTemplate,
  DEFAULT_LOCATION,
  type EventTemplate,
} from "@/lib/event-templates";

const inp =
  "w-full rounded border border-line bg-surface px-3 py-2 text-ink outline-none focus:border-aubergine";
const lbl = "mb-1 block text-sm font-semibold text-ink";

export function EventForm({
  event,
  action,
  initialTemplate,
}: {
  event?: ChurchEvent;
  action: (prev: FormState, fd: FormData) => Promise<FormState>;
  /** Template key from ?vorlage= — prefills the form when creating. */
  initialTemplate?: string;
}) {
  const [state, formAction, pending] = useActionState(action, {});
  const start = event ? undefined : getTemplate(initialTemplate);

  const [templateKey, setTemplateKey] = useState(start?.key ?? "");
  const [title, setTitle] = useState(event?.title ?? start?.title ?? "");
  const [startsAt, setStartsAt] = useState(
    event ? isoToWarsawLocal(event.startsAt) : (start ? start.startsAt() : ""),
  );
  const [location, setLocation] = useState(event?.location ?? DEFAULT_LOCATION);
  const [description, setDescription] = useState(event?.description ?? start?.description ?? "");
  const [isSpecial, setIsSpecial] = useState(event?.isSpecial ?? start?.isSpecial ?? false);
  const [cancelled, setCancelled] = useState(event?.cancelled ?? start?.cancelled ?? false);
  const [cancelNote, setCancelNote] = useState(event?.cancelNote ?? start?.cancelNote ?? "");

  function applyTemplate(t: EventTemplate) {
    setTemplateKey(t.key);
    setTitle(t.title);
    setStartsAt(t.startsAt());
    setLocation(DEFAULT_LOCATION);
    setDescription(t.description);
    setIsSpecial(t.isSpecial);
    setCancelled(t.cancelled ?? false);
    setCancelNote(t.cancelNote ?? "");
  }

  return (
    <div className="max-w-xl">
      <form action={formAction} className="space-y-4">
        {/* Template dropdown — only when creating a new event */}
        {!event && (
          <label className="block sm:max-w-xs">
            <span className={lbl}>Vorlage</span>
            <select
              value={templateKey}
              onChange={(e) => {
                const t = getTemplate(e.target.value);
                if (t) applyTemplate(t);
                else setTemplateKey("");
              }}
              className={inp}
            >
              <option value="">Ohne Vorlage</option>
              {EVENT_TEMPLATES.map((t) => (
                <option key={t.key} value={t.key}>
                  {t.label}
                </option>
              ))}
            </select>
          </label>
        )}

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
        <div className="rounded-[4px] border border-line bg-parchment-deep/60 p-3">
          <label className="flex items-center gap-2 text-sm font-semibold text-ink">
            <input
              type="checkbox"
              name="cancelled"
              checked={cancelled}
              onChange={(e) => setCancelled(e.target.checked)}
            />{" "}
            Fällt aus
          </label>
          <span className="mt-1 block text-xs text-muted">
            Der Termin bleibt sichtbar, wird aber durchgestrichen mit „Entfällt“ angezeigt.
            Leiste und Startseite weisen darauf hin und nennen den nächsten Gottesdienst.
          </span>
          {cancelled && (
            <label className="mt-3 block">
              <span className={lbl}>Hinweis zum Ausfall (optional)</span>
              <textarea
                name="cancel_note"
                rows={2}
                value={cancelNote}
                onChange={(e) => setCancelNote(e.target.value)}
                placeholder="z. B. Einladung zum polnischen Gottesdienst in Święta Trójca"
                className={inp}
              />
            </label>
          )}
        </div>
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
