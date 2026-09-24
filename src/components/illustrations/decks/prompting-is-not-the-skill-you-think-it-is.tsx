import React from "react";
import type { Deck } from "./types";
import type { FrameProps } from "../templates";
import { CoverTemplate, StepsTemplate, SceneTemplate, ContrastTemplate, CardsTemplate, CloseTemplate } from "../templates";
import { C, Model, Gate, Hand, Arrow } from "../kit";
import { Doc, Sticky, Stamp, Slip, Checklist, Lens } from "../props";

const SLUG = "prompting-is-not-the-skill-you-think-it-is";
const STAGE = "SYSTEMS · STAGE 03";

function Cover(p: FrameProps) {
  return (
    <CoverTemplate
      {...p}
      chapter={STAGE}
      titleLines={["Prompting", "is not the", "skill you", "think it is"]}
      hero={
        <g>
          <Model x={640} y={196} s={1.5} lines={["sure!", "(usually)"]} />
          <Sticky x={860} y={352} w={170} h={118} size={30} rotate={8} lines={["ALWAYS", "JSON!!!"]} />
        </g>
      }
      heroLabel="THE MODEL"
      heroQuip={["asked nicely.", "never checked."]}
      strip={
        <g>
          <Hand x={96} y={742} size={46} color={C.muted}>
            ALWAYS.
          </Hand>
          <Hand x={96} y={794} size={46} color={C.muted}>
            NEVER.
          </Hand>
          <Hand x={96} y={846} size={46} color={C.muted}>
            YOU MUST.
          </Hand>
          <text x={96} y={910} className="ill-mono" fontSize={17} letterSpacing={2} fill={C.muted}>
            MORE INPUT
          </text>
          <text x={420} y={846} className="ill-sans" fontSize={96} fontWeight={800} fill={C.accent}>
            ≠
          </text>
          <Gate x={556} y={680} s={0.7} counter="" />
          <Stamp x={790} y={760} text="REJECT" w={180} size={30} />
          <text x={640} y={910} className="ill-mono" fontSize={17} letterSpacing={2} fill={C.muted}>
            A CHECK OUTSIDE THE PROMPT
          </text>
        </g>
      }
      summary="A prompt shapes what the model is likely to produce. Shaping isn't enforcing, so anything that must hold needs a check that lives outside the prompt."
    />
  );
}

function CanSay(p: FrameProps) {
  return (
    <StepsTemplate
      {...p}
      chapter="WHAT AN INSTRUCTION CAN EXPRESS"
      headline={["Five things a", "prompt can say."]}
      top={320}
      steps={[
        { title: "Intent", note: "what you're trying to achieve (the part skipped most)" },
        { title: "Constraints", note: "what must not happen" },
        { title: "Examples", note: "two or three showing the pattern" },
        { title: "Requested shape", note: "the format you want back" },
        { title: "Priorities", note: "what wins when instructions pull apart" },
      ]}
      footnote="Each of these narrows the field of likely answers. None of them closes it."
    />
  );
}

function Shouting(p: FrameProps) {
  return (
    <SceneTemplate
      {...p}
      chapter="WHAT IT CANNOT DO"
      headline={["Shouting", "isn't checking."]}
      prune={{ from: "“ALWAYS”", to: "a validator", y: 900, fromW: 300 }}
      footnote="“Always” and “never” are more input, and more input is not a check. If you want a step that notices and objects, you have to build it."
      footY={986}
    >
      <Doc x={76} y={300} w={400} h={250} size={34} lines={["ALWAYS RESPOND", "IN JSON.", "VERY IMPORTANT!!"]} />
      <Arrow x1={496} x2={600} y={420} verb="input" verbY={400} />
      <Model x={620} y={300} s={1.1} lines={["noted!"]} />
      {[0, 1, 2, 3].map((i) => (
        <Slip key={i} x={76 + i * 150} y={620} w={130} h={70} text="{ … }" size={26} rotate={i % 2 ? 3 : -3} />
      ))}
      <Slip x={690} y={610} w={290} h={80} text="Sure! Here's…" hand color={C.accent} size={32} rotate={4} />
      <Hand x={835} y={752} size={32} color={C.accent} anchor="middle">
        occasionally.
      </Hand>
      <Hand x={835} y={792} size={32} color={C.accent} anchor="middle">
        and nothing noticed.
      </Hand>
    </SceneTemplate>
  );
}

function AskOrCheck(p: FrameProps) {
  return (
    <ContrastTemplate
      {...p}
      chapter="LANGUAGE AND CONTRACTS"
      headline={["Ask,", "or check?"]}
      left={{
        title: "A prompt",
        notes: ["tells the model", "what you want"],
        art: (
          <g>
            <Sticky x={96} y={50} w={250} h={170} size={34} rotate={-4} lines={["please reply", "in JSON :)"]} />
            <Model x={160} y={236} s={0.62} lines={["", ""]} />
          </g>
        ),
      }}
      right={{
        title: "A contract",
        notes: ["gives software", "something to check"],
        art: (
          <g>
            <Checklist
              x={40}
              y={46}
              w={364}
              size={24}
              items={[
                { text: "order_id: string", done: true },
                { text: "amount: number", done: true },
                { text: "reason: string" },
              ]}
            />
            <Stamp x={200} y={264} text="REJECT" w={180} size={30} rotate={-10} />
          </g>
        ),
      }}
      footnote="Plain language can be the human-facing interface. Something checkable still has to sit underneath it."
    />
  );
}

function ReadTheGap(p: FrameProps) {
  return (
    <CardsTemplate
      {...p}
      chapter="THE ACTUAL SKILL"
      headline={["Read the gap,", "then pick a fix."]}
      scene={
        <g>
          <Slip x={76} y={320} w={360} h={90} text="asked: 3 slogans" hand color={C.ink} size={32} rotate={-2} />
          <Slip x={620} y={320} w={384} h={90} text="got: 7, and a poem" hand color={C.accent} size={32} rotate={3} />
          <Lens x={528} y={400} r={50} />
          <Hand x={540} y={548} size={36} anchor="middle">
            the skill is reading this gap
          </Hand>
        </g>
      }
      cards={[
        { label: "Wrong tone, length", notes: ["say the thing", "you didn't say"] },
        { label: "Wrong shape", notes: ["now and then? use", "a schema + validator"] },
        { label: "Wrong facts", notes: ["trace the evidence", "before the wording"] },
        { label: "Mostly right", notes: ["wrong sometimes?", "design for that"] },
      ]}
      footnote="Right most of the time and wrong occasionally, in ways that matter: that's when to stop editing the prompt."
    />
  );
}

function Close(p: FrameProps) {
  return (
    <CloseTemplate
      {...p}
      chapter="TREAT INSTRUCTIONS LIKE CODE"
      headline={["Treat a prompt", "like code."]}
      slug={SLUG}
      takeaway="If a prompt does real work, handle it like code: keep it in version control, note what a change should do, and rerun a small fixed set of inputs after every edit."
    >
      <Doc x={110} y={330} w={320} h={380} title="prompt.md" size={28} lineSize={38} lines={["v7: shorter", "v6: tone fix", "v5: examples"]} />
      <Stamp x={150} y={640} text="IN GIT" color={C.teal} w={170} size={28} rotate={-6} />
      <Checklist
        x={500}
        y={350}
        w={480}
        size={28}
        items={[
          { text: "refund request", done: true },
          { text: "angry customer", done: true },
          { text: "empty input", done: true },
          { text: "very long thread" },
        ]}
      />
      <Hand x={740} y={680} size={32} color={C.teal} anchor="middle">
        rerun the same set
      </Hand>
      <Hand x={740} y={718} size={32} color={C.teal} anchor="middle">
        after every edit
      </Hand>
    </CloseTemplate>
  );
}

export const deck: Deck = {
  slug: SLUG,
  title: "Prompting Is Not the Skill You Think It Is",
  summary:
    "A prompt shapes the odds; it doesn't enforce anything. Six frames on asking versus checking, and the skill that actually matters.",
  frames: [
    {
      key: "prompt-cover",
      title: "Prompting is not the skill you think it is",
      text: "The Model wears a sticky note saying ALWAYS JSON, and replies: sure, usually. It was asked nicely and never checked. Always, never and you must are just more input, which is not the same as a check outside the prompt that can reject a bad result.",
      Render: Cover,
    },
    {
      key: "prompt-can-say",
      title: "Five things a prompt can say",
      text: "A prompt can express intent, what you are trying to achieve and the part skipped most; constraints, what must not happen; examples, two or three showing the pattern; the requested shape of the output; and priorities, what wins when instructions pull apart. Each narrows the field of likely answers. None of them closes it.",
      Render: CanSay,
    },
    {
      key: "prompt-shouting",
      title: "Shouting isn't checking",
      text: "An instruction says ALWAYS RESPOND IN JSON, VERY IMPORTANT. The Model says noted. Most replies are JSON, and occasionally one is plain text, and nothing notices. Emphasis is crossed out in favour of a validator: always and never are more input, and more input is not a check.",
      Render: Shouting,
    },
    {
      key: "prompt-ask-or-check",
      title: "Ask, or check?",
      text: "A prompt tells the model what you want, like a sticky note asking for JSON. A contract gives software something it can check: fields and types that pass or get rejected. Plain language can be the human-facing interface, with something checkable underneath.",
      Render: AskOrCheck,
    },
    {
      key: "prompt-read-the-gap",
      title: "Read the gap, then pick a fix",
      text: "Asked for three slogans, got seven and a poem: the skill is reading that gap. Wrong tone or length: say what you didn't say. Wrong shape now and then: use a schema and a validator. Wrong facts: trace the evidence before the wording. Mostly right but wrong sometimes: stop editing and design for that.",
      Render: ReadTheGap,
    },
    {
      key: "prompt-close",
      title: "Treat a prompt like code",
      text: "A prompt file with its version history, kept in git, beside a fixed set of test inputs rerun after every edit. If a prompt does real work, keep it in version control, note what a change should do, and rerun the same inputs after each change.",
      Render: Close,
    },
  ],
};
