import React from "react";
import { D, Head, Torso } from "../illustrations/deadpan";
import { Stamp } from "../illustrations/props";
import { Lit, Plate, SceneProps, Show, Tick, hand, mono } from "../illustrations/scenes/kit";

/**
 * LanguageOps' refinement loop as a scroll scene. Left: an illustrative
 * draft. The detector rings the patterns, the facts and the closing line are
 * boxed as things that must survive, a rewrite appears on the right, the
 * checks tick, and on the last step one check fails and the sheet goes to a
 * person. The draft is made up; the steps are the project's README.
 */
const DRAFT = ["Moreover, we delve", "into a rich tapestry", "of results.", "Revenue rose 12%.", "Ship it."];
const REWRITE = ["We read the", "results closely.", "Revenue rose 12%.", "Ship it."];
const CHECKS = ["12% kept", "patterns gone", "close kept"];

/** A cross, the failed counterpart of Tick. */
function Cross({ x, y, on }: { x: number; y: number; on: boolean }) {
  return (
    <path
      d={`M${x - 9} ${y - 9} L${x + 9} ${y + 9} M${x + 9} ${y - 9} L${x - 9} ${y + 9}`}
      stroke={D.accent}
      strokeWidth={5}
      strokeLinecap="round"
      style={{ opacity: on ? 1 : 0, transition: "opacity .3s" }}
    />
  );
}

export default function RefineScene({ step, id }: SceneProps) {
  const s = Math.min(step, 4);
  return (
    <Plate id={id}>
      <path d="M20 392 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* The draft. */}
      <Lit on={s <= 1} off={0.45}>
        <rect x={30} y={70} width={260} height={290} fill="#fff" stroke={D.ink} strokeWidth={5} />
        {mono(160, 100, "DRAFT", 18, D.greyLight)}
        {DRAFT.map((t, i) => hand(50, 148 + i * 44, t, 24, D.ink, "start"))}
      </Lit>

      {/* Step 1: the patterns, found by rule. */}
      <Show on={s >= 0}>
        <rect x={42} y={124} width={96} height={34} rx={14} fill="none" stroke={D.accent} strokeWidth={4} />
        <rect x={156} y={124} width={52} height={34} rx={14} fill="none" stroke={D.accent} strokeWidth={4} />
        <rect x={136} y={168} width={82} height={34} rx={14} fill="none" stroke={D.accent} strokeWidth={4} />
      </Show>

      {/* Step 2: what must survive. */}
      <Show on={s >= 1}>
        <rect x={42} y={256} width={166} height={36} fill="none" stroke={D.leaf} strokeWidth={4} strokeDasharray="8 6" />
        <rect x={42} y={300} width={76} height={36} fill="none" stroke={D.leaf} strokeWidth={4} strokeDasharray="8 6" />
        {mono(170, 330, "KEEP", 18, D.leaf)}
      </Show>

      {/* Step 3: the rewrite. */}
      <Show on={s >= 2}>
        <path d="M296 210 H342" stroke={D.ink} strokeWidth={4} strokeLinecap="round" />
        <path d="M332 200 L344 210 L332 220" fill="none" stroke={D.ink} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
        <rect x={350} y={70} width={260} height={200} fill="#fff" stroke={D.ink} strokeWidth={5} />
        {mono(480, 100, "REWRITE", 18, D.greyLight)}
        {REWRITE.map((t, i) => hand(370, 142 + i * 36, t, 24, D.ink, "start"))}
      </Show>

      {/* Steps 4 and 5: the checks. */}
      <Show on={s >= 3}>
        {CHECKS.map((t, i) => (
          <g key={t}>
            {hand(400, 304 + i * 30, t, 22, D.ink, "start")}
            <Tick x={378} y={300 + i * 30} on={!(s === 4 && i === 0)} />
            <Cross x={378} y={298 + i * 30} on={s === 4 && i === 0} />
          </g>
        ))}
      </Show>
      <Show on={s === 4}>
        <Stamp x={440} y={214} text="TO REVIEW" w={170} size={20} rotate={-9} color={D.accent} />
        <Torso x={580} y={370} w={46} h={22} fill={D.grey} />
        <Head x={580} y={348} r={20} eyes="sleepy" look={-1} mouth="flat" hair="sides" />
      </Show>

      {hand(320, 42, ["found by rule", "what must survive", "rewritten to a brief", "then checked", "one retry, then a person"][s], 26, s === 4 ? D.accent : D.grey)}
    </Plate>
  );
}
