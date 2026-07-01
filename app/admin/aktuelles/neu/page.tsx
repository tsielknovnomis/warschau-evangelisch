import { NewsForm } from "@/components/admin/NewsForm";
import { createNews } from "@/lib/actions/news";

export default function Page() {
  return (
    <div>
      <h1 className="font-display text-2xl font-medium text-aubergine">Neuer Beitrag</h1>
      <div className="mt-6">
        <NewsForm action={createNews} />
      </div>
    </div>
  );
}
