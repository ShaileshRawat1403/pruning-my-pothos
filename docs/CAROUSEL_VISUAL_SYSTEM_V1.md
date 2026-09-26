# Carousel Visual System v1 (Glassway Editorial)

**Status**: Specification only, 2026-09-19. Nothing implemented. No schema, renderer, test or doctrine change is authorised by this document.
**Scope**: The carousel explainer surface, and its renderings on the PMP web and as social export.
**Relationship**: Subordinate to [PMP_CONTENT_DOCTRINE.md](PMP_CONTENT_DOCTRINE.md) and [CONTENT_EXPERIENCE_V1.md](CONTENT_EXPERIENCE_V1.md). Where this document and either of those disagree, they win.

---

## 1. Purpose and scope

A carousel explainer is a progressive visual explanation: one idea revealed across several frames, where the sequence itself does explanatory work.

This specification governs **only that surface**. It does not redefine how ordinary article figures behave.

```text
PMP_CONTENT_DOCTRINE
    │
    ├── ordinary article figures
    │      existing doctrine unchanged
    │
    └── progressive visual explainers
           CAROUSEL_VISUAL_SYSTEM_V1
```

The doctrine's existing refusals remain authoritative for article figures: no mandatory layout per figure purpose, the generated `comparison`, `boundary`, `sequence` and `layers` visuals remain utilities rather than the visual identity, and `specimen`, `trace`, `ghost`, `scale` and `sketch` remain provisional working patterns that this document does not freeze.

**This is not a doctrine change.** Do not generalise the carousel layout system back onto individual article figures.

## 2. What a carousel explainer is, and is not

**It is** a single canonical explanation whose understanding improves when revealed progressively.

**It is not**:

- a required component of any article
- a narrative template with mandatory stages
- a summary of an article that already exists
- a second place to author the same idea for social
- a replacement for a figure, a specimen, or prose

The selection test is unchanged from the doctrine and sits alongside it:

> Does understanding improve when this idea is revealed progressively? If yes, carousel. If one image is enough, figure. If the reader needs to inspect something real, specimen. If prose is clearer, prose.

The Zero-Visual Invariant from Content Experience v1 applies here too. "No carousel needed" is a first-class outcome, and there are no carousel quotas.

## 3. Relationship to existing documents

| Document | Authority | Interaction |
| :--- | :--- | :--- |
| Editorial Contract v1 (`SKILL.md`, `scripts/editorial-contract-v1.mjs`) | Claim integrity, provenance, evidence | A carousel makes no claim the contract would not already govern. Evidence behaviour is inherited, not redefined. |
| PMP Content Doctrine | What content is for, reader obligations, voice, article-figure principles | Unchanged. This document is a subordinate surface specification. |
| Content Experience v1 | How content is typed and rendered, marker contract, single-parse pipeline | The carousel must live inside that pipeline. It does not get a parallel one. |
| This document | Carousel composition, Glassway grammar, presentation profiles | Presentation only, plus the semantic minimum needed to render. |

## 4. Canonical source principle

> **The structured explainer is the source of truth. Web carousels and social exports are renderings of that source, never separately authored copies.**

Consequences:

- One explanation, one declaration, many renderings.
- A LinkedIn export is never hand-built from a web carousel, and never diverges from it in substance.
- Correcting the explanation corrects every rendering.

**The storage mechanism for that declaration is not settled by this document.** Section 16 records what the current architecture permits and recommends the smallest compatible option.

## 5. Semantic content versus presentation profile

Two contracts, deliberately separated.

**The content layer decides** what the explanation means: identity, title, version, the slides and their order, the text of each slide, visual intent, evidence and provenance references, and accessibility text.

**The presentation profile decides** how that appears: typography scale, spacing, palette, slide chrome, rails, numbering, diagram and annotation treatment, responsive behaviour, and export dimensions.

The content layer must never contain hex colours, coordinates, font sizes, margins, shadow values or fixed export dimensions.

The presentation profile must never decide the argument, the slide order, evidence strength, provenance, or which claim survives.

Minimum required content, conceptually:

```text
id
title
version
slides[]
```

Each slide carries enough structured content to render and to remain accessible. Everything beyond that, including any role, composition, emphasis or annotation field, is **optional** unless implementation proves otherwise.

> `role`, if retained at all, is descriptive metadata. It is not a required progression. There is no `hook → concept → synthesis` contract, and no mandatory slide count.

## 6. Glassway visual grammar

Glassway is a **grammar**, not one palette. The durable, repeatable identity comes from:

- composition and slide geometry
- whitespace and editorial pacing
- typographic hierarchy: headline, then one explanatory sentence, then machine labels
- restrained annotation over decoration
- limited visual density, one dominant emphasis per frame
- consistent rails, margins and numbering
- the Pruning Mark (section 9)

Recurring structure, consistent across profiles:

| Zone | Contains |
| :--- | :--- |
| Top rail | Small publication or section identifier, plus explainer title or chapter |
| Headline zone | One editorial headline, typically one to three lines |
| Primary visual zone | The frame's explanatory content |
| Support text | Normally one thought, short |
| Bottom rail | Frame number and site identifier |

Inherited from the doctrine's frozen visual principles and binding here: annotation over decoration, faded context for what does not matter, mono only for literal machine text, no box unless containment matters, every arrow needs a verb, and the caption test.

**Repeat the visual grammar, not the story structure.** The grammar is what makes a carousel recognisable. The sequence of ideas stays free.

## 7. `GLASSWAY_WEB`

The profile for carousels embedded in PMP pages.

- **Inherits the existing site design tokens.** No second palette enters article pages.
- Surfaces, text and borders use the current CSS variables. Accents come from the existing set.
- Typography uses the site families already in use for headings, body and machine text.
- Light and dark follow the site's existing theme behaviour.
- Responsive rather than fixed-ratio. Legible at phone width.
- Interaction: keyboard and touch navigable, with frame position always visible.

This profile is already constrained by Content Experience v1's theming rule, which requires visual primitives to use site design tokens. `GLASSWAY_WEB` does not relax that.

## 8. `GLASSWAY_LINKEDIN`

The profile for standalone export, which must survive outside the site.

- Master frame 1080 x 1350, four by five portrait.
- Consistent safe content area on every frame.
- Static frames, exported as images and as a combined document.
- May use the more distinctive Glassway palette: off-white and icy blue-gray base, restrained navy and teal, one warm accent, subtle depth.
- Frame numbering and site identifier on every frame.

**This palette is export-only.** It must never render into an article page. The web and export renderings stay recognisably the same explainer because the grammar, hierarchy, annotation language, Pruning Mark and geometry are shared, while colour adapts to the surface.

```text
SAME EXPLAINER
SAME COMPOSITION SYSTEM
SAME TYPOGRAPHIC HIERARCHY
SAME ANNOTATION LANGUAGE
SAME PRUNING MARK
SAME SLIDE GEOMETRY
          │
          ├── PMP WEB          site tokens, light/dark, responsive
          │
          └── LINKEDIN         Glassway export palette, 1080 x 1350, static
```

## 9. The Pruning Mark

The one device that should make these recognisably PMP rather than another polished infographic.

**Purpose**: show what was removed, rejected, constrained, blocked or corrected, so the reader sees the mistaken mental model as well as the surviving one.

This is the visual expression of doctrine principle 6: *show what was removed and why.*

Applications:

- the faded wrong path
- the struck-out assumption
- ghosted context with the part under discussion in full ink
- an annotation line to the thing that actually decides
- before and after pruning
- the highlighted mechanism that survives inspection

Rules:

- The Pruning Mark marks a **real** removal, refusal or correction. It is never decoration, and never applied to something that was not actually rejected.
- What was pruned stays legible enough to be understood. Erasure teaches nothing.
- At most one dominant Pruning Mark per frame.
- It must read at phone width and survive export downscaling.
- It carries meaning in text as well as styling, so a screen reader reaches the same conclusion.

## 10. Optional slide compositions

Composition names are **renderer and profile options**, not content claims and not narrative roles.

Candidate compositions: text-led, split, annotated artifact, directional flow, side-by-side comparison, full visual.

Binding constraints:

- Optional. A slide without a declared composition renders in the default.
- Non-sequential. No prescribed order and no required set.
- **Not a new semantic vocabulary.** These names describe layout, never what the content *is*.
- Not surfaced to the reader. The doctrine already requires visual metadata to stay backstage.

The exploratory archetype list circulated earlier, including `statement`, `diagram`, `specimen`, `trace`, `decision` and `synthesis`, is **not adopted as an enum** by this document. Several of those words already carry defined meanings elsewhere, and freezing them here would create a second vocabulary. See section 16.

## 11. Accessibility expectations

The existing contract already sets accessibility floors for visuals: alt text long enough to describe components and connections, an explicit single takeaway, and a caption. A carousel inherits equivalents **per frame**, not once for the whole set.

- Every frame has text alternatives sufficient for a reader who cannot see it.
- Frame order is meaningful and exposed, including current position and total.
- Web: keyboard navigable, focus visible, no reliance on hover, motion respects reduced-motion preferences.
- Contrast holds in both site themes for `GLASSWAY_WEB`, and in the export palette for `GLASSWAY_LINKEDIN`.
- Meaning never depends on colour alone. This applies especially to the Pruning Mark.
- Export: because exported frames are images, the full explanation must also exist as text in the canonical source, so it can accompany the post.

## 12. Responsive and mobile expectations

- Phone first, consistent with the doctrine. If a frame is not legible at phone width, the frame is wrong, not the reader.
- Text stays text wherever possible rather than being baked into an image.
- Web frames reflow rather than scaling down a fixed canvas.
- The export master is fixed at four by five, but frame content is authored so that it survives that crop without losing the point.
- A carousel must degrade to something useful when only the first frame is seen, because that is what most feeds show.

## 13. Export expectations

- Export renders from the canonical source, never from the web DOM and never from hand assembly.
- Deterministic: the same source and profile produce the same frames.
- Output: one image per frame plus a combined document, at export resolution.
- Every frame carries its number and the site identifier.
- Export is a rendering step, so it may not introduce or alter substance. If the export needs different words, the canonical source is wrong.

## 14. Evidence and provenance behaviour

Inherited, not redefined.

- A carousel frame that asserts something already governed by the Editorial Contract carries the same obligations as any other visual.
- `explanatory` remains the default. A frame that claims evidence must reference declared sources.
- **No second evidence graph.** Content Experience v1 is explicit about this, and it is the single strongest constraint on where an explainer may live. See section 16.
- A carousel may not upgrade synthesis into evidence by presenting it with more polish. Visual confidence is not epistemic strength.
- Where a frame shows a real artifact, the doctrine's four-part rule applies: the shortest span that proves the point, where it came from, what it shows, and what it does not show.

## 15. What remains unfrozen

Deliberately not settled here:

- The storage and reference mechanism for the canonical explainer (section 16).
- The final field names and shape of the semantic schema.
- Whether `role` exists at all.
- The composition list, which is provisional until proven on real explainers.
- Exact type scale, spacing values and palette values for either profile.
- Whether additional profiles, for example a dark export variant, are needed.
- Whether any of this earns a place in the doctrine later. It has to work first.

Following the doctrine's own method: prove these on real explainers before building schema around them.

## 16. Architecture tensions in the current implementation

Findings from the code and contract as they exist today.

### 16.1 The placement invariant blocks a free-floating explainer

The governor requires every item in an article's `visuals[]` to have exactly one inline placement marker in that article's body, and it rejects duplicate placement. Tests in the contract suite assert both the dangling-declaration failure and the duplicate-placement failure directly.

An explainer stored outside article frontmatter is not in `visuals[]`, so it has no placement identity under the current rules. Supporting one requires new referential rules in the validator **and** the renderer, which must agree, because marker semantics are deliberately centralised in a single shared authority module.

### 16.2 Cross-file evidence would create the second graph the architecture forbids

Visual sources resolve against the **article's own** `provenance.sources`, and the renderer is handed that array by the page. Content Experience v1 states plainly that no second evidence graph is created and that visuals integrate into the existing claim graph.

An explainer in its own file would either duplicate sources, which creates exactly that second graph, or need a cross-file resolver, which is a significant architectural addition. This, not folder structure, is the real cost of moving explainers out.

### 16.3 The purpose vocabulary is already settled and must not be forked

The contract already defines eight cognitive purposes: `sequence`, `layers`, `boundary`, `comparison`, `state-change`, `decision`, `evidence-map`, `scale`. It defines five render modes, four generated plus `asset`.

So `sequence`, `decision` and `scale` already mean something specific. A carousel must reuse this vocabulary for semantic intent. Any carousel-specific discriminator belongs at the renderer or profile layer, named as composition, never added to `purpose`.

### 16.4 Adding a render mode is contained; adding slide data is not

The renderer switches on `renderAs` and fails closed on anything unrecognised, and the schema rejects unsupported modes. Adding one union member and one renderer case is therefore a small, well-bounded change.

The data is the problem. Existing generated visuals are deliberately tiny, capped at six sequence steps or five layers. A carousel of eight to ten frames, each with a headline, body, alt text and optional annotation, is an order of magnitude more frontmatter than any existing visual. **That authoring-ergonomics problem is the genuine argument for a separate file, and it should be argued on those grounds rather than on tidiness.**

### 16.5 The pipeline has guards any new syntax must respect

The marker layer masks fenced code blocks, rejects malformed markers fail-closed, reserves an internal placeholder prefix and guards against authored content colliding with it, and passes a content token through the split. Contract tests cover heading-ID uniqueness and reference-link resolution across a visual boundary.

Any new marker form or placement mechanism must go through the same shared authority, or the validator and renderer will disagree, which is precisely what that module exists to prevent.

### 16.6 Content Experience v1 has drifted from the implementation

Two mismatches worth correcting separately from this work, since the new spec will be read beside it:

- Its status still reads as awaiting implementation approval, though the pipeline it describes has shipped.
- It documents a `PMP_VISUAL_PLACEHOLDER_N` string mechanism, while the implementation uses comment sentinels plus a content token, through `prepareMarkdownWithPlaceholdersTyped` and `splitRenderedHtmlTyped`.

### 16.7 Recommendation: the smallest compatible option

Three options, with costs.

| Option | Satisfies one canonical source | Cost |
| :--- | :--- | :--- |
| A. Carousel as a new render mode inside the owning article's `visuals[]` | Yes | Small. One union member, one renderer case, one export reader. Frontmatter grows. |
| B. Separate explainer files referenced by id | Yes | High. Breaks the placement invariant, needs a cross-file provenance resolver, new validator rules, new tests. |
| C. Canonical declaration in one existing content authority, read by both renderers | Yes | Small, and equal to A today, while leaving room to move later. |

**Recommended: C, starting as A in practice.** Declare the explainer once, inside the content authority that owns the idea, and have both the web carousel and the export renderer read that same declaration. This delivers the approved principle, one canonical explainer with multiple renderings, and prevents duplicate web and social authoring, without a second evidence graph and without new referential machinery.

Revisit a dedicated collection only when an explainer genuinely needs to exist independently of any article, or when frontmatter size becomes the dominant authoring cost. At that point the trigger is real, and the added complexity is justified by something other than folder structure.

---

*Specification only. No implementation is authorised by this document.*
