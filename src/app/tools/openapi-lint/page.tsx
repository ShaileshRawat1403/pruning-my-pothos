import ToolShell from "../../../components/ToolShell";
import OpenApiLintClient from "../../../components/OpenApiLintClient";
import { constructMetadata } from "../../../lib/seo/metadata";
import { getSoftwareAppSchema } from "../../../lib/seo/jsonld";

const description = "Paste an OpenAPI spec and get an endpoint catalog plus hygiene findings: missing operationIds, undocumented ops, missing responses. Runs in your browser.";

export const metadata = constructMetadata({
  title: "OpenAPI Linter",
  description,
  path: "/tools/openapi-lint",
});

export default function OpenApiLintPage() {
  const schema = getSoftwareAppSchema({ name: "OpenAPI Linter", description, path: "/tools/openapi-lint" });
  return (
    <ToolShell
      eyebrow="APIs & Contracts"
      title="OpenAPI Linter"
      intro="Paste an OpenAPI or Swagger document as JSON. It catalogs every operation and flags the gaps that trip up generated clients and reviewers: missing or duplicate operationIds, undocumented endpoints, and operations with no success response. Nothing is uploaded."
      accent="var(--accent-purple)"
      pack="tesserakit-openapi"
      packBlurb="The full openapi pack lints a spec into an endpoint catalog and a set of findings."
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <OpenApiLintClient />
    </ToolShell>
  );
}
