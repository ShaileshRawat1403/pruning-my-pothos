import React from "react";
import type { Deck } from "./types";
import type { FrameProps } from "../templates";
import { CoverTemplate, StepsTemplate, SceneTemplate, CardsTemplate, CloseTemplate } from "../templates";
import { C, Person, Hand, Arrow, Strike } from "../kit";
import { ButtonDoodle, Envelope, Stamp, Lens, Sticky, Checklist } from "../props";

const SLUG = "human-in-the-loop-is-a-system-design-choice";
const STAGE = "SYSTEMS · STAGE 05";

function Cover(p: FrameProps) {
  return (
    <CoverTemplate
      {...p}
      chapter={STAGE}
      slug={SLUG}
      titleLines={["Human in", "the loop", "is a design", "choice"]}
      quip={["Present. Polite.", "Powerless."]}
      strip={
        <g>
          <rect x={140} y={690} width={800} height={250} rx={12} fill={C.card} stroke={C.ink} strokeWidth={4} />
          <path d="M140 730 H940" stroke={C.ink} strokeWidth={3} />
          <circle cx={166} cy={710} r={6} fill={C.rule} />
          <circle cx={188} cy={710} r={6} fill={C.rule} />
          <text x={540} y={786} textAnchor="middle" className="ill-sans" fontSize={28} fontWeight={600} fill={C.ink}>
            Send refunds automatically to all customers?
          </text>
          <ButtonDoodle x={280} y={830} w={220} label="APPROVE" />
          <Hand x={530} y={878} size={32} color={C.accent}>
            …and that&#39;s the only option
          </Hand>
        </g>
      }
      summary="A workflow can contain a human and still not be under human control. Oversight needs a decision still open, an owner, enough context, real alternatives, and a path that works when they say no."
    />
  );
}

function ThreeThings(p: FrameProps) {
  return (
    <StepsTemplate
      {...p}
      chapter="THREE DIFFERENT THINGS"
      headline={["Present. Required.", "Able to judge."]}
      top={350}
      footY={920}
      steps={[
        { title: "A person is present", note: "maybe notified after the fact", icon: <Person x={2} y={-14} s={0.58} /> },
        {
          title: "Their approval is required",
          note: "a real constraint, but only on sequence",
          icon: <Stamp x={12} y={30} text="OK" color={C.teal} w={96} size={28} />,
        },
        { title: "They can judge", note: "only this one is oversight", accent: true, icon: <Lens x={50} y={48} r={32} /> },
      ]}
      footnote="On an architecture diagram the first two look identical to the third. Only the third is oversight in any useful sense."
    />
  );
}

function AlreadySent(p: FrameProps) {
  return (
    <SceneTemplate
      {...p}
      chapter="IS THE DECISION STILL OPEN?"
      headline={["Already sent?", "Then what did I approve?"]}
      prune={{ from: "approval", to: "notification", y: 790 }}
      footnote="If the outcome is decided before they look, call the step what it is: monitoring, audit, or the start of a correction. All worth having. None of them is approval."
      footY={880}
    >
      <Envelope x={110} y={340} s={1.6} stamp="SENT" />
      <Arrow x1={420} x2={560} y={430} verb="then, later" verbY={410} />
      <Person x={560} y={300} s={1.1} />
      <ButtonDoodle x={770} y={470} w={220} label="APPROVE" />
      <Hand x={660} y={622} size={34} anchor="middle">
        approving something
      </Hand>
      <Hand x={660} y={662} size={34} color={C.accent} anchor="middle">
        that already happened
      </Hand>
    </SceneTemplate>
  );
}

function WhichHuman(p: FrameProps) {
  return (
    <CardsTemplate
      {...p}
      chapter="WHICH HUMAN, AND WHY THEM"
      headline={["“A human reviews it.”", "Which human? With what?"]}
      cards={[
        { label: "Whoever's free", labelW: 236, notes: ["available isn't", "responsible"], struck: true },
        { label: "Owns the decision", notes: ["whose call it", "actually is"] },
        { label: "Has the standing", notes: ["so their yes", "settles it"] },
        { label: "Knows the subject", notes: ["or it's a delay,", "not a control"] },
      ]}
      footnote="A reviewer who can't evaluate what's in front of them is a delay, not a control. Name a person with the authority and the knowledge, not a component type."
    />
  );
}

function SayNo(p: FrameProps) {
  return (
    <SceneTemplate
      {...p}
      chapter="WHAT HAPPENS WHEN THEY SAY NO"
      headline={["What happens", "when they say no?"]}
      footnote="If refusing does nothing, the reviewer doesn't have a decision. They have a delay they're responsible for. At least one real non-approval path has to exist."
      footY={1010}
    >
      <Person x={440} y={290} s={1.0} />
      <path d="M470 470 C 380 500, 300 540, 250 590" fill="none" stroke={C.teal} strokeWidth={4} strokeLinecap="round" />
      <Hand x={240} y={636} size={34} color={C.teal} anchor="middle">
        approve → it ships
      </Hand>
      <path d="M612 470 C 700 500, 770 540, 800 590" fill="none" stroke={C.accent} strokeWidth={4} strokeLinecap="round" />
      <Hand x={810} y={636} size={34} color={C.accent} anchor="middle">
        decline → ?
      </Hand>
      <Sticky x={100} y={710} w={270} h={150} size={32} lines={["toast:", "“Declined.”"]} />
      <Strike x={92} y={790} w={296} width={6} />
      <Hand x={236} y={930} size={30} color={C.accent} anchor="middle">
        and then nothing
      </Hand>
      <Checklist
        x={560}
        y={680}
        w={444}
        size={26}
        items={[{ text: "revise, with the reason" }, { text: "stop and release" }, { text: "ask for evidence" }, { text: "escalate" }, { text: "manual route" }]}
      />
    </SceneTemplate>
  );
}

function Close(p: FrameProps) {
  return (
    <CloseTemplate
      {...p}
      chapter="WHAT THIS CHANGES"
      headline={["Five questions", "for any Approve", "button."]}
      slug={SLUG}
      takeaway="Take an approval step you already have and ask these five things. If any answer is missing, the gate is doing less than it appears to."
    >
      <Checklist
        x={110}
        y={350}
        w={600}
        size={28}
        items={[
          { text: "What decision stops here?" },
          { text: "Who owns it?" },
          { text: "What does the reviewer see?" },
          { text: "What else can they do?" },
          { text: "What happens on no?" },
        ]}
      />
      <ButtonDoodle x={760} y={420} w={220} label="APPROVE" />
      <Hand x={870} y={560} size={32} color={C.accent} anchor="middle">
        before you
      </Hand>
      <Hand x={870} y={598} size={32} color={C.accent} anchor="middle">
        trust this
      </Hand>
    </CloseTemplate>
  );
}

export const deck: Deck = {
  slug: SLUG,
  title: "Human-in-the-Loop Is a System Design Choice",
  summary:
    "An Approve button isn't oversight. Ten frames on what a person needs before their judgment actually controls anything.",
  frames: [
    {
      key: "hitl-cover",
      title: "Human in the loop is a design choice",
      text: "A man in a deckchair, lassoed inside a rope loop that runs to a machine labelled automation, sips his tea under a sign reading human, required. Present, polite, powerless. Below, a screen asks: send refunds automatically to all customers? Approve is the only option. Being present isn't the same as being in control. Oversight needs a decision still open, an owner, enough context, real alternatives, and a path that works when they say no.",
      Render: Cover,
    },
    {
      key: "hitl-three-things",
      title: "Present. Required. Able to judge.",
      text: "Three different things: a person is present, perhaps only notified after the fact. Their approval is required, a real constraint but only on sequence. They can judge, and only this one is oversight. On an architecture diagram the three look the same.",
      Render: ThreeThings,
    },
    {
      key: "hitl-already-sent",
      title: "Already sent? Then what did I approve?",
      text: "An envelope is stamped sent. Later, a person is asked to approve something that already happened. Approval is crossed out in favour of notification. If the outcome is decided before they look, the step is monitoring, audit, or the start of a correction, not approval.",
      Render: AlreadySent,
    },
    {
      key: "hitl-which-human",
      title: "“A human reviews it.” Which human?",
      text: "Whoever's free is crossed out: available isn't responsible. The reviewer should own the decision, have the standing so their yes settles it, and know the subject, or they are a delay rather than a control.",
      Render: WhichHuman,
    },
    {
      key: "hitl-say-no",
      title: "What happens when they say no?",
      text: "Approve and it ships. Decline and then what? A toast saying Declined, followed by nothing, is crossed out. Real non-approval paths: revise with the reason, stop and release what was held, ask for evidence, escalate, or fall back to a manual route. If refusing does nothing, the reviewer has a delay, not a decision.",
      Render: SayNo,
    },
    {
      key: "hitl-close",
      title: "Five questions for any Approve button",
      text: "Five questions for any Approve button: what decision stops here, who owns it, what does the reviewer see, what else can they do, and what happens when they decline. If any answer is missing, the gate is doing less than it appears to.",
      Render: Close,
    },
  ],
};
