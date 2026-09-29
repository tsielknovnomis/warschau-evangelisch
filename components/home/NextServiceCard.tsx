"use client";

import type { ChurchEvent } from "@/lib/types";
import { serviceDay, serviceStatus } from "@/lib/service-status";
import { siteConfig } from "@/lib/site-config";
import { formatDate, formatTime } from "@/lib/format";
import { useNow } from "@/lib/use-now";

const kickerCls =
  "font-body text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-gold-deep";

/** "Der nächste Gottesdienst" card — re-evaluated with the visitor's clock. */
export function NextServiceCard({ events, serverNow }: { events: ChurchEvent[]; serverNow: number }) {
  const status = serviceStatus(events, useNow(serverNow));

  const cancelledNote = status.cancelled && (
    <p className="mt-4 rounded-[3px] bg-red-50 px-3 py-2 text-sm text-red-900">
      Am {serviceDay(status.cancelled)} entfällt der Gottesdienst.
      {status.cancelled.cancelNote ? ` ${status.cancelled.cancelNote}` : ""}
    </p>
  );

  if (status.kind === "none") {
    return (
      <div className="border-l-[3px] border-gold p-7 sm:p-9">
        <p className={kickerCls}>{status.summer ? "Sommerpause" : "Gottesdienste"}</p>
        <p className="mt-3 leading-relaxed text-muted">
          Die nächsten Termine geben wir bald bekannt — hier auf der Website und in unserer{" "}
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
        {cancelledNote}
      </div>
    );
  }

  const { next, today } = status;
  return (
    <div className="border-l-[3px] border-gold p-7 sm:p-9">
      <p className={kickerCls}>{today ? "Heute" : "Der nächste Gottesdienst"}</p>
      <p className="mt-3 font-display text-2xl leading-snug text-aubergine">
        {formatDate(next.startsAt)}
      </p>
      <p className="mt-1 text-lg text-ink/80">
        {formatTime(next.startsAt)} · {siteConfig.address.street}
      </p>
      <p className="mt-3 text-muted">{next.title}</p>
      {cancelledNote}
    </div>
  );
}
