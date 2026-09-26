# Reference sheets: batch 01

Four sheets, one of each type, covering the Systems Map. Each prompt below is
complete: STYLE and HONESTY blocks are already included, so paste the whole
block as it is. The kit and the review loop are in
`docs/REFERENCE_SHEETS_PROMPTS.md`.

| # | Sheet | Type | NotebookLM Studio option | File name to save as |
|:--|:--|:--|:--|:--|
| 1 | The Systems Map | Mind map | Mind map | `systems-map--mindmap.png` |
| 2 | Governed tool execution | Architecture sheet | Infographic, landscape, detailed | `governed-execution--architecture.pdf` |
| 3 | Retrieval, step by step | Slide guide | Slide deck, Detailed, default length | `retrieval--slides.pdf` |
| 4 | Is it ready? | Cheat sheet | Infographic, portrait, standard | `readiness--cheatsheet.pdf` |

## Notebook setup (once)

Create one notebook, **"PMP Systems: reference sheets"**, and add these as
**Website** sources. Then ask in chat: *"Summarise what each source actually
says, one line each."* If any comes back thin or empty, remove and re-add it.

```
https://pruningmypothos.com/systems/what-an-ai-model-actually-is/
https://pruningmypothos.com/systems/retrieval-augmented-generation-in-plain-terms/
https://pruningmypothos.com/systems/context-windows-as-working-memory/
https://pruningmypothos.com/systems/prompting-is-not-the-skill-you-think-it-is/
https://pruningmypothos.com/systems/from-agent-intent-to-governed-execution/
https://pruningmypothos.com/systems/tool-use-when-language-triggers-actions/
https://pruningmypothos.com/systems/policy-governed-mcp-runtimes-for-secure-tool-execution/
https://pruningmypothos.com/systems/human-in-the-loop-is-a-system-design-choice/
https://pruningmypothos.com/systems/evaluation-is-a-human-problem/
https://pruningmypothos.com/systems/observability-first-ai-systems/
https://pruningmypothos.com/systems/agent-instructions-and-handoff-as-an-operating-system/
https://pruningmypothos.com/systems/from-prompt-to-production/
```

Before each sheet, **untick all sources, then tick only the ones listed for
that sheet.**

---

## 1. The Systems Map (mind map)

**Tick:** all 12 sources, then add this as a **Copied text** source named
`Outline: The Systems Map` (it shapes the branches; the mind map itself takes
no prompt):

```
The Systems Map: eight questions to ask of any AI system
- How models work: what is actually generating the output? A file of numbers that ranks what comes next; everything else is built around it.
- Context & retrieval: what can it see, and how did that get there? Retrieval finds material; context assembly decides what the model receives.
- Instructions & contracts: what are we asking it to do, and what is enforced? A prompt shapes; a check outside the prompt enforces.
- Action & authorization: what can become a real effect? Check the request, decide if it is permitted, run it, verify what happened.
- Human judgment: where does a person have to decide? Oversight needs an open decision, an owner, context and real alternatives.
- Evaluation & evidence: how do we know the behaviour was acceptable? Write down what good means first; every check approximates it.
- State & continuity: what has to survive across a boundary? What is currently true, and who owns the next step.
- Readiness: is there enough evidence and control for this use? Readiness is a judgment about a specific exposure, not a stage.
```

Generate, expand every node, download the image. After downloading, **remove
the outline source** so it doesn't leak into the other sheets.

---

## 2. Governed tool execution (architecture sheet)

**Tick:** from-agent-intent-to-governed-execution, tool-use-when-language-triggers-actions,
policy-governed-mcp-runtimes-for-secure-tool-execution, prompting-is-not-the-skill-you-think-it-is.

**Studio → Infographic → landscape, detailed. Prompt:**

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
- Last page: "Sources" with each source listed by title.

Create a single-page architecture reference titled "From a model's request to
a real effect".

One-line summary at the top: "A model can only ask. Software decides whether
the ask becomes an effect, runs it, and checks what actually happened."

Show, left to right, as labelled boxes:
1. Model: emits a structured request (not an action).
2. Application code: reads the request.
3. Validate: is it a real operation, with the right types, about things that exist?
4. Permit: is it allowed for this caller, in this context, right now? Mark this
   with a stamp icon. Show "ask a person" as a branch where the answer is not obvious.
5. Execute: the tool runs, within limits.
6. Verify: did the intended change actually happen? (Not just "did it return".)
7. Record: what was requested, decided, run and observed.

Number every arrow in the order one request travels, each labelled with a verb.

Draw a dashed trust boundary around content that comes from outside (web
pages, documents, tool output), with the note: "Reading it doesn't make it an
order." Show that the permit check sits outside the model.

Mark in terracotta the three places this most often goes wrong, each with a
short note: allowed but not valid; ran but failed; returned success but
changed nothing.

Legend in the bottom corner.
```

---

## 3. Retrieval, step by step (slide guide)

**Tick:** retrieval-augmented-generation-in-plain-terms, context-windows-as-working-memory,
what-an-ai-model-actually-is.

**Studio → Slide deck → Detailed, default length. Prompt:**

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
- Last page: "Sources" with each source listed by title.

Create a step-by-step slide guide titled "Retrieval, step by step" for people
who build or buy AI assistants that answer from documents.

Structure:
1. Title page: the title and the promise "Know where an answer came from, and
   where it can go wrong on the way."
2. "The one-line version": retrieval finds candidate material; context
   assembly decides what the model actually receives.
3. The model only sees its input. Metaphor: a letterbox. Whatever doesn't come
   through the slot doesn't exist for this answer.
4. Step: the question arrives.
5. Step: search finds candidates. Note that "search" can mean keyword, meaning
   (embedding) similarity, or both.
6. Step: ranking puts candidates in order. Similar is not the same as correct.
7. Step: context assembly chooses what goes into the window, which is bounded.
8. Step: the model answers from what it was handed.
9. "Where it breaks": not found; found but not handed over; handed over but
   out of date. Each with the sign you would notice.
10. "Checklist": five yes/no questions a reader can ask of their own system,
    drawn only from the sources.
11. Sources.
```

---

## 4. Is it ready? (cheat sheet)

**Tick:** from-prompt-to-production, evaluation-is-a-human-problem,
human-in-the-loop-is-a-system-design-choice, observability-first-ai-systems.

**Studio → Infographic → portrait, standard. Prompt:**

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
- Last page: "Sources" with each source listed by title.

Create a one-page cheat sheet titled "Is it ready? (For what, exactly?)".

Sections, top to bottom:
1. "In one line": readiness is a judgment that the evidence and controls in
   hand justify this exposure, for these users, doing this job. Deployed is
   not the same as ready.
2. "Ready for what": a small fill-in box with three blanks: who uses it,
   for which job, what happens when it is wrong.
3. "Evidence": what good means was written down before testing; what the
   evidence does not cover is named.
4. "Controls": what limits the consequence; what can actually be undone;
   when the system should stop.
5. "People": who decides, who answers, and whether the people using it can
   actually work with it.
6. "Keep watching": what is recorded while it runs, so behaviour can be
   investigated later.
7. "The decision expires": when this judgment must be made again.
Keep it scannable: checkboxes and short lines, no paragraphs, nothing under
10pt when printed on A4.
```

---

## Bring back

Put the four downloads in one folder, named as in the table above, and send
this per sheet:

```
title:
type:
file:
sources ticked:
anything that looked off:
```

We then review page by page (keep / fix copy / regenerate), edit, and publish
to Shelf → Reference sheets.
