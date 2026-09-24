#!/usr/bin/env node
/**
 * export-storyboards.mjs — render each storyboard to its
 * downloadable 4:5 PDF, from the same frames the website shows, plus its
 * 1200 x 630 link-preview PNG (social platforms do not render SVG previews).
 *
 *   npm run build && npm run export:storyboards
 *
 * Serves the built `out/` directory locally, prints every
 * /storyboards/<slug>/print/ page with headless Chrome (one 1080 x 1350 page
 * per frame, text kept as text), and writes the result to
 * public/storyboards/pdf/<slug>.pdf, mirrored into out/ so the current build
 * ships it too.
 *
 * A local, human-run step, like approving the frames themselves: CI builds the
 * site from the committed PDF and does not need a browser. Re-run it whenever
 * a storyboard's frames change. Set CHROME_PATH to use a different browser.
 */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import os from "node:os";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const OUT = path.join(ROOT, "out");
const CHROME =
  process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

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

const printRoot = path.join(OUT, "storyboards");
const slugs = fs
  .readdirSync(printRoot, { withFileTypes: true })
  .filter((d) => d.isDirectory() && fs.existsSync(path.join(printRoot, d.name, "print", "index.html")))
  .map((d) => d.name);
if (slugs.length === 0) fail("no /storyboards/<slug>/print/ pages in out/.");

const server = http.createServer((req, res) => {
  const url = decodeURIComponent(new URL(req.url, "http://x").pathname);
  let file = path.join(OUT, url);
  if (!file.startsWith(OUT)) {
    res.writeHead(403).end();
    return;
  }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, "index.html");
  if (!fs.existsSync(file)) {
    res.writeHead(404).end();
    return;
  }
  res.writeHead(200, { "content-type": MIME[path.extname(file)] || "application/octet-stream" });
  fs.createReadStream(file).pipe(res);
});

await new Promise((r) => server.listen(0, "127.0.0.1", r));
const port = server.address().port;

const pdfDir = path.join(ROOT, "public", "storyboards", "pdf");
const outPdfDir = path.join(OUT, "storyboards", "pdf");
const ogDir = path.join(ROOT, "public", "storyboards", "og");
const outOgDir = path.join(OUT, "storyboards", "og");
fs.mkdirSync(pdfDir, { recursive: true });
fs.mkdirSync(outPdfDir, { recursive: true });
fs.mkdirSync(ogDir, { recursive: true });
fs.mkdirSync(outOgDir, { recursive: true });

try {
  for (const slug of slugs) {
    const target = path.join(pdfDir, `${slug}.pdf`);
    // Async on purpose: this same process serves the page Chrome is loading,
    // so a synchronous spawn would block the server and deadlock.
    await promisify(execFile)(
      CHROME,
      [
        "--headless=new",
        // A throwaway profile, so an open everyday Chrome cannot lock it.
        `--user-data-dir=${fs.mkdtempSync(path.join(os.tmpdir(), "pmp-pdf-"))}`,
        "--disable-gpu",
        "--no-first-run",
        "--no-default-browser-check",
        "--hide-scrollbars",
        "--no-pdf-header-footer",
        "--run-all-compositor-stages-before-draw",
        "--virtual-time-budget=20000",
        `--print-to-pdf=${target}`,
        `http://127.0.0.1:${port}/storyboards/${slug}/print/`,
      ],
      { timeout: 120000, maxBuffer: 16 * 1024 * 1024 },
    );
    if (!fs.existsSync(target)) fail(`Chrome produced no PDF for ${slug}.`);
    fs.copyFileSync(target, path.join(outPdfDir, `${slug}.pdf`));
    const kb = Math.round(fs.statSync(target).size / 1024);
    console.log(`  ${slug}.pdf  ${kb} KB`);

    // The 1200 x 630 link-preview PNG, from /storyboards/<slug>/share/.
    const png = path.join(ogDir, `${slug}.png`);
    await promisify(execFile)(
      CHROME,
      [
        "--headless=new",
        `--user-data-dir=${fs.mkdtempSync(path.join(os.tmpdir(), "pmp-og-"))}`,
        "--disable-gpu",
        "--no-first-run",
        "--no-default-browser-check",
        "--hide-scrollbars",
        "--force-device-scale-factor=1",
        "--window-size=1200,630",
        "--run-all-compositor-stages-before-draw",
        "--virtual-time-budget=20000",
        `--screenshot=${png}`,
        `http://127.0.0.1:${port}/storyboards/${slug}/share/`,
      ],
      { timeout: 120000, maxBuffer: 16 * 1024 * 1024 },
    );
    if (!fs.existsSync(png)) fail(`Chrome produced no share card for ${slug}.`);
    fs.copyFileSync(png, path.join(outOgDir, `${slug}.png`));
    console.log(`  ${slug}.png  ${Math.round(fs.statSync(png).size / 1024)} KB`);
  }
} finally {
  server.close();
}
