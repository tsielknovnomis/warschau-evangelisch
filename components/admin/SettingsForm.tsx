"use client";

import { useActionState } from "react";
import { updateSettings } from "@/lib/actions/settings";
import type { FormState } from "@/lib/actions/events";
import type { SiteSettings } from "@/lib/data/settings";

const inp =
  "w-full rounded border border-line bg-surface px-3 py-2 text-ink outline-none focus:border-aubergine";
const lbl = "mb-1 block text-sm font-semibold text-ink";

export function SettingsForm({ settings }: { settings: SiteSettings }) {
  const [state, action, pending] = useActionState<FormState, FormData>(updateSettings, {});
  return (
    <form action={action} className="max-w-xl space-y-4">
      <label className="block">
        <span className={lbl}>Ankündigungstext</span>
        <textarea
          name="announcement"
          rows={2}
          defaultValue={settings.announcement ?? ""}
          placeholder="z. B. Am Sonntag fällt der Gottesdienst aus."
          className={inp}
        />
        <span className="mt-1 block text-xs text-muted">
          Wenn ausgefüllt, zeigt die Leiste genau diesen Text. Wenn leer, erscheint automatisch
          der nächste Gottesdienst-Termin.
        </span>
      </label>
      <label className="flex items-center gap-2 text-sm text-ink">
        <input type="checkbox" name="bar_hidden" defaultChecked={settings.barHidden} /> Leiste ganz ausblenden
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
  );
}
