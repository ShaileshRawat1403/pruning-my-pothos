import React from "react";
import { D, DeadpanDefs, Paper, Ink, Label, Head, Torso } from "../illustrations/deadpan";

/**
 * LanguageOps hero plate. A draft on the desk; three stock phrases get the
 * Pruning Mark, one after another, while the number in it is ringed as
 * something to keep. The editor beside it does not look up.
 *
 * The markup is the settled frame. The strikes draw in once with CSS
 * (.lo-strike in languageops.css); reduced motion and print show them drawn.
 */
const W = 360;
const H = 320;

const LINES = [
  { y: 96, text: "Moreover, in today's" },
  { y: 130, text: "landscape, we delve" },
  { y: 164, text: "into a tapestry of" },
  { y: 198, text: "growth: up 12% in Q3." },
];

const STRIKES = [
  { d: "M56 90 H129", delay: 0.4 },
  { d: "M155 124 H192", delay: 0.9 },
  { d: "M103 158 H165", delay: 1.4 },
];

export default function LanguageOpsHero() {
  return (
    <figure className="dax-hero-plate m-0 w-full max-w-[360px] ml-auto">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        height="auto"
        className="ill-svg"
        role="img"
        aria-label="A draft on a desk. The phrases moreover, delve and tapestry are struck through one after another; the figure 12% is ringed to be kept. An editor beside it does not look up. Caption: the habits go, the facts stay."
      >
        <DeadpanDefs id="loh" />
        <Paper id="loh" w={W} h={H} />
        <Ink id="loh">
          <g transform="rotate(-2 150 150)">
            <rect x={40} y={50} width={240} height={190} fill="#fff" stroke={D.ink} strokeWidth={4} />
            {LINES.map((l) => (
              <text key={l.y} x={56} y={l.y} className="ill-hand" fontSize={20} fontWeight={700} fill={D.ink}>
                {l.text}
              </text>
            ))}
            {STRIKES.map((s) => (
              <path
                key={s.d}
                className="lo-strike"
                style={{ animationDelay: `${s.delay}s` }}
                d={s.d}
                stroke={D.accent}
                strokeWidth={5}
                strokeLinecap="round"
                pathLength={1}
              />
            ))}
            <ellipse className="lo-keep" cx={152} cy={192} rx={26} ry={18} fill="none" stroke={D.leaf} strokeWidth={4} />
          </g>
          <Torso x={312} y={278} w={52} h={40} fill={D.grey} />
          <Head x={312} y={254} r={22} eyes="sleepy" look={-1} mouth="flat" stubble hair="sides" />
          <Label x={160} y={292} text="the habits go, the facts stay" size={12} color={D.grey} r={-1} />
        </Ink>
      </svg>
    </figure>
  );
}
