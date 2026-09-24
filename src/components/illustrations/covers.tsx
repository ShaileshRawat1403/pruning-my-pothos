import React from "react";
import { C, Hand, Para } from "./kit";
import { Emblem } from "./emblems";

/**
 * covers.tsx: the 1200 x 630 cover for every Systems article. The article
 * page renders it live; the export script screenshots it to
 * /covers/systems/<slug>.png for link previews.
 *
 * Each cover is one quip and the article's emblem (emblems.tsx), its own
 * visual idea. The quip says the article's thesis sideways and may not claim
 * anything the article does not. A new article gets a cover by adding an
 * entry here and an emblem there (Test 68 fails until it has both).
 */

export const COVER_W = 1200;
export const COVER_H = 630;

interface CoverSpec {
  /** One line: the article's thesis, said sideways. */
  quip: string;
}

export const COVERS: Record<string, CoverSpec> = {
  "a-simple-tokenizer": { quip: "it counts tokens, not letters." },
  "agent-instructions-and-handoff-as-an-operating-system": { quip: "where it stands, not how it got here." },
  "ai-agents-vs-ai-workflows": { quip: "who picks the next step?" },
  "ai-architecture-explained-how-modern-llm-applications-work": { quip: "the boxes are the easy part." },
  "architecture-of-in-chat-ai-apps": { quip: "a button is a request, not a permission." },
  "context-windows-as-working-memory": { quip: "what's in the window is a choice." },
  "designing-reusable-ai-skills": { quip: "write down what it takes and returns." },
  "evaluation-is-a-human-problem": { quip: "better at what, exactly?" },
  "from-agent-intent-to-governed-execution": { quip: "it can only ask." },
  "from-prompt-to-production": { quip: "ready for what, exactly?" },
  "human-in-the-loop-is-a-system-design-choice": { quip: "a button isn't oversight." },
  "i-7-cognitive-loop": { quip: "seven places a person decides." },
  "observability-first-ai-systems": { quip: "decide what to keep before you need it." },
  "policy-governed-mcp-runtimes-for-secure-tool-execution": { quip: "reading it doesn't make it an order." },
  "prompting-is-not-the-skill-you-think-it-is": { quip: "asking isn't checking." },
  "retrieval-augmented-generation-in-plain-terms": { quip: "it only sees what it's handed." },
  "runtime-over-model-why-orchestration-is-the-product": { quip: "swap the model. the loop stays." },
  "semantic-caching-for-probabilistic-systems": { quip: "similar isn't safe to reuse." },
  "seo-aeo-geo-in-plain-terms": { quip: "control what you actually control." },
  "skills-vs-prompts-vs-agents": { quip: "layers, not levels." },
  "structured-output-and-why-it-matters": { quip: "a schema can say no." },
  "systems-001-foundations": { quip: "a few good questions." },
  "tech-stack-for-nlpg-driven-ai-assisted-sdlc": { quip: "disagree while it's cheap." },
  "tool-use-when-language-triggers-actions": { quip: "the code that reads it owns the effect." },
  "training-vs-inference": { quip: "only training writes to the file." },
  "what-a-system-prompt-actually-is": { quip: "house rules, not task logic." },
  "what-an-ai-model-actually-is": { quip: "a file of numbers. that's it." },
  "why-ocr-quietly-breaks-document-ai": { quip: "lost at the scanner, lost for good." },
};

/**
 * The cover for one Systems article. `hero` is the version drawn at the top of
 * the article itself, where the page already shows the title: the quip takes
 * the title's place. The default, with the title, is the link preview.
 */
export function ArticleCover({ slug, title, kicker, hero = false }: { slug: string; title: string; kicker: string; hero?: boolean }) {
  const spec = COVERS[slug];
  return (
    <svg viewBox={`0 0 ${COVER_W} ${COVER_H}`} className="ill-svg" role="img" aria-label={`Cover: ${title}. ${spec?.quip ?? ""}`}>
      <rect width={COVER_W} height={COVER_H} fill={C.paper} />
      <rect width={COVER_W} height={8} fill={C.ink} />
      <text x={72} y={92} className="ill-mono" fontSize={18} letterSpacing={3} fill={C.accent}>
        {kicker}
      </text>
      {hero ? (
        spec && (
          <Para x={72} y={170} w={520} h={330} size={68} font="hand" weight={700} color={C.ink} lh={1.02}>
            {spec.quip}
          </Para>
        )
      ) : (
        <>
          <Para x={72} y={116} w={540} h={360} size={54} weight={800} color={C.ink} lh={1.04}>
            <span style={{ letterSpacing: -1.6 }}>{title}</span>
          </Para>
          {spec && (
            <Hand x={72} y={530} size={40} color={C.accent}>
              {spec.quip}
            </Hand>
          )}
        </>
      )}
      <text x={72} y={586} className="ill-mono" fontSize={17} letterSpacing={2.4} fill={C.muted}>
        PRUNINGMYPOTHOS.COM
      </text>
      {spec && <Emblem slug={slug} x={660} y={44} />}
    </svg>
  );
}
