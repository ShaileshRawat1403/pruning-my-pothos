import React from "react";

/**
 * deadpan.tsx: the second drawing register, "deadpan". Proposed, under review
 * at /style-sheet/.
 *
 * What it is: characters who have seen through the hype and are unimpressed,
 * drawn in a thick, slightly wobbly ink on aged paper. Wrong proportions tell
 * you who someone is before the caption does. Every drawing carries one
 * caption: a visual pun, often alliterative, that turns the article's point.
 *
 * Rules (see docs/STYLE_REFERENCES.md and the style sheet):
 * - Deadpan faces: half-lidded, flat mouths, side-eye. The joke is how little
 *   they react.
 * - One exaggeration per figure (tiny head, saucer eyes, pencil neck).
 * - Mix people and objects as the topic needs.
 * - Dark and sarcastic is fine. No sexual humour.
 * - The drawing never claims more than its article.
 */

export const D = {
  paper: "#EFE5CF",
  paperDeep: "#E4D6B8",
  ink: "#1B1A17",
  face: "#FBF5E8",
  grey: "#4B4A46",
  greyLight: "#9A968C",
  shirt: "#EDE7DA",
  accent: "#C0663C",
  teal: "#2A6F7F",
  leaf: "#6FA38F",
} as const;

export const LINE = {
  fill: "none",
  stroke: D.ink,
  strokeWidth: 5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/**
 * Shared defs for one drawing: the ink wobble (optionally "boiling", the
 * hand-drawn jitter of animated line work), paper grain, and scribble hatch.
 * Ids are prefixed so several drawings can share a page.
 */
export function DeadpanDefs({ id, boil = false }: { id: string; boil?: boolean }) {
  return (
    <defs>
      <filter id={`${id}-ink`} x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves={2} seed={4} result="n">
          {boil && <animate attributeName="baseFrequency" values="0.028;0.033;0.03" dur="0.3s" calcMode="discrete" repeatCount="indefinite" />}
        </feTurbulence>
        <feDisplacementMap in="SourceGraphic" in2="n" scale={3.4} xChannelSelector="R" yChannelSelector="G" />
      </filter>
      <filter id={`${id}-grain`}>
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={3} stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.09" />
        </feComponentTransfer>
      </filter>
      <radialGradient id={`${id}-vignette`} cx="50%" cy="45%" r="75%">
        <stop offset="60%" stopColor={D.paperDeep} stopOpacity={0} />
        <stop offset="100%" stopColor="#B9A67E" stopOpacity={0.45} />
      </radialGradient>
      <pattern id={`${id}-hatch`} width={9} height={9} patternUnits="userSpaceOnUse" patternTransform="rotate(38)">
        <line x1={0} y1={0} x2={0} y2={9} stroke={D.ink} strokeWidth={1.8} opacity={0.5} />
      </pattern>
    </defs>
  );
}

/** Aged paper: base, grain and a soft vignette. */
export function Paper({ id, w, h }: { id: string; w: number; h: number }) {
  return (
    <g>
      <rect width={w} height={h} fill={D.paper} />
      <rect width={w} height={h} filter={`url(#${id}-grain)`} />
      <rect width={w} height={h} fill={`url(#${id}-vignette)`} />
    </g>
  );
}

/** Wraps line work in the ink wobble. */
export function Ink({ id, children }: { id: string; children: React.ReactNode }) {
  return <g filter={`url(#${id}-ink)`}>{children}</g>;
}

/** A half-lidded eye: flat lid, lower half, pupil sunk to the bottom. */
export function SleepyEye({ x, y, r = 14, look = 0 }: { x: number; y: number; r?: number; look?: number }) {
  return (
    <g>
      <path d={`M${x - r} ${y} A ${r} ${r} 0 0 0 ${x + r} ${y} Z`} fill="#fff" stroke={D.ink} strokeWidth={3.5} strokeLinejoin="round" />
      <path d={`M${x - r - 3} ${y} H${x + r + 3}`} {...LINE} strokeWidth={5} />
      <circle cx={x + look * r * 0.5} cy={y + r * 0.45} r={r * 0.3} fill={D.ink} />
    </g>
  );
}

/** A saucer eye: all white, a small pupil, wherever it has decided to look. */
export function SaucerEye({ x, y, r = 24, px = 0, py = 0 }: { x: number; y: number; r?: number; px?: number; py?: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill="#fff" stroke={D.ink} strokeWidth={4} />
      <circle cx={x + px} cy={y + py} r={r * 0.18} fill={D.ink} />
    </g>
  );
}

/** Stubble: a scatter of short dashes. */
export function Stubble({ x, y, w, h, n = 14 }: { x: number; y: number; w: number; h: number; n?: number }) {
  const marks = Array.from({ length: n }, (_, i) => {
    const a = ((i * 37) % 100) / 100;
    const b = ((i * 61) % 100) / 100;
    return [x + a * w, y + b * h] as const;
  });
  return (
    <g stroke={D.ink} strokeWidth={2} strokeLinecap="round" opacity={0.7}>
      {marks.map(([mx, my], i) => (
        <path key={i} d={`M${mx} ${my} l1.5 3`} />
      ))}
    </g>
  );
}

/** An outlined limb: a thick ink stroke with a lighter core, along any path. */
export function Limb({ d, fill = D.face, w = 16 }: { d: string; fill?: string; w?: number }) {
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} stroke={D.ink} strokeWidth={w + 8} />
      <path d={d} stroke={fill} strokeWidth={w} />
    </g>
  );
}

/** The caption under every drawing: the pun, then the dry second line. */
export function Caption({ x, y, title, sub, w }: { x: number; y: number; title: string; sub?: string; w: number }) {
  // A sub line longer than the plate allows breaks after its middle sentence.
  const fits = !sub || sub.length * 11 < w - 24;
  const parts = sub && !fits ? sub.split(/(?<=\.)\s+/) : [];
  const mid = Math.ceil(parts.length / 2);
  const lines = sub ? (fits ? [sub] : [parts.slice(0, mid).join(" "), parts.slice(mid).join(" ")]) : [];
  return (
    <g>
      <text x={x + w / 2} y={y} textAnchor="middle" className="ill-hand" fontSize={36} fontWeight={700} fill={D.ink}>
        {title}
      </text>
      {lines.map((l, i) => (
        <text key={i} x={x + w / 2} y={y + 32 + i * 26} textAnchor="middle" className="ill-hand" fontSize={24} fontWeight={700} fill={D.accent}>
          {l}
        </text>
      ))}
    </g>
  );
}

/* ── The cast ───────────────────────────────────────────────────────────
   Each figure draws in a local 360 x 470 box, standing on y ~ 460. */

/** The Engineer: saucer eyes, satellite ears, pencil neck, one more coffee. */
export function Engineer() {
  return (
    <g>
      <ellipse cx={92} cy={150} rx={30} ry={38} fill={D.face} stroke={D.ink} strokeWidth={5} />
      <ellipse cx={268} cy={150} rx={30} ry={38} fill={D.face} stroke={D.ink} strokeWidth={5} />
      <path d="M86 132 C 78 146, 82 164, 94 170 M274 132 C 282 146, 278 164, 266 170" {...LINE} strokeWidth={3} />
      <path d="M104 96 C104 52 140 42 180 42 C220 42 256 52 256 96 L258 186 C258 226 222 238 180 238 C138 238 102 226 102 186 Z" fill={D.face} stroke={D.ink} strokeWidth={5} />
      <path
        d="M108 74 c 2 -16 18 -18 22 -4 c 2 -16 20 -16 22 0 c 4 -16 20 -14 22 0 c 4 -16 20 -14 22 0 c 4 -14 18 -12 20 4 c 6 -12 18 -6 16 8"
        fill="none"
        stroke={D.ink}
        strokeWidth={5}
        strokeLinecap="round"
      />
      <path d="M130 90 L168 84 M194 82 L230 90" {...LINE} strokeWidth={7} />
      <SaucerEye x={152} y={128} r={26} px={4} py={6} />
      <SaucerEye x={210} y={128} r={26} px={-5} py={-3} />
      <path d="M130 158 q 22 9 44 0 M188 158 q 22 9 44 0" fill="none" stroke={D.greyLight} strokeWidth={3} strokeLinecap="round" />
      <path d="M180 150 q 7 8 0 13" {...LINE} strokeWidth={3} />
      <path d="M168 196 H192" {...LINE} strokeWidth={4} />
      <Stubble x={162} y={206} w={36} h={20} n={12} />
      <rect x={172} y={236} width={16} height={64} fill={D.face} stroke={D.ink} strokeWidth={4.5} />
      <path d="M96 470 L100 332 C104 306 140 298 180 298 C220 298 256 306 260 332 L264 470 Z" fill={D.grey} stroke={D.ink} strokeWidth={5} strokeLinejoin="round" />
      <path d="M160 300 Q180 318 200 300" fill="none" stroke={D.ink} strokeWidth={4} />
      <Limb d="M250 338 C 272 392, 254 420, 222 414" />
      <rect x={188} y={372} width={58} height={62} rx={6} fill="#fff" stroke={D.ink} strokeWidth={4.5} />
      <path d="M246 388 c 16 0 16 28 0 28" fill="none" stroke={D.ink} strokeWidth={4.5} />
      <text x={217} y={400} textAnchor="middle" className="ill-mono" fontSize={12} fontWeight={700} fill={D.ink}>FINAL</text>
      <text x={217} y={418} textAnchor="middle" className="ill-mono" fontSize={12} fontWeight={700} fill={D.accent}>_v7</text>
      <path d="M204 364 q -6 -10 0 -18 M222 362 q -6 -10 0 -18" fill="none" stroke={D.greyLight} strokeWidth={3} strokeLinecap="round" />
    </g>
  );
}

/** The Executive: a tiny head on a vast shirt. Strategy, approved. */
export function Executive() {
  return (
    <g>
      <rect x={136} y={356} width={30} height={100} fill={D.grey} stroke={D.ink} strokeWidth={4.5} />
      <rect x={194} y={356} width={30} height={100} fill={D.grey} stroke={D.ink} strokeWidth={4.5} />
      <ellipse cx={146} cy={460} rx={26} ry={10} fill={D.ink} />
      <ellipse cx={214} cy={460} rx={26} ry={10} fill={D.ink} />
      <Limb d="M78 196 C 60 240, 58 280, 66 316" fill={D.shirt} />
      <path d="M70 176 C 70 134 110 120 180 120 C 250 120 290 134 290 176 L 300 296 C 304 346 262 368 180 368 C 98 368 56 346 60 296 Z" fill={D.shirt} stroke={D.ink} strokeWidth={5} strokeLinejoin="round" />
      <path d="M150 286 q 30 16 60 0" fill="none" stroke={D.ink} strokeWidth={3} strokeLinecap="round" opacity={0.6} />
      <path d="M62 330 Q180 356 298 330 L300 352 Q180 380 60 352 Z" fill={D.ink} />
      <rect x={168} y={344} width={26} height={12} rx={2} fill={D.accent} />
      <path d="M170 124 L190 124 L186 146 L198 240 L180 262 L162 240 L174 146 Z" fill={D.accent} stroke={D.ink} strokeWidth={4} strokeLinejoin="round" />
      <path d="M160 122 L180 140 L200 122" fill="none" stroke={D.ink} strokeWidth={4} strokeLinejoin="round" />
      <path d="M150 74 c -12 4 -16 26 -6 36 M210 74 c 12 4 16 26 6 36" fill={D.greyLight} stroke={D.ink} strokeWidth={4} />
      <ellipse cx={180} cy={92} rx={24} ry={30} fill={D.face} stroke={D.ink} strokeWidth={4.5} />
      <path d="M168 88 H176 M186 88 H194" {...LINE} strokeWidth={4} />
      <circle cx={172} cy={92} r={2.5} fill={D.ink} />
      <circle cx={190} cy={92} r={2.5} fill={D.ink} />
      <path d="M170 106 q 10 -6 20 0 q -10 6 -20 0 Z" fill={D.grey} stroke={D.ink} strokeWidth={2.5} />
      <Limb d="M282 196 C 300 220, 300 250, 288 268" fill={D.shirt} />
      <g transform="rotate(5 290 250)">
        <rect x={226} y={206} width={124} height={92} rx={4} fill="#fff" stroke={D.ink} strokeWidth={4.5} />
        <text x={288} y={236} textAnchor="middle" className="ill-mono" fontSize={13} fontWeight={700} fill={D.ink}>AI STRATEGY:</text>
        <text x={288} y={278} textAnchor="middle" className="ill-hand" fontSize={34} fontWeight={700} fill={D.accent}>yes.</text>
      </g>
    </g>
  );
}

/** The Clerk: visor, T-T eyes, a stamp already on its way down. */
export function Clerk() {
  return (
    <g>
      <Limb d="M258 318 C 290 280, 300 220, 292 170" fill={D.shirt} />
      <g transform="rotate(-14 296 150)">
        <rect x={286} y={96} width={18} height={46} rx={7} fill={D.accent} stroke={D.ink} strokeWidth={4} />
        <rect x={262} y={140} width={66} height={24} rx={4} fill={D.ink} />
        <text x={295} y={157} textAnchor="middle" className="ill-mono" fontSize={9} fontWeight={700} fill={D.paper}>APPROVED</text>
      </g>
      <path d="M92 470 L96 338 C100 312 138 304 180 304 C222 304 260 312 264 338 L268 470 Z" fill={D.shirt} stroke={D.ink} strokeWidth={5} strokeLinejoin="round" />
      <path d="M160 306 L180 330 L200 306" fill="none" stroke={D.ink} strokeWidth={4} strokeLinejoin="round" />
      <rect x={172} y={258} width={16} height={48} fill={D.face} stroke={D.ink} strokeWidth={4.5} />
      <path d="M112 140 C 112 96 142 84 180 84 C 218 84 248 96 248 140 L 246 214 C 244 250 216 266 180 266 C 144 266 116 250 114 214 Z" fill={D.face} stroke={D.ink} strokeWidth={5} />
      <path d="M104 162 C 92 104, 120 62, 170 58 C 150 46, 190 36, 204 52 C 214 36, 250 48, 244 72 C 268 86, 266 128, 256 160 C 250 138, 244 126, 236 120 L 238 146 C 226 128, 214 116, 200 112 L 202 136 C 190 120, 176 116, 160 118 L 150 140 C 146 126, 136 120, 124 122 C 114 132, 108 146, 104 162 Z" fill={D.ink} stroke={D.ink} strokeWidth={3} strokeLinejoin="round" />
      <path d="M108 146 Q180 118 254 146 L258 156 Q180 134 102 158 Z" fill={D.teal} stroke={D.ink} strokeWidth={3.5} opacity={0.85} />
      <path d="M136 172 H170 M150 172 V186 M192 172 H226 M206 172 V186" {...LINE} strokeWidth={5} />
      <path d="M164 228 H198" {...LINE} strokeWidth={4.5} />
      <Stubble x={150} y={236} w={60} h={20} n={16} />
      <rect x={10} y={380} width={340} height={90} fill={D.paperDeep} stroke={D.ink} strokeWidth={5} />
      <path d="M10 396 H350" stroke={D.ink} strokeWidth={3} />
      <g transform="rotate(-3 90 372)">
        <rect x={40} y={352} width={110} height={30} fill="#fff" stroke={D.ink} strokeWidth={3.5} />
        <text x={95} y={373} textAnchor="middle" className="ill-mono" fontSize={12} fontWeight={700} fill={D.greyLight}>UNREAD</text>
      </g>
    </g>
  );
}

/** The Model, as an intern: huge grin, lanyard, sources on request. */
export function Intern() {
  return (
    <g>
      <path d="M150 458 L146 420 M210 458 L214 420" {...LINE} strokeWidth={6} />
      <path d="M128 460 H154 M206 460 H232" {...LINE} strokeWidth={8} />
      <path d="M118 212 C 94 270 98 400 146 430 L 214 430 C 262 400 266 270 242 212 Z" fill={D.teal} stroke={D.ink} strokeWidth={5} strokeLinejoin="round" />
      <path d="M150 214 L180 300 L210 214" fill="none" stroke={D.accent} strokeWidth={3.5} />
      <rect x={160} y={296} width={40} height={26} rx={3} fill="#fff" stroke={D.ink} strokeWidth={3} />
      <text x={180} y={313} textAnchor="middle" className="ill-mono" fontSize={9} fontWeight={700} fill={D.ink}>INTERN</text>
      <path d="M118 250 C 96 290, 100 330, 120 350" {...LINE} strokeWidth={5} />
      <path d="M242 250 C 262 280, 262 300, 250 318" {...LINE} strokeWidth={5} />
      <g transform="rotate(8 262 350)">
        <rect x={216} y={296} width={96} height={116} rx={4} fill="#fff" stroke={D.ink} strokeWidth={4.5} />
        <rect x={248} y={288} width={32} height={14} rx={3} fill={D.greyLight} stroke={D.ink} strokeWidth={3} />
        <text x={264} y={332} textAnchor="middle" className="ill-mono" fontSize={12} fontWeight={700} fill={D.ink}>SOURCES:</text>
        <text x={264} y={370} textAnchor="middle" className="ill-hand" fontSize={26} fontWeight={700} fill={D.accent}>trust me</text>
      </g>
      <circle cx={180} cy={136} r={70} fill={D.face} stroke={D.ink} strokeWidth={5} />
      <path d="M176 66 C 170 40, 196 34, 192 56 C 204 40, 214 60, 196 70" fill="none" stroke={D.ink} strokeWidth={5} strokeLinecap="round" />
      <path d="M134 104 L160 98 M200 92 C 210 82, 222 82, 232 90" {...LINE} strokeWidth={6} />
      <SaucerEye x={150} y={122} r={15} px={3} py={2} />
      <SaucerEye x={212} y={120} r={17} px={3} py={2} />
      <path d="M134 158 C 150 200, 212 200, 228 156 Z" fill="#fff" stroke={D.ink} strokeWidth={4.5} strokeLinejoin="round" />
      <path d="M140 168 H222 M160 160 V184 M180 162 V190 M200 160 V184" stroke={D.ink} strokeWidth={2.5} strokeLinecap="round" />
    </g>
  );
}

/** The Gardener: the site's own deadpan. Poses for the hero sequence. */
export function Gardener({ pose = "stand" }: { pose?: "enter" | "snip" | "sip" | "stand" }) {
  return (
    <g>
      <path d="M152 460 L156 330 M204 460 L200 330" {...LINE} strokeWidth={6} />
      <path d="M128 462 H158 M200 462 H232" {...LINE} strokeWidth={9} />
      <path d="M118 348 L124 222 C 128 200 150 192 178 192 C 206 192 228 200 232 222 L238 348 Z" fill={D.grey} stroke={D.ink} strokeWidth={5} strokeLinejoin="round" />
      <path d="M178 196 V346" stroke={D.ink} strokeWidth={3} />
      <circle cx={170} cy={250} r={3.5} fill={D.face} />
      <circle cx={170} cy={284} r={3.5} fill={D.face} />
      <circle cx={170} cy={318} r={3.5} fill={D.face} />
      <rect x={170} y={170} width={16} height={26} fill={D.face} stroke={D.ink} strokeWidth={4} />
      <circle cx={178} cy={108} r={66} fill={D.face} stroke={D.ink} strokeWidth={5} />
      <path d="M150 46 C 146 30 152 24 158 30 M172 42 C 172 24 180 20 184 28 M194 44 C 198 28 208 28 206 40" fill="none" stroke={D.ink} strokeWidth={3} strokeLinecap="round" />
      <ellipse cx={112} cy={112} rx={10} ry={16} fill={D.face} stroke={D.ink} strokeWidth={4} />
      <SleepyEye x={152} y={104} r={17} look={pose === "sip" ? 1 : 0.6} />
      <SleepyEye x={206} y={104} r={17} look={pose === "sip" ? 1 : 0.6} />
      <path d="M178 116 q 8 10 0 16" {...LINE} strokeWidth={3} />
      <path d="M164 148 H194" {...LINE} strokeWidth={4.5} />
      <Stubble x={140} y={134} w={80} h={36} n={22} />
      {pose === "enter" && (
        <g>
          <Limb d="M228 232 C 250 200, 250 170, 232 150" fill={D.grey} />
          <g transform="translate(226 140) rotate(-58)">
            <path d="M0 -4 L150 -16 L150 -4 L4 6 Z" fill="#fff" stroke={D.ink} strokeWidth={4} strokeLinejoin="round" />
            <path d="M0 4 L150 18 L150 6 L4 -6 Z" fill="#fff" stroke={D.ink} strokeWidth={4} strokeLinejoin="round" />
            <rect x={-74} y={-20} width={74} height={14} rx={6} fill={D.accent} stroke={D.ink} strokeWidth={3.5} />
            <rect x={-74} y={6} width={74} height={14} rx={6} fill={D.accent} stroke={D.ink} strokeWidth={3.5} />
            <circle cx={0} cy={0} r={5} fill={D.ink} />
          </g>
        </g>
      )}
      {pose === "snip" && (
        <g>
          <Limb d="M130 236 C 106 260, 90 270, 64 270" fill={D.grey} />
          <Limb d="M226 236 C 214 262, 200 276, 176 280" fill={D.grey} />
          <g transform="translate(96 276)">
            <path d="M0 -9 L-140 -3 L-152 4 L0 10 Z" fill="#fff" stroke={D.ink} strokeWidth={4} strokeLinejoin="round" />
            <path d="M-6 0 H-140" stroke={D.ink} strokeWidth={2.5} />
            <rect x={0} y={-10} width={80} height={14} rx={6} fill={D.accent} stroke={D.ink} strokeWidth={3.5} />
            <rect x={0} y={4} width={80} height={14} rx={6} fill={D.accent} stroke={D.ink} strokeWidth={3.5} />
            <circle cx={0} cy={0} r={5} fill={D.ink} />
          </g>
        </g>
      )}
      {pose === "sip" && (
        <g>
          <Limb d="M130 238 C 110 210, 118 176, 132 166" fill={D.grey} />
          <path d="M112 146 H154 L150 176 Q133 186 116 176 Z" fill="#fff" stroke={D.ink} strokeWidth={4} strokeLinejoin="round" />
          <path d="M154 152 c 12 0 12 18 -2 18" fill="none" stroke={D.ink} strokeWidth={4} />
          <path d="M124 134 q -6 -10 0 -18 M140 132 q -6 -10 0 -18" fill="none" stroke={D.greyLight} strokeWidth={3} strokeLinecap="round" />
        </g>
      )}
    </g>
  );
}

/** A small potted pothos, for scenes. Local box ~ 220 x 260, pot base at 250. */
export function MiniPothos({ pruned = false, cut = false }: { pruned?: boolean; cut?: boolean }) {
  const leaf = (x: number, y: number, r: number, s = 1, dead = false) => (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      <path d="M0 -3 C -6 -2, -24 0, -28 -18 C -32 -37, -13 -53, 0 -66 C 13 -53, 32 -37, 28 -18 C 24 0, 6 -2, 0 -3 Z" fill={dead ? "#CFC7B2" : D.leaf} stroke={D.ink} strokeWidth={3.5} strokeLinejoin="round" />
      <path d="M0 -6 V -58" stroke={D.ink} strokeWidth={2.5} strokeLinecap="round" />
    </g>
  );
  return (
    <g>
      <path d="M104 176 C 90 130, 60 100, 56 60 M116 176 C 130 120, 170 100, 176 56" {...LINE} strokeWidth={4} />
      {!cut && <path d="M122 182 C 160 184, 190 170, 214 146" {...LINE} strokeWidth={4} />}
      {cut && <path d="M122 182 C 150 184, 170 176, 186 164" {...LINE} strokeWidth={4} />}
      {leaf(78, 128, -40)}
      {leaf(56, 64, -10, 0.9)}
      {leaf(148, 118, 40)}
      {leaf(176, 60, 15, 0.9)}
      {!cut && leaf(214, 146, 80, 0.8, pruned)}
      <path d="M62 188 H158 L148 252 H72 Z" fill={D.accent} stroke={D.ink} strokeWidth={5} strokeLinejoin="round" />
      <rect x={54} y={172} width={112} height={20} rx={4} fill={D.accent} stroke={D.ink} strokeWidth={5} />
    </g>
  );
}
