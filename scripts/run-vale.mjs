#!/usr/bin/env node
/**
 * run-vale.mjs — Cross-platform runner for Vale >= 3.x
 *
 * Checks for Vale presence, detects version, and executes according to mode:
 *   --v1-only   Run Vale only on documents declaring schemaVersion: "1.0" (Blocking in CI)
 *   --legacy    Run Vale on legacy archive in ADVISORY mode (outputs issues, exits 0)
 *   --file <p>  Run Vale on a specific file
 */

import { execSync, spawnSync } from "node:child_process";
import { promises as fs } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const PINNED_CI_VALE_VERSION = "3.17.0";

const CONTENT_DIRS = [
  "src/content/systems",
  "src/content/self",
];

function checkValeInstalled() {
  if (process.env.VALE_FORCE_MISSING === "1") {
    return { installed: false, version: null, bin: "vale" };
  }
  const candidates = [
    process.env.VALE_BIN,
    "vale",
    "/opt/hostedtoolcache/vale/3.17.0/x64/vale",
    "/usr/local/bin/vale",
    "/opt/homebrew/bin/vale",
  ].filter(Boolean);
  for (const bin of candidates) {
    try {
      const versionOutput = execSync(`${bin} --version`, { encoding: "utf8" }).trim();
      const match = versionOutput.match(/vale\s+version\s+([0-9.]+)/i);
      const version = match ? match[1] : versionOutput;
      return { installed: true, version, bin };
    } catch {
      // try next candidate
    }
  }
  return { installed: false, version: null, bin: "vale" };
}

async function collectFiles() {
  const allFiles = [];
  for (const relDir of CONTENT_DIRS) {
    const absDir = path.resolve(ROOT, relDir);
    try {
      const entries = await fs.readdir(absDir, { withFileTypes: true });
      for (const entry of entries) {
        if (entry.isFile() && (entry.name.endsWith(".md") || entry.name.endsWith(".mdx"))) {
          allFiles.push(path.join(absDir, entry.name));
        }
      }
    } catch {
      // Directory may not exist yet
    }
  }
  return allFiles;
}

function parseArgs(argv) {
  const args = { v1Only: false, legacy: false, file: null };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--v1-only") args.v1Only = true;
    else if (argv[i] === "--legacy") args.legacy = true;
    else if (argv[i] === "--file" && argv[i + 1]) args.file = argv[++i];
  }
  return args;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const { installed, version, bin } = checkValeInstalled();

  if (!installed) {
    console.warn("\n[WARN] Vale is not installed on PATH.");
    console.warn("  Local installation:");
    console.warn("    macOS: brew install vale");
    console.warn("    Linux: Download pinned binary from https://github.com/vale-cli/vale/releases");
    console.warn("  CI installation:");
    console.warn("    Pinned binary version: " + PINNED_CI_VALE_VERSION);

    // Fail closed: --file and --v1-only require Vale to run; missing Vale must block publication
    if (args.file || args.v1Only) {
      console.error("\n[ERROR] Vale is required for v1 and file-targeted validation. Blocking.\n");
      process.exit(1);
    }

    // Only --legacy is allowed to degrade to advisory warning
    console.warn("[ADVISORY] Skipping Vale prose lint on legacy archive (Vale unavailable).\n");
    process.exit(0);
  }

  // Version assertion: pinned in CI, advisory locally
  if (process.env.CI) {
    if (version !== PINNED_CI_VALE_VERSION) {
      console.error(`[ERROR] CI requires exact pinned Vale version ${PINNED_CI_VALE_VERSION}, found: ${version}`);
      process.exit(1);
    }
  } else if (version !== PINNED_CI_VALE_VERSION) {
    console.warn(`[WARN] Local Vale version is ${version}; CI runs pinned ${PINNED_CI_VALE_VERSION}.`);
  }

  let targetFiles = [];

  if (args.file) {
    targetFiles = [path.resolve(ROOT, args.file)];
  } else {
    const allFiles = await collectFiles();
    if (args.v1Only) {
      for (const file of allFiles) {
        const raw = await fs.readFile(file, "utf8");
        if (/schemaVersion:\s*["']1\.0["']/.test(raw)) {
          targetFiles.push(file);
        }
      }
    } else {
      targetFiles = allFiles;
    }
  }

  if (args.v1Only && targetFiles.length === 0) {
    console.log("\n── Vale Prose Lint (v1) ──");
    console.log("No v1 documents (schemaVersion: '1.0') found. Vale v1 gate skipped.\n");
    return;
  }

  console.log(`\n── Running Vale (${version}) over ${targetFiles.length} file(s) [mode: ${args.legacy ? "advisory" : "blocking"}] ──\n`);

  const relTargets = targetFiles.map((f) => path.relative(ROOT, f));
  const result = spawnSync(bin, ["--config=.vale.ini", ...relTargets], {
    cwd: ROOT,
    encoding: "utf8",
  });

  const stdout = result.stdout || "";
  const stderr = result.stderr || "";
  if (stdout) process.stdout.write(stdout);
  if (stderr) process.stderr.write(stderr);

  if (args.legacy) {
    // Advisory mode never exits with error
    if (result.status !== 0 || stdout.includes("✖")) {
      console.log("\n[ADVISORY] Vale reported prose suggestions on legacy archive. Non-blocking.");
    }
    process.exit(0);
  }

  // In blocking mode (v1-only or file): any Vale alert (warnings or errors) blocks publication
  const hasAlerts = stdout.includes("✖") || result.status !== 0;
  if (hasAlerts) {
    console.error(`\n[ERROR] Vale detected prose violations on v1 content. Blocking.`);
    process.exit(1);
  }

  process.exit(0);
}

main().catch((err) => {
  console.error("Unexpected error running Vale:", err);
  process.exit(1);
});
