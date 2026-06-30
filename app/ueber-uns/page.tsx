import { ContentPage } from "@/components/content/ContentPage";
import { Ansprechpartner } from "@/components/home/Ansprechpartner";
import { pageMetadata } from "@/lib/content/metadata";

export const generateMetadata = () => pageMetadata("ueber-uns");

export default function Page() {
  return (
    <>
      <ContentPage slug="ueber-uns" />
      <Ansprechpartner />
    </>
  );
}
