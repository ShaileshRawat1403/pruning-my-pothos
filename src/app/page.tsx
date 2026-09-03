import Link from "next/link";
import { allSystems } from "content-collections";
import HeroSection from "../components/HeroSection";
import { slugifyTag } from "../lib/tags";
import { constructMetadata } from "../lib/seo/metadata";
import { getWebsiteSchema, getOrgSchema } from "../lib/seo/jsonld";

export const metadata = constructMetadata({ path: "/" });

/**
 * Three doors, named by the reader's question rather than by an internal
 * metaphor. Every href points at a section that exists today.
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

/**
 * Topics are CURATED, not ranked by frequency.
 *
 * Raw tag counts across the whole site put "music" at 11 and "reflection" at 7,
 * because the shelf and the personal collections carry their own vocabulary.
 * Sorting by count would put a record collection on the front page of a
 * technology publication. So the list is chosen, and only the counts are
 * computed, from the explainer corpus alone.
 *
 * `label` exists because a tag is a slug and a topic is a promise. "geo" tells
 * a reader nothing; "AI search" tells them whether to click.
 */
const TOPICS: Array<{ tag: string; label: string }> = [
  { tag: "reliability", label: "Reliability" },
  { tag: "governance", label: "Governance" },
  { tag: "orchestration", label: "Orchestration" },
  { tag: "agents", label: "Agents" },
  { tag: "workflow", label: "Workflows" },
  { tag: "evaluation", label: "Evaluation" },
  { tag: "architecture", label: "Architecture" },
  { tag: "retrieval", label: "Retrieval and RAG" },
  { tag: "geo", label: "AI search" },
  { tag: "prompting", label: "Prompting" },
  { tag: "skills", label: "Skills" },
  { tag: "mcp", label: "MCP" },
];

const kicker = "text-[10px] font-mono uppercase tracking-[0.18em]";

/** Shared focus ring. Every interactive block on this page carries it. */
const focusable =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " +
  "focus-visible:ring-[color:var(--accent-purple)] focus-visible:ring-offset-[color:var(--bg-color)]";

export default function Home() {
  const websiteSchema = getWebsiteSchema();
  const orgSchema = getOrgSchema();

  // Counts and recency come from the corpus, so they cannot drift out of date.
  const topics = TOPICS.map((t) => ({
    ...t,
    count: allSystems.filter((s) => (s.tags || []).some((x) => slugifyTag(x) === t.tag)).length,
  })).filter((t) => t.count > 0);

  const recent = [...allSystems]
    .filter((s) => s.publishDate)
    .sort((a, b) => (a.publishDate! < b.publishDate! ? 1 : -1))
    .slice(0, 6);

  return (
    <div className="flex flex-col gap-24 py-4 lg:py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />

      {/* ── 1. Hero ── */}
      <HeroSection />

      {/* ── 2. Three doors ── */}
      <section className="flex flex-col gap-8" aria-labelledby="doors-heading">
        <div className="flex flex-col gap-2">
          <span className={kicker} style={{ color: "var(--text-muted)" }}>Start here</span>
          <h2 id="doors-heading" className="font-heading text-2xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
            Three ways in
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3" style={{ borderTop: "1px solid var(--card-border)" }}>
          {doors.map((d, i) => (
            <Link
              key={d.rail}
              href={d.href}
              className={`group flex flex-col gap-3 py-8 md:px-8 first:md:pl-0 last:md:pr-0 ${focusable}`}
              style={{
                textDecoration: "none",
                borderBottom: "1px solid var(--card-border)",
                borderLeft: i === 0 ? "none" : "1px solid var(--card-border)",
              }}
            >
              <span className={kicker} style={{ color: "var(--accent-purple)" }}>{d.rail}</span>
              <span className="font-heading text-lg font-semibold tracking-tight" style={{ color: "var(--text-primary)" }}>
                {d.question}
              </span>
              <span className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{d.desc}</span>
              <span className="text-xs font-mono mt-auto pt-3 group-hover:underline" style={{ color: "var(--text-muted)" }}>
                {d.cta} &rarr;
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 3. The one people actually read ── */}
      <section className="flex flex-col gap-5" aria-labelledby="lead-heading">
        <span className={kicker} style={{ color: "var(--text-muted)" }}>Most read</span>
        <Link href={lead.href} className={`group flex flex-col gap-4 ${focusable}`} style={{ textDecoration: "none" }}>
          <h2 id="lead-heading" className="font-heading text-3xl sm:text-4xl font-bold tracking-tight group-hover:underline" style={{ color: "var(--text-primary)" }}>
            {lead.title}
          </h2>
          <p className="text-base leading-relaxed max-w-2xl" style={{ color: "var(--text-secondary)" }}>{lead.standfirst}</p>
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

      {/* ── 4. Browse by topic ── */}
      <section className="flex flex-col gap-8" aria-labelledby="topics-heading">
        <div className="flex justify-between items-end flex-wrap gap-4 pb-3" style={{ borderBottom: "1px solid var(--text-primary)" }}>
          <h2 id="topics-heading" className="font-heading text-2xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
            Browse by topic
          </h2>
          <Link href="/systems" className={`text-xs font-mono hover:underline ${focusable}`} style={{ color: "var(--text-primary)" }}>
            All explainers &rarr;
          </Link>
        </div>

        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px list-none p-0 m-0" style={{ background: "var(--card-border)" }}>
          {topics.map((t) => (
            <li key={t.tag} style={{ background: "var(--bg-color)" }}>
              <Link
                href={`/tags/${t.tag}`}
                className={`group flex items-baseline justify-between gap-3 px-4 py-4 ${focusable}`}
                style={{ textDecoration: "none" }}
              >
                <span className="text-sm font-semibold group-hover:underline" style={{ color: "var(--text-primary)" }}>
                  {t.label}
                </span>
                <span className="text-xs font-mono shrink-0" style={{ color: "var(--text-muted)" }}>
                  {t.count}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Recent, so the front page shows movement as well as shape. */}
        <div className="flex flex-col gap-4 pt-4">
          <span className={kicker} style={{ color: "var(--text-muted)" }}>Recent</span>
          <ul className="flex flex-col list-none p-0 m-0">
            {recent.map((s) => (
              <li key={s._meta.path} style={{ borderTop: "1px solid var(--card-border)" }}>
                <Link
                  href={`/systems/${s._meta.path}/`}
                  className={`group flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6 py-4 ${focusable}`}
                  style={{ textDecoration: "none" }}
                >
                  <span className={`${kicker} shrink-0 sm:w-28`} style={{ color: "var(--text-muted)" }}>
                    {s.publishDate?.slice(0, 7)}
                  </span>
                  <span className="text-base font-semibold group-hover:underline" style={{ color: "var(--text-primary)" }}>
                    {s.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 5. Tools ── */}
      <section className="flex flex-col gap-8 scroll-mt-24" id="tools-directory" aria-labelledby="tools-heading">
        <div className="flex justify-between items-end flex-wrap gap-4 pb-3" style={{ borderBottom: "1px solid var(--text-primary)" }}>
          <h2 id="tools-heading" className="font-heading text-2xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
            Tools that run in your browser
          </h2>
          <span className={kicker} style={{ color: "var(--text-muted)" }}>Runs locally, nothing uploaded</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: "var(--card-border)" }}>
          {[
            { title: "Prompt to JSON", desc: "Compile loose conversational text into strict structured schemas.", href: "/tools/prompt-to-json" },
            { title: "Workflow to diagram", desc: "Turn logic lists or task steps into flowcharts and sequences.", href: "/tools/workflow-to-diagram" },
            { title: "Repo context pack", desc: "Pack a directory tree into a block an agent can actually read.", href: "/tools/repo-context-pack" },
            { title: "Notes to brief", desc: "Translate messy meeting notes into a structured specification.", href: "/tools/notes-to-brief" },
            { title: "CSV to eval harness", desc: "Turn a table of cases into an eval blueprint you can run.", href: "/tools/csv-to-eval" },
            { title: "Change to checklist", desc: "Break a vague request into a step-by-step verification list.", href: "/tools/change-to-checklist" },
          ].map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className={`group flex flex-col gap-2 p-6 ${focusable}`}
              style={{ textDecoration: "none", background: "var(--bg-color)" }}
            >
              <span className="font-heading text-base font-semibold tracking-tight group-hover:underline" style={{ color: "var(--text-primary)" }}>
                {t.title}
              </span>
              <span className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{t.desc}</span>
            </Link>
          ))}
        </div>

        <Link href="/tools" className={`text-xs font-mono hover:underline ${focusable}`} style={{ color: "var(--text-primary)" }}>
          All tools &rarr;
        </Link>
      </section>

      {/* ── 6. Close ── */}
      <section className="flex flex-col gap-4 py-12" style={{ borderTop: "1px solid var(--card-border)" }}>
        <h2 className="font-heading text-2xl font-bold tracking-tight max-w-2xl" style={{ color: "var(--text-primary)" }}>
          You do not need to understand everything. Start with what becomes useful.
        </h2>
        <p className="text-base leading-relaxed max-w-2xl" style={{ color: "var(--text-secondary)" }}>
          Everything here is written against something that was built, run, inspected or broken. If a
          piece cannot say what it was tested on, it does not go up.
        </p>
        <Link href="/systems" className={`text-sm font-mono mt-2 hover:underline ${focusable}`} style={{ color: "var(--accent-purple)" }}>
          Read the explainers &rarr;
        </Link>
      </section>
    </div>
  );
}
