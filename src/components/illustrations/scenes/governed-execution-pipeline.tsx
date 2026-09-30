import React from "react";
import { D, LINE, Head, Torso } from "../deadpan";
import { At, Lit, Plate, SceneProps, mono } from "./kit";

/**
 * From intent to a verified effect. One slip of paper travels the path: a
 * want, a request, a decision at the gate, the action, then the check on what
 * actually changed. The barrier stays down until the gate has decided.
 */
const SLIP_X = [70, 196, 300, 452, 452];

export default function Scene({ step, id }: SceneProps) {
  const open = step >= 3;
  return (
    <Plate id={id}>
      <path d="M20 352 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* Whoever wants something. */}
      <Lit on={step === 0} off={0.5}>
        <Torso x={70} y={246} w={84} h={106} fill={D.teal} />
        <Head x={70} y={204} r={34} eyes="sleepy" look={1} stubble />
      </Lit>

      {/* The model: it can only say. */}
      <Lit on={step === 1} off={0.4}>
        <path d="M150 128 H244 Q256 128 256 140 V196 Q256 208 244 208 H214 L198 228 L198 208 H150 Q138 208 138 196 V140 Q138 128 150 128 Z" fill="#fff" stroke={D.ink} strokeWidth={4} strokeLinejoin="round" />
        <path d="M184 228 L178 352 M212 228 L218 352" {...LINE} strokeWidth={5} />
      </Lit>

      {/* The gate: a booth, a clerk, a barrier. */}
      <Lit on={step === 2} off={0.5}>
        <rect x={326} y={232} width={70} height={120} fill={D.paperDeep} stroke={D.ink} strokeWidth={4.5} />
        <Head x={361} y={204} r={26} eyes="tt" mouth="flat" stubble hair="messy" />
        {mono(361, 116, "POLICY", 18, D.teal)}
        {mono(361, 140, "SCOPE", 18, D.teal)}
        {mono(361, 164, "RISK", 18, D.teal)}
      </Lit>
      <g style={{ transformBox: "fill-box", transformOrigin: "0% 50%", transform: `rotate(${open ? -68 : 0}deg)`, transition: "transform .5s cubic-bezier(.3,1.3,.5,1)" }}>
        <rect x={398} y={292} width={84} height={12} rx={4} fill={D.accent} stroke={D.ink} strokeWidth={3.5} />
      </g>

      {/* The tool: a lever that does the thing. */}
      <Lit on={step === 3} off={0.45}>
        <rect x={424} y={300} width={62} height={52} fill={D.greyLight} stroke={D.ink} strokeWidth={4.5} />
        <g style={{ transformBox: "fill-box", transformOrigin: "50% 100%", transform: `rotate(${open ? 30 : -30}deg)`, transition: "transform .4s ease .2s" }}>
          <path d="M455 300 V262" {...LINE} strokeWidth={6} />
          <circle cx={455} cy={258} r={8} fill={D.accent} stroke={D.ink} strokeWidth={3.5} />
        </g>
      </Lit>

      {/* The record, read afterwards. */}
      <Lit on={step === 4} off={0.4}>
        <path d="M530 300 L572 290 L614 300 V350 L572 340 L530 350 Z" fill="#fff" stroke={D.ink} strokeWidth={4} strokeLinejoin="round" />
        <path d="M572 290 V340 M540 314 L562 309 M540 328 L562 323" stroke={D.ink} strokeWidth={3} strokeLinecap="round" />
        <g style={{ opacity: step === 4 ? 1 : 0, transition: "opacity .3s .2s" }}>
          <path d="M582 318 L590 326 L604 308" {...LINE} stroke={D.accent} strokeWidth={5} />
          <circle cx={592} cy={318} r={26} fill="none" stroke={D.ink} strokeWidth={4.5} />
          <path d="M610 338 L626 358" {...LINE} strokeWidth={7} />
        </g>
      </Lit>

      {/* The slip. A request until the lever moves; an effect after. */}
      <At x={SLIP_X[Math.min(step, 4)]} y={step === 0 ? 132 : step === 1 ? 168 : step >= 3 ? 236 : 262} o={step === 0 ? 0.55 : 1}>
        <rect x={-44} y={-22} width={88} height={44} fill={step >= 3 ? D.accent : "#fff"} stroke={D.ink} strokeWidth={4} strokeDasharray={step >= 3 ? undefined : "8 6"} style={{ transition: "fill .3s" }} />
        {mono(0, 7, step >= 3 ? "-$40" : "$40?", 19, step >= 3 ? "#fff" : D.ink)}
      </At>

      {mono(320, 392, ["WANTED", "A REQUEST", "DECIDED HERE AND NOW", "NOW IT IS AN EFFECT", "IS IT TRUE NOW?"][Math.min(step, 4)], 18, D.accent)}
    </Plate>
  );
}
