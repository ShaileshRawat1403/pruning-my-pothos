#!/usr/bin/env node
/**
 * export-storyboards.mjs — render the drawn artwork that has to exist as files:
 *
 *   public/storyboards/pdf/<slug>.pdf   each storyboard as a 4:5 PDF deck
 *   public/storyboards/og/<slug>.png    each storyboard's 1200 x 630 link preview
 *   public/covers/systems/<slug>.png    each Systems article's cover, for link
 *                                       previews (the page draws it live)
 *
 *   npm run build && npm run export:storyboards
 *
 * Serves the built `out/` directory locally and drives headless Chrome against
 * the noindex source routes (/storyboards/<slug>/print/, /storyboards/<slug>/share/,
 * /cover-art/<slug>/), so every file is rendered from exactly the drawing the
 * site shows. Text stays text in the PDF. Outputs are mirrored into out/ so the
 * current build ships them too.
 *
 * A local, human-run step, like approving the drawings themselves: CI builds
 * the site from the committed files and does not need a browser, and the
 * contract suite fails if a storyboard or cover has no exported file. Re-run
 * after changing any frame or cover. Set CHROME_PATH to use another browser.
 * Pass --only=<slug> to render one storyboard and one cover.
 */
import http from "node:http";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const OUT = path.join(ROOT, "out");
const CHROME = process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const ONLY = process.argv.find((a) => a.startsWith("--only="))?.slice(7);

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".woff2": "font/woff2",
  ".txt": "text/plain",
};

function fail(msg) {
  console.error(`export-storyboards: ${msg}`);
  process.exit(1);
}

if (!fs.existsSync(OUT)) fail("no out/ directory. Run `npm run build` first.");
if (!fs.existsSync(CHROME)) fail(`Chrome not found at ${CHROME}. Set CHROME_PATH.`);

/** Slugs that have a given source route in the build, e.g. storyboards/<slug>/print. */
function slugsWith(dir, sub) {
  const base = path.join(OUT, dir);
  if (!fs.existsSync(base)) return [];
  return fs
    .readdirSync(base, { withFileTypes: true })
    .filter((d) => d.isDirectory() && fs.existsSync(path.join(base, d.name, sub, "index.html")))
    .map((d) => d.name)
    .filter((s) => !ONLY || s === ONLY);
}

const server = http.createServer((req, res) => {
  const url = decodeURIComponent(new URL(req.url, "http://x").pathname);
  let file = path.join(OUT, url);
  if (!file.startsWith(OUT)) return res.writeHead(403).end();
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, "index.html");
  if (!fs.existsSync(file)) return res.writeHead(404).end();
  res.writeHead(200, { "content-type": MIME[path.extname(file)] || "application/octet-stream" });
  fs.createReadStream(file).pipe(res);
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const origin = `http://127.0.0.1:${server.address().port}`;

// Async on purpose: this same process serves the pages Chrome loads, so a
// synchronous spawn would block the server and deadlock.
//
// Headless Chrome writes its output and then can linger for minutes before
// exiting. So we watch for the output file instead: once it exists and its
// size has stopped changing, the render is done and Chrome is closed.
async function chrome(args, url, outFile) {
  if (fs.existsSync(outFile)) fs.rmSync(outFile);
  const child = spawn(
    CHROME,
    [
      "--headless=new",
      // A throwaway profile, so an open everyday Chrome cannot lock it.
      `--user-data-dir=${fs.mkdtempSync(path.join(os.tmpdir(), "pmp-art-"))}`,
      "--disable-gpu",
      "--no-first-run",
      "--no-default-browser-check",
      "--disable-extensions",
      "--disable-background-networking",
      "--hide-scrollbars",
      "--run-all-compositor-stages-before-draw",
      "--virtual-time-budget=4000",
      ...args,
      `${origin}${url}`,
    ],
    { stdio: "ignore" },
  );
  const started = Date.now();
  let last = -1;
  try {
    for (;;) {
      if (Date.now() - started > 120000) fail(`timed out rendering ${url}`);
      await new Promise((r) => setTimeout(r, 400));
      if (!fs.existsSync(outFile)) continue;
      const size = fs.statSync(outFile).size;
      if (size > 0 && size === last) return;
      last = size;
    }
  } finally {
    child.kill("SIGKILL");
  }
}

function place(file, publicRel) {
  if (!fs.existsSync(file)) fail(`Chrome produced nothing for ${publicRel}.`);
  const mirror = path.join(OUT, publicRel);
  fs.mkdirSync(path.dirname(mirror), { recursive: true });
  fs.copyFileSync(file, mirror);
  console.log(`  ${publicRel}  ${Math.round(fs.statSync(file).size / 1024)} KB`);
}

async function screenshot(url, publicRel, w, h) {
  const file = path.join(ROOT, "public", publicRel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  await chrome(["--force-device-scale-factor=1", `--window-size=${w},${h}`, `--screenshot=${file}`], url, file);
  place(file, publicRel);
}

async function pdf(url, publicRel) {
  const file = path.join(ROOT, "public", publicRel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  await chrome(["--no-pdf-header-footer", `--print-to-pdf=${file}`], url, file);
  place(file, publicRel);
}

try {
  const storyboards = slugsWith("storyboards", "print");
  const covers = slugsWith("cover-art", "");
  if (storyboards.length === 0 && covers.length === 0) fail("nothing to export in out/.");

  console.log(`Storyboards (${storyboards.length})`);
  for (const slug of storyboards) {
    await pdf(`/storyboards/${slug}/print/`, `storyboards/pdf/${slug}.pdf`);
    await screenshot(`/storyboards/${slug}/share/`, `storyboards/og/${slug}.png`, 1200, 630);
  }
  console.log(`Article covers (${covers.length})`);
  for (const slug of covers) {
    await screenshot(`/cover-art/${slug}/`, `covers/systems/${slug}.png`, 1200, 630);
  }
} finally {
  server.close();
}
