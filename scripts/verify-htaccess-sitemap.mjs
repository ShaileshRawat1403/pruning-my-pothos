// verify-htaccess-sitemap.mjs: no URL in the built sitemap may be redirected
// or answered 410 by public/.htaccess. Run after `npm run build`.
//
// The rules are read from .htaccess itself (every active RewriteRule that
// redirects or answers Gone), so the check cannot drift from the file the
// server actually uses. Rules are Apache regexes over the path without its
// leading slash, which JavaScript's RegExp reads the same way for the
// patterns used here.
import fs from "node:fs/promises";
import path from "node:path";

const SITEMAP = path.resolve("out/sitemap.xml");
const HTACCESS = path.resolve("public/.htaccess");

const sitemap = await fs.readFile(SITEMAP, "utf8").catch(() => {
  console.error(`No ${SITEMAP}. Run \`npm run build\` first.`);
  process.exit(1);
});
const paths = [...sitemap.matchAll(/<loc>(?:https:\/\/pruningmypothos\.com)?\/?([^<]*)<\/loc>/g)].map((m) => m[1]);

const rules = [];
for (const line of (await fs.readFile(HTACCESS, "utf8")).split("\n")) {
  const m = line.match(/^\s*RewriteRule\s+(\S+)\s+(\S+)\s+\[([^\]]+)\]/);
  if (!m) continue;
  const [, pattern, target, flags] = m;
  const kind = /\bG\b|R=410/.test(flags) ? "410" : /R=30[12]/.test(flags) ? "redirect" : null;
  // The canonical-host rule (^(.*)$) only fires under its http/www conditions.
  if (!kind || pattern === "^(.*)$") continue;
  rules.push({ re: new RegExp(pattern), pattern, target, kind });
}

let failures = 0;
for (const p of paths) {
  for (const r of rules) {
    if (r.re.test(p)) {
      console.error(`CONFLICT /${p} is in the sitemap but .htaccess ${r.kind === "410" ? "answers 410" : `redirects it to ${r.target}`} (${r.pattern})`);
      failures++;
    }
  }
}

console.log(`Checked ${paths.length} sitemap URLs against ${rules.length} .htaccess rules.`);
if (failures) {
  console.error(`FAILED: ${failures} conflict(s).`);
  process.exitCode = 1;
} else {
  console.log("OK: no sitemap URL is redirected or gone.");
}
