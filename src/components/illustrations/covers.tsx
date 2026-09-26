import React from "react";
import { C, Hand, Para } from "./kit";
import { Emblem } from "./emblems";
import { DeadpanDefs, Paper } from "./deadpan";

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
  "a-simple-tokenizer": { quip: "Sliced. Sold. Surcharged." },
  "agent-instructions-and-handoff-as-an-operating-system": { quip: "Full transcript. Zero clue." },
  "ai-agents-vs-ai-workflows": { quip: "Same car. Pick who crashes it." },
  "ai-architecture-explained-how-modern-llm-applications-work": { quip: "Every layer assumes the last one checked. None did." },
  "architecture-of-in-chat-ai-apps": { quip: "It's a button. Not a blessing." },
  "context-windows-as-working-memory": { quip: "Small window. Strong opinions." },
  "designing-reusable-ai-skills": { quip: "Labelled, or it's leftovers." },
  "evaluation-is-a-human-problem": { quip: "Graded on vibes. Shipped on hope." },
  "from-agent-intent-to-governed-execution": { quip: "It can ask. It can't sign." },
  "from-prompt-to-production": { quip: "Deployed. Delighted. Disowned." },
  "human-in-the-loop-is-a-system-design-choice": { quip: "Present. Polite. Powerless." },
  "i-7-cognitive-loop": { quip: "Decide early. Or explain later." },
  "observability-first-ai-systems": { quip: "Logged everything. Learned nothing." },
  "policy-governed-mcp-runtimes-for-secure-tool-execution": { quip: "Read it. Don't obey it." },
  "prompting-is-not-the-skill-you-think-it-is": { quip: "Asked nicely. Ignored politely." },
  "retrieval-augmented-generation-in-plain-terms": { quip: "Found it. Filed it. Forgot it." },
  "runtime-over-model-why-orchestration-is-the-product": { quip: "New hamster. Same wheel." },
  "semantic-caching-for-probabilistic-systems": { quip: "Close enough. Charged twice." },
  "seo-aeo-geo-in-plain-terms": { quip: "Yelling at clouds. Ignoring the garden." },
  "skills-vs-prompts-vs-agents": { quip: "It's a cake, not a career ladder." },
  "structured-output-and-why-it-matters": { quip: "Wrong shape. Rightly rejected." },
  "systems-001-foundations": { quip: "Fewer buzzwords. Better questions." },
  "tech-stack-for-nlpg-driven-ai-assisted-sdlc": { quip: "Argue on paper. Paper's cheaper." },
  "tool-use-when-language-triggers-actions": { quip: "The waiter shouts. The kitchen's liable." },
  "training-vs-inference": { quip: "Pressed once. Played forever." },
  "what-a-system-prompt-actually-is": { quip: "House rules, not homework." },
  "what-an-ai-model-actually-is": { quip: "A file of numbers. Worshipped accordingly." },
  "why-ocr-quietly-breaks-document-ai": { quip: "Garbage in. Confidently out." },
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
      <DeadpanDefs id={`cv-${slug}`} />
      <Paper id={`cv-${slug}`} w={COVER_W} h={COVER_H} />
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
