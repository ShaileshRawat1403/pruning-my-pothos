import ToolShell from "../../../components/ToolShell";
import GhaLintClient from "../../../components/GhaLintClient";
import { constructMetadata } from "../../../lib/seo/metadata";
import { getSoftwareAppSchema } from "../../../lib/seo/jsonld";

const description = "Lint a GitHub Actions workflow: pull_request_target plus PR-checkout RCE, unpinned actions, write-all permissions, script injection. Runs in your browser.";

export const metadata = constructMetadata({
  title: "GitHub Actions Linter",
  description,
  path: "/tools/gha-lint",
});

export default function GhaLintPage() {
  const schema = getSoftwareAppSchema({ name: "GitHub Actions Linter", description, path: "/tools/gha-lint" });
  return (
    <ToolShell
      eyebrow="Security & Secrets"
      title="GitHub Actions Linter"
      intro="Paste a workflow file. It flags the pull_request_target plus PR-checkout RCE combo, unpinned third-party actions, write-all permissions, and shell injection from github.event inputs. Nothing is uploaded."
      accent="var(--accent-purple)"
      pack="tesserakit-gha"
      packBlurb="The full gha pack audits every workflow for the risky triggers and permissions attackers look for."
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <GhaLintClient />
    </ToolShell>
  );
}
