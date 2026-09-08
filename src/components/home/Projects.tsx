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
        lines: [
          "# DAX Rust Crates",
          "",
          "DAX uses Rust only for deterministic proof surfaces around stochastic model execution.",
          "",
          "| Crate | Purpose |",
          "| `dax-core` | Replays canonical run events; generates proof reports |",
          "| `dax-policy` | Evaluates proposed actions against policy into allow / ask / deny |",
          "| `dax-audit` | Evaluates trust posture from six structured run signals |",
          "| `dax-ledger` | Builds and verifies tamper-evident append-only ledger chains |",
          "",
          "TypeScript orchestrates. Rust decides deterministic facts.",
        ],
      },
      {
        title: "Config",
        filename: "dax.jsonc",
        ref: "9acb5dc",
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
        lines: [
          "* Sessions that survive process death. A session keeps its identity across",
          "  an agent exiting, force-stop, and process loss, then resumes by the",
          "  agent's own conversation id. Proven on physical device for Claude and Codex.",
          "",
          "* Two hosts, one contract. Android (proot + PTY) and desktop (native Unix PTY)",
          "  implement the same session semantics and durable record shape.",
          "",
          "* Structural memory, not surveillance. Durable records hold identity, context",
          "  and state. Never command text, terminal bytes, prompts, transcripts or credentials.",
        ],
      },
      {
        title: "Positioning",
        filename: "docs/POSITIONING.md",
        ref: "77cc07f",
        lines: [
          "## What Verb is not",
          "",
          "Stated plainly, because each of these is a comparison a reader will make:",
          "",
          "| Verb is not | Because |",
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
        lines: [
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
        lines: [
          "# MyAI Portal: Read-Only Mission Control (v0.1.0)",
          "",
          "* Separate Governance Contracts: workspace states (myai-workspaces.json),",
          "  manifest schemas (myai-manifest.json), and host policy (myai-policy.json).",
          "* Authoritative Policy Wrapping: every read request is vetted by host policy.",
          "* Append-Only Audit Trail: structured event tracking logged to server/audit.log.",
          "* Standardized stdio MCP Adapters: isolated subprocesses per workspace root.",
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
        lines: [
          "# The Soothsayer",
          "",
          "DAX-first governed AI operator plane for conversational assistance,",
          "autonomous action, enterprise control, and decision visibility.",
          "",
          "Normal assistant conversations start on the DAX path by default, and the",
          "workstation promotes requests into governed live runs when execution is needed.",
          "Direct model providers remain available only as advanced fallback overrides.",
        ],
      },
      {
        title: "Pillars",
        filename: "README.md",
        lines: [
          "### Core Pillars",
          "",
          "1. Autonomous Execution (DAX): Real-world action via the DAX Engine.",
          "2. Operator Authority: UI designed for triage and rapid decision-making.",
          "3. Governance V2: Control over assistant routing and risk-based approval gates.",
          "4. Audit Integrity: Immutable signal trails and stage-based replays.",
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
