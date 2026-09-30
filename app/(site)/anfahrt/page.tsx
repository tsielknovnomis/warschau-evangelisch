import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/content/PageHeader";
import { MapEmbed } from "@/components/map/MapEmbed";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Anfahrt",
  description:
    "So findest du zu unseren deutschsprachigen Gottesdiensten: ul. Miodowa 21, Warschau — mit Karte, ÖPNV, Fahrrad und Zugang zum Synodalsaal.",
};

const { address } = siteConfig;
// Route by address, not coordinates — Google snaps coordinates to the nearest
// house number (Miodowa 22C across the street) instead of Miodowa 21.
const mapsHref = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  `${address.street}, ${address.postalCode} ${address.city}`,
)}`;

const optionen = [
  {
    title: "Mit öffentlichen Verkehrsmitteln",
    icon: (
      <path d="M4 16V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2v1a1 1 0 0 1-2 0v-1H8v1a1 1 0 0 1-2 0v-1a2 2 0 0 1-2-2Zm2-9v4h12V7H6Zm2 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm10-1a1 1 0 1 0-2 0 1 1 0 0 0 2 0Z" />
    ),
    body: (
      <>
        Am einfachsten mit Bus oder Tram bis in die Altstadt-Nähe.{" "}
        <a
          href="https://jakdojade.pl/?fn=PL.%20ZAMKOWY&tn=Miodowa%2021&td=Deutschsprachiger+Evangelischer+Gottesdienst&tc=52.24788:21.00733&cid=3000&ia=true&h=09:25&locale=de"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-aubergine underline decoration-gold/60 underline-offset-2 hover:text-gold-deep"
        >
          jakdojade.pl
        </a>{" "}
        plant dir die Verbindung — das Ziel ist schon eingetragen, du gibst nur
        deinen Startpunkt ein.
      </>
    ),
  },
  {
    title: "Mit dem Fahrrad",
    icon: (
      <path d="M5.5 20a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Zm13 0a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7ZM5.5 18a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm13 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM14 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm-3.6 2.2 2 2 .1.1H15a1 1 0 0 1 0 2h-2.9l-1.7 3.4-1.8-.9 1.6-3.2-1.5-1.5-2 2-1.4-1.4 2.5-2.5a1 1 0 0 1 1.3-.1Z" />
    ),
    body: (
      <>
        Die{" "}
        <a
          href="https://de.veturilo.waw.pl/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-aubergine underline decoration-gold/60 underline-offset-2 hover:text-gold-deep"
        >
          Veturilo-Station
        </a>{" "}
        „ul. Bonifraterska – Plac Krasińskich“ liegt nur drei Gehminuten vom
        Gottesdienstraum entfernt.
      </>
    ),
  },
  {
    title: "Mit dem Auto",
    icon: (
      <path d="M5 11l1.5-4.5A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.5L19 11m-14 0h14m-14 0a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h1m14-6a2 2 0 0 1 2 2v3a1 1 0 0 1-1 1h-1m-2 0H8m9 0v1a1 1 0 0 0 2 0v-1m-12 0v1a1 1 0 0 1-2 0v-1m3-3h1m8 0h1" />
    ),
    body: (
      <>
        In der Innenstadt sind Parkplätze am Wochenende gratis. Außerdem gibt es
        Parkmöglichkeiten direkt vor dem Gemeinderaum, Zufahrt über die ul.
        Schillera. Mit dem Routenplaner findest du direkt ans Ziel:{" "}
        <a
          href={mapsHref}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-aubergine underline decoration-gold/60 underline-offset-2 hover:text-gold-deep"
        >
          Route öffnen
        </a>
        .
      </>
    ),
  },
];

export default function Page() {
  return (
    <>
      <PageHeader
        title="So findest du uns"
        eyebrow="Anfahrt"
        lead="Wir feiern im Lutherischen Zentrum mitten in der Warschauer Altstadt. Hier findest du Adresse, Karte und alle Wege zu uns."
      />

      <Container className="py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-stretch lg:gap-14">
          {/* Address + access */}
          <div className="space-y-6">
            <div className="rounded-[4px] border border-line bg-surface p-7">
              <p className="font-body text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-gold-deep">
                Adresse
              </p>
              <p className="mt-3 font-display text-2xl leading-snug text-aubergine">
                {address.street}
                <br />
                {address.postalCode} {address.city}
              </p>
              <a
                href={mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 font-body text-sm font-semibold text-aubergine hover:text-gold-deep"
              >
                Route in Google Maps öffnen →
              </a>
            </div>

            {/* Important access note */}
            <div className="rounded-[4px] border border-gold/40 bg-gold-tint/50 p-7">
              <p className="flex items-center gap-2 font-body text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-gold-deep">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v5M12 16h.01" />
                </svg>
                Bitte beachten
              </p>
              <p className="mt-3 leading-relaxed text-ink/85">
                Der Eingang liegt auf der <strong>Rückseite</strong> des Gebäudes —
                du erreichst ihn über die <strong>ul. Leona Schillera</strong>. Keine
                Sorge: Der Weg ist <strong>ausgeschildert</strong> und gut zu finden.
                Der Gottesdienstraum ist im <strong>2. Stock</strong> (Synodalsaal).
              </p>
            </div>
          </div>

          {/* Map — fills the column height so it lines up with the address blocks */}
          <div className="flex flex-col">
            <div className="flex-1 overflow-hidden rounded-lg border border-line">
              <MapEmbed />
            </div>
            <p className="mt-3 text-center font-body text-sm italic text-muted">
              Lutherisches Zentrum · {address.street}
            </p>
          </div>
        </div>

        {/* Travel options */}
        <div className="mt-16">
          <h2 className="font-display text-2xl font-medium text-aubergine">Deine Wege zu uns</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {optionen.map((o) => (
              <div key={o.title} className="rounded-[4px] border border-line bg-surface p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-aubergine-50 text-aubergine">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    {o.icon}
                  </svg>
                </span>
                <h3 className="mt-4 font-display text-lg text-aubergine">{o.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{o.body}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-12">
          <Link href="/gottesdienste" className="font-body font-semibold text-aubergine underline decoration-gold/60 underline-offset-4 hover:text-gold-deep">
            ← Zu den Terminen
          </Link>
        </p>
      </Container>
    </>
  );
}
