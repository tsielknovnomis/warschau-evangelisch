import { siteConfig } from "@/lib/site-config";
import { siteUrl } from "@/lib/site-url";

/**
 * schema.org "Church" structured data for search engines.
 * Only verified facts go in here.
 */
export function ChurchJsonLd() {
  const { address, contact, social } = siteConfig;
  const data = {
    "@context": "https://schema.org",
    "@type": "Church",
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: siteUrl,
    email: contact.general,
    address: {
      "@type": "PostalAddress",
      streetAddress: address.street,
      postalCode: address.postalCode,
      addressLocality: address.city,
      addressCountry: "PL",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: address.coords.lat,
      longitude: address.coords.lng,
    },
    sameAs: [social.youtube, social.facebook, social.instagram],
    description:
      "Deutschsprachige evangelisch-lutherische Gemeinde in Warschau — Gottesdienste auf Deutsch im Lutherischen Zentrum, ul. Miodowa 21.",
    inLanguage: "de",
    isAccessibleForFree: true,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
