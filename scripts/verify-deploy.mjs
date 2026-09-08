#!/usr/bin/env node
// Post-deploy check: hashes every real cover SVG in the local repo and
// compares it against the same path fetched from the live site. Exists
// because a manual FTP upload silently left 8 old cover files live on
// Hostinger -- same filenames, stale content -- while everything else on
// the site was current. Nothing caught that until someone happened to look
// at the pages. Run this after every deploy:
//
//   SITE_URL=https://pruningmypothos.com npm run verify:deploy
//
// Exits non-zero if anything is missing or stale, so it's safe to use as a
// gate (e.g. a follow-up manual step, or a workflow_dispatch CI job) rather
// than just a thing you remember to eyeball.

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';

const ROOT = process.cwd();
const COVERS_DIR = path.join(ROOT, 'public/covers');
const SITE_URL = (process.env.SITE_URL || 'https://pruningmypothos.com').replace(/\/$/, '');

// Leftover local preview/sample files that are gitignored and never deployed.
const EXCLUDE_RE = /\/_samples2?\//;

async function collectSvgs(dir) {
  const out = [];
  async function walk(current) {
    const entries = await fs.readdir(current, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        await walk(full);
      } else if (entry.name.endsWith('.svg')) {
        out.push(full);
      }
    }
  }
  await walk(dir);
  return out;
}

function sha256(buf) {
  return createHash('sha256').update(buf).digest('hex');
}

async function main() {
  const allFiles = await collectSvgs(COVERS_DIR);
  const files = allFiles.filter((f) => !EXCLUDE_RE.test(f.replace(/\\/g, '/')));

  console.log(`Comparing ${files.length} cover file(s) against ${SITE_URL}\n`);

  const mismatches = [];
  const notFound = [];
  let checked = 0;

  // Modest concurrency -- enough to be fast without hammering the host.
  const CONCURRENCY = 8;
  let index = 0;

  async function worker() {
    while (index < files.length) {
      const file = files[index++];
      const relPath = '/' + path.relative(path.join(ROOT, 'public'), file).replace(/\\/g, '/');
      const localBuf = await fs.readFile(file);
      const localHash = sha256(localBuf);

      let res;
      try {
        res = await fetch(`${SITE_URL}${relPath}`, { cache: 'no-store' });
      } catch (err) {
        notFound.push({ path: relPath, note: String(err) });
        continue;
      }
      if (!res.ok) {
        notFound.push({ path: relPath, note: `HTTP ${res.status}` });
        continue;
      }
      const liveBuf = Buffer.from(await res.arrayBuffer());
      const liveHash = sha256(liveBuf);
      checked++;
      if (liveHash !== localHash) {
        mismatches.push(relPath);
      }
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, worker));

  if (notFound.length > 0) {
    console.error(`${notFound.length} file(s) could not be fetched from the live site:`);
    for (const item of notFound) console.error(`  - ${item.path} (${item.note})`);
    console.error('');
  }

  if (mismatches.length > 0) {
    console.error(`STALE: ${mismatches.length} of ${checked} checked file(s) differ from the deployed copy:`);
    for (const m of mismatches) console.error(`  - ${SITE_URL}${m}`);
    console.error('\nThe repo has newer content than what is live. Re-run the deploy');
    console.error('(scripts/deploy-ftp.sh does a full mirror --delete sync, which fixes this).');
    process.exitCode = 1;
    return;
  }

  if (notFound.length > 0) {
    process.exitCode = 1;
    return;
  }

  console.log(`OK: all ${checked} checked cover file(s) match the live site.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
