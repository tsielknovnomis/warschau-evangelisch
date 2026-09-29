"use client";

import { useActionState, useState } from "react";
import type { NewsItem } from "@/lib/types";
import type { FormState } from "@/lib/actions/events";
import { isoToWarsawLocal } from "@/lib/datetime";

const inp =
  "w-full rounded border border-line bg-surface px-3 py-2 text-ink outline-none focus:border-aubergine";
const lbl = "mb-1 block text-sm font-semibold text-ink";

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function NewsForm({
  item,
  action,
}: {
  item?: NewsItem;
  action: (prev: FormState, fd: FormData) => Promise<FormState>;
}) {
  const [state, formAction, pending] = useActionState(action, {});
  const [slug, setSlug] = useState(item?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(item));

  return (
    <form action={formAction} className="max-w-xl space-y-4">
      <label className="block">
        <span className={lbl}>Titel</span>
        <input
          name="title"
          defaultValue={item?.title}
          required
          className={inp}
          onChange={(e) => {
            if (!slugTouched) setSlug(slugify(e.target.value));
          }}
        />
      </label>
      <label className="block">
        <span className={lbl}>Slug (Teil der URL)</span>
        <input
          name="slug"
          value={slug}
          required
          className={inp}
          onChange={(e) => {
            setSlug(e.target.value);
            setSlugTouched(true);
          }}
        />
        <span className="mt-1 block text-xs text-muted">warschau-evangelisch.de/aktuelles/{slug || "…"}</span>
      </label>
      <label className="block">
        <span className={lbl}>Veröffentlicht am (Warschauer Zeit)</span>
        <input
          name="published_at"
          type="datetime-local"
          defaultValue={item ? isoToWarsawLocal(item.publishedAt) : ""}
          required
          className={inp}
        />
      </label>
      <label className="block sm:max-w-xs">
        <span className={lbl}>Anzeigen bis (optional)</span>
        <input
          name="show_until"
          type="date"
          defaultValue={item?.showUntil ?? ""}
          className={inp}
        />
      </label>
      <p className="-mt-2 text-xs text-muted">
        Danach verschwindet der Beitrag von der Startseite und wandert unter „Ältere Beiträge“ —
        ideal für Hinweise mit Datum. Angepinnte Beiträge ohne Datum bleiben höchstens 30 Tage oben.
      </p>
      <label className="block">
        <span className={lbl}>Kurztext (Vorschau in der Liste)</span>
        <textarea name="excerpt" rows={2} defaultValue={item?.excerpt} required className={inp} />
      </label>
      <label className="block">
        <span className={lbl}>Inhalt (Markdown erlaubt)</span>
        <textarea name="body" rows={8} defaultValue={item?.body} required className={inp} />
      </label>
      <label className="flex items-center gap-2 text-sm text-ink">
        <input type="checkbox" name="pinned" defaultChecked={item?.pinned} /> Anpinnen (oben hervorheben)
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
