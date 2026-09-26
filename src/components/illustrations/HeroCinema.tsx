"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { D, LINE, DeadpanDefs, Paper, Ink, Stubble, Limb } from "./deadpan";

/**
 * The home page hero, as a short film (about 6 seconds, once per load):
 *
 *   0.0  aged paper, a slow push in; the pot draws itself
 *   0.5  the vines grow in steps, like stop-motion; leaves and tags pop in
 *   1.7  the gardener walks in with shears twice his size
 *   2.7  he stops and looks at the camera, a beat too long
 *   3.3  wind-up, SNIP, a small camera shake
 *   3.5  the pruned stem and its "hype" tag fall in two swings; struck on landing
 *   4.5  he swaps the shears for tea and sips
 *   5.0  the caption writes itself: pruning my pothos.
 *   then idle: he blinks, the plant sways, the ink boils
 *
 * Drawn in the deadpan register (deadpan.tsx). Choreographed with GSAP. Under
 * reduced motion the final frame is shown still. Before scripts run (and for
 * anyone without them) the markup is the final frame too; see .hero-cinema in
 * globals.css for how the intro hides it only when it is about to play.
 *
 * Hovering a kept tag shows what it means in the caption line below.
 */

const W = 640;
const H = 560;

type Kept = "evidence" | "plain words" | "checks";
const NOTES: Record<Kept, string> = {
  evidence: "evidence: what the claim stands on",
  "plain words": "plain words: no jargon doing the work",
  checks: "checks: what enforces, not what asks",
};

function Leaf({ x, y, r, s = 1, v = false, dead = false }: { x: number; y: number; r: number; s?: number; v?: boolean; dead?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      <path
        d="M0 -4 C -8 -2, -32 0, -38 -24 C -44 -50, -18 -72, 0 -90 C 18 -72, 44 -50, 38 -24 C 32 0, 8 -2, 0 -4 Z"
        fill={dead ? "#CFC7B2" : D.leaf}
        stroke={D.ink}
        strokeWidth={4.5}
        strokeLinejoin="round"
      />
      {v && !dead && <path d="M-6 -20 C -20 -30, -22 -50, -8 -64 C -4 -48, -2 -34, -6 -20 Z" fill="#A9CBB7" />}
      <path d="M0 -8 C 1 -30, 1 -58, 0 -80" fill="none" stroke={D.ink} strokeWidth={3} strokeLinecap="round" />
    </g>
  );
}

function Tag({ x, y, w, text, to, rotate = 0, onEnter }: { x: number; y: number; w: number; text: string; to: [number, number]; rotate?: number; onEnter?: () => void }) {
  return (
    <g className="hc-tag" onPointerEnter={onEnter}>
      <path d={`M${x + 10} ${y + 20} Q ${(x + to[0]) / 2} ${(y + to[1]) / 2 + 20}, ${to[0]} ${to[1]}`} fill="none" stroke={D.greyLight} strokeWidth={2.5} strokeDasharray="3 6" strokeLinecap="round" />
      <g transform={`rotate(${rotate} ${x + w / 2} ${y + 20})`}>
        <path d={`M${x + 12} ${y} H${x + w} V${y + 40} H${x + 12} L${x} ${y + 20} Z`} fill="#fff" stroke={D.ink} strokeWidth={4} strokeLinejoin="round" />
        <circle cx={x + 14} cy={y + 20} r={4} fill={D.paper} stroke={D.ink} strokeWidth={2.5} />
        <text x={x + 22 + (w - 22) / 2} y={y + 29} textAnchor="middle" className="ill-hand" fontSize={25} fontWeight={700} fill={D.ink}>
          {text}
        </text>
      </g>
    </g>
  );
}

const KEPT_LEAVES = [
  { x: 150, y: 318, r: -50, s: 0.85, v: true },
  { x: 256, y: 300, r: 46, s: 0.85 },
  { x: 100, y: 232, r: -66, s: 0.95 },
  { x: 290, y: 214, r: 60, s: 0.95, v: true },
  { x: 88, y: 150, r: -24, s: 0.9, v: true },
  { x: 300, y: 138, r: 20, s: 0.85 },
  { x: 118, y: 82, r: 12, s: 0.75 },
  { x: 272, y: 92, r: -10, s: 0.65 },
  { x: 130, y: 444, r: -112, s: 0.8, v: true },
  { x: 50, y: 488, r: -128, s: 0.75 },
];

const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function HeroCinema() {
  const root = useRef<SVGSVGElement>(null);
  const [note, setNote] = useState<string | null>(null);

  useLayoutEffect(() => {
    const svg = root.current;
    if (!svg) return;
    const q = gsap.utils.selector(svg);

    if (reduced()) {
      svg.classList.add("is-still");
      return;
    }

    let film: gsap.core.Timeline | null = null;
    const ctx = gsap.context(() => {
      // Starting positions for everything the film brings on.
      gsap.set(q(".hc-camera"), { transformOrigin: "50% 55%", scale: 1 });
      // Hidden strokes stay invisible until they draw: round caps on a zero-length
      // dash would otherwise leave dots on the paper.
      gsap.set(q(".hc-pot-line"), { strokeDasharray: "1 2", strokeDashoffset: 1.02, autoAlpha: 0 });
      gsap.set(q(".hc-pot-fill"), { autoAlpha: 0 });
      gsap.set(q(".hc-vine"), { strokeDasharray: "1 2", strokeDashoffset: 1.02, autoAlpha: 0 });
      gsap.set(q(".hc-leaf"), { autoAlpha: 0, scale: 0.3, transformOrigin: "50% 100%" });
      gsap.set(q(".hc-tag"), { autoAlpha: 0, y: -10 });
      gsap.set(q(".hc-gardener"), { x: 300 });
      gsap.set(q(".hc-arm-snip, .hc-arm-sip"), { autoAlpha: 0 });
      gsap.set(q(".hc-blade-a"), { rotation: -16, svgOrigin: "0 0" });
      gsap.set(q(".hc-blade-b"), { rotation: 16, svgOrigin: "0 0" });
      gsap.set(q(".hc-snip-word"), { autoAlpha: 0, scale: 0.4, transformOrigin: "50% 50%" });
      gsap.set(q(".hc-strike"), { strokeDasharray: "1 2", strokeDashoffset: 1.02, autoAlpha: 0 });
      gsap.set(q(".hc-caption-mask"), { attr: { width: 0 } });
      gsap.set(q(".hc-steam"), { autoAlpha: 0 });
      gsap.set(q(".hc-pruned"), { x: 0, y: 0, rotation: 0, svgOrigin: "342 366", autoAlpha: 0 });
      svg.classList.add("is-playing");

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      film = tl;
      // Development only: lets the film be paused and scrubbed from the console.
      if (process.env.NODE_ENV !== "production") (window as unknown as { __heroFilm?: gsap.core.Timeline }).__heroFilm = tl;

      // Camera: a slow push in across the whole film.
      tl.to(q(".hc-camera"), { scale: 1.035, duration: 6.2, ease: "sine.inOut" }, 0);

      // The pot draws, then fills.
      tl.set(q(".hc-pot-line"), { autoAlpha: 1 }, 0.1);
      tl.to(q(".hc-pot-line"), { strokeDashoffset: 0, duration: 0.6, ease: "power1.inOut" }, 0.1);
      tl.to(q(".hc-pot-fill"), { autoAlpha: 1, duration: 0.25 }, 0.55);

      // Vines grow in stop-motion steps.
      tl.to(q(".hc-vine"), { autoAlpha: 1, duration: 0.01, stagger: 0.12 }, 0.5);
      tl.to(q(".hc-vine"), { strokeDashoffset: 0, duration: 0.9, ease: "steps(7)", stagger: 0.12 }, 0.5);

      // Leaves and tags pop in.
      tl.to(q(".hc-leaf"), { autoAlpha: 1, scale: 1, duration: 0.35, ease: "back.out(2.4)", stagger: 0.06 }, 0.8);
      tl.to(q(".hc-pruned"), { autoAlpha: 1, duration: 0.3 }, 1.25);
      tl.to(q(".hc-tag"), { autoAlpha: 1, y: 0, duration: 0.3, ease: "back.out(2)", stagger: 0.08 }, 1.35);

      // Enter the gardener: a stepped walk with a bob.
      tl.to(q(".hc-gardener"), { x: 0, duration: 1.0, ease: "steps(8)" }, 1.7);
      tl.to(q(".hc-gardener-body"), { y: -6, duration: 0.125, yoyo: true, repeat: 7, ease: "none" }, 1.7);

      // He looks at the camera. A beat too long.
      tl.to(q(".hc-pupil"), { x: 3, y: -1, duration: 0.15, ease: "none" }, 2.75);

      // Wind-up, then the snip.
      tl.set(q(".hc-arm-enter"), { autoAlpha: 0 }, 3.25);
      tl.set(q(".hc-arm-snip"), { autoAlpha: 1 }, 3.25);
      tl.to(q(".hc-gardener-body"), { x: -8, duration: 0.15, ease: "power1.in" }, 3.25);
      tl.to(q(".hc-blade-a"), { rotation: 0, duration: 0.08, ease: "power4.in" }, 3.42);
      tl.to(q(".hc-blade-b"), { rotation: 0, duration: 0.08, ease: "power4.in" }, 3.42);
      tl.to(q(".hc-snip-word"), { autoAlpha: 1, scale: 1, duration: 0.18, ease: "back.out(3)" }, 3.46);
      tl.to(q(".hc-shake"), { keyframes: [{ x: 4 }, { x: -4 }, { x: 2 }, { x: 0 }], duration: 0.2, ease: "none" }, 3.46);

      // What was cut falls: two swings, then lands.
      tl.to(q(".hc-pruned"), {
        keyframes: [
          { x: 10, y: 34, rotation: 18, duration: 0.3, ease: "power1.in" },
          { x: -8, y: 68, rotation: -12, duration: 0.3, ease: "sine.inOut" },
          { x: 4, y: 92, rotation: 8, duration: 0.25, ease: "power2.in" },
        ],
        svgOrigin: "342 366",
      }, 3.5);
      tl.set(q(".hc-strike"), { autoAlpha: 1 }, 4.4);
      tl.to(q(".hc-strike"), { strokeDashoffset: 0, duration: 0.3 }, 4.4);
      tl.to(q(".hc-snip-word"), { autoAlpha: 0, duration: 0.3 }, 4.3);

      // Tea.
      tl.set(q(".hc-arm-snip"), { autoAlpha: 0 }, 4.55);
      tl.set(q(".hc-arm-sip"), { autoAlpha: 1 }, 4.55);
      tl.to(q(".hc-gardener-body"), { x: 0, duration: 0.2 }, 4.55);
      tl.to(q(".hc-steam"), { autoAlpha: 1, duration: 0.3 }, 4.7);

      // The caption writes itself.
      tl.to(q(".hc-caption-mask"), { attr: { width: 320 }, duration: 1.1, ease: "power1.inOut" }, 5.0);

      // Idle: blink, sway.
      tl.add(() => {
        gsap.to(q(".hc-eyes"), {
          keyframes: [{ scaleY: 0.1, duration: 0.07 }, { scaleY: 1, duration: 0.1 }],
          transformOrigin: "50% 50%",
          repeat: -1,
          repeatDelay: 3.6,
          delay: 1.2,
        });
        gsap.to(q(".hc-plant"), { rotation: 1.2, svgOrigin: "200 410", duration: 2.8, yoyo: true, repeat: -1, ease: "sine.inOut" });
      }, 6.1);
    }, svg);

    // Fail-safe: if the page is on screen but the film has not moved (no
    // animation frames, for whatever reason), show the finished scene rather
    // than an empty sheet of paper.
    const guard = window.setTimeout(() => {
      if (document.visibilityState === "visible" && film && film.time() === 0) film.progress(1);
    }, 2500);

    return () => {
      window.clearTimeout(guard);
      ctx.revert();
    };
  }, []);

  return (
    <figure className="m-0 w-full">
      <div className="overflow-hidden rounded-sm border border-[#D9CDB2] shadow-sm">
        <svg
          ref={root}
          viewBox={`0 0 ${W} ${H}`}
          className="ill-svg hero-cinema"
          role="img"
          aria-label="A deadpan gardener walks up to a potted pothos, looks at you, and snips off a stem tagged hype. It falls and is struck through. He sips his tea. The pothos keeps its leaves tagged evidence, plain words and checks. Caption: pruning my pothos. Cut the claims, keep the craft."
          onPointerLeave={() => setNote(null)}
        >
          <DeadpanDefs id="hc" boil />
          <defs>
            <clipPath id="hc-caption-clip">
              <rect className="hc-caption-mask" x={320} y={30} width={320} height={100} />
            </clipPath>
          </defs>
          <Paper id="hc" w={W} h={H} />

          <g className="hc-shake">
            <g className="hc-camera">
              <Ink id="hc">
                {/* The plant sways as one piece around the pot rim. */}
                <g className="hc-plant">
                  <g fill="none" stroke={D.ink} strokeWidth={5} strokeLinecap="round">
                    {[
                      "M192 406 C 180 340, 130 300, 100 230 C 76 176, 84 120, 118 80",
                      "M206 406 C 222 330, 270 290, 290 214 C 304 170, 296 120, 272 90",
                      "M186 424 C 150 440, 90 446, 44 490",
                      "M214 418 C 262 420, 306 396, 342 366",
                    ].map((d, i) => (
                      <path key={i} d={d} pathLength={1} className="hc-vine" />
                    ))}
                  </g>
                  {KEPT_LEAVES.map((l, i) => (
                    <g key={i} className="hc-leaf">
                      <Leaf {...l} />
                    </g>
                  ))}
                  <Tag x={6} y={236} w={118} text="evidence" to={[46, 214]} rotate={-3} onEnter={() => setNote(NOTES.evidence)} />
                  <Tag x={4} y={318} w={138} text="plain words" to={[112, 318]} rotate={3} onEnter={() => setNote(NOTES["plain words"])} />
                  <Tag x={318} y={130} w={104} text="checks" to={[330, 150]} rotate={-4} onEnter={() => setNote(NOTES.checks)} />
                </g>

                {/* The piece that gets cut, with its tag. */}
                <g className="hc-pruned">
                  <path d="M342 366 C 358 350, 366 330, 368 306" {...LINE} strokeWidth={5} />
                  <Leaf x={368} y={306} r={24} s={0.7} />
                  <path d="M352 352 C 350 372, 346 392, 336 406" fill="none" stroke={D.greyLight} strokeWidth={2.5} strokeDasharray="3 6" strokeLinecap="round" />
                  <g transform="rotate(-6 330 424)">
                    <path d="M298 404 H374 V444 H298 L286 424 Z" fill="#fff" stroke={D.ink} strokeWidth={4} strokeLinejoin="round" />
                    <circle cx={299} cy={424} r={4} fill={D.paper} stroke={D.ink} strokeWidth={2.5} />
                    <text x={334} y={433} textAnchor="middle" className="ill-hand" fontSize={25} fontWeight={700} fill={D.ink}>hype</text>
                    <path className="hc-strike" pathLength={1} d="M306 426 C 322 420, 346 430, 368 422" fill="none" stroke={D.accent} strokeWidth={5} strokeLinecap="round" />
                  </g>
                </g>

                {/* The pot, drawn over the stems. */}
                <path className="hc-pot-fill" d="M130 420 H270 L256 520 H144 Z" fill={D.accent} />
                <rect className="hc-pot-fill" x={120} y={402} width={160} height={24} rx={5} fill={D.accent} />
                <path className="hc-pot-line" pathLength={1} d="M130 426 H270 L256 520 H144 Z M120 407 Q120 402 125 402 H275 Q280 402 280 407 V421 Q280 426 275 426 H125 Q120 426 120 421 Z" fill="none" stroke={D.ink} strokeWidth={5} strokeLinejoin="round" />
                <path className="hc-pot-fill" d="M164 462 C 186 454, 214 454, 236 462" fill="none" stroke="#fff" strokeWidth={3.5} strokeLinecap="round" opacity={0.5} />

                {/* The gardener. */}
                <g className="hc-gardener">
                  <g transform="translate(386 150) scale(0.78)">
                    <g className="hc-gardener-body">
                      <path d="M152 460 L156 330 M204 460 L200 330" {...LINE} strokeWidth={6} />
                      <path d="M128 462 H158 M200 462 H232" {...LINE} strokeWidth={9} />
                      <path d="M118 348 L124 222 C 128 200 150 192 178 192 C 206 192 228 200 232 222 L238 348 Z" fill={D.grey} stroke={D.ink} strokeWidth={5} strokeLinejoin="round" />
                      <path d="M178 196 V346" stroke={D.ink} strokeWidth={3} />
                      <circle cx={170} cy={250} r={3.5} fill={D.face} />
                      <circle cx={170} cy={284} r={3.5} fill={D.face} />
                      <circle cx={170} cy={318} r={3.5} fill={D.face} />
                      <rect x={170} y={170} width={16} height={26} fill={D.face} stroke={D.ink} strokeWidth={4} />
                      <circle cx={178} cy={108} r={66} fill={D.face} stroke={D.ink} strokeWidth={5} />
                      <path d="M150 46 C 146 30 152 24 158 30 M172 42 C 172 24 180 20 184 28 M194 44 C 198 28 208 28 206 40" fill="none" stroke={D.ink} strokeWidth={3} strokeLinecap="round" />
                      <ellipse cx={112} cy={112} rx={10} ry={16} fill={D.face} stroke={D.ink} strokeWidth={4} />
                      <g className="hc-eyes">
                        <path d="M135 104 A 17 17 0 0 0 169 104 Z" fill="#fff" stroke={D.ink} strokeWidth={3.5} strokeLinejoin="round" />
                        <path d="M189 104 A 17 17 0 0 0 223 104 Z" fill="#fff" stroke={D.ink} strokeWidth={3.5} strokeLinejoin="round" />
                        <g className="hc-pupil">
                          <circle cx={149} cy={112} r={5} fill={D.ink} />
                          <circle cx={203} cy={112} r={5} fill={D.ink} />
                        </g>
                        <path d="M132 104 H172 M186 104 H226" {...LINE} strokeWidth={5} />
                      </g>
                      <path d="M178 116 q 8 10 0 16" {...LINE} strokeWidth={3} />
                      <path d="M164 148 H194" {...LINE} strokeWidth={4.5} />
                      <Stubble x={140} y={134} w={80} h={36} n={22} />

                      <g className="hc-arm-enter">
                        <Limb d="M228 234 C 246 226, 250 214, 244 202" fill={D.grey} />
                        <g transform="translate(244 204) rotate(-62)">
                          <path d="M0 -4 L150 -16 L150 -4 L4 6 Z" fill="#fff" stroke={D.ink} strokeWidth={4} strokeLinejoin="round" />
                          <path d="M0 4 L150 18 L150 6 L4 -6 Z" fill="#fff" stroke={D.ink} strokeWidth={4} strokeLinejoin="round" />
                          <rect x={-74} y={-20} width={74} height={14} rx={6} fill={D.accent} stroke={D.ink} strokeWidth={3.5} />
                          <rect x={-74} y={6} width={74} height={14} rx={6} fill={D.accent} stroke={D.ink} strokeWidth={3.5} />
                          <circle cx={0} cy={0} r={5} fill={D.ink} />
                        </g>
                      </g>

                      <g className="hc-arm-snip">
                        <Limb d="M130 236 C 106 260, 90 270, 64 270" fill={D.grey} />
                        <Limb d="M226 236 C 214 262, 200 276, 176 280" fill={D.grey} />
                        <g transform="translate(96 276)">
                          <g className="hc-blade-a">
                            <path d="M0 -4 L-150 -10 L-150 0 L0 4 Z" fill="#fff" stroke={D.ink} strokeWidth={4} strokeLinejoin="round" />
                            <rect x={0} y={-12} width={80} height={12} rx={6} fill={D.accent} stroke={D.ink} strokeWidth={3.5} />
                          </g>
                          <g className="hc-blade-b">
                            <path d="M0 4 L-150 10 L-150 0 L0 -4 Z" fill="#fff" stroke={D.ink} strokeWidth={4} strokeLinejoin="round" />
                            <rect x={0} y={0} width={80} height={12} rx={6} fill={D.accent} stroke={D.ink} strokeWidth={3.5} />
                          </g>
                          <circle cx={0} cy={0} r={5} fill={D.ink} />
                        </g>
                      </g>

                      <g className="hc-arm-sip">
                        <Limb d="M130 238 C 110 210, 118 176, 132 166" fill={D.grey} />
                        <path d="M112 146 H154 L150 176 Q133 186 116 176 Z" fill="#fff" stroke={D.ink} strokeWidth={4} strokeLinejoin="round" />
                        <path d="M154 152 c 12 0 12 18 -2 18" fill="none" stroke={D.ink} strokeWidth={4} />
                        <path className="hc-steam" d="M124 134 q -6 -10 0 -18 M140 132 q -6 -10 0 -18" fill="none" stroke={D.greyLight} strokeWidth={3} strokeLinecap="round" />
                      </g>
                    </g>
                  </g>
                </g>

                <text className="hc-snip-word ill-sans" opacity={0} x={300} y={318} fontSize={38} fontWeight={800} fill={D.accent} transform="rotate(-10 330 306)">
                  SNIP
                </text>
              </Ink>

              <g clipPath="url(#hc-caption-clip)">
                <text x={488} y={72} textAnchor="middle" className="ill-hand" fontSize={36} fontWeight={700} fill={D.ink}>
                  pruning my pothos.
                </text>
                <text x={488} y={106} textAnchor="middle" className="ill-hand" fontSize={22} fontWeight={700} fill={D.accent}>
                  Cut the claims. Keep the craft.
                </text>
              </g>
            </g>
          </g>
        </svg>
      </div>
      <figcaption className="mt-3 flex justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--text-muted)]">
        <span className="shrink-0">Plate · pruning_my_pothos</span>
        {note ? (
          <span aria-live="polite" className="ill-hand text-right text-base normal-case tracking-normal leading-none text-[color:var(--accent-amber)]">
            {note}
          </span>
        ) : (
          <span aria-live="polite" className="text-right">Hover a tag</span>
        )}
      </figcaption>
    </figure>
  );
}
