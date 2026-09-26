import React from "react";
import type { Deck } from "./types";
import type { FrameProps } from "../templates";
import { CoverTemplate, StepsTemplate, SceneTemplate, CardsTemplate, CloseTemplate } from "../templates";
import { C, Person, Hand, Strike } from "../kit";
import { Sticky, Slip } from "../props";

const SLUG = "evaluation-is-a-human-problem";
const STAGE = "SYSTEMS · STAGE 06";

function Cover(p: FrameProps) {
  return (
    <CoverTemplate
      {...p}
      chapter={STAGE}
      slug={SLUG}
      layout="stage"
      titleLines={["What counts as", "good, and how", "to check it"]}
      quip={["Graded on vibes.", "Shipped on hope."]}
      summary="Evaluation compares behaviour against an expectation written down before the run. Every faster, cheaper check approximates that written judgment."
    />
  );
}

function Property(p: FrameProps) {
  return (
    <CardsTemplate
      {...p}
      chapter="NAME THE PROPERTY FIRST"
      headline={["“Is it good?”", "Good at what?"]}
      scene={
        <g>
          <path d="M170 470 A130 130 0 0 1 430 470" fill="none" stroke={C.line} strokeWidth={6} strokeLinecap="round" />
          <path d="M300 470 L376 386" stroke={C.line} strokeWidth={7} strokeLinecap="round" />
          <circle cx={300} cy={470} r={10} fill={C.line} />
          <text x={300} y={530} textAnchor="middle" className="ill-mono" fontSize={30} fontWeight={600} fill={C.muted}>
            QUALITY: 7.3
          </text>
          <Strike x={170} y={518} w={262} width={6} />
          <Hand x={560} y={430} size={34} color={C.accent}>
            moves without saying
          </Hand>
          <Hand x={560} y={470} size={34} color={C.accent}>
            which part moved
          </Hand>
        </g>
      }
      cards={[
        { label: "Does it parse?", notes: ["fields present,", "types right"] },
        { label: "Is it supported?", notes: ["by the source", "it cites"] },
        { label: "Does it decline?", notes: ["what it's", "meant to"] },
        { label: "Right register?", notes: ["the one the product", "committed to"] },
      ]}
      footnote="Each property fails differently and is checked by different means. One blended score hides which of them moved."
    />
  );
}

function FourChecks(p: FrameProps) {
  return (
    <StepsTemplate
      {...p}
      chapter="FOUR WAYS TO CHECK"
      headline={["Four checks,", "one judgment."]}
      footY={1060}
      steps={[
        { title: "Deterministic assertions", note: "exact, cheap, narrow" },
        { title: "Heuristics", note: "a tripwire that catches the obvious" },
        { title: "Model-based graders", note: "judgment at volume, same probabilistic kind" },
        { title: "Human review", note: "the one the other three stand in for", accent: true },
      ]}
      footnote="Every cheaper check approximates a judgment someone made first. The judgment doesn't disappear when it's automated; it gets encoded."
    />
  );
}

function KeepFailures(p: FrameProps) {
  const tags = ["wrong fact", "wrong tone", "missed refusal", "malformed", "truncated", "sure, on thin evidence"];
  return (
    <SceneTemplate
      {...p}
      chapter="A FIXED SET OF FAILURES"
      headline={["Keep the bad", "outputs."]}
      prune={{ from: "fresh samples", to: "the same set", y: 870, fromW: 400 }}
      footnote="It isn't an estimate of production traffic. It's failures that happened at least once, kept so their return gets noticed instead of reported by a user."
      footY={950}
    >
      <Hand x={290} y={306} size={30} color={C.accent} anchor="middle">
        the fixed set
      </Hand>
      <path d="M150 350 H430 V380 C 470 400, 470 440, 460 480 V760 Q460 790 430 790 H150 Q120 790 120 760 V480 C 110 440, 110 400, 150 380 Z" fill={C.card} stroke={C.ink} strokeWidth={4.5} strokeLinejoin="round" />
      <rect x={140} y={326} width={300} height={30} rx={6} fill={C.wash} stroke={C.ink} strokeWidth={4} />
      {tags.map((t, i) => (
        <Slip key={t} x={150 + (i % 2) * 20} y={420 + i * 58} w={t.length > 12 ? 290 : 220} h={50} text={t} hand size={28} color={C.ink} rotate={i % 2 ? 2 : -2} />
      ))}
      {["change something", "rerun the same set", "see what moved"].map((t, i) => (
        <g key={t}>
          <text x={560} y={430 + i * 130} className="ill-sans" fontSize={32} fontWeight={800} fill={C.ink}>
            {t}
          </text>
          {i < 2 && <path d={`M600 ${452 + i * 130} L600 ${528 + i * 130}`} stroke={C.accent} strokeWidth={4} strokeLinecap="round" strokeDasharray="2 12" />}
        </g>
      ))}
      <Hand x={560} y={742} size={30} color={C.teal}>
        only your change moved
      </Hand>
    </SceneTemplate>
  );
}

function Metric(p: FrameProps) {
  return (
    <StepsTemplate
      {...p}
      chapter="METRICS THAT CHANGE A DECISION"
      headline={["A number needs", "a decision."]}
      top={320}
      steps={[
        { title: "What is measured", note: "the property, named" },
        { title: "On what population", note: "whose runs, which cases" },
        { title: "Over what period", note: "from when, to when" },
        { title: "How it was produced", note: "the method behind the number" },
        { title: "Which decision changes", note: "if none would, drop the metric", accent: true },
      ]}
      footnote="A figure quoted without its population and method hardens into a fact, and the conditions it was true under stop travelling with it."
    />
  );
}

function Close(p: FrameProps) {
  return (
    <CloseTemplate
      {...p}
      chapter="WHAT THIS CHANGES"
      headline={["Write down what", "“worse” looks like."]}
      slug={SLUG}
      takeaway="Before the next change, describe behaviour you wouldn't accept, concretely enough that someone else could look at an output and agree it happened. Everything else checks that."
    >
      <Person x={150} y={360} s={1.25} />
      <Sticky x={420} y={370} w={440} h={260} size={40} rotate={2} lines={["worse =", "a confident answer", "with no source"]} />
      <Hand x={630} y={700} size={34} color={C.teal} anchor="middle">
        before the change, not after
      </Hand>
    </CloseTemplate>
  );
}

export const deck: Deck = {
  slug: SLUG,
  title: "What Counts as Good, and How to Check It",
  summary:
    "Every check is standing in for a judgment someone wrote down first. Ten frames on naming the property before choosing the method.",
  frames: [
    {
      key: "eval-cover",
      title: "What counts as good, and how to check it",
      text: "A sweating trophy engraved BEST, followed by a blank nobody filled in, and an executive holding a scorecard that reads: vibes. Graded on vibes, shipped on hope. Evaluation compares behaviour against an expectation written down before the run, and every faster, cheaper check approximates that written judgment.",
      Render: Cover,
    },
    {
      key: "eval-property",
      title: "Is it good? Good at what?",
      text: "A single quality score of 7.3 is crossed out: it moves without saying which part moved. Check properties instead. Does it parse, with the fields and types right? Is it supported by the source it cites? Does it decline what it is meant to? Does it hold the register the product committed to?",
      Render: Property,
    },
    {
      key: "eval-four-checks",
      title: "Four checks, one judgment",
      text: "Four ways to check: deterministic assertions, exact, cheap and narrow; heuristics, a tripwire rather than a definition of correct; model-based graders, judgment at volume from the same probabilistic kind of system; and human review, the one the other three stand in for.",
      Render: FourChecks,
    },
    {
      key: "eval-keep-failures",
      title: "Keep the bad outputs",
      text: "A jar of past failures: wrong fact, wrong tone, missed refusal, malformed, truncated, sure on thin evidence. Change something, rerun the same set, see what moved; only your change moved. Fresh samples are crossed out in favour of the same set. It is not a traffic estimate, just failures kept so their return gets noticed.",
      Render: KeepFailures,
    },
    {
      key: "eval-metric",
      title: "A number needs a decision",
      text: "A retained metric should say what is measured, on what population, over what period, how it was produced, and which decision changes if it moves. If no decision would change, drop the metric.",
      Render: Metric,
    },
    {
      key: "eval-close",
      title: "Write down what worse looks like",
      text: "A person writes a note: worse means a confident answer with no source. Write it before the change, concretely enough that someone else could agree it happened. Everything else is machinery for checking that description.",
      Render: Close,
    },
  ],
};
