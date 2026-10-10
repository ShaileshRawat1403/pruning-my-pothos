import React from "react";
import { D, LINE, DeadpanDefs, Paper, Ink, Head, Torso, Limb } from "./deadpan";
import { StruckPArt } from "../brand/StruckP";

/**
 * shelf-covers.tsx: the cover for a Shelf item, in the house style. One drawn
 * object per category (the shelf is template-driven, docs/VISUAL_TRACK.md),
 * the item's own title, and a deadpan caption that describes the category,
 * never the item, so a cover never claims more than its page.
 *
 * Rendered at /shelf-art/<category>/<slug>/ and exported by
 * scripts/export-storyboards.mjs to /covers/shelf/items/<category>/<slug>.png.
 */

export const SHELF_COVER_W = 1200;
export const SHELF_COVER_H = 675;

type Cat = "books" | "culture" | "local-experiments" | "notes" | "philosophy" | "shared-resources" | "tools";

const META: Record<Cat, { label: string; says: string; sub: string }> = {
  books: { label: "BOOKS", says: "read. reread. underlined.", sub: "(the margins agree)" },
  culture: { label: "CULTURE", says: "noticed on the way.", sub: "(kept anyway)" },
  "local-experiments": { label: "LOCAL EXPERIMENTS", says: "ran it to see.", sub: "(the fan agrees)" },
  notes: { label: "NOTES", says: "kept. for some reason.", sub: "(the reason was good)" },
  philosophy: { label: "PHILOSOPHY", says: "the reasons under the reasons.", sub: "(sit down)" },
  "shared-resources": { label: "SHARED RESOURCES", says: "take one.", sub: "(adapt it)" },
  tools: { label: "TOOLS", says: "used daily.", sub: "(complained about daily)" },
};

function Prop({ cat }: { cat: Cat }) {
  switch (cat) {
    case "books":
      return (
        <g>
          {[
            { y: 470, w: 250, c: D.teal },
            { y: 422, w: 220, c: D.accent },
            { y: 374, w: 236, c: "#E8C77A" },
            { y: 326, w: 200, c: D.leaf },
          ].map((b, i) => (
            <g key={i}>
              <rect x={150 + (i % 2) * 14} y={b.y} width={b.w} height={46} rx={4} fill={b.c} stroke={D.ink} strokeWidth={4.5} />
              <path d={`M${170 + (i % 2) * 14} ${b.y + 23} H${130 + b.w}`} stroke={D.paper} strokeWidth={3} opacity={0.7} />
            </g>
          ))}
        </g>
      );
    case "culture":
      return (
        <g>
          <rect x={150} y={330} width={250} height={180} rx={14} fill={D.paperDeep} stroke={D.ink} strokeWidth={5} />
          <rect x={172} y={352} width={150} height={136} rx={8} fill="#fff" stroke={D.ink} strokeWidth={4} />
          <circle cx={360} cy={390} r={18} fill={D.accent} stroke={D.ink} strokeWidth={4} />
          <circle cx={360} cy={450} r={12} fill={D.paper} stroke={D.ink} strokeWidth={4} />
          <path d="M220 330 L190 270 M300 330 L330 270" {...LINE} strokeWidth={4} />
          <path d="M196 420 q 25 -30 50 0 t 50 0" fill="none" stroke={D.teal} strokeWidth={4} />
        </g>
      );
    case "local-experiments":
      return (
        <g>
          <rect x={150} y={360} width={260} height={150} rx={8} fill={D.grey} stroke={D.ink} strokeWidth={5} />
          <rect x={168} y={376} width={224} height={116} rx={4} fill={D.ink} />
          <path d="M184 404 h70 M184 428 h120 M184 452 h90" stroke={D.leaf} strokeWidth={5} strokeLinecap="round" />
          <path d="M120 510 H440 L420 530 H140 Z" fill={D.paperDeep} stroke={D.ink} strokeWidth={5} strokeLinejoin="round" />
          {[0, 1, 2].map((i) => (
            <path key={i} d={`M${330 + i * 30} 352 q -14 -26 0 -48 q 14 -22 0 -46`} fill="none" stroke={D.greyLight} strokeWidth={5} strokeLinecap="round" opacity={0.8 - i * 0.2} />
          ))}
        </g>
      );
    case "notes":
      return (
        <g>
          <rect x={160} y={300} width={230} height={220} rx={6} fill="#fff" stroke={D.ink} strokeWidth={5} />
          {[0, 1, 2, 3, 4].map((i) => (
            <path key={i} d={`M190 ${350 + i * 32} H${360 - (i % 2) * 50}`} stroke={D.greyLight} strokeWidth={4} strokeLinecap="round" />
          ))}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <circle key={i} cx={160} cy={322 + i * 34} r={7} fill={D.paper} stroke={D.ink} strokeWidth={3.5} />
          ))}
          <rect x={330} y={278} width={86} height={80} fill="#F6E7A8" stroke={D.ink} strokeWidth={4} transform="rotate(10 373 318)" />
          <rect x={120} y={452} width={80} height={74} fill="#DDEFE6" stroke={D.ink} strokeWidth={4} transform="rotate(-8 160 489)" />
        </g>
      );
    case "philosophy":
      return (
        <g>
          <path d="M180 520 V410 Q180 360 230 360 H330 Q380 360 380 410 V520" fill={D.teal} stroke={D.ink} strokeWidth={5} strokeLinejoin="round" />
          <rect x={160} y={430} width={240} height={60} rx={14} fill={D.teal} stroke={D.ink} strokeWidth={5} />
          <path d="M190 490 V530 M370 490 V530" {...LINE} />
          <path d="M440 530 V290" {...LINE} />
          <path d="M400 290 H480 L460 240 H420 Z" fill="#F6E7A8" stroke={D.ink} strokeWidth={5} strokeLinejoin="round" />
          <path d="M420 530 H460" {...LINE} />
        </g>
      );
    case "shared-resources":
      return (
        <g>
          {[0, 1, 2].map((i) => (
            <rect key={i} x={160 + i * 22} y={330 - i * 22} width={210} height={150} rx={6} fill={["#fff", "#F6E7A8", "#DDEFE6"][i]} stroke={D.ink} strokeWidth={4.5} />
          ))}
          <path d="M240 330 h80 M240 356 h120" stroke={D.greyLight} strokeWidth={4} strokeLinecap="round" />
          <path d="M160 440 L118 470" {...LINE} strokeWidth={3} />
          <rect x={60} y={462} width={96} height={48} rx={6} fill="#fff" stroke={D.ink} strokeWidth={4} transform="rotate(-12 108 486)" />
          <text x={108} y={494} textAnchor="middle" className="ill-hand" fontSize={30} fontWeight={700} fill={D.accent} transform="rotate(-12 108 486)">
            free
          </text>
        </g>
      );
    case "tools":
      return (
        <g>
          <rect x={140} y={400} width={290} height={120} rx={8} fill={D.accent} stroke={D.ink} strokeWidth={5} />
          <path d="M140 440 H430" stroke={D.ink} strokeWidth={4} />
          <path d="M240 400 V370 H330 V400" {...LINE} />
          <path d="M190 400 L230 300" {...LINE} strokeWidth={9} />
          <circle cx={234} cy={290} r={20} fill="none" stroke={D.ink} strokeWidth={8} />
          <path d="M360 400 L380 290 M372 290 h16" {...LINE} strokeWidth={8} />
        </g>
      );
  }
}

/** Splits a title into lines of at most `max` characters, at most `lines` lines. */
function wrap(text: string, max: number, lines: number): string[] {
  const words = text.split(/\s+/);
  const out: string[] = [];
  let cur = "";
  for (const w of words) {
    if ((cur + " " + w).trim().length > max && cur) {
      out.push(cur);
      cur = w;
    } else cur = (cur + " " + w).trim();
  }
  if (cur) out.push(cur);
  if (out.length > lines) {
    const kept = out.slice(0, lines);
    kept[lines - 1] = kept[lines - 1].replace(/[,:;]?$/, "") + "…";
    return kept;
  }
  return out;
}

export function ShelfCover({ category, title }: { category: string; title: string }) {
  const cat = (category in META ? category : "notes") as Cat;
  const meta = META[cat];
  const id = `shelf-${cat}`;
  const stripped = title.replace(/^Notes\/Tools:\s*/i, "").replace(/^Tools:\s*/i, "");
  const clean = stripped.charAt(0).toUpperCase() + stripped.slice(1);
  const lines = wrap(clean, clean.length > 34 ? 20 : 16, 3);
  // Fit the longest line into the ~500px text column (heavy face ~0.56em a character).
  const longest = Math.max(...lines.map((l) => l.length));
  const size = Math.min(68, Math.floor(500 / (longest * 0.56)));
  return (
    <svg viewBox={`0 0 ${SHELF_COVER_W} ${SHELF_COVER_H}`} width={SHELF_COVER_W} height={SHELF_COVER_H} className="ill-svg" role="img" aria-label={`${meta.label.toLowerCase()}: ${clean}`}>
      <DeadpanDefs id={id} />
      <Paper id={id} w={SHELF_COVER_W} h={SHELF_COVER_H} />
      <rect width={SHELF_COVER_W} height={8} fill={D.ink} />
      <Ink id={id}>
        <path d="M60 560 H560" stroke={D.ink} strokeWidth={5} strokeLinecap="round" opacity={0.6} />
        <Prop cat={cat} />
        <Torso x={500} y={430} w={100} h={130} fill={D.grey} />
        <Head x={500} y={384} r={40} eyes="sleepy" look={-1} mouth="flat" stubble hair="sides" />
        <Limb d="M456 460 C 436 470, 424 480, 414 492" fill={D.grey} />
        <text x={330} y={150} textAnchor="middle" className="ill-hand" fontSize={44} fontWeight={700} fill={D.ink}>
          {meta.says}
        </text>
        <text x={330} y={192} textAnchor="middle" className="ill-hand" fontSize={32} fontWeight={700} fill={D.greyLight}>
          {meta.sub}
        </text>
      </Ink>
      <text x={660} y={170} className="ill-mono" fontSize={22} fontWeight={700} letterSpacing={3} fill={D.accent}>
        SHELF · {meta.label}
      </text>
      {lines.map((l, i) => (
        <text key={i} x={656} y={170 + 90 + i * (size + 10)} style={{ fontFamily: "var(--font-heading)" }} fontSize={size} fontWeight={800} letterSpacing={-1.2} fill={D.ink}>
          {l}
        </text>
      ))}
      <g transform="translate(660 540) scale(0.9)">
        <StruckPArt ink={D.ink} ground={D.paper} />
      </g>
      <text x={730} y={588} className="ill-mono" fontSize={20} letterSpacing={2.4} fill={D.greyLight}>
        PRUNINGMYPOTHOS.COM
      </text>
    </svg>
  );
}
