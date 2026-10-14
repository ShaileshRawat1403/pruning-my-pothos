import Link from "next/link";
import WorkflowToDiagramClient from "../../../components/WorkflowToDiagramClient";
import { constructMetadata } from "../../../lib/seo/metadata";
import { getSoftwareAppSchema } from "../../../lib/seo/jsonld";

export const metadata = constructMetadata({
  title: "Workflow ➔ Diagram",
  description: "Turn written process steps, including if/else branches, into a Mermaid flowchart you can export. A deterministic parser in your browser, with no model involved.",
  path: "/tools/workflow-to-diagram"
});

export default function WorkflowToDiagramPage() {
  const schema = getSoftwareAppSchema({
    name: "Workflow ➔ Diagram",
    description: "Turn written process steps, including if/else branches, into a Mermaid flowchart you can export. A deterministic parser in your browser, with no model involved.",
    path: "/tools/workflow-to-diagram"
  });

  return (
    <div className="relative w-full flex flex-col gap-16 max-w-[1100px] mx-auto py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Breadcrumbs */}
      <div className="font-mono text-xs text-[color:var(--text-muted)] flex gap-2">
        <Link href="/tools" className="hover:text-[color:var(--text-primary)] transition-colors">Tools</Link> 
        <span>/</span> 
        <span className="text-[color:var(--text-primary)]">Workflow ➔ Diagram</span>
      </div>

      {/* Tool Hero */}
      <section className="flex flex-col gap-2">
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[color:var(--text-primary)]">
          Workflow ➔ Diagram
        </h1>
        <p className="text-[color:var(--text-secondary)] text-base leading-relaxed max-w-[700px]">
          Convert raw text-based processes and instructions into structured, exportable Mermaid flowcharts in real-time.
        </p>
      </section>

      {/* Main Interactive Client Playground */}
      <section className="w-full">
        <WorkflowToDiagramClient />
      </section>

      {/* How It Works Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-t border-[color:var(--card-border)] pt-12 mt-4">
        {/* Info Content Left */}
        <div className="lg:col-span-8 flex flex-col gap-6 text-sm text-[color:var(--text-secondary)]">
          <h2 className="font-heading text-xl font-bold text-[color:var(--text-primary)]">How It Works</h2>
          <p className="leading-relaxed">
            The tool uses a deterministic parser to analyze action items, conditionals (if/else), and transition paths in your text. It constructs a node-link syntax tree in memory, validating relationships before mapping them directly to a standard Mermaid flowchart specification.
          </p>

          <h3 className="font-heading text-base font-bold text-[color:var(--text-primary)]">Use Cases</h3>
          <ul className="list-disc pl-5 flex flex-col gap-2">
            <li>Turning unstructured briefs into structured execution flowcharts.</li>
            <li>Generating systems logic files directly from issue notes.</li>
            <li>Designing review checkpoints and human gates into automation systems.</li>
          </ul>

          <h3 className="font-heading text-base font-bold text-[color:var(--text-primary)]">Planned CLI</h3>
          <p className="leading-relaxed">
            Deploy workflow validations offline inside your local codebase via our planned command:
          </p>
          <div className="border border-[color:var(--card-border)] p-4 rounded-lg bg-[color:var(--card-bg)] flex items-center gap-2 font-mono text-xs">
            <span className="text-[color:var(--text-primary)] font-bold">ℹ</span>
            <span>Planned install command: pip install tesserakit-core tesserakit-recipes</span>
          </div>
        </div>

        {/* Sidebar Profile Right */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="card-glass p-5 flex flex-col gap-4 bg-[color:var(--card-bg)]">
            <h5 className="font-heading font-bold text-xs uppercase tracking-wider text-[color:var(--text-primary)]">Tool Profile</h5>
            <div className="flex flex-col gap-2.5 text-xs">
              <div className="flex justify-between border-b border-[color:var(--card-border)] pb-2">
                <span className="text-[color:var(--text-muted)]">Status</span>
                <span className="text-[color:var(--text-primary)] font-bold">Live Demo</span>
              </div>
              <div className="flex justify-between border-b border-[color:var(--card-border)] pb-2">
                <span className="text-[color:var(--text-muted)]">Mode</span>
                <span className="text-[color:var(--text-secondary)]">Browser prototype</span>
              </div>
              <div className="flex justify-between border-b border-[color:var(--card-border)] pb-2">
                <span className="text-[color:var(--text-muted)]">Engine</span>
                <span className="text-[color:var(--text-secondary)]">ToolSmith</span>
              </div>
              <div className="flex justify-between border-b border-[color:var(--card-border)] pb-2">
                <span className="text-[color:var(--text-muted)]">Contract</span>
                <span className="text-[color:var(--text-secondary)]">Tessera-compatible</span>
              </div>
              <div className="flex justify-between border-b border-[color:var(--card-border)] pb-2">
                <span className="text-[color:var(--text-muted)]">Future Wiring</span>
                <span className="text-[color:var(--text-primary)] hover:underline font-semibold">
                  <Link href="/docs/tool-status">Tessera JobPack</Link>
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[color:var(--text-muted)]">Output</span>
                <span className="text-[color:var(--text-secondary)]">Mermaid + JSON Graph</span>
              </div>
            </div>
          </div>

          <div className="card-glass p-5 bg-[color:var(--card-bg)] text-xs text-[color:var(--text-secondary)]">
            <h5 className="font-heading font-bold text-xs uppercase tracking-wider text-[color:var(--text-primary)] mb-2">Browser Limits</h5>
            <p className="leading-relaxed">
              The online demo is limited to 15 nodes per generation. Local runs using the CLI do not have size or path limits.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
