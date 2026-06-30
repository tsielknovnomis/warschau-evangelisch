import { Container } from "@/components/ui/Container";
import { Prose } from "@/components/ui/Prose";
import { PageHeader } from "@/components/content/PageHeader";
import { Markdown } from "@/components/content/Markdown";
import { AnfahrtMap } from "@/components/map/AnfahrtMap";
import { getPage } from "@/lib/content/page";
import { pageMetadata } from "@/lib/content/metadata";

export const generateMetadata = () => pageMetadata("anfahrt");

export default function Page() {
  const page = getPage("anfahrt");
  return (
    <>
      <PageHeader title={page.title} lead={page.lead} />
      <Container className="py-12">
        <div className="grid gap-10 lg:grid-cols-2">
          <Prose>
            <Markdown>{page.body}</Markdown>
          </Prose>
          <div>
            <AnfahrtMap />
          </div>
        </div>
      </Container>
    </>
  );
}
