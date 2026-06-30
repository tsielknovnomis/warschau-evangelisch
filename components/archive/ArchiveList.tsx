"use client";

import { useMemo, useState } from "react";
import type { ArchiveEntry } from "@/lib/types";

function year(e: ArchiveEntry): string {
  return e.date ? e.date.slice(0, 4) : "Ohne Datum";
}

export function ArchiveList({ entries }: { entries: ArchiveEntry[] }) {
  const [query, setQuery] = useState("");

  const grouped = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? entries.filter((e) => e.title.toLowerCase().includes(q))
      : entries;
    const byYear = new Map<string, ArchiveEntry[]>();
    for (const e of filtered) {
      const y = year(e);
      if (!byYear.has(y)) byYear.set(y, []);
      byYear.get(y)!.push(e);
    }
    return [...byYear.entries()].sort((a, b) => b[0].localeCompare(a[0]));
  }, [entries, query]);

  const total = grouped.reduce((n, [, list]) => n + list.length, 0);

  return (
    <div>
      <label className="block">
        <span className="sr-only">Im Archiv suchen</span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Im Archiv suchen …"
          className="w-full max-w-md rounded-md border border-line bg-white px-4 py-2.5 text-base focus:border-aubergine focus:outline-none focus:ring-2 focus:ring-aubergine/30"
        />
      </label>
      <p className="mt-3 text-sm text-muted">{total} Beiträge</p>

      <div className="mt-8 space-y-10">
        {grouped.map(([y, list]) => (
          <section key={y}>
            <h2 className="font-serif text-2xl text-aubergine">{y}</h2>
            <ul className="mt-3 divide-y divide-line border-t border-line">
              {list.map((e) => (
                <li key={e.slug} className="flex flex-col gap-0.5 py-2.5 sm:flex-row sm:items-baseline sm:gap-4">
                  {e.date && (
                    <span className="w-24 shrink-0 text-sm text-muted">
                      {e.date.split("-").reverse().join(".")}
                    </span>
                  )}
                  <span className="text-ink">{e.title}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
        {total === 0 && <p className="text-muted">Keine Beiträge gefunden.</p>}
      </div>
    </div>
  );
}
