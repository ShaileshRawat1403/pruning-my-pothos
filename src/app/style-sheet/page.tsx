import React from "react";
import { constructMetadata } from "../../lib/seo/metadata";
import {
  D,
  LINE,
  DeadpanDefs,
  Paper,
  Ink,
  Caption,
  SleepyEye,
  Stubble,
  Limb,
  Engineer,
  Executive,
  Clerk,
  Intern,
  Gardener,
  MiniPothos,
} from "../../components/illustrations/deadpan";

/*
 * /style-sheet/: a review page for the proposed "deadpan" drawing register.
 * Not linked, not indexed. Once the style is agreed, its rules move into
 * docs/STORYBOARD_AUTHORING.md and this page can go.
 */

export const metadata = constructMetadata({
  title: "Style sheet (draft)",
  description: "Draft style sheet for the deadpan drawing register.",
  path: "/style-sheet",
  noindex: true,
});

function Plate({ id, w, h, boil = false, children }: { id: string; w: number; h: number; boil?: boolean; children: React.ReactNode }) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="ill-svg block w-full rounded-sm border border-[#D9CDB2] shadow-sm" role="img" aria-label={id}>
      <DeadpanDefs id={id} boil={boil} />
      <Paper id={id} w={w} h={h} />
      {children}
    </svg>
  );
}

const CAST = [
  { id: "engineer", Fig: Engineer, title: "the engineer", sub: "Tired. Tested. Trusted-ish." },
  { id: "executive", Fig: Executive, title: "the executive", sub: "Vision: vast. Visibility: none." },
  { id: "clerk", Fig: Clerk, title: "the approver", sub: "Stamps first. Reads never." },
  { id: "intern", Fig: Intern, title: "the model", sub: "Confident. Consistent. Occasionally correct." },
];

/** Human in the loop: a man in a deckchair, lassoed by the process, sipping tea. */
function HumanInTheLoop() {
  const id = "hitl";
  return (
    <Plate id={id} w={520} h={600}>
      <Ink id={id}>
        <path d="M-10 70 H120 L150 40 H250 L270 70 H340" {...LINE} strokeWidth={4} />
        <rect x={250} y={24} width={150} height={90} rx={6} fill={D.greyLight} stroke={D.ink} strokeWidth={5} />
        <text x={325} y={62} textAnchor="middle" className="ill-mono" fontSize={14} fontWeight={700} fill={D.ink}>AUTOMATION</text>
        <circle cx={300} cy={88} r={12} fill={D.face} stroke={D.ink} strokeWidth={4} />
        <circle cx={350} cy={88} r={12} fill={D.face} stroke={D.ink} strokeWidth={4} />
        <path d="M340 114 C 360 160, 470 180, 470 300" fill="none" stroke="#B08A55" strokeWidth={12} strokeLinecap="round" />
        <ellipse cx={260} cy={360} rx={210} ry={150} fill="none" stroke="#B08A55" strokeWidth={12} />
        <ellipse cx={260} cy={360} rx={210} ry={150} fill="none" stroke={D.ink} strokeWidth={2} strokeDasharray="6 14" />
        <path d="M200 440 L150 500 M320 440 L370 500 M160 420 H360" {...LINE} strokeWidth={6} />
        <path d="M168 330 L200 440 L330 440 L352 330 Z" fill="#fff" stroke={D.ink} strokeWidth={5} strokeLinejoin="round" />
        <path d="M186 330 L212 440 M226 330 L240 440 M266 330 L270 440 M306 330 L300 440 M340 330 L326 440" stroke={D.accent} strokeWidth={9} opacity={0.75} />
        <path d="M208 330 L220 250 C 224 230 244 222 262 222 C 280 222 300 230 304 250 L314 336 Z" fill={D.grey} stroke={D.ink} strokeWidth={5} strokeLinejoin="round" />
        <path d="M232 408 L196 470 M290 408 L322 470" {...LINE} strokeWidth={6} />
        <path d="M176 476 H204 M314 476 H342" {...LINE} strokeWidth={8} />
        <path d="M222 400 H300 L300 420 H222 Z" fill={D.grey} stroke={D.ink} strokeWidth={4} />
        <circle cx={262} cy={176} r={52} fill={D.face} stroke={D.ink} strokeWidth={5} />
        <SleepyEye x={240} y={170} r={14} look={0.5} />
        <SleepyEye x={284} y={170} r={14} look={0.5} />
        <path d="M252 204 H274" {...LINE} strokeWidth={4} />
        <Stubble x={236} y={194} w={52} h={24} n={16} />
        <Limb d="M292 262 C 318 270, 322 240, 310 226" fill={D.grey} />
        <path d="M296 196 H332 L328 222 Q314 230 300 222 Z" fill="#fff" stroke={D.ink} strokeWidth={4} strokeLinejoin="round" />
        <path d="M306 186 q -5 -9 0 -16 M320 186 q -5 -9 0 -16" fill="none" stroke={D.greyLight} strokeWidth={3} strokeLinecap="round" />
        <g transform="rotate(-8 120 300)">
          <rect x={52} y={270} width={140} height={54} rx={4} fill="#fff" stroke={D.ink} strokeWidth={4} />
          <text x={122} y={294} textAnchor="middle" className="ill-mono" fontSize={12} fontWeight={700} fill={D.ink}>HUMAN</text>
          <text x={122} y={314} textAnchor="middle" className="ill-mono" fontSize={11} fontWeight={700} fill={D.accent}>(REQUIRED)</text>
        </g>
      </Ink>
      <Caption x={0} y={548} w={520} title="human in the loop" sub="Present. Polite. Powerless." />
    </Plate>
  );
}

/** Context window: a face at a letterbox-sized window, and everything it can't see. */
function ContextWindow() {
  const id = "ctx";
  return (
    <Plate id={id} w={520} h={600}>
      <Ink id={id}>
        <rect x={40} y={60} width={250} height={420} fill="#C9B593" stroke={D.ink} strokeWidth={5} />
        {Array.from({ length: 13 }).map((_, r) => (
          <path key={r} d={`M40 ${60 + r * 32} H290`} stroke={D.ink} strokeWidth={2} opacity={0.45} />
        ))}
        {Array.from({ length: 13 }).map((_, r) =>
          [0, 1, 2, 3].map((c) => <path key={`${r}-${c}`} d={`M${60 + c * 62 + (r % 2) * 31} ${60 + r * 32} v32`} stroke={D.ink} strokeWidth={2} opacity={0.45} />)
        )}
        <rect x={120} y={210} width={96} height={52} fill={D.ink} stroke={D.ink} strokeWidth={5} />
        <rect x={116} y={180} width={104} height={24} fill="#fff" stroke={D.ink} strokeWidth={3.5} />
        <text x={168} y={197} textAnchor="middle" className="ill-mono" fontSize={12} fontWeight={700} fill={D.ink}>CONTEXT</text>
        <rect x={128} y={218} width={80} height={36} fill={D.face} />
        <SleepyEye x={150} y={236} r={10} look={1} />
        <SleepyEye x={186} y={236} r={10} look={1} />
        <path d="M120 262 H216" stroke={D.ink} strokeWidth={5} />
        <g transform="rotate(4 360 250)">
          <rect x={320} y={196} width={80} height={100} fill="#fff" stroke={D.ink} strokeWidth={4} />
          <path d="M334 222 H386 M334 240 H380 M334 258 H386" stroke={D.greyLight} strokeWidth={3} strokeLinecap="round" />
        </g>
        <path d="M222 236 C 260 232, 290 236, 316 240" fill="none" stroke={D.accent} strokeWidth={3} strokeDasharray="4 7" strokeLinecap="round" />
        {Array.from({ length: 9 }).map((_, i) => (
          <g key={i} transform={`rotate(${(i % 3) * 4 - 4} ${420} ${470 - i * 18})`}>
            <rect x={350 + (i % 2) * 8} y={452 - i * 18} width={130} height={20} fill="#fff" stroke={D.ink} strokeWidth={3} />
          </g>
        ))}
        <text x={420} y={290} textAnchor="middle" className="ill-hand" fontSize={24} fontWeight={700} fill={D.greyLight}>
          everything else
        </text>
        <path d="M420 298 V 318" stroke={D.greyLight} strokeWidth={3} strokeLinecap="round" />
      </Ink>
      <Caption x={0} y={548} w={520} title="context window" sub="Small window. Strong opinions." />
    </Plate>
  );
}

const FRAMES: { t: string; beat: string; note: string; draw: (id: string) => React.ReactNode }[] = [
  {
    t: "0.0s",
    beat: "The ink arrives",
    note: "Aged paper, a slow push in. A single line draws the pot, then the vines grow in steps, like stop-motion.",
    draw: () => (
      <g>
        <g transform="translate(40 30) scale(0.95)">
          <path d="M62 188 H158 L148 252 H72 Z" fill="none" stroke={D.ink} strokeWidth={5} strokeDasharray="220 400" strokeLinejoin="round" />
        </g>
        <text x={300} y={150} textAnchor="middle" className="ill-hand" fontSize={30} fontWeight={700} fill={D.greyLight}>
          ...
        </text>
      </g>
    ),
  },
  {
    t: "1.5s",
    beat: "Enter the gardener",
    note: "He walks in from the edge with shears twice his size, stops, and looks at the camera. A beat too long.",
    draw: () => (
      <g>
        <g transform="translate(20 30) scale(0.95)">
          <MiniPothos />
        </g>
        <g transform="translate(250 40) scale(0.55)">
          <Gardener pose="enter" />
        </g>
      </g>
    ),
  },
  {
    t: "3.0s",
    beat: "Snip",
    note: "Wind-up, snap, overshoot. The tag that says hype falls in two little swings, and is struck through on landing.",
    draw: () => (
      <g>
        <g transform="translate(20 30) scale(0.95)">
          <MiniPothos cut />
        </g>
        <g transform="translate(230 40) scale(0.55)">
          <Gardener pose="snip" />
        </g>
        <text x={176} y={254} className="ill-sans" fontSize={32} fontWeight={800} fill={D.accent} transform="rotate(-8 176 254)">
          SNIP
        </text>
        <g transform="translate(228 196) rotate(130) scale(0.62)">
          <path d="M0 -3 C -6 -2, -24 0, -28 -18 C -32 -37, -13 -53, 0 -66 C 13 -53, 32 -37, 28 -18 C 24 0, 6 -2, 0 -3 Z" fill="#CFC7B2" stroke={D.ink} strokeWidth={4} />
        </g>
        <g transform="rotate(-6 250 282)">
          <rect x={214} y={268} width={70} height={26} rx={3} fill="#fff" stroke={D.greyLight} strokeWidth={2.5} />
          <text x={249} y={287} textAnchor="middle" className="ill-hand" fontSize={20} fontWeight={700} fill={D.greyLight}>hype</text>
          <path d="M220 281 C 236 276, 258 285, 278 278" fill="none" stroke={D.accent} strokeWidth={3.5} strokeLinecap="round" />
        </g>
      </g>
    ),
  },
  {
    t: "4.5s",
    beat: "Tea",
    note: "He sips. The caption writes itself. From here it idles: a blink every few seconds, the leaves sway.",
    draw: () => (
      <g>
        <g transform="translate(20 30) scale(0.95)">
          <MiniPothos cut />
        </g>
        <g transform="translate(250 40) scale(0.55)">
          <Gardener pose="sip" />
        </g>
        <g transform="translate(222 286) rotate(70) scale(0.55)">
          <path d="M0 -3 C -6 -2, -24 0, -28 -18 C -32 -37, -13 -53, 0 -66 C 13 -53, 32 -37, 28 -18 C 24 0, 6 -2, 0 -3 Z" fill="#CFC7B2" stroke={D.ink} strokeWidth={4} />
        </g>
        <text x={330} y={32} textAnchor="middle" className="ill-hand" fontSize={26} fontWeight={700} fill={D.ink}>
          pruning my pothos.
        </text>
      </g>
    ),
  },
];

const VOICE = [
  { topic: "Retrieval", line: "Found it. Filed it. Forgot it." },
  { topic: "Prompting", line: "Asked nicely. Answered loosely." },
  { topic: "Evaluation", line: "Graded by vibes. Regraded by vibes." },
  { topic: "Observability", line: "Logged everything. Learned nothing." },
  { topic: "Handoff", line: "Context lost. Confidence found." },
  { topic: "Readiness", line: "Deployed. Delighted. Disowned." },
  { topic: "The site", line: "Cut the claims. Keep the craft." },
];

export default function StyleSheetPage() {
  return (
    <div className="max-w-[1100px] mx-auto py-12 flex flex-col gap-16">
      <header className="flex flex-col gap-3 max-w-3xl">
        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[color:var(--text-muted)]">Draft · not public</span>
        <h1 className="font-heading text-4xl font-extrabold tracking-tight text-[color:var(--text-primary)]">Style sheet: the deadpan register</h1>
        <p className="text-base leading-relaxed text-[color:var(--text-secondary)]">
          People and objects who have seen through the hype, drawn in thick, slightly wobbly ink on aged paper. One exaggeration
          per figure. One caption per drawing: a visual pun, often alliterative, that turns the article&#39;s point. Dark and dry is
          welcome; sexual humour is out. Nothing here is final. React to it.
        </p>
      </header>

      <section className="flex flex-col gap-6">
        <h2 className="font-heading text-2xl font-bold text-[color:var(--text-primary)]">1 · The cast</h2>
        <p className="text-sm text-[color:var(--text-secondary)] max-w-3xl">
          A cast of different oddballs in one drawing style, never the same one on every cover. Each gets exactly one wrong proportion:
          saucer eyes, a tiny head, a stamp already on its way down, a grin with no sources.
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {CAST.map(({ id, Fig, title, sub }) => (
            <Plate key={id} id={id} w={360} h={580}>
              <Ink id={id}>
                <Fig />
              </Ink>
              <Caption x={0} y={520} w={360} title={title} sub={sub} />
            </Plate>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="font-heading text-2xl font-bold text-[color:var(--text-primary)]">2 · Emblems, as visual puns</h2>
        <p className="text-sm text-[color:var(--text-secondary)] max-w-3xl">
          The phrase drawn literally, then undercut. These would replace the current emblems for the same articles, and every
          article gets its own.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <HumanInTheLoop />
          <ContextWindow />
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="font-heading text-2xl font-bold text-[color:var(--text-primary)]">3 · The hero, as a storyboard</h2>
        <p className="text-sm text-[color:var(--text-secondary)] max-w-3xl">
          About five seconds, once per visit, then it idles. The ink lines &quot;boil&quot; slightly the whole time (the frames below boil, so
          you can see the effect). Choreography in GSAP for frame-accurate timing; all of it off under reduced motion.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {FRAMES.map((f, i) => {
            const id = `k${i}`;
            return (
              <figure key={id} className="m-0 flex flex-col gap-2">
                <Plate id={id} w={440} h={310} boil>
                  <Ink id={id}>{f.draw(id)}</Ink>
                  <text x={16} y={296} className="ill-mono" fontSize={12} fontWeight={700} fill={D.greyLight}>
                    {f.t}
                  </text>
                </Plate>
                <figcaption className="text-sm text-[color:var(--text-secondary)]">
                  <strong className="text-[color:var(--text-primary)]">{f.beat}.</strong> {f.note}
                </figcaption>
              </figure>
            );
          })}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-heading text-2xl font-bold text-[color:var(--text-primary)]">4 · The voice, in captions</h2>
        <p className="text-sm text-[color:var(--text-secondary)] max-w-3xl">
          Relatable, a little bleak, usually three beats. Each must still be true to its article.
        </p>
        <ul className="m-0 p-0 list-none grid grid-cols-1 sm:grid-cols-2 gap-3">
          {VOICE.map((v) => (
            <li key={v.topic} className="flex items-baseline gap-3 border-b border-[color:var(--card-border)] py-2">
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--text-muted)] w-28 shrink-0">{v.topic}</span>
              <span className="ill-hand text-2xl text-[color:var(--text-primary)]">{v.line}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
