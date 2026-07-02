import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { NextServiceBar } from "@/components/layout/NextServiceBar";
import { ConsentProvider } from "@/components/consent/ConsentProvider";
import { CookieBanner } from "@/components/consent/CookieBanner";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { ChurchJsonLd } from "@/components/seo/ChurchJsonLd";
import { getNextEvent } from "@/lib/data/events";
import { getSettings } from "@/lib/data/settings";
import { isOnBreak } from "@/lib/announcement";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [nextEvent, settings] = await Promise.all([getNextEvent(), getSettings()]);
  // Computed on the server so the client never calls Date.now() during render
  // (avoids a hydration mismatch). Frozen at build/revalidate time.
  const onBreak = isOnBreak(nextEvent);

  return (
    <SmoothScroll>
      <ChurchJsonLd />
      <ConsentProvider>
        <NextServiceBar
          event={nextEvent}
          onBreak={onBreak}
          announcement={settings.announcement}
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
