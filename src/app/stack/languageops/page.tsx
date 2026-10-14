import { constructMetadata } from "../../../lib/seo/metadata";
import { getSoftwareAppSchema } from "../../../lib/seo/jsonld";
import LanguageOpsLanding from "../../../components/languageops/LanguageOpsLanding";
import "../dax/dax.css";
import "./languageops.css";

const DESCRIPTION =
  "LanguageOps finds AI-associated writing patterns without a model, rewrites under a contract that keeps facts and deliberate devices, and checks the result.";

export const metadata = constructMetadata({
  title: "LanguageOps: Governed Writing Refinement",
  description: DESCRIPTION,
  path: "/stack/languageops",
});

export default function LanguageOpsPage() {
  const schema = getSoftwareAppSchema({
    name: "LanguageOps",
    description: DESCRIPTION,
    path: "/stack/languageops",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <LanguageOpsLanding />
    </>
  );
}
