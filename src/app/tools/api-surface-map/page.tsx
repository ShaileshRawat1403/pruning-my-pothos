import ToolShell from "../../../components/ToolShell";
import ApiSurfaceMapClient from "../../../components/ApiSurfaceMapClient";
import { constructMetadata } from "../../../lib/seo/metadata";
import { getSoftwareAppSchema } from "../../../lib/seo/jsonld";

const description = "Paste curl commands or a raw HTTP request and get a clean endpoint map with methods, hosts, and params. Auth headers are redacted. Runs in your browser.";

export const metadata = constructMetadata({
  title: "API Surface Mapper",
  description,
  path: "/tools/api-surface-map",
});

export default function ApiSurfaceMapPage() {
  const schema = getSoftwareAppSchema({ name: "API Surface Mapper", description, path: "/tools/api-surface-map" });
  return (
    <ToolShell
      eyebrow="APIs & Traffic"
      title="API Surface Mapper"
      intro="Paste curl commands or a raw HTTP trace. It maps every request into a tidy surface of methods, hosts, and paths, and pulls tokens, auth headers, and secret query params out of the way first. Nothing is uploaded."
      accent="var(--accent-blue)"
      pack="tesserakit-api"
      packBlurb="The full api pack parses curl and HTTP traces into a validated, secret-redacted API surface map."
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ApiSurfaceMapClient />
    </ToolShell>
  );
}
