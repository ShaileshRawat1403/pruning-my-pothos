import React from "react";
import type { DeckFrame } from "./types";
import { GagTemplate } from "../templates";
import { D, LINE, Head, Torso, Legs, Limb, Sheet, Label, SleepyEye } from "../deadpan";

/*
 * Deadpan gag frames, one set per deck: a visual pun, its punchline, and the
 * plain claim from the article it stands for. Every claim here is a sentence
 * the owning article makes; the drawing is the joke, the claim is the proof.
 * Scenes draw in GagTemplate's local 1000 x 640 box, floor at y 620.
 */

const floor = <path d="M0 620 H1000" stroke={D.ink} strokeWidth={4} strokeLinecap="round" opacity={0.6} />;
const say = (x: number, y: number, t: string, size = 30, color: string = D.ink, anchor: "start" | "middle" | "end" = "middle") => (
  <text x={x} y={y} textAnchor={anchor} className="ill-hand" fontSize={size} fontWeight={700} fill={color}>
    {t}
  </text>
);
const bubble = (x: number, y: number, w: number, t: string, size = 28) => (
  <g>
    <path d={`M${x} ${y} h${w} v60 h-${w - 60} l-24 26 l4 -26 h-${36} Z`} fill="#fff" stroke={D.ink} strokeWidth={4} strokeLinejoin="round" />
    {say(x + w / 2, y + 40, t, size)}
  </g>
);

type Scene = { key: string; title: string; headline: string[]; punch: string; claim: string; scene: React.ReactNode };

function frames(chapter: string, scenes: Scene[]): DeckFrame[] {
  return scenes.map((g) => ({
    key: g.key,
    title: g.title,
    text: `${g.punch} ${g.claim}`,
    Render: (p) => (
      <GagTemplate {...p} chapter={chapter} headline={g.headline} punch={g.punch} claim={g.claim}>
        {g.scene}
      </GagTemplate>
    ),
  }));
}

/* ── 01 · What an AI model actually is ─────────────────────────────── */

export const MODEL_GAGS = frames("SYSTEMS · STAGE 01", [
  {
    key: "model-gag-twins",
    title: "Same question, second opinion",
    headline: ["Same question.", "Different answer."],
    punch: "Second opinion. Same doctor.",
    claim: "The model picks from a ranking rather than always taking the top choice, so the same input can come back worded differently on another run. Expect variation.",
    scene: (
      <g>
        {floor}
        {[260, 740].map((x, i) => (
          <g key={x}>
            <Legs x={x} y={480} floor={616} />
            <Torso x={x} y={330} w={170} h={160} fill="#fff" />
            <path d={`M${x - 20} 336 C ${x - 60} 380, ${x - 40} 420, ${x - 10} 426`} fill="none" stroke={D.ink} strokeWidth={4} />
            <circle cx={x - 10} cy={430} r={12} fill={D.greyLight} stroke={D.ink} strokeWidth={3} />
            <Head x={x} y={262} r={62} eyes="sleepy" look={i ? -0.4 : 0.4} mouth="flat" stubble hair="sides" />
            {bubble(i ? x - 150 : x - 90, 80, i ? 230 : 190, i ? "Paris-ish." : "Paris.")}
          </g>
        ))}
        <Sheet x={440} y={420} w={120} h={90} title="SAME Q" lines={2} r={-4} />
      </g>
    ),
  },
  {
    key: "model-gag-goldfish",
    title: "Every conversation is the first",
    headline: ["It doesn't", "remember you."],
    punch: "Every conversation is a first date.",
    claim: "Memory is stored state kept by the software around the model. The model itself carries nothing from one run to the next.",
    scene: (
      <g>
        {floor}
        <rect x={180} y={520} width={640} height={30} rx={4} fill={D.paperDeep} stroke={D.ink} strokeWidth={4} />
        <path d="M260 550 V616 M740 550 V616" {...LINE} strokeWidth={6} />
        <path d="M380 520 C 300 520, 290 300, 390 250 H610 C 710 300, 700 520, 620 520 Z" fill="#DDEBEE" fillOpacity={0.6} stroke={D.ink} strokeWidth={5} />
        <path d="M330 330 H670" stroke={D.teal} strokeWidth={3} opacity={0.6} />
        <path d="M430 420 C 460 370, 560 370, 580 420 C 560 470, 460 470, 430 420 Z M580 420 L630 390 L630 450 Z" fill={D.accent} stroke={D.ink} strokeWidth={4} strokeLinejoin="round" />
        <SleepyEye x={470} y={412} r={11} look={-1} />
        <Label x={510} y={470} text="MODEL" size={13} />
        <g transform="rotate(6 790 300)">
          <rect x={720} y={240} width={170} height={130} fill="#F6E7A8" stroke={D.ink} strokeWidth={3.5} />
          {say(805, 290, "we spoke", 28)}
          {say(805, 326, "yesterday?", 28)}
        </g>
        <Head x={150} y={300} r={56} eyes="saucer" look={1} mouth="o" hair="curly" />
        <Torso x={150} y={360} w={140} h={160} fill={D.teal} />
      </g>
    ),
  },
  {
    key: "model-gag-parrot",
    title: "Confidence is a writing style",
    headline: ["It sounds sure.", "It learned to."],
    punch: "Confidence is a writing style.",
    claim: "A confident tone is a pattern in the text the model was trained on, not a report on how reliable this answer is. If you want a truth check, something else has to do it.",
    scene: (
      <g>
        {floor}
        <path d="M380 616 L400 380 H600 L620 616 Z" fill={D.paperDeep} stroke={D.ink} strokeWidth={5} strokeLinejoin="round" />
        <Label x={500} y={470} text="KEYNOTE" size={18} />
        <path d="M470 380 L520 300" {...LINE} strokeWidth={5} />
        <ellipse cx={524} cy={292} rx={14} ry={10} fill={D.ink} />
        <path d="M430 300 C 410 220, 440 150, 500 140 C 560 150, 580 210, 560 300 Z" fill="#6FA38F" stroke={D.ink} strokeWidth={5} />
        <path d="M430 300 L400 370 L450 330 Z" fill="#6FA38F" stroke={D.ink} strokeWidth={4} />
        <path d="M530 196 C 570 196, 580 222, 552 234 C 560 216, 546 206, 530 210 Z" fill={D.accent} stroke={D.ink} strokeWidth={4} strokeLinejoin="round" />
        <SleepyEye x={512} y={188} r={10} look={1} />
        <path d="M456 230 L470 300 L484 230" fill={D.ink} />
        {bubble(600, 120, 330, "Studies show, clearly,", 26)}
        {say(760, 250, "(no studies)", 24, D.greyLight)}
        {[120, 190, 860].map((x) => (
          <g key={x}>
            <Head x={x} y={540} r={40} eyes="closed" mouth="o" hair={x === 190 ? "curly" : "strands"} />
          </g>
        ))}
      </g>
    ),
  },
]);

/* ── 02 · Retrieval ────────────────────────────────────────────────── */

export const RAG_GAGS = frames("SYSTEMS · STAGE 02", [
  {
    key: "rag-gag-turkey",
    title: "Close in meaning, wrong answer",
    headline: ["Similar isn't", "the answer."],
    punch: "Close in meaning. Wrong country.",
    claim: "Two passages can be close in an embedding space and still answer different questions. Similar is not correct.",
    scene: (
      <g>
        {floor}
        <rect x={0} y={440} width={1000} height={60} fill={D.paperDeep} stroke={D.ink} strokeWidth={5} />
        <Head x={270} y={290} r={62} eyes="tt" mouth="flat" stubble hair="messy" />
        <Torso x={270} y={352} w={170} h={92} fill={D.grey} />
        <Limb d="M350 400 C 400 410, 430 404, 460 392" />
        <g transform="rotate(-6 520 380)">
          <rect x={450} y={320} width={170} height={120} fill={D.accent} stroke={D.ink} strokeWidth={4.5} />
          {say(535, 370, "How to roast", 24, "#fff")}
          {say(535, 402, "a turkey", 28, "#fff")}
        </g>
        <Head x={800} y={280} r={60} eyes="saucer" look={-1} mouth="flat" hair="curly" />
        <Torso x={800} y={340} w={170} h={104} fill={D.teal} />
        {bubble(630, 60, 330, "Turkey visa rules?", 28)}
        <Label x={270} y={560} text="98% SIMILAR" size={16} color={D.accent} />
      </g>
    ),
  },
  {
    key: "rag-gag-citation",
    title: "Now wrong, with a citation",
    headline: ["It didn't fix it.", "It footnoted it."],
    punch: "Wrong, now with a citation.",
    claim: "Retrieval does not guarantee the evidence is relevant, current or correct, or that the model uses it well. Given a wrong document, it is wrong with a source attached, which is harder to catch.",
    scene: (
      <g>
        {floor}
        <Legs x={420} y={470} floor={616} />
        <Torso x={420} y={300} w={190} h={180} fill="#fff" tie />
        <Head x={420} y={230} r={62} eyes="smug" look={0.4} mouth="smirk" hair="sides" />
        <Limb d="M512 350 C 560 320, 580 280, 580 240" fill="#fff" />
        <g transform="rotate(8 650 230)">
          <rect x={570} y={120} width={250} height={210} fill="#fff" stroke={D.ink} strokeWidth={4.5} />
          {say(695, 170, "The moon is", 28)}
          {say(695, 206, "cheese.¹", 30, D.accent)}
          <path d="M600 250 H790" stroke={D.greyLight} strokeWidth={2.5} />
          <text x={600} y={290} className="ill-mono" fontSize={14} fontWeight={700} fill={D.ink}>¹ cheese-weekly.pdf</text>
        </g>
        <Head x={130} y={430} r={46} eyes="saucer" look={1} mouth="o" hair="curly" />
        <Torso x={130} y={476} w={120} h={144} fill={D.teal} />
      </g>
    ),
  },
  {
    key: "rag-gag-detective",
    title: "Walk the stages first",
    headline: ["Before blaming", "the model"],
    punch: "Five suspects. It's usually the first four.",
    claim: "When a grounded answer is wrong, walk the stages: never indexed, not returned, ranked below the cut, dropped in assembly, or not used. Only the last is a model problem.",
    scene: (
      <g>
        {floor}
        {["INDEXED?", "FOUND?", "RANKED?", "PACKED?", "USED?"].map((t, i) => (
          <g key={t}>
            <rect x={40 + i * 186} y={430} width={160} height={70} rx={4} fill={i === 4 ? D.accent : "#fff"} stroke={D.ink} strokeWidth={4} />
            <text x={120 + i * 186} y={474} textAnchor="middle" className="ill-mono" fontSize={20} fontWeight={700} fill={i === 4 ? "#fff" : D.ink}>
              {t}
            </text>
          </g>
        ))}
        {[0, 1, 2, 3].map((i) => (
          <path key={i} d={`M${130 + i * 186} 520 l10 30 l10 -30 M${150 + i * 186} 560 l10 30 l10 -30`} stroke={D.greyLight} strokeWidth={3} fill="none" />
        ))}
        <Head x={300} y={250} r={56} eyes="sleepy" look={-0.6} mouth="flat" stubble />
        <path d="M236 220 Q300 150 364 220 L380 232 Q300 210 220 232 Z" fill="#B08A55" stroke={D.ink} strokeWidth={4} />
        <Torso x={300} y={306} w={150} h={116} fill="#B08A55" />
        <g transform="rotate(-20 420 320)">
          <circle cx={440} cy={320} r={44} fill="#DDEBEE" fillOpacity={0.5} stroke={D.ink} strokeWidth={6} />
          <path d="M474 350 L530 400" {...LINE} strokeWidth={12} />
        </g>
        {say(780, 300, "the model", 28, D.greyLight)}
        {say(780, 336, "(innocent, mostly)", 26, D.greyLight)}
      </g>
    ),
  },
]);

/* ── 03 · Prompting ────────────────────────────────────────────────── */

export const PROMPT_GAGS = frames("SYSTEMS · STAGE 03", [
  {
    key: "prompt-gag-kitchen",
    title: "Nobody tastes it after",
    headline: ["Asked. Cooked.", "Nobody tasted."],
    punch: "The order said NO NUTS. Nobody checked.",
    claim: "Generation is conditioned by the instruction, and no separate step afterwards verifies that the output satisfied it.",
    scene: (
      <g>
        {floor}
        <rect x={0} y={380} width={1000} height={40} fill={D.paperDeep} stroke={D.ink} strokeWidth={5} />
        <Head x={170} y={230} r={58} eyes="saucer" look={1} mouth="o" hair="curly" />
        <Torso x={170} y={288} w={150} h={96} fill={D.teal} />
        {bubble(40, 40, 260, "NO NUTS!!!", 32)}
        <ellipse cx={520} cy={372} rx={120} ry={20} fill="#fff" stroke={D.ink} strokeWidth={4.5} />
        <path d="M430 364 C 450 320, 590 320, 610 364 Z" fill="#E2C9A0" stroke={D.ink} strokeWidth={4} />
        {[470, 500, 530, 560, 515].map((x, i) => (
          <ellipse key={i} cx={x} cy={i === 4 ? 330 : 348} rx={12} ry={8} fill="#B08A55" stroke={D.ink} strokeWidth={2.5} />
        ))}
        <Label x={520} y={300} text="EXTRA NUTS" size={14} color={D.accent} r={-4} />
        <Head x={830} y={220} r={58} eyes="closed" mouth="smirk" stubble />
        <path d="M770 190 C 770 120, 890 120, 890 190 Z" fill="#fff" stroke={D.ink} strokeWidth={4.5} />
        <Torso x={830} y={280} w={150} h={104} fill="#fff" />
        {say(830, 500, "(the taster is on holiday)", 26, D.greyLight)}
      </g>
    ),
  },
  {
    key: "prompt-gag-santa",
    title: "A wish list is not a contract",
    headline: ["A wish list", "isn't a contract."],
    punch: "Dear model, please be JSON. Love, me.",
    claim: "A prompt tells the model what you want. A contract gives software something it can check, and reject.",
    scene: (
      <g>
        {floor}
        <g transform="rotate(-5 250 300)">
          <rect x={90} y={120} width={320} height={380} fill="#fff" stroke={D.ink} strokeWidth={4.5} />
          {say(250, 180, "Dear Model,", 32)}
          {say(250, 240, "please ALWAYS", 28)}
          {say(250, 280, "reply in JSON.", 28)}
          {say(250, 340, "I've been good.", 26, D.greyLight)}
          {say(250, 440, "xoxo", 30, D.accent)}
        </g>
        <path d="M530 360 H600" stroke={D.accent} strokeWidth={5} strokeDasharray="6 8" strokeLinecap="round" />
        {say(565, 330, "vs", 34, D.accent)}
        <Legs x={800} y={470} floor={616} />
        <Torso x={800} y={290} w={210} h={190} fill={D.ink} />
        <Head x={800} y={220} r={58} eyes="tt" mouth="flat" stubble />
        <path d="M750 196 H850" stroke={D.ink} strokeWidth={8} />
        <g transform="rotate(4 700 400)">
          <rect x={640} y={340} width={120} height={140} rx={4} fill="#fff" stroke={D.ink} strokeWidth={4} />
          <text x={700} y={372} textAnchor="middle" className="ill-mono" fontSize={14} fontWeight={700} fill={D.ink}>SCHEMA</text>
          <text x={700} y={400} textAnchor="middle" className="ill-mono" fontSize={12} fill={D.ink}>amount: number</text>
          <text x={700} y={424} textAnchor="middle" className="ill-mono" fontSize={12} fill={D.ink}>date: date</text>
        </g>
        <Label x={800} y={560} text="NOT ON THE LIST" size={14} color={D.accent} />
      </g>
    ),
  },
  {
    key: "prompt-gag-stool",
    title: "Read the gap",
    headline: ["The skill is", "noticing."],
    punch: "Ordered a chair. Got a stool. Signed for it.",
    claim: "The real skill is reading the gap between what you asked for and what came back, then deciding what should enforce the difference.",
    scene: (
      <g>
        {floor}
        <g transform="rotate(-4 180 260)">
          <rect x={60} y={140} width={240} height={220} fill="#fff" stroke={D.ink} strokeWidth={4.5} />
          <text x={180} y={176} textAnchor="middle" className="ill-mono" fontSize={16} fontWeight={700} fill={D.ink}>ORDER</text>
          <path d="M140 330 V250 H220 V330 M140 250 V200 H220 V250 M140 290 H220" fill="none" stroke={D.ink} strokeWidth={4} />
        </g>
        <path d="M520 616 L540 470 M660 616 L640 470 M520 470 H660" {...LINE} strokeWidth={8} />
        <ellipse cx={590} cy={466} rx={80} ry={16} fill="#E2C9A0" stroke={D.ink} strokeWidth={4.5} />
        <Head x={840} y={320} r={60} eyes="sleepy" look={-1} mouth="flat" stubble hair="strands" />
        <Torso x={840} y={382} w={160} h={160} fill={D.grey} />
        <path d="M800 542 L796 616 M880 542 L884 616" {...LINE} strokeWidth={6} />
        <Limb d="M762 430 C 730 440, 716 440, 700 436" />
        <g transform="rotate(-8 680 430)">
          <rect x={640} y={400} width={70} height={50} fill="#fff" stroke={D.ink} strokeWidth={3} />
          {say(675, 434, "✓ ok", 20, D.accent)}
        </g>
      </g>
    ),
  },
]);

/* ── 04 · Governed execution ───────────────────────────────────────── */

export const GOVERNED_GAGS = frames("SYSTEMS · STAGE 04", [
  {
    key: "governed-gag-paperwork",
    title: "Well-formed is not allowed",
    headline: ["Perfect paperwork.", "Still no."],
    punch: "Every box ticked. Every box irrelevant.",
    claim: "Authorization asks whether an operation is permitted, which is a different question from whether the request is well-formed.",
    scene: (
      <g>
        {floor}
        <rect x={500} y={400} width={500} height={220} fill={D.paperDeep} stroke={D.ink} strokeWidth={5} />
        <Head x={760} y={310} r={60} eyes="tt" mouth="flat" stubble hair="messy" />
        <Torso x={760} y={372} w={160} h={40} fill={D.grey} />
        <g transform="rotate(-4 330 300)">
          <rect x={200} y={140} width={260} height={320} fill="#fff" stroke={D.ink} strokeWidth={4.5} />
          <text x={330} y={176} textAnchor="middle" className="ill-mono" fontSize={16} fontWeight={700} fill={D.ink}>REQUEST 4417</text>
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i}>
              <rect x={220} y={200 + i * 44} width={22} height={22} fill="none" stroke={D.ink} strokeWidth={3} />
              <path d={`M222 ${210 + i * 44} l7 8 l12 -14`} fill="none" stroke={D.teal} strokeWidth={4} strokeLinecap="round" />
              <path d={`M256 ${212 + i * 44} H${430 - (i % 2) * 30}`} stroke={D.greyLight} strokeWidth={3} strokeLinecap="round" />
            </g>
          ))}
        </g>
        <g transform="rotate(-14 390 330)">
          <rect x={290} y={290} width={220} height={70} rx={6} fill="none" stroke={D.accent} strokeWidth={7} />
          <text x={400} y={340} textAnchor="middle" className="ill-sans" fontSize={40} fontWeight={800} fill={D.accent}>DENIED</text>
        </g>
      </g>
    ),
  },
  {
    key: "governed-gag-delivered",
    title: "Delivered, allegedly",
    headline: ["It said", "“delivered.”"],
    punch: "Delivered. To a house. Not yours.",
    claim: "A successful tool call is not proof that the intended effect occurred. Checking what actually happened is its own step.",
    scene: (
      <g>
        {floor}
        <path d="M60 620 V380 L200 280 L340 380 V620 Z" fill="#E2C9A0" stroke={D.ink} strokeWidth={5} strokeLinejoin="round" />
        <rect x={170} y={500} width={60} height={120} fill={D.accent} stroke={D.ink} strokeWidth={4} />
        <Label x={200} y={420} text="No. 12" size={16} />
        <rect x={180} y={570} width={40} height={40} fill="#C9A77C" stroke={D.ink} strokeWidth={3.5} />
        <path d="M660 620 V380 L800 280 L940 380 V620 Z" fill={D.shirt} stroke={D.ink} strokeWidth={5} strokeLinejoin="round" />
        <Label x={800} y={420} text="No. 21" size={16} />
        <Head x={540} y={300} r={58} eyes="saucer" look={-1} mouth="grin" hair="curly" />
        <path d="M486 270 Q540 214 594 270 Z" fill={D.teal} stroke={D.ink} strokeWidth={4} />
        <Torso x={540} y={360} w={150} h={140} fill={D.teal} />
        <Legs x={540} y={500} floor={616} />
        <Limb d="M614 400 C 640 380, 660 360, 668 330" fill={D.teal} />
        <g transform="rotate(10 700 290)">
          <rect x={660} y={240} width={120} height={80} fill="#fff" stroke={D.ink} strokeWidth={3.5} />
          <text x={720} y={270} textAnchor="middle" className="ill-mono" fontSize={13} fontWeight={700} fill={D.ink}>200 OK</text>
          {say(720, 304, "delivered ✓", 22, D.teal)}
        </g>
        {say(800, 240, "you, waiting", 24, D.greyLight)}
      </g>
    ),
  },
]);

/* ── 05 · Human in the loop ────────────────────────────────────────── */

export const HITL_GAGS = frames("SYSTEMS · STAGE 05", [
  {
    key: "hitl-gag-buttons",
    title: "Yes, or yes",
    headline: ["The choice:", "yes, or yes."],
    punch: "Approve. Or also approve.",
    claim: "If a workflow asks a human to decide, at least one meaningful way to say no has to exist. Otherwise the person is a signal, not a decision.",
    scene: (
      <g>
        {floor}
        <rect x={180} y={80} width={640} height={420} rx={14} fill="#fff" stroke={D.ink} strokeWidth={5} />
        <path d="M180 130 H820" stroke={D.ink} strokeWidth={4} />
        {[210, 240, 270].map((x) => (
          <circle key={x} cx={x} cy={105} r={9} fill={D.greyLight} />
        ))}
        <text x={500} y={220} textAnchor="middle" className="ill-sans" fontSize={30} fontWeight={700} fill={D.ink}>Refund all customers?</text>
        <rect x={250} y={320} width={220} height={80} rx={14} fill={D.teal} stroke={D.ink} strokeWidth={4.5} />
        <text x={360} y={372} textAnchor="middle" className="ill-mono" fontSize={26} fontWeight={700} fill="#fff">YES</text>
        <rect x={530} y={320} width={220} height={80} rx={14} fill={D.teal} stroke={D.ink} strokeWidth={4.5} />
        <text x={640} y={372} textAnchor="middle" className="ill-mono" fontSize={24} fontWeight={700} fill="#fff">ALSO YES</text>
        <Head x={500} y={560} r={50} eyes="tt" mouth="flat" stubble hair="strands" />
      </g>
    ),
  },
  {
    key: "hitl-gag-brake",
    title: "Said no, train didn't hear",
    headline: ["Saying no", "has to do something."],
    punch: "Pulled the brake. Kept the brake.",
    claim: "A review step is weak when refusing has no implemented consequence. The no has to change what happens next.",
    scene: (
      <g>
        {floor}
        <rect x={40} y={140} width={700} height={400} rx={20} fill={D.shirt} stroke={D.ink} strokeWidth={5} />
        {[110, 290, 470].map((x) => (
          <rect key={x} x={x} y={200} width={140} height={120} rx={8} fill="#DDEBEE" stroke={D.ink} strokeWidth={4} />
        ))}
        <circle cx={160} cy={560} r={36} fill={D.ink} />
        <circle cx={620} cy={560} r={36} fill={D.ink} />
        <path d="M740 400 L790 400 M770 380 L820 380" stroke={D.greyLight} strokeWidth={5} strokeLinecap="round" />
        {say(460, 110, "AUTOMATION EXPRESS", 30, D.greyLight)}
        <Head x={870} y={330} r={56} eyes="saucer" look={-1} mouth="o" hair="messy" />
        <Torso x={870} y={390} w={150} h={140} fill={D.grey} />
        <path d="M840 530 L834 616 M900 530 L906 616" {...LINE} strokeWidth={6} />
        <Limb d="M800 430 C 780 400, 776 370, 780 344" />
        <path d="M770 344 H800 V300" {...LINE} strokeWidth={6} />
        <rect x={760} y={272} width={60} height={30} rx={6} fill={D.accent} stroke={D.ink} strokeWidth={3.5} />
        <text x={790} y={293} textAnchor="middle" className="ill-mono" fontSize={14} fontWeight={700} fill="#fff">NO</text>
        <path d="M800 300 C 810 280, 830 276, 840 284" fill="none" stroke={D.ink} strokeWidth={3} strokeDasharray="3 5" />
      </g>
    ),
  },
  {
    key: "hitl-gag-stamp",
    title: "Reviewed at the speed of a stamp",
    headline: ["Four hundred", "reviews an hour."],
    punch: "Reviewed at the speed of a stamp.",
    claim: "A person is present and the workflow requires their approval. That is not the same as the person being able to judge: they need the context, the time and real alternatives.",
    scene: (
      <g>
        {floor}
        <rect x={120} y={400} width={760} height={40} fill={D.paperDeep} stroke={D.ink} strokeWidth={5} />
        <path d="M180 440 V616 M820 440 V616" {...LINE} strokeWidth={6} />
        {Array.from({ length: 12 }).map((_, i) => (
          <rect key={i} x={170 + (i % 2) * 6} y={384 - i * 18} width={160} height={16} fill="#fff" stroke={D.ink} strokeWidth={3} />
        ))}
        <Head x={560} y={250} r={60} eyes="closed" mouth="flat" stubble hair="messy" />
        <Torso x={560} y={312} w={170} h={90} fill={D.teal} />
        <Limb d="M640 340 C 690 300, 700 250, 690 200" />
        <rect x={676} y={150} width={30} height={60} rx={10} fill={D.accent} stroke={D.ink} strokeWidth={4} />
        <rect x={656} y={206} width={70} height={24} rx={4} fill={D.ink} />
        <path d="M640 150 l-20 -20 M720 140 l20 -20 M690 120 V96" stroke={D.accent} strokeWidth={4} strokeLinecap="round" />
        {Array.from({ length: 6 }).map((_, i) => (
          <g key={i} transform={`rotate(${(i % 3) * 4 - 4} 820 ${384 - i * 18})`}>
            <rect x={740} y={384 - i * 18} width={140} height={16} fill="#fff" stroke={D.ink} strokeWidth={3} />
            <text x={810} y={397 - i * 18} textAnchor="middle" className="ill-mono" fontSize={10} fontWeight={700} fill={D.accent}>APPROVED</text>
          </g>
        ))}
      </g>
    ),
  },
]);

/* ── 06 · Evaluation ───────────────────────────────────────────────── */

export const EVAL_GAGS = frames("SYSTEMS · STAGE 06", [
  {
    key: "eval-gag-goalposts",
    title: "Goalposts moved after the kick",
    headline: ["Decide what counts", "before you look."],
    punch: "Goalposts, relocated post-kick.",
    claim: "Evaluation compares observed behaviour against an expectation that was written down before the run. Deciding afterwards is not evaluation.",
    scene: (
      <g>
        {floor}
        <path d="M620 620 V300 M860 620 V300 M620 300 H860" {...LINE} strokeWidth={8} />
        <path d="M620 620 L560 600 M860 620 L920 600" stroke={D.ink} strokeWidth={3} strokeDasharray="4 6" />
        <circle cx={450} cy={420} r={30} fill="#fff" stroke={D.ink} strokeWidth={4} />
        <path d="M480 420 L600 380" stroke={D.greyLight} strokeWidth={3} strokeDasharray="6 8" />
        <path d="M430 300 C 520 250, 580 240, 640 250" fill="none" stroke={D.accent} strokeWidth={4} strokeDasharray="6 8" />
        <Head x={760} y={220} r={46} eyes="smug" look={-1} mouth="smirk" hair="sides" />
        <Limb d="M720 270 C 690 280, 660 290, 640 300" fill={D.shirt} />
        <path d="M600 560 l40 -12 M600 600 l40 -12" stroke={D.greyLight} strokeWidth={4} strokeLinecap="round" />
        <Head x={170} y={350} r={56} eyes="saucer" look={1} mouth="grin" hair="curly" />
        <Torso x={170} y={410} w={150} h={130} fill={D.teal} />
        <Legs x={170} y={540} floor={616} />
        <Label x={740} y={150} text="GOAL!" size={20} color={D.accent} />
      </g>
    ),
  },
  {
    key: "eval-gag-homework",
    title: "Grading its own homework",
    headline: ["The model", "marked itself."],
    punch: "Model-graded. Model-approved. A+.",
    claim: "Model-based graders are one of four ways to check, each an approximation of the written judgment. The expensive one, people, is the one the other three stand in for.",
    scene: (
      <g>
        {floor}
        <rect x={200} y={420} width={600} height={30} fill={D.paperDeep} stroke={D.ink} strokeWidth={4.5} />
        <path d="M260 450 V616 M740 450 V616" {...LINE} strokeWidth={6} />
        <g transform="rotate(-3 500 340)">
          <rect x={400} y={260} width={220} height={160} fill="#fff" stroke={D.ink} strokeWidth={4.5} />
          <text x={510} y={296} textAnchor="middle" className="ill-mono" fontSize={14} fontWeight={700} fill={D.ink}>MY ESSAY</text>
          <circle cx={570} cy={370} r={34} fill="none" stroke={D.accent} strokeWidth={5} />
          <text x={570} y={384} textAnchor="middle" className="ill-sans" fontSize={34} fontWeight={800} fill={D.accent}>A+</text>
          {say(470, 360, "“great work”", 20, D.accent)}
        </g>
        <Head x={300} y={280} r={60} eyes="closed" mouth="grin" hair="curly" />
        <Torso x={300} y={342} w={160} h={80} fill={D.teal} />
        <Limb d="M372 380 C 400 380, 420 376, 440 368" />
        <path d="M440 368 L470 340" stroke={D.accent} strokeWidth={6} strokeLinecap="round" />
        <Head x={840} y={330} r={48} eyes="tt" mouth="flat" stubble hair="bun" />
        <Torso x={840} y={380} w={130} h={240} fill={D.grey} />
        {say(840, 250, "(the teacher)", 24, D.greyLight)}
      </g>
    ),
  },
  {
    key: "eval-gag-dashboard",
    title: "Tracked everything, decided nothing",
    headline: ["A metric should", "change a decision."],
    punch: "Tracked everything. Decided nothing.",
    claim: "A retained metric should say what is measured, on what population, over what period, how it was produced, and which decision changes if it moves.",
    scene: (
      <g>
        {floor}
        {Array.from({ length: 12 }).map((_, i) => {
          const x = 90 + (i % 4) * 210;
          const y = 60 + Math.floor(i / 4) * 150;
          return (
            <g key={i}>
              <rect x={x} y={y} width={180} height={120} rx={6} fill="#fff" stroke={D.ink} strokeWidth={4} />
              {i % 3 === 0 ? (
                <path d={`M${x + 20} ${y + 90} L${x + 60} ${y + 50} L${x + 100} ${y + 70} L${x + 160} ${y + 30}`} fill="none" stroke={D.teal} strokeWidth={4} />
              ) : i % 3 === 1 ? (
                <path d={`M${x + 30} ${y + 95} A 60 60 0 0 1 ${x + 150} ${y + 95} M${x + 90} ${y + 95} L${x + 130} ${y + 55}`} fill="none" stroke={D.accent} strokeWidth={4} />
              ) : (
                <text x={x + 90} y={y + 78} textAnchor="middle" className="ill-sans" fontSize={34} fontWeight={800} fill={D.ink}>
                  {["94%", "3.2k", "↑7", "0.81"][i % 4]}
                </text>
              )}
            </g>
          );
        })}
        <Head x={500} y={560} r={50} eyes="closed" mouth="o" stubble hair="strands" />
        {say(620, 540, "z z z", 32, D.greyLight, "start")}
      </g>
    ),
  },
]);

/* ── 07 · Handoff ──────────────────────────────────────────────────── */

export const HANDOFF_GAGS = frames("SYSTEMS · STAGE 07", [
  {
    key: "handoff-gag-map",
    title: "The treasure map",
    headline: ["The handoff note", "was a treasure map."],
    punch: "Thirty-five landmarks. Thirty-four demolished.",
    claim: "In this repository's long-running handoff document, the list headed Key files touched names thirty-five paths, and thirty-four of them do not exist at the commit the article cites.",
    scene: (
      <g>
        {floor}
        <g transform="rotate(-4 280 300)">
          <rect x={60} y={80} width={420} height={420} fill="#EAD8B0" stroke={D.ink} strokeWidth={4.5} />
          {Array.from({ length: 7 }).map((_, i) => (
            <g key={i}>
              <path d={`M${110 + (i % 3) * 120} ${150 + Math.floor(i / 3) * 110} l20 20 m0 -20 l-20 20`} stroke={D.accent} strokeWidth={5} strokeLinecap="round" />
              <text x={120 + (i % 3) * 120} y={196 + Math.floor(i / 3) * 110} textAnchor="middle" className="ill-mono" fontSize={11} fontWeight={700} fill={D.ink}>
                {["api.ts", "old.md", "v2/", "cfg", "run.sh", "db/", "x.py"][i]}
              </text>
            </g>
          ))}
          <path d="M100 460 C 200 400, 260 470, 380 380" fill="none" stroke={D.ink} strokeWidth={3} strokeDasharray="6 8" />
        </g>
        {[600, 720, 840].map((x) => (
          <ellipse key={x} cx={x} cy={610} rx={50} ry={12} fill={D.ink} />
        ))}
        <Head x={720} y={320} r={58} eyes="saucer" look={0} mouth="flat" hair="messy" />
        <Torso x={720} y={380} w={150} h={140} fill={D.teal} />
        <Legs x={720} y={520} floor={600} />
        <Limb d="M800 420 C 830 450, 850 480, 856 520" />
        <path d="M852 520 L880 600 M860 600 H900" {...LINE} strokeWidth={6} />
        {say(870, 260, "404", 36, D.accent)}
      </g>
    ),
  },
  {
    key: "handoff-gag-rerun",
    title: "Watching the rerun",
    headline: ["The replay", "isn't the plan."],
    punch: "Watched the whole rerun. Still no plan.",
    claim: "Replay reconstructs a past execution from what was recorded. Continuity preserves enough current truth for work to continue from here.",
    scene: (
      <g>
        {floor}
        <rect x={80} y={120} width={440} height={300} rx={20} fill={D.grey} stroke={D.ink} strokeWidth={5} />
        <rect x={110} y={150} width={380} height={240} rx={10} fill="#DDEBEE" stroke={D.ink} strokeWidth={4} />
        {say(300, 220, "Episode 1 of 312:", 26)}
        {say(300, 262, "“we try Postgres”", 26)}
        <path d="M260 420 L240 470 M340 420 L360 470" {...LINE} strokeWidth={6} />
        <path d="M600 470 C 600 400, 900 400, 900 470 L910 540 H590 Z" fill={D.accent} stroke={D.ink} strokeWidth={5} strokeLinejoin="round" />
        <Head x={750} y={340} r={58} eyes="sleepy" look={-1} mouth="flat" stubble hair="strands" />
        <Torso x={750} y={400} w={150} h={80} fill={D.grey} />
        <ellipse cx={820} cy={430} rx={40} ry={20} fill="#fff" stroke={D.ink} strokeWidth={3.5} />
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={806 + i * 12} cy={424} r={6} fill="#E8C766" stroke={D.ink} strokeWidth={2} />
        ))}
        <Label x={750} y={250} text="DAY 9" size={14} color={D.greyLight} />
      </g>
    ),
  },
  {
    key: "handoff-gag-potato",
    title: "Nobody holding it",
    headline: ["A handoff moves", "the responsibility."],
    punch: "Everyone touched it. Nobody owns it.",
    claim: "A handoff changes who or what is responsible for the next transition. If the note doesn't name the owner, the next step belongs to nobody.",
    scene: (
      <g>
        {floor}
        {[160, 500, 840].map((x, i) => (
          <g key={x}>
            <Legs x={x} y={480} floor={616} />
            <Torso x={x} y={330} w={140} h={160} fill={[D.teal, D.grey, D.shirt][i]} />
            <Head x={x} y={262} r={56} eyes={i === 1 ? "saucer" : "sleepy"} look={i === 0 ? 1 : i === 2 ? -1 : 0} mouth="flat" hair={(["curly", "messy", "sides"] as const)[i]} />
            <path d={`M${x - 56} 380 L${x - 100} ${300} M${x + 56} 380 L${x + 100} 300`} {...LINE} strokeWidth={5} />
          </g>
        ))}
        <g transform="translate(330 150) rotate(-20)">
          <ellipse cx={0} cy={0} rx={44} ry={30} fill="#C9A77C" stroke={D.ink} strokeWidth={4} />
          <circle cx={-12} cy={-6} r={3} fill={D.ink} />
          <circle cx={14} cy={8} r={3} fill={D.ink} />
        </g>
        <path d="M290 200 l-14 -16 M330 110 V86 M372 130 l16 -14" stroke={D.accent} strokeWidth={4} strokeLinecap="round" />
        <Label x={330} y={80} text="NEXT STEP" size={14} color={D.accent} />
      </g>
    ),
  },
]);

/* ── 08 · Readiness ────────────────────────────────────────────────── */

export const READY_GAGS = frames("SYSTEMS · STAGE 08", [
  {
    key: "ready-gag-parachute",
    title: "Tested from a chair",
    headline: ["Ready for", "which drop?"],
    punch: "Tested from a chair. Deployed from a plane.",
    claim: "A system is not ready in general. It is ready, or not, for a particular exposure to a particular use.",
    scene: (
      <g>
        {floor}
        <path d="M120 616 L130 500 M230 616 L220 500 M120 500 H230 M126 500 V420 M224 500 V420" {...LINE} strokeWidth={6} />
        <Head x={175} y={340} r={48} eyes="sleepy" mouth="flat" stubble />
        <path d="M110 330 C 110 250, 240 250, 240 330" fill="#E8CFC0" stroke={D.ink} strokeWidth={4} />
        <Torso x={175} y={384} w={110} h={40} fill={D.teal} />
        <Label x={175} y={460} text="TEST RIG" size={13} />
        <path d="M480 80 H980 L940 140 H520 Z" fill={D.greyLight} stroke={D.ink} strokeWidth={5} strokeLinejoin="round" />
        <path d="M600 140 L620 180 M860 140 L840 180" {...LINE} strokeWidth={4} />
        <circle cx={700} cy={112} r={12} fill="#fff" stroke={D.ink} strokeWidth={3} />
        <circle cx={760} cy={112} r={12} fill="#fff" stroke={D.ink} strokeWidth={3} />
        <Head x={740} y={330} r={52} eyes="saucer" look={0} mouth="o" hair="messy" />
        <Torso x={740} y={380} w={130} h={120} fill={D.teal} />
        <path d="M676 400 L620 340 M804 400 L860 340" {...LINE} strokeWidth={5} />
        <path d="M740 500 L720 580 M740 500 L770 576" {...LINE} strokeWidth={5} />
        <Label x={740} y={230} text="PROD" size={16} color={D.accent} />
      </g>
    ),
  },
  {
    key: "ready-gag-target",
    title: "Target painted after",
    headline: ["Set the bar", "before the shot."],
    punch: "Bullseye. Target painted afterwards.",
    claim: "Define an explicit release criterion against an evaluation set that fits the intended use and its failure consequences, before exposure rather than after.",
    scene: (
      <g>
        {floor}
        <rect x={560} y={80} width={380} height={420} fill="#C9B593" stroke={D.ink} strokeWidth={5} />
        <path d="M700 240 L760 250" {...LINE} strokeWidth={5} />
        <path d="M760 250 l14 -10 l-4 14 Z" fill={D.ink} />
        {[70, 48, 26].map((r, i) => (
          <circle key={r} cx={690} cy={240} r={r} fill={i === 1 ? "#fff" : "none"} stroke={D.accent} strokeWidth={8} />
        ))}
        <circle cx={690} cy={240} r={10} fill={D.accent} />
        <path d="M630 170 C 660 160, 700 166, 720 180" fill="none" stroke={D.accent} strokeWidth={3} opacity={0.5} />
        <Head x={420} y={270} r={58} eyes="smug" look={1} mouth="smirk" hair="sides" />
        <Torso x={420} y={332} w={150} h={160} fill={D.shirt} tie />
        <Legs x={420} y={492} floor={616} />
        <Limb d="M494 380 C 540 350, 580 300, 610 260" fill={D.shirt} />
        <path d="M606 262 L630 240" stroke={D.accent} strokeWidth={10} strokeLinecap="round" />
        <rect x={470} y={570} width={60} height={46} fill={D.accent} stroke={D.ink} strokeWidth={3.5} />
        <path d="M120 300 H300" stroke={D.greyLight} strokeWidth={3} strokeDasharray="6 8" />
        {say(160, 260, "(the bow)", 24, D.greyLight)}
      </g>
    ),
  },
  {
    key: "ready-gag-undo",
    title: "The undo button",
    headline: ["What can", "actually be undone?"],
    punch: "The undo button. Connected to nothing.",
    claim: "Before exposure, name what can really be reversed and how. In this repository, when checks that run after a draft is placed fail, the previous state of the affected files is restored.",
    scene: (
      <g>
        {floor}
        <rect x={380} y={400} width={240} height={220} fill={D.shirt} stroke={D.ink} strokeWidth={5} />
        <ellipse cx={500} cy={392} rx={100} ry={28} fill={D.ink} />
        <ellipse cx={500} cy={378} rx={90} ry={30} fill={D.accent} stroke={D.ink} strokeWidth={5} />
        <text x={500} y={520} textAnchor="middle" className="ill-sans" fontSize={44} fontWeight={800} fill={D.ink}>UNDO</text>
        <path d="M620 560 C 700 560, 720 600, 800 600" fill="none" stroke={D.ink} strokeWidth={5} />
        <path d="M800 590 V610 M790 600 H810" stroke={D.ink} strokeWidth={4} />
        <rect x={830} y={560} width={120} height={60} fill="#fff" stroke={D.ink} strokeWidth={4} />
        <text x={890} y={596} textAnchor="middle" className="ill-mono" fontSize={14} fontWeight={700} fill={D.greyLight}>NO SOCKET</text>
        <Head x={190} y={300} r={58} eyes="saucer" look={1} mouth="flat" hair="curly" />
        <Torso x={190} y={360} w={150} h={150} fill={D.teal} />
        <Legs x={190} y={510} floor={616} />
        <Limb d="M264 400 C 320 390, 360 380, 400 372" />
        {say(500, 200, "click. click. click.", 30, D.greyLight)}
      </g>
    ),
  },
]);
