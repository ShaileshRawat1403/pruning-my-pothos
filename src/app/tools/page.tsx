import SpotlightCard from "../../components/SpotlightCard";
import PlateHero from "../../components/PlateHero";
import SceneFigure from "../../components/SceneFigure";
import { constructMetadata } from "../../lib/seo/metadata";
import { getWebPageSchema } from "../../lib/seo/jsonld";

const HERO_LINES = [
  "I wrote programs in string and pegs, and the little theatre moved itself. No electricity required.",
  "A door that opens on its own is only a sequence of causes, patiently arranged.",
  "They called it magic. I called it a list of steps that happened to be brass.",
  "Give a machine one clear instruction and it will repeat it forever, faithfully, stupidly.",
  "I automated the temple so the priests could seem divine. The oldest use of a good demo.",
];

export const metadata = constructMetadata({
  title: "ToolSmith Playgrounds",
  description: "Stateless, browser-native utilities for anyone who builds with intent. Structure context, evaluate loops, and compile workflow blueprints.",
  path: "/tools"
});

export default function ToolsIndexPage() {
  const schema = getWebPageSchema({
    title: "ToolSmith Playgrounds | Pruning My Pothos",
    description: "Stateless, browser-native utilities for anyone who builds with intent. Structure context, evaluate loops, and compile workflow blueprints.",
    path: "/tools"
  });

  const toolItems = [
    {
      title: "Secret Shape Scanner",
      description: "Detect secrets by shape, not just by key name, and redact them in place. A browser preview of the Tessera config pack.",
      path: "/tools/secret-scanner",
      status: "Live · Tessera",
      accent: "var(--accent-green)",
      pypiName: "tesserakit-config"
    },
    {
      title: "SQL Migration Safety",
      description: "Catch DELETE and UPDATE without WHERE, DROP without IF EXISTS, and unsafe NOT NULL columns. Preview of the Tessera sql pack.",
      path: "/tools/sql-safety",
      status: "Live · Tessera",
      accent: "var(--accent-amber)",
      pypiName: "tesserakit-sql"
    },
    {
      title: "GitHub Actions Linter",
      description: "Find the pull_request_target RCE combo, unpinned actions, write-all tokens, and script injection. Preview of the Tessera gha pack.",
      path: "/tools/gha-lint",
      status: "Live · Tessera",
      accent: "var(--accent-purple)",
      pypiName: "tesserakit-gha"
    },
    {
      title: "API Surface Mapper",
      description: "Map curl commands and HTTP traces into a clean endpoint surface, with tokens and auth headers redacted first. Preview of the Tessera api pack.",
      path: "/tools/api-surface-map",
      status: "Live · Tessera",
      accent: "var(--accent-blue)",
      pypiName: "tesserakit-api"
    },
    {
      title: "OpenAPI Linter",
      description: "Catalog every operation and catch missing or duplicate operationIds, undocumented endpoints, and missing success responses. Pairs with API Surface Mapper: curl traces in, spec quality out. Preview of the Tessera openapi pack.",
      path: "/tools/openapi-lint",
      status: "Live · Tessera",
      accent: "var(--accent-cyan)",
      pypiName: "tesserakit-openapi"
    },
    {
      title: "Dependency Auditor",
      description: "Flag unpinned versions, open ranges, duplicates, and version conflicts across pip, npm, cargo, and go manifests in one report. Preview of the Tessera deps pack.",
      path: "/tools/dependency-audit",
      status: "Live · Tessera",
      accent: "var(--accent-pink)",
      pypiName: "tesserakit-deps"
    },
    {
      title: "Workflow Governance Check",
      description: "Validate a JobPack workflow's review gates, recursion fence, and evidence policy against Tessera's governance schema, the same TOCTOU and promotion-without-review checks a real deploy gate would run.",
      path: "/tools/workflow-governance",
      status: "Live · Tessera",
      accent: "var(--accent-purple)",
      pypiName: "tesserakit-workflow"
    },
    {
      title: "Skill Catalog Validator",
      description: "Catalog SKILL.md files and catch missing triggers, name collisions, and description overlap that would cause a silent misfire under an agent.",
      path: "/tools/skill-catalog",
      status: "Live · Tessera",
      accent: "var(--accent-cyan)",
      pypiName: "tesserakit-skills"
    },
    {
      title: "Recipe Dependency Graph",
      description: "Validate a multi-step recipe's dependency graph for cycles, dangling references, and unreachable steps, then compute the topological execution order.",
      path: "/tools/recipe-graph",
      status: "Live · Tessera",
      accent: "var(--accent-amber)",
      pypiName: "tesserakit-recipes"
    },
    {
      title: "Repo Hygiene Map",
      description: "Map a file listing into a language breakdown and flag missing README, LICENSE, tests, or CI config. Distinct from Repo ➔ Context Pack below, this audits hygiene rather than aggregating content.",
      path: "/tools/repo-hygiene",
      status: "Live · Tessera",
      accent: "var(--accent-green)",
      pypiName: "tesserakit-repo"
    },
    {
      title: "Terminology Drift",
      description: "Extracts a project's vocabulary from its docs and flags terminology drift. Ships as a CLI pack, not a browser demo.",
      path: "https://pypi.org/project/tesserakit-glossary/",
      status: "PyPI · v0.4.0",
      accent: "var(--accent-blue)",
      pypiName: "tesserakit-glossary",
      external: true
    },
    {
      title: "Prompt Pack Validator",
      description: "Compiles a messy prompt collection into validated, reviewable assets. Ships as a CLI pack, not a browser demo.",
      path: "https://pypi.org/project/tesserakit-prompts/",
      status: "PyPI · v0.4.0",
      accent: "var(--accent-pink)",
      pypiName: "tesserakit-prompts",
      external: true
    },
    {
      title: "RAG Corpus Validator",
      description: "Validates a corpus + queries pairing into a retrieval eval dataset: structural checks only, no LLM calls, no execution. Ships as a CLI pack, not a browser demo.",
      path: "https://pypi.org/project/tesserakit-rag/",
      status: "PyPI · v0.4.0",
      accent: "var(--accent-purple)",
      pypiName: "tesserakit-rag",
      external: true
    },
    {
      title: "Prompt ➔ JSON Schema",
      description: "Convert raw prose specifications into typed, structured output JSON schemas and matching examples.",
      path: "/tools/prompt-to-json",
      status: "Live Demo",
      accent: "var(--accent-cyan)"
    },
    {
      title: "Change ➔ HITL Checklist",
      description: "Analyze codebase modifications to estimate risks, touchpoints, and output review check checklists.",
      path: "/tools/change-to-checklist",
      status: "Local Prototype",
      accent: "var(--accent-purple)"
    },
    {
      title: "CSV ➔ Eval Dataset",
      description: "Convert tabular query-response CSV outputs into RAG assertion evaluation packets. A browser preview of the Tessera evals pack.",
      path: "/tools/csv-to-eval",
      status: "Local Prototype",
      accent: "var(--accent-amber)",
      pypiName: "tesserakit-evals"
    },
    {
      title: "Notes ➔ PDF Brief",
      description: "Format messy chat history or your stream of thought into structured briefs for printing.",
      path: "/tools/notes-to-brief",
      status: "Local Prototype",
      accent: "var(--accent-pink)"
    },
    {
      title: "Repo ➔ Context Pack",
      description: "Aggregate multi-file configurations and source blocks into structured XML contexts.",
      path: "/tools/repo-context-pack",
      status: "Local Prototype",
      accent: "var(--accent-cyan)"
    },
    {
      title: "Workflow ➔ Diagram",
      description: "Compile transition actions and process steps into dynamically rendered Mermaid flowcharts.",
      path: "/tools/workflow-to-diagram",
      status: "Live Demo",
      accent: "var(--accent-purple)"
    },
    {
      title: "AI Writing Pattern Check",
      description: "Check a draft against LanguageOps' free deterministic registry for formulaic, AI-associated writing patterns. Nothing is rewritten.",
      path: "/tools/language-pattern-check",
      status: "Live · LanguageOps",
      accent: "var(--accent-purple)",
      footer: "Live Network Call"
    }
  ];

  return (
    <div className="relative flex flex-col gap-16 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Plate hero - Hero of Alexandria, who programmed in brass */}
      <PlateHero
        eyebrow="Browser-Native Utilities"
        title="Stack"
        intro="The stack I reach for: stateless, browser-native utilities to design schemas, audit changes, package directories, and compile flowcharts offline. Lean on the plate and Hero of Alexandria will explain the oldest automation trick in the book."
        htmlSrc="/scenes/character.html?img=/images/characters/hero-of-alexandria-automata.jpg&fallback=/scenes/hero.html"
        alt="Oil painting of Hero of Alexandria in a workshop of brass automata with a self-moving cart and a pegged program drum"
        plateLabel="Plate · hero_automata"
        caption="He programmed in string and pegs."
        attribution="Hero of Alexandria"
        quotes={HERO_LINES}
        accent="var(--accent-cyan)"
      />

      <SceneFigure
        src="/scenes/hero.html"
        label="Figure · hero_automata"
        accent="var(--accent-cyan)"
        caption="A program written in gears, pegs, and string. Wind the drum, and the little cart moves itself along its track. The oldest automation there is, running on nothing but patience and brass."
      />

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {toolItems.map((tool, idx) => (
          <SpotlightCard key={idx} href={tool.path} accent={tool.accent} external={tool.external} className="gap-5 justify-between">
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                  MODULE // 0{idx + 1}
                </span>
                <span
                  className="px-2 py-0.5 rounded-sm text-[9px] font-mono font-semibold uppercase"
                  style={{ color: "var(--text-secondary)", background: "color-mix(in srgb, var(--text-primary) 5%, transparent)", border: "1px solid var(--card-border)" }}
                >
                  {tool.status}
                </span>
              </div>
              <h3 className="font-heading text-xl font-bold" style={{ color: "var(--text-primary)" }}>
                {tool.title}
              </h3>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {tool.description}
              </p>
            </div>

            <div className="flex flex-col gap-1.5 border-t pt-4 mt-2" style={{ borderColor: "var(--card-border)" }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: tool.external ? "var(--accent-blue)" : tool.footer ? "var(--accent-cyan)" : "var(--accent-green)" }}
                  ></span>
                  <span className="text-[9px] font-mono uppercase" style={{ color: "var(--text-muted)" }}>
                    {tool.external ? `pip install ${tool.pypiName}` : tool.footer ?? "100% Client-Side"}
                  </span>
                </div>
                <span
                  className="text-xs font-semibold inline-flex items-center gap-1 transition-all duration-200 group-hover:gap-2"
                  style={{ color: tool.accent }}
                >
                  {tool.external ? "View on PyPI ➔" : "Launch Console ➔"}
                </span>
              </div>
              {!tool.external && tool.pypiName && (
                <span className="text-[9px] font-mono" style={{ color: "var(--text-muted)" }}>
                  pip install {tool.pypiName}
                </span>
              )}
            </div>
          </SpotlightCard>
        ))}
      </section>
    </div>
  );
}
