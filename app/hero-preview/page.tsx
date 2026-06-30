import { HeroA } from "@/components/content/heroes/HeroA";
import { HeroB } from "@/components/content/heroes/HeroB";
import { HeroC } from "@/components/content/heroes/HeroC";
import { HeroD } from "@/components/content/heroes/HeroD";

// Internal preview page to compare hero variants. Not linked in nav.
export const metadata = { robots: { index: false } };

const heroes: Record<string, () => React.ReactElement> = {
  a: HeroA,
  b: HeroB,
  c: HeroC,
  d: HeroD,
};

export default async function HeroPreviewPage({
  searchParams,
}: {
  searchParams: Promise<{ v?: string }>;
}) {
  const { v } = await searchParams;
  if (v && heroes[v]) {
    const Hero = heroes[v];
    return <Hero />;
  }
  return (
    <div>
      <HeroA />
      <HeroB />
      <HeroC />
      <HeroD />
    </div>
  );
}
