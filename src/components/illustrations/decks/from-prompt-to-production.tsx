import React from "react";
import type { Deck } from "./types";
import type { FrameProps } from "../templates";
import { CoverTemplate, SceneTemplate, ContrastTemplate, CardsTemplate, CloseTemplate } from "../templates";
import { C, Model, Person, Hand, Strike } from "../kit";
import { Slip, Stamp, Envelope, Doc, Lens, Checklist } from "../props";

const SLUG = "from-prompt-to-production";
const STAGE = "SYSTEMS · STAGE 08";

function Cover(p: FrameProps) {
  return (
    <CoverTemplate
      {...p}
      chapter={STAGE}
      slug={SLUG}
      layout="stage"
      titleLines={["When is an AI", "system ready", "for real use?"]}
      quip={["Deployed. Delighted.", "Disowned."]}
      summary="Deployment means it's running. Readiness means the evidence and controls justify this exposure: these users, doing this job, with these consequences when it's wrong."
    />
  );
}

function ReadyForWhat(p: FrameProps) {
  return (
    <SceneTemplate
      {...p}
      chapter="READY FOR WHAT"
      headline={["Ready for", "what, exactly?"]}
      footnote="Name the exposure precisely: which users, doing what, with what riding on the result. That turns an unanswerable question into one with an answer."
      footY={900}
    >
      <path d="M540 320 L540 780" stroke={C.rule} strokeWidth={3} strokeDasharray="4 12" />
      <Model x={96} y={330} s={0.85} lines={["same", "system"]} />
      <Person x={290} y={360} s={0.95} />
      <Hand x={290} y={654} size={32} color={C.teal} anchor="middle">
        a team reviewing it
      </Hand>
      <Slip x={220} y={682} w={140} h={70} text="OK" color={C.teal} tick size={24} rotate={-3} />
      <Model x={580} y={330} s={0.85} lines={["same", "system"]} />
      <Person x={770} y={420} s={0.55} />
      <Person x={840} y={436} s={0.55} />
      <Person x={910} y={420} s={0.55} />
      <Hand x={790} y={654} size={32} color={C.accent} anchor="middle">
        customers acting on it
      </Hand>
      <Stamp x={700} y={684} text="NOT YET" w={190} size={28} rotate={-6} />
      <Hand x={540} y={846} size={36} anchor="middle">
        same system. different exposure.
      </Hand>
    </SceneTemplate>
  );
}

function Demo(p: FrameProps) {
  return (
    <ContrastTemplate
      {...p}
      chapter="WHAT THE DEMONSTRATION ESTABLISHED"
      headline={["The demo proved", "it's possible."]}
      left={{
        title: "The demo",
        notes: ["one user, one path,", "little at stake"],
        art: (
          <g>
            <Model x={40} y={60} s={0.55} lines={["", ""]} />
            <path d="M80 240 C 160 236, 300 244, 392 238" fill="none" stroke={C.teal} strokeWidth={5} strokeLinecap="round" />
            <path d="M380 228 L394 238 L379 250" fill="none" stroke={C.teal} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M390 150 L390 230 M390 150 L430 164 L390 180" fill={C.teal} stroke={C.ink} strokeWidth={3} strokeLinejoin="round" />
            <Hand x={222} y={300} size={30} color={C.teal} anchor="middle">
              the happy path
            </Hand>
          </g>
        ),
      }}
      right={{
        title: "Real use",
        notes: ["the cases nobody", "demoed"],
        art: (
          <g>
            <Model x={30} y={140} s={0.5} lines={["", ""]} />
            {[
              ["M130 200 C 200 120, 260 90, 330 70", "malformed input", 60],
              ["M130 210 C 220 180, 280 170, 340 150", "slow upstream", 142],
              ["M130 220 C 220 250, 290 250, 350 240", "an odd goal", 232],
              ["M130 230 C 200 300, 270 330, 340 330", "costly failure", 322],
            ].map(([d, t, y]) => (
              <g key={t as string}>
                <path d={d as string} fill="none" stroke={C.accent} strokeWidth={4} strokeLinecap="round" />
                <Hand x={236} y={(y as number) - 8} size={26} color={C.accent}>
                  {t as string}
                </Hand>
              </g>
            ))}
          </g>
        ),
      }}
      footnote="Readiness asks about conditions the demonstration may never have exercised. Evidence that's silent about a case isn't a pass."
    />
  );
}

function Bar(p: FrameProps) {
  return (
    <SceneTemplate
      {...p}
      chapter="THE RELEASE CRITERION"
      headline={["Set the bar", "before you look."]}
      footnote="Define the release criterion against an evaluation set that fits the use and its failure costs, before exposure. Chosen afterwards, it can be fitted to the results."
      footY={880}
    >
      <path d="M130 340 L130 780 M450 340 L450 780" stroke={C.ink} strokeWidth={8} strokeLinecap="round" />
      <path d="M120 440 L460 440" stroke={C.teal} strokeWidth={12} strokeLinecap="round" />
      <Hand x={290} y={420} size={32} color={C.teal} anchor="middle">
        set first
      </Hand>
      <path d="M120 640 L460 640" stroke={C.line} strokeWidth={8} strokeLinecap="round" strokeDasharray="14 12" />
      <Hand x={290} y={622} size={30} color={C.muted} anchor="middle">
        lowered after seeing results
      </Hand>
      <Strike x={120} y={610} w={340} width={5} />
      <Doc x={600} y={360} w={300} h={360} title="RESULTS" size={20} />
      <Lens x={840} y={620} r={52} />
      <Hand x={760} y={790} size={32} color={C.accent} anchor="middle">
        fitting the rule to the results
      </Hand>
    </SceneTemplate>
  );
}

function Undo(p: FrameProps) {
  return (
    <CardsTemplate
      {...p}
      chapter="WHAT CAN ACTUALLY BE UNDONE"
      headline={["Some things", "don't un-send."]}
      scene={
        <g>
          <Envelope x={110} y={318} s={1.4} stamp="SENT" />
          <Hand x={440} y={400} size={36} color={C.accent}>
            some effects
          </Hand>
          <Hand x={440} y={442} size={36} color={C.accent}>
            don&#39;t come back.
          </Hand>
          <Stamp x={780} y={360} text="PAID" w={170} size={32} color={C.accent} rotate={8} />
        </g>
      }
      cards={[
        { label: "Stop it", notes: ["before more", "happens"] },
        { label: "Reverse it", notes: ["not a sent message", "or a payment"] },
        { label: "Correct it", notes: ["after the fact"] },
        { label: "Contain it", notes: ["limit how far", "it travels"] },
      ]}
      footnote="The question isn't whether a rollback procedure exists. It's what can be stopped, reversed, corrected or contained."
    />
  );
}

function Close(p: FrameProps) {
  return (
    <CloseTemplate
      {...p}
      chapter="WHAT THIS CHANGES"
      headline={["Three answers,", "in writing."]}
      slug={SLUG}
      takeaway="If those can't be answered, nobody can say yet whether it's ready. That's a smaller problem, and a more fixable one."
    >
      <Checklist
        x={110}
        y={340}
        w={860}
        size={30}
        items={[
          { text: "Evidence against the failures that matter" },
          { text: "What limits the damage when it's incomplete" },
          { text: "Who decides, and who answers" },
        ]}
      />
      <Person x={420} y={570} s={1.0} />
      <Hand x={640} y={690} size={32} color={C.teal}>
        named, not assumed
      </Hand>
    </CloseTemplate>
  );
}

export const deck: Deck = {
  slug: SLUG,
  title: "When Is an AI System Ready for Real Use?",
  summary:
    "Tested, approved and deployed are not the answer. Thirteen frames on readiness as a judgment about one exposure, for one use.",
  frames: [
    {
      key: "ready-cover",
      title: "When is an AI system ready for real use?",
      text: "A small bridge with a sign reading tested with: bicycles, a lorry marked PROD driving onto it, and an engineer on the far bank saluting: ship it. Deployed, delighted, disowned. Ready for what, exactly? Tested, approved and deployed are each worth something, and none of them is the answer. Readiness means the evidence and controls justify this exposure: these users, doing this job, with these consequences when it is wrong.",
      Render: Cover,
    },
    {
      key: "ready-for-what",
      title: "Ready for what, exactly?",
      text: "The same system is fine for a team reviewing its output internally, and not yet for customers acting on it. Same system, different exposure. Naming the exposure precisely, which users doing what with what riding on it, turns an unanswerable question into one with an answer.",
      Render: ReadyForWhat,
    },
    {
      key: "ready-demo",
      title: "The demo proved it's possible",
      text: "The demo: one user, one happy path, little at stake. Real use: malformed input, a slow upstream system, a goal nobody anticipated, and failures that are expensive. Readiness asks about conditions the demo may never have exercised, and silence in the evidence isn't a pass.",
      Render: Demo,
    },
    {
      key: "ready-bar",
      title: "Set the bar before you look",
      text: "A release bar set first, and a lower one moved after seeing the results, which is crossed out: that is fitting the rule to the results. Define the release criterion against an evaluation set that fits the use and its failure costs, before exposure.",
      Render: Bar,
    },
    {
      key: "ready-undo",
      title: "Some things don't un-send",
      text: "Some effects don't come back: a sent message, a payment made. Ask what can be stopped before more happens, reversed, corrected after the fact, or contained to limit how far it travels, and at what cost.",
      Render: Undo,
    },
    {
      key: "ready-close",
      title: "Three answers, in writing",
      text: "Three answers, in writing: what evidence exists against the failures that matter, what limits the damage when that evidence is incomplete, and who decides and who answers, named rather than assumed. If they can't be answered, nobody can say yet, which is more fixable than unready.",
      Render: Close,
    },
  ],
};
