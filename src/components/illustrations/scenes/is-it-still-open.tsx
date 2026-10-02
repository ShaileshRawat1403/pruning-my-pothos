import React from "react";
import { D, Head, Torso, Limb } from "../deadpan";
import { At, Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * Is it still open? A reviewer, a big APPROVE button, and the envelope it is
 * about. While the envelope sits on the desk, pressing the button decides.
 * Then the envelope is already gone through the window, and the button is
 * pressed anyway. Last, someone tapes the honest word over it: FYI.
 */
const SAYS = ["undecided. press away.", "approved. retroactively.", "renamed, honestly."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 2);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* The window, and the world outside it. */}
      <rect x={430} y={50} width={170} height={150} fill="#DCE8E3" stroke={D.ink} strokeWidth={5} />
      <path d="M515 50 V200 M430 125 H600" stroke={D.ink} strokeWidth={4} />

      {/* The desk. */}
      <rect x={60} y={270} width={420} height={18} fill={D.paperDeep} stroke={D.ink} strokeWidth={4.5} />
      <path d="M76 288 V372 M464 288 V372" stroke={D.ink} strokeWidth={6} strokeLinecap="round" />

      {/* The envelope: on the desk, then gone. */}
      <At x={s >= 1 ? 140 : 0} y={s >= 1 ? -150 : 0} r={s >= 1 ? -20 : 0} s={s >= 1 ? 0.6 : 1} o={s >= 1 ? 0.8 : 1}>
        <rect x={360} y={224} width={110} height={46} fill="#fff" stroke={D.ink} strokeWidth={3.5} />
        <path d="M360 224 L415 252 L470 224" fill="none" stroke={D.ink} strokeWidth={3} />
      </At>
      <Show on={s >= 1}>
        <g transform="rotate(-6 560 230)">
          <rect x={516} y={212} width={90} height={34} fill="#fff" stroke={D.accent} strokeWidth={3.5} />
          {mono(561, 236, "SENT", 20, D.accent)}
        </g>
      </Show>
      <Lit on={s === 0} off={0.4}>
        {mono(415, 214, "STILL OPEN", 18, D.teal)}
      </Lit>

      {/* The button, pressed either way. */}
      <rect x={226} y={238} width={120} height={32} rx={6} fill={D.ink} />
      <rect x={232} y={226 + (s === 1 ? 6 : 0)} width={108} height={30} rx={6} fill={s === 2 ? "#F6E7A8" : D.leaf} stroke={D.ink} strokeWidth={3.5} style={{ transition: "y .15s" }} />
      {mono(286, 247 + (s === 1 ? 6 : 0), s === 2 ? "FYI" : "APPROVE", 18, s === 2 ? D.ink : "#fff")}

      {/* The reviewer. */}
      <Torso x={150} y={150} w={90} h={120} fill={D.grey} />
      <Head x={150} y={104} r={36} eyes={s === 1 ? "tt" : "sleepy"} look={s === 1 ? 1 : 0.3} mouth="flat" stubble hair="sides" />
      <Limb d={`M190 190 C 230 196, 260 ${206 + (s === 1 ? 6 : 0)}, 270 ${224 + (s === 1 ? 6 : 0)}`} fill={D.grey} w={13} />

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(270, 56, t, 28, i === 1 ? D.accent : D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["A DECISION", "MONITORING, AUDIT, CORRECTION", "AFTER THE FACT IS NOT APPROVAL"][s], 18, D.accent)}
    </Plate>
  );
}
