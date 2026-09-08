import type { Metadata } from "next";
import EditorialView from "../components/EditorialView";
import { constructMetadata } from "../lib/seo/metadata";

export const metadata: Metadata = constructMetadata({
  path: "/",
});

export default function HomePage() {
  return <EditorialView />;
}
