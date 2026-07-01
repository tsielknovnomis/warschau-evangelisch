import Link from "next/link";
import { getAllEvents } from "@/lib/data/events";
import { deleteEvent } from "@/lib/actions/events";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { formatDate, formatTime } from "@/lib/format";

export default async function TermineList() {
  const events = await getAllEvents();
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-medium text-aubergine">Termine</h1>
        <Link
          href="/admin/termine/neu"
          className="rounded-[3px] bg-aubergine px-4 py-2 text-sm font-semibold text-bg hover:bg-aubergine-deep"
        >
          + Neuer Termin
        </Link>
      </div>
      {events.length === 0 ? (
        <p className="mt-8 text-muted">Noch keine Termine angelegt.</p>
      ) : (
        <div className="mt-6 divide-y divide-line rounded-[6px] border border-line bg-surface">
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
    </div>
  );
}
