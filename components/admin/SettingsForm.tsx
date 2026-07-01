"use client";

import { useActionState, useState } from "react";
import { updateSettings } from "@/lib/actions/settings";
import type { FormState } from "@/lib/actions/events";
import type { SiteSettings } from "@/lib/data/settings";
import type { BarParts } from "@/lib/announcement";

const inp =
  "w-full rounded border border-line bg-surface px-3 py-2 text-ink outline-none focus:border-aubergine";
const lbl = "mb-1 block text-sm font-semibold text-ink";

export function SettingsForm({
  settings,
  autoParts,
}: {
  settings: SiteSettings;
  autoParts: BarParts | null;
}) {
  const [state, action, pending] = useActionState<FormState, FormData>(updateSettings, {});
  const [announcement, setAnnouncement] = useState(settings.announcement ?? "");
  const [hidden, setHidden] = useState(settings.barHidden);

  const custom = announcement.trim();

  return (
    <form action={action} className="max-w-xl space-y-5">
      {/* Live preview — always shows what visitors will see */}
      <div>
        <span className={lbl}>Vorschau</span>
        {hidden ? (
          <div className="rounded border border-dashed border-line bg-parchment-deep px-4 py-2 text-center text-sm text-muted">
            Die Leiste ist ausgeblendet — Besucher sehen sie nicht.
          </div>
        ) : (
          <div className="rounded border-b border-white/10 bg-aubergine-deep px-4 py-1.5 text-center text-[0.8rem]">
            {custom ? (
              <span className="font-medium text-bg/90">{custom}</span>
            ) : autoParts ? (
              <>
                <span className="font-semibold uppercase tracking-[0.13em] text-gold-soft">
                  {autoParts.label}
                </span>
                <span aria-hidden className="mx-2 text-gold/50">·</span>
                <span className="font-medium text-bg/90">{autoParts.text}</span>
              </>
            ) : (
              <span className="text-bg/60 italic">
                Kein kommender Termin — die Leiste bleibt leer.
              </span>
            )}
          </div>
        )}
        {!hidden && (
          <span className="mt-1 block text-xs text-muted">
            {custom
              ? "Es wird dein eigener Text angezeigt."
              : autoParts
                ? "Es wird automatisch der nächste Gottesdienst angezeigt."
                : "Sobald ein Termin angelegt ist, erscheint er hier automatisch."}
          </span>
        )}
      </div>

      <label className="block">
        <span className={lbl}>Eigener Text (optional)</span>
        <textarea
          name="announcement"
          rows={2}
          value={announcement}
          onChange={(e) => setAnnouncement(e.target.value)}
          placeholder="z. B. Am Sonntag fällt der Gottesdienst aus."
          className={inp}
        />
        <span className="mt-1 block text-xs text-muted">
          Leer lassen, um automatisch den nächsten Gottesdienst-Termin anzuzeigen.
        </span>
      </label>

      <label className="flex items-center gap-2 text-sm text-ink">
        <input
          type="checkbox"
          name="bar_hidden"
          checked={hidden}
          onChange={(e) => setHidden(e.target.checked)}
        />{" "}
        Leiste ganz ausblenden
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
