import ToolShell from "../../../components/ToolShell";
import RepoHygieneClient from "../../../components/RepoHygieneClient";
import { constructMetadata } from "../../../lib/seo/metadata";
import { getSoftwareAppSchema } from "../../../lib/seo/jsonld";

const description = "Check a file listing for missing README, LICENSE, tests, dependency manifest, or CI config: the hygiene signals a reviewer checks first. Runs in your browser.";

export const metadata = constructMetadata({
  title: "Repo Hygiene Map",
  description,
  path: "/tools/repo-hygiene",
});

export default function RepoHygienePage() {
  const schema = getSoftwareAppSchema({ name: "Repo Hygiene Map", description, path: "/tools/repo-hygiene" });
  return (
    <ToolShell
      eyebrow="Repo Hygiene"
      title="Repo Hygiene Map"
      intro="Paste a file listing, one path per line. It checks for the hygiene signals a reviewer looks for first: README, LICENSE, tests, a recognized dependency manifest, and CI configuration. This is a different job from Repo → Context Pack below, which aggregates file contents for an LLM prompt; this audits hygiene. Nothing is uploaded."
      accent="var(--accent-green)"
      pack="tesserakit-repo"
      packBlurb="The full repo pack also builds a language and layout map and parses every dependency manifest it finds, all offline."
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <RepoHygieneClient />
    </ToolShell>
  );
}
