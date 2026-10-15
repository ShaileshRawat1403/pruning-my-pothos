"use client";

import GlowCard from "../GlowCard";
import DaxHeroCinema from "./DaxHeroCinema";
import RaoTour from "./RaoTour";
import CrateCascade from "./CrateCascade";
import CopyCommand from "./CopyCommand";
import SceneVisual from "../visuals/SceneVisual";
import ReviewedRunScene from "./ReviewedRunScene";

const VERSION = "v2.0.1";
const PEG_SHA = "fe911e57415dcfa9d101bd2584b28d2ea3c84694";
const RELEASE_URL = `https://github.com/ShaileshRawat1403/dax/releases/tag/${VERSION}`;
const GITHUB_URL = "https://github.com/ShaileshRawat1403/dax";

const OUTCOMES = [
  {
    num: "01",
    title: "Pause what matters",
    body: "Risky actions resolve to allow / ask / deny before mutation.",
    accent: "var(--accent-purple)",
  },
  {
    num: "02",
    title: "See the run",
    body: "Canonical events and replayable state, not chat archaeology.",
    accent: "var(--accent-cyan)",
  },
  {
    num: "03",
    title: "Prove trust",
    body: "Audit posture plus tamper-evident ledger checks.",
    accent: "var(--accent-amber)",
  },
] as const;

// The steps of the reviewed-run scene, in the v2.0.0 changelog's own terms.
const REVIEWED_RUN_STEPS = [
  {
    id: "propose",
    tag: "Reviewed run",
    title: "The run's grant is written down first",
    body: "What the run may do, before it starts: which tools, which paths, which agents it may delegate to.",
  },
  {
    id: "approve",
    title: "An operator approves exactly that grant",
    body: "The approval covers that grant, capability, contract and binding. Remembering it covers only that combination.",
  },
  {
    id: "start",
    title: "Published, activated, then started",
    body: "The approved grant is published unchanged, the run is activated against it, and someone starts it. Approval alone does not start a run.",
  },
  {
    id: "refuse",
    title: "A request outside the grant is refused",
    body: "The denial is recorded before any effect. If the decision cannot be recorded, the request is refused as well.",
  },
];

const ALSO_IN_2 = [
  {
    title: "Where everything came from",
    body: "Delegated tasks, instructions, context and summaries are recorded as commitments, without keeping the conversation text.",
  },
  {
    title: "A cloned repo runs nothing until trusted",
    body: "A repository's own tool and plugin files wait for dax trust, and approval is bound to their content.",
  },
  {
    title: "Built-ins keep their names",
    body: "A plugin or MCP tool called read cannot stand in for the built-in read under a contract.",
  },
  {
    title: "Changes over HTTP need a password",
    body: "Without DAX_SERVER_PASSWORD, the HTTP server is read-only. The local TUI works as before.",
  },
  {
    title: "Claude through an API key (2.0.1)",
    body: "Native subscription sign-in is retired. The Claude Code worker keeps its own login.",
  },
] as const;

const CRATES = [
  { name: "dax-core", role: "Replays canonical run events; deterministic proof reports" },
  { name: "dax-policy", role: "allow / ask / deny without a model call" },
  { name: "dax-audit", role: "Trust posture from six structured signals" },
  { name: "dax-ledger", role: "Tamper-evident append-only chain" },
  { name: "dax-indexer", role: "Deterministic local structure index" },
] as const;

const CONTRAST = [
  {
    title: "Cursor",
    items: ["Strong IDE agent UX", "Approvals in the editor flow", "Session-centric trail", "Less formal audit export"],
    highlight: false,
  },
  {
    title: "Claude Code",
    items: ["Capable terminal agent", "Permission prompts in-run", "Transcript-forward history", "Proof ladder not primary"],
    highlight: false,
  },
  {
    title: "Codex",
    items: ["Cloud / CLI agent loops", "Policy via product controls", "Run logs as product surface", "Local ledger optional"],
    highlight: false,
  },
  {
    title: "DAX",
    items: [
      "Pause / approval (allow · ask · deny)",
      "Evidence-forward diffs",
      "Replayable run state",
      "Audit readiness + ledger",
    ],
    highlight: true,
  },
] as const;

const INSTALL_BLOCKS = [
  {
    label: "curl",
    command:
      "curl -fsSL https://raw.githubusercontent.com/ShaileshRawat1403/dax/main/script/install.sh | DAX_REPO=ShaileshRawat1403/dax bash",
  },
  {
    label: "brew",
    command: "brew install ShaileshRawat1403/tap/dax",
  },
  {
    label: "winget",
    command: "winget install DaxAi.DAX",
  },
  {
    label: "demo",
    command: "bun run demo:proof-ladder",
  },
] as const;

const EVIDENCE = [
  {
    src: "/images/dax/v2-home.jpg",
    alt: "The DAX 2.0 home screen: the DAX wordmark, project, branch and model, the ask box, and quick-start actions to plan a fix, explore the repo or read the docs",
    caption: "Home: project, branch, model and the ask box",
  },
  {
    src: "/images/dax/v2-worker-contract.jpg",
    alt: "The card DAX shows before it launches a governed worker: agent, task, risk, isolation, allowed network hosts, write scope, forbidden paths and the verify command, then Enter to start or Ctrl-C to abort",
    caption: "A worker's contract, shown before it starts",
  },
  {
    src: "/images/dax/v2-connect.jpg",
    alt: "The DAX connect dialog, offering a governed worker that uses a signed-in account and core model providers",
    caption: "Connect a model or a governed worker",
  },
] as const;

export default function DaxLanding() {
  return (
    <div className="dax-page relative w-full max-w-[1080px] mx-auto">
      {/* Hero: deadpan cinema (contract layers / ASK) */}
      <header className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(280px,380px)] items-center gap-10 lg:gap-14 pt-10 lg:pt-6 pb-14 border-b border-[color:var(--card-border)]">
        <div className="flex flex-col gap-5 lg:pr-4 min-w-0">
          <a href="/stack/" className="self-start font-mono text-xs text-[color:var(--text-muted)] hover:text-[color:var(--text-primary)] underline-offset-4 hover:underline">
            <span aria-hidden="true">&larr;</span> Stack
          </a>
          <div className="flex items-center gap-2">
            <span className="h-px w-8 bg-[color:var(--accent-amber)]" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-[color:var(--text-muted)]">
              {VERSION} · Open source · MIT
            </span>
          </div>
          <h1 className="font-heading text-4xl sm:text-[2.65rem] font-black tracking-tight leading-[1.12] text-[color:var(--text-primary)] max-w-[17.5ch]">
            A deterministic contract around stochastic model execution
          </h1>
          <p className="text-base sm:text-lg leading-relaxed max-w-[40ch] text-[color:var(--text-secondary)]">
            DAX is a governed execution workstation. It puts policy, approvals, replay and audit around the model, so a coding agent can propose anything and change only what passes.
          </p>
          <div className="flex flex-wrap gap-3 items-center">
            <a
              href={RELEASE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-premium btn-primary"
            >
              Install DAX
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-premium btn-secondary"
            >
              View on GitHub
            </a>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {["Local-first", "HITL required", "Rust proof ladder", "Bun"].map((chip) => (
              <span
                key={chip}
                className="inline-flex items-center px-2.5 py-1 rounded-[3px] border border-[color:var(--card-border)] bg-[color:var(--bg-elevated)] font-mono text-[11px] text-[color:var(--text-secondary)]"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
        <DaxHeroCinema />
      </header>

      {/* Outcomes */}
      <section id="outcomes">
        <p className="dax-section-label">Outcomes</p>
        <h2 className="dax-section-title">What DAX changes in the run</h2>
        <p className="dax-section-lede">
          Govern what changes, keep the trail, and leave evidence, without turning the run into a chat log you have to dig through later.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {OUTCOMES.map((o) => (
            <GlowCard key={o.num} accent={o.accent} pad="p-5" className="gap-3">
              <div className="font-mono text-[11px] tracking-wider text-[color:var(--text-muted)]">{o.num}</div>
              <h3 className="font-heading text-base font-bold text-[color:var(--text-primary)]">{o.title}</h3>
              <p className="text-sm leading-relaxed text-[color:var(--text-secondary)]">{o.body}</p>
            </GlowCard>
          ))}
        </div>
      </section>

      {/* What changed in 2.0 */}
      <section id="two">
        <p className="dax-section-label">New in 2.0</p>
        <h2 className="dax-section-title">A run does only what was approved</h2>
        <p className="dax-section-lede">
          DAX 2.0 adds reviewed runs: the permissions are approved before the run starts, and anything they do not
          cover is refused on the record. Scroll through one.
        </p>
        <SceneVisual
          sceneId="dax-reviewed-run"
          alt="A grant sheet lists read, edit src and run tests. An operator stamps it approved. The run lights up only once it is started. A shell request the grant does not cover is stamped denied, and the ledger records the denial."
          steps={REVIEWED_RUN_STEPS}
          drawing={ReviewedRunScene}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mt-10">
          {ALSO_IN_2.map((item) => (
            <GlowCard key={item.title} accent="var(--accent-amber)" pad="p-5" className="gap-2">
              <h3 className="font-heading text-[14.5px] font-bold tracking-tight text-[color:var(--text-primary)]">
                {item.title}
              </h3>
              <p className="text-[13px] leading-relaxed text-[color:var(--text-secondary)]">{item.body}</p>
            </GlowCard>
          ))}
        </div>
        <p className="mt-6 text-sm text-[color:var(--text-muted)] max-w-[60ch]">
          Reviewed runs cover a compiled DAX binary and remote MCP servers the operator acknowledges. Plugins, local MCP
          servers, workers and verifiers cannot be bound in a reviewed run, so they are refused there. Details in
          the{" "}
          <a
            href={`${GITHUB_URL}/blob/${PEG_SHA}/CHANGELOG.md`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[color:var(--accent-amber)] underline-offset-2 hover:underline"
          >
            changelog
          </a>
          .
        </p>
      </section>

      {/* RAO tour */}
      <section id="tour" className="!border-b border-[color:var(--card-border)]">
        <p className="dax-section-label">Product tour</p>
        <h2 className="dax-section-title">RAO: intent, run, audit, override</h2>
        <p className="dax-section-lede">
          A scripted walkthrough of how DAX pauses risky writes, records a verification receipt, and branches on approve or deny. It runs in your browser; nothing is sent to a server.
        </p>
        <RaoTour />
      </section>

      {/* Proof ladder */}
      <section id="proof">
        <p className="dax-section-label">Proof ladder</p>
        <h2 className="dax-section-title">Rust decides deterministic facts</h2>
        <p className="dax-section-lede">
          Five crates form the ladder from replay to ledger. Orchestration stays in TypeScript; proofs stay offline and local.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(220px,280px)] gap-8 items-start">
          <div className="order-2 lg:order-1 flex flex-col gap-4">
            <div className="overflow-x-auto rounded-[3px] border border-[color:var(--card-border)]">
              <table className="w-full text-[14.5px] border-collapse">
                <thead>
                  <tr className="bg-[color:var(--bg-elevated)]">
                    <th className="text-left px-[18px] py-[15px] font-mono text-[11px] uppercase tracking-wider text-[color:var(--text-muted)] font-medium border-b border-[color:var(--card-border)]">
                      Crate
                    </th>
                    <th className="text-left px-[18px] py-[15px] font-mono text-[11px] uppercase tracking-wider text-[color:var(--text-muted)] font-medium border-b border-[color:var(--card-border)]">
                      Role
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {CRATES.map((c) => (
                    <tr key={c.name} className="hover:bg-[color:var(--bg-elevated)] transition-colors">
                      <td className="px-[18px] py-[15px] font-mono text-[13px] text-[color:var(--accent-amber)] whitespace-nowrap border-b border-[color:var(--card-border)] w-40">
                        {c.name}
                      </td>
                      <td className="px-[18px] py-[15px] text-[color:var(--text-secondary)] border-b border-[color:var(--card-border)]">
                        {c.role}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="rounded-[4px] border border-[color:var(--card-border)] bg-[color:var(--card-bg)] px-[22px] py-[18px] text-[14.5px] text-[color:var(--text-primary)]">
              <strong className="text-[color:var(--accent-amber)]">Boundary:</strong> TypeScript orchestrates. Rust
              decides deterministic facts.
            </div>
            <p className="font-mono text-xs text-[color:var(--text-muted)] m-0">
              Peg note: pinned to commit{" "}
              <a
                href={`${GITHUB_URL}/tree/${PEG_SHA}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[color:var(--accent-amber)] break-all underline-offset-2 hover:underline"
              >
                {PEG_SHA}
              </a>{" "}
              ({VERSION})
            </p>
          </div>
          <div className="order-1 lg:order-2">
            <CrateCascade />
          </div>
        </div>
      </section>

      {/* Contrast */}
      <section id="contrast">
        <p className="dax-section-label">Contrast</p>
        <h2 className="dax-section-title">Where DAX sits among peers</h2>
        <p className="dax-section-lede">
          Same class of tools, different posture on pausing, evidence and replay. As of {VERSION}.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {CONTRAST.map((col) => (
            <div key={col.title} className={col.highlight ? "dax-contrast-dax h-full rounded-[4px]" : "h-full"}>
              <GlowCard
                accent={col.highlight ? "var(--accent-amber)" : "var(--accent-blue)"}
                pad="p-5"
                className="gap-3"
              >
                <h3
                  className={`font-heading text-[14.5px] font-bold tracking-tight ${
                    col.highlight ? "text-[color:var(--accent-amber)]" : "text-[color:var(--text-primary)]"
                  }`}
                >
                  {col.title}
                </h3>
                <ul className="list-none m-0 p-0 text-[13px] text-[color:var(--text-secondary)]">
                  {col.items.map((item) => (
                    <li
                      key={item}
                      className="py-1.5 border-b border-[color:var(--card-border)] last:border-0 leading-snug"
                    >
                      {col.highlight ? (
                        <>
                          <span className="text-[color:var(--accent-amber)] mr-1">✓</span>
                          {item}
                        </>
                      ) : (
                        item
                      )}
                    </li>
                  ))}
                </ul>
              </GlowCard>
            </div>
          ))}
        </div>
      </section>

      {/* Install */}
      <section id="install" className="scroll-mt-28">
        <p className="dax-section-label">Try / install</p>
        <h2 className="dax-section-title">Get DAX on the machine</h2>
        <p className="dax-section-lede">
          Install paths and a local proof-ladder demo. Blocks are copyable; paste into your terminal when ready.
        </p>
        <div className="grid gap-3.5">
          {INSTALL_BLOCKS.map((b) => (
            <CopyCommand key={b.label} label={b.label} command={b.command} />
          ))}
        </div>
        <p className="mt-4 text-sm text-[color:var(--text-muted)]">
          Prefer a release asset?{" "}
          <a
            href={RELEASE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[color:var(--accent-amber)] underline-offset-2 hover:underline"
          >
            Download {VERSION}
          </a>
          .
        </p>
      </section>

      {/* Evidence */}
      <section id="evidence">
        <p className="dax-section-label">Evidence stills</p>
        <h2 className="dax-section-title">What the workstation looks like</h2>
        <p className="dax-section-lede">
          Screens from DAX 2.0.1, captured from the release binary in a sample repo: the home screen, a worker&rsquo;s contract before launch, and the connect dialog.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {EVIDENCE.map((e) => (
            <figure
              key={e.src}
              className="m-0 rounded-[4px] border border-[color:var(--card-border)] bg-[color:var(--card-bg)] overflow-hidden hover:border-[color:var(--accent-amber)] transition-colors"
            >
              {/* Opens full size: terminal text is too small to read in the thumbnail. */}
              <a href={e.src} target="_blank" rel="noopener noreferrer" className="block" aria-label={`${e.caption} (full size)`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={e.src}
                  alt={e.alt}
                  width={800}
                  height={500}
                  className="block w-full h-auto aspect-[16/10] object-cover object-top bg-[color:var(--bg-elevated)]"
                  loading="lazy"
                />
              </a>
              <figcaption className="font-mono text-[11px] text-[color:var(--text-muted)] px-3.5 py-2.5 border-t border-[color:var(--card-border)]">
                {e.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Trust footer strip (page-local; site Footer still renders) */}
      <footer className="py-14 !border-0">
        <p className="text-[13.5px] leading-relaxed text-[color:var(--text-muted)] max-w-[52ch] mb-4">
          MIT. Session data and keys stay local unless you connect a provider. Always review critical actions. HITL
          required.
        </p>
        <div className="flex flex-wrap gap-5 text-[13px]">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[color:var(--accent-amber)] hover:underline underline-offset-2"
          >
            GitHub
          </a>
          <a
            href={RELEASE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[color:var(--accent-amber)] hover:underline underline-offset-2"
          >
            Release {VERSION}
          </a>
          <a
            href={`${GITHUB_URL}/tree/${PEG_SHA}/docs`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[color:var(--accent-amber)] hover:underline underline-offset-2"
          >
            Docs
          </a>
        </div>
      </footer>
    </div>
  );
}
