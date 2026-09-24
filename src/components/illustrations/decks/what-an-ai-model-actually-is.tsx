import React from "react";
import type { Deck } from "./types";
import type { FrameProps } from "../templates";
import { CoverTemplate, StepsTemplate, SceneTemplate, CardsTemplate, CloseTemplate } from "../templates";
import { C, Model, Hand, Arrow, Strike } from "../kit";
import { Crate, Doc, Padlock, Sticky, Ranking, Die, Slip, PrunedNote } from "../props";

/*
 * The reference deck: start here when writing a new one. Six frames, one per
 * template, every line traceable to what-an-ai-model-actually-is.mdx.
 */

const SLUG = "what-an-ai-model-actually-is";
const STAGE = "SYSTEMS · STAGE 01";

function Cover(p: FrameProps) {
  const crates = ["retrieval", "tools", "memory", "checks", "policy"];
  return (
    <CoverTemplate
      {...p}
      chapter={STAGE}
      slug={SLUG}
      titleLines={["What an AI", "model", "actually is"]}
      quip={["a file of numbers.", "that's it."]}
      strip={
        <g>
          <Hand x={540} y={712} size={34} color={C.teal} anchor="middle">
            built around it, by people:
          </Hand>
          {crates.map((c, i) => (
            <Crate key={c} x={76 + i * 186} y={740} label={c} size={22} />
          ))}
        </g>
      }
      summary="An AI model is a file of numbers that turns input into a ranking over what comes next. Retrieval, tools, memory, checks and policy are separate software built around it."
    />
  );
}

function File(p: FrameProps) {
  return (
    <SceneTemplate
      {...p}
      chapter="WHAT IS IN THE FILE"
      headline={["It's a file.", "Of numbers."]}
      footnote="Training set the numbers. After training they are fixed, and every run uses the same ones. They encode patterns useful for predicting text, spread across billions of values."
      footY={960}
    >
      <Doc
        x={110}
        y={320}
        w={440}
        h={430}
        mono
        size={30}
        lines={["0.0213  -1.447", "0.8811   0.004", "-0.339   1.217", "0.5006  -0.071", "1.9031   0.318", "-0.772   0.064", "  …", "(billions more)"]}
      />
      <Padlock x={500} y={286} s={1.1} />
      <Hand x={600} y={350} size={36} color={C.accent}>
        fixed after training
      </Hand>
      <Sticky x={660} y={470} w={260} h={170} size={40} rotate={4} lines={["France →", "Paris"]} />
      <Strike x={640} y={560} w={300} width={7} />
      <Hand x={790} y={712} size={34} color={C.accent} anchor="middle">
        there&#39;s no such row
      </Hand>
      <Hand x={790} y={800} size={32} color={C.teal} anchor="middle">
        no single number
      </Hand>
      <Hand x={790} y={838} size={32} color={C.teal} anchor="middle">
        is a fact
      </Hand>
    </SceneTemplate>
  );
}

function Run(p: FrameProps) {
  return (
    <StepsTemplate
      {...p}
      chapter="ONE RUN"
      headline={["One run, one piece", "at a time."]}
      steps={[
        {
          title: "Cut the text into tokens",
          note: "each piece becomes a number",
          icon: (
            <g>
              {["wh", "at", "is"].map((t, i) => (
                <g key={t}>
                  <rect x={i * 40} y={34} width={36} height={44} rx={5} fill={C.card} stroke={C.ink} strokeWidth={3} />
                  <text x={i * 40 + 18} y={62} textAnchor="middle" className="ill-mono" fontSize={16} fill={C.ink}>
                    {t}
                  </text>
                </g>
              ))}
            </g>
          ),
        },
        { title: "Score every token", note: "the parameters rank what could come next", icon: <Ranking x={10} y={30} n={4} highlight={0} /> },
        { title: "Pick one", note: "not always the top one, so wording varies", icon: <Die x={24} y={20} /> },
        {
          title: "Add it, run again",
          note: "that loop is what “generation” means",
          accent: true,
          icon: (
            <g>
              <path d="M88 32 A38 38 0 1 1 36 26" fill="none" stroke={C.ink} strokeWidth={5} strokeLinecap="round" />
              <path d="M26 12 L38 26 L22 36" fill="none" stroke={C.ink} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
            </g>
          ),
        },
      ]}
      footnote="This describes language models specifically. Image models, speech models and classifiers are models too, and they don't work this way."
    />
  );
}

function Likely(p: FrameProps) {
  return (
    <SceneTemplate
      {...p}
      chapter="PLAUSIBLE IS NOT TRUE"
      headline={["Likely", "isn't true."]}
      footnote="A confident tone is a pattern in the training text, not a report on the model's reliability. If you want a truth check, something else has to perform it."
      footY={1030}
    >
      <Slip x={76} y={300} w={340} h={76} text="capital of France?" hand color={C.ink} size={30} rotate={-2} />
      <Arrow x1={436} x2={566} y={338} verb="same steps" verbY={316} />
      <Slip x={590} y={300} w={160} h={76} text="Paris" hand color={C.teal} size={32} rotate={3} />
      <Hand x={780} y={350} size={32} color={C.teal}>
        matches the world
      </Hand>
      <Slip x={76} y={430} w={380} h={76} text="first person on Mars?" hand color={C.ink} size={30} rotate={2} />
      <Arrow x1={476} x2={590} y={468} verb="same steps" verbY={446} />
      <Slip x={610} y={430} w={170} h={76} text="a name." hand color={C.accent} size={32} rotate={-3} />
      <Hand x={800} y={480} size={32} color={C.accent}>
        no one checked
      </Hand>

      <text x={76} y={660} className="ill-sans" fontSize={34} fontWeight={800} fill={C.ink}>
        How likely it scored
      </text>
      <Hand x={76} y={704} size={32} color={C.teal}>
        the model&#39;s own ranking
      </Hand>
      <PrunedNote x={76} y={756} w={420} text="How confident it sounds" note="a property of the wording" />
      <text x={76} y={920} className="ill-sans" fontSize={34} fontWeight={800} fill={C.ink}>
        Whether it&#39;s true
      </text>
      <Hand x={76} y={964} size={32} color={C.accent}>
        nothing in the loop checks this
      </Hand>
    </SceneTemplate>
  );
}

function NotTheModel(p: FrameProps) {
  return (
    <CardsTemplate
      {...p}
      chapter="WHAT IT DOES NOT DO"
      headline={["It didn't look", "that up."]}
      scene={
        <g>
          <Model x={90} y={300} s={1.2} lines={["that was", "the app."]} />
          <Hand x={690} y={372} size={32} color={C.teal} anchor="middle">
            separate software, each fixable
          </Hand>
          <Crate x={420} y={410} label="retrieval" size={22} />
          <Crate x={600} y={410} label="state" size={22} />
          <Crate x={780} y={410} label="policy" size={22} />
        </g>
      }
      cards={[
        { label: "It looked it up", labelW: 246, notes: ["retrieval did."], struck: true },
        { label: "It refused", labelW: 162, notes: ["policy did."], struck: true },
        { label: "It remembered", labelW: 226, notes: ["stored state did."], struck: true },
        { label: "It ranked", notes: ["what comes next.", "That part was it."] },
      ]}
      footnote="When the output is wrong, the model is one suspect among several, and often not the right one."
    />
  );
}

function Close(p: FrameProps) {
  return (
    <CloseTemplate
      {...p}
      chapter="WHAT THIS CHANGES"
      headline={["Hand it the facts.", "Don't ask it", "to hold them."]}
      slug={SLUG}
      takeaway="Give it the facts rather than asking it to hold them. Expect variation between runs, and when something goes wrong, ask which part failed before blaming the model."
    >
      <Doc x={150} y={520} w={180} h={220} lines={["the facts,", "handed over"]} size={26} />
      <Model x={380} y={470} s={1.35} lines={["reading,", "not recalling"]} />
      <Hand x={720} y={560} size={34} color={C.teal}>
        transforming what
      </Hand>
      <Hand x={720} y={600} size={34} color={C.teal}>
        you gave it
      </Hand>
      <Hand x={720} y={680} size={34} color={C.accent}>
        ≠ recalling what
      </Hand>
      <Hand x={720} y={720} size={34} color={C.accent}>
        you didn&#39;t
      </Hand>
    </CloseTemplate>
  );
}

export const deck: Deck = {
  slug: SLUG,
  title: "What an AI Model Actually Is",
  summary:
    "A file of numbers that ranks what comes next, and a lot of software built around it. Six frames on which behaviour comes from which.",
  frames: [
    {
      key: "model-cover",
      title: "What an AI model actually is",
      text: "A museum case, roped off, labelled Exhibit A: the model. Inside is a single file of numbers, and that is the whole exhibit. It turns input into a ranking over what comes next. Retrieval, tools, memory, checks and policy are separate software that people build around it.",
      Render: Cover,
    },
    {
      key: "model-file",
      title: "It's a file. Of numbers.",
      text: "A trained model is a file of numbers called parameters, billions of them, fixed after training. There is no row that says France, Paris: that lookup-table picture is crossed out. No single number is a fact; the numbers encode patterns that were useful for predicting text.",
      Render: File,
    },
    {
      key: "model-run",
      title: "One run, one piece at a time",
      text: "One run of a language model: cut the text into tokens, each becoming a number. Score every token, as the parameters rank what could come next. Pick one, not always the top one, which is why wording varies. Add it and run again; that loop is what generation means. Image models, speech models and classifiers work differently.",
      Render: Run,
    },
    {
      key: "model-likely",
      title: "Likely isn't true",
      text: "Asked the capital of France, the same steps produce Paris, which matches the world. Asked who first walked on Mars, the same steps produce a name, and no one checked. Three things get confused: how likely the model scored it, how confident it sounds, which is crossed out as a property of the wording, and whether it is true, which nothing in the loop checks.",
      Render: Likely,
    },
    {
      key: "model-not-the-model",
      title: "It didn't look that up",
      text: "The Model says: that was the app. It didn't look it up; retrieval did. It didn't refuse; policy did. It didn't remember; stored state did. What it did was rank what comes next. When the output is wrong, the model is one suspect among several, and often not the right one.",
      Render: NotTheModel,
    },
    {
      key: "model-close",
      title: "Hand it the facts",
      text: "Hand it the facts rather than asking it to hold them. Transforming text you gave it is a different reliability problem from recalling text you didn't. Expect variation between runs, and when something goes wrong, ask which part failed before blaming the model.",
      Render: Close,
    },
  ],
};
