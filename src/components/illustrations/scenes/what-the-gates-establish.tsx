import React from "react";
import { D, Head, Torso } from "../deadpan";
import { Lit, Plate, SceneProps, Show, Tick, hand, mono } from "./kit";

/**
 * What the gates establish. This repository's publishing gate, drawn as a
 * turnstile a draft goes through. Its four rows light in turn: checked before
 * placement (a tick), restored on failure (two files rewound), whether the
 * writing is good (a question mark), who judged it (an empty chair). Then the
 * claim, stamped; then the plain reading of what it shows.
 */
const ROWS = ["CHECKED BEFORE PLACEMENT", "RESTORES 2 FILES ON FAIL", "WRITING GOOD? SOURCES?", "WHO JUDGED IT?"];
const MARK = ["direct", "partial", "absent", "absent"];
const SAYS = ["it checks.", "it rewinds two files.", "it doesn't read.", "nobody signed.", "", "implemented. that's what it shows."];

export default function Scene({ step, id }: SceneProps) {
  const s = Math.min(step, 5);
  return (
    <Plate id={id}>
      <path d="M20 372 H620" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />

      {/* The gate. */}
      <rect x={60} y={150} width={24} height={222} fill={D.grey} stroke={D.ink} strokeWidth={4} />
      <rect x={196} y={150} width={24} height={222} fill={D.grey} stroke={D.ink} strokeWidth={4} />
      <path d="M84 250 H196" stroke={D.ink} strokeWidth={8} strokeLinecap="round" />
      <g transform="translate(140 230)">
        <rect x={-36} y={-46} width={72} height={88} fill="#fff" stroke={D.ink} strokeWidth={3.5} />
        {mono(0, -22, "DRAFT", 18)}
        <path d="M-22 -4 H22 M-22 10 H16 M-22 24 H22" stroke={D.greyLight} strokeWidth={3} strokeLinecap="round" />
      </g>
      {mono(140, 136, "GATE", 20)}

      {/* The four rows, each with what it shows. */}
      {ROWS.map((r, i) => {
        const y = 100 + i * 52;
        const absent = MARK[i] === "absent";
        return (
          <Lit key={r} on={s === i} off={s > i || s >= 4 ? 0.7 : 0.15}>
            <rect x={270} y={y - 26} width={350} height={40} rx={3} fill={absent ? "#fff" : "#F6E7A8"} stroke={D.ink} strokeWidth={3} strokeDasharray={absent ? "6 5" : undefined} />
            {mono(284, y, r, 18, absent ? D.accent : D.ink, "start")}
            {i === 0 && <Tick x={600} y={y - 6} on={s >= 0} />}
            {i === 1 && mono(600, y, "↺", 22, D.teal)}
            {absent && mono(600, y, "?", 22, D.accent)}
          </Lit>
        );
      })}

      {/* The empty chair, for the row nobody fills. */}
      <Lit on={s === 3} off={0.3}>
        <path d="M520 330 V372 M568 330 V372 M514 330 H574 M520 330 V290 H568 V330" fill="none" stroke={D.ink} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
      </Lit>

      <Show on={s >= 4}>
        <g transform="rotate(-8 140 70)">
          <rect x={70} y={48} width={140} height={44} fill="#fff" stroke={D.accent} strokeWidth={4} />
          {mono(140, 78, "ENOUGH?", 22, D.accent)}
        </g>
      </Show>

      <Torso x={420} y={320} w={56} h={52} fill={D.teal} />
      <Head x={420} y={300} r={22} eyes={s >= 2 ? "tt" : "sleepy"} look={-1} mouth="flat" hair="curly" />

      {SAYS.map((t, i) => (
        <Show key={i} on={s === i && t !== ""}>
          {hand(440, 40, t, 26, i === 5 ? D.teal : D.greyLight)}
        </Show>
      ))}
      {mono(320, 404, ["SHOWS DIRECTLY", "SHOWS IN PART", "DOES NOT SHOW", "DOES NOT SHOW", "THE CLAIM", "A SEPARATE JUDGMENT"][s], 18, D.accent)}
    </Plate>
  );
}
