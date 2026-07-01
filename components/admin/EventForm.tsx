"use client";

import { useActionState } from "react";
import type { ChurchEvent } from "@/lib/types";
import type { FormState } from "@/lib/actions/events";
import { isoToWarsawLocal } from "@/lib/datetime";

const inp =
  "w-full rounded border border-line bg-surface px-3 py-2 text-ink outline-none focus:border-aubergine";
const lbl = "mb-1 block text-sm font-semibold text-ink";

export function EventForm({
  event,
  action,
}: {
  event?: ChurchEvent;
  action: (prev: FormState, fd: FormData) => Promise<FormState>;
}) {
  const [state, formAction, pending] = useActionState(action, {});
  return (
    <form action={formAction} className="max-w-xl space-y-4">
      <label className="block">
        <span className={lbl}>Titel</span>
        <input name="title" defaultValue={event?.title} required className={inp} />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className={lbl}>Beginn (Warschauer Zeit)</span>
          <input
            name="starts_at"
            type="datetime-local"
            defaultValue={event ? isoToWarsawLocal(event.startsAt) : ""}
            required
            className={inp}
          />
        </label>
        <label className="block">
          <span className={lbl}>Ende (optional)</span>
          <input
            name="ends_at"
            type="datetime-local"
            defaultValue={event?.endsAt ? isoToWarsawLocal(event.endsAt) : ""}
            className={inp}
          />
        </label>
      </div>
      <label className="block">
        <span className={lbl}>Ort</span>
        <input
          name="location"
          defaultValue={event?.location ?? "ul. Miodowa 21, 2. Stock (Synodalsaal)"}
          required
          className={inp}
        />
      </label>
      <label className="block">
        <span className={lbl}>Beschreibung (optional)</span>
        <textarea name="description" rows={3} defaultValue={event?.description ?? ""} className={inp} />
      </label>
      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm text-ink">
          <input type="checkbox" name="is_special" defaultChecked={event?.isSpecial} /> Besonderer Gottesdienst
        </label>
        <label className="flex items-center gap-2 text-sm text-ink">
          <input type="checkbox" name="with_communion" defaultChecked={event?.withCommunion} /> Mit Abendmahl
        </label>
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
  );
}
