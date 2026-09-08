import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { constructMetadata } from "../../../lib/seo/metadata";
import { getWebPageSchema } from "../../../lib/seo/jsonld";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  let title = "Document";
  let description = "";

  if (slug === "natural-language-programming-stack") {
    title = "The Natural Language Programming Stack";
    description = "Understand the architecture layers of natural language programming, mapping prompts context, evaluation loops, and governance systems.";
  } else if (slug === "public-private-boundary") {
    title = "Public / Private Boundary";
    description = "Learn about the boundary splits between public ToolSmith helper utilities and private enterprise execution codeplanes.";
  } else if (slug === "tool-status") {
    title = "Tool Status Registry";
    description = "Check the status registry of Systems Bench tools, tracking release stages from live browser sandboxes to planned CLI packages.";
  }

  return constructMetadata({
    title,
    description,
    path: `/docs/${slug}`
  });
}

export const dynamicParams = false;

export function generateStaticParams() {
  return [
    { slug: "natural-language-programming-stack" },
    { slug: "public-private-boundary" },
    { slug: "tool-status" },
  ];
}

export default async function DocSubpage({ params }: PageProps) {
  const { slug } = await params;

  let schemaTitle = "Document";
  let schemaDesc = "";
  if (slug === "natural-language-programming-stack") {
    schemaTitle = "The Natural Language Programming Stack";
    schemaDesc = "Understand the architecture layers of natural language programming, mapping prompts context, evaluation loops, and governance systems.";
  } else if (slug === "public-private-boundary") {
    schemaTitle = "Public / Private Boundary";
    schemaDesc = "Learn about the boundary splits between public ToolSmith helper utilities and private enterprise execution codeplanes.";
  } else if (slug === "tool-status") {
    schemaTitle = "Tool Status Registry";
    schemaDesc = "Check the status registry of Systems Bench tools, tracking release stages from live browser sandboxes to planned CLI packages.";
  }

  const webpageSchema = getWebPageSchema({
    title: `${schemaTitle} | Pruning My Pothos`,
    description: schemaDesc,
    path: `/docs/${slug}`
  });

  if (slug === "natural-language-programming-stack") {
    return (
      <div className="flex flex-col gap-8 w-full">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageSchema) }}
        />
        {/* Page Header */}
        <section className="flex flex-col gap-3 py-4 border-b border-[color:var(--card-border)]">
          <span className="inline-flex self-start px-2.5 py-0.5 rounded-full border border-accent-cyan/25 bg-accent-cyan/10 text-[10px] font-mono font-bold tracking-wider text-[color:var(--text-primary)] uppercase">
            ARCHITECTURAL DESIGN
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[color:var(--text-primary)]">
            The NLP Systems Stack
          </h1>
          <p className="text-[color:var(--text-secondary)] text-sm leading-relaxed max-w-[700px]">
            An walkthrough of the layers bridging human intent and deterministic software execution.
          </p>
        </section>

        {/* Content Card */}
        <div className="card-glass p-6 sm:p-8 flex flex-col gap-6 bg-[color:var(--bg-color)]">
          <h2 className="font-heading text-xl font-bold text-[color:var(--text-primary)]">The Seven Layers of Alignment</h2>
          <p className="text-[color:var(--text-secondary)] text-sm leading-relaxed">
            Prompt engineering alone is insufficient to build production systems. Under the Sans Serif operating model, a prompt is merely the topmost layer of an integrated system stack designed to ensure verification, safety, and correctness.
          </p>

          {/* Table list */}
          <div className="border border-[color:var(--card-border)] rounded-lg overflow-hidden font-mono text-xs mt-4">
            <div className="bg-white/[0.03] p-3 border-b border-[color:var(--card-border)] flex justify-between font-bold text-[color:var(--text-primary)]">
              <span>LAYER</span>
              <span>PURPOSE / BOUNDARY</span>
            </div>
            
            <div className="p-3 border-b border-[color:var(--card-border)] flex justify-between">
              <strong className="text-[color:var(--text-primary)]">07. Governance / HITL</strong>
              <span className="text-[color:var(--text-primary)]">Human approvals and check promotion gates</span>
            </div>
            <div className="p-3 border-b border-[color:var(--card-border)] flex justify-between">
              <strong className="text-[color:var(--text-primary)]">06. Execution Ledger</strong>
              <span className="text-[color:var(--text-primary)]">Immutable local operation logs (ledger.jsonl)</span>
            </div>
            <div className="p-3 border-b border-[color:var(--card-border)] flex justify-between">
              <strong className="text-[color:var(--text-primary)]">05. Guided Loops</strong>
              <span className="text-[color:var(--text-primary)]">Self-correction and validation feedback steps</span>
            </div>
            <div className="p-3 border-b border-[color:var(--card-border)] flex justify-between">
              <strong className="text-[color:var(--text-primary)]">04. Workflow Engine</strong>
              <span className="text-[color:var(--text-primary)]">Job-pack contracts (Input ➔ Normalize ➔ Map)</span>
            </div>
            <div className="p-3 border-b border-[color:var(--card-border)] flex justify-between">
              <strong className="text-[color:var(--text-primary)]">03. Evaluation Harness</strong>
              <span className="text-[color:var(--text-secondary)]">Rubric scoring and local assertion testing</span>
            </div>
            <div className="p-3 border-b border-[color:var(--card-border)] flex justify-between">
              <strong className="text-[color:var(--text-primary)]">02. Context Architecture</strong>
              <span className="text-[color:var(--text-secondary)]">Workspace context-packing (XML tree structure)</span>
            </div>
            <div className="p-3 flex justify-between">
              <strong className="text-[color:var(--text-primary)]">01. Prompt Interface</strong>
              <span className="text-[color:var(--text-muted)]">Structured schemas, typings, and JSON contracts</span>
            </div>
          </div>

          <h3 className="font-heading text-base font-bold text-[color:var(--text-primary)] mt-6">Layer Details</h3>
          
          <div className="flex flex-col gap-4 text-sm text-[color:var(--text-secondary)]">
            <div>
              <h4 className="font-heading font-semibold text-[color:var(--text-primary)] mb-1">01. Prompt & Context Layers</h4>
              <p className="leading-relaxed">
                At the foundation, prompts are not essays. They are structured contracts containing explicit output schemas (e.g., JSON schemas) and workspace file listings. The workspace context is filtered, pruned, and injected dynamically to prevent context overflow or model confusion.
              </p>
            </div>

            <div>
              <h4 className="font-heading font-semibold text-[color:var(--text-primary)] mb-1">02. Harness & Evaluation Layers</h4>
              <p className="leading-relaxed">
                Once an LLM execution is triggered, the output must be validated against automated unit assertions. We score responses using programmatic rubrics (e.g., verifying Markdown structure, matching AST nodes, checking file paths, testing compilation status) before the loop continues.
              </p>
            </div>

            <div>
              <h4 className="font-heading font-semibold text-[color:var(--text-primary)] mb-1">03. Guided Loop & Ledger Layers</h4>
              <p className="leading-relaxed">
                If evaluations identify a failure, the loop does not fail silently. The system feeds the error back to the model with context to trigger self-correction. Every cycle, change, and approval is logged to an immutable local ledger file (`ledger.jsonl`) to ensure full auditability.
              </p>
            </div>

            <div>
              <h4 className="font-heading font-semibold text-[color:var(--text-primary)] mb-1">04. Governance / Human-in-the-Loop</h4>
              <p className="leading-relaxed">
                High-risk modifications (such as system re-routing, stylesheet changes, or third-party package configurations) require manual verification. The system creates interactive checklists for human review, holding changes at a gate until explicit approval is registered.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "public-private-boundary") {
    return (
      <div className="flex flex-col gap-8 w-full">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageSchema) }}
        />
        {/* Page Header */}
        <section className="flex flex-col gap-3 py-4 border-b border-[color:var(--card-border)]">
          <span className="inline-flex self-start px-2.5 py-0.5 rounded-full border border-accent-cyan/25 bg-accent-cyan/10 text-[10px] font-mono font-bold tracking-wider text-[color:var(--text-primary)] uppercase">
            OPERATIONAL SECURITY
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[color:var(--text-primary)]">
            Public / Private Boundary
          </h1>
          <p className="text-[color:var(--text-secondary)] text-sm leading-relaxed max-w-[700px]">
            Defining where public open-source tools end and private production infrastructure begins.
          </p>
        </section>

        {/* Content Card */}
        <div className="card-glass p-6 sm:p-8 flex flex-col gap-6 bg-[color:var(--bg-color)]">
          <h2 className="font-heading text-xl font-bold text-[color:var(--text-primary)]">Ecosystem Partitioning</h2>
          <p className="text-[color:var(--text-secondary)] text-sm leading-relaxed">
            Sans Serif Systems operates as a hybrid environment. To guarantee predictability for local build environments while keeping client proprietary codebase configurations secure, the lab separates public utility tools from the private execution engine.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-4">
            <div className="border border-[color:var(--card-border)] p-5 rounded-lg bg-accent-cyan/5">
              <h3 className="text-[color:var(--text-primary)] font-heading font-bold text-sm mb-3">🔓 Public Lab</h3>
              <ul className="text-xs text-[color:var(--text-secondary)] flex flex-col gap-2 list-disc pl-4">
                <li>Browser-native schema sandboxes</li>
                <li>Local-first CLI helper binaries</li>
                <li>Open-source evaluation harness formats</li>
                <li>Mermaid flow diagram compilers</li>
                <li>Build-verification ledger specifications</li>
              </ul>
            </div>
            <div className="border border-[color:var(--card-border)] p-5 rounded-lg bg-accent-purple/5">
              <h3 className="text-[color:var(--text-primary)] font-heading font-bold text-sm mb-3">🔒 Private Runtime</h3>
              <ul className="text-xs text-[color:var(--text-secondary)] flex flex-col gap-2 list-disc pl-4">
                <li>Production loop runners (Governance engine)</li>
                <li>Proprietary evaluation job-packs (Tessera adapters)</li>
                <li>Custom builder cockpit integrations</li>
                <li>LLM provider billing and fallback models</li>
                <li>Team codebase context index databases</li>
              </ul>
            </div>
          </div>

          <h3 className="font-heading text-base font-bold text-[color:var(--text-primary)] mt-4">Why This Split Exists</h3>
          <div className="flex flex-col gap-4 text-sm text-[color:var(--text-secondary)]">
            <p>
              <strong>1. Safety & Governance:</strong> Agents running in production need strict boundary enforcement. Distributing the raw execution code publicly makes it hard to enforce safety standards across arbitrary local setups. Keeping runtimes private guarantees secure tool boundaries.
            </p>
            <p>
              <strong>2. Client IP Isolation:</strong> Custom enterprise prompt contexts, schema rules, and codebase ingestion paths containing sensitive intellectual property must remain isolated on private runner instances.
            </p>
            <p>
              <strong>3. Reusable Standards:</strong> By isolating execution, we can publish public tools that act as clean, stateless adapters &mdash; enabling anyone to model schemas and compile diagrams without needing complex backend deployments.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "tool-status") {
    return (
      <div className="flex flex-col gap-8 w-full">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageSchema) }}
        />
        {/* Page Header */}
        <section className="flex flex-col gap-3 py-4 border-b border-[color:var(--card-border)]">
          <span className="inline-flex self-start px-2.5 py-0.5 rounded-full border border-accent-cyan/25 bg-accent-cyan/10 text-[10px] font-mono font-bold tracking-wider text-[color:var(--text-primary)] uppercase">
            ROADMAP & STATUS
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[color:var(--text-primary)]">
            Tool Status Registry
          </h1>
          <p className="text-[color:var(--text-secondary)] text-sm leading-relaxed max-w-[700px]">
            An honest inventory of what works right now, what is in active prototyping, and what remains restricted to the private ecosystem.
          </p>
        </section>

        {/* Content Card */}
        <div className="card-glass p-6 sm:p-8 flex flex-col gap-6 bg-[color:var(--bg-color)]">
          <h2 className="font-heading text-xl font-bold text-[color:var(--text-primary)]">System Status Models</h2>
          <p className="text-[color:var(--text-secondary)] text-sm leading-relaxed">
            To maintain transparency and trust, every utility card in the workshop is marked with a status badge indicating its maturity level.
          </p>

          <div className="flex flex-col gap-6 mt-4">
            <div className="border border-[color:var(--card-border)] border-l-4 border-l-accent-cyan p-5 rounded-r-lg bg-accent-cyan/5">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-2 py-0.5 rounded bg-accent-cyan/20 text-[color:var(--text-primary)] text-[10px] font-mono font-bold uppercase">Client-Side Live</span>
              </div>
              <p className="text-sm text-[color:var(--text-secondary)] leading-relaxed">
                Runs fully client-side in your web browser. No external API requests, no tracking, and no logins required. Immediate utility.
              </p>
              <p className="text-xs text-[color:var(--text-muted)] font-mono mt-3">
                Currently active: Prompt ➔ JSON, Workflow ➔ Diagram
              </p>
            </div>

            <div className="border border-[color:var(--card-border)] border-l-4 border-l-accent-purple p-5 rounded-r-lg bg-accent-purple/5">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-2 py-0.5 rounded bg-accent-purple/20 text-[color:var(--text-primary)] text-[10px] font-mono font-bold uppercase">Browser Prototype</span>
              </div>
              <p className="text-sm text-[color:var(--text-secondary)] leading-relaxed">
                Interactive mockups running fully in-browser as sandboxes. Full terminal/CLI execution packages are planned for offline local use.
              </p>
              <p className="text-xs text-[color:var(--text-muted)] font-mono mt-3">
                Active Prototypes: CSV ➔ Eval Harness, Change Request ➔ HITL Checklist, Repo ➔ Context Pack, Code/Notes ➔ PDF Brief
              </p>
            </div>

            <div className="border border-[color:var(--card-border)] border-l-4 border-l-text-muted p-5 rounded-r-lg bg-white/[0.01]">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-2 py-0.5 rounded bg-white/10 text-[color:var(--text-muted)] text-[10px] font-mono font-bold uppercase">Planned Concept</span>
              </div>
              <p className="text-sm text-[color:var(--text-secondary)] leading-relaxed">
                Architectural design proposals under consideration. Blueprints are prepared, but active development has not yet begun.
              </p>
            </div>

            <div className="border border-[color:var(--card-border)] border-l-4 border-l-accent-orange p-5 rounded-r-lg bg-accent-orange/5">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-2 py-0.5 rounded bg-accent-orange/20 text-[color:var(--text-primary)] text-[10px] font-mono font-bold uppercase">Restricted Private Runtime</span>
              </div>
              <p className="text-sm text-[color:var(--text-secondary)] leading-relaxed">
                Underlying infrastructure and runtimes (e.g. brainbench servers, private governance gates, private database adaptors) that power the production stack and are not distributed publicly.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return notFound();
}
