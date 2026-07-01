import Link from "next/link";
import { getUpcomingEvents } from "@/lib/data/events";
import { getNews } from "@/lib/data/news";

function Card({ label, count, href }: { label: string; count: number; href: string }) {
  return (
    <div className="rounded-[6px] border border-line bg-surface p-6">
      <p className="text-sm text-muted">{label}</p>
      <p className="mt-1 font-display text-3xl text-aubergine">{count}</p>
      <div className="mt-4 flex gap-4 text-sm font-semibold">
        <Link href={href} className="text-aubergine hover:text-gold-deep">Verwalten →</Link>
        <Link href={`${href}/neu`} className="text-aubergine hover:text-gold-deep">+ Neu</Link>
      </div>
    </div>
  );
}

export default async function AdminHome() {
  const [events, news] = await Promise.all([getUpcomingEvents(), getNews()]);
  return (
    <div>
      <h1 className="font-display text-2xl font-medium text-aubergine">Übersicht</h1>
      <p className="mt-1 text-sm text-muted">Hier pflegst du Termine und Aktuelles. Änderungen sind sofort auf der Website sichtbar.</p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Card label="Kommende Termine" count={events.length} href="/admin/termine" />
        <Card label="Aktuelles-Beiträge" count={news.length} href="/admin/aktuelles" />
      </div>
    </div>
  );
}
