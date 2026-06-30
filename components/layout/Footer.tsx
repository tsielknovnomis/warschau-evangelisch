import Link from "next/link";
import { Lutherrose } from "@/components/content/Lutherrose";
import { siteConfig } from "@/lib/site-config";
import { mainNav, footerNav, legalNav } from "@/lib/nav";

const socialIcons: Record<string, string> = {
  youtube:
    "M23 7.5a3 3 0 0 0-2.1-2.1C19 5 12 5 12 5s-7 0-8.9.4A3 3 0 0 0 1 7.5 31 31 0 0 0 .6 12 31 31 0 0 0 1 16.5a3 3 0 0 0 2.1 2.1C5 19 12 19 12 19s7 0 8.9-.4a3 3 0 0 0 2.1-2.1A31 31 0 0 0 23.4 12 31 31 0 0 0 23 7.5ZM9.8 15.3V8.7l5.7 3.3Z",
  instagram:
    "M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.1.4.3 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.1-1 .3-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.4a3.7 3.7 0 0 1-1.4-.9 3.7 3.7 0 0 1-.9-1.4c-.1-.4-.3-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.1 1-.3 2.2-.4C8.4 2.2 8.8 2.2 12 2.2Zm0 3.2A6.6 6.6 0 1 0 18.6 12 6.6 6.6 0 0 0 12 5.4Zm0 10.9A4.3 4.3 0 1 1 16.3 12 4.3 4.3 0 0 1 12 16.3Zm6.8-11.2a1.5 1.5 0 1 1-1.5-1.5 1.5 1.5 0 0 1 1.5 1.5Z",
  facebook:
    "M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12Z",
};

export function Footer() {
  const year = new Date().getFullYear();
  const { address, contact, social } = siteConfig;
  const socials = [
    { key: "youtube", href: social.youtube, label: "YouTube" },
    { key: "instagram", href: social.instagram, label: "Instagram" },
    { key: "facebook", href: social.facebook, label: "Facebook" },
  ];

  return (
    <footer className="mt-24 border-t border-line bg-parchment-deep">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand + social */}
          <div>
            <div className="flex items-center gap-3">
              <Lutherrose className="h-12 w-12" />
              <span className="font-display text-lg leading-tight text-aubergine">
                Evangelisch
                <br />
                in Warschau
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-muted">
              Deutschsprachige evangelisch-lutherische Gemeinde unter dem Dach der
              Evangelisch-Augsburgischen Kirche in Polen.
            </p>
            <div className="mt-5 flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.key}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="rounded-full border border-line p-2 text-aubergine transition-colors hover:border-aubergine hover:bg-aubergine hover:text-white"
                >
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
                    <path d={socialIcons[s.key]} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Sitemap */}
          <nav aria-label="Seitenübersicht">
            <h3 className="font-body text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-gold-deep">
              Seitenübersicht
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {[...mainNav.slice(1), ...footerNav].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-ink/80 transition-colors hover:text-aubergine">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="font-body text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-gold-deep">
              Kontakt
            </h3>
            <address className="mt-4 space-y-2 text-sm not-italic text-ink/80">
              <p>
                {address.street}
                <br />
                {address.postalCode} {address.city}
              </p>
              <p>
                <a href={`mailto:${contact.general}`} className="transition-colors hover:text-aubergine">
                  {contact.general}
                </a>
              </p>
              <p>Gottesdienst: {siteConfig.service.time}, zweiter &amp; vierter Sonntag im Monat</p>
            </address>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.legalNameDe}
            <span className="mx-1.5">·</span>
            KRS {siteConfig.krs}
          </p>
          <div className="flex gap-4">
            {legalNav.map((item) => (
              <Link key={item.href} href={item.href} className="transition-colors hover:text-aubergine">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
