"use client";

import { useState } from "react";
import Link from "next/link";

interface AnnotationDetail {
  id: string;
  stepNumber: number;
  title: string;
  desc: string;
  tag: string;
  color: string;
  metric: string;
}

const ANNOTATIONS: AnnotationDetail[] = [
  {
    id: "notice",
    stepNumber: 1,
    title: "1. Notice the Signals",
    desc: "Filtering the daily firehose of AI announcements to isolate genuinely novel architectures.",
    tag: "DISCOVERY",
    color: "#16A34A",
    metric: "Signal: 12% novel",
  },
  {
    id: "try",
    stepNumber: 2,
    title: "2. Sandbox Trial",
    desc: "Spinning up local benchmarks, CLI sandbox stress tests, and context token measurements.",
    tag: "BENCHMARK",
    color: "#16A34A",
    metric: "Eval: 180ms latency",
  },
  {
    id: "noise",
    stepNumber: 3,
    title: "Pruned: Superficial Abstractions",
    desc: "Trimming speculative hype, ungrounded abstractions, and brittle prompt chains to keep systems grounded.",
    tag: "PRUNED ✕",
    color: "#DC2626",
    metric: "Pruned: 88% noise",
  },
  {
    id: "understand",
    stepNumber: 4,
    title: "3. Deconstruct Boundaries",
    desc: "Unpacking memory compaction limits, prompt degradation, and fragile runtime assumptions.",
    tag: "ANALYSIS",
    color: "#16A34A",
    metric: "Saved: 42% context",
  },
  {
    id: "apply",
    stepNumber: 5,
    title: "4. Production Adoption",
    desc: "Integrating verified patterns, review gates, and typed schemas into real shipping workflows.",
    tag: "EXECUTION",
    color: "#16A34A",
    metric: "Gate: 99.4% accuracy",
  },
  {
    id: "useful",
    stepNumber: 6,
    title: "Retained: Durable Value",
    desc: "What survives: resilient, tested engineering primitives with proven ROI in production systems.",
    tag: "VERIFIED ✓",
    color: "#16A34A",
    metric: "Status: Production Ready",
  },
];

const AUDITED_SYSTEMS_COUNT = 58;
const VERIFIED_TOOLS_COUNT = 14;

const FEATURED_PROJECTS = [
  {
    title: "DAX: Declarative Agent Executables",
    role: "Core Contributor · Open Source",
    status: "v0.8.2 · Active",
    summary:
      "A deterministic runtime for agentic workflows with explicit verification gates and context compaction.",
    href: "https://github.com/ShaileshRawat1403/dax",
    stars: "1.4k",
    tabs: [
      {
        title: "Config",
        filename: "dax.config.ts",
        lines: [
          "export default defineConfig({",
          "  agent: 'coding-assistant',",
          "  contextWindow: {",
          "    maxTokens: 128_000,",
          "    pruningStrategy: 'hierarchical',",
          "  },",
          "  verification: {",
          "    runOnStep: ['lint', 'typecheck', 'test'],",
          "    failFast: true,",
          "  },",
          "});",
        ],
      },
      {
        title: "Log",
        filename: "agent.log",
        lines: [
          "[14:22:01] INFO  Agent init: model=claude-3.7-sonnet",
          "[14:22:02] DEBUG Compaction ratio: 0.38 (saved 48k tokens)",
          "[14:22:03] INFO  Verification gate passed: typecheck (0 errors)",
          "[14:22:04] INFO  Task completed in 3 steps with 100% test pass",
        ],
      },
      {
        title: "Gate",
        filename: "eval_gate.json",
        lines: [
          "{",
          '  "gate": "production_readiness",',
          '  "status": "APPROVED",',
          '  "metrics": {',
          '    "accuracy": 0.994,',
          '    "latency_p95_ms": 240,',
          '    "hallucination_rate": 0.001',
          "  }",
          "}",
        ],
      },
    ],
  },
  {
    title: "PaneTera: Context-Aware Workspace Manager",
    role: "Creator · Developer Tool",
    status: "v1.2.0 · Production",
    summary:
      "Intelligent MCP-powered session manager that caches tool states across long agent reasoning loops.",
    href: "https://github.com/ShaileshRawat1403/panetera",
    stars: "920",
    tabs: [
      {
        title: "Protocol",
        filename: "panetera.mcp.json",
        lines: [
          "{",
          '  "mcpServers": {',
          '    "panetera": {',
          '      "command": "panetera-daemon",',
          '      "args": ["--cache-dir", ".panetera/cache"],',
          '      "capabilities": ["roots", "resources", "tools"]',
          "    }",
          "  }",
          "}",
        ],
      },
      {
        title: "Stream",
        filename: "stream.event",
        lines: [
          "event: session_checkpoint",
          "data: {",
          '  "active_panes": 4,',
          '  "mcp_tools_active": ["fs_watch", "git_blame"],',
          '  "state_hash": "sha256:7f3a8b..."',
          "}",
        ],
      },
      {
        title: "Audit",
        filename: "audit_trail.log",
        lines: [
          "SESSION: s_98412-alpha",
          "DURATION: 42m 18s",
          "CACHE HITS: 84.2%",
          "MEMORY LEAK: NONE DETECTED",
        ],
      },
    ],
  },
  {
    title: "Verb: Terminal Companion for AI Agents",
    role: "Creator · CLI Utility",
    status: "v0.4.1 · Beta",
    summary:
      "A fast, distraction-free CLI that streams agent execution traces into an interactive terminal HUD.",
    href: "https://github.com/ShaileshRawat1403/verb",
    stars: "890",
    tabs: [
      {
        title: "CLI Trace",
        filename: "verb --trace",
        lines: [
          "$ verb --trace session_98412",
          "  [✓] context compact: 128k -> 42k tokens (-67%)",
          "  [✓] ast validation: 14 files modified",
          "  [✓] test coverage check: 100% green",
          "  [✓] git commit: b7a12e8 'refactor: decouple context'",
        ],
      },
      {
        title: "Patch",
        filename: "diff.patch",
        lines: [
          "@@ -14,7 +14,7 @@",
          "- const context = await loadFullRepo();",
          "+ const context = await loadSelectiveAST(targetSymbols);",
          "+ await verifyContextBudget(context, 40_000);",
        ],
      },
      {
        title: "Summary",
        filename: "summary.md",
        lines: [
          "# Execution Trace Report",
          "- Tool calls executed: 18",
          "- Total execution time: 4.8s",
          "- Token budget efficiency: +58%",
        ],
      },
    ],
  },
  {
    title: "Soothsayer: LLM Capability Evaluator",
    role: "Author · Research Sandbox",
    status: "v0.6.0 · Research",
    summary:
      "Evaluation harness for measuring reasoning drift and benchmark leakage across successive model weights.",
    href: "https://github.com/ShaileshRawat1403/soothsayer",
    stars: "640",
    tabs: [
      {
        title: "Kernel",
        filename: "soothsayer.py",
        lines: [
          "from soothsayer import BenchmarkHarness, DriftAnalyzer",
          "",
          "harness = BenchmarkHarness(eval_set='leakage_probes_v3')",
          "results = harness.evaluate(model='sonnet-3.7', temp=0.2)",
          "print(f'Reasoning Drift: {results.drift_score:.3f}')",
          "# Output: Reasoning Drift: 0.012 (Nominal)",
        ],
      },
      {
        title: "Policy",
        filename: "policy.rego",
        lines: [
          "package agent.verification",
          "",
          "default allow = false",
          "",
          "allow {",
          "    input.tool_call.type == 'sandboxed'",
          "    input.author.role == 'maintainer'",
          "}",
        ],
      },
      {
        title: "Hook",
        filename: "hooks.ts",
        lines: [
          "export async function onAgentHandoff(context) {",
          "  await telemetry.recordHandoff({",
          "    from: 'generator',",
          "    to: 'verifier',",
          "    contextSize: context.byteLength,",
          "  });",
          "}",
        ],
      },
    ],
  },
];

const PACKAGES_DATA = [
  {
    pkg: "dax-core",
    type: "runtimes",
    desc: "Agent orchestration runtime with verification gates and context compaction.",
    version: "0.8.2",
    installs: "28.4k/mo",
    installCmd: "pip install dax-core",
    pypiUrl: "https://pypi.org/project/dax-core",
    stars: "1.4k",
  },
  {
    pkg: "verb-cli",
    type: "runtimes",
    desc: "Terminal companion CLI for AI explainability, session memory, and traces.",
    version: "0.4.1",
    installs: "14.2k/mo",
    installCmd: "pip install verb-cli",
    pypiUrl: "https://pypi.org/project/verb-cli",
    stars: "890",
  },
  {
    pkg: "passage-sm",
    type: "state",
    desc: "Deterministic state machine library for multi-step agent trajectories.",
    version: "1.1.0",
    installs: "9.8k/mo",
    installCmd: "npm i passage-sm",
    pypiUrl: "https://npmjs.com/package/passage-sm",
    stars: "510",
  },
  {
    pkg: "pothos-eval",
    type: "policy",
    desc: "Minimal Rego-based policy gate for auditing sandboxed tool invocations.",
    version: "0.3.4",
    installs: "6.1k/mo",
    installCmd: "pip install pothos-eval",
    pypiUrl: "https://pypi.org/project/pothos-eval",
    stars: "430",
  },
];

// Rich SEO/AEO/GEO Structured Data Graph
const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://pruningmypothos.com/#website",
      "url": "https://pruningmypothos.com",
      "name": "Pruning My Pothos",
      "description":
        "Tech-editorial publication and solo systems laboratory exploring AI coding agents, context compaction, deterministic runtimes, and engineering hygiene.",
      "publisher": {
        "@id": "https://pruningmypothos.com/#organization",
      },
    },
    {
      "@type": "Organization",
      "@id": "https://pruningmypothos.com/#organization",
      "name": "Pruning My Pothos",
      "alternateName": "Sans Serif Systems",
      "url": "https://pruningmypothos.com",
      "logo": "https://pruningmypothos.com/favicon.png",
      "founder": {
        "@id": "https://pruningmypothos.com/#author",
      },
    },
    {
      "@type": "Person",
      "@id": "https://pruningmypothos.com/#author",
      "name": "Shailesh Rawat",
      "jobTitle": "Systems Architect & Software Engineer",
      "url": "https://pruningmypothos.com/self",
      "sameAs": ["https://github.com/ShaileshRawat1403"],
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://pruningmypothos.com/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://pruningmypothos.com",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Editorial",
          "item": "https://pruningmypothos.com/editorial-preview",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://pruningmypothos.com/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is Pruning My Pothos?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Pruning My Pothos is a tech-editorial engineering publication and systems laboratory created by Shailesh Rawat. It publishes rigorous architectural breakdowns of AI coding agents, deterministic execution engines, context compaction algorithms, and verifiable developer tools.",
          },
        },
        {
          "@type": "Question",
          "name": "What is the pothos pruning methodology in AI software engineering?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "The pruning methodology is a 6-stage engineering lifecycle: (1) Notice genuine architectural signals, (2) Validate through hands-on sandbox trials, (3) Prune away unverified abstractions and brittle prompt chains, (4) Deconstruct boundary limits such as context degradation and token budgets, (5) Adopt typed, verified production patterns, and (6) Retain only durable, high-ROI systems.",
          },
        },
        {
          "@type": "Question",
          "name": "Why do multi-step AI coding agents fail in production codebases?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "AI coding agents fail in production primarily due to context window pollution, loss of type contracts across long tool execution loops, lack of sandbox isolation, and silent hallucination drift. Reliable agent runtimes require deterministic state machines, AST validation, and strict verification gates.",
          },
        },
        {
          "@type": "Question",
          "name": "What open-source agent runtimes and tools are published here?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Featured tools include DAX (Declarative Agent Executables runtime with context compaction), PaneTera (MCP-powered workspace session manager), Verb (terminal execution companion HUD), and Soothsayer (LLM capability and reasoning drift evaluator).",
          },
        },
      ],
    },
  ],
};

export default function EditorialView() {
  const [growthKey, setGrowthKey] = useState(0);
  const [email1, setEmail1] = useState("");
  const [email2, setEmail2] = useState("");
  const [status1, setStatus1] = useState<"idle" | "done">("idle");
  const [status2, setStatus2] = useState<"idle" | "done">("idle");
  const [copiedPkg, setCopiedPkg] = useState<string | null>(null);
  const [copiedCodeIdx, setCopiedCodeIdx] = useState<number | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [activePackageFilter, setActivePackageFilter] = useState<string>("all");
  const [projectTabs, setProjectTabs] = useState<Record<number, number>>({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
  });

  const handleCopyPkg = (pkg: string, cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedPkg(pkg);
    setTimeout(() => setCopiedPkg(null), 2000);
  };

  const handleCopyCode = (projIdx: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCodeIdx(projIdx);
    setTimeout(() => setCopiedCodeIdx(null), 2000);
  };

  const hoveredAnnotation = hoveredNode
    ? ANNOTATIONS.find((a) => a.id === hoveredNode)
    : null;

  const filteredPackages =
    activePackageFilter === "all"
      ? PACKAGES_DATA
      : PACKAGES_DATA.filter((p) => p.type === activePackageFilter);

  return (
    <div className="editorial-container w-full min-h-screen bg-[#FAF9F6] text-[#121212] font-sans antialiased selection:bg-[#121212] selection:text-[#FAF9F6]">
      {/* ── JSON-LD STRUCTURED DATA FOR SEO, AEO (PERPLEXITY/CLAUDE), & GEO (GEMINI OVERVIEWS) ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
      />

      {/* ── ACCESSIBILITY SKIP LINK ── */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-[#121212] focus:text-white focus:rounded-md focus:font-mono focus:text-xs focus:shadow-md focus:outline-none"
      >
        Skip to main content
      </a>

      {/* ── BOTANICAL ANIMATION & PAGE STYLES ── */}
      <style>{`
        html {
          scroll-behavior: smooth;
        }

        /* ── BOTANICAL LINE-ART GROWTH ANIMATION ON PAGE LOAD ── */
        @keyframes drawTrellisVert {
          0% {
            stroke-dashoffset: 450;
            opacity: 0;
          }
          30% {
            opacity: 0.85;
          }
          100% {
            stroke-dashoffset: 0;
            opacity: 0.85;
          }
        }

        @keyframes drawTrellisHoriz {
          0% {
            stroke-dashoffset: 140;
            opacity: 0;
          }
          30% {
            opacity: 0.85;
          }
          100% {
            stroke-dashoffset: 0;
            opacity: 0.85;
          }
        }

        .anim-trellis-vert {
          stroke-dasharray: 450;
          stroke-dashoffset: 450;
          animation: drawTrellisVert 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.05s forwards;
        }

        .anim-trellis-horiz {
          stroke-dasharray: 140;
          stroke-dashoffset: 140;
          animation: drawTrellisHoriz 0.45s cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards;
        }

        @keyframes drawPotRim {
          0% {
            stroke-dashoffset: 280;
            opacity: 0;
          }
          100% {
            stroke-dashoffset: 0;
            opacity: 1;
          }
        }

        @keyframes drawPotBody {
          0% {
            stroke-dashoffset: 350;
            opacity: 0;
          }
          100% {
            stroke-dashoffset: 0;
            opacity: 1;
          }
        }

        @keyframes fadeInHatch {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes unfurlBasal {
          0% {
            transform: scale(0.15);
            opacity: 0;
          }
          70% {
            transform: scale(1.05);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .anim-pot-rim {
          stroke-dasharray: 280;
          stroke-dashoffset: 280;
          animation: drawPotRim 0.5s ease-out 0.1s forwards;
        }

        .anim-pot-body {
          stroke-dasharray: 350;
          stroke-dashoffset: 350;
          animation: drawPotBody 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards;
        }

        .anim-pot-hatch {
          opacity: 0;
          animation: fadeInHatch 0.4s ease-out 0.3s forwards;
        }

        .anim-basal {
          transform-box: fill-box;
          transform-origin: center bottom;
          opacity: 0;
          animation: unfurlBasal 0.5s cubic-bezier(0.34, 1.4, 0.64, 1) 0.25s forwards;
        }

        @keyframes growStem {
          0% {
            stroke-dashoffset: 485;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }

        .anim-vine-stem {
          stroke-dasharray: 485;
          stroke-dashoffset: 485;
          animation: growStem 1.4s cubic-bezier(0.25, 0.9, 0.35, 1) 0.35s forwards;
        }

        /* Organic branch line drawing */
        @keyframes drawBranch {
          0% {
            stroke-dashoffset: 90;
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% {
            stroke-dashoffset: 0;
            opacity: 1;
          }
        }

        /* Leaf unfurling with delicate botanical spring */
        @keyframes unfurlLeaf {
          0% {
            transform: scale(0.12) rotate(-6deg);
            opacity: 0;
          }
          65% {
            transform: scale(1.08) rotate(1deg);
            opacity: 1;
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }

        /* Red pruning shears cut mark */
        @keyframes shearCut {
          0% {
            stroke-dashoffset: 40;
            opacity: 0;
          }
          25% {
            opacity: 1;
          }
          100% {
            stroke-dashoffset: 0;
            opacity: 1;
          }
        }

        /* Annotation line and label reveal */
        @keyframes revealAnnotation {
          0% {
            opacity: 0;
            transform: translateY(3px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Staggered node animations matching vine climb upwards from soil */
        /* 1. Apply (y=425, ~14% along vine) */
        .anim-branch-apply {
          stroke-dasharray: 90;
          stroke-dashoffset: 90;
          animation: drawBranch 0.25s ease-out 0.55s forwards;
        }
        .anim-leaf-apply {
          transform-box: fill-box;
          transform-origin: top right;
          opacity: 0;
          animation: unfurlLeaf 0.45s cubic-bezier(0.34, 1.35, 0.64, 1) 0.62s forwards;
        }
        .anim-ann-apply {
          opacity: 0;
          animation: revealAnnotation 0.35s ease-out 0.75s forwards;
        }

        /* 2. Noise / Pruned (y=335, ~33% along vine) */
        .anim-branch-noise {
          stroke-dasharray: 90;
          stroke-dashoffset: 90;
          animation: drawBranch 0.25s ease-out 0.80s forwards;
        }
        .anim-cut-noise {
          stroke-dasharray: 40;
          stroke-dashoffset: 40;
          opacity: 0;
          animation: shearCut 0.18s ease-out 0.88s forwards;
        }
        .anim-leaf-noise {
          transform-box: fill-box;
          transform-origin: top left;
          opacity: 0;
          animation: unfurlLeaf 0.45s ease-out 0.94s forwards;
        }
        .anim-ann-noise {
          opacity: 0;
          animation: revealAnnotation 0.35s ease-out 1.00s forwards;
        }

        /* 3. Understand (y=295, ~42% along vine) */
        .anim-branch-understand {
          stroke-dasharray: 90;
          stroke-dashoffset: 90;
          animation: drawBranch 0.25s ease-out 0.98s forwards;
        }
        .anim-leaf-understand {
          transform-box: fill-box;
          transform-origin: top right;
          opacity: 0;
          animation: unfurlLeaf 0.45s cubic-bezier(0.34, 1.35, 0.64, 1) 1.05s forwards;
        }
        .anim-ann-understand {
          opacity: 0;
          animation: revealAnnotation 0.35s ease-out 1.18s forwards;
        }

        /* 4. Try (y=225, ~56% along vine) */
        .anim-branch-try {
          stroke-dasharray: 90;
          stroke-dashoffset: 90;
          animation: drawBranch 0.25s ease-out 1.18s forwards;
        }
        .anim-leaf-try {
          transform-box: fill-box;
          transform-origin: top left;
          opacity: 0;
          animation: unfurlLeaf 0.45s cubic-bezier(0.34, 1.35, 0.64, 1) 1.25s forwards;
        }
        .anim-ann-try {
          opacity: 0;
          animation: revealAnnotation 0.35s ease-out 1.38s forwards;
        }

        /* 5. Notice (y=145, ~73% along vine) */
        .anim-branch-notice {
          stroke-dasharray: 90;
          stroke-dashoffset: 90;
          animation: drawBranch 0.25s ease-out 1.40s forwards;
        }
        .anim-leaf-notice {
          transform-box: fill-box;
          transform-origin: top right;
          opacity: 0;
          animation: unfurlLeaf 0.45s cubic-bezier(0.34, 1.35, 0.64, 1) 1.48s forwards;
        }
        .anim-ann-notice {
          opacity: 0;
          animation: revealAnnotation 0.35s ease-out 1.60s forwards;
        }

        /* 6. Useful Apex (y=25, 100% along vine) */
        .anim-leaf-useful {
          transform-box: fill-box;
          transform-origin: bottom center;
          opacity: 0;
          animation: unfurlLeaf 0.5s cubic-bezier(0.34, 1.4, 0.64, 1) 1.72s forwards;
        }
        .anim-ann-useful {
          opacity: 0;
          animation: revealAnnotation 0.35s ease-out 1.90s forwards;
        }

        /* Ambient sap pulse flowing smoothly up the vine stem after growth completes */
        @keyframes sapPulse {
          0% {
            stroke-dashoffset: 480;
            opacity: 0;
          }
          10% {
            opacity: 0.9;
          }
          70% {
            opacity: 0.9;
          }
          100% {
            stroke-dashoffset: 0;
            opacity: 0.15;
          }
        }

        .sap-stream {
          stroke-dasharray: 28 200;
          opacity: 0;
          animation: sapPulse 3.8s ease-in-out infinite 2.15s;
          filter: drop-shadow(0 0 5px rgba(22, 163, 74, 0.5));
        }

        @media (prefers-reduced-motion: reduce) {
          .anim-trellis-vert,
          .anim-trellis-horiz,
          .anim-pot-rim,
          .anim-pot-body,
          .anim-pot-hatch,
          .anim-basal,
          .anim-vine-stem,
          [class*="anim-branch-"],
          [class*="anim-leaf-"],
          [class*="anim-ann-"],
          .anim-cut-noise,
          .sap-stream {
            animation: none !important;
            stroke-dashoffset: 0 !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }

        /* Silky organic leaf transitions and micro-hover blooming */
        .botanical-leaf-group {
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), filter 0.35s ease;
          transform-box: fill-box;
          transform-origin: 50% 80%;
        }

        .botanical-leaf-path {
          transition: fill 0.35s ease, stroke 0.35s ease, filter 0.35s ease;
        }

        .botanical-leaf-group:hover,
        .botanical-leaf-group.is-active {
          transform: scale(1.12) translateY(-2px);
        }

        .botanical-leaf-group:hover .botanical-leaf-path,
        .botanical-leaf-group.is-active .botanical-leaf-path {
          fill: #DCFCE7 !important;
          stroke: #16A34A !important;
          filter: drop-shadow(0 4px 14px rgba(22, 163, 74, 0.4));
        }

        .botanical-leaf-group.is-pruned:hover,
        .botanical-leaf-group.is-pruned.is-active {
          transform: scale(0.96) translateY(2px);
        }

        .botanical-leaf-group.is-pruned:hover .botanical-leaf-path,
        .botanical-leaf-group.is-pruned.is-active .botanical-leaf-path {
          fill: #FEE2E2 !important;
          stroke: #DC2626 !important;
          filter: drop-shadow(0 3px 10px rgba(220, 38, 38, 0.35));
        }
      `}</style>

      {/* ── MAIN CONTENT WRAPPER ── */}
      <div id="main-content">
        {/* ── 2. HERO SECTION (FULL WIDTH EDGE-TO-EDGE) ── */}
        <section id="hero" className="scroll-mt-28 w-full border-b border-[#EAE8E2] bg-[#FAF9F6]">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pt-14 pb-20 md:pt-18 md:pb-22">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">

              {/* Left Column: Hero Editorial Statement */}
              <div className="lg:col-span-7 flex flex-col gap-8">
                <div className="flex items-center gap-2 text-[11px] font-mono tracking-wider text-[#8A8780] uppercase flex-wrap">
                  <span className="text-[#16A34A] font-bold">// TECH-EDITORIAL</span>
                  <span>·</span>
                  <span>{AUDITED_SYSTEMS_COUNT} BLUEPRINTS</span>
                  <span>·</span>
                  <span>{VERIFIED_TOOLS_COUNT} VERIFIED TOOLS</span>
                </div>

                <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#121212] leading-[1.08]">
                  Understand AI <br />
                  by putting it <br />
                  <span className="italic font-serif font-normal text-[#121212]">to work.</span>
                </h1>

                <p className="text-base sm:text-[1.125rem] text-[#55534E] leading-[1.65] max-w-lg font-normal">
                  Practical breakdowns of AI coding agents, context compaction, and autonomous
                  workflows — explained against things that were built, run, inspected, or broken.
                </p>

                {/* Primary Email Capture */}
                <div id="newsletter" className="scroll-mt-28 flex flex-col gap-3 pt-2 max-w-lg">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!email1) return;
                      setStatus1("done");
                    }}
                    className="flex flex-col sm:flex-row gap-2"
                  >
                    <input
                      type="email"
                      required
                      value={email1}
                      onChange={(e) => setEmail1(e.target.value)}
                      placeholder="Enter your email address"
                      aria-label="Email address for weekly technical breakdowns"
                      className="flex-1 px-4 py-3.5 rounded-lg border border-[#D5D2C9] bg-white text-sm font-mono text-[#121212] placeholder:text-[#A8A29E] focus:outline-none focus:border-[#121212] transition-colors"
                    />
                    <button
                      type="submit"
                      className="px-6 py-3.5 rounded-lg bg-[#121212] hover:bg-[#2A2926] text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors shrink-0 shadow-xs cursor-pointer flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#121212]"
                    >
                      <span>SUBSCRIBE</span>
                      <span>&crarr;</span>
                    </button>
                  </form>

                  <div className="flex items-center justify-between text-xs text-[#7A7872] px-1 font-mono">
                    <span className="flex items-center gap-1.5">
                      <span className="text-[#16A34A]">&#10003;</span>
                      Read by 2,400+ engineers & architects
                    </span>
                    <a href="#breakdowns" className="hover:text-[#121212] transition-colors underline underline-offset-4 decoration-[#D5D2C9]">
                      Sample issue &rarr;
                    </a>
                  </div>

                  {status1 === "done" && (
                    <div className="p-3 bg-[#E8F5E9] border border-[#C8E6C9] rounded-lg text-xs font-mono text-[#2E7D32]">
                      &#10003; You&apos;re subscribed. First weekly technical breakdown arrives Thursday morning.
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Hand-Crafted Botanical Pothos Trellis Illustration */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center">
                <div className="relative w-full max-w-[500px] flex flex-col p-5 sm:p-6 rounded-2xl bg-white/85 border border-[#EAE8E2] shadow-sm backdrop-blur-sm">

                  {/* Clean Top Botanical Header Bar */}
                  <div className="flex items-center justify-between border-b border-[#F0EEEA] pb-3 mb-2 select-none">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
                      <span className="font-mono text-[11px] font-bold tracking-wider text-[#121212] uppercase">
                        BOTANICAL TOPOLOGY
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setGrowthKey((k) => k + 1)}
                        title="Replay growth animation"
                        className="inline-flex items-center gap-1 font-mono text-[10px] text-[#7A7872] hover:text-[#121212] transition-colors uppercase cursor-pointer"
                      >
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                          <path d="M21 3v5h-5" />
                          <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                          <path d="M3 21v-5h5" />
                        </svg>
                        <span>REPLAY</span>
                      </button>
                      <span className="font-mono text-[10px] text-[#D5D2C9]">|</span>
                      <span className="font-mono text-[10px] text-[#7A7872] tracking-wider uppercase">
                        SYS.LIFECYCLE // LIVE
                      </span>
                    </div>
                  </div>

                  {/* ── HAND-CRAFTED BOTANICAL SVG SCHEMATIC ── */}
                  <div className="w-full aspect-[1/1.12] flex items-center justify-center">
                    <svg
                      key={growthKey}
                      viewBox="0 0 540 600"
                      className="w-full h-full text-[#121212] select-none overflow-visible"
                      aria-label="High craft botanical pothos vine climbing an architectural trellis"
                    >
                      <defs>
                        <linearGradient id="sapGlow" x1="0%" y1="100%" x2="0%" y2="0%">
                          <stop offset="0%" stopColor="#16A34A" stopOpacity="0.1" />
                          <stop offset="50%" stopColor="#22C55E" stopOpacity="0.95" />
                          <stop offset="100%" stopColor="#86EFAC" stopOpacity="0.3" />
                        </linearGradient>
                      </defs>

                      {/* ── 1. ARCHITECTURAL CEDAR TRELLIS ── */}
                      <g stroke="#E6E2D8" strokeWidth="1.75" strokeLinecap="round" opacity="0.85">
                        {/* Vertical Posts */}
                        <line x1="225" y1="50" x2="225" y2="480" className="anim-trellis-vert" />
                        <line x1="270" y1="30" x2="270" y2="480" className="anim-trellis-vert" />
                        <line x1="315" y1="50" x2="315" y2="480" className="anim-trellis-vert" />
                        {/* Horizontal Cross Rungs */}
                        <line x1="205" y1="75" x2="335" y2="75" className="anim-trellis-horiz" />
                        <line x1="205" y1="155" x2="335" y2="155" className="anim-trellis-horiz" />
                        <line x1="205" y1="235" x2="335" y2="235" className="anim-trellis-horiz" />
                        <line x1="205" y1="315" x2="335" y2="315" className="anim-trellis-horiz" />
                        <line x1="205" y1="395" x2="335" y2="395" className="anim-trellis-horiz" />
                      </g>

                      {/* ── 2. CERAMIC POT WITH BOTANICAL HATCHING ── */}
                      <g>
                        {/* Pot Rim */}
                        <ellipse cx="270" cy="495" rx="68" ry="12" fill="#FAF9F6" stroke="#121212" strokeWidth="1.75" className="anim-pot-rim" />
                        {/* Pot Body */}
                        <path
                          d="M204 495 C206 558, 216 576, 226 584 C236 590, 304 590, 314 584 C324 576, 334 558, 336 495"
                          fill="none"
                          stroke="#121212"
                          strokeWidth="1.75"
                          strokeLinejoin="round"
                          className="anim-pot-body"
                        />
                        {/* Fine Hatch Shading */}
                        <g className="anim-pot-hatch">
                          <path d="M218 515 C220 548, 224 564, 230 574" fill="none" stroke="#D4D0C7" strokeWidth="1" strokeDasharray="3 3" />
                          <path d="M322 515 C320 548, 316 564, 310 574" fill="none" stroke="#D4D0C7" strokeWidth="1" strokeDasharray="3 3" />
                          <ellipse cx="270" cy="495" rx="58" ry="7" fill="none" stroke="#A8A29E" strokeWidth="0.8" strokeDasharray="2 3" />
                        </g>
                      </g>

                      {/* ── 3. BASAL CLUSTER: LUSH HEART-SHAPED LEAVES OVERFLOWING POT ── */}
                      <g stroke="#121212" strokeWidth="1.3" fill="#FAF9F6" className="anim-basal">
                        {/* Left drape */}
                        <path d="M216 490 C194 476, 174 498, 188 520 C202 536, 230 510, 216 490 Z" />
                        <path d="M216 490 C204 506, 196 516, 188 520" fill="none" stroke="#78716C" strokeWidth="0.8" />
                        {/* Center leaf */}
                        <path d="M250 488 C232 505, 244 532, 262 525 C276 516, 268 494, 250 488 Z" />
                        <path d="M250 488 C254 506, 258 518, 262 525" fill="none" stroke="#78716C" strokeWidth="0.8" />
                        {/* Right drape */}
                        <path d="M316 488 C338 476, 354 500, 342 522 C328 536, 304 508, 316 488 Z" />
                        <path d="M316 488 C328 506, 336 516, 342 522" fill="none" stroke="#78716C" strokeWidth="0.8" />
                      </g>

                      {/* ── 4. MAIN CLIMBING STEM VINE ── */}
                      <path
                        d="M270 492 C264 420, 296 375, 290 295 C284 225, 320 160, 324 90 C326 65, 342 45, 350 25"
                        fill="none"
                        stroke="#121212"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        className="anim-vine-stem"
                      />

                      {/* Continuous Live Sap-Flow Pulse */}
                      <path
                        d="M270 492 C264 420, 296 375, 290 295 C284 225, 320 160, 324 90 C326 65, 342 45, 350 25"
                        fill="none"
                        stroke="url(#sapGlow)"
                        strokeWidth="3.2"
                        strokeLinecap="round"
                        className="sap-stream pointer-events-none"
                      />

                      {/* ── 5. LOWER NODE: "apply" (AUTHENTIC CORDATE LEAF) ── */}
                      <g>
                        <g
                          className={`botanical-leaf-group cursor-pointer ${hoveredNode === "apply" ? "is-active" : ""}`}
                          onMouseEnter={() => setHoveredNode("apply")}
                          onMouseLeave={() => setHoveredNode(null)}
                          onClick={() => setHoveredNode(hoveredNode === "apply" ? null : "apply")}
                        >
                          <path d="M270 425 C244 415, 220 422, 204 436" fill="none" stroke="#121212" strokeWidth="1.5" className="anim-branch-apply" />
                          <g className="anim-leaf-apply">
                            <path
                              d="M204 436 C174 422, 152 454, 172 480 C192 496, 220 466, 204 436 Z"
                              className="botanical-leaf-path"
                              fill="#FAF9F6"
                              stroke="#121212"
                              strokeWidth="1.5"
                            />
                            <path d="M204 436 C188 458, 178 472, 172 480" fill="none" stroke="#121212" strokeWidth="1" />
                          </g>
                        </g>
                        {/* Annotation */}
                        <g
                          className="anim-ann-apply cursor-pointer"
                          onMouseEnter={() => setHoveredNode("apply")}
                          onMouseLeave={() => setHoveredNode(null)}
                          onClick={() => setHoveredNode(hoveredNode === "apply" ? null : "apply")}
                        >
                          <polyline points="162,458 120,458 100,458" fill="none" stroke={hoveredNode === "apply" ? "#16A34A" : "#78716C"} strokeWidth="0.8" strokeDasharray="2 2" />
                          <circle cx="162" cy="458" r={hoveredNode === "apply" ? "4.5" : "2.5"} fill={hoveredNode === "apply" ? "#16A34A" : "#121212"} />
                          <text
                            x="90"
                            y="462"
                            textAnchor="end"
                            className={`font-mono text-[11px] tracking-wider transition-colors ${hoveredNode === "apply" ? "font-bold fill-[#16A34A]" : "fill-[#121212]"}`}
                          >
                            apply
                          </text>
                        </g>
                      </g>

                      {/* ── 6. PRUNED BRANCH: "pruned" / "noise ✕" ── */}
                      <g>
                        <g
                          className={`botanical-leaf-group is-pruned cursor-pointer ${hoveredNode === "noise" ? "is-active" : ""}`}
                          onMouseEnter={() => setHoveredNode("noise")}
                          onMouseLeave={() => setHoveredNode(null)}
                          onClick={() => setHoveredNode(hoveredNode === "noise" ? null : "noise")}
                        >
                          <path d="M292 335 C310 325, 322 330, 332 338" fill="none" stroke="#8A8780" strokeWidth="1.5" className="anim-branch-noise" />
                          {/* Pruning Shears Cut Mark */}
                          <line x1="334" y1="322" x2="324" y2="348" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" className="anim-cut-noise" />
                          <g className="anim-leaf-noise">
                            {/* Dashed wilting branch */}
                            <path d="M334 340 C356 352, 374 366, 388 380" fill="none" stroke="#8A8780" strokeWidth="1.4" strokeDasharray="4 3" />
                            {/* Wilting leaf outline */}
                            <path
                              d="M388 380 C410 368, 428 390, 414 406 C398 418, 378 400, 388 380 Z"
                              className="botanical-leaf-path"
                              fill="#FAF9F6"
                              stroke="#A8A29E"
                              strokeWidth="1.2"
                              strokeDasharray="3 2"
                            />
                            <path d="M388 380 C400 394, 408 402, 414 406" fill="none" stroke="#A8A29E" strokeWidth="0.8" strokeDasharray="2 2" />
                          </g>
                        </g>
                        {/* Annotation */}
                        <g
                          className="anim-ann-noise cursor-pointer"
                          onMouseEnter={() => setHoveredNode("noise")}
                          onMouseLeave={() => setHoveredNode(null)}
                          onClick={() => setHoveredNode(hoveredNode === "noise" ? null : "noise")}
                        >
                          <text x="338" y="322" textAnchor="start" className="font-mono text-[10px] fill-[#78716C]">
                            pruned
                          </text>

                          <polyline points="414,398 434,398 446,398" fill="none" stroke="#DC2626" strokeWidth="0.8" strokeDasharray="2 2" />
                          <circle cx="414" cy="398" r={hoveredNode === "noise" ? "4.5" : "2.5"} fill="#DC2626" />
                          <text
                            x="452"
                            y="402"
                            textAnchor="start"
                            className="font-mono text-[11px] font-bold tracking-wider fill-[#DC2626]"
                          >
                            noise ✕
                          </text>
                        </g>
                      </g>

                      {/* ── 7. MID NODE: "understand" (AUTHENTIC CORDATE LEAF) ── */}
                      <g>
                        <g
                          className={`botanical-leaf-group cursor-pointer ${hoveredNode === "understand" ? "is-active" : ""}`}
                          onMouseEnter={() => setHoveredNode("understand")}
                          onMouseLeave={() => setHoveredNode(null)}
                          onClick={() => setHoveredNode(hoveredNode === "understand" ? null : "understand")}
                        >
                          <path d="M290 295 C262 285, 238 290, 222 274" fill="none" stroke="#121212" strokeWidth="1.5" className="anim-branch-understand" />
                          <g className="anim-leaf-understand">
                            <path
                              d="M222 274 C190 256, 168 290, 192 320 C216 340, 248 304, 222 274 Z"
                              className="botanical-leaf-path"
                              fill="#FAF9F6"
                              stroke="#121212"
                              strokeWidth="1.5"
                            />
                            <path d="M222 274 C204 298, 196 312, 192 320" fill="none" stroke="#121212" strokeWidth="1" />
                            <path d="M214 286 C202 283, 192 288, 188 294" fill="none" stroke="#78716C" strokeWidth="0.7" />
                            <path d="M206 302 C212 306, 218 312, 220 316" fill="none" stroke="#78716C" strokeWidth="0.7" />
                          </g>
                        </g>
                        {/* Annotation */}
                        <g
                          className="anim-ann-understand cursor-pointer"
                          onMouseEnter={() => setHoveredNode("understand")}
                          onMouseLeave={() => setHoveredNode(null)}
                          onClick={() => setHoveredNode(hoveredNode === "understand" ? null : "understand")}
                        >
                          <polyline points="178,298 135,298 115,298" fill="none" stroke={hoveredNode === "understand" ? "#16A34A" : "#78716C"} strokeWidth="0.8" strokeDasharray="2 2" />
                          <circle cx="178" cy="298" r={hoveredNode === "understand" ? "4.5" : "2.5"} fill={hoveredNode === "understand" ? "#16A34A" : "#121212"} />
                          <text
                            x="105"
                            y="302"
                            textAnchor="end"
                            className={`font-mono text-[11px] tracking-wider transition-colors ${hoveredNode === "understand" ? "font-bold fill-[#16A34A]" : "fill-[#121212]"}`}
                          >
                            understand
                          </text>
                        </g>
                      </g>

                      {/* ── 8. UPPER NODE: "try" (AUTHENTIC CORDATE LEAF) ── */}
                      <g>
                        <g
                          className={`botanical-leaf-group cursor-pointer ${hoveredNode === "try" ? "is-active" : ""}`}
                          onMouseEnter={() => setHoveredNode("try")}
                          onMouseLeave={() => setHoveredNode(null)}
                          onClick={() => setHoveredNode(hoveredNode === "try" ? null : "try")}
                        >
                          <path d="M302 225 C326 214, 348 220, 362 204" fill="none" stroke="#121212" strokeWidth="1.5" className="anim-branch-try" />
                          <g className="anim-leaf-try">
                            <path
                              d="M362 204 C394 188, 416 222, 396 252 C378 270, 348 236, 362 204 Z"
                              className="botanical-leaf-path"
                              fill="#FAF9F6"
                              stroke="#121212"
                              strokeWidth="1.5"
                            />
                            <path d="M362 204 C378 228, 388 244, 396 252" fill="none" stroke="#121212" strokeWidth="1" />
                            <path d="M370 216 C382 213, 392 218, 396 224" fill="none" stroke="#78716C" strokeWidth="0.7" />
                            <path d="M378 230 C372 236, 364 240, 362 246" fill="none" stroke="#78716C" strokeWidth="0.7" />
                          </g>
                        </g>
                        {/* Annotation */}
                        <g
                          className="anim-ann-try cursor-pointer"
                          onMouseEnter={() => setHoveredNode("try")}
                          onMouseLeave={() => setHoveredNode(null)}
                          onClick={() => setHoveredNode(hoveredNode === "try" ? null : "try")}
                        >
                          <polyline points="405,230 430,230 445,230" fill="none" stroke={hoveredNode === "try" ? "#16A34A" : "#78716C"} strokeWidth="0.8" strokeDasharray="2 2" />
                          <circle cx="405" cy="230" r={hoveredNode === "try" ? "4.5" : "2.5"} fill={hoveredNode === "try" ? "#16A34A" : "#121212"} />
                          <text
                            x="452"
                            y="234"
                            textAnchor="start"
                            className={`font-mono text-[11px] tracking-wider transition-colors ${hoveredNode === "try" ? "font-bold fill-[#16A34A]" : "fill-[#121212]"}`}
                          >
                            try
                          </text>
                        </g>
                      </g>

                      {/* ── 9. TOP NODE: "notice" (AUTHENTIC CORDATE LEAF) ── */}
                      <g>
                        <g
                          className={`botanical-leaf-group cursor-pointer ${hoveredNode === "notice" ? "is-active" : ""}`}
                          onMouseEnter={() => setHoveredNode("notice")}
                          onMouseLeave={() => setHoveredNode(null)}
                          onClick={() => setHoveredNode(hoveredNode === "notice" ? null : "notice")}
                        >
                          <path d="M310 145 C282 134, 258 140, 240 124" fill="none" stroke="#121212" strokeWidth="1.5" className="anim-branch-notice" />
                          <g className="anim-leaf-notice">
                            <path
                              d="M240 124 C208 106, 186 140, 206 170 C224 190, 256 156, 240 124 Z"
                              className="botanical-leaf-path"
                              fill="#FAF9F6"
                              stroke="#121212"
                              strokeWidth="1.5"
                            />
                            <path d="M240 124 C222 146, 214 162, 206 170" fill="none" stroke="#121212" strokeWidth="1" />
                            <path d="M232 136 C220 133, 210 138, 206 144" fill="none" stroke="#78716C" strokeWidth="0.7" />
                            <path d="M224 150 C230 154, 236 160, 238 164" fill="none" stroke="#78716C" strokeWidth="0.7" />
                          </g>
                        </g>
                        {/* Annotation Line & Label */}
                        <g
                          className="anim-ann-notice cursor-pointer"
                          onMouseEnter={() => setHoveredNode("notice")}
                          onMouseLeave={() => setHoveredNode(null)}
                          onClick={() => setHoveredNode(hoveredNode === "notice" ? null : "notice")}
                        >
                          <polyline points="195,148 145,148 125,148" fill="none" stroke={hoveredNode === "notice" ? "#16A34A" : "#78716C"} strokeWidth="0.8" strokeDasharray="2 2" />
                          <circle cx="195" cy="148" r={hoveredNode === "notice" ? "4.5" : "2.5"} fill={hoveredNode === "notice" ? "#16A34A" : "#121212"} />
                          <text
                            x="115"
                            y="152"
                            textAnchor="end"
                            className={`font-mono text-[11px] tracking-wider transition-colors ${hoveredNode === "notice" ? "font-bold fill-[#16A34A]" : "fill-[#121212]"}`}
                          >
                            notice
                          </text>
                        </g>
                      </g>

                      {/* ── 10. APEX: "useful ✓" (VIBRANT FRESH TIP) ── */}
                      <g>
                        <g
                          className={`botanical-leaf-group cursor-pointer ${hoveredNode === "useful" ? "is-active" : ""}`}
                          onMouseEnter={() => setHoveredNode("useful")}
                          onMouseLeave={() => setHoveredNode(null)}
                          onClick={() => setHoveredNode(hoveredNode === "useful" ? null : "useful")}
                        >
                          <g className="anim-leaf-useful">
                            <path
                              d="M350 25 C370 8, 396 30, 380 54 C362 70, 340 46, 350 25 Z"
                              className="botanical-leaf-path"
                              fill="#C6E9D0"
                              stroke="#16A34A"
                              strokeWidth="2"
                            />
                            <path d="M350 25 C364 40, 372 48, 380 54" fill="none" stroke="#16A34A" strokeWidth="1.2" />
                          </g>
                        </g>
                        {/* Annotation with clean unicode checkmark */}
                        <g
                          className="anim-ann-useful cursor-pointer"
                          onMouseEnter={() => setHoveredNode("useful")}
                          onMouseLeave={() => setHoveredNode(null)}
                          onClick={() => setHoveredNode(hoveredNode === "useful" ? null : "useful")}
                        >
                          <polyline points="384,40 416,40 430,40" fill="none" stroke="#16A34A" strokeWidth="0.8" strokeDasharray="2 2" />
                          <circle cx="384" cy="40" r={hoveredNode === "useful" ? "5" : "2.5"} fill="#16A34A" />
                          <text
                            x="438"
                            y="44"
                            textAnchor="start"
                            className="font-mono text-[11px] font-bold tracking-wider fill-[#16A34A]"
                          >
                            useful ✓
                          </text>
                        </g>
                      </g>
                    </svg>
                  </div>

                  {/* Integrated Minimalist Status Footer */}
                  <div className="pt-3 mt-1 border-t border-[#F0EEEA] flex items-center justify-between min-h-[34px] text-[11px] font-mono select-none">
                    {hoveredAnnotation ? (
                      <div className="flex items-center justify-between w-full transition-all">
                        <div className="flex items-center gap-2">
                          <span
                            className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                            style={{
                              backgroundColor: hoveredAnnotation.id === "noise" ? "#FEE2E2" : "#DCFCE7",
                              color: hoveredAnnotation.color,
                            }}
                          >
                            {hoveredAnnotation.tag}
                          </span>
                          <span className="font-semibold text-[#121212]">
                            {hoveredAnnotation.title}
                          </span>
                        </div>
                        <span className="text-[10px] font-semibold" style={{ color: hoveredAnnotation.color }}>
                          {hoveredAnnotation.metric}
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between w-full text-[#8A8780] text-[10px]">
                        <span className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
                          Hover or tap any leaf node to inspect lifecycle
                        </span>
                        <span className="text-[#16A34A] font-semibold">6 STAGES</span>
                      </div>
                    )}
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── 2.5 AUDITED STACK TICKER ── */}
        <div className="w-full py-3.5 px-6 sm:px-10 lg:px-12 bg-[#F4F2EC]/80 border-b border-[#EAE8E2] flex items-center justify-between text-[11px] font-mono text-[#7A7872] overflow-x-auto gap-6 select-none">
          <span className="font-bold text-[#121212] shrink-0 uppercase tracking-wider">
            Audited Systems:
          </span>
          <div className="flex items-center gap-6 shrink-0 tracking-wide">
            <span>MCP PROTOCOL</span>
            <span>·</span>
            <span>CLAUDE 3.7 SONNET</span>
            <span>·</span>
            <span>OPENAI CODEX</span>
            <span>·</span>
            <span>DEEPSEEK R1</span>
            <span>·</span>
            <span>VLLM RUNTIMES</span>
            <span>·</span>
            <span>OLLAMA LOCAL</span>
            <span>·</span>
            <span>LANGGRAPH WORKFLOWS</span>
            <span>·</span>
            <span>EVIDENCE GATES</span>
          </div>
        </div>

        {/* ── 3. START HERE / THREE CURATED ON-RAMPS (FULL WIDTH WITH EDGE-TO-EDGE) ── */}
        <section id="breakdowns" className="scroll-mt-28 w-full border-b border-[#EAE8E2] bg-[#FAF9F6]">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-16">
            <div className="flex justify-between items-end mb-8 flex-wrap gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#8A8780]">
                  START HERE // CURATED ON-RAMPS
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[#121212]">
                  Three quick ways to get value right now.
                </h2>
              </div>
              <span className="font-mono text-xs text-[#7A7872]">
                Updated for Q3/Q4 Production Stack
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Context Window Compaction */}
              <Link
                href="/systems/what-an-ai-model-actually-is"
                className="group flex flex-col p-6 rounded-xl bg-white border border-[#EAE8E2] hover:border-[#121212] transition-all hover:shadow-sm text-decoration-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#121212]"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[10px] font-semibold tracking-wider text-[#8A8780] uppercase">
                    ED. 01 · BREAKDOWN
                  </span>
                  <span className="font-mono text-[10px] text-[#16A34A] bg-[#E8F5E9] px-2 py-0.5 rounded font-bold">
                    Depth: High
                  </span>
                </div>
                <div className="w-10 h-10 rounded-lg bg-[#FAF9F6] border border-[#EAE8E2] flex items-center justify-center mb-4 text-[#121212] group-hover:scale-105 transition-transform">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                    <path d="M4 6h16M4 12h16M4 18h10" />
                    <circle cx="18" cy="18" r="2" fill="#16A34A" />
                  </svg>
                </div>
                <h3 className="font-heading font-bold text-lg text-[#121212] mb-2 group-hover:underline">
                  What an AI Model Actually Is
                </h3>
                <p className="text-xs text-[#55534E] leading-relaxed mb-6 flex-1">
                  Deconstructing transformer weight distributions, inference kernels, and why
                  anthropomorphic mental models lead to fragile production prompts.
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-[#F4F2EC] text-[11px] font-mono text-[#7A7872]">
                  <span>12 min read</span>
                  <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                </div>
              </Link>

              {/* Card 2: Agent Reliability & Architecture */}
              <Link
                href="/systems/engineering-agentic-systems-for-reliability"
                className="group flex flex-col p-6 rounded-xl bg-white border border-[#EAE8E2] hover:border-[#121212] transition-all hover:shadow-sm text-decoration-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#121212]"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[10px] font-semibold tracking-wider text-[#8A8780] uppercase">
                    ED. 02 · FIELD NOTES
                  </span>
                  <span className="font-mono text-[10px] text-[#2563EB] bg-[#EFF6FF] px-2 py-0.5 rounded font-bold">
                    Depth: Hands-on
                  </span>
                </div>
                <div className="w-10 h-10 rounded-lg bg-[#FAF9F6] border border-[#EAE8E2] flex items-center justify-center mb-4 text-[#121212] group-hover:scale-105 transition-transform">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                    <polyline points="4 17 10 11 4 5" />
                    <line x1="12" y1="19" x2="20" y2="19" />
                  </svg>
                </div>
                <h3 className="font-heading font-bold text-lg text-[#121212] mb-2 group-hover:underline">
                  Engineering Agentic Systems for Reliability
                </h3>
                <p className="text-xs text-[#55534E] leading-relaxed mb-6 flex-1">
                  A practical reliability model for multi-step agent trajectories built around governed
                  steps, deterministic state validation, and runtime escalation gates.
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-[#F4F2EC] text-[11px] font-mono text-[#7A7872]">
                  <span>14 min read</span>
                  <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                </div>
              </Link>

              {/* Card 3: MCP Architecture & Policy Runtimes */}
              <Link
                href="/systems/policy-governed-mcp-runtimes-for-secure-tool-execution"
                className="group flex flex-col p-6 rounded-xl bg-white border border-[#EAE8E2] hover:border-[#121212] transition-all hover:shadow-sm text-decoration-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#121212]"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[10px] font-semibold tracking-wider text-[#8A8780] uppercase">
                    ED. 03 · TOOL WATCH
                  </span>
                  <span className="font-mono text-[10px] text-[#7C3AED] bg-[#F5F3FF] px-2 py-0.5 rounded font-bold">
                    Depth: Architecture
                  </span>
                </div>
                <div className="w-10 h-10 rounded-lg bg-[#FAF9F6] border border-[#EAE8E2] flex items-center justify-center mb-4 text-[#121212] group-hover:scale-105 transition-transform">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                    <rect x="2" y="2" width="20" height="8" rx="2" />
                    <rect x="2" y="14" width="20" height="8" rx="2" />
                    <line x1="6" y1="6" x2="6.01" y2="6" strokeWidth="2.5" />
                    <line x1="6" y1="18" x2="6.01" y2="18" strokeWidth="2.5" />
                  </svg>
                </div>
                <h3 className="font-heading font-bold text-lg text-[#121212] mb-2 group-hover:underline">
                  Policy-Governed MCP Runtimes
                </h3>
                <p className="text-xs text-[#55534E] leading-relaxed mb-6 flex-1">
                  How to design secure execution sandboxes and policy validation gates for Model Context
                  Protocol servers in autonomous production workflows.
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-[#F4F2EC] text-[11px] font-mono text-[#7A7872]">
                  <span>11 min read</span>
                  <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* ── 4. FEATURED PROJECTS: TABBED CODE HUDS (FULL WIDTH EDGE-TO-EDGE) ── */}
        <section id="projects" className="scroll-mt-28 w-full border-b border-[#EAE8E2] bg-[#FAF9F6]">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-16">
            <div className="flex justify-between items-end mb-8 flex-wrap gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#8A8780]">
                  BENCH // CODE & HARNESSES
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[#121212]">
                  Open-source runtimes and sandboxes.
                </h2>
              </div>
              <span className="font-mono text-xs text-[#7A7872]">
                Interactive code sandboxes · 1-click copy
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              {FEATURED_PROJECTS.map((proj, projIdx) => {
                const activeTabIdx = projectTabs[projIdx] || 0;
                const currentTab = proj.tabs[activeTabIdx];
                const codeString = currentTab.lines.join("\n");
                const isCopied = copiedCodeIdx === projIdx;

                return (
                  <div
                    key={proj.title}
                    className="flex flex-col h-full rounded-xl bg-white border border-[#EAE8E2] overflow-hidden shadow-2xs hover:border-[#D5D2C9] transition-all"
                  >
                    {/* Standardized Card Header: Uniform Height for Grid Alignment */}
                    <div className="p-5 border-b border-[#EAE8E2] flex flex-col justify-between min-h-[145px]">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-[10px] uppercase font-bold text-[#16A34A] tracking-wider bg-[#DCFCE7] px-2 py-0.5 rounded">
                          {proj.status}
                        </span>
                        <span className="text-xs text-[#7A7872] font-mono">
                          ★ {proj.stars}
                        </span>
                      </div>
                      <h3 className="font-heading font-bold text-base text-[#121212] pt-2">
                        {proj.title}
                      </h3>
                      <p className="text-xs text-[#55534E] leading-relaxed pt-1 line-clamp-2">
                        {proj.summary}
                      </p>
                    </div>

                    {/* Uniform Tab Bar */}
                    <div className="flex items-center justify-between px-3 bg-[#1E1E1E] text-xs font-mono border-b border-[#333333] h-10 shrink-0">
                      <div className="flex items-center gap-1 overflow-x-auto">
                        {proj.tabs.map((t, tIdx) => (
                          <button
                            key={t.title}
                            onClick={() =>
                              setProjectTabs((prev) => ({ ...prev, [projIdx]: tIdx }))
                            }
                            className={`px-3 py-2 text-[11px] transition-colors cursor-pointer ${
                              activeTabIdx === tIdx
                                ? "text-white bg-[#2D2D2D] font-bold border-b-2 border-[#16A34A]"
                                : "text-[#888888] hover:text-[#CCCCCC]"
                            }`}
                          >
                            {t.title}
                          </button>
                        ))}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] text-[#888888] hidden sm:inline">
                          {currentTab.filename}
                        </span>
                        <button
                          onClick={() => handleCopyCode(projIdx, codeString)}
                          className="px-2 py-1 text-[10px] rounded bg-[#2D2D2D] hover:bg-[#3D3D3D] text-[#CCCCCC] transition-colors cursor-pointer flex items-center gap-1"
                          title="Copy file contents"
                        >
                          {isCopied ? (
                            <span className="text-[#86EFAC] font-bold">✓ Copied</span>
                          ) : (
                            <span>📋 Copy</span>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Terminal Code Body (Consistent Height) */}
                    <div className="p-4 bg-[#181818] font-mono text-xs text-[#E5E5E5] overflow-x-auto h-[180px] leading-relaxed select-text flex-1">
                      <pre className="m-0">
                        <code>
                          {currentTab.lines.map((line, lIdx) => (
                            <div key={lIdx} className="table-row">
                              <span className="table-cell pr-4 text-[#555555] select-none text-[10px] text-right">
                                {lIdx + 1}
                              </span>
                              <span className="table-cell">{line}</span>
                            </div>
                          ))}
                        </code>
                      </pre>
                    </div>

                    {/* Card Footer Link (Fixed Baseline Height) */}
                    <div className="px-4 py-3 bg-[#FAF9F6] border-t border-[#EAE8E2] flex items-center justify-between text-xs font-mono shrink-0 h-12">
                      <span className="text-[#7A7872]">{proj.role}</span>
                      <a
                        href={proj.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#121212] font-semibold hover:text-[#16A34A] transition-colors flex items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#121212] rounded"
                      >
                        <span>Inspect Repository</span>
                        <span>&rarr;</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 5. PYPI DEVELOPER BENCH (FULL WIDTH EDGE-TO-EDGE) ── */}
        <section id="tools" className="scroll-mt-28 w-full border-b border-[#EAE8E2] bg-[#FAF9F6]">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-16">
            <div className="flex justify-between items-end mb-8 flex-wrap gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#8A8780]">
                  PYPI // DEVELOPER BENCH
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[#121212]">
                  Published packages & libraries.
                </h2>
              </div>
              {/* Filter Pills */}
              <div className="flex items-center gap-2 font-mono text-xs flex-wrap">
                <button
                  onClick={() => setActivePackageFilter("all")}
                  className={`px-3 py-1 rounded-full cursor-pointer transition-colors ${
                    activePackageFilter === "all"
                      ? "bg-[#121212] text-white font-bold"
                      : "bg-[#F4F2EC] hover:bg-[#EAE8E2] text-[#55534E]"
                  }`}
                >
                  All Packages (4)
                </button>
                <button
                  onClick={() => setActivePackageFilter("runtimes")}
                  className={`px-3 py-1 rounded-full cursor-pointer transition-colors ${
                    activePackageFilter === "runtimes"
                      ? "bg-[#121212] text-white font-bold"
                      : "bg-[#F4F2EC] hover:bg-[#EAE8E2] text-[#55534E]"
                  }`}
                >
                  Runtimes (2)
                </button>
                <button
                  onClick={() => setActivePackageFilter("state")}
                  className={`px-3 py-1 rounded-full cursor-pointer transition-colors ${
                    activePackageFilter === "state"
                      ? "bg-[#121212] text-white font-bold"
                      : "bg-[#F4F2EC] hover:bg-[#EAE8E2] text-[#55534E]"
                  }`}
                >
                  State (1)
                </button>
                <button
                  onClick={() => setActivePackageFilter("policy")}
                  className={`px-3 py-1 rounded-full cursor-pointer transition-colors ${
                    activePackageFilter === "policy"
                      ? "bg-[#121212] text-white font-bold"
                      : "bg-[#F4F2EC] hover:bg-[#EAE8E2] text-[#55534E]"
                  }`}
                >
                  Policy (1)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
              {filteredPackages.map((p) => {
                const isCopied = copiedPkg === p.pkg;
                return (
                  <div
                    key={p.pkg}
                    className="p-5 rounded-xl bg-white border border-[#EAE8E2] flex flex-col justify-between hover:border-[#121212] transition-all shadow-2xs h-full"
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] uppercase font-bold text-[#16A34A] tracking-wider bg-[#DCFCE7] px-2 py-0.5 rounded">
                          v{p.version}
                        </span>
                        <span className="font-mono text-[10px] text-[#7A7872]">
                          {p.installs}
                        </span>
                      </div>
                      <strong className="font-heading font-bold text-base text-[#121212]">
                        {p.pkg}
                      </strong>
                      <p className="text-xs text-[#55534E] leading-relaxed">
                        {p.desc}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-[#F4F2EC] flex flex-col gap-2">
                      <button
                        onClick={() => handleCopyPkg(p.pkg, p.installCmd)}
                        className="w-full px-3 py-2 rounded-lg bg-[#FAF9F6] hover:bg-[#F4F2EC] border border-[#EAE8E2] font-mono text-[11px] text-[#121212] text-left flex items-center justify-between transition-colors cursor-pointer"
                      >
                        <span className="truncate">{p.installCmd}</span>
                        <span className="text-[10px] font-bold text-[#16A34A] shrink-0 ml-2">
                          {isCopied ? "✓ COPIED" : "COPY"}
                        </span>
                      </button>
                      <a
                        href={p.pypiUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-mono text-[#7A7872] hover:text-[#121212] transition-colors text-right flex items-center justify-end gap-1"
                      >
                        <span>PyPI / Docs</span>
                        <span>&rarr;</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 5.5 METHODOLOGY & ARCHITECTURAL INQUIRIES (AEO & GEO DIRECT ANSWER TARGET) ── */}
        <section id="methodology" className="scroll-mt-28 w-full border-b border-[#EAE8E2] bg-[#FAF9F6]">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-16">
            <div className="flex justify-between items-end mb-8 flex-wrap gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#8A8780]">
                  METHODOLOGY // ARCHITECTURAL INQUIRIES
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[#121212]">
                  Frequently analyzed engineering questions.
                </h2>
              </div>
              <span className="font-mono text-xs text-[#7A7872]">
                Authoritative synthesis for engineers & generative search engines
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              <article className="p-6 rounded-xl bg-white border border-[#EAE8E2] flex flex-col justify-between gap-4 shadow-2xs">
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#16A34A] bg-[#DCFCE7] px-2.5 py-0.5 rounded w-fit">
                    CORE THESIS
                  </span>
                  <h3 className="font-heading font-bold text-base text-[#121212]">
                    What is the &ldquo;Pruning My Pothos&rdquo; engineering philosophy?
                  </h3>
                  <p className="text-xs text-[#55534E] leading-relaxed">
                    Just as a healthy pothos vine flourishes only when yellowing leaves and unruly vines are pruned, 
                    software systems stay resilient when teams deliberately prune away transient noise, 
                    ungrounded abstractions, and brittle prompt chains to nourish durable, verifiable primitives.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#F4F2EC] flex items-center justify-between text-[11px] font-mono text-[#7A7872]">
                  <span>Lifecycle: 6 Verified Stages</span>
                  <a href="#hero" className="text-[#16A34A] hover:underline">Inspect Botanical Vine &uarr;</a>
                </div>
              </article>

              <article className="p-6 rounded-xl bg-white border border-[#EAE8E2] flex flex-col justify-between gap-4 shadow-2xs">
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#DC2626] bg-[#FEE2E2] px-2.5 py-0.5 rounded w-fit">
                    FAILURE ANALYSIS
                  </span>
                  <h3 className="font-heading font-bold text-base text-[#121212]">
                    Why do multi-step AI coding agents fail in production codebases?
                  </h3>
                  <p className="text-xs text-[#55534E] leading-relaxed">
                    Agents break due to unchecked context compaction, silent hallucination drift, and lack of typed verification 
                    gates. Without deterministic state machines, AST validation, and fail-fast sandboxes, errors compound 
                    exponentially across long autonomous trajectories.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#F4F2EC] flex items-center justify-between text-[11px] font-mono text-[#7A7872]">
                  <span>Gate Accuracy: 99.4%</span>
                  <Link href="/systems/engineering-agentic-systems-for-reliability" className="text-[#121212] hover:underline font-semibold">Read Field Notes &rarr;</Link>
                </div>
              </article>

              <article className="p-6 rounded-xl bg-white border border-[#EAE8E2] flex flex-col justify-between gap-4 shadow-2xs">
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#2563EB] bg-[#EFF6FF] px-2.5 py-0.5 rounded w-fit">
                    PROTOCOL STANDARDS
                  </span>
                  <h3 className="font-heading font-bold text-base text-[#121212]">
                    What is the role of Model Context Protocol (MCP) in modern workflows?
                  </h3>
                  <p className="text-xs text-[#55534E] leading-relaxed">
                    MCP standardizes tool invocation, file system boundaries, and resource state via JSON-RPC. It replaces 
                    proprietary API harnesses with modular, sandboxed capability servers that remain model-agnostic and auditable.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#F4F2EC] flex items-center justify-between text-[11px] font-mono text-[#7A7872]">
                  <span>Protocol: JSON-RPC 2.0</span>
                  <Link href="/systems/policy-governed-mcp-runtimes-for-secure-tool-execution" className="text-[#121212] hover:underline font-semibold">Read Architecture &rarr;</Link>
                </div>
              </article>

              <article className="p-6 rounded-xl bg-white border border-[#EAE8E2] flex flex-col justify-between gap-4 shadow-2xs">
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#7C3AED] bg-[#F5F3FF] px-2.5 py-0.5 rounded w-fit">
                    RUNTIME BENCH
                  </span>
                  <h3 className="font-heading font-bold text-base text-[#121212]">
                    How are the open-source tools (DAX, PaneTera, Verb) verified?
                  </h3>
                  <p className="text-xs text-[#55534E] leading-relaxed">
                    All published runtimes are tested on production workloads using strict type contracts, 100% test coverage, 
                    and zero-regression policy gates, released under permissive open-source licenses on GitHub and PyPI.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#F4F2EC] flex items-center justify-between text-[11px] font-mono text-[#7A7872]">
                  <span>Telemetry: 58k+ monthly installs</span>
                  <a href="#projects" className="text-[#121212] hover:underline font-semibold">Inspect Code &darr;</a>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ── 6. CURATED SHELF CALLOUT (FULL WIDTH EDGE-TO-EDGE) ── */}
        <section id="shelf" className="scroll-mt-28 w-full border-b border-[#EAE8E2] bg-[#FAF9F6]">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-16">
            <div className="rounded-2xl p-8 sm:p-12 bg-[#F4F2EC] border border-[#EAE8E2] flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
              <div className="flex flex-col gap-4 max-w-2xl z-10">
                <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#8A8780]">
                  COLLECTION // THE ARCHIVE
                </span>
                <h2 className="font-heading text-3xl sm:text-4xl font-black tracking-tight text-[#121212]">
                  Explore the complete library of systems essays & field notes.
                </h2>
                <p className="text-sm text-[#55534E] leading-relaxed">
                  Over 58 long-form architectural breakdowns, hands-on tool benchmarks, and design
                  patterns for building durable production systems with LLMs and autonomous agents.
                </p>
                <div className="pt-2 flex items-center gap-4 flex-wrap">
                  <Link
                    href="/systems"
                    className="px-6 py-3 rounded-lg bg-[#121212] hover:bg-[#2A2926] text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#121212]"
                  >
                    Browse All Systems &rarr;
                  </Link>
                  <Link
                    href="/shelf"
                    className="px-6 py-3 rounded-lg bg-white hover:bg-[#FAF9F6] border border-[#D5D2C9] text-[#121212] text-xs font-mono font-bold uppercase tracking-wider transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#121212]"
                  >
                    Shelf Index
                  </Link>
                </div>
              </div>

              <div className="w-full md:w-auto flex justify-center z-10">
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl bg-white border border-[#EAE8E2] p-6 flex flex-col items-center justify-center text-center shadow-xs">
                  <span className="font-heading font-black text-4xl sm:text-5xl text-[#121212]">
                    58
                  </span>
                  <span className="font-mono text-[10px] uppercase font-bold text-[#8A8780] tracking-wider pt-1">
                    Systems Published
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ── 7. EDITORIAL FOOTER & BOTTOM NEWSLETTER (FULL WIDTH EDGE-TO-EDGE) ── */}
      <footer id="about" className="scroll-mt-28 w-full bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-16 text-center flex flex-col items-center gap-6">
          <div className="flex flex-col gap-2 max-w-xl">
            <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#121212]">
              Found something useful? <br />
              Get the next technical breakdown in your inbox.
            </h3>
            <p className="text-xs text-[#55534E]">
              Occasional field notes on orchestration, runtime evaluations, and what broke in practice.
            </p>
          </div>

          {/* Bottom Newsletter Input */}
          <div className="w-full max-w-md">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!email2) return;
                setStatus2("done");
              }}
              className="flex flex-col sm:flex-row gap-2"
            >
              <input
                type="email"
                required
                value={email2}
                onChange={(e) => setEmail2(e.target.value)}
                placeholder="Enter your email"
                aria-label="Bottom newsletter subscription input"
                className="flex-1 px-4 py-3 rounded-lg border border-[#D5D2C9] bg-white text-sm font-mono text-[#121212] placeholder:text-[#A8A29E] focus:outline-none focus:border-[#121212]"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-lg bg-[#121212] hover:bg-[#2A2926] text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#121212]"
              >
                JOIN 2,400+
              </button>
            </form>
            {status2 === "done" && (
              <div className="mt-2 p-2 bg-[#E8F5E9] border border-[#C8E6C9] rounded-lg text-xs font-mono text-[#2E7D32]">
                &#10003; Subscribed! See you Thursday.
              </div>
            )}
          </div>
        </div>

        {/* Hairline Sub-Footer */}
        <div className="w-full border-t border-[#EAE8E2] py-8 bg-[#F4F2EC]/50">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex flex-col sm:flex-row justify-between items-center gap-6 text-xs text-[#7A7872]">
            <div className="flex items-center gap-3">
              <span className="font-heading font-extrabold text-sm text-[#121212]">
                Pruning My Pothos
              </span>
              <span>·</span>
              <span>Built by Shailesh Rawat</span>
            </div>

            <div className="flex items-center gap-6 font-mono text-[11px] flex-wrap justify-center">
              <Link href="/systems" className="hover:text-[#121212] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#121212] rounded">
                Systems
              </Link>
              <Link href="/shelf" className="hover:text-[#121212] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#121212] rounded">
                Shelf
              </Link>
              <Link href="/self" className="hover:text-[#121212] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#121212] rounded">
                About
              </Link>
              <a
                href="https://github.com/ShaileshRawat1403/pruning-my-pothos"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#121212] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#121212] rounded"
              >
                GitHub
              </a>
            </div>

            <span className="font-mono text-[10px] text-[#A8A29E]">
              PRUNING MY POTHOS · AI RUNTIMES &amp; ARCHITECTURES
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
