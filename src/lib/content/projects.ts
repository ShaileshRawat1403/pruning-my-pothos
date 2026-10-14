// Active project material, shared by the homepage Stack section and
// the /stack route so both render from one declaration rather than
// two copies that can drift. Repository excerpts carry their own commit ref.
import type { ProjectItem } from "../../components/home/ProjectInspector";

export const CURRENT_WORK_PROJECTS: ProjectItem[] = [
  {
    title: "DAX: Governed Execution Workstation",
    role: "Creator · Runtime Workstation",
    status: "v2.0.1 · Active",
    summary:
      "Deterministic runtime contract around stochastic model execution. Sits between the operator and model providers with policy checks, reviewed permissions, replay and audit logs.",
    boundary:
      "Pure proof library crates in Rust with no I/O, accompanied by JSON stdio sidecar binaries. TypeScript orchestrates; Rust decides deterministic facts.",
    href: "/stack/dax/",
    tabs: [
      {
        title: "Crates",
        filename: "crates/README.md",
        ref: "fe911e57415dcfa9d101bd2584b28d2ea3c84694",
        sourceUrl: "https://github.com/ShaileshRawat1403/dax/blob/fe911e57415dcfa9d101bd2584b28d2ea3c84694/crates/README.md",
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
        title: "2.0",
        filename: "CHANGELOG.md",
        ref: "fe911e57415dcfa9d101bd2584b28d2ea3c84694",
        sourceUrl: "https://github.com/ShaileshRawat1403/dax/blob/fe911e57415dcfa9d101bd2584b28d2ea3c84694/CHANGELOG.md",
        lines: [
          "- **Workspace trust now covers a repository's tool files.** `.dax/tool` and",
          "  `.dax/tools` files were imported the first time tools were discovered, in a",
          "  worktree the operator had never trusted, so a cloned repository could run code",
          "  with the operator's full access. They are now withheld with the repository's",
          "  plugins, local MCP servers and dependency installs until `dax trust` approves",
          "  them. Approval is bound to each file's path and content, including helper files",
          "  beside the tools: adding, editing or removing one withholds that project's",
          "  tools until it is reviewed again. A tool folder or file that cannot be read",
          "  withholds the project's executable configuration and cannot be approved. Tools",
          "  in the operator's own global, home and `DAX_CONFIG_DIR` directories load as",
          "  before.",
        ],
      },
    ],
  },
  {
    title: "LanguageOps: Governed Writing Refinement",
    role: "Creator · Language Runtime",
    status: "Public release candidate",
    summary:
      "Finds formulaic, AI-associated writing patterns without a model, then rewrites under a contract that names what must go and what must survive, checks the result and escalates what fails.",
    boundary:
      "It identifies writing patterns; it does not determine authorship. The runtime is private; the excerpts below come from its public Agent Skill.",
    href: "/stack/languageops/",
    tabs: [
      {
        title: "Contract",
        filename: "SKILL.md",
        ref: "c3546ccb4fb845b1ad862ea7750eadeca957fd02",
        sourceUrl: "https://github.com/ShaileshRawat1403/languageops-natural-response/blob/c3546ccb4fb845b1ad862ea7750eadeca957fd02/SKILL.md",
        lines: [
          "## Procedure",
          "1.  **Identify Intent**: Determine the user's primary communication intent (e.g., answer, explain, rewrite, or respond professionally).",
          "2.  **Select Recipe**: Match the intent and active context profile to the corresponding recipe in `references/recipes.md`.",
          "3.  **Map What Must Survive**: Before touching anything, list the facts, commitments, numbers, caveats, and earned structural devices in the original. These are invariants.",
        ],
      },
      {
        title: "Patterns",
        filename: "references/anti-patterns.md",
        ref: "c3546ccb4fb845b1ad862ea7750eadeca957fd02",
        sourceUrl: "https://github.com/ShaileshRawat1403/languageops-natural-response/blob/c3546ccb4fb845b1ad862ea7750eadeca957fd02/references/anti-patterns.md",
        lines: [
          "### A. delve-reliance",
          "*   **Description**: High-frequency use of the verb \"delve\" instead of simpler words.",
          "*   **Avoidance**: Use: *explore, study, read, inspect*.",
          "",
          "### B. tapestry-metaphor",
          "*   **Description**: Overuse of structural metaphors like \"tapestry,\" \"beacon,\" \"testament,\" \"journey,\" or \"landscape.\"",
          "*   **Avoidance**: Describe connections or states literally.",
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
        ref: "4b9f5d7fbbfffb8208c2e8b78ffb1d04de81b554",
        sourceUrl: "https://github.com/ShaileshRawat1403/panetera/blob/4b9f5d7fbbfffb8208c2e8b78ffb1d04de81b554/ARCHITECTURE.md",
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
        ref: "4b9f5d7fbbfffb8208c2e8b78ffb1d04de81b554",
        sourceUrl: "https://github.com/ShaileshRawat1403/panetera/blob/4b9f5d7fbbfffb8208c2e8b78ffb1d04de81b554/README.md",
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
];
