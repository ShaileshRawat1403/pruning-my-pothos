// verify-related-links.mjs: every `related` link in Systems frontmatter, and
// every link written into an article body as /systems/..., points at a page
// that exists in the build. Run after `npm run build`.
//
// Salvaged from the unmerged codex/learning-discovery branch (2026-09-10),
// whose other checks targeted a schema that was never adopted.
import { readFileSync, readdirSync, existsSync } from "node:fs";
import matter from "gray-matter";

const DIR = "src/content/systems";
const built = (href) => existsSync(`out/${href.replace(/^\//, "").replace(/[#?].*$/, "").replace(/\/$/, "")}/index.html`);

const problems = [];
let checked = 0;
for (const file of readdirSync(DIR).filter((f) => /\.mdx?$/.test(f))) {
  const { data, content } = matter(readFileSync(`${DIR}/${file}`, "utf8"));
  for (const r of data.related ?? []) {
    checked++;
    if (!r.href?.startsWith("/") || r.href.startsWith("//")) problems.push(`${file}: related link is not local: ${r.href}`);
    else if (!built(r.href)) problems.push(`${file}: related link has no page: ${r.href}`);
  }
  for (const m of content.matchAll(/\]\((\/(?:systems|tools|storyboards|shelf|stack)\/[^)\s]*)\)/g)) {
    checked++;
    if (!built(m[1])) problems.push(`${file}: body link has no page: ${m[1]}`);
  }
}

if (!existsSync("out/index.html")) {
  console.error("No out/. Run `npm run build` first.");
  process.exit(1);
}
console.log(`Checked ${checked} internal links from Systems articles.`);
if (problems.length) {
  problems.forEach((p) => console.error(`BROKEN ${p}`));
  process.exitCode = 1;
} else console.log("OK: every link resolves to a built page.");
