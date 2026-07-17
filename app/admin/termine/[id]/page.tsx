import Link from "next/link";
import { notFound } from "next/navigation";
import { EventForm } from "@/components/admin/EventForm";
import { InviteText } from "@/components/admin/InviteText";
import { getEventById } from "@/lib/data/events";
import { updateEvent } from "@/lib/actions/events";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = await getEventById(id);
  if (!event) notFound();
  return (
    <div>
      <p className="mb-4">
        <Link href="/admin?tab=termine" className="text-sm font-semibold text-aubergine hover:text-gold-deep">← Zur Übersicht</Link>
      </p>
      <h1 className="font-display text-2xl font-medium text-aubergine">Termin bearbeiten</h1>
      <div className="mt-6">
        <EventForm event={event} action={updateEvent.bind(null, id)} />
      </div>
      <InviteText event={event} />
    </div>
  );
}
