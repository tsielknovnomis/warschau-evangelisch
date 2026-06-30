import { Hero } from "@/components/content/Hero";
import { WelcomeStory } from "@/components/home/WelcomeStory";
import { GemeindeLeben } from "@/components/home/GemeindeLeben";
import { GeschichteTeaser } from "@/components/home/GeschichteTeaser";
import { GottesdienstEinladung } from "@/components/home/GottesdienstEinladung";
import { Ansprechpartner } from "@/components/home/Ansprechpartner";
import { GemeinschaftBleiben } from "@/components/home/GemeinschaftBleiben";
import { AktuellesTeaser } from "@/components/home/AktuellesTeaser";
import { PredigtenTeaser } from "@/components/home/PredigtenTeaser";
import { SpendenBlock } from "@/components/home/SpendenBlock";
import { Wegweiser } from "@/components/home/Wegweiser";

// Homepage as a warm, human storyline that gently links onward to every
// relevant subpage: welcome → community life → history → service invitation →
// the people → staying in touch → news → sermons → support → signposts.
export default function HomePage() {
  return (
    <>
      <Hero />
      <WelcomeStory />
      <GemeindeLeben />
      <GeschichteTeaser />
      <GottesdienstEinladung />
      <Ansprechpartner />
      <GemeinschaftBleiben />
      <AktuellesTeaser />
      <PredigtenTeaser />
      <SpendenBlock />
      <Wegweiser />
    </>
  );
}
