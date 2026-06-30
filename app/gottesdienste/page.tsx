import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/content/PageHeader";
import { EventCard } from "@/components/events/EventCard";
import { Card } from "@/components/ui/Card";
import { getUpcomingEvents } from "@/lib/seed/events";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Gottesdienste",
  description:
    "Termine unserer deutschsprachigen Gottesdienste in Warschau — Ort, Zeiten und Rhythmus.",
};

export default function Page() {
  const events = getUpcomingEvents();
  return (
    <>
      <PageHeader
        title="Gottesdienste"
        eyebrow="Termine im Überblick"
        lead={`Wir feiern in der Regel in der ${siteConfig.address.street}, 2. Stock (Synodalsaal). ${siteConfig.service.rhythm}`}
      />
      <Container className="py-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_18rem]">
          <div>
            <h2 className="font-serif text-2xl text-aubergine">Kommende Termine</h2>
            <div className="mt-5 space-y-4">
              {events.length > 0 ? (
                events.map((e, i) => <EventCard key={e.id} event={e} highlight={i === 0} />)
              ) : (
                <p className="text-muted">Zurzeit sind keine Termine angekündigt.</p>
              )}
            </div>
          </div>

          <aside className="space-y-5">
            <Card tone="cream">
              <h3 className="font-serif text-lg text-aubergine">Sommerpause</h3>
              <p className="mt-2 text-sm text-muted">{siteConfig.service.summerBreak}</p>
            </Card>
            <Card tone="cream">
              <h3 className="font-serif text-lg text-aubergine">Ort</h3>
              <p className="mt-2 text-sm text-muted">
                {siteConfig.address.street}
                <br />
                {siteConfig.address.postalCode} {siteConfig.address.city}
                <br />
                {siteConfig.address.accessNote}
              </p>
              <a href="/gottesdienste/anfahrt" className="mt-3 inline-block text-sm font-semibold text-aubergine hover:underline">
                Anfahrt &amp; Karte →
              </a>
            </Card>
          </aside>
        </div>
      </Container>
    </>
  );
}
