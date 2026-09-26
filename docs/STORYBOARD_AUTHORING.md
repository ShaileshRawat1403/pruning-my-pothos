# Storyboard and cover authoring

How to add a storyboard (an illustrated PDF explainer) or an article cover to
Pruning My Pothos. Written so any agent or person can do it the same way.

Everything here is governed by the editorial contract (`AGENTS.md`): a drawing
may not claim anything its article does not. The joke is always the argument,
said sideways.

## What these things are

| Thing | What it is | Where it lives |
|:--|:--|:--|
| **Storyboard** | A short deck of 4:5 frames that draws one Systems article. Viewed at `/storyboards/<slug>/`, downloadable as a PDF. Its own entity: it links to its article and back, and neither lives inside the other. | `src/components/illustrations/decks/<article-slug>.tsx` |
| **Cover** | The 1200 x 630 drawing at the top of every Systems article, also used as its link preview. | one entry in `src/components/illustrations/covers.tsx` |
| **Diagram** | A structured visual inside an article body. Not covered here. | the article's `visuals[]` frontmatter |

## The register: deadpan

PMP draws in one register, **deadpan**: people and objects who have seen
through the hype, drawn straight, with one thing wrong. Funny first, then it
lands. The kit is `illustrations/deadpan.tsx`; the agreed reference is the
style sheet at `/style-sheet/` (not public).

**Look.**
- Aged paper (`D.paper`) with grain and a soft vignette (`Paper`), thick ink
  (5px) with a slight wobble (`Ink`, and `boil` when it moves).
- Flat fills from the palette only: face, grey, shirt, teal, terracotta, leaf.
  Scribble hatch for shade. No gradients, no glow, no 3D.
- Faces are deadpan: half-lidded (`SleepyEye`), flat mouths, side-eye,
  stubble. Saucer eyes (`SaucerEye`) for panic. The joke is how little they
  react.
- One exaggeration per figure: a tiny head, satellite ears, a pencil neck,
  shears twice the size of the gardener.
- People and objects, as the topic and the script need. Never the same
  character on every cover.

**Voice.**
- Every emblem is a **visual pun**: draw the phrase literally, then undercut
  it (a man lassoed inside a loop, sipping tea: *human in the loop*).
- Every cover has one **quip** in `covers.tsx`: dry, relatable, usually three
  beats, often alliterative (*Present. Polite. Powerless.*, *Found it. Filed
  it. Forgot it.*).
- Dark and sarcastic is welcome. **No sexual humour.**
- Be blunt about people: their habits and the roles they play are fair game
  (the hype merchant, the executive who approves decks unread, the engineer
  who ships on Friday, the reviewer who reads the summary). Not who someone
  is by birth or body: race, gender, religion, disability, nationality, looks.
- Still honest: the pun may not claim anything the article does not.

**Theme repeats, subjects don't.** The paper, ink, palette, faces and
handwriting stay the same everywhere; the subject never does. A reader
scrolling the library should see thirty different jokes, not one mascot.

**Emblems.** Each Systems article has one emblem in
`illustrations/emblems.tsx`, drawn in a local 500 x 540 box in the deadpan
register. That single drawing is the article cover, the storyboard's first
frame and the link preview. To find one: say the thesis as a phrase people
already use, draw that phrase literally, then add the one wrong detail that
makes it true.
Words inside the drawing are part of the joke and follow the honesty rules.
Test 70 fails if an article has no emblem, or if the cast turns up in more
than two emblems.

**The older cast** (`illustrations/kit.tsx`) is for the inside of a story, when
one character carrying an argument across frames makes it clearer. It is not
a mascot: don't put it on covers, and don't reach for it by default.

| Component | Who | Rule of thumb |
|:--|:--|:--|
| `<Model lines={[...]} />` | A speech bubble with legs. Its body is its text. | It can only ask, rank or say. It never does. |
| `<Gate counter="..." />` | An unimpressed clerk with a rubber stamp. | Decides whether something may happen. |
| `<Courier receipt="..." />` | The Tool: a grinning courier holding a receipt. | Does what it's told, then reports it did. |
| `<Ledger was="..." now="..." />` | The Record: an open ledger. | The only witness worth asking. |
| `<Person />` | A person who can decide. | Only where a human actually decides. |

Props (`illustrations/props.tsx`): `Doc`, `Sticky`, `Stamp`, `Slip`, `Crate`,
`Lens`, `Padlock`, `Die`, `ButtonDoodle`, `Folder`, `Envelope`, `Scroll`,
`Ranking`, `Num`, `Checklist`, `PrunedNote`, `Cloud`. Helpers in `kit.tsx`:
`Hand` (handwritten text), `Para` (wrapping prose), `Strike` (the Pruning
Mark), `Arrow` (every arrow gets a verb). A one-off object belongs in the
emblem or frame that needs it, not in props.

**The Pruning Mark** is a hand-drawn strike through something that was really
refused, removed or corrected. What it strikes stays legible. Use at most one
per frame, and never as decoration.

## Add a storyboard

1. **Read the article.** List its thesis, its bold claims and its section
   headings. Every frame must trace to one of them.
2. **Plan 6 frames** (the first deck has 9; 6 is the norm):
   cover, 3 or 4 teaching frames, close. One idea per frame.
3. **Copy the reference deck** `decks/what-an-ai-model-actually-is.tsx` to
   `decks/<article-slug>.tsx`. The file name and `slug` must equal the
   article's slug.
4. **Build each frame from a template** (`illustrations/templates.tsx`):

   | Template | Use for |
   |:--|:--|
   | `CoverTemplate` | frame 1: title, the article's emblem, a quip, a summary. `layout="side"` adds a strip; `layout="stage"` draws the emblem large. Alternate them across decks |
   | `StepsTemplate` | an ordered path, 2-6 rows |
   | `CardsTemplate` | 2-4 cards, any of them struck |
   | `ContrastTemplate` | two things side by side |
   | `SceneTemplate` | a free drawing, optional "this -> that" line |
   | `CloseTemplate` | last frame: takeaway plus a link to the article |

5. **Write each frame's `text`**: the frame's full meaning as prose. It is the
   accessible text, the caption under the frame on the site, and what travels
   with the PDF. Say everything the drawing says.
6. **Keys** must be unique across all decks: prefix with a short name
   (`rag-cover`, `rag-stages`).
7. **Register** the deck in `decks/index.ts`.
8. **Build and export**: `npm run build && npm run export:storyboards`
   (needs Google Chrome; `--only=<slug>` renders just one). This writes the PDF,
   the share card and the cover PNG into `public/`.
9. **Look at every frame**: open `/storyboards/<slug>/print/` in a browser.
   Fix overlaps and clipped text before committing. Check phone width on
   `/storyboards/<slug>/`.
10. **Run the gates** (below) and commit the deck file, `decks/index.ts` and
    the exported files together.

### Legibility rules

A 4:5 frame is read at about a third of its size in a phone feed.

- Nothing smaller than 27px on a frame. Handwriting (Caveat) at 30px or more.
- Headlines: 2-3 lines, about 25 characters per line at 64px.
- Cover titles: up to 4 lines, about 11 characters per line at 84px.
- A handwritten note is one line, about 48 characters at 34px.

### Honesty rules

- Concrete details that make a scene work (a $40 refund, account 88, Dave)
  are illustrative. The storyboard page already says so. Never present them
  as observed.
- A repository specimen may be drawn only if the article states it, and only
  as the article states it.
- If the article hedges, the frame hedges. "Occasionally", not "1 in 10".
- House style: no em dashes anywhere a reader sees (Test 69 enforces it). Use a colon, a comma or a full stop.
- No filler vocabulary: not "seamless", "robust", "leverage", "deep dive", "unlock", "in a world of". Say the specific thing.

## Add a cover

Every Systems article needs one (the contract suite fails without it).

1. Add an entry to `COVERS` in `illustrations/covers.tsx`, keyed by the
   article slug, with a `quip` (one line, the thesis said sideways), and draw
   the article's emblem in `illustrations/emblems.tsx` (see above). Don't
   repeat the quip inside the emblem.
2. The article's frontmatter `heroImage` is `/covers/systems/<slug>.png`.
3. `npm run build && npm run export:storyboards --only=<slug>` writes the PNG.
4. Check it on the article page and at `/cover-art/<slug>/`.

## Hover and cards

Any card that is a link uses `SpotlightCard` (`src/components/SpotlightCard.tsx`):
the cursor-following glow, top rule and lift. Pass `compact` for small tiles.
Do not hand-roll a bordered link card.

## Gates

```
npm run lint
npm run test:contract
npm run build
npm run verify:covers
npm run audit
```

`test:contract` checks that every deck has an exported PDF and share card, and
that every Systems article has a cover entry and a cover PNG.
