import React from "react";
import {
  C,
  FrameShell,
  Model,
  Gate,
  Courier,
  Ledger,
  Person,
  Hand,
  Para,
  Strike,
  Arrow,
} from "./kit";

/**
 * The nine frames of the "From Agent Intent to Governed Execution"
 * walkthrough, drawn at the 1080 x 1350 export master.
 *
 * Every claim a frame makes is a claim the owning article makes. Details that
 * are only there to make the scene concrete (the $40 refund, account 88, the
 * $25 auto-limit, Dave) are illustrative and never presented as observed.
 */

export interface FrameProps {
  label: string;
  number: number;
  total: number;
}

/* 01 — Cover */
export function GovernedCover({ label, number, total }: FrameProps) {
  return (
    <FrameShell label={label} chapter="SYSTEMS · STAGE 04" number={number} total={total} headline={[]}>
      <rect x={0} y={0} width={1080} height={8} fill={C.ink} />
      <text x={76} y={150} className="ill-mono" fontSize={16} letterSpacing={3} fill={C.accent}>
        A WALKTHROUGH IN {total} FRAMES
      </text>
      <text className="ill-sans" fontSize={84} fontWeight={800} letterSpacing={-3} fill={C.ink}>
        <tspan x={76} y={250}>From agent</tspan>
        <tspan x={76} y={336}>intent to</tspan>
        <tspan x={76} y={422}>governed</tspan>
        <tspan x={76} y={508}>execution</tspan>
      </text>

      <Model x={640} y={196} s={1.5} />
      <text x={800} y={548} textAnchor="middle" className="ill-mono" fontSize={17} letterSpacing={2} fill={C.muted}>THE MODEL</text>
      <Hand x={800} y={592} size={42} color={C.accent} anchor="middle">can only ask.</Hand>

      <Gate x={76} y={650} />
      <Arrow x1={338} x2={404} y={800} verb="permits" verbY={780} />
      <Courier x={420} y={690} s={1.1} />
      <Arrow x1={700} x2={762} y={820} verb="writes" verbY={800} />
      <Ledger x={770} y={730} s={0.78} was="$120" now="$80" />

      <text className="ill-mono" fontSize={17} letterSpacing={2} fill={C.muted} textAnchor="middle">
        <tspan x={196} y={962}>THE GATE</tspan>
        <tspan x={560} y={962}>THE TOOL</tspan>
        <tspan x={887} y={962}>THE RECORD</tspan>
      </text>

      <Para x={76} y={1014} w={928} h={220} size={34}>
        A model can ask for an action. Something else decides whether that ask becomes a real effect &mdash; and then whether it actually worked.
      </Para>
    </FrameShell>
  );
}

/* 02 — The path */
export function GovernedPath({ label, number, total }: FrameProps) {
  const rows = [
    { y: 450, title: "1. Check the request", note: "a real operation? right types? things that exist?" },
    { y: 630, title: "2. Decide if it's permitted", note: "for this caller, in this context, right now" },
    { y: 810, title: "3. Run it", note: "with whatever limits apply" },
    { y: 990, title: "4. Check what happened", note: "not whether it returned. Whether it's true." },
  ];
  return (
    <FrameShell label={label} chapter="CHAPTER I · THE PATH" number={number} total={total} headline={["Four things happen", "before money moves."]}>
      <Model x={815} y={252} s={0.78} />
      <path d="M880 404 C 700 446, 380 404, 190 452" fill="none" stroke={C.accent} strokeWidth={4} strokeLinecap="round" strokeDasharray="2 14" />
      <path d="M148 580 L148 616 M148 760 L148 796 M148 940 L148 976" stroke={C.accent} strokeWidth={4} strokeLinecap="round" strokeDasharray="2 12" />

      <g>
        <rect x={96} y={466} width={104} height={112} rx={8} fill={C.card} stroke={C.ink} strokeWidth={4} />
        <rect x={126} y={456} width={44} height={18} rx={4} fill={C.ink} />
        <path d="M112 500 L118 506 L128 494 M112 530 L118 536 L128 524 M112 560 L118 566 L128 554" fill="none" stroke={C.teal} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M138 500 L186 500 M138 530 L180 530 M138 560 L184 560" stroke={C.faint} strokeWidth={3.5} strokeLinecap="round" />
      </g>
      <Gate x={85} y={626} s={0.52} counter="" />
      <Courier x={100} y={834} s={0.5} />
      <g>
        <Ledger x={88} y={1004} s={0.4} />
        <circle cx={196} cy={1078} r={20} fill="none" stroke={C.teal} strokeWidth={5} />
        <path d="M210 1092 L226 1108" stroke={C.teal} strokeWidth={7} strokeLinecap="round" />
      </g>

      {rows.map((r) => (
        <g key={r.title}>
          <text x={260} y={r.y + 52} className="ill-sans" fontSize={40} fontWeight={800} letterSpacing={-1} fill={C.ink}>{r.title}</text>
          <Hand x={260} y={r.y + 100} size={34} color={C.teal}>{r.note}</Hand>
        </g>
      ))}

      <Para x={76} y={1156} w={928} h={110} size={28}>
        A sequence, not an architecture. Small systems collapse it into a few lines of code; it still helps to know which line is doing which.
      </Para>
    </FrameShell>
  );
}

/* 03 — Each step fails differently */
export function GovernedFailures({ label, number, total }: FrameProps) {
  return (
    <FrameShell label={label} chapter="CHAPTER I · THE PATH" number={number} total={total} headline={["Each step fails", "in its own way."]}>
      {/* Valid, but not allowed */}
      <g transform="translate(90 330) scale(1.4)">
        <rect x={18} y={8} width={64} height={84} rx={4} fill={C.card} stroke={C.ink} strokeWidth={3} />
        <path d="M28 28 L34 34 L44 22 M28 52 L34 58 L44 46 M28 76 L34 82 L44 70" fill="none" stroke={C.teal} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M52 30 L72 30 M52 54 L72 54 M52 78 L68 78" stroke={C.faint} strokeWidth={3} strokeLinecap="round" />
      </g>
      <g transform="rotate(-9 318 402)">
        <rect x={236} y={370} width={164} height={64} rx={6} fill="none" stroke={C.accent} strokeWidth={5} />
        <text x={318} y={414} textAnchor="middle" className="ill-mono" fontSize={30} fontWeight={600} fill={C.accent}>DENIED</text>
      </g>
      <text x={470} y={390} className="ill-sans" fontSize={36} fontWeight={800} letterSpacing={-1} fill={C.ink}>Valid, but not allowed</text>
      <Hand x={470} y={440} size={36} color={C.accent}>the gate said no. Rightly, or not.</Hand>
      <path d="M76 528 L1004 528" stroke={C.rule} strokeWidth={2} strokeDasharray="4 10" />

      {/* Allowed, but it did not run */}
      <g transform="rotate(-7 160 640)">
        <rect x={84} y={608} width={164} height={64} rx={6} fill="none" stroke={C.teal} strokeWidth={5} />
        <text x={166} y={652} textAnchor="middle" className="ill-mono" fontSize={28} fontWeight={600} fill={C.teal}>ALLOWED</text>
      </g>
      <g transform="rotate(5 336 650)">
        <rect x={272} y={606} width={128} height={86} rx={4} fill={C.card} stroke={C.ink} strokeWidth={4} />
        <text x={336} y={662} textAnchor="middle" className="ill-mono" fontSize={34} fontWeight={600} fill={C.accent}>500</text>
      </g>
      <text x={470} y={650} className="ill-sans" fontSize={36} fontWeight={800} letterSpacing={-1} fill={C.ink}>Allowed, but it didn&#39;t run</text>
      <Hand x={470} y={700} size={36} color={C.accent}>the tool errored, or timed out</Hand>
      <path d="M76 788 L1004 788" stroke={C.rule} strokeWidth={2} strokeDasharray="4 10" />

      {/* It ran. Nothing changed. */}
      <g transform="rotate(-6 150 890)">
        <rect x={86} y={856} width={140} height={78} rx={4} fill={C.card} stroke={C.ink} strokeWidth={4} />
        <text x={156} y={900} textAnchor="middle" className="ill-mono" fontSize={26} fontWeight={600} fill={C.teal}>200 OK</text>
        <path d="M136 914 L146 922 L170 906" fill="none" stroke={C.teal} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <Ledger x={236} y={838} s={0.58} />
      <text x={470} y={910} className="ill-sans" fontSize={36} fontWeight={800} letterSpacing={-1} fill={C.ink}>It ran. Nothing changed.</text>
      <Hand x={470} y={960} size={36} color={C.accent}>the most confident failure of all</Hand>

      <Para x={76} y={1090} w={928} h={150} size={34}>
        A request can be valid but not allowed, allowed but fail to run, and run successfully without producing the effect anyone wanted.
      </Para>
    </FrameShell>
  );
}

/* 04 — Four things that are not permission */
function CredentialCard({
  x,
  y,
  struck,
  labelText,
  labelW,
  notes,
  icon,
}: {
  x: number;
  y: number;
  struck: boolean;
  labelText: string;
  labelW: number;
  notes: string[];
  icon: React.ReactNode;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={452}
        height={244}
        rx={6}
        fill={struck ? C.fadedCard : C.card}
        stroke={struck ? C.fadedBorder : C.ink}
        strokeWidth={struck ? 2.5 : 3}
      />
      <g transform={`translate(${x + 22} ${y + 72})`}>{icon}</g>
      <text x={x + 142} y={y + 100} className="ill-sans" fontSize={32} fontWeight={800} fill={struck ? C.muted : C.ink}>
        {labelText}
      </text>
      {struck && <Strike x={x + 136} y={y + 89} w={labelW + 12} width={4} />}
      {notes.map((n, i) => (
        <Hand key={i} x={x + 142} y={y + 152 + i * 40} size={38} color={struck ? C.ink : C.teal}>
          {n}
        </Hand>
      ))}
    </g>
  );
}

export function GovernedPermission({ label, number, total }: FrameProps) {
  const grey = C.line;
  return (
    <FrameShell label={label} chapter="CHAPTER II · PERMISSION" number={number} total={total} headline={["Four things that", "are not permission."]}>
      <Model x={96} y={300} s={1.25} />
      <path
        d="M400 300 H684 Q712 300 712 328 V356 L792 344 L712 392 V440 Q712 468 684 468 H400 Q372 468 372 440 V328 Q372 300 400 300 Z"
        fill={C.card}
        stroke={C.ink}
        strokeWidth={4}
        strokeLinejoin="round"
      />
      <Hand x={394} y={350} size={38}>Lovely.</Hand>
      <Hand x={394} y={394} size={36}>And may it run &#8212;</Hand>
      <Hand x={394} y={438} size={36} color={C.accent}>for you, here, now?</Hand>
      <Gate x={720} y={290} s={1.18} />

      <CredentialCard
        x={76}
        y={604}
        struck
        labelText="Logged in"
        labelW={160}
        notes={["tells me who.", "Not what."]}
        icon={
          <g>
            <rect x={12} y={22} width={76} height={60} rx={6} fill={C.card} stroke={grey} strokeWidth={3.5} />
            <rect x={42} y={14} width={16} height={12} rx={2} fill={grey} />
            <circle cx={34} cy={48} r={10} fill={C.wash} stroke={grey} strokeWidth={3} />
            <path d="M52 42 L78 42 M52 54 L72 54 M22 70 L78 70" stroke={C.faint} strokeWidth={3} strokeLinecap="round" />
          </g>
        }
      />
      <CredentialCard
        x={552}
        y={604}
        struck
        labelText="Well-formed"
        labelW={196}
        notes={["So is “delete", "production.”"]}
        icon={
          <g>
            <rect x={18} y={8} width={64} height={84} rx={4} fill={C.card} stroke={grey} strokeWidth={3.5} />
            <path d="M28 28 L34 34 L44 22 M28 52 L34 58 L44 46 M28 76 L34 82 L44 70" fill="none" stroke={grey} strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M52 30 L72 30 M52 54 L72 54 M52 78 L68 78" stroke={C.faint} strokeWidth={3} strokeLinecap="round" />
          </g>
        }
      />
      <CredentialCard
        x={76}
        y={878}
        struck
        labelText={"“97% sure”"}
        labelW={178}
        notes={["That's a mood,", "not a permit."]}
        icon={
          <g>
            <path d="M12 70 A38 38 0 0 1 88 70" fill="none" stroke={grey} strokeWidth={4} strokeLinecap="round" />
            <path d="M50 70 L80 46" stroke={grey} strokeWidth={4.5} strokeLinecap="round" />
            <circle cx={50} cy={70} r={5} fill={grey} />
            <text x={50} y={94} textAnchor="middle" className="ill-mono" fontSize={14} fill={grey}>97%</text>
          </g>
        }
      />
      <CredentialCard
        x={552}
        y={878}
        struck={false}
        labelText="A human said yes"
        labelW={0}
        notes={["A way to answer.", "Not the question."]}
        icon={
          <g>
            <path d="M14 14 L86 12 L88 84 L16 88 Z" fill={C.sticky} stroke={C.ink} strokeWidth={3} strokeLinejoin="round" />
            <Hand x={51} y={44} size={22} anchor="middle">Dave:</Hand>
            <Hand x={51} y={70} size={22} anchor="middle">{"“fine!”"}</Hand>
          </g>
        }
      />
      <path
        d="M578 886 C 744 856, 964 866, 1004 924 C 1028 1010, 990 1122, 780 1130 C 596 1134, 542 1082, 548 992 C 552 932, 596 890, 694 874"
        fill="none"
        stroke={C.teal}
        strokeWidth={4}
        strokeLinecap="round"
      />

      <Para x={76} y={1156} w={928} h={100} size={30}>
        A rule in a prompt is a request. A rule at the gate is a check.
      </Para>
    </FrameShell>
  );
}

/* 05 — Four responses to uncertainty */
function Quadrant({ x, y, mode, modeColor = C.ink, when, leaves }: { x: number; y: number; mode: string; modeColor?: string; when: string; leaves: string }) {
  return (
    <Para x={x} y={y} w={300} h={220} size={27} lh={1.24}>
      <span className="ill-mono" style={{ display: "block", fontSize: 34, fontWeight: 600, letterSpacing: 1, color: modeColor, marginBottom: 6 }}>{mode}</span>
      <span style={{ display: "block", marginBottom: 6 }}>{when}</span>
      <span className="ill-hand" style={{ display: "block", fontSize: 38, fontWeight: 700, lineHeight: 1, color: C.teal }}>{leaves}</span>
    </Para>
  );
}

export function GovernedUncertainty({ label, number, total }: FrameProps) {
  return (
    <FrameShell label={label} chapter="CHAPTER III · UNCERTAINTY" number={number} total={total} headline={["“Not sure” isn't", "one answer."]}>
      <rect x={840} y={120} width={92} height={150} rx={14} fill={C.card} stroke={C.line} strokeWidth={4.5} />
      <rect x={866} y={142} width={40} height={106} rx={10} fill="#EFEBE0" stroke={C.line} strokeWidth={3.5} />
      <rect x={870} y={148} width={32} height={44} rx={7} fill={C.line} />
      <text x={886} y={110} textAnchor="middle" className="ill-mono" fontSize={16} fill={C.muted}>YES</text>
      <text x={886} y={296} textAnchor="middle" className="ill-mono" fontSize={16} fill={C.muted}>NO</text>
      <path d="M816 146 C 860 186, 900 218, 958 256" fill="none" stroke={C.accent} strokeWidth={6} strokeLinecap="round" />
      <path d="M818 252 C 866 214, 910 182, 958 146" fill="none" stroke={C.accent} strokeWidth={6} strokeLinecap="round" />
      <Para x={700} y={312} w={304} h={140} size={34} font="hand" lh={1.02} align="center" color={C.body} weight={700}>
        yes/no only: block the useful, or wave the rest through
      </Para>

      <circle cx={540} cy={700} r={140} fill={C.card} stroke={C.ink} strokeWidth={5} />
      <circle cx={540} cy={700} r={112} fill="none" stroke={C.rule} strokeWidth={3} strokeDasharray="2 10" strokeLinecap="round" />
      <path d="M639 601 L655 585 M441 601 L425 585 M441 799 L425 815 M639 799 L655 815" stroke={C.ink} strokeWidth={5} strokeLinecap="round" />
      <path d="M540 700 L616 624" stroke={C.accent} strokeWidth={8} strokeLinecap="round" />
      <circle cx={540} cy={700} r={17} fill={C.ink} />
      <path
        d="M425 585 C 404 572, 392 564, 382 552 M655 585 C 676 572, 688 564, 698 552 M425 815 C 404 828, 392 836, 382 848 M655 815 C 676 828, 688 836, 698 848"
        fill="none"
        stroke={C.ink}
        strokeWidth={3}
        strokeLinecap="round"
        strokeDasharray="1 8"
      />

      <Quadrant x={76} y={468} mode="ALLOW" when="permitted, and the evidence holds" leaves="leaves: a receipt" />
      <Quadrant x={704} y={468} mode="ASK" modeColor={C.accent} when="a person should decide" leaves="leaves: a question, and why" />
      <Quadrant x={76} y={830} mode="DENY" when="not permitted, or too risky" leaves="leaves: a reason code" />
      <Quadrant x={704} y={830} mode="DEFER" when="thin evidence, high stakes" leaves="leaves: a handoff note" />

      <Para x={76} y={1020} w={640} h={100} size={40} font="hand" lh={1} color={C.ink} weight={700}>
        what moves the needle most:<br />how hard is it to undo?
      </Para>
      <Hand x={540} y={1128} size={34} color={C.accent} anchor="middle">the bar for ALLOW rises &#8594;</Hand>
      <path d="M150 1160 C 400 1152, 700 1166, 928 1156" fill="none" stroke={C.ink} strokeWidth={4.5} strokeLinecap="round" />
      <path d="M330 1150 L330 1170 M540 1152 L540 1172 M750 1150 L750 1170" stroke={C.ink} strokeWidth={3.5} strokeLinecap="round" />
      <path d="M102 1160 A20 20 0 1 0 122 1140" fill="none" stroke={C.teal} strokeWidth={4.5} strokeLinecap="round" />
      <path d="M114 1132 L123 1140 L113 1148" fill="none" stroke={C.teal} strokeWidth={4.5} strokeLinecap="round" strokeLinejoin="round" />
      <rect x={944} y={1138} width={60} height={42} rx={3} fill={C.card} stroke={C.ink} strokeWidth={3.5} />
      <path d="M944 1140 L974 1164 L1004 1140" fill="none" stroke={C.ink} strokeWidth={3} strokeLinejoin="round" />
      <text x={76} y={1224} className="ill-sans" fontSize={27} fill={C.body}>undo: one click</text>
      <text x={1004} y={1224} textAnchor="end" className="ill-sans" fontSize={27} fill={C.body}>undo: an apology email</text>
    </FrameShell>
  );
}

/* 06 — Asking a person is a handoff */
export function GovernedHandoff({ label, number, total }: FrameProps) {
  return (
    <FrameShell label={label} chapter="CHAPTER III · UNCERTAINTY" number={number} total={total} headline={["“Ask a human” is a", "handoff, not a shrug."]}>
      <Gate x={76} y={300} s={1.05} />
      <Person x={790} y={290} s={1.05} />
      <text x={895} y={582} textAnchor="middle" className="ill-mono" fontSize={17} letterSpacing={2} fill={C.muted}>A PERSON</text>
      <Arrow x1={360} x2={770} y={430} verb="hands over" verbY={410} />

      <g transform="rotate(-4 280 736)">
        <path d="M96 616 L462 610 L468 856 L100 862 Z" fill={C.sticky} stroke={C.ink} strokeWidth={3} strokeLinejoin="round" />
        <Hand x={282} y={716} size={46} anchor="middle">can you take</Hand>
        <Hand x={282} y={768} size={46} anchor="middle">a look??</Hand>
      </g>
      <Strike x={112} y={742} w={336} width={7} />
      <Hand x={282} y={916} size={34} color={C.muted} anchor="middle">at what, exactly?</Hand>

      <rect x={520} y={604} width={484} height={336} rx={8} fill={C.card} stroke={C.ink} strokeWidth={3.5} />
      <text x={548} y={660} className="ill-mono" fontSize={24} fontWeight={600} letterSpacing={1} fill={C.ink}>REFUND $40 · ACCOUNT 88</text>
      <text className="ill-sans" fontSize={28} fill={C.body}>
        <tspan x={548} y={716}>Over the $25 auto-limit.</tspan>
        <tspan x={548} y={756}>Order #4417 marked delivered.</tspan>
      </text>
      <text x={548} y={830} className="ill-sans" fontSize={34} fontWeight={800} fill={C.ink}>Approve or decline?</text>
      <path d="M548 870 L680 870 M700 870 L840 870" stroke={C.faint} strokeWidth={3} strokeLinecap="round" />
      <text x={614} y={904} textAnchor="middle" className="ill-mono" fontSize={18} fill={C.teal}>APPROVE</text>
      <text x={770} y={904} textAnchor="middle" className="ill-mono" fontSize={18} fill={C.accent}>DECLINE</text>
      <Hand x={1004} y={990} size={32} color={C.teal} anchor="end">a specific question, with the reason</Hand>

      <Para x={76} y={1040} w={928} h={210} size={30}>
        Who reviews it, what they see, and whether they are positioned to say no is its own design problem: human judgment, the next stage of the map.
      </Para>
    </FrameShell>
  );
}

/* 07 — The tool says done */
export function GovernedVerification({ label, number, total }: FrameProps) {
  return (
    <FrameShell label={label} chapter="CHAPTER IV · VERIFICATION" number={number} total={total} headline={["The tool says done.", "The record disagrees."]}>
      <path
        d="M100 272 H238 Q262 272 262 298 V344 Q262 370 238 370 H212 L198 392 L190 370 H100 Q76 370 76 344 V298 Q76 272 100 272 Z"
        fill={C.card}
        stroke={C.ink}
        strokeWidth={4}
        strokeLinejoin="round"
      />
      <Hand x={169} y={336} size={44} anchor="middle">All done!</Hand>
      <Courier x={90} y={350} s={1.45} />
      <Ledger x={560} y={430} s={1.45} />
      <circle cx={872} cy={612} r={94} fill={C.card} fillOpacity={0.12} stroke={C.teal} strokeWidth={7} />
      <path d="M940 678 C 952 690, 962 700, 976 716" stroke={C.teal} strokeWidth={12} strokeLinecap="round" />
      <Hand x={1004} y={788} size={46} color={C.accent} anchor="end">&hellip;is it, though?</Hand>

      <text x={76} y={918} className="ill-sans" fontSize={56} fontWeight={800} letterSpacing={-1.4} fill={C.muted}>reports done</text>
      <Strike x={68} y={898} w={392} width={5.5} />
      <text x={482} y={912} className="ill-sans" fontSize={46} fill={C.accent}>&rarr;</text>
      <text x={548} y={918} className="ill-sans" fontSize={56} fontWeight={800} letterSpacing={-1.4} fill={C.ink}>shows done</text>

      <Para x={76} y={1010} w={928} h={200} size={32}>
        A 200 tells you what the interface said. If what you wanted was a change of state, go and read the state.
      </Para>
    </FrameShell>
  );
}

/* 08 — Classifying what went wrong */
export function GovernedFailureClasses({ label, number, total }: FrameProps) {
  const rows = [
    { y: 318, title: "Policy denied it", notes: ["was the rule right?"] },
    { y: 424, title: "The tool errored", notes: ["fix it, or retry it"] },
    { y: 530, title: "Verification failed", notes: ["the tool fibbed, or you", "checked the wrong thing"] },
    { y: 672, title: "Evidence was missing", notes: ["go and get it"] },
    { y: 778, title: "Over time or budget", notes: ["raise the limit, or don't"] },
  ];
  return (
    <FrameShell label={label} chapter="CHAPTER V · FAILURE" number={number} total={total} headline={["“It broke” is not", "a diagnosis."]}>
      <g transform="translate(0 300)">
        <path d="M100 60 L320 56" stroke={C.line} strokeWidth={6} strokeLinecap="round" />
        <path d="M182 56 Q210 34 238 56" fill="none" stroke={C.line} strokeWidth={4.5} strokeLinecap="round" />
        <path d="M116 66 L304 64 L286 290 L134 292 Z" fill={C.card} stroke={C.line} strokeWidth={4.5} strokeLinejoin="round" />
        <path d="M170 94 L176 266 M210 94 L210 266 M250 94 L244 266" stroke="#D3D6D6" strokeWidth={3} strokeLinecap="round" />
        <rect x={144} y={140} width={132} height={46} fill={C.paper} stroke={C.line} strokeWidth={3} />
        <text x={210} y={171} textAnchor="middle" className="ill-mono" fontSize={20} fontWeight={600} fill={C.muted}>IT BROKE</text>
        <path d="M88 318 C 170 230, 250 150, 340 44" fill="none" stroke={C.accent} strokeWidth={7} strokeLinecap="round" />
        <path d="M156 432 L264 404 M156 404 L264 432" stroke={C.ink} strokeWidth={7} strokeLinecap="round" />
        <path d="M210 408 C 178 390, 190 356, 204 334 C 210 352, 224 356, 224 340 C 244 364, 246 396, 210 408 Z" fill={C.accent} stroke={C.ink} strokeWidth={3.5} strokeLinejoin="round" />
        <path d="M210 402 C 200 392, 204 378, 210 368 C 216 380, 222 390, 210 402 Z" fill={C.sticky} />
      </g>
      <Hand x={76} y={794} size={38} color={C.body}>{"“…and then the"}</Hand>
      <Hand x={76} y={834} size={38} color={C.body}>{"agent just…”"}</Hand>
      <text x={76} y={884} className="ill-sans" fontSize={24} fill={C.muted}>incident review, as storytelling</text>

      {rows.map((r, i) => (
        <g key={r.title}>
          <g transform={`translate(440 ${r.y + 16})`}>
            <rect x={22} y={2} width={44} height={24} fill={C.card} stroke={C.ink} strokeWidth={2.5} />
            <path d="M4 16 L84 16 L76 52 L12 52 Z" fill={C.wash} stroke={C.ink} strokeWidth={3.5} strokeLinejoin="round" />
          </g>
          <text x={546} y={r.y + 46} className="ill-sans" fontSize={30} fontWeight={800} fill={C.ink}>{r.title}</text>
          {r.notes.map((n, j) => (
            <Hand key={j} x={546} y={r.y + 86 + j * 36} size={36} color={C.accent}>{n}</Hand>
          ))}
          {i < rows.length - 1 && (
            <path d={`M440 ${rows[i + 1].y - 4} L1004 ${rows[i + 1].y - 4}`} stroke={C.rule} strokeWidth={2} strokeDasharray="4 10" />
          )}
        </g>
      ))}

      <Para x={76} y={1070} w={928} h={180} size={32}>
        Each tray points somewhere different. You can&#39;t sort a failure at a boundary you never made explicit.
      </Para>
    </FrameShell>
  );
}

/* 09 — What stays probabilistic */
export function GovernedClose({ label, number, total }: FrameProps) {
  return (
    <FrameShell label={label} chapter="CHAPTER VI · WHAT STAYS" number={number} total={total} headline={["The model still varies.", "Your effects needn't."]}>
      <Hand x={374} y={362} size={34} color={C.accent}>&larr; variation lives up here</Hand>
      <path
        d="M90 392 C 66 392, 64 350, 100 346 C 104 312, 150 302, 170 322 C 190 292, 250 294, 262 324 C 292 308, 336 324, 330 354 C 360 358, 360 392, 330 392 Z"
        fill={C.card}
        stroke={C.ink}
        strokeWidth={4.5}
        strokeLinejoin="round"
      />
      <path d="M120 408 L112 432 M170 408 L162 432 M220 408 L212 432 M270 408 L262 432 M318 408 L310 432 M146 446 L138 468 M196 446 L188 468 M246 446 L238 468 M296 446 L288 468" stroke={C.teal} strokeWidth={3.5} strokeLinecap="round" />
      <Model x={100} y={474} lines={["refund $40?", "…or $41?"]} />

      <Gate x={380} y={430} counter="SAME RULES" />

      <path
        d="M700 560 Q852 402 1004 560 Q978 540 953 560 Q928 540 903 560 Q878 540 852 560 Q826 540 801 560 Q776 540 751 560 Q726 540 700 560 Z"
        fill={C.teal}
        stroke={C.ink}
        strokeWidth={4}
        strokeLinejoin="round"
      />
      <path d="M852 474 L852 598" stroke={C.ink} strokeWidth={4} strokeLinecap="round" />
      <Ledger x={712} y={600} s={0.95} was="$120" now="$80" />
      <Hand x={852} y={832} size={34} color={C.teal} anchor="middle">same answer, every time</Hand>

      <Para x={76} y={876} w={928} h={140} size={30}>
        The checks don&#39;t make the model deterministic. They give you a dependable answer about one candidate action: permitted or not, every time.
      </Para>

      <rect x={76} y={1044} width={928} height={184} rx={10} fill={C.card} stroke={C.ink} strokeWidth={3} />
      <text x={110} y={1104} className="ill-sans" fontSize={36} fontWeight={800} letterSpacing={-0.8} fill={C.ink}>Read the whole explanation</text>
      <text className="ill-mono" fontSize={22} fill={C.muted}>
        <tspan x={110} y={1152}>pruningmypothos.com/systems/</tspan>
        <tspan x={110} y={1186}>from-agent-intent-to-governed-execution/</tspan>
      </text>
      <text x={966} y={1150} textAnchor="end" className="ill-sans" fontSize={56} fill={C.accent}>&rarr;</text>
    </FrameShell>
  );
}
