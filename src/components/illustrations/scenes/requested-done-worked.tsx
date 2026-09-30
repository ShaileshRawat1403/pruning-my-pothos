import React from "react";
import { D, LINE, Head } from "../deadpan";
import { Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * Requested, done, and worked. The button from the cover. Pressing it sends a
 * request; the screen saying so is a message; the clerk behind the wall is
 * where it actually runs; and whether it was the right thing is nobody's
 * stamp at all.
 */
export default function Scene({ step, id }: SceneProps) {
  return (
    <Plate id={id}>
      <path d="M20 366 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* The control. */}
      <Lit on={step === 0} off={0.5}>
        <rect x={60} y={270} width={120} height={96} fill={D.shirt} stroke={D.ink} strokeWidth={4.5} />
        <ellipse cx={120} cy={264} rx={76} ry={20} fill={D.ink} />
        <ellipse cx={120} cy={step === 0 ? 258 : 252} rx={68} ry={20} fill={D.accent} stroke={D.ink} strokeWidth={4.5} style={{ transition: "cy .2s" }} />
        <path d="M90 236 l -10 -12 M150 234 l 10 -12 M120 228 V212" stroke={D.accent} strokeWidth={4} strokeLinecap="round" style={{ opacity: step === 0 ? 1 : 0, transition: "opacity .2s" }} />
      </Lit>

      {/* What the screen says. */}
      <Lit on={step === 1} off={step < 1 ? 0 : 0.5}>
        <rect x={214} y={96} width={180} height={116} rx={8} fill="#fff" stroke={D.ink} strokeWidth={4.5} />
        <path d="M284 212 V236 M252 238 H316" {...LINE} strokeWidth={5} />
        {mono(304, 150, "CONFIRMED", 19, D.leaf)}
        <path d="M236 172 H372" stroke={D.greyLight} strokeWidth={4} strokeLinecap="round" />
      </Lit>

      {/* Where it actually runs. */}
      <Lit on={step === 2} off={0.45}>
        <rect x={440} y={60} width={180} height={306} fill="#C9B593" stroke={D.ink} strokeWidth={4.5} />
        <rect x={472} y={120} width={116} height={96} fill={D.face} stroke={D.ink} strokeWidth={4.5} />
        <Head x={530} y={180} r={34} eyes="tt" mouth="flat" stubble hair="messy" ears={false} />
        <rect x={476} y={244} width={108} height={34} rx={3} fill="#fff" stroke={D.ink} strokeWidth={3.5} />
        {mono(530, 268, step === 2 ? "RAN" : "PENDING", 18, step === 2 ? D.ink : D.accent)}
      </Lit>

      <Show on={step === 2}>{hand(304, 62, "and was it the right one?", 28, D.accent)}</Show>
      {mono(320, 398, ["A REQUEST WAS SENT", "A MESSAGE WAS SHOWN", "AN OPERATION RAN"][Math.min(step, 2)], 18, D.accent)}
    </Plate>
  );
}
