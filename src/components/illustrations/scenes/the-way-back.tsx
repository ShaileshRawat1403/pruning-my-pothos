import React from "react";
import { D, Head, Torso } from "../deadpan";
import { Lit, Plate, SceneProps, Show, hand, mono } from "./kit";

/**
 * The way back. A tool's raw output arrives as a long printout heading for the
 * model's mouth. Four steps whittle it: cut to the needed fields, black bars
 * over what should not travel, scissors at a length limit, and finally a
 * single summary note. The model receives the note.
 */
const SAYS = ["only what's needed.", "some of that stays here.", "that's long enough.", "a note will do."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 3);
  const lines = 9;
  const shown = s >= 2 ? 5 : lines;
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* The printout, whittled. */}
      <Lit on={s < 3} off={0.25}>
        <rect x={60} y={50} width={240} height={30 + shown * 30} fill="#fff" stroke={D.ink} strokeWidth={4} style={{ transition: "height .5s" }} />
        {mono(180, 72, "TOOL OUTPUT", 18)}
        {Array.from({ length: shown }, (_, i) => {
          const needed = i === 1 || i === 3 || i === 4;
          const secret = i === 3;
          return (
            <g key={i} style={{ opacity: s >= 0 && !needed ? 0.2 : 1, transition: "opacity .4s" }}>
              <path d={`M80 ${100 + i * 30} H${280 - (i % 3) * 30}`} stroke={needed ? D.ink : D.greyLight} strokeWidth={4} strokeLinecap="round" />
              {secret && <rect x={150} y={88 + i * 30} width={110} height={22} fill={D.ink} style={{ opacity: s >= 1 ? 1 : 0, transition: "opacity .3s" }} />}
            </g>
          );
        })}
        <Show on={s === 2}>
          <path d={`M50 ${84 + shown * 30} H310`} stroke={D.accent} strokeWidth={3} strokeDasharray="8 6" />
          {mono(330, 90 + shown * 30, "✂", 24, D.accent, "start")}
        </Show>
      </Lit>

      {/* The summary note. */}
      <Show on={s === 3}>
        <g transform="rotate(-4 400 160)">
          <rect x={340} y={120} width={140} height={80} fill="#F6E7A8" stroke={D.ink} strokeWidth={3.5} />
          {mono(410, 152, "SUMMARY", 18)}
          <path d="M356 172 H464 M356 186 H440" stroke={D.greyLight} strokeWidth={3} strokeLinecap="round" />
        </g>
      </Show>

      {/* The model, waiting to be fed. */}
      <Torso x={560} y={236} w={90} h={136} fill={D.teal} />
      <Head x={560} y={190} r={38} eyes="sleepy" look={-1} mouth={s === 3 ? "flat" : "o"} hair="curly" />
      {mono(560, 136, "MODEL", 18)}

      {SAYS.map((t, i) => (
        <Show key={t} on={s === i}>
          {hand(450, 70, t, 26, i === 3 ? D.accent : D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["ONLY THE FIELDS THE TASK NEEDS", "REDACT WHAT SHOULD NOT TRAVEL", "BOUND THE SIZE", "SUMMARISE, DON'T FORWARD RAW TRACES"][s], 18, D.accent)}
    </Plate>
  );
}
