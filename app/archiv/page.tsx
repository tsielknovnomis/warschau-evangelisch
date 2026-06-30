import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/content/PageHeader";
import { ArchiveList } from "@/components/archive/ArchiveList";
import { archiveIndex } from "@/lib/seed/archive-index";

export const metadata: Metadata = {
  title: "Archiv",
  description:
    "Chronik unserer Gemeinde — Gottesdienste, Predigten und Beiträge aus den Jahren 2015 bis 2021.",
};

export default function Page() {
  return (
    <>
      <PageHeader
        title="Archiv"
        eyebrow="Gemeindechronik"
        lead="Beiträge und Ankündigungen aus den Jahren 2015 bis 2021 — die Chronik unserer Gemeinde."
      />
      <Container className="py-12">
        <p className="mb-8 rounded-md border border-line bg-cream px-4 py-3 text-sm text-muted">
          Die vollständigen Beitragstexte werden derzeit überführt. Bis dahin finden Sie
          hier die durchsuchbare Übersicht aller Beiträge.
        </p>
        <ArchiveList entries={archiveIndex} />
      </Container>
    </>
  );
}
