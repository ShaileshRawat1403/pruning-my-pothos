import React from "react";
import { D, LINE, Head, SleepyEye } from "../deadpan";
import { Lit, Page, Plate, SceneProps, hand, mono } from "./kit";

/**
 * Four ways to check one output, then the judgment they all stand in for.
 * A solid line is direct support, a dashed one partial: the visual's own
 * strengths. Last, the question none of them answers.
 */
const SPOT = [
  { x: 118, y: 150 },
  { x: 118, y: 292 },
  { x: 522, y: 292 },
  { x: 522, y: 150 },
];

export default function Scene({ step, steps, id }: SceneProps) {
  const supports = steps.filter((s) => s.id !== "judgment" && s.id !== "gap");
  const n = supports.length;
  const judged = step >= n;
  const gap = step > n;

  const tools = [
    // Assertions: a ruler. Exact, and only about what it can measure.
    <g key="a">
      <rect x={-52} y={-12} width={104} height={24} fill="#F6E7A8" stroke={D.ink} strokeWidth={4} />
      {[-36, -18, 0, 18, 36].map((t) => (
        <path key={t} d={`M${t} -12 V${t % 36 === 0 ? 2 : -3}`} stroke={D.ink} strokeWidth={3} />
      ))}
    </g>,
    // Heuristics: a magnet. It picks up what looks right.
    <g key="h">
      <path d="M-30 -22 H-6 V6 A 6 6 0 0 0 6 6 V-22 H30 V6 A 30 30 0 0 1 -30 6 Z" fill={D.accent} stroke={D.ink} strokeWidth={4} strokeLinejoin="round" />
      <path d="M-30 -8 H-6 M6 -8 H30" stroke={D.ink} strokeWidth={4} />
    </g>,
    // A model-based grader: another of the same kind of thing.
    <g key="g">
      <Page w={56} h={64} lines={0} />
      <SleepyEye x={-10} y={-6} r={8} look={-1} />
      <SleepyEye x={12} y={-6} r={8} look={-1} />
      <path d="M-8 16 H10" {...LINE} strokeWidth={3.5} />
    </g>,
    // A person, reading. The expensive one.
    <g key="p">
      <Head x={0} y={0} r={32} eyes="sleepy" look={-1} hair="sides" />
    </g>,
  ];

  return (
    <Plate id={id}>
      {/* The expectation, written down before the run. */}
      <Lit on={judged} off={0.35}>
        <rect x={236} y={26} width={168} height={52} fill="#fff" stroke={D.ink} strokeWidth={4} />
        <circle cx={320} cy={26} r={7} fill={D.accent} stroke={D.ink} strokeWidth={3} />
        {mono(320, 60, "EXPECTED", 19)}
        <path d="M320 78 V160" stroke={D.ink} strokeWidth={4} strokeLinecap="round" style={{ opacity: judged ? 1 : 0, transition: "opacity .3s" }} />
      </Lit>
      <g style={{ opacity: gap ? 1 : 0, transition: "opacity .3s" }}>{hand(430, 66, "the right one?", 28, D.accent, "start")}</g>

      {/* The output under test. */}
      <g transform="translate(320 222)">
        <Page w={84} h={112} lines={7} />
      </g>
      {mono(320, 306, "OUTPUT", 18, D.greyLight)}

      {supports.map((s, i) => {
        const spot = SPOT[i % SPOT.length];
        const shown = step >= i;
        const partial = s.tag === "partial";
        const toX = spot.x < 320 ? 276 : 364;
        return (
          <Lit key={s.id} on={step === i} off={shown ? 0.55 : 0.14}>
            <path
              d={`M${spot.x + (spot.x < 320 ? 58 : -58)} ${spot.y} L${toX} ${222 + (spot.y < 222 ? -20 : 20)}`}
              stroke={D.ink}
              strokeWidth={4}
              strokeLinecap="round"
              strokeDasharray={partial ? "4 10" : undefined}
              style={{ opacity: shown ? 1 : 0, transition: "opacity .3s" }}
            />
            <g transform={`translate(${spot.x} ${spot.y})`}>{tools[i % tools.length]}</g>
            {mono(spot.x, spot.y + 58, (s.tag ?? "").toUpperCase(), 18, partial ? D.greyLight : D.teal)}
          </Lit>
        );
      })}

      {mono(320, 396, gap ? "NONE OF THEM SAYS" : judged ? "WHAT THEY ALL STAND IN FOR" : ["EXACT, CHEAP, NARROW", "NO ACCESS TO MEANING", "THE SAME KIND OF THING", "THE EXPENSIVE ONE"][Math.min(step, 3)], 18, D.accent)}
    </Plate>
  );
}
