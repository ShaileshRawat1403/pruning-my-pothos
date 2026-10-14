import Link from "next/link";
import RepoContextPackClient from "../../../components/RepoContextPackClient";
import { constructMetadata } from "../../../lib/seo/metadata";
import { getSoftwareAppSchema } from "../../../lib/seo/jsonld";

export const metadata = constructMetadata({
  title: "Repo ➔ Context Pack",
  description: "Wrap file paths, README notes and config in XML tags so an LLM can read a repository's layout as context. Runs in your browser; nothing is uploaded.",
  path: "/tools/repo-context-pack"
});

export default function RepoContextPackPage() {
  const schema = getSoftwareAppSchema({
    name: "Repo ➔ Context Pack",
    description: "Wrap file paths, README notes and config in XML tags so an LLM can read a repository's layout as context. Runs in your browser; nothing is uploaded.",
    path: "/tools/repo-context-pack"
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
        <span className="text-[color:var(--text-primary)]">Repo ➔ Context Pack</span>
      </div>

      {/* Tool Hero */}
      <section className="flex flex-col gap-2">
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[color:var(--text-primary)]">
          Repo ➔ Context Pack
        </h1>
        <p className="text-[color:var(--text-secondary)] text-base leading-relaxed max-w-[700px]">
          Compile repository structures, configuration parameters, and code files into structured XML context packs.
        </p>
      </section>

      {/* Main Interactive Client Playground */}
      <section className="w-full">
        <RepoContextPackClient />
      </section>

      {/* How It Works Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-t border-[color:var(--card-border)] pt-12 mt-4">
        {/* Info Content Left */}
        <div className="lg:col-span-8 flex flex-col gap-6 text-sm text-[color:var(--text-secondary)]">
          <h2 className="font-heading text-xl font-bold text-[color:var(--text-primary)]">How It Works</h2>
          <p className="leading-relaxed">
            This manual-input tool gathers file names and wraps your workspace specifications into standard XML tags. This structures the code tree context clearly, separating path definitions, README info, and file parameters to make it easy for LLMs to ingest.
          </p>

          <h3 className="font-heading text-base font-bold text-[color:var(--text-primary)]">Use Cases</h3>
          <ul className="list-disc pl-5 flex flex-col gap-2">
            <li>Structuring codebase configurations for fast, token-efficient system context injection.</li>
            <li>Isolating directory paths and files before running automated AI prompts.</li>
            <li>Bootstrapping project indexes for multi-agent workflows.</li>
          </ul>

          <h3 className="font-heading text-base font-bold text-[color:var(--text-primary)]">Planned CLI</h3>
          <p className="leading-relaxed">
            Deploy repository structure packaging offline inside your local workspace via our planned command:
          </p>
          <div className="border border-[color:var(--card-border)] p-4 rounded-lg bg-[color:var(--card-bg)] flex items-center gap-2 font-mono text-xs">
            <span className="text-[color:var(--text-primary)] font-bold">ℹ</span>
            <span>Planned install command: pip install tesserakit-core tesserakit-repo</span>
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
                <span className="text-[color:var(--text-secondary)]">Manual input / Browser prototype</span>
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
                <span className="text-[color:var(--text-secondary)]">XML context pack</span>
              </div>
            </div>
          </div>

          <div className="card-glass p-5 bg-[color:var(--card-bg)] text-xs text-[color:var(--text-secondary)]">
            <h5 className="font-heading font-bold text-xs uppercase tracking-wider text-[color:var(--text-primary)] mb-2">Browser Limits</h5>
            <p className="leading-relaxed">
              Does not scan live repos yet. Online inputs are limited to 20 files. Local CLI commands query the whole directory structure offline.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
