import Link from "next/link";
import { notFound } from "next/navigation";
import { NewsForm } from "@/components/admin/NewsForm";
import { getNewsById } from "@/lib/data/news";
import { updateNews } from "@/lib/actions/news";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await getNewsById(id);
  if (!item) notFound();
  return (
    <div>
      <p className="mb-4">
        <Link href="/admin?tab=aktuelles" className="text-sm font-semibold text-aubergine hover:text-gold-deep">← Zur Übersicht</Link>
      </p>
      <h1 className="font-display text-2xl font-medium text-aubergine">Beitrag bearbeiten</h1>
      <div className="mt-6">
        <NewsForm item={item} action={updateNews.bind(null, id, item.slug)} />
      </div>
    </div>
  );
}
