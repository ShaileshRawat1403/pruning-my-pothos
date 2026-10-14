"use client";

import GlowCard from "../GlowCard";
import SceneVisual from "../visuals/SceneVisual";
import LanguagePatternCheckClient from "../LanguagePatternCheckClient";
import LanguageOpsHero from "./LanguageOpsHero";
import RefineScene from "./RefineScene";

// The runtime repository is private. The public part is the Agent Skill, so
// every source link on this page points there, at a fixed commit. Figures
// about the registry and the runtime are the project README's own.
const SKILL_SHA = "c3546ccb4fb845b1ad862ea7750eadeca957fd02";
const SKILL_URL = "https://github.com/ShaileshRawat1403/languageops-natural-response";
const APP_URL = "https://languageops.pruningmypothos.com/";

const REFINE_STEPS = [
  {
    id: "detect",
    tag: "One pass",
    title: "Detect, without a model",
    body: "Regex and heuristics find the patterns, from single words like delve and tapestry to constructions and engagement formulas.",
  },
  {
    id: "survive",
    title: "List what must survive",
    body: "Facts, numbers, caveats and deliberate devices, such as a standalone closing line, are marked before anything is touched.",
  },
  {
    id: "rewrite",
    title: "Rewrite to a brief",
    body: "The model is told what was found, what must go and what must stay. It may restructure freely.",
  },
  {
    id: "check",
    title: "Check the result",
    body: "The facts, the coverage, the deliberate structure and any leftover patterns are checked against the original.",
  },
  {
    id: "escalate",
    title: "Retry once, then a person",
    body: "A failed check gets one retry that names the failure. If it fails again, the text goes to review with reason codes.",
    note: "The checks reduce silent drift. For high-stakes text they do not replace review.",
  },
];

// Each strength in the registry names the habit it turns into when forced.
// These three pairs are named in the README and in the live detector's output.
const PAIRS = [
  { strength: "Controlled contrast", failure: "Negative parallelism", example: "It's not X, it's Y" },
  { strength: "Restrained humour", failure: "Forced wit", example: "the joke that had to be there" },
  { strength: "Measured metaphor", failure: "Tapestry metaphor", example: "a rich tapestry, a journey" },
] as const;

const SURFACES = [
  { name: "Pattern check", body: "Free and keyless. The deterministic pass, on this site and in the app." },
  { name: "Gateway API", body: "Lint, refine, recipes and pattern search over HTTP." },
  { name: "Workbench", body: "Refine with the full verification trail and a word-level diff." },
  { name: "Chrome extension", body: "One click on a ChatGPT response, with the register shown on the result." },
  { name: "MCP server", body: "Lint and refine from ChatGPT, Claude and other MCP clients." },
  { name: "Agent Skill", body: "The response contract on its own, for any Agent Skills client. MIT." },
] as const;

export default function LanguageOpsLanding() {
  return (
    <div className="dax-page lo-page relative w-full max-w-[1080px] mx-auto">
      {/* Hero */}
      <header className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(280px,380px)] items-center gap-10 lg:gap-14 pt-10 lg:pt-6 pb-14 border-b border-[color:var(--card-border)]">
        <div className="flex flex-col gap-5 lg:pr-4 min-w-0">
          <a href="/stack/" className="self-start font-mono text-xs text-[color:var(--text-muted)] hover:text-[color:var(--text-primary)] underline-offset-4 hover:underline">
            <span aria-hidden="true">&larr;</span> Stack
          </a>
          <div className="flex items-center gap-2">
            <span className="h-px w-8 bg-[color:var(--accent-purple)]" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-[color:var(--text-muted)]">
              Public release candidate · Contract v0.4
            </span>
          </div>
          <h1 className="font-heading text-4xl sm:text-[2.65rem] font-black tracking-tight leading-[1.12] text-[color:var(--text-primary)] max-w-[17.5ch]">
            Take the AI habits out of a draft and keep everything else
          </h1>
          <p className="text-base sm:text-lg leading-relaxed max-w-[42ch] text-[color:var(--text-secondary)]">
            LanguageOps finds formulaic, AI-associated writing patterns without a model, rewrites under a contract that
            says what must go and what must stay, then checks the result. What fails the check goes to a person.
          </p>
          <div className="flex flex-wrap gap-3 items-center">
            <a href="#try" className="btn-premium btn-primary">
              Check a draft
            </a>
            <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="btn-premium btn-secondary">
              Open LanguageOps
            </a>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {["Detection without a model", "Register-aware", "Bring your own key", "Agent Skill"].map((chip) => (
              <span
                key={chip}
                className="inline-flex items-center px-2.5 py-1 rounded-[3px] border border-[color:var(--card-border)] bg-[color:var(--bg-elevated)] font-mono text-[11px] text-[color:var(--text-secondary)]"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
        <LanguageOpsHero />
      </header>

      {/* The loop */}
      <section id="loop">
        <p className="dax-section-label">How a draft goes through</p>
        <h2 className="dax-section-title">Found by rule, rewritten to a brief, checked</h2>
        <p className="dax-section-lede">
          Asking a model to sound less like a model swaps one set of habits for another. LanguageOps makes the model
          the replaceable part and puts checks on both sides of it.
        </p>
        <SceneVisual
          sceneId="languageops-refine"
          alt="A draft with moreover, delve and tapestry ringed as patterns. The revenue figure and the closing line are boxed to keep. A rewrite appears beside it, three checks tick, and on the last step one check fails and the sheet is stamped to review, with an editor waiting."
          steps={REFINE_STEPS}
          drawing={RefineScene}
        />
      </section>

      {/* Try it */}
      <section id="try" className="scroll-mt-28">
        <p className="dax-section-label">Try the detector</p>
        <h2 className="dax-section-title">Paste a draft</h2>
        <p className="dax-section-lede">
          This runs the live, free pattern check. Nothing is rewritten and nothing is stored. A clean result means no
          rule matched; it says nothing about who wrote the text.
        </p>
        <LanguagePatternCheckClient />
      </section>

      {/* Strengths and their failures */}
      <section id="pairs">
        <p className="dax-section-label">The registry</p>
        <h2 className="dax-section-title">Every strength names the habit it turns into</h2>
        <p className="dax-section-lede">
          The registry lists good devices as well as bad habits, and pairs them. That is how a rewrite can keep a
          deliberate contrast while removing a reflexive one.
        </p>
        <ol className="list-none m-0 p-0 grid gap-3.5">
          {PAIRS.map((p) => (
            <li key={p.strength} className="lo-pair">
              <span className="lo-pair-good">{p.strength}</span>
              <span className="lo-pair-arrow" aria-hidden="true">
                <svg viewBox="0 0 120 24" width="120" height="24">
                  <path d="M4 12 C30 4 60 20 104 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M96 5 L106 12 L96 19" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>when forced</span>
              </span>
              <span className="lo-pair-bad">
                <s>{p.failure}</s>
                <em>{p.example}</em>
              </span>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-sm text-[color:var(--text-muted)] max-w-[60ch]">
          The same draft gets different treatment in different registers. A LinkedIn recipe keeps fragments and line
          breaks as devices; a professional email gets full enforcement. Detection is the same in both.
        </p>
      </section>

      {/* Surfaces */}
      <section id="surfaces">
        <p className="dax-section-label">Where it runs</p>
        <h2 className="dax-section-title">One registry, six ways in</h2>
        <p className="dax-section-lede">
          The patterns, recipes and contract live in one versioned registry. Editing it changes behaviour without
          touching the runtime code.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {SURFACES.map((s, i) => (
            <GlowCard key={s.name} accent="var(--accent-purple)" pad="p-5" className="gap-2">
              <div className="font-mono text-[11px] tracking-wider text-[color:var(--text-muted)]">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="font-heading text-[14.5px] font-bold tracking-tight text-[color:var(--text-primary)]">{s.name}</h3>
              <p className="text-[13px] leading-relaxed text-[color:var(--text-secondary)]">{s.body}</p>
            </GlowCard>
          ))}
        </div>
      </section>

      {/* Source */}
      <section id="source">
        <p className="dax-section-label">Source</p>
        <h2 className="dax-section-title">What you can read, and what you take on trust</h2>
        <p className="dax-section-lede">
          The runtime is not public yet. The Agent Skill is: it carries the response contract without the runtime, and
          works pasted into any model&rsquo;s instructions.
        </p>
        <div className="rounded-[4px] border border-[color:var(--card-border)] bg-[color:var(--card-bg)] px-[22px] py-[18px] text-[14.5px] leading-relaxed text-[color:var(--text-secondary)] max-w-[70ch]">
          <p className="m-0">
            Per the project README: the registry holds 28 primitives, 45 anti-patterns and 7 recipes, and the
            refinement contract is at v0.4, with each version recorded in an architecture decision. Three families of
            evals gate changes, including one that seeds drafts with good writing and measures how much of it survives a rewrite.
          </p>
          <p className="font-mono text-xs text-[color:var(--text-muted)] mt-4 mb-0">
            Agent Skill pinned to commit{" "}
            <a
              href={`${SKILL_URL}/tree/${SKILL_SHA}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[color:var(--accent-purple)] break-all underline-offset-2 hover:underline"
            >
              {SKILL_SHA}
            </a>
          </p>
        </div>
      </section>

      <footer className="py-14 !border-0">
        <p className="text-[13.5px] leading-relaxed text-[color:var(--text-muted)] max-w-[52ch] mb-4">
          LanguageOps identifies writing patterns. It does not determine authorship. Refinement uses your own provider
          key; the pattern check needs none.
        </p>
        <div className="flex flex-wrap gap-5 text-[13px]">
          <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="text-[color:var(--accent-purple)] hover:underline underline-offset-2">
            LanguageOps app
          </a>
          <a href={`${SKILL_URL}/blob/${SKILL_SHA}/SKILL.md`} target="_blank" rel="noopener noreferrer" className="text-[color:var(--accent-purple)] hover:underline underline-offset-2">
            Agent Skill
          </a>
          <a href="/tools/language-pattern-check/" className="text-[color:var(--accent-purple)] hover:underline underline-offset-2">
            Pattern check tool
          </a>
        </div>
      </footer>
    </div>
  );
}
