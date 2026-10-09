# Visual track: the site tells it in pictures

The plan for making Pruning My Pothos a visual storytelling site in its own
register: sarcastic, dry, darkly funny, drawn. Any agent picking this up reads
this file, does the **next open step** in the order below, shows it to the
owner on localhost, and updates this file before stopping. One step at a
time.

Started 2026-10-02. Owner direction, in substance: visual storytelling with
sarcasm and dry dark humour is the point; motion graphics across the whole
site for visual delight; no content blob without a visual; longer, better
scroll sequences; tighter UI/UX; better navigation and linking; a better
logo. The foundation (deadpan register, cover films, scroll scenes) stays;
this enhances it.

## The rules that do not bend

Everything in `docs/STORYBOARD_AUTHORING.md` and the editorial contract
holds. In short:

- **A drawing never claims more than its article.** New visuals are built
  from statements already in the article, in its own words, through the
  editorial skill's Visual Decision Pass. Illustrative details stay
  illustrative.
- **Deadpan:** the joke is the situation and the habit, never the reader,
  never identity, no sexual humour. One wrong detail, drawn straight.
- **Motion:** one thing moves at a time. Reduced motion, print and exports
  get the still. Nothing moves that the reader must read while it moves.
- **Legibility:** nothing a reader must read under 18px in a scene;
  handwriting 24px or more.

## Where it stands (measured 2026-10-02 from the build)

- Every Systems article has exactly two visuals: the cover (with film) and one
  scroll scene. The longest run of body text with no visual ranges from 295
  to 2,272 words; 15 of 28 articles run past 750.
- Scroll scenes have 4 to 7 steps (14 of 28 have 4).
- Pages with no drawing at all: Self (27), Sentences (63 of 64), Tools (23 of
  24), About, Portfolio, Schema, Live lab, Newsletter, 404, tag pages.
- The header logo is a stock line-icon leaf in a circle, unrelated to the
  drawn register.

## Targets

- **No blob:** no stretch of article body longer than about 400 words
  without a visual (an inline scene, a gag panel or a diagram).
- **Scenes as explanations:** a flagship article's main scene walks its whole
  mechanism, 6 to 10 beats, each beat one idea.
- **Every page type moves a little:** each has at least one drawing with
  small, reduced-motion-safe motion.

## Order of work

Status: `done`, `next`, `open`, `parked`.

| # | Step | Status |
|:--|:--|:--|
| 1 | Hero plate gets "Play again"; cover-film replay visible at rest | done (2026-10-02) |
| 2 | **Logo**: the Deadpan Leaf (`src/components/brand/DeadpanLeaf.tsx`), chosen by the owner from three concepts. In the header (on a paper disc), the favicon and the default share card; both images render from `/brand-art/` with `npm run export:storyboards -- --only=brand` | done, deployed (2026-10-03) |
| 3 | **Linking**: each Systems article shows the Works On My Prompt sheets built on it ("Do it yourself"), and ends with "Next on the map" to the following stage's flagship. Sheet cards everywhere show the sheet's own cover instead of the shared type emblem | done (2026-10-02) |
| 4 | **No blob, flagships first**: the handoff article (stage 7) gets seven inline visuals, each a drawn scroll scene built from its own paragraph: a decision made three times; instruction or state; what makes it a handoff; payload or shared store; a file called current (evidence, from the repository specimen); when the next step cannot proceed; replay or resume. Longest text run 2,272 words, now 419. Readiness (stage 8) gets eight: five words for ready; demo or readiness; adjacent is not evidence; criterion before or after (the target painted around the arrows); what the gates establish (evidence, from the repository); safe ways to stop; what can be undone; the decision expires. 2,020 words, now 456 | done, deployed (2026-10-03) |
| 5 | No blob, the other six stage articles: human-in-the-loop (4 scenes, 1,312 to 388 words), retrieval (4, 976 to 351), governed execution (3, 948 to 346), what a model is (3, 850 to 349), evaluation (3, 772 to 385), prompting (3, 616 to 323). All eight stage articles now stay under ~460 words between visuals | done, deployed (2026-10-03) |
| 6 | No blob, the twenty companions and notes: every remaining Systems article now has scenes declared from its own paragraphs (78 new across 17 articles on 2026-10-09). The longest run between visuals anywhere is about 500 words, counting end matter | done (2026-10-09), not yet deployed |
| 7 | **Motion everywhere**: a small drawn, moving header or spot for Self, Sentences, Tools, About, 404 (template-driven, one drawing per page type, not per page) | next |
| 8 | **UI/UX tightening**: header, mobile menu, spacing and type rhythm, card consistency, footer; audited page by page against a short checklist | open |
| 9 | Home hero: a second look once the logo and motion system settle | open |

## Decisions log

- 2026-10-09: Scenes need at least three beats. A comparison without a
  `diffNote`, or a two-layer `layers` visual, gives two; add a diffNote
  from the article's own words or use a boundary. Insert visuals with a
  script that appends to the end of the `visuals:` list, which is not
  always the last frontmatter key. Check frames with `scripts/screenshot.mjs`.
- 2026-10-02: The pattern for "no blob": declare visuals in the article's
  frontmatter from statements already in its body (the editorial gate checks
  them), place each marker right after the paragraph it draws, and give
  each a scene in `illustrations/scenes/` registered in `SCENES` and
  `SCENE_IDS`. Regenerate `docs/EDITORIAL_AUDIT.md` (`npm run
  audit:editorial`) after any article change, or Test 42 fails.
- 2026-10-02: Logo: the Deadpan Leaf (B), over The Snip and The Pruned Pot.
  The favicon and default share card were the owner's self-portrait; the
  portrait stays on About and Calibrations.
- 2026-10-02: Program started from the owner's direction above. Measured
  baseline recorded under "Where it stands".
