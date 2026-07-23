"use client";

import { useRouter } from "next/navigation";
import { EVENT_TEMPLATES } from "@/lib/event-templates";

/**
 * Dropdown next to the "+ Neuer Termin" button: pick a template and jump
 * straight into the prefilled new-event form.
 */
export function TemplatePicker() {
  const router = useRouter();
  return (
    <select
      value=""
      onChange={(e) => {
        if (e.target.value) router.push(`/admin/termine/neu?vorlage=${e.target.value}`);
      }}
      aria-label="Neuen Termin aus Vorlage anlegen"
      className="rounded-[3px] border border-line bg-surface px-3 py-2 text-sm font-semibold text-aubergine outline-none transition-colors hover:border-aubergine focus:border-aubergine"
    >
      <option value="" disabled>
        Aus Vorlage…
      </option>
      {EVENT_TEMPLATES.map((t) => (
        <option key={t.key} value={t.key}>
          {t.label}
        </option>
      ))}
    </select>
  );
}
