import { constructMetadata } from "../../../lib/seo/metadata";
import { getWebPageSchema } from "../../../lib/seo/jsonld";
import DaxLanding from "../../../components/dax/DaxLanding";
import "./dax.css";

export const metadata = constructMetadata({
  title: "DAX: Governed Execution Workstation",
  description:
    "DAX puts policy, approvals, replay and audit around a coding agent's run: risky actions resolve to allow, ask or deny before anything changes. Open source, MIT.",
  path: "/stack/dax",
});

export default function DaxPage() {
  const schema = getWebPageSchema({
    title: "DAX: Governed Execution Workstation | Pruning My Pothos",
    description:
      "DAX puts policy, approvals, replay and audit around a coding agent's run: risky actions resolve to allow, ask or deny before anything changes. Open source, MIT.",
    path: "/stack/dax",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <DaxLanding />
    </>
  );
}
