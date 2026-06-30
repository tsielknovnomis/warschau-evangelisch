import { HeroV1 } from "@/components/content/heroes/HeroV1";
import { HeroV2 } from "@/components/content/heroes/HeroV2";
import { HeroV3 } from "@/components/content/heroes/HeroV3";
import { HeroV4 } from "@/components/content/heroes/HeroV4";

// Internal preview to compare hero variants. Not linked in nav.
export const metadata = { robots: { index: false } };

const heroes: Record<string, () => React.ReactElement> = {
  "1": HeroV1,
  "2": HeroV2,
  "3": HeroV3,
  "4": HeroV4,
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
      <HeroV1 />
      <HeroV2 />
      <HeroV3 />
      <HeroV4 />
    </div>
  );
}
