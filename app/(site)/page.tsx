import { Hero } from "@/components/content/Hero";
import { WelcomeStory } from "@/components/home/WelcomeStory";
import { GeistlicheHeimat } from "@/components/home/GeistlicheHeimat";
import { GeschichteTeaser } from "@/components/home/GeschichteTeaser";
import { GottesdienstEinladung } from "@/components/home/GottesdienstEinladung";
import { GemeinschaftBleiben } from "@/components/home/GemeinschaftBleiben";
import { AktuellesTeaser } from "@/components/home/AktuellesTeaser";
import { PredigtenTeaser } from "@/components/home/PredigtenTeaser";
import { SpendenBlock } from "@/components/home/SpendenBlock";
import { Wegweiser } from "@/components/home/Wegweiser";

// Homepage as a warm, human storyline that gently links onward to every
// relevant subpage. (Ansprechpartner/people moved to the Über-uns page.)
export default function HomePage() {
  return (
    <>
      <Hero />
      <WelcomeStory />
      <GeistlicheHeimat />
      <GeschichteTeaser />
      <GottesdienstEinladung />
      <GemeinschaftBleiben />
      <AktuellesTeaser />
      <PredigtenTeaser />
      <SpendenBlock />
      <Wegweiser />
    </>
  );
}
