import React from "react";
import { C, PlateShell, Model, Gate, Courier, Ledger, Hand, Arrow, Strike } from "./kit";

/**
 * Chapter plates for "From Agent Intent to Governed Execution": the landscape
 * vignettes that open each section of the article, the way a storybook opens
 * a chapter. They are composed for a 760-wide reading column and draw the same
 * cast as the walkthrough frames, with text sized to survive a phone.
 */

type PlateProps = { label: string };

export function PlateGovernedCast({ label }: PlateProps) {
  return (
    <PlateShell label={label} h={250}>
      <Model x={18} y={34} s={0.72} />
      <Arrow x1={168} x2={222} y={128} verb="asks" />
      <Gate x={228} y={52} s={0.62} counter="" />
      <Arrow x1={388} x2={436} y={128} verb="decides" />
      <Courier x={440} y={74} s={0.6} />
      <Arrow x1={592} x2={632} y={146} verb="does" verbY={182} />
      <Ledger x={634} y={98} s={0.4} />
      <Hand x={692} y={218} size={28} color={C.teal} anchor="middle">remembers</Hand>
    </PlateShell>
  );
}

export function PlateGovernedPermission({ label }: PlateProps) {
  return (
    <PlateShell label={label} h={250}>
      <Model x={70} y={38} s={0.8} arm="up" />
      <g transform="rotate(-6 276 60)">
        <rect x={222} y={30} width={112} height={62} rx={6} fill={C.card} stroke={C.ink} strokeWidth={3.5} />
        <rect x={270} y={22} width={16} height={12} rx={2} fill={C.ink} />
        <circle cx={242} cy={60} r={9} fill={C.wash} stroke={C.ink} strokeWidth={3} />
        <Hand x={292} y={68} size={21} color={C.teal} anchor="middle">logged in</Hand>
      </g>
      <path
        d="M362 40 H538 Q560 40 560 62 V76 L608 70 L560 98 V118 Q560 140 538 140 H362 Q340 140 340 118 V62 Q340 40 362 40 Z"
        fill={C.card}
        stroke={C.ink}
        strokeWidth={3.5}
        strokeLinejoin="round"
      />
      <Hand x={356} y={82} size={30}>Lovely. That&#39;s</Hand>
      <Hand x={356} y={120} size={28} color={C.accent}>not what I asked.</Hand>
      <Gate x={560} y={34} s={0.78} counter="" />
    </PlateShell>
  );
}

export function PlateGovernedUncertainty({ label }: PlateProps) {
  return (
    <PlateShell label={label} h={260}>
      <circle cx={380} cy={130} r={78} fill={C.card} stroke={C.ink} strokeWidth={4} />
      <circle cx={380} cy={130} r={60} fill="none" stroke={C.rule} strokeWidth={2.5} strokeDasharray="2 8" strokeLinecap="round" />
      <path d="M435 75 L447 63 M325 75 L313 63 M325 185 L313 197 M435 185 L447 197" stroke={C.ink} strokeWidth={4} strokeLinecap="round" />
      <path d="M380 130 L423 87" stroke={C.accent} strokeWidth={6} strokeLinecap="round" />
      <circle cx={380} cy={130} r={10} fill={C.ink} />

      <text x={290} y={62} textAnchor="end" className="ill-mono" fontSize={24} fontWeight={600} fill={C.ink}>ALLOW</text>
      <Hand x={290} y={94} size={28} color={C.teal} anchor="end">a receipt</Hand>
      <text x={470} y={62} className="ill-mono" fontSize={24} fontWeight={600} fill={C.accent}>ASK</text>
      <Hand x={470} y={94} size={28} color={C.teal}>a question, and why</Hand>
      <text x={290} y={196} textAnchor="end" className="ill-mono" fontSize={24} fontWeight={600} fill={C.ink}>DENY</text>
      <Hand x={290} y={228} size={28} color={C.teal} anchor="end">a reason code</Hand>
      <text x={470} y={196} className="ill-mono" fontSize={24} fontWeight={600} fill={C.ink}>DEFER</text>
      <Hand x={470} y={228} size={28} color={C.teal}>a handoff note</Hand>
    </PlateShell>
  );
}

export function PlateGovernedVerification({ label }: PlateProps) {
  return (
    <PlateShell label={label} h={280}>
      <path
        d="M40 12 H140 Q160 12 160 32 V48 Q160 68 140 68 H126 L116 90 L108 68 H40 Q20 68 20 48 V32 Q20 12 40 12 Z"
        fill={C.card}
        stroke={C.ink}
        strokeWidth={3.5}
        strokeLinejoin="round"
      />
      <Hand x={90} y={52} size={32} anchor="middle">All done!</Hand>
      <Courier x={60} y={76} s={0.8} />
      <Ledger x={330} y={50} s={0.95} />
      <circle cx={534} cy={176} r={64} fill={C.card} fillOpacity={0.12} stroke={C.teal} strokeWidth={6} />
      <path d="M580 222 C 588 230, 596 240, 606 252" stroke={C.teal} strokeWidth={9} strokeLinecap="round" />
      <Hand x={630} y={104} size={34} color={C.accent}>&hellip;is it,</Hand>
      <Hand x={630} y={140} size={34} color={C.accent}>though?</Hand>
    </PlateShell>
  );
}

export function PlateGovernedFailureClasses({ label }: PlateProps) {
  const rows = [
    ["Policy denied it", "was the rule right?"],
    ["The tool errored", "fix it, or retry it"],
    ["Verification failed", "the tool fibbed, or wrong check"],
    ["Evidence was missing", "go and get it"],
    ["Over time or budget", "raise the limit, or don't"],
  ];
  return (
    <PlateShell label={label} h={280}>
      <g transform="translate(30 18) scale(0.58)">
        <path d="M100 60 L320 56" stroke={C.line} strokeWidth={6} strokeLinecap="round" />
        <path d="M182 56 Q210 34 238 56" fill="none" stroke={C.line} strokeWidth={4.5} strokeLinecap="round" />
        <path d="M116 66 L304 64 L286 290 L134 292 Z" fill={C.card} stroke={C.line} strokeWidth={4.5} strokeLinejoin="round" />
        <rect x={144} y={140} width={132} height={46} fill={C.paper} stroke={C.line} strokeWidth={3} />
        <text x={210} y={171} textAnchor="middle" className="ill-mono" fontSize={20} fontWeight={600} fill={C.muted}>IT BROKE</text>
      </g>
      <Strike x={62} y={120} w={180} width={6} />
      <Hand x={154} y={238} size={26} color={C.body} anchor="middle">{"“…and then the"}</Hand>
      <Hand x={154} y={266} size={26} color={C.body} anchor="middle">{"agent just…”"}</Hand>

      {rows.map(([title, note], i) => {
        const y = 30 + i * 52;
        return (
          <g key={title}>
            <g transform={`translate(282 ${y - 22}) scale(0.5)`}>
              <rect x={22} y={2} width={44} height={24} fill={C.card} stroke={C.ink} strokeWidth={3} />
              <path d="M4 16 L84 16 L76 52 L12 52 Z" fill={C.wash} stroke={C.ink} strokeWidth={4} strokeLinejoin="round" />
            </g>
            <text x={336} y={y} className="ill-sans" fontSize={22} fontWeight={800} fill={C.ink}>{title}</text>
            <Hand x={336} y={y + 25} size={26} color={C.accent}>{note}</Hand>
          </g>
        );
      })}
    </PlateShell>
  );
}

export function PlateGovernedClose({ label }: PlateProps) {
  return (
    <PlateShell label={label} h={280}>
      <g transform="translate(-12.4 -165.2) scale(0.6)">
        <path
          d="M90 392 C 66 392, 64 350, 100 346 C 104 312, 150 302, 170 322 C 190 292, 250 294, 262 324 C 292 308, 336 324, 330 354 C 360 358, 360 392, 330 392 Z"
          fill={C.card}
          stroke={C.ink}
          strokeWidth={5}
          strokeLinejoin="round"
        />
        <path d="M120 408 L112 432 M170 408 L162 432 M220 408 L212 432 M270 408 L262 432 M318 408 L310 432 M146 446 L138 468 M196 446 L188 468 M246 446 L238 468 M296 446 L288 468" stroke={C.teal} strokeWidth={4.5} strokeLinecap="round" />
      </g>
      <Hand x={226} y={44} size={26} color={C.accent}>&larr; variation lives here</Hand>
      <Model x={40} y={118} s={0.7} lines={["refund $40?", "…or $41?"]} />
      <Gate x={300} y={110} s={0.62} counter="" />
      <g transform="translate(66 -197) scale(0.62)">
        <path
          d="M700 560 Q852 402 1004 560 Q978 540 953 560 Q928 540 903 560 Q878 540 852 560 Q826 540 801 560 Q776 540 751 560 Q726 540 700 560 Z"
          fill={C.teal}
          stroke={C.ink}
          strokeWidth={5}
          strokeLinejoin="round"
        />
        <path d="M852 474 L852 598" stroke={C.ink} strokeWidth={5} strokeLinecap="round" />
      </g>
      <Ledger x={510} y={168} s={0.55} was="$120" now="$80" />
      <Hand x={690} y={44} size={26} color={C.teal} anchor="middle">same answer,</Hand>
      <Hand x={690} y={72} size={26} color={C.teal} anchor="middle">every time</Hand>
    </PlateShell>
  );
}
