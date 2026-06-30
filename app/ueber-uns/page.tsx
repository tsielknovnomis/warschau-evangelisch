import { ContentPage } from "@/components/content/ContentPage";
import { pageMetadata } from "@/lib/content/metadata";

export const generateMetadata = () => pageMetadata("ueber-uns");

export default function Page() {
  return <ContentPage slug="ueber-uns" />;
}
