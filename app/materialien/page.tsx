import { ContentPage } from "@/components/content/ContentPage";
import { pageMetadata } from "@/lib/content/metadata";

export const generateMetadata = () => pageMetadata("materialien");

export default function Page() {
  return <ContentPage slug="materialien" />;
}
