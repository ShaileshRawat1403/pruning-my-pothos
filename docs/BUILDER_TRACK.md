# Builder track: Works On My Prompt

The plan for PMP's material for new-age builders: people building with AI who
are not traditional developers. Any agent picking this up reads this file
first, does the **next open step** in the order below, and updates this file
before stopping. One step at a time; do not start the next one until the
owner has reviewed the current one.

Started 2026-10-01. Owner direction, verbatim in substance: visual
storytelling is the primary theme; practical insight, tool stacks,
frameworks and techniques; sarcastic, dark humour; names people relate to.

## Where it lives

- Section: **Works On My Prompt**, on the Shelf at `/shelf/reference/`
  (the URL predates the name and is kept). Shown on the home page in place of
  the old "Connect the dots" block.
- Name, tagline, intro, type labels: `src/lib/content/reference-sheets.ts`
  (`BUILDER_SECTION`, `REFERENCE_TYPE_LABEL`, `REFERENCE_TYPE_NOTE`). Change
  copy there, never in the pages.
- Entries: `REFERENCE_SHEETS` in the same file; files in `public/reference/`.
- One sheet's page: `src/components/SheetPage.tsx`, routed at
  `src/app/shelf/reference/[slug]/`. Drawings: `illustrations/sheets.tsx`.
- Working notes and gap analysis: `private/content-gaps.md` (local only).

## Who it is for

Someone who can now build software because an assistant writes the code:
an analyst, a writer, a product person, a founder, a designer. They can
describe what they want. They have never had to think about what happens
after the demo works. Every sheet answers a question that person actually
hits, in the order they hit it.

## Voice

Sarcasm, brutal honesty, dark humour. Same register as the drawings
(`docs/STORYBOARD_AUTHORING.md`): deadpan, blunt, never cruel to the reader.

- The joke is about the situation and the habit: shipping on Friday, the
  agent that said "done", the prompt that worked once. Never about who the
  reader is, and never about identity. No sexual humour.
- Funny title, plain promise. The title is the joke ("Write It Down or Watch
  It Guess"); the line under it says exactly what you will be able to do.
- The humour never makes a claim. "Guessed anyway" is a joke about a habit;
  it does not say how often anything happens.
- **Banned, because it is the stock voice this site exists to avoid:** "field
  guide", "field notes", "field manual", "from the trenches", "deep dive",
  "level up", "supercharge", "ultimate guide", "pro tips", "hacks",
  "journey", "unlock", "game-changer". `npm run lint:gates` fails on most of
  them in the builder files and the home page.
- House rules hold: no em dashes, no "it's not X, it's Y".

### Type names

| Key | Label | What it is |
|:--|:--|:--|
| `manual` | Post-Mortem, Pre-Written | Step by step: every step you will be told you should have done, in order, while it still helps |
| `mindmap` | Conspiracy Board | One topic, every thread pinned, the string in order |
| `architecture` | Blast Radius Map | Every part, every connection, how far one mistake travels |
| `cheatsheet` | Things You'll Google Anyway | The one page you keep open in the other tab |
| `slides` | The Long Way Round | A system, step by step, ending where it breaks |

## The sheet format

Every sheet is written and drawn here, and has its own page at
`/shelf/reference/<slug>/`. No PDFs, no outside drafting tools (NotebookLM
is out of scope; see the decisions log).

**Data** (`ReferenceSheet` in `src/lib/content/reference-sheets.ts`):

| Field | What goes in it |
|:--|:--|
| `title` | The joke |
| `quip` | Optional: a short label on the cover, its own joke |
| `type` | One of the five keys above |
| `promise` | Finishes "After this, you can ...". A verb that happens off the page |
| `summary` | The situation, two or three sentences |
| `article` | The Systems article that explains why. Its stage is shown with it |
| `steps[]` | `do` (the instruction), `check` (how you know it worked, without trusting anyone's word), `fails` (what it looks like when skipped) |
| `tools[]` | `name`, `forWhat`, `notFor`, `docs` (the tool's own documentation), `asOf` (the date that was true) |
| `stops` | What doing all of this still does not give you |
| `sources[]` | Every outside claim's source, plus any specimen, pinned |
| `scene` | The id of the drawn steps in `illustrations/scenes/`, if drawn |

**Page** (`src/components/SheetPage.tsx`), top to bottom: section, type and
stage; title; the promise; the drawn cover (`SheetCover` in
`illustrations/sheets.tsx`: type, title, the type's emblem, someone
unimpressed, the quip); the summary; the steps as a pinned scroll scene,
one beat per step (Step NN, the do, "Check:", "If it fails:"), or as a plain
list when not yet drawn; the tools from their own docs; where it stops,
with the article; the sources.

**Drawings**: each type has an emblem (`SheetTypeEmblem`), used on cards and
the empty state. Each sheet's steps get their own scene drawing in the
deadpan register: the same objects change step by step, one idea per step.

**Checks**: Test 71 fails if a sheet links to a Systems article that does
not exist or a tool note has no date. The sitemap lists the section and its
sheets once the first sheet is published.

**Review before publishing**: drafts are shown on the local, gitignored
route `/dank-samples/sheet-sample/` (or one like it) and are published only
after the owner reads them there. Start the dev server for that review, say
which URLs to open, and stop it after; do the work itself against the build.

## Order of work

Status: `done`, `next`, `open`, `parked`.

| # | Step | Status |
|:--|:--|:--|
| 1 | Name the section and the types; revoice the pages; per-sheet disclosure | done (2026-10-01) |
| 2 | The sheet format: data, page, cover, type emblems, drawn steps; a draft sample on the local route | done, awaiting owner review (2026-10-01) |
| 3 | "Write It Down or Watch It Guess": the file your coding agent reads first (stage 7). Drafted as the step 2 sample; publish after review | next |
| 4 | A ten-case check in a spreadsheet (stage 6), using the site's csv-to-eval tool | open |
| 5 | Give an assistant your documents, and know what it can see (stage 2) | open |
| 6 | Conspiracy Board: the builder's stack, by category, dated | open |
| 7 | Choosing a model (stage 1), anchored on the Shelf's local and cloud baselines | open |
| - | Project POCs for the flagship articles | parked until the owner's projects are finished |

Titles for steps 3 to 7 are working titles; each gets its funny title when
its step starts, approved by the owner.

## Decisions log

- 2026-10-01: Section named **Works On My Prompt**. Types renamed as above.
  URL kept at `/shelf/reference/`.
- 2026-10-01: "Field" anything (guide, notes, manual) is banned as stock
  voice. The step-by-step type is **Post-Mortem, Pre-Written**; the tagline is
  "For everyone AI promoted to builder without asking."
- 2026-10-01: NotebookLM-drafted sheets are out of scope: they do not fit
  this section. The disclosure and `drafted` field are removed; the prompt
  kit (`docs/REFERENCE_SHEETS_PROMPTS.md`) is parked.
- 2026-10-01: Sheets are pages with drawn steps, not downloads.
