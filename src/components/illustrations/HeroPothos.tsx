import React from "react";
import { C, Hand, Strike } from "./kit";

/**
 * The home page plate: the site's name, drawn literally. A potted pothos keeps
 * the leaves that hold up (tagged with what the site values) while a pruned
 * stem drops the ones that don't, their tags struck through with the Pruning
 * Mark. Same paper, ink and handwriting as the storyboards; it carries its own
 * paper, so it reads the same in either theme.
 */

const W = 560;
const H = 600;

const LEAF = "#6FA38F";
const LEAF_LIGHT = "#A9CBB7";
const LEAF_DEAD = "#CFC7B2";

/** A pothos leaf: petiole at 0,0, heart-shaped, tip pointing up before rotation. */
function Leaf({ x, y, r, s = 1, dead = false, variegated = false }: { x: number; y: number; r: number; s?: number; dead?: boolean; variegated?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      <path
        d="M0 -4 C -8 -2, -32 0, -38 -24 C -44 -50, -18 -72, 0 -90 C 18 -72, 44 -50, 38 -24 C 32 0, 8 -2, 0 -4 Z"
        fill={dead ? LEAF_DEAD : LEAF}
        stroke={dead ? C.muted : C.ink}
        strokeWidth={3.5}
        strokeLinejoin="round"
      />
      {variegated && !dead && <path d="M-6 -20 C -20 -30, -22 -50, -8 -64 C -4 -48, -2 -34, -6 -20 Z" fill={LEAF_LIGHT} />}
      <path d="M0 -8 C 1 -30, 1 -58, 0 -80" fill="none" stroke={dead ? C.muted : C.ink} strokeWidth={2.5} strokeLinecap="round" />
    </g>
  );
}

/** A paper tag tied to a leaf with a thread. A struck tag was pruned. */
function Tag({ x, y, w, text, to, rotate = 0, struck = false }: { x: number; y: number; w: number; text: string; to: [number, number]; rotate?: number; struck?: boolean }) {
  const cx = x + w / 2;
  const tx = x + 22 + (w - 22) / 2;
  return (
    <g>
      <path
        d={`M${x + 10} ${y + 20} Q ${(x + to[0]) / 2} ${(y + to[1]) / 2 + 22}, ${to[0]} ${to[1]}`}
        fill="none"
        stroke={C.muted}
        strokeWidth={2}
        strokeDasharray="3 5"
        strokeLinecap="round"
      />
      <g transform={`rotate(${rotate} ${cx} ${y + 20})`}>
        <path d={`M${x + 12} ${y} H${x + w} V${y + 40} H${x + 12} L${x} ${y + 20} Z`} fill={C.card} stroke={struck ? C.muted : C.ink} strokeWidth={3} strokeLinejoin="round" />
        <circle cx={x + 14} cy={y + 20} r={3.5} fill={C.paper} stroke={struck ? C.muted : C.ink} strokeWidth={2} />
        <Hand x={tx} y={y + 29} size={24} color={struck ? C.muted : C.ink} anchor="middle">
          {text}
        </Hand>
        {struck && <Strike x={x + 26} y={y + 20} w={w - 34} width={4} />}
      </g>
    </g>
  );
}

export default function HeroPothos({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={`ill-svg hero-pothos ${className}`}
      role="img"
      aria-label="A potted pothos. The leaves it keeps are tagged plain words, evidence, checks and owners. A pair of scissors has cut one stem, and its leaves fall away with their tags struck through: hype, magic, jargon. The notes read: keep what holds, cut what doesn't."
    >
      <rect width={W} height={H} fill={C.paper} />

      {/* Vines */}
      <g fill="none" stroke={C.ink} strokeWidth={4} strokeLinecap="round">
        <path d="M232 450 C 218 380, 166 336, 128 262 C 100 208, 106 150, 144 104" />
        <path d="M244 450 C 260 372, 310 318, 340 238 C 358 190, 352 140, 328 110" />
        <path d="M224 468 C 192 484, 136 488, 80 528" />
        <path d="M262 462 C 314 466, 356 446, 390 410" />
      </g>

      {/* Kept leaves */}
      <Leaf x={178} y={352} r={-52} s={0.9} variegated />
      <Leaf x={128} y={262} r={-68} />
      <Leaf x={112} y={178} r={-24} s={0.95} variegated />
      <Leaf x={144} y={106} r={12} s={0.8} />
      <Leaf x={298} y={336} r={48} s={0.9} />
      <Leaf x={340} y={238} r={62} variegated />
      <Leaf x={356} y={156} r={20} s={0.9} />
      <Leaf x={328} y={112} r={-10} s={0.7} />
      <Leaf x={146} y={486} r={-112} s={0.85} variegated />
      <Leaf x={80} y={526} r={-128} s={0.8} />

      {/* The cut, and the scissors that made it */}
      <path d="M380 404 L392 396 M388 420 L402 412" stroke={C.accent} strokeWidth={4} strokeLinecap="round" />
      <g transform="translate(436 382) rotate(-22)">
        <path d="M0 -3 C -26 -18, -58 -20, -84 -12 C -58 -6, -28 2, 0 6 Z" fill={C.card} stroke={C.ink} strokeWidth={3.5} strokeLinejoin="round" />
        <path d="M0 3 C -26 18, -58 20, -84 12 C -58 6, -28 -2, 0 -6 Z" fill={C.card} stroke={C.ink} strokeWidth={3.5} strokeLinejoin="round" />
        <path d="M2 -4 C 10 -10, 14 -14, 16 -18 M2 4 C 10 10, 14 14, 16 18" stroke={C.ink} strokeWidth={4} strokeLinecap="round" fill="none" />
        <ellipse cx={30} cy={-22} rx={19} ry={13} fill={C.paper} stroke={C.accent} strokeWidth={6} />
        <ellipse cx={30} cy={22} rx={19} ry={13} fill={C.paper} stroke={C.accent} strokeWidth={6} />
        <circle cx={0} cy={0} r={4.5} fill={C.ink} />
      </g>

      {/* What fell */}
      <g className="hero-pothos__fall">
        <Leaf x={400} y={470} r={152} s={0.66} dead />
        <Leaf x={372} y={540} r={214} s={0.62} dead />
        <Leaf x={404} y={592} r={118} s={0.56} dead />
      </g>
      <Tag x={440} y={446} w={96} text="hype" to={[410, 470]} rotate={5} struck />
      <Tag x={438} y={504} w={104} text="magic" to={[388, 528]} rotate={-4} struck />
      <Tag x={430} y={554} w={114} text="jargon" to={[404, 574]} rotate={3} struck />

      {/* Pot */}
      <ellipse cx={240} cy={462} rx={84} ry={12} fill="#6B5A48" />
      <path d="M164 474 H316 L298 582 H182 Z" fill={C.accent} stroke={C.ink} strokeWidth={4.5} strokeLinejoin="round" />
      <rect x={152} y={450} width={176} height={28} rx={6} fill={C.accent} stroke={C.ink} strokeWidth={4.5} />
      <path d="M192 514 C 216 506, 264 506, 288 514" fill="none" stroke={C.card} strokeWidth={3} strokeLinecap="round" opacity={0.5} />

      {/* What it keeps */}
      <Tag x={6} y={292} w={136} text="plain words" to={[58, 252]} rotate={-3} />
      <Tag x={430} y={250} w={112} text="evidence" to={[412, 206]} rotate={3} />
      <Tag x={420} y={124} w={100} text="checks" to={[392, 132]} rotate={-3} />
      <Tag x={8} y={392} w={104} text="owners" to={[92, 492]} rotate={4} />

      <Hand x={446} y={62} size={34} color={C.teal} anchor="middle">keep what holds.</Hand>
      <Hand x={548} y={318} size={30} color={C.accent} anchor="end">cut what doesn&#39;t.</Hand>
    </svg>
  );
}
