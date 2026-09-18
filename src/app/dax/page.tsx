import { constructMetadata } from "../../lib/seo/metadata";
import { getWebPageSchema } from "../../lib/seo/jsonld";
import DaxLanding from "../../components/dax/DaxLanding";
import "./dax.css";

export const metadata = constructMetadata({
  title: "DAX — Deterministic runtime contract",
  description:
    "DAX is the governed execution workstation: policy, approvals, replay, and audit around the model. Open source · MIT · v1.4.0.",
  path: "/dax",
});

export default function DaxPage() {
  const schema = getWebPageSchema({
    title: "DAX — Deterministic runtime contract | Pruning My Pothos",
    description:
      "DAX is the governed execution workstation: policy, approvals, replay, and audit around the model. Open source · MIT · v1.4.0.",
    path: "/dax",
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
