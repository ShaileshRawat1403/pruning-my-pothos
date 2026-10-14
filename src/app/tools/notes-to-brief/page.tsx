import Link from "next/link";
import NotesToBriefClient from "../../../components/NotesToBriefClient";
import { constructMetadata } from "../../../lib/seo/metadata";
import { getSoftwareAppSchema } from "../../../lib/seo/jsonld";

export const metadata = constructMetadata({
  title: "Code/Notes ➔ PDF Brief",
  description: "Turn raw notes and snippets into a Markdown brief with Goals, Decisions, Risks and Next Actions headings. Runs in your browser; nothing is sent to a server.",
  path: "/tools/notes-to-brief"
});

export default function NotesToBriefPage() {
  const schema = getSoftwareAppSchema({
    name: "Code/Notes ➔ PDF Brief",
    description: "Turn raw notes and snippets into a Markdown brief with Goals, Decisions, Risks and Next Actions headings. Runs in your browser; nothing is sent to a server.",
    path: "/tools/notes-to-brief"
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
        <span className="text-[color:var(--text-primary)]">Notes ➔ Brief</span>
      </div>

      {/* Tool Hero */}
      <section className="flex flex-col gap-2">
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[color:var(--text-primary)]">
          Code/Notes ➔ PDF Brief
        </h1>
        <p className="text-[color:var(--text-secondary)] text-base leading-relaxed max-w-[700px]">
          Convert unstructured notes, raw thoughts, and snippets into structured product briefs and markdown documents.
        </p>
      </section>

      {/* Main Interactive Client Playground */}
      <section className="w-full">
        <NotesToBriefClient />
      </section>

      {/* How It Works Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-t border-[color:var(--card-border)] pt-12 mt-4">
        {/* Info Content Left */}
        <div className="lg:col-span-8 flex flex-col gap-6 text-sm text-[color:var(--text-secondary)]">
          <h2 className="font-heading text-xl font-bold text-[color:var(--text-primary)]">How It Works</h2>
          <p className="leading-relaxed">
            This utility parses list elements, notes, and task goals inside your text and restructures them into a standard markdown document format featuring separated headings for Goals, Decisions, Risks, and Next Actions.
          </p>

          <h3 className="font-heading text-base font-bold text-[color:var(--text-primary)]">Use Cases</h3>
          <ul className="list-disc pl-5 flex flex-col gap-2">
            <li>Translating stream-of-consciousness dev thoughts into formal documentation.</li>
            <li>Formatting raw chat descriptions into roadmap specs.</li>
            <li>Generating next steps checklists directly from codebase post-mortem notes.</li>
          </ul>

          <h3 className="font-heading text-base font-bold text-[color:var(--text-primary)]">Planned CLI</h3>
          <p className="leading-relaxed">
            Deploy notes/markdown compilation offline inside your local workspace via our planned command:
          </p>
          <div className="border border-[color:var(--card-border)] p-4 rounded-lg bg-[color:var(--card-bg)] flex items-center gap-2 font-mono text-xs">
            <span className="text-[color:var(--text-primary)] font-bold">ℹ</span>
            <span>Planned install command: pip install tesserakit-core</span>
          </div>
        </div>

        {/* Sidebar Profile Right */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="card-glass p-5 flex flex-col gap-4 bg-[color:var(--card-bg)]">
            <h5 className="font-heading font-bold text-xs uppercase tracking-wider text-[color:var(--text-primary)]">Tool Profile</h5>
            <div className="flex flex-col gap-2.5 text-xs">
              <div className="flex justify-between border-b border-[color:var(--card-border)] pb-2">
                <span className="text-[color:var(--text-muted)]">Status</span>
                <span className="text-[color:var(--text-primary)] font-bold">Local Prototype</span>
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
                  <Link href="/docs/tool-status">Content Engine</Link>
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[color:var(--text-muted)]">Output</span>
                <span className="text-[color:var(--text-secondary)]">Structured markdown</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
