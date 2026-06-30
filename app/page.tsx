import { Hero } from "@/components/content/Hero";
import { WelcomeStory } from "@/components/home/WelcomeStory";
import { GemeindeLeben } from "@/components/home/GemeindeLeben";
import { GottesdienstEinladung } from "@/components/home/GottesdienstEinladung";
import { GemeinschaftBleiben } from "@/components/home/GemeinschaftBleiben";
import { PredigtenTeaser } from "@/components/home/PredigtenTeaser";

// Homepage as a warm, human storyline: welcome → who we are → community life →
// the (inviting, not pushy) service info → staying in touch (WhatsApp) → sermons.
// Each section gently links onward to the relevant subpage.
export default function HomePage() {
  return (
    <>
      <Hero />
      <WelcomeStory />
      <GemeindeLeben />
      <GottesdienstEinladung />
      <GemeinschaftBleiben />
      <PredigtenTeaser />
    </>
  );
}
