import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Prose } from "@/components/ui/Prose";
import { PageHeader } from "@/components/content/PageHeader";
import { Markdown } from "@/components/content/Markdown";
import { getNews, getNewsBySlug } from "@/lib/data/news";
import { formatDate } from "@/lib/format";

export async function generateStaticParams() {
  return (await getNews()).map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await getNewsBySlug(slug);
  return { title: item ? item.title : "Aktuelles", description: item?.excerpt };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getNewsBySlug(slug);
  if (!item) notFound();

  return (
    <>
      <PageHeader title={item.title} eyebrow={formatDate(item.publishedAt)} />
      <Container width="narrow" className="py-12">
        <Prose>
          <Markdown>{item.body}</Markdown>
        </Prose>
        <p className="mt-8">
          <Link href="/gottesdienste#aktuelles" className="text-sm font-semibold text-aubergine hover:underline">
            ← Alle Beiträge
          </Link>
        </p>
      </Container>
    </>
  );
}
