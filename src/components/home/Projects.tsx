import ProjectInspector, { ProjectItem } from "./ProjectInspector";

const FEATURED_PROJECTS: ProjectItem[] = [
  {
    title: "DAX: Governed Execution Workstation",
    role: "Creator · Runtime Workstation",
    status: "v1.3.0 · Active",
    summary:
      "Deterministic runtime contract around stochastic model execution. Sits between the operator and model providers to provide policy checks, replay, and audit logs.",
    boundary:
      "Pure proof library crates in Rust with no I/O, accompanied by JSON stdio sidecar binaries. TypeScript orchestrates; Rust decides deterministic facts.",
    href: "https://github.com/ShaileshRawat1403/dax",
    tabs: [
      {
        title: "Crates",
        filename: "crates/README.md",
        ref: "9acb5dc",
        sourceUrl: "https://github.com/ShaileshRawat1403/dax/blob/9acb5dc/crates/README.md",
        lines: [
          "# DAX Rust Crates",
          "",
          "DAX uses Rust only for deterministic proof surfaces around stochastic model execution.",
          "",
          "| Crate | Purpose |",
          "| ----- | ------- |",
          "| `dax-core` | Replays canonical run events to reconstruct run state; generates deterministic proof reports |",
          "| `dax-policy` | Evaluates proposed actions against policy context into `allow / ask / deny` decisions |",
          "| `dax-audit` | Evaluates trust posture from six structured run signals |",
          "| `dax-ledger` | Builds and verifies tamper-evident append-only ledger chains |",
          "| `dax-indexer` | Builds deterministic local repo structure indexes for context selection |",
          "",
          "TypeScript orchestrates. Rust decides deterministic facts.",
        ],
      },
      {
        title: "Config",
        filename: "dax.jsonc",
        ref: "9acb5dc",
        sourceUrl: "https://github.com/ShaileshRawat1403/dax/blob/9acb5dc/dax.jsonc",
        lines: [
          "{",
          '  "$schema": "https://dax.ai/config.json",',
          "",
          "  // Ship a small first-party skill set with the repo so the skills surface",
          "  // provides value out of the box instead of appearing empty.",
          '  "skills": {',
          '    "paths": ["./skills"]',
          "  }",
          "}",
        ],
      },
    ],
  },
  {
    title: "Verb: Control Layer for Coding Agents",
    role: "Creator · Agent Control Layer",
    status: "Developer Preview",
    summary:
      "The control layer around coding agents. The agents generate; Verb owns the environment they run in, the record of what actually happened, and the way back when something breaks.",
    boundary:
      "Structural memory, not surveillance. Durable records hold identity, context and state. Never command text, terminal bytes, prompts, transcripts or credentials.",
    href: "https://github.com/ShaileshRawat1403/verb",
    tabs: [
      {
        title: "Contract",
        filename: "README.md",
        ref: "77cc07f",
        sourceUrl: "https://github.com/ShaileshRawat1403/verb/blob/77cc07f/README.md",
        lines: [
          "* **Sessions that survive process death.** A session keeps its identity across an agent exiting, the",
          "  app being force-stopped, and the machine losing the process entirely - then resumes by the agent's",
          "  *own* conversation id. Proven end to end on a physical Android device for Claude and Codex.",
          "* **Two hosts, one contract.** Android (proot + PTY) and desktop (native Unix PTY) implement the same",
          "  session semantics and the same durable record shape.",
          "* **Structural memory, not surveillance.** Durable records hold identity, context and state. Never a",
          "  PID, process handle, command text, terminal bytes, prompts, transcripts or credentials.",
          "* **One session lifecycle, three recovery-capable agents.** `LIVE -> INTERRUPTED -> RECOVERABLE ->",
          "  ENDED` is implemented for Claude Code, Codex CLI and OpenCode.",
        ],
      },
      {
        title: "Positioning",
        filename: "docs/POSITIONING.md",
        ref: "77cc07f",
        sourceUrl: "https://github.com/ShaileshRawat1403/verb/blob/77cc07f/docs/POSITIONING.md",
        lines: [
          "## 2. What Verb is not",
          "",
          "Stated plainly, because each of these is a comparison a reader will make in the first ten seconds,",
          "and being the wrong thing badly is worse than being a narrower thing well.",
          "",
          "| Verb is not | Because |",
          "| :--- | :--- |",
          "| A coding agent | It contains no model and writes no code. It runs the agents you already use. |",
          "| A model provider | The assistant is optional and replaceable. The context it answers from is the product. |",
        ],
      },
    ],
  },
  {
    title: "PaneTera: Workspace Control Plane",
    role: "Creator · Developer Control Plane",
    status: "v0.1.0 · Developer Preview",
    summary:
      "Local-first developer control plane designed to govern, inspect, and explore workspaces using the Model Context Protocol (MCP).",
    boundary:
      "Version 0.1.0 freezes a read-only local execution environment. Guarantees the agent and portal can explore file structures without writing files, modifying code, or executing shell commands.",
    href: "https://github.com/ShaileshRawat1403/panetera",
    tabs: [
      {
        title: "Architecture",
        filename: "ARCHITECTURE.md",
        ref: "4b9f5d7",
        sourceUrl: "https://github.com/ShaileshRawat1403/panetera/blob/4b9f5d7/ARCHITECTURE.md",
        lines: [
          "## System Diagram",
          "[Portal UI (Browser)]",
          "       │ (Fetch API + SSE / Bearer token auth)",
          "       ▼",
          "[Express Backend Server (Port 4000)]",
          "       │",
          "       ├─► [Host Policy Engine (myai-policy.json)] (Authoritative check)",
          "       ├─► [Workspace Catalog (myai-workspaces.json)] (State check)",
          "       ├─► [Append-only Logger (server/audit.log)]",
          "       │",
          "       ▼ (stdio spawn / tsx server/mcpWorkspaceServer.ts)",
          "[Workspace stdio MCP Process] (Bound to selected workspace directory)",
        ],
      },
      {
        title: "Contract",
        filename: "README.md",
        ref: "4b9f5d7",
        sourceUrl: "https://github.com/ShaileshRawat1403/panetera/blob/4b9f5d7/README.md",
        lines: [
          "## Key Features in V1",
          "* **Separate Governance Contracts**: Segregates workspace states (`myai-workspaces.json`), manifest schemas (`myai-manifest.json`), and host-enforced permissions (`myai-policy.json`).",
          "* **Authoritative Policy Wrapping**: Every file listing or read request is vetted by the host policy engine before hitting workspace processes.",
          "* **Append-Only Audit Trail**: Structured event tracking (allowed/denied operations, lifecycle starts, policy violations) logged to `server/audit.log`.",
          "* **Standardized stdio MCP Adapters**: Spawns isolated subprocesses per enabled workspace root to answer queries safely.",
        ],
      },
    ],
  },
  {
    title: "Soothsayer: Governed AI Operator Plane",
    role: "Creator · Operator Workstation",
    status: "Operator Plane",
    summary:
      "DAX-first governed AI operator plane and workstation surface for conversational assistance, autonomous action, enterprise control, and decision visibility.",
    boundary:
      "Normal assistant conversations start on the DAX path by default, promoting requests into governed live runs when execution is needed. Direct model providers remain available only as advanced fallback overrides.",
    href: "https://github.com/ShaileshRawat1403/soothsayer",
    tabs: [
      {
        title: "Philosophy",
        filename: "README.md",
        ref: "601ee19",
        sourceUrl: "https://github.com/ShaileshRawat1403/soothsayer/blob/601ee19/README.md",
        lines: [
          "## Platform Philosophy",
          "",
          "Soothsayer is not just a chatbot; it is a **DAX (Distributed Autonomous eXecution) Control Plane**. Normal assistant conversations now start on the DAX path by default, and the workstation promotes requests into governed live runs when execution is needed. Direct model providers remain available only as advanced fallback overrides.",
        ],
      },
      {
        title: "Pillars",
        filename: "README.md",
        ref: "601ee19",
        sourceUrl: "https://github.com/ShaileshRawat1403/soothsayer/blob/601ee19/README.md",
        lines: [
          "### Core Pillars",
          "",
          "1.  **Autonomous Execution (DAX)**: Real-world action via the DAX Engine, capable of complex multi-step tasks.",
          "2.  **Operator Authority**: A high-fidelity professional UI designed for triage and rapid decision-making.",
          "3.  **Governance V2**: Fine-grained control over DAX-first assistant routing, behavioral personas, and risk-based approval gates.",
          "4.  **Audit Integrity**: Immutable signal trails and stage-based replays for every execution path.",
        ],
      },
    ],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-28 w-full border-b border-[#EAE8E2] bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-16">
        <div className="flex justify-between items-end mb-8 flex-wrap gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#8A8780]">
              BENCH // CODE & HARNESSES
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[#121212]">
              Governed runtimes and execution harnesses.
            </h2>
          </div>
          <span className="font-mono text-xs text-[#7A7872]">
            Repository excerpts with commit provenance · Click to copy
          </span>
        </div>

        <ProjectInspector projects={FEATURED_PROJECTS} />
      </div>
    </section>
  );
}
