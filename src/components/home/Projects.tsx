import ProjectInspector, { ProjectItem } from "./ProjectInspector";

const FEATURED_PROJECTS: ProjectItem[] = [
  {
    title: "DAX: Governed Execution Workstation",
    role: "Creator · Runtime Workstation",
    status: "v1.3.0 · Active",
    summary:
      "Deterministic runtime contract around stochastic model execution. Wraps agent actions in approval boundaries, structured replay logs, and audit controls.",
    href: "https://github.com/ShaileshRawat1403/dax",
    tabs: [
      {
        title: "Contract",
        filename: "dax.contract.json",
        lines: [
          "{",
          '  "contractVersion": "1.3.0",',
          '  "target": "workspace-evaluator",',
          '  "governance": {',
          '    "approvalMode": "require_diff_review",',
          '    "sandbox": "isolated_process",',
          '    "replayable": true',
          "  },",
          '  "boundary": {',
          '    "readOnlyRoots": ["/src", "/tests"],',
          '    "mutablePaths": ["/output/patch.diff"]',
          "  }",
          "}",
        ],
      },
      {
        title: "Event Stream",
        filename: "execution.ndjson",
        lines: [
          '{"event":"contract_init","version":"1.3.0","workspace":"repo_eval"}',
          '{"event":"boundary_check","path":"/src/core.rs","action":"read_only"}',
          '{"event":"approval_requested","action":"apply_patch","risk":"medium"}',
          '{"event":"approval_granted","actor":"operator","audit_id":"evt_892"}',
          '{"event":"state_snapshot","hash":"sha256:d8a20f","status":"clean"}',
        ],
      },
      {
        title: "Recovery",
        filename: "recovery.ts",
        lines: [
          'import { ExecutionBoundary, ReplayLog } from "@dax/runtime";',
          "",
          "export async function recoverSession(logPath: string) {",
          "  const replay = await ReplayLog.load(logPath);",
          "  const checkpoint = replay.lastVerifiedCheckpoint();",
          "  return ExecutionBoundary.restore(checkpoint, {",
          "    isolateNetwork: true,",
          "    requireOperatorSignoff: true,",
          "  });",
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
      "The control layer around coding agents. The agents generate, while Verb owns the execution environment, durable session records, and recovery when something breaks.",
    href: "https://github.com/ShaileshRawat1403/verb",
    tabs: [
      {
        title: "PTY Session",
        filename: "verb session",
        lines: [
          "$ verb run --agent codex --cwd ./services/auth",
          "[verb] PTY supervisor initialized (pid: 48102)",
          "[verb] attached stdio tap: capturing raw terminal stream",
          "[verb] context boundary: 3 files mounted in read-write sandbox",
          "[verb] checkpoint saved: session_2026_09a (.vcont)",
          "[verb] agent issued shell command: `cargo test --lib`",
        ],
      },
      {
        title: "Continuity",
        filename: "session.vcont",
        lines: [
          "{",
          '  "version": 1,',
          '  "sessionId": "sess_89104",',
          '  "engine": "verb-pty-supervisor",',
          '  "checkpoints": [',
          '    { "step": 1, "action": "env_bootstrap", "exitCode": 0 },',
          '    { "step": 2, "action": "patch_apply", "files": ["src/lib.rs"] },',
          '    { "step": 3, "action": "test_verification", "status": "pass" }',
          "  ]",
          "}",
        ],
      },
      {
        title: "Recovery",
        filename: "verb recover",
        lines: [
          "$ verb recover --from sess_89104 --step 2",
          "[verb] inspecting checkpoint integrity: verified sha256",
          "[verb] rolling back uncommitted working tree mutations",
          "[verb] restoring environment snapshot to step 2",
          "[verb] terminal PTY resumed at clean baseline",
        ],
      },
    ],
  },
  {
    title: "PaneTera: Workspace Control Plane",
    role: "Creator · Developer Control Plane",
    status: "v0.1.0 · Developer Preview",
    summary:
      "Local-first developer control plane to govern, inspect, and explore workspaces using the Model Context Protocol (MCP).",
    href: "https://github.com/ShaileshRawat1403/panetera",
    tabs: [
      {
        title: "Policy",
        filename: "myai-policy.json",
        lines: [
          "{",
          '  "$schema": "./schemas/panetera-policy-v1.json",',
          '  "mode": "enforcing",',
          '  "rules": [',
          "    {",
          '      "server": "filesystem-mcp",',
          '      "allowedPaths": ["/Users/work/project"],',
          '      "readOnly": true',
          "    },",
          "    {",
          '      "server": "git-mcp",',
          '      "requireApproval": ["push", "reset", "rebase"]',
          "    }",
          "  ]",
          "}",
        ],
      },
      {
        title: "MCP Adapter",
        filename: "panetera.config.json",
        lines: [
          "{",
          '  "servers": {',
          '    "filesystem": {',
          '      "transport": "stdio",',
          '      "command": "mcp-server-filesystem",',
          '      "args": ["/Users/work/project"]',
          "    }",
          "  },",
          '  "auditTrail": {',
          '    "enabled": true,',
          '    "destination": "./audit.log"',
          "  }",
          "}",
        ],
      },
      {
        title: "Audit Trail",
        filename: "audit.log",
        lines: [
          "[2026-09-08T10:14:02Z] SERVER_ATTACH server=filesystem transport=stdio",
          "[2026-09-08T10:14:03Z] POLICY_CHECK tool=list_directory path=/src ALLOWED",
          "[2026-09-08T10:14:05Z] TOOL_INVOKE tool=read_file path=/src/index.ts",
          "[2026-09-08T10:14:08Z] POLICY_BLOCKED tool=delete_file path=/src/core.ts REASON=read_only",
        ],
      },
    ],
  },
  {
    title: "Soothsayer: Governed AI Operator Plane",
    role: "Creator · Operator Workstation",
    status: "Operator Plane",
    summary:
      "Governed AI operator plane and workstation surface for conversational assistance, operator context, risk-based approval triage, and decision visibility.",
    href: "https://github.com/ShaileshRawat1403/soothsayer",
    tabs: [
      {
        title: "Approval Triage",
        filename: "triage-inbox.json",
        lines: [
          "{",
          '  "inboxId": "inbox_soothsayer_main",',
          '  "pendingDecisions": [',
          "    {",
          '      "id": "dec_401",',
          '      "riskLevel": "high",',
          '      "sourceAgent": "orchestrator",',
          '      "action": "database_schema_migration",',
          '      "requiresHumanSignoff": true',
          "    }",
          "  ]",
          "}",
        ],
      },
      {
        title: "Replay",
        filename: "stage-replay.ts",
        lines: [
          'import { OperatorStage } from "@soothsayer/runtime";',
          "",
          "export async function inspectOperatorDecision(decisionId: string) {",
          "  const stage = await OperatorStage.load(decisionId);",
          "  const promptContext = stage.capturedContext();",
          "  const candidateActions = stage.evaluatedAlternatives();",
          "  return { promptContext, candidateActions, signoff: stage.approvalState() };",
          "}",
        ],
      },
      {
        title: "Routing",
        filename: "routing.config.yaml",
        lines: [
          "operator:",
          "  defaultMode: supervised",
          "  inboxTriage: enabled",
          "routes:",
          '  - pattern: "infra/*"',
          "    policy: require_explicit_approval",
          '  - pattern: "queries/*"',
          "    policy: auto_execute_read_only",
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
            Interactive code sandboxes · 1-click copy
          </span>
        </div>

        <ProjectInspector projects={FEATURED_PROJECTS} />
      </div>
    </section>
  );
}
