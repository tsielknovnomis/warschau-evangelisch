import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { NextServiceBar } from "@/components/layout/NextServiceBar";
import { ConsentProvider } from "@/components/consent/ConsentProvider";
import { CookieBanner } from "@/components/consent/CookieBanner";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { ChurchJsonLd } from "@/components/seo/ChurchJsonLd";
import { getAllEvents } from "@/lib/data/events";
import { getSettings } from "@/lib/data/settings";
import { relevantEvents } from "@/lib/service-status";
import { currentTime } from "@/lib/clock";

// Public pages are static but regenerate at most hourly (ISR), so anything
// derived from "now" can never freeze. Time-critical UI additionally
// re-checks with the visitor's clock (see lib/use-now.ts).
export const revalidate = 3600;

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [events, settings] = await Promise.all([getAllEvents(), getSettings()]);
  const serverNow = currentTime();

  return (
    <SmoothScroll>
      <ChurchJsonLd />
      <ConsentProvider>
        <NextServiceBar
          events={relevantEvents(events, serverNow).slice(0, 8)}
          serverNow={serverNow}
          announcement={settings.announcement}
          announcementUntil={settings.announcementUntil}
          barHidden={settings.barHidden}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieBanner />
      </ConsentProvider>
    </SmoothScroll>
  );
}
