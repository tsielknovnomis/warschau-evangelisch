import Link from "next/link";
import { NewsForm } from "@/components/admin/NewsForm";
import { createNews } from "@/lib/actions/news";

export default function Page() {
  return (
    <div>
      <p className="mb-4">
        <Link href="/admin" className="text-sm font-semibold text-aubergine hover:text-gold-deep">← Zur Übersicht</Link>
      </p>
      <h1 className="font-display text-2xl font-medium text-aubergine">Neuer Beitrag</h1>
      <div className="mt-6">
        <NewsForm action={createNews} />
      </div>
    </div>
  );
}
