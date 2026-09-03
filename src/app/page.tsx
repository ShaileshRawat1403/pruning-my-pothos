import Link from "next/link";
import HeroSection from "../components/HeroSection";
import { constructMetadata } from "../lib/seo/metadata";
import { getWebsiteSchema, getOrgSchema } from "../lib/seo/jsonld";

export const metadata = constructMetadata({ path: "/" });

/**
 * Three doors, named by the reader's question rather than by an internal
 * metaphor. Every href points at a section that actually exists today.
 * Teardowns and Field Notes join this list when there is something behind them.
 */
const doors = [
  {
    rail: "Understand",
    question: "What is this thing?",
    desc: "Context windows, embeddings, tool calling, evaluation. Explained against something that was actually run.",
    href: "/systems",
    cta: "Read the explainers",
  },
  {
    rail: "Use",
    question: "What do I do with it?",
    desc: "Utilities that run in your browser and do one job each. Nothing is uploaded anywhere.",
    href: "/tools",
    cta: "Open the tools",
  },
  {
    rail: "Build",
    question: "What happens when it is real?",
    desc: "Experiments, local runs and the resources behind them, including the parts that broke.",
    href: "/shelf",
    cta: "See what was built",
  },
];

/** The page carrying most of the site's search traffic, surfaced deliberately. */
const lead = {
  href: "/systems/skills-vs-prompts-vs-agents/",
  title: "Skills vs Prompts vs Agents",
  standfirst:
    "A prompt is one instruction, a skill is a reusable capability, an agent decides what to do next. Where each belongs, and how to tell which you need.",
  meta: ["Explainer", "8 min", "Updated Sep 2026"],
};

const tools = [
  {
    title: "Prompt to JSON",
    desc: "Compile loose conversational text into strict structured schemas.",
    href: "/tools/prompt-to-json",
  },
  {
    title: "Workflow to diagram",
    desc: "Turn logic lists or task steps into flowcharts and sequences.",
    href: "/tools/workflow-to-diagram",
  },
  {
    title: "Repo context pack",
    desc: "Pack a directory tree into a block an agent can actually read.",
    href: "/tools/repo-context-pack",
  },
  {
    title: "Notes to brief",
    desc: "Translate messy meeting notes into a structured specification.",
    href: "/tools/notes-to-brief",
  },
  {
    title: "CSV to eval harness",
    desc: "Turn a table of cases into an eval blueprint you can run.",
    href: "/tools/csv-to-eval",
  },
  {
    title: "Change to checklist",
    desc: "Break a vague request into a step-by-step verification list.",
    href: "/tools/change-to-checklist",
  },
];

const kicker = "text-[10px] font-mono uppercase tracking-[0.18em]";

export default function Home() {
  const websiteSchema = getWebsiteSchema();
  const orgSchema = getOrgSchema();

  return (
    <div className="flex flex-col gap-24 py-4 lg:py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />

      {/* ── 1. Hero ── */}
      <HeroSection />

      {/* ── 2. Three doors ── */}
      <section className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <span className={kicker} style={{ color: "var(--text-muted)" }}>
            Start here
          </span>
          <h2 className="font-heading text-2xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
            Three ways in
          </h2>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{ borderTop: "1px solid var(--card-border)" }}
        >
          {doors.map((d, i) => (
            <Link
              key={d.rail}
              href={d.href}
              className="group flex flex-col gap-3 py-8 md:px-8 first:md:pl-0 last:md:pr-0"
              style={{
                textDecoration: "none",
                borderBottom: "1px solid var(--card-border)",
                borderLeft: i === 0 ? "none" : "1px solid var(--card-border)",
              }}
            >
              <span className={kicker} style={{ color: "var(--accent-purple)" }}>
                {d.rail}
              </span>
              <span
                className="font-heading text-lg font-semibold tracking-tight"
                style={{ color: "var(--text-primary)" }}
              >
                {d.question}
              </span>
              <span className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {d.desc}
              </span>
              <span
                className="text-xs font-mono mt-auto pt-3 group-hover:underline"
                style={{ color: "var(--text-muted)" }}
              >
                {d.cta} &rarr;
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 3. The one people actually read ── */}
      <section className="flex flex-col gap-5">
        <span className={kicker} style={{ color: "var(--text-muted)" }}>
          Most read
        </span>
        <Link href={lead.href} style={{ textDecoration: "none" }} className="group flex flex-col gap-4">
          <h2
            className="font-heading text-3xl sm:text-4xl font-bold tracking-tight group-hover:underline"
            style={{ color: "var(--text-primary)" }}
          >
            {lead.title}
          </h2>
          <p className="text-base leading-relaxed max-w-2xl" style={{ color: "var(--text-secondary)" }}>
            {lead.standfirst}
          </p>
          <div className={`${kicker} flex flex-wrap items-center gap-3`} style={{ color: "var(--text-muted)" }}>
            {lead.meta.map((m, i) => (
              <span key={m} className="flex items-center gap-3">
                {i > 0 && <span aria-hidden style={{ color: "var(--card-border)" }}>/</span>}
                <span style={i === 0 ? { color: "var(--accent-purple)" } : undefined}>{m}</span>
              </span>
            ))}
          </div>
        </Link>
      </section>

      {/* ── 4. Tools ── */}
      <section id="tools-directory" className="flex flex-col gap-8 scroll-mt-24">
        <div
          className="flex justify-between items-end flex-wrap gap-4 pb-3"
          style={{ borderBottom: "1px solid var(--text-primary)" }}
        >
          <h2 className="font-heading text-2xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
            Tools that run in your browser
          </h2>
          <span className={kicker} style={{ color: "var(--text-muted)" }}>
            Runs locally, nothing uploaded
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: "var(--card-border)" }}>
          {tools.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="group flex flex-col gap-2 p-6"
              style={{ textDecoration: "none", background: "var(--bg-color)" }}
            >
              <span
                className="font-heading text-base font-semibold tracking-tight group-hover:underline"
                style={{ color: "var(--text-primary)" }}
              >
                {t.title}
              </span>
              <span className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {t.desc}
              </span>
            </Link>
          ))}
        </div>

        <Link
          href="/tools"
          className="text-xs font-mono hover:underline"
          style={{ color: "var(--text-primary)" }}
        >
          All tools &rarr;
        </Link>
      </section>

      {/* ── 5. Close ── */}
      <section
        className="flex flex-col gap-4 py-12"
        style={{ borderTop: "1px solid var(--card-border)" }}
      >
        <h2
          className="font-heading text-2xl font-bold tracking-tight max-w-2xl"
          style={{ color: "var(--text-primary)" }}
        >
          You do not need to understand everything. Start with what becomes useful.
        </h2>
        <p className="text-base leading-relaxed max-w-2xl" style={{ color: "var(--text-secondary)" }}>
          Everything here is written against something that was built, run, inspected or broken. If a
          piece cannot say what it was tested on, it does not go up.
        </p>
        <Link
          href="/systems"
          className="text-sm font-mono mt-2 hover:underline"
          style={{ color: "var(--accent-purple)" }}
        >
          Read the explainers &rarr;
        </Link>
      </section>
    </div>
  );
}
