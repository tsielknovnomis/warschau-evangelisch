import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/content/PageHeader";
import { YouTubeLite } from "@/components/sermons/YouTubeLite";
import { getSermons, getSermonBySlug } from "@/lib/seed/sermons";
import { formatDate } from "@/lib/format";

export function generateStaticParams() {
  return getSermons().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const sermon = getSermonBySlug(slug);
  return { title: sermon ? sermon.title : "Predigt" };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sermon = getSermonBySlug(slug);
  if (!sermon) notFound();

  return (
    <>
      <PageHeader
        title={sermon.title}
        eyebrow={formatDate(sermon.preachedOn)}
        lead={[sermon.scripture, sermon.preacher].filter(Boolean).join(" · ") || undefined}
      />
      <Container width="narrow" className="py-12">
        <YouTubeLite id={sermon.youtubeId} title={sermon.title} />
        {sermon.summary && <p className="mt-6 text-muted">{sermon.summary}</p>}
        <p className="mt-8">
          <Link href="/predigten" className="text-sm font-semibold text-aubergine hover:underline">
            ← Alle Predigten
          </Link>
        </p>
      </Container>
    </>
  );
}
