import { constructMetadata } from "../../../lib/seo/metadata";
import { getWebPageSchema } from "../../../lib/seo/jsonld";
import PocketFabricStory from "../../../components/pocketfabric/PocketFabricStory";
import "./pocketfabric.css";

const description = "A rooted OnePlus 9 became a Linux host. Explore the migration, the mount failure and the GPU results, with both open reports and their limits.";

export const metadata = constructMetadata({
  title: "PocketFabric: a retired phone, run like a server",
  description,
  path: "/stack/pocketfabric",
});

export default function PocketFabricPage() {
  const schema = getWebPageSchema({
    title: "PocketFabric: a retired phone, run like a server",
    description,
    path: "/stack/pocketfabric",
  });

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <PocketFabricStory />
  </>;
}
