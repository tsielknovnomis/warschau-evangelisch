import Link from "next/link";
import { getAllEvents } from "@/lib/data/events";
import { getNews } from "@/lib/data/news";
import { getSettings } from "@/lib/data/settings";
import { barParts, relevantEvents, serviceStatus } from "@/lib/service-status";
import { adminWarnings } from "@/lib/admin-warnings";
import { warsawDay } from "@/lib/datetime";
import { currentTime } from "@/lib/clock";
import { TabBar, type AdminTab } from "@/components/admin/TabBar";
import { EventRow } from "@/components/admin/EventRow";
import { NewsRow } from "@/components/admin/NewsRow";
import { SettingsForm } from "@/components/admin/SettingsForm";
import { TemplatePicker } from "@/components/admin/TemplatePicker";
import { formatDate, formatTime } from "@/lib/format";
import type { ChurchEvent } from "@/lib/types";

const monthFmt = new Intl.DateTimeFormat("de-DE", {
  month: "long",
  year: "numeric",
  timeZone: "Europe/Warsaw",
});

function groupByMonth(events: ChurchEvent[]): [string, ChurchEvent[]][] {
  const groups = new Map<string, ChurchEvent[]>();
  for (const e of events) {
    const key = monthFmt.format(new Date(e.startsAt));
    (groups.get(key) ?? groups.set(key, []).get(key)!).push(e);
  }
  return [...groups.entries()];
}

function SearchBox({ tab, q, placeholder }: { tab: AdminTab; q: string; placeholder: string }) {
  return (
    <form method="GET" action="/admin" className="flex gap-2">
      <input type="hidden" name="tab" value={tab} />
      <input
        type="search"
        name="q"
        defaultValue={q}
        placeholder={placeholder}
        className="w-full rounded-[6px] border border-line bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-aubergine sm:max-w-xs"
      />
      {q && (
        <Link
          href={`/admin?tab=${tab}`}
          className="flex items-center rounded-[6px] border border-line px-3 text-sm font-semibold text-muted hover:border-aubergine hover:text-aubergine"
        >
          Zurücksetzen
        </Link>
      )}
    </form>
  );
}

function EmptyState({ text, href, cta }: { text: string; href?: string; cta?: string }) {
  return (
    <div className="rounded-[8px] border border-dashed border-line bg-surface px-5 py-10 text-center">
      <p className="text-muted">{text}</p>
      {href && cta && (
        <Link href={href} className="mt-2 inline-block text-sm font-semibold text-aubergine hover:text-gold-deep">
          {cta} →
        </Link>
      )}
    </div>
  );
}

export default async function AdminHome({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string; q?: string }>;
}) {
  const params = await searchParams;
  const tab: AdminTab = params.tab === "aktuelles" || params.tab === "leiste" ? params.tab : "termine";
  const q = (params.q ?? "").trim().toLowerCase();

  const [events, news, settings] = await Promise.all([getAllEvents(), getNews(), getSettings()]);

  // Dynamic route — rendered per request, so "now" is genuinely fresh here.
  const now = currentTime();
  const status = serviceStatus(events, now);
  const nextEvent = status.kind === "next" ? status.next : null;
  const nextId = nextEvent?.id;
  const warnings = adminWarnings({ events, news, settings, now });
  const upcomingAll = relevantEvents(events, now);
  const upcomingIds = new Set(upcomingAll.map((e) => e.id));

  const matchEvent = (e: ChurchEvent) => !q || e.title.toLowerCase().includes(q);
  const upcoming = upcomingAll.filter(matchEvent);
  const past = events
    .filter((e) => !upcomingIds.has(e.id))
    .filter(matchEvent)
    .reverse();
  const filteredNews = news.filter(
    (n) => !q || n.title.toLowerCase().includes(q) || n.excerpt.toLowerCase().includes(q),
  );

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-medium text-aubergine">Schön, dass du da bist!</h1>
          <p className="mt-1 text-muted">
            {nextEvent
              ? `Nächster Gottesdienst: ${formatDate(nextEvent.startsAt)}, ${formatTime(nextEvent.startsAt)}. Alles, was du speicherst, ist sofort online.`
              : "Alles, was du speicherst, ist sofort online."}
          </p>
        </div>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-[3px] border border-line bg-surface px-4 py-2 text-sm font-semibold text-aubergine transition-colors hover:border-aubergine hover:bg-aubergine-50"
        >
          Zur Website <span aria-hidden>↗</span>
        </a>
      </div>

      {/* Staleness warnings — catch outdated content before visitors do */}
      {warnings.length > 0 && (
        <div className="rounded-[8px] border border-amber-300 bg-amber-50 px-5 py-4">
          <p className="font-semibold text-amber-900">Bitte kurz prüfen</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-amber-900">
            {warnings.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Tabs */}
      <TabBar active={tab} counts={{ termine: upcomingAll.length, aktuelles: news.length }} />

      {/* ── Termine ── */}
      {tab === "termine" && (
        <div className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <SearchBox tab="termine" q={params.q ?? ""} placeholder="Termine durchsuchen…" />
            <div className="flex items-center gap-2">
              <TemplatePicker />
              <Link
                href="/admin/termine/neu"
                className="rounded-[3px] bg-aubergine px-4 py-2 text-sm font-semibold text-bg transition-colors hover:bg-aubergine-deep"
              >
                + Neuer Termin
              </Link>
            </div>
          </div>

          {upcoming.length === 0 ? (
            <EmptyState
              text={q ? `Keine Termine für „${params.q}" gefunden.` : "Noch keine kommenden Termine."}
              href={q ? undefined : "/admin/termine/neu"}
              cta={q ? undefined : "Leg den ersten an"}
            />
          ) : (
            groupByMonth(upcoming).map(([month, list]) => (
              <div key={month}>
                <h2 className="mb-2 font-body text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-gold-deep">
                  {month}
                </h2>
                <div className="divide-y divide-line overflow-hidden rounded-[8px] border border-line bg-surface shadow-sm">
                  {list.map((e) => (
                    <EventRow key={e.id} event={e} isNext={e.id === nextId} />
                  ))}
                </div>
              </div>
            ))
          )}

          {past.length > 0 && (
            <details>
              <summary className="cursor-pointer text-sm font-semibold text-muted transition-colors hover:text-aubergine">
                Vergangene Termine ({past.length})
              </summary>
              <div className="mt-3 divide-y divide-line overflow-hidden rounded-[8px] border border-line bg-surface opacity-75">
                {past.map((e) => (
                  <EventRow key={e.id} event={e} />
                ))}
              </div>
            </details>
          )}
        </div>
      )}

      {/* ── Aktuelles ── */}
      {tab === "aktuelles" && (
        <div className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <SearchBox tab="aktuelles" q={params.q ?? ""} placeholder="Beiträge durchsuchen…" />
            <Link
              href="/admin/aktuelles/neu"
              className="rounded-[3px] bg-aubergine px-4 py-2 text-sm font-semibold text-bg transition-colors hover:bg-aubergine-deep"
            >
              + Neuer Beitrag
            </Link>
          </div>

          {filteredNews.length === 0 ? (
            <EmptyState
              text={q ? `Keine Beiträge für „${params.q}" gefunden.` : "Noch keine Beiträge."}
              href={q ? undefined : "/admin/aktuelles/neu"}
              cta={q ? undefined : "Schreib den ersten"}
            />
          ) : (
            <div className="divide-y divide-line overflow-hidden rounded-[8px] border border-line bg-surface shadow-sm">
              {filteredNews.map((n) => (
                <NewsRow key={n.id} item={n} now={now} />
              ))}
            </div>
          )}
          <p className="text-xs text-muted">
            Die drei neuesten Beiträge erscheinen auch auf der Startseite. Angepinnte stehen oben —
            ohne „Anzeigen bis“-Datum höchstens 30 Tage.
          </p>
        </div>
      )}

      {/* ── Info-Leiste ── */}
      {tab === "leiste" && (
        <div className="rounded-[8px] border border-line bg-surface p-5 shadow-sm sm:p-6">
          <p className="mb-5 text-sm text-muted">
            Die schmale Leiste ganz oben auf der Website. Ohne eigenen Text zeigt sie automatisch den
            nächsten Gottesdienst an — inklusive Hinweis, wenn ein Gottesdienst ausfällt.
          </p>
          <SettingsForm settings={settings} autoParts={barParts(status)} today={warsawDay(now)} />
        </div>
      )}
    </div>
  );
}
