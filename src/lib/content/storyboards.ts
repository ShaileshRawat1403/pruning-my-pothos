import { allSystems } from "content-collections";
import { SYSTEMS_MAP_SLUGS, getSystemsMap } from "./systems-map";

/**
 * Storyboards: illustrated PDF explainers, one per Systems article at most.
 *
 * A storyboard is its own entity. The Systems article is the written
 * explanation; its storyboard explains the same idea visually, as a short
 * deck of 4:5 frames that is read on the site or downloaded as a PDF. They
 * link to each other and neither lives inside the other.
 *
 * A storyboard may not claim anything its article does not. Every frame
 * carries a full text version, so the explanation never exists only as a
 * picture; that text also travels with the PDF when it is shared.
 *
 * Storyboards are drawn one at a time, when an article earns one. There is
 * no quota. The drawings live in src/components/illustrations/, keyed by
 * frame `key`.
 */

export interface StoryboardFrame {
  key: string;
  title: string;
  /** The frame's full meaning as prose: its accessible text and its caption. */
  text: string;
}

export interface Storyboard {
  /** Owning Systems article slug. Also the storyboard's own slug. */
  slug: string;
  title: string;
  summary: string;
  /** Downloadable 4:5 PDF, rendered from the same frames. */
  pdf: string;
  /** 1200 x 630 link-preview PNG, used by the storyboard and its article. */
  shareImage: string;
  frames: StoryboardFrame[];
}

const STORYBOARDS: Storyboard[] = [
  {
    slug: "from-agent-intent-to-governed-execution",
    title: "From Agent Intent to Governed Execution",
    summary:
      "What decides whether a model's request becomes a real effect, drawn in nine frames: the check, the gate, the run, and the part everyone skips.",
    pdf: "/storyboards/pdf/from-agent-intent-to-governed-execution.pdf",
    shareImage: "/storyboards/og/from-agent-intent-to-governed-execution.png",
    frames: [
      {
        key: "governed-cover",
        title: "From agent intent to governed execution",
        text: "The cast: the Model, a speech bubble with legs asking for a forty dollar refund, can only ask. The Gate permits, the Tool writes, and the Record keeps the balance. A model can ask for an action. Something else decides whether that ask becomes a real effect, and then whether it actually worked.",
      },
      {
        key: "governed-path",
        title: "Four things happen before money moves",
        text: "One: check the request. Is it a real operation, with the right types, referring to things that exist? Two: decide whether it is permitted, for this caller, in this context, right now. Three: run it, with whatever limits apply. Four: check what happened. Not whether it returned, but whether it is true. It is a sequence, not an architecture.",
      },
      {
        key: "governed-failures",
        title: "Each step fails in its own way",
        text: "A request can be valid but not allowed, and get stamped denied. It can be allowed but fail to run, when the tool errors or times out. Or it can run, return 200 OK, and change nothing, which is the most confident failure of all.",
      },
      {
        key: "governed-permission",
        title: "Four things that are not permission",
        text: "The Model asks for its refund and the Gate replies: lovely, and may it run, for you, here, now? Four things get mistaken for permission. Being logged in tells you who is asking, not what they may do. Being well-formed: so is a request to delete production. Being 97 percent sure is a mood, not a permit. A human saying yes is a way to answer the question, not the question itself. A rule in a prompt is a request; a rule at the gate is a check.",
      },
      {
        key: "governed-uncertainty",
        title: "“Not sure” isn't one answer",
        text: "A yes-or-no switch either blocks the useful or waves the rest through. Four answers work better. Allow, when it is permitted and the evidence holds, leaves a receipt. Ask, when a person should decide, leaves a question and the reason. Deny, when it is not permitted or too risky, leaves a reason code. Defer, when evidence is thin and the stakes are high, leaves a handoff note. What moves the needle most is how hard the action is to undo: the bar for allowing it rises from a one-click undo to an apology email.",
      },
      {
        key: "governed-handoff",
        title: "“Ask a human” is a handoff, not a shrug",
        text: "When the Gate hands a decision to a person, a note saying “can you take a look?” is no help: look at what, exactly? A useful handoff reads: refund forty dollars to account 88, over the twenty-five dollar auto-limit, order 4417 marked delivered, approve or decline? A specific question, with the reason. Who reviews it, what they see, and whether they can say no is its own design problem.",
      },
      {
        key: "governed-verification",
        title: "The tool says done. The record disagrees.",
        text: "The Tool holds up a 200 OK receipt and says it is all done. The Record shows the balance was 120 dollars and is still 120 dollars. A step that reports done is not a step that shows done. A 200 tells you what the interface said. If what you wanted was a change of state, go and read the state.",
      },
      {
        key: "governed-failure-classes",
        title: "“It broke” is not a diagnosis",
        text: "One bin labelled “it broke” turns incident review into storytelling. Sort failures instead. Policy denied it: was the rule right? The tool errored: fix it, or retry it. Verification failed: the tool fibbed, or you checked the wrong thing. Evidence was missing: go and get it. Over time or budget: raise the limit, or don't. You can't sort a failure at a boundary you never made explicit.",
      },
      {
        key: "governed-close",
        title: "The model still varies. Your effects needn't.",
        text: "The Model still varies: forty dollars this time, perhaps forty-one the next. The Gate applies the same rules, and the Record shows the same answer every time. The checks don't make the model deterministic. They give you a dependable answer about one candidate action: permitted or not, every time.",
      },
    ],
  },
];

export type ResolvedStoryboard = Storyboard & {
  articleTitle: string;
  articleHref: string;
  /** The Systems Map stage the owning article anchors, if any. */
  stage?: { number: number; label: string };
};

/**
 * All storyboards, each checked against its owning article (fails the build
 * loudly if one is missing), in reading order: Systems Map stages first, in
 * map order, then everything else by title.
 */
export function getStoryboards(): ResolvedStoryboard[] {
  const map = getSystemsMap();
  return STORYBOARDS.map((sb) => {
    const article = allSystems.find((s) => s._meta.path === sb.slug);
    if (!article) {
      throw new Error(`Storyboard "${sb.slug}" has no owning Systems article.`);
    }
    const i = map.findIndex((m) => m.slug === sb.slug);
    return {
      ...sb,
      articleTitle: article.title,
      articleHref: `/systems/${sb.slug}/`,
      stage: i >= 0 ? { number: i + 1, label: map[i].label } : undefined,
    };
  }).sort((a, b) => {
    const ai = SYSTEMS_MAP_SLUGS.indexOf(a.slug);
    const bi = SYSTEMS_MAP_SLUGS.indexOf(b.slug);
    if (ai !== bi) return (ai < 0 ? Infinity : ai) - (bi < 0 ? Infinity : bi);
    return a.title.localeCompare(b.title);
  });
}

export function getStoryboard(slug: string): ResolvedStoryboard | undefined {
  return getStoryboards().find((s) => s.slug === slug);
}
