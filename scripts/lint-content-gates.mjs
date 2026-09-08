#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

const FORBIDDEN_MARKERS = [
  { pattern: /REPLACE_ME/g, label: "Unresolved placeholder (REPLACE_ME)" },
  { pattern: /2,400\+/g, label: "Synthetic subscriber count (2,400+)" },
  { pattern: /\b\d+(\.\d+)?k\/mo\b/g, label: "Synthetic monthly metric (k/mo)" },
  { pattern: /99\.4%/g, label: "Synthetic benchmark claim (99.4%)" },
  { pattern: /★/g, label: "Fabricated GitHub star icon (★)" },
  { pattern: /—/g, label: "Em dash (—) forbidden by editorial style guide" },
  { pattern: /\bgame-changing\b/gi, label: "Marketing buzzword (game-changing)" },
  { pattern: /\bcutting-edge\b/gi, label: "Marketing buzzword (cutting-edge)" },
  { pattern: /\bseamless\b/gi, label: "Marketing buzzword (seamless)" },
  { pattern: /\brevolutionary\b/gi, label: "Marketing buzzword (revolutionary)" },
  { pattern: /\bbattle-tested\b/gi, label: "Marketing buzzword (battle-tested)" },
  { pattern: /\bzero hallucination\b/gi, label: "Marketing buzzword (zero hallucination)" },
  { pattern: /\b100% test coverage\b/gi, label: "Synthetic claim (100% test coverage)" },
  { pattern: /\b100% test pass\b/gi, label: "Synthetic claim (100% test pass)" },
  { pattern: /\bSoftware Engineer\b/g, label: "Invented title for Shailesh (Software Engineer)" },
  { pattern: /\bSystems Architect\b/g, label: "Invented title for Shailesh (Systems Architect)" },
  { pattern: /\bAI Architect\b/g, label: "Invented title for Shailesh (AI Architect)" },
];

const TARGET_FILES = [
  "src/app/page.tsx",
  "src/app/editorial-preview/page.tsx",
  "src/components/Header.tsx",
  "src/components/NewsletterForm.tsx",
  "src/components/home/BotanicalLifecycle.tsx",
  "src/components/home/Hero.tsx",
  "src/components/home/StartHere.tsx",
  "src/components/home/Projects.tsx",
  "src/components/home/ProjectInspector.tsx",
  "src/components/home/Tools.tsx",
  "src/components/home/ToolGrid.tsx",
  "src/components/home/Methodology.tsx",
];

let totalErrors = 0;

console.log("\n── Running Content Gate Integrity Linter ──\n");

for (const relPath of TARGET_FILES) {
  const absPath = path.join(ROOT, relPath);
  if (!fs.existsSync(absPath)) {
    console.warn(`[WARN] Target file does not exist: ${relPath}`);
    continue;
  }

  const content = fs.readFileSync(absPath, "utf-8");
  const lines = content.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (const { pattern, label } of FORBIDDEN_MARKERS) {
      pattern.lastIndex = 0;
      if (pattern.test(line)) {
        console.error(`[ERROR] ${relPath}:${i + 1} - ${label}`);
        console.error(`        Line: ${line.trim()}`);
        totalErrors++;
      }
    }
  }
}

// Check systems frontmatter for useValue / boundary advisory coverage
const systemsDir = path.join(ROOT, "src/content/systems");
let totalSystems = 0;
let systemsWithBoundary = 0;
let systemsWithUseValue = 0;

if (fs.existsSync(systemsDir)) {
  const files = fs.readdirSync(systemsDir).filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));
  totalSystems = files.length;

  for (const file of files) {
    const filePath = path.join(systemsDir, file);
    const content = fs.readFileSync(filePath, "utf-8");
    if (content.startsWith("---")) {
      const parts = content.split("---");
      if (parts.length >= 3) {
        const frontmatter = parts[1];
        if (/^useValue:/m.test(frontmatter)) {
          systemsWithUseValue++;
        }
        if (/^boundary:/m.test(frontmatter)) {
          systemsWithBoundary++;
        }
      }
    }
  }
}

console.log(`\n[INFO] Systems Explainer Schema Coverage:`);
console.log(`       - Total systems: ${totalSystems}`);
console.log(`       - With useValue: ${systemsWithUseValue} / ${totalSystems}`);
console.log(`       - With boundary: ${systemsWithBoundary} / ${totalSystems}`);
console.log(`       (Advisory: schemas available for rollout on existing and new systems)`);

if (totalErrors > 0) {
  console.error(`\n❌ [FAIL] Content gate failed with ${totalErrors} violation(s).\n`);
  process.exit(1);
} else {
  console.log(`\n✓ [PASS] All content gates passed. 0 forbidden markers, 0 em dashes in home components.\n`);
  process.exit(0);
}
