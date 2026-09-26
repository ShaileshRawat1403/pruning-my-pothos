import React from "react";
import type { Deck } from "./types";
import type { FrameProps } from "../templates";
import { CoverTemplate, StepsTemplate, SceneTemplate, ContrastTemplate, CloseTemplate } from "../templates";
import { C, Person, Hand, Arrow, Strike } from "../kit";
import { Sticky, Scroll, Doc, Slip, Checklist } from "../props";

const SLUG = "agent-instructions-and-handoff-as-an-operating-system";
const STAGE = "SYSTEMS · STAGE 07";

function Cover(p: FrameProps) {
  return (
    <CoverTemplate
      {...p}
      chapter={STAGE}
      slug={SLUG}
      titleLines={["What has to", "survive for", "work to", "continue"]}
      quip={["Full transcript.", "Zero clue."]}
      strip={
        <g>
          <Scroll x={86} y={680} w={560} size={34} lines={["use Postgres", "no, SQLite", "fine, Postgres after all"]} />
          <Hand x={820} y={770} size={34} color={C.accent} anchor="middle">
            which one
          </Hand>
          <Hand x={820} y={812} size={34} color={C.accent} anchor="middle">
            still stands?
          </Hand>
        </g>
      }
      summary="Continuing work needs what is currently true and an owner for the next step. That's a different problem from keeping a record of how the work got here."
    />
  );
}

function ThreeQuestions(p: FrameProps) {
  return (
    <StepsTemplate
      {...p}
      chapter="THREE QUESTIONS, NOT ONE"
      headline={["Three questions", "hiding in one."]}
      top={350}
      footY={920}
      steps={[
        { title: "What happened?", note: "the record: evidence, for looking back", icon: <Scroll x={0} y={20} w={110} size={16} lines={["…", "…"]} /> },
        { title: "Where do things stand?", note: "current truth, for going on", icon: <Doc x={18} y={4} w={90} h={112} title="NOW" size={18} /> },
        { title: "Who owns the next step?", note: "the handoff", accent: true, icon: <Person x={2} y={-14} s={0.58} /> },
      ]}
      footnote="One file can serve all three. They're still different jobs. Replay looks back at a past run; continuity keeps enough current truth to go on from here."
    />
  );
}

function NotState(p: FrameProps) {
  return (
    <SceneTemplate
      {...p}
      chapter="STATE IS NOT THE TRANSCRIPT"
      headline={["All the history.", "None of the state."]}
      footnote="Length isn't the defect. Ambiguity about what's current is. A short transcript can be just as ambiguous as a long one."
      footY={900}
    >
      <Scroll x={76} y={310} w={540} size={32} lines={["12:02 use Postgres", "12:40 no, SQLite", "14:15 Postgres after all", "14:16 ok"]} />
      <Hand x={640} y={380} size={34} color={C.accent}>
        decided, reversed,
      </Hand>
      <Hand x={640} y={420} size={34} color={C.accent}>
        decided again.
      </Hand>
      <Hand x={640} y={472} size={34}>
        which one governs?
      </Hand>
      <Arrow x1={330} x2={548} y={700} verb="say what's current" verbY={676} />
      <rect x={560} y={600} width={444} height={210} rx={8} fill={C.card} stroke={C.ink} strokeWidth={3.5} />
      <text x={590} y={646} className="ill-mono" fontSize={20} letterSpacing={2} fill={C.muted}>
        CURRENT STATE
      </text>
      <text x={590} y={700} className="ill-sans" fontSize={32} fontWeight={800} fill={C.ink}>
        database: Postgres
      </text>
      <text x={590} y={748} className="ill-sans" fontSize={26} fill={C.body}>
        decided 14:15 · next: you
      </text>
    </SceneTemplate>
  );
}

function RuleOrStatus(p: FrameProps) {
  return (
    <ContrastTemplate
      {...p}
      chapter="INSTRUCTIONS ARE NOT STATE"
      headline={["Rule,", "or status?"]}
      left={{
        title: "Instruction",
        notes: ["true for every", "piece of work"],
        art: <Sticky x={52} y={60} w={340} h={240} size={40} rotate={-3} lines={["Approval is", "required before", "publishing."]} />,
      }}
      right={{
        title: "State",
        notes: ["true this afternoon,", "false tomorrow"],
        art: (
          <g>
            <Sticky x={52} y={60} w={340} h={240} size={40} rotate={3} lines={["This change is", "waiting on", "approval."]} />
            <Hand x={330} y={340} size={30} color={C.accent} anchor="middle">
              (today)
            </Hand>
          </g>
        ),
      }}
      footnote="Mix them and standing rules get buried in a status note, or live status gets written into the rules, where it quietly stops being true."
    />
  );
}

function Stale(p: FrameProps) {
  return (
    <SceneTemplate
      {...p}
      chapter="A SPECIMEN FROM THIS REPOSITORY"
      headline={["“Current,” it says.", "Nobody checked when."]}
      footnote="What a handoff says was true when it was written. Make its position checkable, and re-check the parts that matter before continuing."
      footY={950}
    >
      <Doc x={90} y={300} w={440} h={580} title="current.md" size={24} lines={[]} />
      <Hand x={116} y={386} size={30} color={C.body}>
        Key files touched
      </Hand>
      {Array.from({ length: 10 }).map((_, i) => {
        const y = 430 + i * 42;
        const kept = i === 4;
        return (
          <g key={i}>
            <path d={`M116 ${y} L${420 - (i % 3) * 40} ${y}`} stroke={kept ? C.teal : C.faint} strokeWidth={10} strokeLinecap="round" />
            {!kept && <Strike x={108} y={y - 2} w={330 - (i % 3) * 40} width={4} />}
          </g>
        );
      })}
      <Hand x={770} y={380} size={42} color={C.accent} anchor="middle">
        35 listed.
      </Hand>
      <Hand x={770} y={428} size={42} color={C.accent} anchor="middle">
        34 gone.
      </Hand>
      <Hand x={770} y={488} size={32} anchor="middle">
        true when written.
      </Hand>
      <Slip x={590} y={570} w={380} h={74} text="pin the version" hand size={32} rotate={-2} />
      <Slip x={590} y={666} w={380} h={74} text="date it" hand size={32} rotate={2} />
      <Slip x={590} y={762} w={380} h={74} text="name the owner" hand size={32} rotate={-2} />
    </SceneTemplate>
  );
}

function Close(p: FrameProps) {
  return (
    <CloseTemplate
      {...p}
      chapter="WHAT THIS CHANGES"
      headline={["Can the next one", "start without", "guessing?"]}
      slug={SLUG}
      takeaway="Writing more history won't help. Separate how the work got here from where it currently stands, and name who owns what happens next."
    >
      <Person x={120} y={380} s={1.2} />
      <Checklist
        x={400}
        y={350}
        w={580}
        size={28}
        items={[
          { text: "what's done", done: true },
          { text: "what's true now", done: true },
          { text: "the next step", done: true },
          { text: "constraints still active", done: true },
          { text: "who owns it", done: true },
        ]}
      />
      <Hand x={690} y={740} size={32} color={C.teal} anchor="middle">
        then they can act
      </Hand>
    </CloseTemplate>
  );
}

export const deck: Deck = {
  slug: SLUG,
  title: "What Has to Survive for Work to Continue",
  summary:
    "A transcript records how the work got here. The next person needs where it stands and who owns the next step. Eight frames on the difference.",
  frames: [
    {
      key: "handoff-cover",
      title: "What has to survive for work to continue",
      text: "One exhausted runner hands the baton to the next, and trailing from it is the entire transcript of the race, while the new runner asks: so where are we? Full transcript, zero clue. Continuing work needs where things stand, not how they got here. A transcript reads: use Postgres, no, SQLite, fine, Postgres after all. Which one still stands? Continuing work needs current truth and an owner for the next step.",
      Render: Cover,
    },
    {
      key: "handoff-three-questions",
      title: "Three questions hiding in one",
      text: "Three questions: what happened, which is the record and evidence for looking back; where things stand, current truth for going on; and who owns the next step, which is the handoff. One file can serve all three, but they are different jobs.",
      Render: ThreeQuestions,
    },
    {
      key: "handoff-not-state",
      title: "All the history, none of the state",
      text: "A transcript shows a choice decided, reversed and decided again, and doesn't say which one governs. A current-state card does: database Postgres, decided at 14:15, next step yours. Length isn't the defect; ambiguity about what is current is.",
      Render: NotState,
    },
    {
      key: "handoff-rule-or-status",
      title: "Rule, or status?",
      text: "An instruction, such as approval is required before publishing, is true for every piece of work. State, such as this change is waiting on approval, is true this afternoon and false tomorrow. Mixing them buries rules in status notes, or writes live status into the rules.",
      Render: RuleOrStatus,
    },
    {
      key: "handoff-stale",
      title: "“Current,” it says. Nobody checked when.",
      text: "This repository's handoff document, current.md, lists thirty-five key files touched, and thirty-four of them no longer exist at the commit the article cites. They were true when written. Make a handoff's position checkable: pin the version, date it, and name the owner.",
      Render: Stale,
    },
    {
      key: "handoff-close",
      title: "Can the next one start without guessing?",
      text: "The next person needs what's done, what's true now, the next step, the constraints still active, and who owns it; then they can act. A longer record isn't the fix. Separate how the work got here from where it currently stands.",
      Render: Close,
    },
  ],
};
