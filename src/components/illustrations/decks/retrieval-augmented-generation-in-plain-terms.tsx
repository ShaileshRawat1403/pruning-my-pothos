import React from "react";
import type { Deck } from "./types";
import type { FrameProps } from "../templates";
import { CoverTemplate, StepsTemplate, SceneTemplate, ContrastTemplate, CloseTemplate } from "../templates";
import { C, Model, Hand, Arrow } from "../kit";
import { Doc, Lens, Stamp } from "../props";

const SLUG = "retrieval-augmented-generation-in-plain-terms";
const STAGE = "SYSTEMS · STAGE 02";

function Cover(p: FrameProps) {
  return (
    <CoverTemplate
      {...p}
      chapter={STAGE}
      slug={SLUG}
      layout="stage"
      titleLines={["Retrieval in", "plain terms"]}
      quip={["it only sees", "what it's handed."]}
      summary="Retrieval fetches material when a question comes in and puts it into the model's input. Finding it and handing it over are separate steps, and either can drop the evidence."
    />
  );
}

function Stages(p: FrameProps) {
  return (
    <StepsTemplate
      {...p}
      chapter="THE STAGES"
      headline={["Six stages.", "Any one can lose it."]}
      top={320}
      steps={[
        { title: "Source material", note: "whatever holds the answer" },
        { title: "Preparation and indexing", note: "if it never got in, nothing finds it" },
        { title: "Retrieval", note: "candidates for this question" },
        { title: "Ranking and filtering", note: "most of them get dropped" },
        { title: "Context assembly", note: "what the model actually receives", accent: true },
        { title: "Generation", note: "an answer from what it was handed" },
      ]}
      footnote="Small systems fold several of these into one search call. When the answer is wrong, usually exactly one of them lost the evidence."
    />
  );
}

function Dropped(p: FrameProps) {
  const results = ["shipping FAQ", "returns overview", "refund timeline", "refund policy 2026", "gift cards"];
  return (
    <SceneTemplate
      {...p}
      chapter="RETRIEVAL IS NOT ASSEMBLY"
      headline={["Found it.", "Dropped it."]}
      footnote="Nothing in the search logs looks wrong, because nothing about the search was wrong. Log what was retrieved and what was assembled: they are different lists."
      footY={990}
    >
      {results.map((r, i) => {
        const y = 320 + i * 104;
        const right = i === 3;
        return (
          <g key={r}>
            <rect x={90} y={y} width={420} height={84} rx={6} fill={C.card} stroke={right ? C.teal : C.ink} strokeWidth={right ? 5 : 3} />
            <text x={116} y={y + 52} className="ill-mono" fontSize={24} fill={C.ink}>
              #{i + 1} {r}
            </text>
          </g>
        );
      })}
      <path d="M66 622 L540 622" stroke={C.accent} strokeWidth={4} strokeDasharray="10 10" strokeLinecap="round" />
      <Hand x={560} y={632} size={32} color={C.accent}>
        kept: top 3
      </Hand>
      <Hand x={530} y={690} size={32} color={C.teal}>
        &larr; the right one
      </Hand>
      <Arrow x1={528} x2={620} y={440} verb="top 3" verbY={420} />
      <Model x={640} y={330} s={1.2} lines={["this is all", "I got."]} />
      <Hand x={540} y={884} size={38} anchor="middle">
        retrieval succeeded.
      </Hand>
      <Hand x={540} y={930} size={38} color={C.accent} anchor="middle">
        the model never saw it.
      </Hand>
    </SceneTemplate>
  );
}

function WordsOrMeaning(p: FrameProps) {
  return (
    <ContrastTemplate
      {...p}
      chapter="WHAT SEARCH MEANS HERE"
      headline={["Words,", "or meaning?"]}
      left={{
        title: "Matching words",
        notes: ["finds exact IDs,", "misses “puppy”", "for “small dog”"],
        art: (
          <g>
            <Doc x={60} y={50} w={230} h={270} mono size={30} lines={["part no.", "4417-B", "in stock"]} />
            <Lens x={310} y={190} r={58} />
          </g>
        ),
      }}
      right={{
        title: "Matching meaning",
        notes: ["finds paraphrases,", "misses exact IDs"],
        art: (
          <g>
            <ellipse cx={222} cy={190} rx={180} ry={136} fill="none" stroke={C.rule} strokeWidth={3} strokeDasharray="4 10" />
            <circle cx={140} cy={150} r={11} fill={C.teal} />
            <Hand x={120} y={128} size={30} color={C.teal}>
              small dog
            </Hand>
            <circle cx={200} cy={186} r={11} fill={C.teal} />
            <Hand x={218} y={196} size={30} color={C.teal}>
              puppy
            </Hand>
            <circle cx={330} cy={290} r={11} fill={C.accent} />
            <Hand x={206} y={300} size={28} color={C.accent}>
              4417-B?
            </Hand>
          </g>
        ),
      }}
      footnote="Lexical search misses a paraphrase; vector search misses an exact identifier. Hybrid systems run both, because the two fail in different places."
    />
  );
}

function Close_(p: FrameProps) {
  return (
    <SceneTemplate
      {...p}
      chapter="SIMILAR IS NOT CORRECT"
      headline={["Close", "isn't correct."]}
      prune={{ from: "nearest", to: "still true?", y: 950 }}
      footnote="Two passages can sit close together in an embedding space and still answer different questions. That is retrieval working as designed."
      footY={1020}
    >
      <ellipse cx={540} cy={590} rx={420} ry={230} fill="none" stroke={C.rule} strokeWidth={3} strokeDasharray="4 12" />
      <text x={540} y={400} textAnchor="middle" className="ill-mono" fontSize={17} letterSpacing={2} fill={C.muted}>
        EMBEDDING SPACE
      </text>
      <Doc x={300} y={456} w={210} h={250} title="POLICY" size={20} lineSize={34} lines={["replaced", "last month"]} tone={C.muted} />
      <Doc x={560} y={472} w={210} h={250} title="POLICY" size={20} lineSize={34} lines={["the current", "one"]} />
      <Hand x={540} y={448} size={34} color={C.accent} anchor="middle">
        neighbours
      </Hand>
      <Hand x={540} y={870} size={36} anchor="middle">
        same subject. different answer.
      </Hand>
    </SceneTemplate>
  );
}

function Close(p: FrameProps) {
  return (
    <CloseTemplate
      {...p}
      chapter="THE HONEST BOUNDARY"
      headline={["Wrong, now with", "a citation."]}
      slug={SLUG}
      takeaway="Retrieval can give the model evidence. It doesn't guarantee the evidence is relevant, current or correct, or that the model uses it well. So first ask: did the evidence reach it at all?"
    >
      <Model x={372} y={360} s={1.3} lines={["according", "to the doc…"]} />
      <Doc x={640} y={420} w={220} h={260} title="SOURCE" size={20} lineSize={32} lines={["old policy", "(replaced)"]} />
      <Stamp x={650} y={590} text="CITED" color={C.teal} w={150} size={26} rotate={-10} />
      <Hand x={540} y={820} size={34} color={C.accent} anchor="middle">
        retrieval moved the problem. it didn&#39;t fix it.
      </Hand>
    </CloseTemplate>
  );
}

export const deck: Deck = {
  slug: SLUG,
  title: "Retrieval-Augmented Generation in Plain Terms",
  summary:
    "Finding the right document and handing it to the model are two different steps. Six frames on where the evidence gets lost.",
  frames: [
    {
      key: "rag-cover",
      title: "Retrieval in plain terms",
      text: "A door marked INPUT with a letterbox. One page is going through the slot; another lies on the doormat, found and dropped. The model only sees what it is handed. Finding it and handing it over are separate steps, and either can drop the evidence.",
      Render: Cover,
    },
    {
      key: "rag-stages",
      title: "Six stages. Any one can lose it.",
      text: "Six stages: source material, whatever holds the answer. Preparation and indexing; if it never got in, nothing finds it. Retrieval, candidates for this question. Ranking and filtering, where most get dropped. Context assembly, what the model actually receives. Generation, an answer from what it was handed. When the answer is wrong, usually exactly one stage lost the evidence.",
      Render: Stages,
    },
    {
      key: "rag-dropped",
      title: "Found it. Dropped it.",
      text: "A search returns five results, and the right one, the current refund policy, is fourth. Context assembly keeps the top three. The Model says: this is all I got. Retrieval succeeded; the model never saw it. Nothing in the search logs looks wrong. Log what was retrieved and what was assembled, because they are different lists.",
      Render: Dropped,
    },
    {
      key: "rag-words-or-meaning",
      title: "Words, or meaning?",
      text: "Matching words finds an exact identifier like part 4417-B, but misses a passage that says puppy when you asked about a small dog. Matching meaning finds the paraphrase but can miss the exact identifier. Hybrid systems run both, because they fail in different places.",
      Render: WordsOrMeaning,
    },
    {
      key: "rag-close-not-correct",
      title: "Close isn't correct",
      text: "In an embedding space, a refund policy that was replaced last month sits right next to the current one. They are neighbours: same subject, different answer. Nearest is crossed out in favour of still true. Two passages can be close and still answer different questions.",
      Render: Close_,
    },
    {
      key: "rag-close",
      title: "Wrong, now with a citation",
      text: "The Model answers according to the document, holding a source stamped cited, but the source is an old, replaced policy. Retrieval moved the problem rather than fixing it. It can provide evidence, but not guarantee it is relevant, current or correct, or used well. First ask whether the evidence reached the model at all.",
      Render: Close,
    },
  ],
};
