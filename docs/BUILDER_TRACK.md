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
- Working notes and gap analysis: `private/content-gaps.md` (local only).

## Who it is for

Someone who can now build software because an assistant writes the code:
an analyst, a writer, a product person, a founder, a designer. They can
describe what they want. They have never had to think about what happens
after the demo works. Every sheet answers a question that person actually
hits, in the order they hit it.

## Voice

Same register as the drawings (`docs/STORYBOARD_AUTHORING.md`): deadpan,
blunt, dark, never cruel to the reader.

- The joke is about the situation and the habit: shipping on Friday, the
  agent that said "done", the prompt that worked once. Never about who the
  reader is, and never about identity. No sexual humour.
- Funny title, plain promise. The title is the joke ("Ten Ways It Lied To
  You"); the first line under it says exactly what you will be able to do.
- The humour never makes a claim. "It lied" is a joke about a wrong answer;
  it is not a claim that models intend anything.
- House rules hold: no em dashes, no filler words, no "it's not X, it's Y".

### Type names

| Key | Label | What it is |
|:--|:--|:--|
| `manual` | Field Manual | Step by step: do this, check that, here is what failure looks like |
| `mindmap` | Conspiracy Board | One topic, every thread pinned, the string in order |
| `architecture` | Blast Radius Map | Every part, every connection, how far one mistake travels |
| `cheatsheet` | Things You'll Google Anyway | The one page you keep open in the other tab |
| `slides` | The Long Way Round | A system, step by step, ending where it breaks |

## How a sheet is made

Visual storytelling first: every sheet is drawn before it is written.

1. **Pick the question** from the order of work below. Write the promise in
   one line: "After this, you can ___" (a verb that happens off the page).
2. **Find its Systems article.** Every sheet links to the article that
   explains why. The sheet is the practice; the article is the reason.
3. **Draw it.** Deadpan register, the same kit (`illustrations/deadpan.tsx`).
   A Field Manual is a sequence of drawn steps, one idea per step.
4. **Write it.** Steps, how to verify each, what failure looks like, where
   it stops.
5. **Tools.** Name a tool only to say what it is for and what it does not
   do, linked to its own documentation and dated "as of". No rankings, no
   "best", no prices, no comparative claims without a source.
6. **Honesty.** A procedure is a procedure. Nothing is presented as tested
   unless the owner tested it and says so. Illustrative examples are framed
   as illustrative. The editorial contract applies (`AGENTS.md`).
7. **Disclosure.** `drafted: "pmp"` for sheets written here;
   `drafted: "notebooklm"` shows the NotebookLM line on the card.
8. **Owner review** before it is listed. Then add the entry, export the
   files, run the gates.

## Order of work

Status: `done`, `next`, `open`, `parked`.

| # | Step | Status |
|:--|:--|:--|
| 1 | Name the section and the types; revoice the pages; per-sheet disclosure | done (2026-10-01) |
| 2 | The Field Manual format: data fields, the page or PDF layout, the drawn-step template | next |
| 3 | Field Manual: the file your coding agent reads first (stage 7). Specimen: this repo's AGENTS.md and HANDOVER.md, pinned | open |
| 4 | Field Manual: a ten-case check in a spreadsheet (stage 6), using the site's csv-to-eval tool | open |
| 5 | Field Manual: give an assistant your documents, and know what it can see (stage 2) | open |
| 6 | Conspiracy Board: the builder's stack, by category, dated | open |
| 7 | Field Manual: choosing a model (stage 1), anchored on the Shelf's local and cloud baselines | open |
| - | Project POCs for the flagship articles | parked until the owner's projects are finished |

Titles for steps 3 to 7 are working titles; each gets its funny title when
its step starts, approved by the owner.

## Decisions log

- 2026-10-01: Section named **Works On My Prompt**, tagline "Field manuals
  for people AI promoted to builder without asking." Types renamed as above.
  URL kept at `/shelf/reference/`.
- 2026-10-01: The NotebookLM disclosure moved from the section to each sheet
  (`drafted`), because field manuals are written here.
