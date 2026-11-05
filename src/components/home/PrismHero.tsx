"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { SITE_POSITIONING } from "../../lib/config/site-positioning";
import "./prism-hero.css";

// The home page opening. A beam labelled "AI" enters a glass prism and leaves
// as a spectrum. Seven bands carry the parts of an applied AI system, each a
// link to its explainer; the drawing claims only that "AI" in a product is
// these parts working together. The light is refracted per wavelength
// (Snell's law, exaggerated dispersion) and follows the pointer. Off screen it
// stops; reduced motion gets a single still frame.

const BANDS = [
  { key: "r", nm: 661, label: "a human", href: "/systems/human-in-the-loop-is-a-system-design-choice/" },
  { key: "o", nm: 623, label: "evaluation", href: "/systems/evaluation-is-a-human-problem/" },
  { key: "y", nm: 584, label: "skills", href: "/systems/designing-reusable-ai-skills/" },
  { key: "g", nm: 546, label: "tools", href: "/systems/tool-use-when-language-triggers-actions/" },
  { key: "b", nm: 508, label: "context", href: "/systems/context-windows-as-working-memory/" },
  { key: "i", nm: 469, label: "system prompt", href: "/systems/what-a-system-prompt-actually-is/" },
  { key: "v", nm: 431, label: "prompt", href: "/systems/prompting-is-not-the-skill-you-think-it-is/" },
];

type V = { x: number; y: number };
const add = (a: V, b: V): V => ({ x: a.x + b.x, y: a.y + b.y });
const sub = (a: V, b: V): V => ({ x: a.x - b.x, y: a.y - b.y });
const mul = (a: V, k: number): V => ({ x: a.x * k, y: a.y * k });
const dot = (a: V, b: V) => a.x * b.x + a.y * b.y;
const norm = (a: V): V => mul(a, 1 / Math.hypot(a.x, a.y));
const lerp = (a: V, b: V, t: number): V => ({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

// Refraction of unit direction d through a surface with unit normal n facing
// the incoming ray, eta = n1 / n2. Null on total internal reflection.
function refract(d: V, n: V, eta: number): V | null {
  const cosi = -dot(n, d);
  const k = 1 - eta * eta * (1 - cosi * cosi);
  if (k < 0) return null;
  return norm(add(mul(d, eta), mul(n, eta * cosi - Math.sqrt(k))));
}

// Ray/segment intersection; returns the point or null.
function hit(o: V, d: V, a: V, b: V): V | null {
  const e = sub(b, a);
  const den = d.x * e.y - d.y * e.x;
  if (Math.abs(den) < 1e-9) return null;
  const t = ((a.x - o.x) * e.y - (a.y - o.y) * e.x) / den;
  const u = ((a.x - o.x) * d.y - (a.y - o.y) * d.x) / den;
  if (t <= 0 || u < 0 || u > 1) return null;
  return add(o, mul(d, t));
}

// Exaggerated dispersion so seven bands have room: red 1.36, violet 1.72.
// The pointer range below keeps violet short of total internal reflection.
const indexFor = (nm: number) => 1.36 + 0.36 * clamp((680 - nm) / (680 - 412), 0, 1);

// Approximate visible-spectrum colour for a wavelength in nanometres.
function rgbFor(nm: number): [number, number, number] {
  let r = 0, g = 0, b = 0;
  if (nm < 440) { r = -(nm - 440) / 60; b = 1; }
  else if (nm < 490) { g = (nm - 440) / 50; b = 1; }
  else if (nm < 510) { g = 1; b = -(nm - 510) / 20; }
  else if (nm < 580) { r = (nm - 510) / 70; g = 1; }
  else if (nm < 645) { r = 1; g = -(nm - 645) / 65; }
  else { r = 1; }
  const f = nm < 420 ? 0.45 + 0.55 * (nm - 400) / 20 : nm > 660 ? 0.55 + 0.45 * (700 - nm) / 40 : 1;
  const soft = (c: number) => Math.round(255 * (0.18 + 0.82 * Math.pow(c * f, 0.8)));
  return [soft(r), soft(g), soft(b)];
}

const STEPS = 56;
const WAVES = Array.from({ length: STEPS + 1 }, (_, i) => 680 - (i / STEPS) * (680 - 412));

export default function PrismHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const labelRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const aiRef = useRef<HTMLSpanElement>(null);
  const noteRef = useRef<HTMLSpanElement>(null);
  const activeRef = useRef<number>(-1);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    if (!section || !canvas || !stage) return;
    const ctx = canvas.getContext("2d");
    const glowCanvas = document.createElement("canvas");
    const gctx = glowCanvas.getContext("2d");
    if (!ctx || !gctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    let W = 0, H = 0, dpr = 1;
    let stageBox = { x: 0, y: 0, w: 0, h: 0 };
    let angle = 22, target = 22, lastPointer = -1e9;
    let yaw = 0, yawTarget = 0;
    let start = performance.now();
    let frame = 0, running = false, visible = true;
    const dust = Array.from({ length: 90 }, () => ({ x: Math.random(), y: Math.random(), s: 0.4 + Math.random() * 1.4, v: 0.15 + Math.random() * 0.5, p: Math.random() * Math.PI * 2 }));

    const resize = () => {
      const r = section.getBoundingClientRect();
      const s = stage.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = r.width; H = r.height;
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      canvas.style.width = `${W}px`; canvas.style.height = `${H}px`;
      glowCanvas.width = Math.max(1, Math.round(W / 4)); glowCanvas.height = Math.max(1, Math.round(H / 4));
      stageBox = { x: s.left - r.left, y: s.top - r.top, w: s.width, h: s.height };
    };

    const geometry = () => {
      const { x, y, w, h } = stageBox;
      const side = Math.min(w * 0.38, h * 0.6);
      const c = { x: x + w * 0.3, y: y + h * 0.46 };
      const hgt = side * Math.sqrt(3) / 2;
      const T = { x: c.x, y: c.y - (2 / 3) * hgt };
      const BL = { x: c.x - side / 2, y: c.y + hgt / 3 };
      const BR = { x: c.x + side / 2, y: c.y + hgt / 3 };
      return { c, T, BL, BR, side };
    };

    const trace = (deg: number) => {
      const { c, T, BL, BR, side } = geometry();
      const pin = lerp(T, BL, 0.56);
      const nl = (() => { const e = sub(T, BL); let n = norm({ x: -e.y, y: e.x }); if (dot(n, sub(c, pin)) > 0) n = mul(n, -1); return n; })();
      const pr = lerp(T, BR, 0.5);
      const nr = (() => { const e = sub(BR, T); let n = norm({ x: -e.y, y: e.x }); if (dot(n, sub(c, pr)) > 0) n = mul(n, -1); return n; })();
      const rad = (deg * Math.PI) / 180;
      const d0 = norm({ x: Math.cos(rad), y: -Math.sin(rad) });
      const rays = WAVES.map((nm) => {
        const n = indexFor(nm);
        const inside = refract(d0, nl, 1 / n);
        if (!inside) return null;
        const pout = hit(pin, inside, T, BR);
        if (!pout) return null;
        const out = refract(inside, mul(nr, -1), n);
        if (!out) return null;
        return { nm, pout, out };
      });
      return { c, T, BL, BR, side, pin, d0, rays };
    };

    const draw = (now: number) => {
      const dark = document.documentElement.getAttribute("data-theme") !== "light";
      const t = (now - start) / 1000;
      const p = reduce ? 1 : clamp(t / 2.4, 0, 1);
      const beamP = clamp(p / 0.32, 0, 1);
      const fanP = clamp((p - 0.3) / 0.45, 0, 1);
      const ease = (x: number) => 1 - Math.pow(1 - x, 3);

      if (!reduce && now - lastPointer > 2500) {
        target = 22 + Math.sin(t * 0.35) * 2.2;
        yawTarget = Math.sin(t * 0.22) * 0.55;
      }
      angle += (target - angle) * (reduce ? 1 : 0.06);
      yaw += (yawTarget - yaw) * (reduce ? 1 : 0.05);
      const g = trace(angle);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      gctx.setTransform(1 / 4, 0, 0, 1 / 4, 0, 0);
      gctx.clearRect(0, 0, W, H);

      const L = Math.max(W, H) * 1.6;
      const src = sub(g.pin, mul(g.d0, Math.min(L, (g.pin.x - stageBox.x + 40) / Math.max(0.2, g.d0.x))));
      const beamEnd = lerp(src, g.pin, ease(beamP));
      const blend: GlobalCompositeOperation = dark ? "lighter" : "source-over";

      // The prism is a solid: a back face offset in depth, side faces, and a
      // pool of light on the floor. The pointer turns it a few degrees.
      const depth = { x: g.side * (0.14 + 0.08 * yaw), y: -g.side * (0.1 - 0.03 * yaw) };
      const T2 = add(g.T, depth), BL2 = add(g.BL, depth), BR2 = add(g.BR, depth);
      const floorY = g.BL.y + 2;
      ctx.globalCompositeOperation = "source-over";
      ctx.save();
      ctx.translate(g.c.x + depth.x * 0.5, floorY + depth.y * 0.3);
      ctx.scale(1, 0.16);
      const pool = ctx.createRadialGradient(0, 0, 0, 0, 0, g.side * 0.95);
      pool.addColorStop(0, dark ? "rgba(255,244,225,0.16)" : "rgba(60,48,30,0.16)");
      pool.addColorStop(0.6, dark ? "rgba(160,150,255,0.05)" : "rgba(60,48,30,0.05)");
      pool.addColorStop(1, dark ? "rgba(160,150,255,0)" : "rgba(60,48,30,0)");
      ctx.fillStyle = pool; ctx.beginPath(); ctx.arc(0, 0, g.side * 0.95, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
      if (dark) {
        // A faint reflection below the floor line.
        const m = (v: V): V => ({ x: v.x, y: floorY + (floorY - v.y) * 0.32 });
        const rg = ctx.createLinearGradient(0, floorY, 0, floorY + g.side * 0.3);
        rg.addColorStop(0, "rgba(255,255,255,0.07)");
        rg.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = rg;
        ctx.beginPath(); ctx.moveTo(m(g.T).x, m(g.T).y); ctx.lineTo(m(g.BL).x, m(g.BL).y); ctx.lineTo(m(g.BR).x, m(g.BR).y); ctx.closePath(); ctx.fill();
      }
      const quad = (a: V, b: V, c2: V, d: V, fill: string | CanvasGradient) => {
        ctx.fillStyle = fill; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.lineTo(c2.x, c2.y); ctx.lineTo(d.x, d.y); ctx.closePath(); ctx.fill();
      };
      ctx.beginPath(); ctx.moveTo(T2.x, T2.y); ctx.lineTo(BL2.x, BL2.y); ctx.lineTo(BR2.x, BR2.y); ctx.closePath();
      ctx.fillStyle = dark ? "rgba(255,255,255,0.03)" : "rgba(236,230,218,0.5)"; ctx.fill();
      const sideA = ctx.createLinearGradient(g.T.x, g.T.y, BR2.x, BR2.y);
      sideA.addColorStop(0, dark ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.75)");
      sideA.addColorStop(1, dark ? "rgba(255,255,255,0.02)" : "rgba(232,225,212,0.6)");
      quad(g.T, g.BR, BR2, T2, sideA);
      quad(g.BL, g.BR, BR2, BL2, dark ? "rgba(255,255,255,0.035)" : "rgba(222,214,198,0.55)");
      quad(g.T, g.BL, BL2, T2, dark ? "rgba(255,255,255,0.025)" : "rgba(240,234,222,0.45)");

      // Front face.
      const body = ctx.createLinearGradient(g.T.x, g.T.y, g.BR.x, g.BR.y);
      body.addColorStop(0, dark ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.85)");
      body.addColorStop(1, dark ? "rgba(255,255,255,0.025)" : "rgba(236,230,218,0.75)");
      ctx.beginPath(); ctx.moveTo(g.T.x, g.T.y); ctx.lineTo(g.BL.x, g.BL.y); ctx.lineTo(g.BR.x, g.BR.y); ctx.closePath();
      ctx.fillStyle = body; ctx.fill();
      if (!dark) { ctx.shadowColor = "rgba(60,48,30,0.12)"; ctx.shadowBlur = 30; ctx.shadowOffsetY = 18; ctx.fill(); ctx.shadowColor = "transparent"; ctx.shadowBlur = 0; ctx.shadowOffsetY = 0; }

      // Incoming beam: glow pass and a crisp core.
      const beam = (c2: CanvasRenderingContext2D, width: number, color: string, alpha: number) => {
        const gr = c2.createLinearGradient(src.x, src.y, g.pin.x, g.pin.y);
        gr.addColorStop(0, color.replace("A", "0"));
        gr.addColorStop(0.55, color.replace("A", String(alpha * 0.7)));
        gr.addColorStop(1, color.replace("A", String(alpha)));
        c2.strokeStyle = gr; c2.lineWidth = width; c2.lineCap = "round";
        c2.beginPath(); c2.moveTo(src.x, src.y); c2.lineTo(beamEnd.x, beamEnd.y); c2.stroke();
      };
      gctx.globalCompositeOperation = blend;
      beam(gctx, 26, dark ? "rgba(255,246,220,A)" : "rgba(243,190,90,A)", dark ? 0.9 : 0.5);
      ctx.globalCompositeOperation = blend;
      beam(ctx, dark ? 2.6 : 2.2, dark ? "rgba(255,255,255,A)" : "rgba(43,38,32,A)", 1);

      const valid = g.rays.filter(Boolean) as { nm: number; pout: V; out: V }[];
      if (beamP >= 1 && valid.length > 1) {
        // Inside the glass.
        ctx.globalCompositeOperation = blend;
        ctx.beginPath(); ctx.moveTo(g.pin.x, g.pin.y);
        valid.forEach((r) => ctx.lineTo(r.pout.x, r.pout.y));
        ctx.closePath();
        ctx.fillStyle = dark ? "rgba(255,255,255,0.22)" : "rgba(43,38,32,0.12)";
        ctx.fill();

        // The spectrum, one wedge per wavelength step.
        const len = L * ease(fanP);
        const reach = Math.max(W, H) * 0.75;
        for (let i = 0; i < valid.length - 1; i++) {
          const a = valid[i], b = valid[i + 1];
          const [r, gg, bb] = rgbFor((a.nm + b.nm) / 2);
          const fa = add(a.pout, mul(a.out, len)), fb = add(b.pout, mul(b.out, len));
          const k = activeRef.current;
          let boost = 1;
          if (k >= 0) boost = Math.floor(((i + 0.5) / (valid.length - 1)) * BANDS.length) === k ? 1.4 : 0.32;
          const wedge = (c2: CanvasRenderingContext2D, alpha: number) => {
            const gr = c2.createLinearGradient(a.pout.x, a.pout.y, a.pout.x + a.out.x * reach, a.pout.y + a.out.y * reach);
            gr.addColorStop(0, `rgba(${r},${gg},${bb},${alpha * 0.55})`);
            gr.addColorStop(0.08, `rgba(${r},${gg},${bb},${alpha})`);
            gr.addColorStop(0.45, `rgba(${r},${gg},${bb},${alpha * 0.55})`);
            gr.addColorStop(1, `rgba(${r},${gg},${bb},0)`);
            c2.fillStyle = gr;
            c2.beginPath(); c2.moveTo(a.pout.x, a.pout.y); c2.lineTo(b.pout.x, b.pout.y); c2.lineTo(fb.x, fb.y); c2.lineTo(fa.x, fa.y); c2.closePath(); c2.fill();
          };
          wedge(gctx, (dark ? 0.55 : 0.28) * boost);
          wedge(ctx, clamp((dark ? 0.34 : 0.36) * boost, 0, 1));
        }
        // White where the colours still overlap, just past the exit face.
        const f0 = valid[0], f1 = valid[valid.length - 1];
        const coreLen = g.side * 0.55 * ease(fanP);
        const mid = valid[Math.floor(valid.length / 2)];
        const core = ctx.createLinearGradient(mid.pout.x, mid.pout.y, mid.pout.x + mid.out.x * coreLen, mid.pout.y + mid.out.y * coreLen);
        core.addColorStop(0, dark ? "rgba(255,255,255,0.55)" : "rgba(255,252,244,0.7)");
        core.addColorStop(1, dark ? "rgba(255,255,255,0)" : "rgba(255,252,244,0)");
        ctx.fillStyle = core;
        ctx.beginPath(); ctx.moveTo(f0.pout.x, f0.pout.y); ctx.lineTo(f1.pout.x, f1.pout.y);
        ctx.lineTo(f1.pout.x + f1.out.x * coreLen, f1.pout.y + f1.out.y * coreLen);
        ctx.lineTo(f0.pout.x + f0.out.x * coreLen, f0.pout.y + f0.out.y * coreLen);
        ctx.closePath(); ctx.fill();
      }

      // Composite the soft glow layer once.
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.globalCompositeOperation = blend;
      ctx.filter = `blur(${Math.round(7 * dpr)}px)`;
      ctx.globalAlpha = dark ? 1 : 0.8;
      ctx.drawImage(glowCanvas, 0, 0, canvas.width, canvas.height);
      ctx.restore();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Glass edges, rim light and the bright entry and exit points.
      ctx.globalCompositeOperation = "source-over";
      ctx.lineJoin = "round";
      ctx.lineWidth = 1;
      ctx.strokeStyle = dark ? "rgba(255,255,255,0.16)" : "rgba(43,38,32,0.22)";
      ctx.beginPath(); ctx.moveTo(T2.x, T2.y); ctx.lineTo(BL2.x, BL2.y); ctx.lineTo(BR2.x, BR2.y); ctx.closePath(); ctx.stroke();
      ctx.strokeStyle = dark ? "rgba(255,255,255,0.32)" : "rgba(43,38,32,0.45)";
      ctx.beginPath();
      ctx.moveTo(g.T.x, g.T.y); ctx.lineTo(T2.x, T2.y);
      ctx.moveTo(g.BL.x, g.BL.y); ctx.lineTo(BL2.x, BL2.y);
      ctx.moveTo(g.BR.x, g.BR.y); ctx.lineTo(BR2.x, BR2.y);
      ctx.stroke();
      const spec = ctx.createLinearGradient(g.T.x, g.T.y, T2.x, T2.y);
      spec.addColorStop(0, `rgba(255,255,255,${0.5 + 0.4 * Math.max(0, yaw)})`);
      spec.addColorStop(1, "rgba(255,255,255,0)");
      ctx.strokeStyle = spec; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(g.T.x, g.T.y); ctx.lineTo(T2.x, T2.y); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(g.T.x, g.T.y); ctx.lineTo(g.BL.x, g.BL.y); ctx.lineTo(g.BR.x, g.BR.y); ctx.closePath();
      ctx.strokeStyle = dark ? "rgba(255,255,255,0.55)" : "rgba(43,38,32,0.85)";
      ctx.lineWidth = dark ? 1.2 : 1.6; ctx.stroke();
      const rimEnd = lerp(g.T, g.BL, 0.85);
      const rim = ctx.createLinearGradient(g.T.x, g.T.y, rimEnd.x, rimEnd.y);
      rim.addColorStop(0, "rgba(255,255,255,0.95)");
      rim.addColorStop(1, "rgba(255,255,255,0)");
      ctx.strokeStyle = rim; ctx.lineWidth = 2.4;
      ctx.beginPath(); ctx.moveTo(g.T.x - 3, g.T.y + 10); ctx.lineTo(rimEnd.x + 4, rimEnd.y); ctx.stroke();
      ctx.strokeStyle = dark ? "rgba(255,255,255,0.18)" : "rgba(43,38,32,0.18)"; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(g.BL.x + 8, g.BL.y - 5); ctx.lineTo(g.BR.x - 8, g.BR.y - 5); ctx.stroke();
      if (beamP >= 1 && valid.length) {
        const mid = valid[Math.floor(valid.length / 2)].pout;
        ctx.globalCompositeOperation = blend;
        const cg = ctx.createRadialGradient(mid.x, mid.y, 0, mid.x, mid.y, g.side * 0.085);
        cg.addColorStop(0, dark ? "rgba(255,252,240,0.75)" : "rgba(255,248,226,0.9)");
        cg.addColorStop(1, dark ? "rgba(255,252,240,0)" : "rgba(255,248,226,0)");
        ctx.fillStyle = cg; ctx.beginPath(); ctx.arc(mid.x, mid.y, g.side * 0.085, 0, Math.PI * 2); ctx.fill();
        const ig = ctx.createRadialGradient(g.pin.x, g.pin.y, 0, g.pin.x, g.pin.y, g.side * 0.06);
        ig.addColorStop(0, dark ? "rgba(255,255,255,0.55)" : "rgba(255,240,200,0.7)");
        ig.addColorStop(1, dark ? "rgba(255,255,255,0)" : "rgba(255,240,200,0)");
        ctx.fillStyle = ig; ctx.beginPath(); ctx.arc(g.pin.x, g.pin.y, g.side * 0.06, 0, Math.PI * 2); ctx.fill();
      }

      // Dust that only shows where the light is.
      if (dark && !reduce && valid.length > 1) {
        ctx.globalCompositeOperation = "lighter";
        const first = valid[0], last = valid[valid.length - 1];
        const aMin = Math.atan2(first.out.y, first.out.x), aMax = Math.atan2(last.out.y, last.out.x);
        for (const m of dust) {
          m.y -= m.v * 0.0006; m.x += Math.sin(t * 0.3 + m.p) * 0.00025;
          if (m.y < 0) m.y = 1;
          const px = stageBox.x + m.x * (W - stageBox.x) + yaw * m.s * 14, py = m.y * H;
          const rel = sub({ x: px, y: py }, first.pout);
          const ang = Math.atan2(rel.y, rel.x);
          let light = 0;
          if (rel.x > 0 && ang >= Math.min(aMin, aMax) - 0.02 && ang <= Math.max(aMin, aMax) + 0.02) light = clamp(1 - Math.hypot(rel.x, rel.y) / (W * 0.6), 0, 1) * fanP;
          const toBeam = sub({ x: px, y: py }, g.pin);
          const along = dot(toBeam, mul(g.d0, -1));
          const perp = Math.abs(toBeam.x * g.d0.y - toBeam.y * g.d0.x);
          if (along > 0 && perp < 10) light = Math.max(light, (1 - perp / 10) * beamP);
          if (light <= 0.02) continue;
          ctx.fillStyle = `rgba(255,250,235,${(0.35 + 0.4 * Math.sin(t * 2 + m.p) ** 2) * light})`;
          ctx.beginPath(); ctx.arc(px, py, m.s, 0, Math.PI * 2); ctx.fill();
        }
      }
      ctx.globalCompositeOperation = "source-over";

      // Labels ride their bands: seven equal slices of the fan, at the distance
      // where the fan has room for them, kept inside the frame.
      const placed: { i: number; x: number; y: number }[] = [];
      if (valid.length > 1) {
        const gap = 31;
        const first = valid[0], last = valid[valid.length - 1];
        const spread = Math.hypot(last.out.x - first.out.x, last.out.y - first.out.y);
        const maxX = W - 190;
        const reachX = Math.max(first.out.x, last.out.x);
        const dMax = Math.max(g.side * 0.6, (maxX - first.pout.x) / Math.max(0.05, reachX));
        const D = clamp((gap * 6.6) / Math.max(0.05, spread), g.side * 0.6, dMax);
        BANDS.forEach((_, i) => {
          const f = ((i + 0.5) / BANDS.length) * (valid.length - 1);
          const lo = valid[Math.floor(f)], hi = valid[Math.min(valid.length - 1, Math.ceil(f))];
          const w = f - Math.floor(f);
          const po = lerp(lo.pout, hi.pout, w), o = lerp(lo.out, hi.out, w);
          placed.push({ i, x: po.x + o.x * D + 8, y: po.y + o.y * D });
        });
      }
      // Narrow screens: the fan is too short for seven labels, so they become a legend.
      const compact = W < 760;
      section.classList.toggle("is-compact", compact);
      placed.forEach((q) => {
        const el = labelRefs.current[q.i];
        if (!el) return;
        const show = reduce ? 1 : clamp((p - 0.62 - q.i * 0.035) / 0.12, 0, 1);
        el.style.transform = compact ? "" : `translate(${q.x.toFixed(1)}px, ${q.y.toFixed(1)}px) translateY(-50%)`;
        el.style.opacity = String(show);
      });
      if (aiRef.current) {
        const at = lerp(src, g.pin, 0.38);
        const up = { x: g.d0.y, y: -g.d0.x };
        const side = up.y < 0 ? up : mul(up, -1);
        aiRef.current.style.transform = `translate(${(at.x + side.x * 46).toFixed(1)}px, ${(at.y + side.y * 46 - 10).toFixed(1)}px) rotate(${(-angle).toFixed(2)}deg)`;
        aiRef.current.style.opacity = String(reduce ? 1 : clamp(t / 0.6, 0, 1));
      }
      if (noteRef.current) {
        noteRef.current.style.transform = `translate(${g.c.x.toFixed(1)}px, ${(g.BL.y + 28).toFixed(1)}px) translateX(-50%)`;
        noteRef.current.style.opacity = String(reduce ? 1 : clamp((p - 0.85) / 0.15, 0, 1));
      }
      section.classList.add("is-live");
    };

    const loop = (now: number) => {
      draw(now);
      frame = running ? requestAnimationFrame(loop) : 0;
    };
    const play = () => { if (!running && visible && !document.hidden && !reduce) { running = true; frame = requestAnimationFrame(loop); } };
    const pause = () => { running = false; cancelAnimationFrame(frame); frame = 0; };

    resize();
    if (reduce) draw(performance.now()); else play();

    const ro = new ResizeObserver(() => { resize(); if (!running) draw(performance.now()); });
    ro.observe(section);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) play(); else pause(); });
    io.observe(section);
    const onVis = () => (document.hidden ? pause() : play());
    document.addEventListener("visibilitychange", onVis);
    const theme = new MutationObserver(() => { if (!running) draw(performance.now()); });
    theme.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const onMove = (e: PointerEvent) => {
      if (!fine) return;
      const r = section.getBoundingClientRect();
      const ny = clamp((e.clientY - r.top) / r.height, 0, 1);
      target = 30 - ny * 13;
      yawTarget = clamp(((e.clientX - r.left) / r.width - 0.55) * 2.2, -1, 1);
      lastPointer = performance.now();
    };
    section.addEventListener("pointermove", onMove);
    const replay = () => { start = performance.now(); if (reduce) draw(start); };
    section.addEventListener("prism:replay", replay);

    return () => {
      pause(); ro.disconnect(); io.disconnect(); theme.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("prism:replay", replay);
    };
  }, []);

  return (
    <section ref={sectionRef} id="hero" className="prism-hero relative scroll-mt-28 w-full border-b border-[color:var(--card-border)]">
      <canvas ref={canvasRef} className="prism-canvas" aria-hidden="true" />
      <div className="relative max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-12 pt-12 pb-14 md:pt-16 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[10fr_14fr] gap-8 lg:gap-6 items-center">
          <div className="flex flex-col gap-6 min-w-0 relative z-[2]">
            <div className="flex items-center gap-2">
              <span className="h-px w-8 bg-[color:var(--accent-cyan)]" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[color:var(--text-muted)]">
                How applied AI systems actually work
              </span>
            </div>
            <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-[3rem] tracking-tight leading-[1.06] text-[color:var(--text-primary)]">
              {SITE_POSITIONING.headline}
            </h1>
            <p className="text-base sm:text-lg text-[color:var(--text-secondary)] leading-relaxed max-w-xl">
              Everyone says AI. Pass it through a prism and it comes apart into seven things you can
              read about, inspect and build. Pick a colour.
            </p>
            <div className="flex flex-wrap gap-3 items-center">
              <Link href="#systems-map" className="btn-premium btn-primary">
                Start with the map
              </Link>
              <Link href="/storyboards/" className="btn-premium btn-secondary">
                Flip through a storyboard
              </Link>
            </div>
          </div>
          <div ref={stageRef} className="prism-stage" role="group" aria-label="AI through a prism: seven parts, each linking to its explainer">
            <p className="sr-only">
              A beam labelled AI enters a glass prism and leaves as a spectrum of seven bands: a human,
              evaluation, skills, tools, context, system prompt and prompt.
            </p>
          </div>
        </div>
      </div>
      <span ref={aiRef} className="prism-ai" aria-hidden="true">AI <em>as sold</em></span>
      <span ref={noteRef} className="prism-note" aria-hidden="true">Same thing. Now with labels.</span>
      <ul className="prism-labels">
        {BANDS.map((b, i) => (
          <li key={b.key}>
            <a
              ref={(el) => { labelRefs.current[i] = el; }}
              href={b.href}
              className="prism-label"
              style={{ ["--band" as string]: `rgb(${rgbFor(b.nm).join(",")})` }}
              onPointerEnter={() => { activeRef.current = i; }}
              onPointerLeave={() => { activeRef.current = -1; }}
              onFocus={() => { activeRef.current = i; }}
              onBlur={() => { activeRef.current = -1; }}
            >
              <span className="prism-label-dot" aria-hidden="true" />
              {b.label}
            </a>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="prism-replay"
        onClick={(e) => e.currentTarget.parentElement?.dispatchEvent(new Event("prism:replay"))}
      >
        Play again
      </button>
    </section>
  );
}
