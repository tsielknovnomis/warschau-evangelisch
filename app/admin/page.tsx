import Link from "next/link";
import { getAllEvents, getNextEvent } from "@/lib/data/events";
import { getNews } from "@/lib/data/news";
import { getSettings } from "@/lib/data/settings";
import { deleteEvent } from "@/lib/actions/events";
import { deleteNews } from "@/lib/actions/news";
import { autoBarParts, isOnBreak } from "@/lib/announcement";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { SettingsForm } from "@/components/admin/SettingsForm";
import { formatDate, formatShortDate, formatTime } from "@/lib/format";

function SectionHeader({
  id,
  title,
  newHref,
  newLabel,
}: {
  id: string;
  title: string;
  newHref?: string;
  newLabel?: string;
}) {
  return (
    <div id={id} className="flex scroll-mt-20 items-center justify-between">
      <h2 className="font-display text-2xl font-medium text-aubergine">{title}</h2>
      {newHref && (
        <Link
          href={newHref}
          className="rounded-[3px] bg-aubergine px-4 py-2 text-sm font-semibold text-bg hover:bg-aubergine-deep"
        >
          {newLabel}
        </Link>
      )}
    </div>
  );
}

export default async function AdminHome() {
  const [events, news, settings, nextEvent] = await Promise.all([
    getAllEvents(),
    getNews(),
    getSettings(),
    getNextEvent(),
  ]);
  const autoParts = autoBarParts(nextEvent, isOnBreak(nextEvent));

  return (
    <div className="space-y-14">
      {/* Termine */}
      <section>
        <SectionHeader id="termine" title="Termine" newHref="/admin/termine/neu" newLabel="+ Neuer Termin" />
        {events.length === 0 ? (
          <p className="mt-6 text-muted">Noch keine Termine angelegt.</p>
        ) : (
          <div className="mt-5 divide-y divide-line rounded-[6px] border border-line bg-surface">
            {events.map((e) => (
              <div key={e.id} className="flex items-center justify-between gap-4 px-5 py-3">
                <div>
                  <p className="font-display text-lg text-aubergine">{e.title}</p>
                  <p className="text-sm text-muted">
                    {formatDate(e.startsAt)} · {formatTime(e.startsAt)}
                    {e.isSpecial && " · besonderer Gottesdienst"}
                  </p>
                </div>
                <div className="flex shrink-0 gap-4">
                  <Link href={`/admin/termine/${e.id}`} className="text-sm font-semibold text-aubergine hover:text-gold-deep">
                    Bearbeiten
                  </Link>
                  <DeleteButton action={deleteEvent.bind(null, e.id)} />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Aktuelles */}
      <section>
        <SectionHeader id="aktuelles" title="Aktuelles" newHref="/admin/aktuelles/neu" newLabel="+ Neuer Beitrag" />
        {news.length === 0 ? (
          <p className="mt-6 text-muted">Noch keine Beiträge angelegt.</p>
        ) : (
          <div className="mt-5 divide-y divide-line rounded-[6px] border border-line bg-surface">
            {news.map((n) => (
              <div key={n.id} className="flex items-center justify-between gap-4 px-5 py-3">
                <div>
                  <p className="font-display text-lg text-aubergine">
                    {n.title}
                    {n.pinned && <span className="ml-2 text-xs font-semibold text-gold-deep">angepinnt</span>}
                  </p>
                  <p className="text-sm text-muted">{formatShortDate(n.publishedAt)}</p>
                </div>
                <div className="flex shrink-0 gap-4">
                  <Link href={`/admin/aktuelles/${n.id}`} className="text-sm font-semibold text-aubergine hover:text-gold-deep">
                    Bearbeiten
                  </Link>
                  <DeleteButton action={deleteNews.bind(null, n.id, n.slug)} />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Info-Leiste */}
      <section>
        <SectionHeader id="leiste" title="Info-Leiste" />
        <p className="mt-1 text-sm text-muted">Die schmale Leiste ganz oben über der Navigation.</p>
        <div className="mt-5">
          <SettingsForm settings={settings} autoParts={autoParts} />
        </div>
      </section>
    </div>
  );
}
