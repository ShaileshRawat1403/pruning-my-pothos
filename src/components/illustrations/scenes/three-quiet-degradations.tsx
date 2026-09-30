import React from "react";
import { D, LINE } from "../deadpan";
import { At, Lit, Plate, SceneProps, mono } from "./kit";

/**
 * Three quiet degradations. Three small machines, each with its lamp still
 * green. The ground moves under the first. The second's number climbs while
 * its plant droops. The third's tray fills with shapes it has no slot for.
 */
const Lamp = ({ x }: { x: number }) => (
  <g>
    <circle cx={x} cy={84} r={12} fill={D.leaf} stroke={D.ink} strokeWidth={3.5} />
    {mono(x + 22, 91, "OK", 18, D.ink, "start")}
  </g>
);

export default function Scene({ step, id }: SceneProps) {
  return (
    <Plate id={id}>
      <path d="M220 60 V360 M420 60 V360" stroke={D.greyLight} strokeWidth={3} strokeDasharray="4 12" strokeLinecap="round" />

      {/* Drift: built for where the mark used to be. */}
      <Lit on={step === 0} off={0.35}>
        <Lamp x={70} />
        <rect x={70} y={170} width={80} height={110} fill={D.shirt} stroke={D.ink} strokeWidth={4.5} />
        <path d="M110 280 V320" {...LINE} strokeWidth={5} />
        <path d="M30 330 H200" {...LINE} strokeWidth={4} />
        <path d="M110 336 l -8 14 h 16 Z" fill={D.greyLight} stroke={D.ink} strokeWidth={3} />
        <At x={step === 0 ? 62 : 0}>
          <path d="M110 336 l -8 14 h 16 Z" fill={D.accent} stroke={D.ink} strokeWidth={3} />
        </At>
      </Lit>

      {/* A measure becoming a target: the number goes up. */}
      <Lit on={step === 1} off={0.35}>
        <Lamp x={270} />
        <path d="M250 330 H400" {...LINE} strokeWidth={4} />
        {[0, 1, 2].map((i) => (
          <rect key={i} x={262 + i * 30} y={step === 1 ? 250 - i * 38 : 270 - i * 12} width={22} height={step === 1 ? 80 + i * 38 : 60 + i * 12} fill={D.teal} stroke={D.ink} strokeWidth={3.5} style={{ transition: "y .5s, height .5s" }} />
        ))}
        <path d="M360 330 H396 L390 300 H366 Z" fill={D.accent} stroke={D.ink} strokeWidth={3.5} strokeLinejoin="round" />
        <g style={{ transformBox: "fill-box", transformOrigin: "50% 100%", transform: `rotate(${step === 1 ? 50 : 0}deg)`, transition: "transform .6s ease" }}>
          <path d="M378 300 V256" {...LINE} stroke={D.leaf} strokeWidth={5} />
          <path d="M378 262 c -16 -4 -20 -22 -8 -30 c 12 6 14 22 8 30 Z" fill={D.leaf} stroke={D.ink} strokeWidth={3} />
        </g>
      </Lit>

      {/* Variety mismatch: more shapes than slots. */}
      <Lit on={step === 2} off={0.35}>
        <Lamp x={470} />
        <rect x={450} y={170} width={150} height={70} fill={D.shirt} stroke={D.ink} strokeWidth={4.5} />
        <circle cx={490} cy={205} r={16} fill={D.ink} />
        <rect x={536} y={190} width={32} height={30} fill={D.ink} />
        <path d="M446 276 V330 H604 V276" {...LINE} strokeWidth={4.5} />
        {[
          "M470 320 l 14 -26 l 14 26 Z",
          "M510 322 l 8 -18 l 16 -4 l 6 16 l -12 10 Z",
          "M556 320 q 4 -28 22 -20 q 14 10 -4 22 Z",
        ].map((d, i) => (
          <At key={i} y={step === 2 ? 0 : -70} o={step === 2 ? 1 : 0} delay={i * 0.1}>
            <path d={d} fill={D.accent} stroke={D.ink} strokeWidth={3.5} strokeLinejoin="round" />
          </At>
        ))}
      </Lit>

      {mono(320, 398, ["THE WORLD MOVED", "THE NUMBER IMPROVED", "MORE CASES THAN RESPONSES"][Math.min(step, 2)], 18, D.accent)}
    </Plate>
  );
}
