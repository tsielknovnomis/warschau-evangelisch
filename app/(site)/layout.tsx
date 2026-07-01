import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { NextServiceBar } from "@/components/layout/NextServiceBar";
import { ConsentProvider } from "@/components/consent/ConsentProvider";
import { CookieBanner } from "@/components/consent/CookieBanner";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { getNextEvent } from "@/lib/data/events";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const nextEvent = await getNextEvent();
  // Compute "on break" on the server so the client never calls Date.now()
  // during render (avoids a hydration mismatch). Frozen at build/revalidate time.
  const onBreak = nextEvent
    ? (new Date(nextEvent.startsAt).getTime() - Date.now()) / 86_400_000 > 20
    : false;

  return (
    <SmoothScroll>
      <ConsentProvider>
        <NextServiceBar event={nextEvent} onBreak={onBreak} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieBanner />
      </ConsentProvider>
    </SmoothScroll>
  );
}
