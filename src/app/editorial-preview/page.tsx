import type { Metadata } from "next";
import EditorialView from "../../components/EditorialView";
import { constructMetadata } from "../../lib/seo/metadata";

export const metadata: Metadata = constructMetadata({
  title: "Editorial Preview",
  path: "/editorial-preview",
  noindex: true,
});

export default function EditorialPreviewPage() {
  return <EditorialView />;
}
