# Reference sheets: NotebookLM prompt kit

Reference sheets are downloadable quick-reference assets (slide guides,
architecture sheets, mind maps, cheat sheets) drafted in NotebookLM, reviewed
and edited by PMP, hosted on the Shelf and showcased on the home page. This kit keeps every sheet looking like it belongs to the same
series and keeps them inside the editorial contract.

Every prompt below is built from three blocks. Paste them in this order:
**STYLE + HONESTY + the type prompt**, with the `{placeholders}` filled in.

---

## 0. Before generating: sources

The output can only be as good as the sources.

- Add the PMP article itself as a source (`https://pruningmypothos.com/systems/<slug>/`),
  plus the primary sources it cites.
- Check each source actually loaded. A YouTube source with no transcript gives
  NotebookLM only the title and chapter names, and it will fill the gaps with
  invention. Ask in chat: "Summarise what each source actually says." If one
  comes back thin, replace it.
- Tick only the sources relevant to this sheet before generating.

---

## 1. STYLE block (paste into every prompt)

```
VISUAL STYLE (apply to every page):
- Background: warm off-white paper, #F4F1E8. Never black or dark backgrounds.
- Ink: deep slate #1F2A36 for text and lines. Accent: terracotta #C0663C for the
  one thing that matters most on each page. Secondary: teal #2A6F7F for flows
  and labels. Soft fills only: sand #E9E2D0, white cards.
- Illustration: flat, hand-drawn line illustration with a slightly wobbly ink
  outline, like a technical notebook sketch. Everyday objects as metaphors
  (a door, a ledger, a stamp, a checklist) rather than robots or glowing brains.
- Never use: robots, humanoid AI figures, glowing neon, lens flares, glossy 3D
  renders, stock-photo people, circuit-board brains, sparkles.
- Type: bold grotesque sans-serif for headings, monospace for component names
  and labels, clean sans for body text. Generous whitespace, left-aligned.
- Diagrams: boxes with thin ink borders, arrows labelled with a verb
  ("sends", "checks", "writes"), no unlabelled arrows.
- One idea per page. At most about 40 words of body text per page.
```

## 2. HONESTY block (paste into every prompt)

```
CONTENT RULES:
- Only state what the selected sources support. If the sources don't cover
  something, leave it out rather than filling the gap.
- No invented statistics, percentages, benchmarks, dates or costs. If a real
  figure from the sources is used, put the source name in small text under it.
- Any worked example with names, amounts or companies must be labelled
  "Illustrative example" on the page.
- No predictions or hype: no "the future is", "revolutionary", "fully
  autonomous", "game-changer", no claims about hours or money saved.
- Where a human decision, approval or check belongs in a system, show it.
- Plain words. Avoid: seamless, robust, leverage, unlock, deep dive,
  cutting-edge, empower. Do not use em dashes.
- Last page: "Sources" with each source listed by title. (The PMP footer and
  the disclosure line are added in editing, see section 6.)
```

---

## 3. Type prompts

### A. Slide guide (Studio → Slide deck, format: Detailed, length: default)

```
Create a step-by-step slide guide titled "{Title}" for {audience, e.g.
"engineers new to production AI"}.

Structure:
1. Title page: the title and a one-sentence promise of what the reader will
   be able to do after reading.
2. "The one-line version": the whole idea in one sentence.
3-{N}. One page per step or building block, in the order a reader needs
   them. Each page: a heading that is a plain claim, one metaphor drawing,
   and 2-3 short lines. Steps: {list the steps or concepts, in order}.
{N+1}. "Where it breaks": the 3 most common failure points, each with the
   sign you'd notice.
{N+2}. "Checklist": 5-7 yes/no questions a reader can ask of their own system.
Last page: sources and footer.
```

### B. Architecture sheet (Studio → Infographic, landscape, detail: detailed)

```
Create a single-page architecture reference for "{System}".

Show:
- Every component as a labelled box: {list components}.
- Every flow between them as an arrow labelled with a verb, numbered in the
  order a single request travels.
- Trust boundaries as dashed outlines, labelled with who owns each side.
- The points where a check or a human decision happens, marked with a small
  stamp icon.
- The 2-3 places this design most often fails, marked in terracotta with a
  short note.
- A legend in the bottom corner, and a one-line summary at the top:
  "{one-sentence thesis}".
```

### C. Cheat sheet (Studio → Infographic, portrait, detail: standard)

```
Create a one-page cheat sheet titled "{Title}".

Sections, top to bottom:
1. "In one line": the thesis, "{thesis}".
2. "Terms": up to 6 terms, each with a one-line plain definition.
3. "How it flows": a small numbered diagram of {process}.
4. "Choose this when / not when": a two-column comparison of {A vs B}.
5. "Ask of your system": 5 yes/no questions.
Keep it scannable: no paragraphs, nothing under 10pt when printed on A4.
```

### D. Mind map (Studio → Mind map)

NotebookLM's mind map takes no prompt; it maps the ticked sources. To shape it:

1. Tick only the sources for this topic.
2. Add a short **text source** (Add sources → Copied text) named
   `Outline: {Title}` containing the branches you want, for example:
   ```
   {Title}
   - {Branch 1}: {sub-idea}, {sub-idea}
   - {Branch 2}: {sub-idea}, {sub-idea}
   - {Branch 3}: {sub-idea}, {sub-idea}
   - Where it fails: {failure}, {failure}
   ```
3. Generate, expand every node, then download/export the image.

The mind map's colours can't be styled, so the Shelf page frames it on the
house paper.

---

## 4. Worked example: API design (the "System Design 101" notebook)

Fill-in for prompt A:

```
Create a step-by-step slide guide titled "Designing APIs That Survive
Production" for engineers moving from working code to systems others depend on.

Structure:
1. Title page ...
3-8. Steps: the contract (resources, verbs, status codes); versioning;
   authentication vs authorisation; idempotency and retries; pagination and
   limits; observability (what to log per request).
9. "Where it breaks": ...
10. "Checklist": ...
Last page: sources and footer.
```

Note: that notebook's only source is a YouTube video whose transcript didn't
load. Add real sources first (the video's transcript pasted as text, or
written references on API design) or the deck will be invented.

---

## 5. Before downloading: check every page

- [ ] Paper background, no dark pages, no robots or glowing brains.
- [ ] Every number traces to a named source on the page, or is gone.
- [ ] Every worked example is labelled "Illustrative example".
- [ ] No hype, no future predictions, no time/money-saved claims.
- [ ] Text is readable at phone width (zoom the page to 50%).
- [ ] Source list is present.

Regenerate a single page by editing its prompt rather than accepting a wrong
page. A downloaded PDF travels without its web page, so the fix has to be in
the file.

## 6. Review loop and editing

No sheet goes up straight out of NotebookLM.

1. **Generate** with the blocks above.
2. **Review with an agent**, page by page: paste or attach the draft and ask
   for a critique against the checklist in section 5 plus the owning article.
   The agent returns a list per page: keep, fix copy (with the new copy), or
   regenerate (with a revised prompt).
3. **Iterate** until every page is a keep. Regenerate single pages rather
   than accepting a wrong one.
4. **Edit** (Keynote, Figma, Canva or similar):
   - apply the final copy fixes
   - remove the NotebookLM badge
   - add the PMP footer on every page: `Pruning My Pothos · pruningmypothos.com`
   - add to the sources page: `Drafted with NotebookLM, edited by Pruning My Pothos.`
5. **Export** PDF (and PNG for mind maps and architecture sheets).

The badge can go; the disclosure stays. It sits on the sources page and on
the sheet's Shelf page, so a downloaded file still says how it was made.
Check NotebookLM's current terms on output attribution before the first
upload.

## 7. Handing it over

Save files as `<topic-slug>--<type>.<ext>`, for example
`designing-apis--slides.pdf`, `designing-apis--architecture.png`,
`designing-apis--mindmap.png`. Put them in one folder and send, per sheet:

```
title:
type: slides | architecture | cheatsheet | mindmap
file:
related articles: (PMP slugs, if any)
sources used: (titles or URLs)
```

The Shelf reference section is built from that; the files get compressed
(target under 4 MB each) and each gets a text summary page so it's searchable.
