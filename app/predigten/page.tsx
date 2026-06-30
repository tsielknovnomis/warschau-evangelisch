import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/content/PageHeader";
import { SermonCard } from "@/components/sermons/SermonCard";
import { Button } from "@/components/ui/Button";
import { getSermons } from "@/lib/seed/sermons";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Predigten",
  description:
    "Aufgezeichnete Predigten unserer Gemeinde — als Video zum Ansehen, datenschutzfreundlich eingebunden.",
};

export default function Page() {
  const sermons = getSermons();
  return (
    <>
      <PageHeader
        title="Predigten"
        eyebrow="Predigt-Archiv"
        lead="Unsere Gottesdienste werden aufgezeichnet. Hier finden Sie die Predigten zum Nachhören und Nachsehen."
      />
      <Container className="py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sermons.map((s) => (
            <SermonCard key={s.id} sermon={s} />
          ))}
        </div>
        <div className="mt-10">
          <Button href={siteConfig.social.youtube} variant="secondary">
            Zum YouTube-Kanal
          </Button>
        </div>
      </Container>
    </>
  );
}
