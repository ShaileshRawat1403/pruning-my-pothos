import React from "react";
import { D, LINE, DeadpanDefs, Paper, Ink, Head, Torso, Limb, Label } from "./deadpan";

/**
 * sections.tsx: one deadpan scene per section of the site, drawn for the
 * section headers (components/SectionHeader.tsx). Same register as the
 * emblems (deadpan.tsx, docs/STORYBOARD_AUTHORING.md): a tired, specific
 * person, drawn straight, with one thing wrong, and two handwritten lines.
 *
 * Each draws in a 640 x 470 box. A section's sub-pages reuse its scene small.
 *
 * Each scene is also a small story, told once when the page loads (about four
 * seconds, CSS only, see "Section scenes" in globals.css), then kept alive
 * with one quiet loop. The sx- classes are its hooks. The last frame of the
 * story is the drawing as written here, which is what reduced motion, print
 * and anyone without CSS animation sees.
 */

export const SECTION_W = 640;
export const SECTION_H = 470;

export type SectionSceneName = "systems" | "storyboards" | "stack" | "shelf" | "writing" | "lost";

const hand = (x: number, y: number, t: string, size = 28, color: string = D.ink) => (
  <text x={x} y={y} textAnchor="middle" className="ill-hand" fontSize={size} fontWeight={700} fill={color}>
    {t}
  </text>
);
const floor = <path d="M30 430 H610" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />;

const PINS: [number, number][] = [
  [292, 104], [372, 84], [452, 116], [548, 92],
  [560, 196], [470, 214], [380, 190], [300, 252],
];

const SCENES: Record<SectionSceneName, { alt: string; art: React.ReactNode }> = {
  /* Systems: the wall of string. Eight pins, one order, a man who has explained it before. */
  systems: {
    alt: "A tired man points a stick at a board of eight numbered pins joined by one string",
    art: (
      <g>
        {floor}
        <rect x={250} y={44} width={356} height={250} fill={D.paperDeep} stroke={D.ink} strokeWidth={5} />
        <path className="sx-string" pathLength={1} d={`M${PINS.map((p) => p.join(" ")).join(" L")}`} fill="none" stroke={D.accent} strokeWidth={3.5} strokeLinejoin="round" />
        {PINS.map(([x, y], i) => (
          <g key={i} className="sx-pin" style={{ ["--i" as string]: i }}>
            <circle cx={x} cy={y} r={9} fill={i === 0 ? D.accent : "#fff"} stroke={D.ink} strokeWidth={3.5} />
            <text x={x + 16} y={y + 7} className="ill-mono" fontSize={18} fontWeight={700} fill={D.ink}>
              {i + 1}
            </text>
          </g>
        ))}
        <Torso x={130} y={254} w={130} h={176} fill={D.teal} />
        <Head x={130} y={196} r={50} eyes="sleepy" look={1} mouth="flat" stubble hair="strands" />
        <g className="sx-pointer">
          <Limb d="M188 292 C 214 284, 226 262, 232 238" />
          <path d="M228 244 L284 116" {...LINE} strokeWidth={5} />
        </g>
        <g className="sx-say sx-say-1">{hand(440, 352, "it's all connected.")}</g>
        <g className="sx-say sx-say-2">{hand(440, 384, "(in this order)", 22, D.greyLight)}</g>
      </g>
    ),
  },

  /* Storyboards: the argument, pegged up to dry. */
  storyboards: {
    alt: "A man with a pencil stands beside four drawn frames pegged to a line",
    art: (
      <g>
        {floor}
        <path d="M224 84 Q 420 118 616 88" fill="none" stroke={D.ink} strokeWidth={3.5} strokeLinecap="round" />
        {[0, 1, 2, 3].map((i) => {
          const x = 246 + i * 92;
          const y = 100 + [4, 12, 12, 5][i];
          return (
            <g key={i} className="sx-frame" style={{ ["--i" as string]: i }}>
            <g transform={`rotate(${[-3, 2, -2, 4][i]} ${x + 39} ${y})`}>
              <rect x={x} y={y} width={78} height={98} fill="#fff" stroke={D.ink} strokeWidth={4} />
              <rect x={x + 32} y={y - 12} width={14} height={22} rx={3} fill={D.accent} stroke={D.ink} strokeWidth={3} />
              {i === 0 && <path d={`M${x + 39} ${y + 40} m -12 0 a 12 12 0 1 0 24 0 a 12 12 0 1 0 -24 0 M${x + 39} ${y + 52} V${y + 82}`} {...LINE} strokeWidth={3.5} />}
              {i === 1 && <path d={`M${x + 16} ${y + 56} H${x + 58} M${x + 46} ${y + 44} L${x + 60} ${y + 56} L${x + 46} ${y + 68}`} {...LINE} strokeWidth={4} />}
              {i === 2 && (
                <text x={x + 39} y={y + 74} textAnchor="middle" className="ill-hand" fontSize={56} fontWeight={700} fill={D.accent}>
                  ?
                </text>
              )}
              {i === 3 && <path className="sx-tick" pathLength={1} d={`M${x + 20} ${y + 56} L${x + 34} ${y + 70} L${x + 60} ${y + 38}`} {...LINE} stroke={D.leaf} strokeWidth={6} />}
            </g>
            </g>
          );
        })}
        <Torso x={124} y={254} w={130} h={176} fill={D.shirt} />
        <Head x={124} y={196} r={50} eyes="sleepy" look={1} mouth="flat" hair="curly" />
        <g className="sx-pencil">
          <Limb d="M182 294 C 208 288, 224 270, 234 248" fill={D.shirt} />
          <path d="M230 254 L254 210" stroke={D.ink} strokeWidth={9} strokeLinecap="round" />
          <path d="M230 254 L254 210" stroke="#E8C766" strokeWidth={4} strokeLinecap="round" />
        </g>
        <g className="sx-say sx-say-1">{hand(430, 310, "drew it.")}</g>
        <g className="sx-say sx-say-2">{hand(430, 342, "(so you'd read it)", 22, D.greyLight)}</g>
      </g>
    ),
  },

  /* Stack: the workbench. It runs here. */
  stack: {
    alt: "A tired builder behind a workbench with a taped-up prototype that is smoking slightly",
    art: (
      <g>
        {floor}
        <Torso x={210} y={174} w={130} h={170} fill={D.teal} />
        <Head x={210} y={116} r={50} eyes="sleepy" look={0.8} mouth="flat" stubble hair="messy" />
        <Limb d="M266 210 C 296 222, 320 242, 338 260" />
        <rect x={90} y={316} width={460} height={26} fill={D.paperDeep} stroke={D.ink} strokeWidth={5} />
        <path d="M120 342 V428 M520 342 V428" {...LINE} strokeWidth={7} />
        <g className="sx-machine">
          <rect x={340} y={222} width={160} height={94} rx={6} fill="#fff" stroke={D.ink} strokeWidth={5} />
          <g className="sx-dial">
            <circle cx={380} cy={268} r={24} fill="none" stroke={D.ink} strokeWidth={5} />
            <path d="M380 268 L380 248" stroke={D.ink} strokeWidth={4} strokeLinecap="round" />
            <circle cx={380} cy={268} r={6} fill={D.ink} />
          </g>
          <path d="M416 252 H482 M416 270 H470 M416 288 H482" stroke={D.greyLight} strokeWidth={4} strokeLinecap="round" />
          <g className="sx-tape">
            <g transform="rotate(-12 462 222)">
              <rect x={422} y={210} width={84} height={22} fill={D.accent} stroke={D.ink} strokeWidth={4} />
            </g>
          </g>
        </g>
        <path className="sx-smoke" d="M370 210 q -10 -16 0 -30 q 10 -14 0 -28" fill="none" stroke={D.greyLight} strokeWidth={4} strokeLinecap="round" />
        <path className="sx-smoke sx-smoke-2" d="M400 206 q -8 -12 0 -22 q 8 -10 0 -20" fill="none" stroke={D.greyLight} strokeWidth={4} strokeLinecap="round" />
        <g className="sx-stamp">
          <Label x={420} y={368} text="v0.9-final-2" size={14} color={D.accent} r={-3} />
        </g>
        <g className="sx-say sx-say-1">
          {hand(476, 110, "works on")}
          {hand(476, 140, "my machine.")}
        </g>
        <g className="sx-say sx-say-2">{hand(476, 170, "(the machine disagrees)", 20, D.greyLight)}</g>
      </g>
    ),
  },

  /* Shelf: bought with intent. The plank has noticed. */
  shelf: {
    alt: "A man reaches toward a bookshelf that sags in the middle under its books",
    art: (
      <g>
        {floor}
        <path d="M252 84 V262 M608 84 V262" {...LINE} strokeWidth={6} />
        {[
          { x: 266, w: 30, h: 118, c: D.teal },
          { x: 300, w: 38, h: 96, c: D.shirt },
          { x: 342, w: 26, h: 132, c: D.accent },
          { x: 372, w: 40, h: 104, c: D.grey },
          { x: 416, w: 30, h: 124, c: "#F6E7A8" },
          { x: 450, w: 36, h: 100, c: D.leaf },
          { x: 490, w: 28, h: 128, c: D.shirt },
        ].map((b) => {
          const sag = 30 * (1 - ((b.x + b.w / 2 - 430) / 178) ** 2);
          return <rect key={b.x} className="sx-book" style={{ ["--i" as string]: (b.x - 266) / 38 }} x={b.x} y={232 + sag - b.h} width={b.w} height={b.h} fill={b.c} stroke={D.ink} strokeWidth={4} />;
        })}
        <g className="sx-tipper">
          <g transform="rotate(16 552 190)">
            <rect x={534} y={126} width={32} height={118} fill={D.teal} stroke={D.ink} strokeWidth={4} />
          </g>
        </g>
        <g className="sx-plank">
          <path d="M252 234 Q 430 292 608 234" fill="none" stroke={D.ink} strokeWidth={14} strokeLinecap="round" />
          <path d="M252 234 Q 430 292 608 234" fill="none" stroke="#C9A77C" strokeWidth={7} strokeLinecap="round" />
        </g>
        <Torso x={124} y={264} w={130} h={166} fill={D.grey} />
        <Head x={124} y={206} r={50} eyes="sleepy" look={1} mouth="flat" stubble hair="sides" />
        <g className="sx-reach">
          <Limb d="M182 300 C 214 286, 236 250, 258 214" fill={D.grey} />
        </g>
        <g className="sx-say sx-say-1">{hand(430, 350, "will read.")}</g>
        <g className="sx-say sx-say-2">{hand(430, 382, "(has not)", 22, D.greyLight)}</g>
      </g>
    ),
  },

  /* Writing: one line kept. The bin kept the rest. */
  writing: {
    alt: "A man at a desk with a page holding a single line, beside a bin overflowing with crumpled paper",
    art: (
      <g>
        {floor}
        <rect x={236} y={300} width={250} height={22} fill={D.paperDeep} stroke={D.ink} strokeWidth={5} />
        <path d="M260 322 V428 M462 322 V428" {...LINE} strokeWidth={7} />
        <rect x={306} y={170} width={120} height={104} fill="#fff" stroke={D.ink} strokeWidth={4} />
        <path className="sx-line" pathLength={1} d="M322 206 H392" stroke={D.ink} strokeWidth={4} strokeLinecap="round" />
        <rect className="sx-cursor" x={398} y={196} width={7} height={18} fill={D.accent} />
        <rect x={286} y={262} width={160} height={40} rx={6} fill={D.greyLight} stroke={D.ink} strokeWidth={4.5} />
        <path d="M524 352 H604 L594 430 H534 Z" fill="#fff" stroke={D.ink} strokeWidth={4.5} strokeLinejoin="round" />
        {[
          [546, 340], [578, 332], [562, 312], [596, 346], [506, 418], [622, 420],
        ].map(([x, y], i) => (
          <g key={i} className="sx-ball" style={{ ["--i" as string]: i, ["--dx" as string]: `${366 - x}px`, ["--dy" as string]: `${220 - y}px` }}>
            <circle cx={x} cy={y} r={15} fill="#fff" stroke={D.ink} strokeWidth={3.5} />
            <path d={`M${x - 8} ${y - 3} l 6 5 l 5 -7 l 5 8`} fill="none" stroke={D.greyLight} strokeWidth={2.5} strokeLinecap="round" />
          </g>
        ))}
        <Torso x={124} y={264} w={130} h={166} fill={D.shirt} />
        <Head x={124} y={206} r={50} eyes="tt" look={1} mouth="flat" stubble hair="messy" />
        <Limb d="M182 304 C 214 300, 248 292, 290 282" fill={D.shirt} />
        <g className="sx-say sx-say-1">{hand(440, 96, "one sentence.")}</g>
        <g className="sx-say sx-say-2">{hand(440, 128, "(forty drafts)", 22, D.greyLight)}</g>
      </g>
    ),
  },

  /* Lost (the 404 page): the stem you followed ends in a clean cut. */
  lost: {
    alt: "A pothos on a stand whose longest stem ends in a clean cut with a tag reading 404, beside a tired gardener holding shears",
    art: (
      <g>
        {floor}
        <path d="M380 430 V330 M330 430 L380 330 L430 430" {...LINE} strokeWidth={6} />
        <path d="M330 270 H430 L418 330 H342 Z" fill={D.accent} stroke={D.ink} strokeWidth={4.5} strokeLinejoin="round" />
        <path d="M366 272 C 360 230, 330 200, 300 190 M392 272 C 400 220, 440 170, 520 150 C 556 142, 580 150, 596 168" fill="none" stroke={D.leaf} strokeWidth={6} strokeLinecap="round" />
        {[[300, 190, -20], [342, 219, 40], [429, 199, -15], [476, 165, 30], [549, 147, 10]].map(([x, y, r], i) => (
          <path key={i} d={`M${x} ${y} c -18 -6 -26 -24 -18 -38 c 16 2 24 18 18 38 z`} fill={D.leaf} stroke={D.ink} strokeWidth={3} strokeLinejoin="round" transform={`rotate(${r} ${x} ${y})`} />
        ))}
        <path d="M590 162 L602 174" stroke={D.ink} strokeWidth={4} strokeLinecap="round" />
        <g className="sx-tag">
          <path d="M598 172 V196" stroke={D.ink} strokeWidth={2.5} />
          <rect x={572} y={196} width={54} height={30} rx={4} fill="#fff" stroke={D.ink} strokeWidth={3} />
          <text x={599} y={218} textAnchor="middle" className="ill-mono" fontSize={18} fontWeight={700} fill={D.accent}>404</text>
        </g>
        <g className="sx-fall">
          <path d="M600 380 c -18 -6 -26 -24 -18 -38 c 16 2 24 18 18 38 z" fill={D.leaf} stroke={D.ink} strokeWidth={3} strokeLinejoin="round" transform="rotate(70 600 380)" />
        </g>
        <Torso x={124} y={264} w={130} h={166} fill={D.teal} />
        <Head x={124} y={206} r={50} eyes="sleepy" look={1} mouth="flat" stubble hair="sides" />
        <g className="sx-shears">
          <Limb d="M182 304 C 206 296, 222 280, 230 262" fill={D.teal} />
          <path d="M226 268 L262 232 M232 274 L270 244" stroke={D.grey} strokeWidth={5} strokeLinecap="round" />
          <circle cx={226} cy={270} r={7} fill="none" stroke={D.ink} strokeWidth={3} />
        </g>
        <g className="sx-say sx-say-1">{hand(470, 64, "pruned.")}</g>
        <g className="sx-say sx-say-2">{hand(470, 96, "(or it never grew)", 22, D.greyLight)}</g>
      </g>
    ),
  },
};

export function SectionScene({ name }: { name: SectionSceneName }) {
  const id = `sec-${name}`;
  return (
    <svg viewBox={`0 0 ${SECTION_W} ${SECTION_H}`} className={`ill-svg section-scene sx-${name}`} role="img" aria-label={SCENES[name].alt}>
      <DeadpanDefs id={id} />
      <Paper id={id} w={SECTION_W} h={SECTION_H} />
      <Ink id={id}>{SCENES[name].art}</Ink>
    </svg>
  );
}
