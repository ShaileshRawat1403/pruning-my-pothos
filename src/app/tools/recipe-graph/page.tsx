import ToolShell from "../../../components/ToolShell";
import RecipeGraphClient from "../../../components/RecipeGraphClient";
import { constructMetadata } from "../../../lib/seo/metadata";
import { getSoftwareAppSchema } from "../../../lib/seo/jsonld";

const description = "Validate a multi-step recipe's dependency graph: cycles, dangling references, and unreachable steps, before it ever runs. Runs in your browser.";

export const metadata = constructMetadata({
  title: "Recipe Dependency Graph",
  description,
  path: "/tools/recipe-graph",
});

export default function RecipeGraphPage() {
  const schema = getSoftwareAppSchema({ name: "Recipe Dependency Graph", description, path: "/tools/recipe-graph" });
  return (
    <ToolShell
      eyebrow="Agentic Tooling"
      title="Recipe Dependency Graph"
      intro="Paste a RECIPE.md: frontmatter plus a list of steps. It builds the step dependency graph from explicit needs: and inferred ${steps.X} references, checks for cycles, dangling references, and duplicate ids, and flags steps that produce nothing anyone depends on. Nothing is uploaded."
      accent="var(--accent-amber)"
      pack="tesserakit-recipes"
      packBlurb="The full recipes pack also computes the topological execution order and emits a machine-readable execution plan per recipe."
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <RecipeGraphClient />
    </ToolShell>
  );
}
