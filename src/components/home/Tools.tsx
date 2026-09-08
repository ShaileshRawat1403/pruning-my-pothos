import Link from "next/link";
import ToolGrid, { ToolItem } from "./ToolGrid";

const VERIFIED_TOOLS: ToolItem[] = [
  {
    name: "Secret Shape Scanner",
    badge: "Live Tool",
    category: "Security",
    desc: "Detect secrets by shape and entropy rather than simple key name matches. Redact credentials directly in memory.",
    installCmd: "pip install tesserakit-config",
    playgroundHref: "/tools/secret-scanner",
    pypiHref: "https://pypi.org/project/tesserakit-config/",
  },
  {
    name: "SQL Migration Safety",
    badge: "Live Tool",
    category: "Database",
    desc: "Catch DELETE and UPDATE without WHERE clauses, DROP without IF EXISTS, and unsafe NOT NULL columns before deployment.",
    installCmd: "pip install tesserakit-sql",
    playgroundHref: "/tools/sql-safety",
    pypiHref: "https://pypi.org/project/tesserakit-sql/",
  },
  {
    name: "GitHub Actions Linter",
    badge: "Live Tool",
    category: "CI / CD",
    desc: "Catch the pull_request_target RCE combo, unpinned third-party actions, write-all token scopes, and script injection risks.",
    installCmd: "pip install tesserakit-gha",
    playgroundHref: "/tools/gha-lint",
    pypiHref: "https://pypi.org/project/tesserakit-gha/",
  },
  {
    name: "API Surface Mapper",
    badge: "Live Tool",
    category: "Contracts",
    desc: "Map curl commands and HTTP traces into a clean endpoint surface, with auth tokens and sensitive headers redacted first.",
    installCmd: "pip install tesserakit-api",
    playgroundHref: "/tools/api-surface-map",
    pypiHref: "https://pypi.org/project/tesserakit-api/",
  },
];

export default function Tools() {
  return (
    <section id="tools" className="scroll-mt-28 w-full border-b border-[#EAE8E2] bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-16">
        <div className="flex justify-between items-end mb-8 flex-wrap gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#8A8780]">
              UTILITIES // BROWSER & CLI
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[#121212]">
              Browser playgrounds and developer utilities.
            </h2>
          </div>
          <span className="font-mono text-xs text-[#7A7872]">
            Stateless in-browser execution · Python CLI companions
          </span>
        </div>

        <ToolGrid tools={VERIFIED_TOOLS} />

        <div className="mt-8 flex justify-center">
          <Link
            href="/tools"
            className="px-6 py-3 rounded-lg bg-white hover:bg-[#FAF9F6] border border-[#D5D2C9] text-[#121212] text-xs font-mono font-bold uppercase tracking-wider transition-colors shadow-2xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#121212]"
          >
            Explore all 22 browser utilities &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
