import Link from "next/link";
import CsvToEvalClient from "../../../components/CsvToEvalClient";
import { constructMetadata } from "../../../lib/seo/metadata";
import { getSoftwareAppSchema } from "../../../lib/seo/jsonld";

export const metadata = constructMetadata({
  title: "CSV ➔ Eval Dataset",
  description: "Convert raw query-response CSV tables into structured JSONL validation datasets and evaluation rubrics.",
  path: "/tools/csv-to-eval"
});

export default function CsvToEvalPage() {
  const schema = getSoftwareAppSchema({
    name: "CSV ➔ Eval Dataset",
    description: "Convert raw query-response CSV tables into structured JSONL validation datasets and evaluation rubrics.",
    path: "/tools/csv-to-eval"
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
        <span className="text-[color:var(--text-primary)]">CSV ➔ Eval</span>
      </div>

      {/* Tool Hero */}
      <section className="flex flex-col gap-2">
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[color:var(--text-primary)]">
          CSV ➔ Eval Dataset
        </h1>
        <p className="text-[color:var(--text-secondary)] text-base leading-relaxed max-w-[700px]">
          Convert raw query-response CSV files into structured JSONL validation datasets and assertion rubrics in-browser.
        </p>
      </section>

      {/* Main Interactive Client Playground */}
      <section className="w-full">
        <CsvToEvalClient />
      </section>

      {/* How It Works Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-t border-[color:var(--card-border)] pt-12 mt-4">
        {/* Info Content Left */}
        <div className="lg:col-span-8 flex flex-col gap-6 text-sm text-[color:var(--text-secondary)]">
          <h2 className="font-heading text-xl font-bold text-[color:var(--text-primary)]">How It Works</h2>
          <p className="leading-relaxed">
            Paste a CSV with a header row: <code>query</code> (or <code>input</code>), <code>response</code> (or <code>output</code>) and <code>expected</code> (or <code>expected_criteria</code>). Each row becomes one JSONL line holding the input, the output and the expectation as you wrote it. It reads what a spreadsheet exports: quoted cells, commas and line breaks inside quotes, empty cells.
          </p>
          <p className="leading-relaxed">
            It formats; it does not run a model or mark anything pass or fail. Every expectation is labelled <code>contains_phrase</code> whatever it says, so change the type before another tool relies on it.
          </p>
          <p className="leading-relaxed">
            Using it to check whether a change made things better or worse:{" "}
            <Link href="/shelf/reference/better-than-last-week-prove-it/" className="underline underline-offset-4 text-[color:var(--text-primary)]">
              Better Than Last Week? Prove It.
            </Link>
          </p>

          <h3 className="font-heading text-base font-bold text-[color:var(--text-primary)]">Use Cases</h3>
          <ul className="list-disc pl-5 flex flex-col gap-2">
            <li>Structuring user execution history CSVs into RAG evaluation tables.</li>
            <li>Generating programmatic validation rubrics from product spreadsheet specs.</li>
            <li>Bootstrapping assertions for multi-agent validation loops.</li>
          </ul>

          <h3 className="font-heading text-base font-bold text-[color:var(--text-primary)]">Planned CLI</h3>
          <p className="leading-relaxed">
            Deploy dataset compilation and assertion rubric tests offline inside your local workspace via our planned command:
          </p>
          <div className="border border-[color:var(--card-border)] p-4 rounded-lg bg-[color:var(--card-bg)] flex items-center gap-2 font-mono text-xs">
            <span className="text-[color:var(--text-primary)] font-bold">ℹ</span>
            <span>Planned install command: pip install tesserakit-core tesserakit-evals</span>
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
                  <Link href="/docs/tool-status">Tessera JobPack</Link>
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[color:var(--text-muted)]">Output</span>
                <span className="text-[color:var(--text-secondary)]">JSONL + Rubric draft</span>
              </div>
            </div>
          </div>

          <div className="card-glass p-5 bg-[color:var(--card-bg)] text-xs text-[color:var(--text-secondary)]">
            <h5 className="font-heading font-bold text-xs uppercase tracking-wider text-[color:var(--text-primary)] mb-2">In the browser</h5>
            <p className="leading-relaxed">
              Runs in your browser; nothing you paste is sent anywhere. No row limit. One expectation per row.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
