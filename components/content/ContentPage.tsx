import { Container } from "@/components/ui/Container";
import { Prose } from "@/components/ui/Prose";
import { PageHeader } from "@/components/content/PageHeader";
import { Markdown } from "@/components/content/Markdown";
import { getPage } from "@/lib/content/page";

/**
 * Renders a static content page from content/pages/de/<slug>.md.
 */
export function ContentPage({ slug }: { slug: string }) {
  const page = getPage(slug);
  return (
    <>
      <PageHeader title={page.title} lead={page.lead} />
      <Container className="py-12">
        <Prose>
          <Markdown>{page.body}</Markdown>
        </Prose>
      </Container>
    </>
  );
}
