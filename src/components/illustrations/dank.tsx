import React from "react";
import { D } from "./deadpan";

/**
 * dank.tsx: realistic, tired, specific faces for the deadpan register.
 * Recognisable workplace types drawn with the details that make them real:
 * heavy lids, eye bags, irises, a nose, shaded stubble, lines. (Draft, for
 * review.)
 *
 * The three characters are 400 x 560 busts; place them with their bottom
 * edge on a desk or the frame's floor.
 */

const INK = D.ink;
const SKIN = "#F1DCC4";
const SKIN_SHADE = "#DDBFA0";

type Eye = { x: number; y: number; lid?: number; look?: number; bags?: number; red?: boolean };

/** One tired eye. `lid` 0..1 is how far the upper lid has given up. */
function TiredEye({ x, y, lid = 0.45, look = 0, bags = 2, red = false }: Eye) {
  const w = 30;
  const h = 15;
  const id = `eye-${x}-${y}`;
  return (
    <g>
      <defs>
        <clipPath id={id}>
          <path d={`M${x - w} ${y} Q ${x} ${y - h * 1.3} ${x + w} ${y} Q ${x} ${y + h * 1.1} ${x - w} ${y} Z`} />
        </clipPath>
      </defs>
      <path d={`M${x - w} ${y} Q ${x} ${y - h * 1.3} ${x + w} ${y} Q ${x} ${y + h * 1.1} ${x - w} ${y} Z`} fill="#FBF8F2" />
      <g clipPath={`url(#${id})`}>
        {red && <path d={`M${x - w + 4} ${y + 2} l10 -3 M${x + w - 4} ${y + 1} l-9 -4 M${x - w + 6} ${y + 6} l8 1`} stroke="#C9624E" strokeWidth={1.4} />}
        <circle cx={x + look * 10} cy={y + 2} r={11} fill="#6B5A48" stroke={INK} strokeWidth={2} />
        <circle cx={x + look * 10} cy={y + 2} r={5} fill={INK} />
        <circle cx={x + look * 10 + 3} cy={y - 2} r={2} fill="#fff" />
        <rect x={x - w} y={y - h * 1.5} width={w * 2} height={h * 1.5 * lid + h * 0.4} fill={SKIN} />
      </g>
      <path d={`M${x - w - 2} ${y} Q ${x} ${y - h * 1.3} ${x + w + 2} ${y}`} fill="none" stroke={INK} strokeWidth={2.5} />
      <path d={`M${x - w + 2} ${y - h * 1.5 + h * 1.5 * lid + h * 0.4} Q ${x} ${y - h * 1.7 + h * 1.5 * lid + h * 0.4} ${x + w - 2} ${y - h * 1.5 + h * 1.5 * lid + h * 0.4}`} fill="none" stroke={INK} strokeWidth={4.5} strokeLinecap="round" />
      <path d={`M${x - w} ${y} Q ${x} ${y + h * 1.1} ${x + w} ${y}`} fill="none" stroke={INK} strokeWidth={2} />
      {Array.from({ length: bags }).map((_, i) => (
        <path key={i} d={`M${x - w + 6 + i * 3} ${y + 12 + i * 8} Q ${x} ${y + 24 + i * 9} ${x + w - 6 - i * 3} ${y + 12 + i * 8}`} fill="none" stroke={i === 0 ? "#9A7F66" : "#B89C82"} strokeWidth={2} strokeLinecap="round" />
      ))}
    </g>
  );
}

/** Stubble: fine dots across the jaw, clipped to it. */
function Scruff({ d, id, dense = 1 }: { d: string; id: string; dense?: number }) {
  const dots: [number, number][] = [];
  // Deterministic scatter (a hash, so server and client draw the same dots).
  const rnd = (n: number) => {
    const x = Math.sin(n * 12.9898) * 43758.5453;
    return x - Math.floor(x);
  };
  for (let i = 0; i < 420 * dense; i++) dots.push([rnd(i + 1), rnd(i + 7919)]);
  return (
    <g>
      <defs>
        <clipPath id={id}>
          <path d={d} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id})`}>
        {dots.map(([a, b], i) => (
          <circle key={i} cx={100 + a * 200} cy={230 + b * 125} r={1.2} fill={INK} opacity={0.5} />
        ))}
      </g>
    </g>
  );
}

/** A face in a 400 x 420 box: head centred at x 200, chin at about y 330. */
function Face({
  id,
  hair,
  brows = "flat",
  mouth = "flat",
  lid = 0.45,
  look = 0,
  bags = 2,
  red = false,
  stubble = 1,
  lines = 1,
  jowls = false,
}: {
  id: string;
  hair?: React.ReactNode;
  brows?: "flat" | "raised" | "unibrow" | "worried";
  mouth?: "flat" | "grin" | "frown" | "tight";
  lid?: number;
  look?: number;
  bags?: number;
  red?: boolean;
  stubble?: number;
  lines?: number;
  jowls?: boolean;
}) {
  const head = jowls
    ? "M110 150 C 110 70, 150 40, 200 40 C 250 40, 290 70, 290 150 L 292 250 C 296 300, 270 340, 230 348 C 214 352, 186 352, 170 348 C 130 340, 104 300, 108 250 Z"
    : "M112 150 C 112 70, 152 40, 200 40 C 248 40, 288 70, 288 150 L 286 240 C 284 300, 252 340, 200 344 C 148 340, 116 300, 114 240 Z";
  const jaw = "M112 238 C 116 300, 148 342, 200 346 C 252 342, 286 300, 288 238 L 262 262 C 244 250, 222 246, 200 250 C 178 246, 156 250, 138 262 Z";
  return (
    <g>
      <path d="M104 170 C 84 170, 80 214, 106 222 M296 170 C 316 170, 320 214, 294 222" fill={SKIN} stroke={INK} strokeWidth={4} strokeLinecap="round" />
      <path d="M98 184 C 92 194, 96 206, 104 208" fill="none" stroke={INK} strokeWidth={2} />
      <path d={head} fill={SKIN} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
      <path d="M126 250 C 150 270, 180 272, 200 268" fill="none" stroke={SKIN_SHADE} strokeWidth={10} strokeLinecap="round" opacity={0.6} />
      {stubble > 0 && <Scruff d={jaw} id={`${id}-jaw`} dense={stubble} />}
      {hair}
      {lines > 0 && <path d="M160 96 Q 200 88 240 96 M168 110 Q 200 104 232 110" fill="none" stroke="#B89C82" strokeWidth={2} strokeLinecap="round" />}
      {brows === "flat" && <path d="M138 138 Q 158 130 180 136 M220 136 Q 242 130 262 138" fill="none" stroke={INK} strokeWidth={8} strokeLinecap="round" />}
      {brows === "raised" && <path d="M138 126 Q 158 110 180 122 M220 122 Q 242 110 262 126" fill="none" stroke={INK} strokeWidth={8} strokeLinecap="round" />}
      {brows === "worried" && <path d="M140 132 Q 160 128 182 118 M218 118 Q 240 128 260 132" fill="none" stroke={INK} strokeWidth={8} strokeLinecap="round" />}
      {brows === "unibrow" && <path d="M136 136 Q 170 124 200 136 Q 230 124 264 136" fill="none" stroke={INK} strokeWidth={10} strokeLinecap="round" />}
      <TiredEye x={160} y={166} lid={lid} look={look} bags={bags} red={red} />
      <TiredEye x={240} y={166} lid={lid} look={look} bags={bags} red={red} />
      <path d="M204 176 C 206 200, 214 216, 214 228 C 214 238, 200 240, 190 236" fill="none" stroke={INK} strokeWidth={3.5} strokeLinecap="round" />
      <path d="M182 232 q 5 4 8 2 M212 230 q -4 5 -8 4" fill="none" stroke={INK} strokeWidth={2} />
      {lines > 0 && <path d="M170 236 C 158 250, 156 266, 162 278 M232 236 C 244 250, 246 266, 240 278" fill="none" stroke="#B89C82" strokeWidth={2.5} strokeLinecap="round" />}
      {mouth === "flat" && <path d="M176 280 H226" stroke={INK} strokeWidth={4} strokeLinecap="round" />}
      {mouth === "tight" && <path d="M180 282 H222 M180 282 l-4 3 M222 282 l4 3" stroke={INK} strokeWidth={4} strokeLinecap="round" />}
      {mouth === "frown" && <path d="M176 286 Q 200 274 226 286" fill="none" stroke={INK} strokeWidth={4} strokeLinecap="round" />}
      {mouth === "grin" && (
        <g>
          <path d="M156 268 Q 200 318 246 268 Q 200 282 156 268 Z" fill="#fff" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
          {[170, 184, 198, 212, 226].map((x) => (
            <path key={x} d={`M${x} ${272} V${284 + (x === 198 ? 6 : 2)}`} stroke={INK} strokeWidth={1.8} />
          ))}
          <path d="M150 266 q -6 4 -4 10 M252 266 q 6 4 4 10" fill="none" stroke={INK} strokeWidth={2.5} />
        </g>
      )}
      <path d="M176 296 Q 200 302 224 296" fill="none" stroke="#B89C82" strokeWidth={2} strokeLinecap="round" />
    </g>
  );
}

/* ── The cast, each in a 400 x 560 box ─────────────────────────────── */

/** The on-call engineer, 03:12. Hoodie up, pager in hand, nothing left. */
export function OnCall({ screen = ["PAGED", "03:12", "again"] }: { screen?: [string, string, string] } = {}) {
  return (
    <g>
      <path d="M40 560 C 40 430, 90 380, 200 376 C 310 380, 360 430, 360 560 Z" fill={D.grey} stroke={INK} strokeWidth={5} />
      <path d="M170 380 L176 450 M230 380 L224 450" stroke={INK} strokeWidth={3} />
      <circle cx={176} cy={456} r={5} fill="#E8E4DA" />
      <circle cx={224} cy={456} r={5} fill="#E8E4DA" />
      <path d="M150 336 H250 V392 Q 200 404 150 392 Z" fill={SKIN} stroke={INK} strokeWidth={4} />
      <path d="M86 300 C 70 150, 110 30, 200 26 C 290 30, 330 150, 314 300 C 300 380, 280 390, 262 360 L 270 180 C 250 110, 150 110, 130 180 L 138 360 C 120 390, 100 380, 86 300 Z" fill={D.grey} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
      <Face
        id="oncall"
        lid={0.62}
        look={0.3}
        bags={3}
        red
        stubble={1.4}
        brows="flat"
        mouth="flat"
        hair={<path d="M130 120 C 140 76, 180 62, 206 70 C 190 80, 184 92, 188 104 C 200 88, 230 84, 250 96 C 238 100, 232 108, 234 118 C 250 108, 266 112, 272 124 C 260 92, 236 64, 200 60 C 162 60, 136 84, 130 120 Z" fill="#3A332C" stroke={INK} strokeWidth={3} />}
      />
      <g transform="rotate(-8 320 480)">
        <rect x={270} y={420} width={100} height={150} rx={14} fill={INK} />
        <rect x={278} y={436} width={84} height={112} rx={6} fill="#9CC7D6" />
        <text x={320} y={474} textAnchor="middle" className="ill-mono" fontSize={13} fontWeight={700} fill={INK}>{screen[0]}</text>
        <text x={320} y={500} textAnchor="middle" className="ill-mono" fontSize={20} fontWeight={700} fill={D.accent}>{screen[1]}</text>
        <text x={320} y={524} textAnchor="middle" className="ill-mono" fontSize={10} fontWeight={700} fill={INK}>{screen[2]}</text>
      </g>
    </g>
  );
}

/** The thought leader. Veneers, turtleneck, a headset mic, a strong take. */
export function ThoughtLeader({ sign = ["AI changes", "everything.", "Agree?"] }: { sign?: [string, string, string] | null } = {}) {
  return (
    <g>
      <path d="M40 560 C 40 430, 90 380, 200 376 C 310 380, 360 430, 360 560 Z" fill={INK} stroke={INK} strokeWidth={5} />
      <path d="M150 330 H250 V396 Q 200 412 150 396 Z" fill={INK} stroke={INK} strokeWidth={4} />
      <path d="M156 360 Q 200 372 244 360" fill="none" stroke="#3A3A3A" strokeWidth={3} />
      <Face
        id="leader"
        lid={0.1}
        look={0}
        bags={1}
        stubble={0}
        brows="raised"
        mouth="grin"
        lines={0}
        hair={
          <path
            d="M108 170 C 96 80, 150 30, 214 36 C 270 40, 300 80, 294 150 C 286 120, 270 100, 240 92 C 200 84, 150 96, 124 110 C 116 130, 112 150, 108 170 Z"
            fill="#6B4E36"
            stroke={INK}
            strokeWidth={3.5}
          />
        }
      />
      <path d="M150 90 C 180 70, 220 66, 256 80" fill="none" stroke="#8A6A4E" strokeWidth={3} strokeLinecap="round" />
      <path d="M296 196 C 310 230, 290 270, 250 280" fill="none" stroke={INK} strokeWidth={3} />
      <circle cx={246} cy={282} r={6} fill={INK} />
      <path d="M294 186 q 10 0 10 14" fill="none" stroke={INK} strokeWidth={4} />
      {sign && (
        <g transform="rotate(4 300 470)">
          <rect x={230} y={410} width={160} height={110} rx={4} fill="#fff" stroke={INK} strokeWidth={4} />
          <text x={310} y={446} textAnchor="middle" className="ill-sans" fontSize={17} fontWeight={800} fill={INK}>{sign[0]}</text>
          <text x={310} y={468} textAnchor="middle" className="ill-sans" fontSize={17} fontWeight={800} fill={INK}>{sign[1]}</text>
          <text x={310} y={502} textAnchor="middle" className="ill-hand" fontSize={24} fontWeight={700} fill={D.accent}>{sign[2]}</text>
        </g>
      )}
    </g>
  );
}

/** Security. Arms crossed, unibrow, a badge, and the word no. */
export function SecurityGuy({ say = "no." }: { say?: string | null } = {}) {
  return (
    <g>
      <path d="M30 560 C 30 420, 80 370, 200 366 C 320 370, 370 420, 370 560 Z" fill="#2F4A56" stroke={INK} strokeWidth={5} />
      <path d="M150 340 H250 V390 Q 200 402 150 390 Z" fill={SKIN} stroke={INK} strokeWidth={4} />
      <Face
        id="sec"
        lid={0.55}
        look={-0.2}
        bags={2}
        stubble={1}
        brows="unibrow"
        mouth="tight"
        jowls
        hair={<path d="M116 150 C 110 80, 150 40, 200 40 C 250 40, 290 80, 284 150 C 280 110, 250 84, 200 84 C 150 84, 120 110, 116 150 Z" fill="#6B6B66" opacity={0.7} />}
      />
      <path d="M70 470 C 120 440, 280 440, 330 470 C 330 500, 280 520, 200 520 C 120 520, 70 500, 70 470 Z" fill="#2F4A56" stroke={INK} strokeWidth={5} />
      <path d="M100 470 C 150 490, 250 490, 300 470" fill="none" stroke={INK} strokeWidth={3} />
      <path d="M170 390 L190 440 M230 390 L210 440" stroke={D.accent} strokeWidth={4} />
      <rect x={176} y={420} width={48} height={34} rx={3} fill="#fff" stroke={INK} strokeWidth={3} />
      <text x={200} y={442} textAnchor="middle" className="ill-mono" fontSize={9} fontWeight={700} fill={INK}>SECURITY</text>
      {say && (
        <text x={340} y={330} textAnchor="middle" className="ill-hand" fontSize={46} fontWeight={700} fill={D.accent}>
          {say}
        </text>
      )}
    </g>
  );
}
