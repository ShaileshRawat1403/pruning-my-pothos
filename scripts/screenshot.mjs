#!/usr/bin/env node
/**
 * screenshot.mjs — one PNG of one page, from headless Chrome, for checking
 * drawings and motion frames without a visible browser tab.
 *
 *   node --experimental-websocket scripts/screenshot.mjs <url> <out.png> [width] [height] [waitMs]
 *   EVAL='document.getElementById("x").scrollIntoView()' node --experimental-websocket scripts/screenshot.mjs ...
 *
 * Point it at the static build (`python3 -m http.server 8811 --directory out`)
 * rather than the dev server: plain `chrome --screenshot` hangs on the dev
 * server's HMR socket, and this drives Chrome over the DevTools protocol
 * instead. Useful pages: /dank-samples/scenes/?only=<id> (every step of a
 * scene) and /dank-samples/films/?only=<slug>&t=0.4,2.5 (frozen film frames).
 * Node 20 needs --experimental-websocket. Set CHROME_PATH for another browser.
 */
import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const [url, out, w = "1500", h = "1000", wait = "6000"] = process.argv.slice(2);
if (!url || !out) {
  console.error("usage: screenshot.mjs <url> <out.png> [width] [height] [waitMs]");
  process.exit(2);
}
const CHROME = process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const port = 9300 + Math.floor(Math.random() * 500);
const profile = fs.mkdtempSync(path.join(os.tmpdir(), "pmp-shot-"));
const chrome = spawn(CHROME, ["--headless=new", "--disable-gpu", "--hide-scrollbars", `--user-data-dir=${profile}`, `--remote-debugging-port=${port}`, `--window-size=${w},${h}`, "about:blank"], { stdio: "ignore" });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

try {
  let tabs;
  for (let i = 0; i < 50 && !tabs; i++) {
    try {
      tabs = await (await fetch(`http://127.0.0.1:${port}/json`)).json();
    } catch {
      await sleep(200);
    }
  }
  if (!tabs) throw new Error("Chrome did not start");
  const ws = new WebSocket(tabs.find((t) => t.type === "page").webSocketDebuggerUrl);
  await new Promise((r) => (ws.onopen = r));
  let n = 0;
  const pending = new Map();
  ws.onmessage = (m) => {
    const d = JSON.parse(m.data);
    if (pending.has(d.id)) {
      pending.get(d.id)(d.result);
      pending.delete(d.id);
    }
  };
  const send = (method, params = {}) => new Promise((r) => { const id = ++n; pending.set(id, r); ws.send(JSON.stringify({ id, method, params })); });
  await send("Emulation.setDeviceMetricsOverride", { width: +w, height: +h, deviceScaleFactor: 1, mobile: false });
  await send("Page.navigate", { url });
  await sleep(+wait);
  if (process.env.EVAL) {
    await send("Runtime.evaluate", { expression: process.env.EVAL });
    await sleep(1500);
  }
  const { data } = await send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync(out, Buffer.from(data, "base64"));
  ws.close();
} finally {
  chrome.kill();
  fs.rmSync(profile, { recursive: true, force: true });
}
process.exit(0);
