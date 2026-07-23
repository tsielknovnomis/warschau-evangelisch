import Link from "next/link";
import { EventForm } from "@/components/admin/EventForm";
import { createEvent } from "@/lib/actions/events";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ vorlage?: string }>;
}) {
  const { vorlage } = await searchParams;
  return (
    <div>
      <p className="mb-4">
        <Link href="/admin?tab=termine" className="text-sm font-semibold text-aubergine hover:text-gold-deep">← Zur Übersicht</Link>
      </p>
      <h1 className="font-display text-2xl font-medium text-aubergine">Neuer Termin</h1>
      <div className="mt-6">
        <EventForm action={createEvent} initialTemplate={vorlage} />
      </div>
    </div>
  );
}
