"use client";

import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { D, DeadpanDefs, Paper, Ink, Sheet, Label } from "../illustrations/deadpan";
import { Stamp, Slip } from "../illustrations/props";
import { Gate } from "../illustrations/kit";

/**
 * DAX hero as a short film (about 5 seconds, once per load):
 *
 *   0.0  aged paper, slow push in
 *   0.25 Intent sheet lands
 *   0.55 Policy
 *   0.85 Approval (blank)
 *   1.15 Evidence
 *   1.5  a propose-edit slip slides toward the desk
 *   1.9  the policy clerk steps in
 *   2.6  ASK stamp winds up and lands; small shake; the slip stops
 *   3.4  caption writes: the contract, not the chat
 *   then idle: soft clerk bob only (no stamp spam)
 *
 * Deadpan register. GSAP choreography. Reduced motion (and no-JS) show the
 * settled final frame. Claims match the product page: policy can pause a
 * risky write with ask before mutation.
 */

const W = 360;
const H = 320;

const LAYERS = [
  { cls: "dhc-sheet-intent", label: "Intent", y: 64, r: -4 },
  { cls: "dhc-sheet-policy", label: "Policy", y: 110, r: -1.5 },
  { cls: "dhc-sheet-approval", label: "Approval", y: 156, r: 1.5 },
  { cls: "dhc-sheet-evidence", label: "Evidence", y: 202, r: 3.5 },
] as const;

const reduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function DaxHeroCinema() {
  const root = useRef<SVGSVGElement>(null);

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
      gsap.set(q(".dhc-camera"), { transformOrigin: "50% 55%", scale: 1 });
      gsap.set(q(".dhc-sheet"), { autoAlpha: 0, y: -18 });
      gsap.set(q(".dhc-slip"), { autoAlpha: 0, x: -40, y: 12 });
      gsap.set(q(".dhc-gate"), { autoAlpha: 0, x: 48 });
      gsap.set(q(".dhc-stamp"), { autoAlpha: 0, y: -36, rotation: -28, transformOrigin: "50% 50%" });
      gsap.set(q(".dhc-ask-word"), { autoAlpha: 0, scale: 0.4, transformOrigin: "50% 50%" });
      gsap.set(q(".dhc-caption-mask"), { attr: { width: 0 } });
      svg.classList.add("is-playing");

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      film = tl;
      if (process.env.NODE_ENV !== "production") {
        (window as unknown as { __daxHeroFilm?: gsap.core.Timeline }).__daxHeroFilm = tl;
      }

      tl.to(q(".dhc-camera"), { scale: 1.03, duration: 5.2, ease: "sine.inOut" }, 0);

      LAYERS.forEach((layer, i) => {
        const t = 0.25 + i * 0.3;
        tl.to(q(`.${layer.cls}`), { autoAlpha: 1, y: 0, duration: 0.35, ease: "back.out(1.8)" }, t);
      });

      tl.to(q(".dhc-slip"), { autoAlpha: 1, x: 0, y: 0, duration: 0.45, ease: "power2.out" }, 1.5);
      tl.to(q(".dhc-slip"), { x: 28, duration: 0.55, ease: "power1.inOut" }, 1.95);

      tl.to(q(".dhc-gate"), { autoAlpha: 1, x: 0, duration: 0.55, ease: "steps(6)" }, 1.9);
      tl.to(q(".dhc-gate-body"), { y: -4, duration: 0.09, yoyo: true, repeat: 5, ease: "none" }, 1.9);

      tl.to(q(".dhc-stamp"), { autoAlpha: 1, duration: 0.12 }, 2.55);
      tl.to(q(".dhc-stamp"), { y: 0, rotation: -12, duration: 0.28, ease: "power4.in" }, 2.58);
      tl.to(q(".dhc-ask-word"), { autoAlpha: 1, scale: 1, duration: 0.18, ease: "back.out(3)" }, 2.82);
      tl.to(
        q(".dhc-shake"),
        { keyframes: [{ x: 3 }, { x: -3 }, { x: 1.5 }, { x: 0 }], duration: 0.22, ease: "none" },
        2.82,
      );
      tl.to(q(".dhc-slip"), { x: 28, y: 2, duration: 0.2 }, 2.82);

      tl.to(q(".dhc-ask-word"), { autoAlpha: 0, duration: 0.25 }, 3.35);
      tl.to(q(".dhc-caption-mask"), { attr: { width: 280 }, duration: 0.9, ease: "power1.inOut" }, 3.4);

      tl.add(() => {
        gsap.to(q(".dhc-gate-body"), {
          y: -3,
          duration: 1.8,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          delay: 0.4,
        });
      }, 4.5);
    }, svg);

    const guard = window.setTimeout(() => {
      if (document.visibilityState === "visible" && film && film.time() === 0) film.progress(1);
    }, 2500);

    return () => {
      window.clearTimeout(guard);
      ctx.revert();
    };
  }, []);

  return (
    <figure className="dax-hero-plate m-0 w-full max-w-[360px] ml-auto">
      <svg
        ref={root}
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        height="auto"
        className="ill-svg dax-hero-cinema"
        role="img"
        aria-label="Contract layers stack on aged paper: Intent, Policy, Approval, Evidence. A propose-edit slip slides in. A policy clerk stamps ASK on Approval and the slip stops. Caption: the contract, not the chat."
      >
        <DeadpanDefs id="dhc" boil />
        <defs>
          <clipPath id="dhc-caption-clip">
            <rect className="dhc-caption-mask" x={40} y={268} width={280} height={40} />
          </clipPath>
        </defs>
        <Paper id="dhc" w={W} h={H} />

        <g className="dhc-shake">
          <g className="dhc-camera">
            <Ink id="dhc">
              {LAYERS.map((l) => (
                <g key={l.label} className={`dhc-sheet ${l.cls}`}>
                  <Sheet x={36} y={l.y} w={170} h={54} title={l.label} lines={2} r={l.r} />
                </g>
              ))}

              <g className="dhc-slip">
                <Slip x={8} y={168} text="propose edit" w={112} h={44} size={13} rotate={-6} color={D.teal} />
              </g>

              <g className="dhc-stamp">
                <Stamp x={148} y={142} text="ASK" w={88} size={18} rotate={-12} color={D.accent} />
              </g>

              <g className="dhc-gate">
                <g transform="translate(218 36) scale(0.44)">
                  <g className="dhc-gate-body">
                    <Gate x={0} y={0} counter="POLICY" />
                  </g>
                </g>
              </g>

              <text
                className="dhc-ask-word ill-sans"
                opacity={0}
                x={210}
                y={138}
                fontSize={28}
                fontWeight={800}
                fill={D.accent}
                transform="rotate(-8 210 138)"
              >
                ASK
              </text>

              <g clipPath="url(#dhc-caption-clip)">
                <Label x={180} y={292} text="the contract, not the chat" size={12} color={D.grey} r={-1} />
              </g>
            </Ink>
          </g>
        </g>
      </svg>
      <figcaption className="dax-stage-caption">Contract layers</figcaption>
    </figure>
  );
}
