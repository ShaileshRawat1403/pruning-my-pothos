import ToolShell from "../../../components/ToolShell";
import SkillCatalogClient from "../../../components/SkillCatalogClient";
import { constructMetadata } from "../../../lib/seo/metadata";
import { getSoftwareAppSchema } from "../../../lib/seo/jsonld";

const description = "Validate SKILL.md files in the Anthropic Skills convention: missing triggers, name collisions and overlapping descriptions that misfire. Runs in your browser.";

export const metadata = constructMetadata({
  title: "Skill Catalog Validator",
  description,
  path: "/tools/skill-catalog",
});

export default function SkillCatalogPage() {
  const schema = getSoftwareAppSchema({ name: "Skill Catalog Validator", description, path: "/tools/skill-catalog" });
  return (
    <ToolShell
      eyebrow="Agentic Tooling"
      title="Skill Catalog Validator"
      intro="Paste one SKILL.md, or several separated by a line of ===. It checks frontmatter completeness, flags descriptions that don't name a trigger, and (with more than one skill pasted) flags name collisions and description overlap high enough to cause an agent to pick the wrong skill. Nothing is uploaded."
      accent="var(--accent-cyan)"
      pack="tesserakit-skills"
      packBlurb="The full skills pack catalogs a whole skills/ directory and extracts each skill's bash, MCP, and skill-to-skill dependencies too."
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <SkillCatalogClient />
    </ToolShell>
  );
}
