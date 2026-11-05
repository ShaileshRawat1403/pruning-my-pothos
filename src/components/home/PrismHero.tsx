"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SITE_POSITIONING } from "../../lib/config/site-positioning";
import "./prism-hero.css";

// The home page opening. A beam labelled "AI" enters a glass prism and leaves
// as a spectrum. Seven bands carry the responsibilities an applied AI system
// is built from (the same ones "How the Parts of an AI Application Depend on
// Each Other" lists), each a link to its explainer, and an ink line marks the
// person involved at every one. Scrolling then runs Newton's recombination:
// a lens and a second prism gather the bands back into one beam. The light is
// refracted per wavelength (Snell's law, exaggerated dispersion) and follows
// the pointer. Off screen it stops; reduced motion and phones get the split
// as a still, without the pinned scroll.

// The bands carry no order or rank. Each note is what the person does there.
const BANDS = [
  { key: "r", nm: 661, label: "the model", note: "chooses it", href: "/systems/what-an-ai-model-actually-is/" },
  { key: "o", nm: 623, label: "instructions", note: "writes them", href: "/systems/what-a-system-prompt-actually-is/" },
  { key: "y", nm: 584, label: "context", note: "decides what it sees", href: "/systems/context-windows-as-working-memory/" },
  { key: "g", nm: 546, label: "tools", note: "decides what it can reach", href: "/systems/tool-use-when-language-triggers-actions/" },
  { key: "b", nm: 508, label: "the harness", note: "sets when it stops", href: "/systems/what-is-an-agent-harness/" },
  { key: "i", nm: 469, label: "permissions", note: "decides what needs approval", href: "/systems/from-agent-intent-to-governed-execution/" },
  { key: "v", nm: 431, label: "evaluation", note: "defines what good means", href: "/systems/evaluation-is-a-human-problem/" },
];
const HUMAN_HREF = "/systems/human-in-the-loop-is-a-system-design-choice/";

// Pinned scroll only where there is room for it and motion is welcome.
const PIN_QUERY = "(min-width: 760px) and (prefers-reduced-motion: no-preference)";

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
  const outRef = useRef<HTMLSpanElement>(null);
  const humanRef = useRef<HTMLAnchorElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLSpanElement>(null);
  const activeRef = useRef<number>(-1);
  const benchRef = useRef<HTMLDivElement>(null);
  // Parts the reader has blocked at the lens, read by the drawing loop.
  const [blocked, setBlocked] = useState<boolean[]>(() => BANDS.map(() => false));
  const blockedRef = useRef(blocked);
  useEffect(() => { blockedRef.current = blocked; }, [blocked]);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    const pin = pinRef.current;
    if (!section || !canvas || !stage || !pin) return;
    const ctx = canvas.getContext("2d");
    const glowCanvas = document.createElement("canvas");
    const gctx = glowCanvas.getContext("2d");
    if (!ctx || !gctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const pinMQ = window.matchMedia(PIN_QUERY);
    let W = 0, H = 0, dpr = 1;
    let stageBox = { x: 0, y: 0, w: 0, h: 0 };
    let angle = 22, target = 22, lastPointer = -1e9;
    let yaw = 0, yawTarget = 0;
    let start = 0, started = false;
    // The person on the line: distance along the path, direction, run cycle,
    // the band they are on, a short trail of past poses, and kicked-up dust.
    let figS = 0, figDir = 1, figLast = 0, figPhase = 0, figFace = 1, figBand = -1;
    const trail: { x: number; y: number; ph: number; f: number; air: number }[] = [];
    const puffs: { x: number; y: number; vx: number; vy: number; t: number }[] = [];
    const ripples: { i: number; t: number }[] = [];
    let frame = 0, running = false, visible = true;
    const dust = Array.from({ length: 90 }, () => ({ x: Math.random(), y: Math.random(), s: 0.4 + Math.random() * 1.4, v: 0.15 + Math.random() * 0.5, p: Math.random() * Math.PI * 2 }));

    const resize = () => {
      const r = pin.getBoundingClientRect();
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
      // Phones show the labels as a legend, so the drawing can take the width.
      const narrow = W < 760;
      const side = narrow ? Math.min(w * 0.44, h * 0.62) : Math.min(w * 0.38, h * 0.6);
      const c = { x: x + w * (narrow ? 0.36 : 0.3), y: y + h * 0.46 };
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
      // The opening shot, once the hero is properly on screen: darkness, the
      // beam flickers on, a flare where it meets the glass, the spectrum
      // sweeps out, labels, a slow camera push in. Scrolling keeps pushing.
      const raw = reduce ? 99 : started ? (now - start) / 1000 : 0;
      const t = Number.isFinite(raw) ? raw : -1;
      const DUR = 3.8;
      const p = reduce ? 1 : clamp(t / DUR, 0, 1);
      const beamP = reduce ? 1 : clamp((t - 0.55) / 0.9, 0, 1);
      const fanP = reduce ? 1 : clamp((t - 1.5) / 1.2, 0, 1);
      const ease = (x: number) => 1 - Math.pow(1 - x, 3);
      const sr = section.getBoundingClientRect();
      const pinned = pinMQ.matches;
      // Pinned: the section scrolls past a sticky stage and q runs 0 to 1.
      // Otherwise scrolling only nudges the camera.
      const q = pinned ? clamp(-sr.top / Math.max(1, sr.height - H), 0, 1) : 0;
      const scrollP = pinned ? 0 : clamp(-sr.top / Math.max(1, sr.height), 0, 1);
      const rb = pinned && fanP >= 1 ? clamp((q - 0.08) / 0.78, 0, 1) : 0;

      if (!reduce && now - lastPointer > 2500) {
        const ti = Math.max(0, t);
        target = 22 + Math.sin(ti * 0.35) * 2.2;
        yawTarget = Math.sin(ti * 0.22) * 0.55;
      }
      angle += (target - angle) * (reduce ? 1 : 0.06);
      yaw += (yawTarget + scrollP * 0.6 + rb * 0.3 - yaw) * (reduce ? 1 : 0.05);
      const g = trace(angle);
      const fx = g.c.x + g.side * 0.6, fy = g.c.y;
      const compact = W < 760;

      const valid = (g.rays.filter(Boolean) as { nm: number; pout: V; out: V }[]).filter((r) => r.out.x > 0.05);

      // The light lands on a screen, as in the classroom experiment: far
      // enough out that seven labels have room, inside the frame at full
      // zoom, and clear of the section's top and bottom.
      let screenX = 0;
      const ZMAX = 1.16;
      const reachOf = (r: { pout: V; out: V }) => (screenX - r.pout.x) / r.out.x;
      const landing = (r: { pout: V; out: V }) => add(r.pout, mul(r.out, reachOf(r)));
      if (valid.length > 1) {
        const first = valid[0], last = valid[valid.length - 1], mid = valid[Math.floor(valid.length / 2)];
        const spread = Math.hypot(last.out.x - first.out.x, last.out.y - first.out.y);
        const D = compact ? g.side * 1.4 : Math.max(g.side * 0.7, (30 * 7) / Math.max(0.05, spread));
        let X = mid.pout.x + mid.out.x * D;
        X = Math.min(X, fx + (W - (compact ? 24 : 300) - fx) / ZMAX);
        const yLow = fy + (H - 64 - fy) / ZMAX, yHigh = fy + (56 - fy) / ZMAX;
        if (last.out.y > 0) X = Math.min(X, last.pout.x + last.out.x * ((yLow - last.pout.y) / last.out.y));
        if (first.out.y < 0) X = Math.min(X, first.pout.x + first.out.x * ((yHigh - first.pout.y) / first.out.y));
        screenX = Math.max(X, Math.max(first.pout.x, last.pout.x) + g.side * 0.45);
      }
      // Where each of the seven bands lands, by equal slices of the fan.
      const bandAt = (i: number, along: number) => {
        const f = ((i + 0.5) / BANDS.length) * (valid.length - 1);
        const lo = valid[Math.floor(f)], hi = valid[Math.min(valid.length - 1, Math.ceil(f))];
        const w = f - Math.floor(f);
        const po = lerp(lo.pout, hi.pout, w);
        return lerp(po, lerp(landing(lo), landing(hi), w), along);
      };

      // The rebuild: the screen becomes a lens that gathers the bands onto
      // a second, inverted prism, which sends one beam on.
      const hgt = g.side * Math.sqrt(3) / 2;
      const yTop = valid.length > 1 ? landing(valid[0]).y : fy;
      const yBot = valid.length > 1 ? landing(valid[valid.length - 1]).y : fy;
      const yMid = (yTop + yBot) / 2;
      const c2 = { x: screenX + g.side * 1.25, y: yMid + hgt / 3 - 0.45 * hgt };
      const P2 = { TL: { x: c2.x - g.side / 2, y: c2.y - hgt / 3 }, TR: { x: c2.x + g.side / 2, y: c2.y - hgt / 3 }, B: { x: c2.x, y: c2.y + (2 / 3) * hgt } };
      const F = lerp(P2.TL, P2.B, 0.45), E = lerp(P2.TR, P2.B, 0.45);
      const exitEnd = { x: E.x + g.side * 1.5, y: E.y };

      // Camera: pushes in over the opening; in the rebuild it pulls back and
      // pans so the whole bench fits the frame.
      const zoom = reduce ? 1 : 1 + 0.09 * (1 - ease(p)) + 0.06 * scrollP;
      let S = zoom, TX = fx - fx * zoom, TY = fy - fy * zoom;
      if (rb > 0) {
        const x0 = g.c.x - g.side * 1.15, x1 = exitEnd.x;
        const s = Math.min(1, (W - 120) / Math.max(1, x1 - x0));
        const tx = W / 2 - ((x0 + x1) / 2) * s, ty = H * 0.5 - ((g.T.y + yBot) / 2) * s;
        const k = ease(clamp(rb / 0.5, 0, 1));
        S = S + (s - S) * k; TX = TX + (tx - TX) * k; TY = TY + (ty - TY) * k;
      }
      const camPt = (x: number, y: number) => ({ x: x * S + TX, y: y * S + TY });
      const cam = (c: CanvasRenderingContext2D, k: number) => c.setTransform(k * S, 0, 0, k * S, k * TX, k * TY);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      gctx.setTransform(1 / 4, 0, 0, 1 / 4, 0, 0);
      gctx.clearRect(0, 0, W, H);
      cam(ctx, dpr);
      cam(gctx, 1 / 4);

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
      const flick = beamP > 0 && beamP < 0.4 ? (Math.sin(t * 83) > -0.2 ? 1 : 0.25) * (0.45 + beamP * 1.4) : 1;
      gctx.globalAlpha = flick; ctx.globalAlpha = flick;
      gctx.globalCompositeOperation = blend;
      beam(gctx, 26, dark ? "rgba(255,246,220,A)" : "rgba(243,190,90,A)", dark ? 0.9 : 0.5);
      ctx.globalCompositeOperation = blend;
      beam(ctx, dark ? 2.6 : 2.2, dark ? "rgba(255,255,255,A)" : "rgba(43,38,32,A)", 1);
      gctx.globalAlpha = 1; ctx.globalAlpha = 1;

      // Rebuild timing, each a slice of rb.
      const gone = clamp(rb / 0.2, 0, 1);
      const lensOn = clamp((rb - 0.05) / 0.2, 0, 1);
      const gather = ease(clamp((rb - 0.15) / 0.3, 0, 1));
      const p2On = clamp((rb - 0.1) / 0.25, 0, 1);
      const exitP = ease(clamp((rb - 0.45) / 0.3, 0, 1));
      // White light missing a colour is tinted: the beam out is the sum of
      // the bands that get through.
      const off = blockedRef.current;
      const bandOf = (i: number) => Math.floor(((i + 0.5) / Math.max(1, valid.length - 1)) * BANDS.length);
      const through = BANDS.filter((_, i) => !off[i]);
      let tint: [number, number, number] = [255, 255, 255];
      if (through.length && through.length < BANDS.length) {
        const sum = through.reduce((acc, b) => { const c = rgbFor(b.nm); return [acc[0] + c[0], acc[1] + c[1], acc[2] + c[2]]; }, [0, 0, 0]);
        const m = Math.max(...sum);
        tint = sum.map((v) => Math.round(255 * Math.pow(v / m, 1.6))) as [number, number, number];
      }
      const exitOn = through.length > 0 ? exitP : 0;

      if (beamP >= 1 && valid.length > 1) {
        // Inside the glass: the beam crosses as warm white.
        ctx.globalCompositeOperation = blend;
        const midOut = valid[Math.floor(valid.length / 2)].pout;
        const inner = ctx.createLinearGradient(g.pin.x, g.pin.y, midOut.x, midOut.y);
        inner.addColorStop(0, dark ? "rgba(255,248,230,0.3)" : "rgba(243,190,90,0.34)");
        inner.addColorStop(1, dark ? "rgba(255,255,255,0.16)" : "rgba(255,250,238,0.5)");
        ctx.beginPath(); ctx.moveTo(g.pin.x, g.pin.y);
        valid.forEach((r) => ctx.lineTo(r.pout.x, r.pout.y));
        ctx.closePath();
        ctx.fillStyle = inner;
        ctx.fill();

        // The spectrum, one wedge per wavelength step, from the glass to the screen.
        const grow = ease(fanP);
        const k = activeRef.current;
        for (let i = 0; i < valid.length - 1; i++) {
          const a = valid[i], b = valid[i + 1];
          const [r, gg, bb] = rgbFor((a.nm + b.nm) / 2);
          const la = landing(a), lb = landing(b);
          const fa = lerp(a.pout, la, grow), fb = lerp(b.pout, lb, grow);
          let boost = 1;
          if (k >= 0) boost = Math.floor(((i + 0.5) / (valid.length - 1)) * BANDS.length) === k ? 1.4 : 0.32;
          const wedge = (c2: CanvasRenderingContext2D, alpha: number) => {
            const gr = c2.createLinearGradient(a.pout.x, a.pout.y, la.x, la.y);
            gr.addColorStop(0, `rgba(${r},${gg},${bb},${alpha * 0.55})`);
            gr.addColorStop(0.07, `rgba(${r},${gg},${bb},${alpha})`);
            gr.addColorStop(0.6, `rgba(${r},${gg},${bb},${alpha * 0.4})`);
            gr.addColorStop(1, `rgba(${r},${gg},${bb},${alpha * 0.7})`);
            c2.fillStyle = gr;
            c2.beginPath(); c2.moveTo(a.pout.x, a.pout.y); c2.lineTo(b.pout.x, b.pout.y); c2.lineTo(fb.x, fb.y); c2.lineTo(fa.x, fa.y); c2.closePath(); c2.fill();
          };
          wedge(gctx, (dark ? 0.55 : 0.3) * boost);
          wedge(ctx, clamp((dark ? 0.34 : 0.48) * boost, 0, 1));
          // Where it lands: a crisp strip of pure colour on the screen.
          const land = clamp((fanP - 0.9) / 0.1, 0, 1);
          if (land > 0) {
            const strip = (c2: CanvasRenderingContext2D, w: number, alpha: number) => {
              c2.fillStyle = `rgba(${r},${gg},${bb},${alpha * land * (1 - gone) * Math.min(1.2, boost)})`;
              c2.fillRect(screenX - w / 2, la.y, w, lb.y - la.y + 0.6);
            };
            strip(gctx, 16, dark ? 0.9 : 0.55);
            strip(ctx, 4, dark ? 0.95 : 1);
          }
          // Through the lens, the band bends toward the second prism.
          if (gather > 0 && !off[bandOf(i)]) {
            const ga = lerp(la, F, gather), gb = lerp(lb, F, gather);
            const cone = (c: CanvasRenderingContext2D, alpha: number) => {
              const gr = c.createLinearGradient(la.x, la.y, F.x, F.y);
              gr.addColorStop(0, `rgba(${r},${gg},${bb},${alpha * 0.7})`);
              gr.addColorStop(1, `rgba(${r},${gg},${bb},${alpha})`);
              c.fillStyle = gr;
              c.beginPath(); c.moveTo(la.x, la.y); c.lineTo(lb.x, lb.y); c.lineTo(gb.x, gb.y); c.lineTo(ga.x, ga.y); c.closePath(); c.fill();
            };
            cone(gctx, (dark ? 0.55 : 0.3) * boost);
            cone(ctx, clamp((dark ? 0.34 : 0.48) * boost, 0, 1));
          }
        }
        // One beam again, leaving the second prism.
        if (exitOn > 0) {
          const end = lerp(E, exitEnd, exitOn);
          const gr = gctx.createLinearGradient(E.x, E.y, exitEnd.x, exitEnd.y);
          const glow = through.length < BANDS.length ? tint.join(",") : dark ? "255,248,230" : "243,190,90";
          gr.addColorStop(0, `rgba(${glow},${dark ? 0.95 : 0.6})`);
          gr.addColorStop(1, `rgba(${glow},${dark ? 0.2 : 0.12})`);
          gctx.strokeStyle = gr; gctx.lineWidth = 26; gctx.lineCap = "round";
          gctx.beginPath(); gctx.moveTo(E.x, E.y); gctx.lineTo(end.x, end.y); gctx.stroke();
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
      cam(ctx, dpr);

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
      // Bevel: a second, inner edge gives the glass its thickness.
      const inset = (v: V) => add(v, mul(norm(sub(g.c, v)), 7));
      const iT = inset(g.T), iBL = inset(g.BL), iBR = inset(g.BR);
      ctx.strokeStyle = dark ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.95)";
      ctx.lineWidth = dark ? 1 : 1.4;
      ctx.beginPath(); ctx.moveTo(iT.x, iT.y); ctx.lineTo(iBL.x, iBL.y); ctx.lineTo(iBR.x, iBR.y); ctx.closePath(); ctx.stroke();
      if (!dark) {
        ctx.strokeStyle = "rgba(43,38,32,0.1)"; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(iBL.x, iBL.y + 1.5); ctx.lineTo(iBR.x, iBR.y + 1.5); ctx.stroke();
      }

      // The second prism, point down, with the same depth as the first.
      if (p2On > 0 && valid.length > 1) {
        ctx.save();
        ctx.globalAlpha = p2On;
        const tri = [P2.TL, P2.TR, P2.B];
        const back = tri.map((v) => add(v, depth));
        const poly = (pts: V[]) => { ctx.beginPath(); pts.forEach((v, i) => (i ? ctx.lineTo(v.x, v.y) : ctx.moveTo(v.x, v.y))); ctx.closePath(); };
        poly(back); ctx.fillStyle = dark ? "rgba(255,255,255,0.03)" : "rgba(236,230,218,0.5)"; ctx.fill();
        for (let i = 0; i < 3; i++) quad(tri[i], tri[(i + 1) % 3], back[(i + 1) % 3], back[i], dark ? "rgba(255,255,255,0.04)" : "rgba(232,225,212,0.5)");
        const body2 = ctx.createLinearGradient(P2.TL.x, P2.TL.y, P2.B.x, P2.B.y);
        body2.addColorStop(0, dark ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.85)");
        body2.addColorStop(1, dark ? "rgba(255,255,255,0.025)" : "rgba(236,230,218,0.75)");
        poly(tri); ctx.fillStyle = body2; ctx.fill();
        if (gather >= 1 && through.length) {
          // Inside: the colours cross as one.
          ctx.globalCompositeOperation = blend;
          ctx.strokeStyle = through.length < BANDS.length ? `rgba(${tint.join(",")},0.85)` : dark ? "rgba(255,252,240,0.8)" : "rgba(243,190,90,0.7)"; ctx.lineWidth = 3;
          ctx.beginPath(); ctx.moveTo(F.x, F.y); ctx.lineTo(E.x, E.y); ctx.stroke();
          ctx.globalCompositeOperation = "source-over";
        }
        ctx.lineWidth = 1;
        ctx.strokeStyle = dark ? "rgba(255,255,255,0.16)" : "rgba(43,38,32,0.22)"; poly(back); ctx.stroke();
        ctx.strokeStyle = dark ? "rgba(255,255,255,0.32)" : "rgba(43,38,32,0.45)";
        ctx.beginPath(); tri.forEach((v, i) => { ctx.moveTo(v.x, v.y); ctx.lineTo(back[i].x, back[i].y); }); ctx.stroke();
        ctx.strokeStyle = dark ? "rgba(255,255,255,0.55)" : "rgba(43,38,32,0.85)"; ctx.lineWidth = dark ? 1.2 : 1.6;
        poly(tri); ctx.stroke();
        const in2 = tri.map((v) => add(v, mul(norm(sub(c2, v)), 7)));
        ctx.strokeStyle = dark ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.95)"; ctx.lineWidth = dark ? 1 : 1.4;
        poly(in2); ctx.stroke();
        ctx.restore();
      }
      if (exitOn > 0) {
        const end = lerp(E, exitEnd, exitOn);
        const gr = ctx.createLinearGradient(E.x, E.y, exitEnd.x, exitEnd.y);
        const core = dark || through.length < BANDS.length ? tint.join(",") : "43,38,32";
        gr.addColorStop(0, `rgba(${core},1)`);
        gr.addColorStop(1, `rgba(${core},0.35)`);
        ctx.globalCompositeOperation = blend;
        ctx.strokeStyle = gr; ctx.lineWidth = dark ? 2.6 : 2.2; ctx.lineCap = "round";
        ctx.beginPath(); ctx.moveTo(E.x, E.y); ctx.lineTo(end.x, end.y); ctx.stroke();
        const eg = ctx.createRadialGradient(E.x, E.y, 0, E.x, E.y, g.side * 0.07);
        eg.addColorStop(0, dark ? "rgba(255,255,255,0.7)" : "rgba(255,240,200,0.8)");
        eg.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = eg; ctx.beginPath(); ctx.arc(E.x, E.y, g.side * 0.07, 0, Math.PI * 2); ctx.fill();
        ctx.globalCompositeOperation = "source-over";
      }
      // The lens: a thin glass ellipse, edge on, where the screen was.
      if (lensOn > 0 && valid.length > 1) {
        const ry = (yBot - yTop) / 2 + 26;
        ctx.save();
        ctx.globalAlpha = lensOn;
        ctx.beginPath(); ctx.ellipse(screenX, yMid, 9, ry, 0, 0, Math.PI * 2);
        ctx.fillStyle = dark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.7)"; ctx.fill();
        ctx.strokeStyle = dark ? "rgba(255,255,255,0.5)" : "rgba(43,38,32,0.6)"; ctx.lineWidth = 1.2; ctx.stroke();
        ctx.beginPath(); ctx.ellipse(screenX - 2.5, yMid - ry * 0.15, 2, ry * 0.6, 0, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.5)"; ctx.fill();
        // A card held in front of each blocked band.
        const yAt = (f: number) => {
          const lo = valid[Math.floor(f)], hi = valid[Math.min(valid.length - 1, Math.ceil(f))];
          return lerp(landing(lo), landing(hi), f - Math.floor(f)).y;
        };
        BANDS.forEach((b, i) => {
          if (!off[i]) return;
          const y0 = yAt((i / BANDS.length) * (valid.length - 1)) - 3, y1 = yAt(((i + 1) / BANDS.length) * (valid.length - 1)) + 3;
          const [r, gg, bb] = rgbFor(b.nm);
          ctx.fillStyle = dark ? "#1b1a18" : "#f4efe4";
          ctx.fillRect(screenX - 13, y0, 9, y1 - y0);
          ctx.strokeStyle = `rgb(${r},${gg},${bb})`; ctx.lineWidth = 1.2;
          ctx.strokeRect(screenX - 13, y0, 9, y1 - y0);
        });
        ctx.restore();
      }

      // The screen the light lands on: a thin card, edge on.
      if (valid.length > 1 && gone < 1) {
        const top = landing(valid[0]).y, bot = landing(valid[valid.length - 1]).y;
        const show = (reduce ? 1 : clamp((t - 1.3) / 0.8, 0, 1)) * (1 - gone);
        const pad = 22;
        const card = ctx.createLinearGradient(0, top - pad, 0, bot + pad);
        const ink = dark ? "255,255,255" : "43,38,32";
        card.addColorStop(0, `rgba(${ink},0)`);
        card.addColorStop(0.12, `rgba(${ink},${(dark ? 0.22 : 0.3) * show})`);
        card.addColorStop(0.88, `rgba(${ink},${(dark ? 0.22 : 0.3) * show})`);
        card.addColorStop(1, `rgba(${ink},0)`);
        ctx.fillStyle = card;
        ctx.fillRect(screenX + 3, top - pad, 1, bot - top + pad * 2);
        if (!dark) {
          ctx.fillStyle = `rgba(43,38,32,${0.05 * show})`;
          ctx.fillRect(screenX + 4, top - pad * 0.6, 5, bot - top + pad * 1.2);
        }
      }
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
          if (rel.x > 0 && px < screenX && ang >= Math.min(aMin, aMax) - 0.02 && ang <= Math.max(aMin, aMax) + 0.02) light = clamp(1 - Math.hypot(rel.x, rel.y) / (W * 0.6), 0, 1) * fanP;
          const toBeam = sub({ x: px, y: py }, g.pin);
          const along = dot(toBeam, mul(g.d0, -1));
          const perp = Math.abs(toBeam.x * g.d0.y - toBeam.y * g.d0.x);
          if (along > 0 && perp < 10) light = Math.max(light, (1 - perp / 10) * beamP);
          if (light <= 0.02) continue;
          ctx.fillStyle = `rgba(255,250,235,${(0.35 + 0.4 * Math.sin(t * 2 + m.p) ** 2) * light})`;
          ctx.beginPath(); ctx.arc(px, py, m.s, 0, Math.PI * 2); ctx.fill();
        }
      }
      // Flare where the light meets the glass.
      const ft = t - 1.42;
      if (!reduce && ft > 0 && ft < 1 && valid.length) {
        const k = ft < 0.08 ? ft / 0.08 : 1 - (ft - 0.08) / 0.92;
        const at = valid[Math.floor(valid.length / 2)].pout;
        ctx.globalCompositeOperation = dark ? "lighter" : "source-over";
        ctx.save();
        ctx.translate(at.x, at.y);
        ctx.scale(1, 0.05);
        const streak = ctx.createRadialGradient(0, 0, 0, 0, 0, g.side * 1.7);
        streak.addColorStop(0, `rgba(255,252,240,${0.85 * k})`);
        streak.addColorStop(0.35, `rgba(200,215,255,${0.25 * k})`);
        streak.addColorStop(1, "rgba(200,215,255,0)");
        ctx.fillStyle = streak; ctx.beginPath(); ctx.arc(0, 0, g.side * 1.7, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
        const bloom = ctx.createRadialGradient(at.x, at.y, 0, at.x, at.y, g.side * 0.45);
        bloom.addColorStop(0, `rgba(255,250,235,${(dark ? 0.6 : 0.5) * k})`);
        bloom.addColorStop(1, "rgba(255,250,235,0)");
        ctx.fillStyle = bloom; ctx.beginPath(); ctx.arc(at.x, at.y, g.side * 0.45, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";

      // The room starts dark and the scene fades up.
      if (!reduce && t < 1.3) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        const veil = 1 - ease(clamp(t / 1.3, 0, 1));
        ctx.fillStyle = dark ? `rgba(14,13,12,${0.92 * veil})` : `rgba(250,248,243,${0.85 * veil})`;
        ctx.fillRect(0, 0, W, H);
        cam(ctx, dpr);
      }

      // A person at every stage: one ink path that runs along each band and
      // steps down to the next, back and forth through all seven, and a
      // figure who runs it.
      const humanP = reduce ? 1 : clamp((p - 0.72) / 0.22, 0, 1);
      let humanTail: V | null = null;
      if (valid.length > 1 && humanP > 0) {
        const A0 = 0.5, A1 = 0.9;
        const runs = BANDS.map((_, i) => (i % 2 ? [bandAt(i, A1), bandAt(i, A0)] : [bandAt(i, A0), bandAt(i, A1)]));
        const pts = runs.flat();
        const segLen = pts.slice(1).map((v, i) => Math.hypot(v.x - pts[i].x, v.y - pts[i].y));
        const cum = [0]; segLen.forEach((l) => cum.push(cum[cum.length - 1] + l));
        const total = cum[cum.length - 1];
        const at = (d: number) => {
          const dd = clamp(d, 0, total);
          let k = 0;
          while (k < segLen.length - 1 && cum[k + 1] < dd) k++;
          const u = segLen[k] ? (dd - cum[k]) / segLen[k] : 0;
          return { pos: lerp(pts[k], pts[k + 1], u), seg: k, tan: norm(sub(pts[k + 1], pts[k])) };
        };
        const runMid = (i: number) => (cum[i * 2] + cum[i * 2 + 1]) / 2;
        humanTail = pts[pts.length - 1];

        // The path, drawn on by hand with a slight wobble.
        const drawTo = total * ease(humanP);
        const ink = dark ? "rgba(243,238,228,0.85)" : "rgba(34,30,25,0.85)";
        const faint = dark ? "rgba(243,238,228,0.42)" : "rgba(34,30,25,0.4)";
        const inkPath = () => {
          ctx.beginPath();
          for (let d = 0, j = 0; d <= drawTo; d += 4, j++) {
            const { pos, tan } = at(d);
            const w = Math.sin(j * 0.7) * 0.35;
            const x = pos.x - tan.y * w, y = pos.y + tan.x * w;
            if (j) ctx.lineTo(x, y); else ctx.moveTo(x, y);
          }
        };
        ctx.strokeStyle = faint; ctx.lineWidth = 1.1; ctx.lineCap = "round"; ctx.lineJoin = "round";
        inkPath(); ctx.stroke();
        const nowS = now / 1000;
        const dt = figLast ? Math.min(0.05, nowS - figLast) : 0;
        figLast = nowS;
        // Move: run the path end to end and back; a hovered label pulls the
        // runner to that band and they stop there.
        let speed = 0, standing = false;
        const kick = (x: number, y: number, n: number, dir: number) => {
          for (let k = 0; k < n; k++) puffs.push({ x, y, vx: (-dir * (20 + Math.random() * 40)), vy: -(10 + Math.random() * 30), t: nowS });
        };
        if (humanP >= 1 && !reduce) {
          const want = activeRef.current;
          if (want >= 0) {
            const goal = runMid(want), gap = goal - figS;
            if (Math.abs(gap) > 2) { figDir = Math.sign(gap); speed = Math.min(300, 40 + Math.abs(gap) * 4); figS += figDir * speed * dt; }
            else { figS = goal; standing = true; }
          } else {
            // Faster through the middle of a run, slower into the turns.
            const seg = at(figS).seg;
            const runU = seg % 2 ? 1 : clamp((figS - cum[seg]) / Math.max(1, segLen[seg]), 0, 1);
            speed = 120 + 90 * Math.sin(Math.PI * runU);
            figS += figDir * speed * dt;
            if (figS >= total || figS <= 0) {
              figS = clamp(figS, 0, total); figDir *= -1;
              const end = at(figS).pos; kick(end.x, end.y, 9, -figDir);
            }
          }
        } else if (humanP >= 1) standing = true;
        const here = at(figS);
        const onStep = here.seg % 2 === 1;
        const band = Math.min(BANDS.length - 1, Math.floor((here.seg + (onStep && figDir < 0 ? 1 : 0)) / 2));
        if (humanP >= 1 && band !== figBand) {
          if (figBand >= 0 && onStep && figDir > 0) kick(here.pos.x, here.pos.y, 5, 0);
          figBand = band; ripples.push({ i: band, t: nowS });
        }
        if (!onStep && Math.abs(here.tan.x) > 0.2) figFace = Math.sign(here.tan.x * figDir) || figFace;
        if (standing) figFace = 1;
        figPhase += dt * (speed / 9);
        const air = onStep && !standing ? 1 : 0;

        // Knots mark each band's run; they ripple as the runner arrives.
        for (let r = ripples.length - 1; r >= 0; r--) {
          const age = nowS - ripples[r].t;
          if (age > 0.9) { ripples.splice(r, 1); continue; }
          const [cr, cg, cb] = rgbFor(BANDS[ripples[r].i].nm);
          const v = at(runMid(ripples[r].i)).pos;
          ctx.beginPath(); ctx.arc(v.x, v.y, 4 + 18 * (age / 0.9), 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${cr},${cg},${cb},${1 - age / 0.9})`; ctx.lineWidth = 1.5; ctx.stroke();
        }
        BANDS.forEach((_, i) => {
          if (runMid(i) > drawTo) return;
          const v = at(runMid(i)).pos;
          const lit = (humanP >= 1 && i === figBand) || activeRef.current === i;
          const [cr, cg, cb] = rgbFor(BANDS[i].nm);
          ctx.beginPath(); ctx.arc(v.x, v.y, lit ? 3.6 : 2.4, 0, Math.PI * 2);
          ctx.fillStyle = lit ? `rgb(${cr},${cg},${cb})` : dark ? "#151413" : "#fbf9f4"; ctx.fill();
          ctx.strokeStyle = ink; ctx.lineWidth = 1.2; ctx.stroke();
        });
        // Dust.
        for (let k = puffs.length - 1; k >= 0; k--) {
          const d = puffs[k], age = nowS - d.t;
          if (age > 0.6) { puffs.splice(k, 1); continue; }
          ctx.beginPath(); ctx.arc(d.x + d.vx * age, d.y + d.vy * age + 40 * age * age, 1.2 + age * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = dark ? `rgba(243,238,228,${0.5 * (1 - age / 0.6)})` : `rgba(34,30,25,${0.35 * (1 - age / 0.6)})`; ctx.fill();
        }

        if (humanP >= 1) {
          // A stick figure in the house ink, haloed so it reads over colour.
          const figure = (foot: V, ph: number, f: number, airF: number, still: boolean) => {
            const lean = still ? 0 : 0.28 * f;
            const bounce = still ? Math.sin(nowS * 3) * 0.4 : -Math.abs(Math.sin(ph)) * 1.6;
            const hip = { x: foot.x, y: foot.y - 11 + bounce };
            const neck = { x: hip.x + Math.sin(lean) * 11, y: hip.y - Math.cos(lean) * 11 };
            const sh = lerp(hip, neck, 0.85);
            const lines: V[][] = [[hip, neck]];
            if (still) {
              lines.push([hip, { x: hip.x - 1.5, y: hip.y + 5.5 }, { x: foot.x - 3.5, y: foot.y }]);
              lines.push([hip, { x: hip.x + 1.5, y: hip.y + 5.5 }, { x: foot.x + 3.5, y: foot.y }]);
              lines.push([sh, { x: sh.x + 5, y: sh.y - 1 }, { x: sh.x + 10, y: sh.y - 3 }]);
              lines.push([sh, { x: sh.x - 3, y: sh.y + 4 }, { x: sh.x - 4, y: sh.y + 8 }]);
            } else if (airF) {
              lines.push([hip, { x: hip.x + f * 4, y: hip.y + 3 }, { x: hip.x + f * 1, y: hip.y + 8 }]);
              lines.push([hip, { x: hip.x - f * 3, y: hip.y + 5 }, { x: hip.x - f * 6, y: hip.y + 7 }]);
              lines.push([sh, { x: sh.x - 4, y: sh.y - 4 }, { x: sh.x - 6, y: sh.y - 9 }]);
              lines.push([sh, { x: sh.x + 4, y: sh.y - 4 }, { x: sh.x + 6, y: sh.y - 9 }]);
            } else {
              [1, -1].forEach((side) => {
                const a = Math.sin(ph) * 0.95 * side;
                const knee = { x: hip.x + f * Math.sin(a) * 6, y: hip.y + Math.cos(a) * 5.5 };
                const bend = Math.max(0, -Math.sin(ph) * side) * 4;
                lines.push([hip, knee, { x: knee.x - f * (1 + bend), y: knee.y + 5.5 - bend * 0.4 }]);
                const elbow = { x: sh.x - f * Math.sin(a) * 4.5, y: sh.y + 4 };
                lines.push([sh, elbow, { x: elbow.x + f * 3, y: elbow.y - 2.5 }]);
              });
            }
            return { lines, head: { x: neck.x + Math.sin(lean) * 4.2, y: neck.y - Math.cos(lean) * 4.2 } };
          };
          const paint = (fig: ReturnType<typeof figure>, alpha: number, halo: boolean) => {
            ctx.lineCap = "round"; ctx.lineJoin = "round";
            if (halo) {
              ctx.strokeStyle = dark ? "rgba(21,20,19,0.9)" : "rgba(251,249,244,0.95)"; ctx.lineWidth = 4.5;
              ctx.beginPath(); fig.lines.forEach((l) => l.forEach((v, i) => (i ? ctx.lineTo(v.x, v.y) : ctx.moveTo(v.x, v.y)))); ctx.stroke();
              ctx.beginPath(); ctx.arc(fig.head.x, fig.head.y, 4.6, 0, Math.PI * 2); ctx.fillStyle = ctx.strokeStyle; ctx.fill();
            }
            const c = dark ? `rgba(243,238,228,${alpha})` : `rgba(34,30,25,${alpha})`;
            ctx.strokeStyle = c; ctx.lineWidth = 1.7;
            ctx.beginPath(); fig.lines.forEach((l) => l.forEach((v, i) => (i ? ctx.lineTo(v.x, v.y) : ctx.moveTo(v.x, v.y)))); ctx.stroke();
            ctx.beginPath(); ctx.arc(fig.head.x, fig.head.y, 3.3, 0, Math.PI * 2); ctx.fillStyle = c; ctx.fill();
          };
          // Motion trail: a few fading poses behind a runner at speed.
          trail.unshift({ x: here.pos.x, y: here.pos.y, ph: figPhase, f: figFace, air });
          if (trail.length > 14) trail.pop();
          if (speed > 150) [12, 8, 4].forEach((k, j) => {
            const tp = trail[k];
            if (tp) paint(figure(tp, tp.ph, tp.f, tp.air, false), [0.12, 0.2, 0.3][j], false);
          });
          // Speed lines behind the runner.
          if (speed > 170 && !air) {
            ctx.strokeStyle = dark ? "rgba(243,238,228,0.45)" : "rgba(34,30,25,0.35)"; ctx.lineWidth = 1;
            ctx.beginPath();
            [-15, -9, -3].forEach((dy, j) => {
              const x0 = here.pos.x - figFace * (10 + j * 3), y0 = here.pos.y + dy;
              ctx.moveTo(x0, y0); ctx.lineTo(x0 - figFace * (10 + j * 4), y0);
            });
            ctx.stroke();
          }
          paint(figure(here.pos, figPhase, figFace, air, standing), 1, true);
        }
        BANDS.forEach((_, i) => labelRefs.current[i]?.classList.toggle("is-visited", humanP >= 1 && i === figBand && rb < 0.2));
      }

      // Labels stand beside the screen, spaced evenly and led back to their
      // bands, so two lines of type always fit.
      section.classList.toggle("is-compact", compact);
      const labelFade = reduce ? 1 : 1 - clamp(rb / 0.22, 0, 1);
      if (valid.length > 1) {
        const bandY = BANDS.map((_, i) => bandAt(i, 1).y);
        const GAP = 42;
        const span = Math.max(bandY[6] - bandY[0], GAP * 6);
        let top = (bandY[0] + bandY[6]) / 2 - span / 2;
        top = clamp(top, (56 - TY) / S, (H - 64 - TY) / S - span);
        BANDS.forEach((_, i) => {
          const el = labelRefs.current[i];
          if (!el) return;
          const ly = top + (span / 6) * i;
          const show = (reduce ? 1 : clamp((p - 0.62 - i * 0.035) / 0.12, 0, 1)) * labelFade;
          if (!compact && show > 0) {
            const [r, gg, bb] = rgbFor(BANDS[i].nm);
            ctx.strokeStyle = `rgba(${r},${gg},${bb},${0.9 * show})`; ctx.lineWidth = 1.4;
            ctx.beginPath(); ctx.moveTo(screenX + 5, bandY[i]); ctx.lineTo(screenX + 16, ly); ctx.lineTo(screenX + 26, ly); ctx.stroke();
          }
          const at = camPt(screenX + 30, ly);
          el.style.transform = compact ? "" : `translate(${at.x.toFixed(1)}px, ${at.y.toFixed(1)}px) translateY(-50%)`;
          el.style.opacity = String(show);
          el.style.pointerEvents = show > 0.3 ? "" : "none";
        });
      }
      if (humanRef.current) {
        const el = humanRef.current;
        if (humanTail && !compact) {
          const at = camPt(humanTail.x, humanTail.y);
          el.style.transform = `translate(${at.x.toFixed(1)}px, ${at.y.toFixed(1)}px) translate(calc(-100% + 8px), 10px)`;
        } else el.style.transform = "";
        el.style.opacity = String(compact ? 1 : humanP);
      }
      if (aiRef.current) {
        const on = lerp(src, g.pin, 0.38);
        const up = { x: g.d0.y, y: -g.d0.x };
        const side = up.y < 0 ? up : mul(up, -1);
        const at = camPt(on.x + side.x * 46, on.y + side.y * 46 - 10);
        aiRef.current.style.transform = `translate(${at.x.toFixed(1)}px, ${at.y.toFixed(1)}px) rotate(${(-angle).toFixed(2)}deg)`;
        aiRef.current.style.opacity = String(reduce ? 1 : clamp((t - 0.7) / 0.6, 0, 1));
      }
      if (outRef.current) {
        const at = camPt(lerp(E, exitEnd, 0.6).x, E.y - 40);
        // Long captions stay inside the frame.
        const half = outRef.current.offsetWidth / 2;
        const x = clamp(at.x, half + 24, W - half - 24);
        outRef.current.style.transform = `translate(${x.toFixed(1)}px, ${at.y.toFixed(1)}px) translateX(-50%)`;
        outRef.current.style.opacity = String(clamp((rb - 0.72) / 0.18, 0, 1));
        const missing = BANDS.filter((_, i) => off[i]).map((b) => b.label);
        const text = !missing.length ? "A system <em>you understand</em>"
          : missing.length === BANDS.length ? "Nothing <em>gets through</em>"
          : missing.length <= 2 ? `A system <em>missing ${missing.join(" and ")}</em>`
          : `A system <em>missing ${missing.length} parts</em>`;
        if (outRef.current.innerHTML !== text) outRef.current.innerHTML = text;
      }
      if (benchRef.current) {
        const on = clamp((rb - 0.78) / 0.14, 0, 1);
        benchRef.current.style.opacity = String(on);
        benchRef.current.inert = on < 0.5;
      }
      section.classList.toggle("is-rebuilt", rb > 0.05);
      if (contentRef.current) {
        // The copy steps aside for the rebuild and returns if you scroll back.
        const out = clamp((rb - 0.04) / 0.26, 0, 1);
        contentRef.current.style.opacity = String(1 - out);
        contentRef.current.style.transform = out ? `translateY(${(-24 * out).toFixed(1)}px)` : "";
        contentRef.current.style.pointerEvents = out > 0.5 ? "none" : "";
      }
      if (cueRef.current) cueRef.current.style.opacity = String(pinned ? clamp((p - 0.95) / 0.05, 0, 1) * (1 - clamp(q / 0.06, 0, 1)) : 0);
      if (noteRef.current) {
        const at = camPt(g.c.x, g.BL.y + 28);
        noteRef.current.style.transform = `translate(${at.x.toFixed(1)}px, ${at.y.toFixed(1)}px) translateX(-50%)`;
        noteRef.current.style.opacity = String((reduce ? 1 : clamp((p - 0.85) / 0.15, 0, 1)) * (1 - clamp(rb / 0.2, 0, 1)));
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
    if (reduce) { started = true; draw(performance.now()); } else play();
    const begin = () => {
      if (started) return;
      started = true;
      const go = () => window.setTimeout(() => { start = performance.now(); }, 250);
      start = Infinity;
      if (document.fonts?.ready) document.fonts.ready.then(go); else go();
    };

    const ro = new ResizeObserver(() => { resize(); if (!running) draw(performance.now()); });
    ro.observe(section);
    ro.observe(pin);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) play(); else pause();
      if (e.intersectionRatio >= 0.4) begin();
    }, { threshold: [0, 0.4] });
    io.observe(pin);
    const onVis = () => (document.hidden ? pause() : play());
    document.addEventListener("visibilitychange", onVis);
    const theme = new MutationObserver(() => { if (!running) draw(performance.now()); });
    theme.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const onMove = (e: PointerEvent) => {
      if (!fine && e.pointerType !== "touch") return;
      const r = section.getBoundingClientRect();
      const ny = clamp((e.clientY - r.top) / r.height, 0, 1);
      target = 30 - ny * 13;
      yawTarget = clamp(((e.clientX - r.left) / r.width - 0.55) * 2.2, -1, 1);
      lastPointer = performance.now();
    };
    section.addEventListener("pointermove", onMove);
    const replay = () => { start = performance.now(); if (reduce) draw(start); };
    section.addEventListener("prism:replay", replay);

    // Phones: tilting the device steers the light. iOS asks first.
    const onOrient = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      yawTarget = clamp(e.gamma / 28, -1, 1);
      target = 22 + clamp((e.beta - 50) / 35, -1, 1) * 7;
      lastPointer = performance.now();
    };
    type OrientationPermission = { requestPermission?: () => Promise<string> };
    const DOE = (typeof window !== "undefined" ? (window as unknown as { DeviceOrientationEvent?: OrientationPermission }).DeviceOrientationEvent : undefined);
    let orientOn = false;
    const enableOrient = () => { if (!orientOn) { window.addEventListener("deviceorientation", onOrient); orientOn = true; } };
    const asks = !fine && !reduce && !!DOE && typeof DOE.requestPermission === "function";
    if (!fine && !reduce && DOE && !asks) enableOrient();
    if (asks) section.classList.add("needs-tilt");
    const askTilt = () => {
      DOE?.requestPermission?.().then((state) => {
        if (state === "granted") { enableOrient(); section.classList.remove("needs-tilt"); }
      }).catch(() => {});
    };
    section.addEventListener("prism:tilt", askTilt);

    return () => {
      pause(); ro.disconnect(); io.disconnect(); theme.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("prism:replay", replay);
      section.removeEventListener("prism:tilt", askTilt);
      if (orientOn) window.removeEventListener("deviceorientation", onOrient);
    };
  }, []);

  return (
    <section ref={sectionRef} id="hero" className="prism-hero relative scroll-mt-28 w-full border-b border-[color:var(--card-border)]">
      <div ref={pinRef} className="prism-pin">
        <canvas ref={canvasRef} className="prism-canvas" aria-hidden="true" />
        <div className="prism-frame relative max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-12 pt-12 pb-14 md:pt-16 md:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-[10fr_14fr] gap-8 lg:gap-6 items-center">
            <div ref={contentRef} className="flex flex-col gap-6 min-w-0 relative z-[2]">
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
                Everyone says AI. Pass it through a prism and it comes apart into the parts that do
                the work, with a person at every one. Pick a colour to read about it.
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-3 items-center">
                <Link href="#systems-map" className="btn-premium btn-primary">
                  Start with the map
                </Link>
                <Link href="/storyboards/" className="prism-more">
                  Flip through a storyboard <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
            <div ref={stageRef} className="prism-stage" role="group" aria-label="AI through a prism: seven parts, each linking to its explainer">
              <p className="sr-only">
                A beam labelled AI enters a glass prism and leaves as seven bands: the model,
                instructions, context, tools, the harness, permissions and evaluation. An ink line
                marked a human, at every stage, crosses every band: a person chooses the model, writes
                the instructions, decides what it sees and what it can reach, sets when the loop
                stops, decides what needs approval and defines what good means. Scrolling passes the
                bands through a lens and a second prism, which gather them back into one beam: a
                system you understand.
              </p>
            </div>
          </div>
        </div>
        <span ref={aiRef} className="prism-ai" aria-hidden="true">AI <em>as sold</em></span>
        <span ref={noteRef} className="prism-note" aria-hidden="true">Same thing. Now with labels.</span>
        <span ref={outRef} className="prism-ai prism-out" aria-hidden="true">A system <em>you understand</em></span>
        <a ref={humanRef} href={HUMAN_HREF} className="prism-human">
          <span className="prism-human-mark" aria-hidden="true" />
          <span>a human,<br />at every stage</span>
        </a>
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
                <span className="prism-label-text">
                  <span className="prism-label-name">{b.label}</span>
                  <span className="prism-label-note" aria-hidden="true">a person {b.note}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
        <span ref={cueRef} className="prism-cue" aria-hidden="true">Scroll to put it back together</span>
        <div ref={benchRef} className="prism-bench" role="group" aria-label="Block a part at the lens">
          <span className="prism-bench-hint">Block a part. See what gets through.</span>
          <div className="prism-bench-row">
            {BANDS.map((b, i) => (
              <button
                key={b.key}
                type="button"
                className="prism-chip"
                aria-pressed={blocked[i]}
                style={{ ["--band" as string]: `rgb(${rgbFor(b.nm).join(",")})` }}
                onClick={() => setBlocked((cur) => cur.map((v, j) => (j === i ? !v : v)))}
                onPointerEnter={() => { activeRef.current = i; }}
                onPointerLeave={() => { activeRef.current = -1; }}
                onFocus={() => { activeRef.current = i; }}
                onBlur={() => { activeRef.current = -1; }}
              >
                <span className="prism-chip-dot" aria-hidden="true" />
                {b.label}
              </button>
            ))}
          </div>
        </div>
        <button
          type="button"
          className="prism-tilt"
          onClick={(e) => e.currentTarget.closest("section")?.dispatchEvent(new Event("prism:tilt"))}
        >
          Tilt to steer the light
        </button>
        <button
          type="button"
          className="prism-replay"
          onClick={(e) => e.currentTarget.closest("section")?.dispatchEvent(new Event("prism:replay"))}
        >
          <span aria-hidden="true">↻</span> Play again
        </button>
      </div>
    </section>
  );
}
