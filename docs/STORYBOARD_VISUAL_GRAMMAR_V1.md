# Storyboard Visual Grammar v1

**Status**: Specification only, 2026-09-23. Nothing implemented. No schema change, renderer, migration or content is authorised by this document.
**Scope**: The visual grammar for article-owned structured visuals (`visuals[]`) and the `/storyboards/` surface that indexes them.
**Governed by**: [PMP_CONTENT_DOCTRINE.md](PMP_CONTENT_DOCTRINE.md) and the Editorial Contract v1 (`scripts/editorial-contract-v1.mjs`).
**Lineage**: the phone-first rule in §3 and the accessibility floor in §6 were first written for carousel frames in an earlier local draft, `docs/CAROUSEL_VISUAL_SYSTEM_V1.md`. That draft is untracked and is **not** a dependency of this document: every rule implementation must follow is stated in full below. The citation records where the thinking came from, nothing more.

> A visual explainer is successful when the mechanism becomes easier to reason
> about, not when the diagram looks impressive.

---

## 1. What this locks, and what it does not

**Locks:** the responsive contract, the semantic form vocabulary, the structured
visual contract, and the specification for three renderers the schema already
names but cannot render.

**Does not lock:** any flagship content, any migration, the `/storyboards/`
layout, or article ↔ storyboard navigation.

Programme order, so this document's boundaries are unambiguous:

| Phase | Work |
| :--- | :--- |
| **S1** | this grammar — specification only |
| **S2** | renderer infrastructure: convert two, build three, retire two fields |
| **S3** | migrate the six existing visuals to `visuals[]`; make `/storyboards/` render them; article ↔ storyboard navigation |
| **S4** | build the six missing flagship visuals — library goes 6 → 12, of which 8 form the Systems Map backbone |
| **S5** | `/systems/` becomes the full eight-stage knowledge map |

Content never moves onto a rendering substrate whose responsive contract is
still changing, which is why S3 follows S2 rather than running beside it.

---

## 2. The grammar already half-exists

This is the central finding of the S0 audit and the reason this document is
shorter than it would otherwise be. Four renderers exist. They are built on
**two different and incompatible architectures**, and one of them is already
correct.

| Renderer | Architecture | Mobile behaviour | Verdict |
| :--- | :--- | :--- | :--- |
| `generated-comparison` | HTML/CSS grid | reflows: 3 columns → 1 stacked column | **reference implementation** |
| `generated-boundary` | HTML/CSS grid | reflows: 3 columns → 1 stacked column | **reference implementation** |
| `generated-sequence` | SVG, fixed `viewBox="0 0 760 …"` | scales down; text shrinks with the canvas | must be converted |
| `generated-layers` | SVG, fixed `viewBox` | scales down; text shrinks with the canvas | must be converted |

Measured on the live site, `generated-comparison` in
`ai-agents-vs-ai-workflows`:

```
390px    grid-template-columns: 303.5px          panels stacked      font 14.875px
1440px   grid-template-columns: 363 27.6 363     panels side by side font 14.875px
```

**The font size does not change.** The composition reflows and the text stays
text. That is the whole contract, already implemented, already in production.

There is also a third and worse path in the body of four articles: raw MDX
`<figure class="diagram">` governed by

```css
.content-body .diagram svg { width: 100%; min-width: 560px; }
@media (max-width: 640px) { .content-body .diagram svg { min-width: 620px; } }
```

At 390px this leaves a 620px canvas inside a 340px figure: **47% of the diagram
sits outside the visible area**, behind an `overflow-x: auto` scroll with no
affordance. The mobile breakpoint *raises* the floor from 560px to 620px — a
deliberate choice of legibility over fit, which is the right instinct and the
wrong remedy. Retiring this path is what S3's migration is for.

---

## 3. The responsive contract

> **A visual must communicate its complete idea at 390px without horizontal
> scrolling.**

The acceptance test for every visual in this programme, and the sentence to
return to whenever a form is difficult:

> **If a frame is not legible at phone width, the frame is wrong, not the
> reader.**

Consequences, all of which follow from that one rule:

1. **Reflow, never scale.** A visual is a responsive composition, not a canvas
   with a fixed aspect. Desktop may expand it; mobile may not truncate it.
2. **Text stays text.** Never baked into a fixed canvas, never shrunk below the
   surrounding body size. The body is `~14.9px`; a visual's labels sit at that
   size or above, at every width.
3. **Orientation is a function of width, not of frontmatter.** A horizontal
   desktop sequence becomes a vertical mobile sequence by itself. Comparisons
   stack. Decisions branch top-down. Evidence chains run vertical.
4. **No horizontal scroll inside a visual.** If a form cannot reflow to 390px,
   the form is wrong for that mechanism — pick another, or simplify the
   mechanism until it fits.
5. **Reduced motion is honoured** wherever motion is introduced at all, which
   for v1 is nowhere.

### The `orientation` field — removed

**Locked:** the author does not control orientation. The renderer owns it.

`generated-sequence` currently takes `data.orientation: "horizontal" |
"vertical"`, authored once in frontmatter. Under rule 3 that is the wrong axis
of control: it makes a reader's screen width an authoring decision. It is not
preserved as a desktop hint — a hint the renderer may override is a field that
lies about who decides.

Authors describe the relationship. The renderer decides whether that
relationship is drawn horizontal, stacked, or top-down, at the width in front of
the reader.

Verified 2026-09-23: **zero content files declare `orientation`**, so removing
it requires no content migration. Implementation must re-confirm this before
removing the field.

---

## 4. The semantic form vocabulary

The form tells the reader what kind of relationship they are looking at. Form
follows mechanism; it is never chosen for variety, and never defaulted to
sequence because sequence is easy.

| Form | The relationship it asserts | Reflow at 390px |
| :--- | :--- | :--- |
| **Boundary** | what belongs inside a thing versus outside it | two panels stack |
| **Sequence** | what happens in what order | horizontal row becomes vertical column |
| **Comparison** | what differs between two approaches | two panels stack |
| **Decision** | where judgment or authorization changes the path | branch renders top-down |
| **Evidence map** | how observations support a judgment | chain runs vertical |
| **State change** | what persists or changes across a boundary | before/after stack with the boundary between |
| **Layers** | what sits above, below, or depends on what | rows stack, already vertical |

These seven are the complete vocabulary. There is no eighth.

### `scale` — retired

**Locked:** `scale` is removed from the `purpose` enum.

The contract currently accepts eight `purpose` values while only four can be
rendered. Implementing three of the remaining four leaves `scale` declarable and
undrawable, and a purpose an author can declare but the system cannot draw is a
contract defect, not a feature awaiting a renderer. Building a renderer to
justify an unused enum value would be the tail wagging the dog: nothing in the
flagship programme needs to express magnitude.

Verified 2026-09-23: **zero content files declare `purpose: scale`** (the only
purpose in live use anywhere is `comparison`, once). Implementation must
re-confirm this before removing the value.

If a genuine need for magnitude appears later, it returns as a specified form
with a renderer, not as a re-opened enum value.

### Selection test

> Does the reader need to see an *order*, a *division*, a *difference*, a
> *branch*, a *support relation*, or a *change across a boundary*?

If the answer is "none of these, one sentence is clearer", the correct outcome
is no visual. The Zero-Visual Invariant holds: **"no visual needed" is a
first-class result, and there are no visual quotas.**

---

## 5. The three missing renderers

All three are specified on the Comparison/Boundary architecture — HTML/CSS,
reflowing, text-as-text — and explicitly **not** on the Sequence/Layers
fixed-canvas SVG architecture.

Each keeps the existing `baseVisualFields` (`id`, `purpose`, `takeaway`,
`caption`, `alt`) and adds only a `data` shape.

### 5.1 `generated-decision`

For a path that changes depending on a judgment or an authorization.

```
data:
  question: string                      the decision being made, stated as a question
  branches: [                           2–3 branches
    { id, label, outcome, note? }       label = the answer, outcome = what follows
  ]
  precondition?: string                 what must already be true to reach the decision
```

Desktop: the question above, branches fanning below. Mobile: the question, then
branches stacked vertically, each visibly subordinate to the question. Two
branches is the common case; three is the maximum before the form stops being
readable at phone width.

### 5.2 `generated-evidence-map`

For how observations support a judgment — the shape evaluation and readiness
arguments actually take.

```
data:
  judgment: string                      the conclusion being supported
  supports: [                           1–4 observations
    { id, label, strength?, note? }     strength: "direct" | "partial" | "absent"
  ]
  gap?: string                          what the evidence does not establish
```

`strength: "absent"` is deliberately available: the most honest evidence map is
one that shows a judgment resting on a support that was never collected. The
optional `gap` serves the same purpose as `boundary.isNot` in the article
contract — it is where the visual declines to overclaim.

Desktop: supports converging on the judgment. Mobile: a vertical chain, supports
first, judgment last.

### 5.3 `generated-state-change`

For what must survive, or what changes, across a boundary.

```
data:
  boundary: string                      the crossing: a session end, a handoff, a deploy
  before: { label, items[] }
  after:  { label, items[] }
  preserved?: string[]                  what crosses unchanged
  lost?: string[]                       what does not cross
```

**Locked: an independent renderer that shares lower-level primitives.**

It may reuse the spacing, panel, label and responsive primitives that
comparison and boundary already establish — those are layout, and duplicating
them would fork the visual system. It does not reuse the comparison renderer
itself, because the two assert different things. Comparison contrasts *two
options a reader might choose between*. State-change shows *one thing before and
after crossing an event*, with the crossing itself as the subject. Collapsing
them would make every continuity visual read as a choice.

The optional `preserved` / `lost` lists are what make it a continuity visual
rather than a before/after picture, and they have no counterpart in comparison.

Desktop: before and after either side of the boundary, drawn as a real crossing
rather than a divider. Mobile: `before → boundary → after`, stacked, with the
boundary legible as the thing being crossed.

---

## 6. The structured visual contract

**One declaration, two surfaces.** The article declares the visual in its own
frontmatter and anchors it in its own body:

```yaml
visuals:
  - id: kebab-case-id
    purpose: boundary
    renderAs: generated-boundary
    takeaway: "One sentence. What the visual establishes."
    caption: "A sentence or two tying it to the argument."
    alt: "Descriptive detail for a reader who cannot see it."
    data: { … }
```

```markdown
<!-- pmp:visual id="kebab-case-id" -->
```

Both the article and `/storyboards/` render from that same declaration. Nothing
is authored twice, there is no second content graph, and the placement invariant
holds: the visual lives where the argument needs it.

### Consequences for `/storyboards/`

The U1 fallback parser — which reads `<figure class="diagram">` out of MDX and
derives a heading from the first sentence of a `<figcaption>` — was a
bootstrapping device. It should not become the architecture. It cannot produce a
preview, cannot produce a real `purpose` (5 of 6 current entries are labelled
`DIAGRAM`), and duplicates the heading into the caption whenever a caption is a
single sentence.

Every visual migrated to `visuals[]` fixes all of that at once: a renderable
preview, a real purpose, a distinct takeaway and caption, guaranteed alt text,
and the responsive contract for free. **The fallback parser is retired when the
last figure is migrated, not before.**

### Accessibility floor

Stated in full here. Nothing in this list requires another document to be read.

- **`alt` describes components *and* connections**, not just subject matter. A
  reader who cannot see the visual should be able to reconstruct the
  relationship, not merely learn what the picture is of.
- **The `takeaway` is available as text** regardless of how the visual renders,
  and independently of `alt`.
- **Meaning never depends on colour alone.** Any distinction carried by colour
  is also carried by position, label, or shape.
- **Contrast holds in both site themes**, for text and for any line or fill that
  carries meaning.
- **Keyboard reachable where interactive, with focus visible.** Nothing depends
  on hover.
- **Motion respects `prefers-reduced-motion`.** For v1 no form introduces
  motion, so this constrains future forms rather than current ones.

Two rules from the carousel draft are deliberately *not* carried over, because
they describe frame sequences and image export rather than single embedded
visuals: exposed frame position and total, and the requirement that an exported
image's explanation also exist as text. If carousels are implemented later they
return with those rules, which is a question for that phase and not this one.

---

## 7. What S2 implementation covers

1. Convert `generated-sequence` and `generated-layers` from fixed-canvas SVG to
   the reflowing HTML architecture of §2.
2. Remove `data.orientation` from the sequence contract and renderer, after
   re-confirming zero live usage.
3. Implement `generated-decision`, `generated-evidence-map` and
   `generated-state-change` per §5.
4. Remove `scale` from the `purpose` enum, after re-confirming zero live usage.
5. Adversarially prove the §3 contract at 390px for all seven forms: complete
   idea visible, no horizontal scroll inside the visual, text at or above body
   size, orientation chosen by the renderer.

Not in this phase: content, migration, `/storyboards/` layout, article ↔
storyboard navigation, `/systems/` restructuring, LinkedIn export. The
rendering substrate is proved before any content moves onto it.

---

## 8. Decisions locked

Resolved 2026-09-23. Recorded here so implementation does not re-open them.

| Question | Decision |
| :--- | :--- |
| Does `orientation` survive as a desktop hint? | **No.** Removed. The renderer owns responsive orientation. §3 |
| `scale`: specify or remove? | **Removed** from the `purpose` vocabulary. §4 |
| Does `state-change` reuse the comparison renderer? | **No.** Independent renderer, shared layout primitives. §5.3 |

Both removals were verified against live content before being locked: zero
declarations of `orientation`, zero of `purpose: scale`.

---

*Specification only. No implementation is authorised by this document.*
