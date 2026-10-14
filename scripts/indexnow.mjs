// Tells Bing (and the other IndexNow engines) which pages changed in a deploy,
// so they recrawl them within hours instead of weeks. Bing's index also feeds
// Copilot and ChatGPT search.
//
// Run by the Deploy to Hostinger workflow after out/ is published. It submits
// the pages whose sitemap lastmod falls in the last few days, plus the home
// page. It never fails the deploy: any problem is logged and skipped.
//
// Usage: node scripts/indexnow.mjs [--dry-run]
import { readFileSync, readdirSync } from "node:fs";

const HOST = "pruningmypothos.com";
const DAYS = 3;
const dryRun = process.argv.includes("--dry-run");

// The key is the name of a public/<32 hex>.txt file whose content is the key.
const keyFile = readdirSync("public").find((f) => /^[0-9a-f]{32}\.txt$/.test(f));
if (!keyFile) {
  console.log("indexnow: no key file in public/, skipping");
  process.exit(0);
}
const key = keyFile.replace(/\.txt$/, "");

const sitemap = readFileSync("out/sitemap.xml", "utf8");
const cutoff = Date.now() - DAYS * 24 * 60 * 60 * 1000;
const urls = new Set([`https://${HOST}/`]);
for (const m of sitemap.matchAll(/<url>\s*<loc>([^<]+)<\/loc>(?:\s*<lastmod>([^<]+)<\/lastmod>)?/g)) {
  if (m[2] && Date.parse(m[2]) >= cutoff) urls.add(m[1]);
}

const body = { host: HOST, key, keyLocation: `https://${HOST}/${keyFile}`, urlList: [...urls] };
console.log(`indexnow: ${urls.size} URL(s) changed in the last ${DAYS} days`);
for (const u of urls) console.log(`  ${u}`);
if (dryRun) process.exit(0);

// Hostinger pulls the deploy branch on its own schedule; give it time to serve
// the key file before the engines come to check it.
async function keyIsLive() {
  for (let i = 0; i < 20; i++) {
    try {
      const res = await fetch(body.keyLocation, { cache: "no-store" });
      if (res.ok && (await res.text()).trim() === key) return true;
    } catch {}
    await new Promise((r) => setTimeout(r, 30_000));
  }
  return false;
}

try {
  if (!(await keyIsLive())) {
    console.log("indexnow: key file not live after 10 minutes, skipping");
    process.exit(0);
  }
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });
  console.log(`indexnow: HTTP ${res.status} ${await res.text()}`);
} catch (err) {
  console.log(`indexnow: ${err.message}, skipping`);
}
