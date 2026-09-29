"use client";

import type { ChurchEvent } from "@/lib/types";
import { EventCard } from "@/components/events/EventCard";
import { ShowMore } from "@/components/ui/ShowMore";
import { isSummer, relevantEvents } from "@/lib/service-status";
import { siteConfig } from "@/lib/site-config";
import { useNow } from "@/lib/use-now";

/** Upcoming services, re-filtered with the visitor's clock (cached pages stay correct). */
export function UpcomingEventList({ events, serverNow }: { events: ChurchEvent[]; serverNow: number }) {
  const now = useNow(serverNow);
  const upcoming = relevantEvents(events, now);

  if (upcoming.length === 0) {
    return (
      <p className="text-muted">
        {isSummer(now) ? "Zurzeit ist Sommerpause. " : ""}
        Die nächsten Termine geben wir bald bekannt. Aktuelle Infos findest du in unserer{" "}
        <a
          href={siteConfig.social.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-aubergine underline decoration-gold/60 underline-offset-2 hover:text-gold-deep"
        >
          WhatsApp-Gruppe
        </a>
        .
      </p>
    );
  }

  const highlightId = upcoming.find((e) => !e.cancelled)?.id;
  return (
    <ShowMore initialCount={3} moreLabel="Alle Termine anzeigen ({n} weitere)">
      {upcoming.map((e) => (
        <EventCard key={e.id} event={e} highlight={e.id === highlightId} />
      ))}
    </ShowMore>
  );
}
