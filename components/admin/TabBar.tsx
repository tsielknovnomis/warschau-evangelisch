import Link from "next/link";

export type AdminTab = "termine" | "aktuelles" | "leiste";

const TABS: { key: AdminTab; label: string }[] = [
  { key: "termine", label: "Termine" },
  { key: "aktuelles", label: "Aktuelles" },
  { key: "leiste", label: "Info-Leiste" },
];

/** Tab navigation for the admin dashboard (server-rendered, ?tab= links). */
export function TabBar({
  active,
  counts,
}: {
  active: AdminTab;
  counts: Partial<Record<AdminTab, number>>;
}) {
  return (
    <nav className="flex gap-1 rounded-[8px] border border-line bg-parchment-deep/60 p-1">
      {TABS.map((t) => {
        const isActive = t.key === active;
        return (
          <Link
            key={t.key}
            href={`/admin?tab=${t.key}`}
            className={`flex-1 rounded-[6px] px-4 py-2.5 text-center font-body text-sm font-semibold transition-colors sm:flex-none sm:px-6 ${
              isActive
                ? "bg-aubergine text-bg shadow-sm"
                : "text-aubergine hover:bg-aubergine-50"
            }`}
          >
            {t.label}
            {counts[t.key] !== undefined && (
              <span className={`ml-1.5 text-xs ${isActive ? "text-bg/70" : "text-muted"}`}>
                {counts[t.key]}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
