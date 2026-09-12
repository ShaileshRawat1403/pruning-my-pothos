# PMP Content Experience v1 — Architecture & Specification

**Status**: Proposed Architecture — awaiting implementation approval (Pass 4.0A)
**Target Branch**: `feature/pmp-content-experience-v1`
**Base Commit**: `289c076f224adf6121409cc50d33cbcf6124628b` (merged Editorial Contract v1 baseline)
**Scope**: Reader experience, positioning source-of-truth contract, plain-language transformation contract, typed visual explanation grammar, and segmented rendering architecture. (No article rewrites, no UI production implementation until Pass 4.1).

---

## 1. Executive Summary & Reader Promise

### 1.1 The Core Reader Promise
> **"Make complex AI understandable without pretending it is simple."**

Technical writing about artificial intelligence currently tends to split between two unhelpful extremes:
1. **Hype and oversimplification**: Superficial analogies and marketing claims that conceal how models, runtimes, and evaluation harnesses actually function, fail, or degrade.
2. **Specialist jargon**: Defensive, acronym-heavy prose written primarily for machine learning researchers or platform engineers.

*Pruning My Pothos (PMP)* occupies the distinct middle ground: rigorous technical clarity delivered in clear, unpretentious prose with purposeful, structured visual explanations.

### 1.2 The Operating Comprehension Test
Every published piece is evaluated against this benchmark:
> **"Can a reasonably curious non-developer understand the main idea, see how it works, and know why it matters?"**

If a reader requires a computer science degree to grasp *why* a prompt cache misses, *how* a tool sandbox isolates execution, or *where* an evaluation harness measures drift, the explanation has failed. Complexity is not eliminated; it is structured, bounded, and illuminated.

### 1.3 The Frozen Headline Anchor
The primary headline of the publication remains strictly frozen:
> **"Understand AI by putting it to work."**

This anchor established the identity of the publication and will remain unchanged across all home surfaces.

### 1.4 The Candidate Support Line
To support the frozen headline, the working candidate support line is:
> **"I build with AI, test what happens, and explain what I learn in plain language."**

*(Note: The headline is frozen; this support line is a candidate direction to be wired and reviewed on the homepage in Pass 4.1).*

---

## 2. Positioning Source of Truth Architecture

### 2.1 Current-State Audit: Fragmented Positioning & Narrative Drift
An audit of the codebase reveals that site positioning and value proposition copy are currently duplicated across five disparate surfaces with diverging language:

| Surface | File | Current Copy / Positioning | Problem / Drift |
| :--- | :--- | :--- | :--- |
| **Hero Component** | `src/components/home/Hero.tsx` | `// TECH-EDITORIAL` · `{systemsCount} BREAKDOWNS`<br>Subhead: *"Practical breakdowns of AI coding agents, context compaction, and autonomous workflows, explained against systems that were built, run, inspected, or broken."* | Over-emphasizes narrow coding agents and compaction; uses developer-syntax badge (`// TECH-EDITORIAL`). |
| **Homepage Structured Data & FAQ** | `src/app/page.tsx` | JSON-LD Description: *"Tech-editorial publication exploring AI coding agents, context compaction, deterministic runtimes, and engineering hygiene."*<br>FAQ: *"Pruning My Pothos is an engineering publication and systems laboratory created by Shailesh Rawat..."* | Independently invents categorical agent-failure language and repeats narrow AI agent scope. |
| **Site SEO Config** | `src/lib/seo/site.ts` | Title: *"Pruning My Pothos | The Systems We Build, The Prompts We Prune"*<br>Description: *"A living notebook on AI orchestration, runtime evaluation, context compaction, and systems design: written against things that were built, run, inspected, or broken."* | Third variant of the positioning; mixes "living notebook" with heavy engineering taxonomy. |
| **Home Methodology** | `src/components/home/Methodology.tsx` | `METHODOLOGY // ARCHITECTURAL PRINCIPLES`<br>Subtitle: *"Synthesis for engineers evaluating autonomous systems"* | Strictly engineer-facing; excludes curious non-developers and general builders. |
| **Footer & About Pages** | `src/components/Footer.tsx`<br>`src/app/about/page.tsx` | Footer: *"Open-source utilities, visual canvases, and evaluation harness templates for AI-assisted workflow development."*<br>About: *"The thinker, tinkerer, and translator behind Sans Serif Systems..."* | Fourth and fifth variants; refers to older "Sans Serif Systems" branding instead of unified Pruning My Pothos identity. |

### 2.2 Retirement of `// TECH-EDITORIAL` & Hero Kicker
**Decisions**:
1. **Remove `// TECH-EDITORIAL`**: Completely eliminate this pseudo-code label from the hero. It is an industry classification tag rather than a reader benefit, and its programming syntax (`//`) creates an artificial "coders-only" barrier.
2. **No Replacement Kicker in v1**: The Hero component in Pass 4.1 will initially work without any category kicker above the headline. The frozen headline (*“Understand AI by putting it to work.”*) should stand unobstructed.
3. **No Hard-Coded Article Counts**: The specification and positioning contracts do not hardcode current article numbers. Content counts, where displayed, derive dynamically from the content layer (`allSystems.length`).

### 2.3 Positioning Contract, Not a Copy Database
Rather than centralizing every contextual sentence or FAQ paragraph into an unwieldy global configuration object, we establish a **compact positioning contract** in `src/lib/config/site-positioning.ts`.

This module centralizes **only durable identity facts**:

```typescript
/**
 * site-positioning.ts — Canonical Positioning Contract for Pruning My Pothos
 *
 * Centralizes durable identity facts only. Contextual copy (e.g. FAQ answers,
 * About page biographical paragraphs, Methodology cards) derives from these
 * facts but remains authored locally where it is rendered.
 */
export const SITE_POSITIONING = {
  // Frozen primary anchor
  headline: "Understand AI by putting it to work.",

  // Candidate reader-value support line
  candidateSupportLine:
    "I build with AI, test what happens, and explain what I learn in plain language.",

  // Canonical site description for meta tags and top-level JSON-LD WebSite schema
  canonicalDescription:
    "Practical explainers, field notes, and architectural breakdowns of AI systems, grounded in real use and explained in plain language.",

  // Audience framing
  audienceFraming:
    "For curious builders, product thinkers, and engineers who want to understand how AI systems actually work without drowning in specialist jargon.",

  // Newsletter value proposition
  newsletterPromise:
    "What worked, what broke, and what I learned building with AI.",

  // Author identity facts
  author: {
    name: "Shailesh Rawat",
    role: "Builder & Author",
    shortBio:
      "I build with AI, test failure boundaries in practice, and translate technical mechanisms into plain language.",
  },
} as const;
```

**Rule of Derivation**: Local copy across `Hero.tsx`, `page.tsx`, `site.ts`, `Footer.tsx`, and `about/page.tsx` must align with and derive from `SITE_POSITIONING`, but the contract does not attempt to dictate every paragraph of local prose.

---

## 3. Epistemic Copy Discipline

To uphold the standards established by Editorial Contract v1, the Content Experience layer avoids over-broad or categorical claims in its own documentation and positioning:

1. **Avoid Universal Claims of "Tested in Code"**:
   Not every article on PMP is a repository benchmark or code test. The site includes synthesis, conceptual explainers, reflection, and calibration field notes. Positioning should say *"grounded in real use and practice"* rather than asserting that every single article is *"tested in code"*.
2. **Avoid "How Modern AI Actually Works"**:
   This phrasing claims total empirical authority over a vast and fast-moving field. Instead, PMP explains *"how specific AI mechanisms, tools, and workflows operate and fail under real conditions"*.
3. **Avoid Disparaging Current Figures as "Decoration"**:
   The current figures represent early architectural seeds (range, loop, before-after, repo-map). Their limitation is architectural rigidity (one fixed top slot, hard-coded contents), not a lack of serious explanatory intent.
4. **Avoid Categorical Claims About Alternative Technologies**:
   We do not claim runtime MDX *"breaks static export"* or that token parsing has *"zero performance overhead"*. Rather, runtime MDX introduces more migration surface, runtime dependencies, and build complexity than our requirements justify, whereas lightweight token segmentation provides deterministic compilation within the existing static pipeline.

---

## 4. Plain-Language Experience Contract

### 4.1 The 8 Plain-Language Transformation Rules
Plain language in PMP is an explanatory discipline, not a vocabulary reduction exercise. It ensures the underlying mechanism is clear before introducing abstraction.

1. **Explain the Mechanism Before the Terminology**:
   Describe what physically occurs in ordinary language before introducing the formal technical label.
   *Example*: Describe *"retaining recent dialogue and summarizing older context so the prompt stays within limits"* before naming it *"rolling-window context compaction"*.
2. **Unfamiliar Terminology Must Earn Its Keep**:
   Never introduce technical terms merely for authority. If a term is used, it must name a distinction that has direct operational consequences for the reader.
3. **Acronyms Are Expanded on Meaningful First Use**:
   On first meaningful mention, write out the acronym and provide a short appositive explaining its role.
   *Example*: *"Model Context Protocol (MCP), a standard protocol for letting models invoke local tools and read files..."*
4. **Prefer Ordinary Verbs Over Abstract Technical Nouns**:
   Replace nominalizations with active verbs. Instead of *"Execution of verification routines facilitates error minimization"*, write *"Running automated checks catches mistakes before they deploy"*.
5. **Concrete Examples Before Abstraction**:
   Ground a general rule in a tangible, one-sentence worked scenario before expanding into generalized architecture.
6. **Define Boundaries, Not Just Definitions**:
   A concept is only understood when the reader knows where it fails or stops applying. Every explainer must define what the mechanism does *not* guarantee (enforced via frontmatter `boundary`).
7. **Do Not Remove Necessary Technical Terms**:
   Technical precision must be preserved. Key terms (`AST`, `deterministic state machine`, `KV cache`, `embedding vector`) remain—they are simply grounded in plain language first.
8. **No Readability Scores as Truth, No Word-Count Quotas**:
   Never write toward artificial targets like Flesch-Kincaid grade levels or arbitrary word floors. The piece ends when the idea has reached honest resolution.

### 4.2 LanguageOps vs. PMP Editorial Skill Boundary
To prevent conceptual duplication:

- **LanguageOps Recipes** (in `.agents/skills/pruningmypothos-editorial/recipes/`):
  Governs sentence-level prose craft: active voice, trimming filler, rhythm, eliminating throat-clearing openers, and enforcing Sans Serif Sentiments.
  *Important*: We do **not** add visual-decision primitives to LanguageOps recipes. Existing recipes already include `primitive.plain-language`, `primitive.example-when-needed`, `primitive.specificity`, `primitive.direct-answer`, and `primitive.restraint`. We will **never** invent synthetic primitive IDs inside PMP.
- **PMP Editorial Skill** (`SKILL.md`):
  Governs cognitive comprehension and visual selection:
  - Mechanism-before-term sequencing checks.
  - Visual decision checklist (determining whether a visual reduces explanation cost).
  - Provenance claim mapping and author attestation.

---

## 5. Visual Explanation Grammar

### 5.1 Separation of Concerns: Cognitive Purpose vs. Render Mode
To prevent ad-hoc, unmaintainable visual data shapes, we strictly separate **what the visual explains** (Cognitive Purpose) from **how it is rendered** (Render Mode).

#### A. Cognitive Purposes (The 8 Explanatory Jobs)
1. `sequence`: Order of execution, handoffs, and pipeline flow over time.
2. `layers`: Hierarchy, abstraction boundaries, encapsulation, and containment.
3. `boundary`: Dividing lines separating trusted from untrusted authority zones.
4. `comparison`: Side-by-side structural differences, trade-offs, and before/after diffs.
5. `state-change`: Transitions between discrete operational states and trigger events.
6. `decision`: Branching logic, criteria checks, and downstream consequences.
7. `evidence-map`: Connecting an empirical assertion to an inspectable test trace or artifact.
8. `scale`: Orders of magnitude, latency tiers, and trade-off spectrums.

#### B. Render Modes (How the Visual Is Rendered)
In Pass 4.1, we implement four typed generated primitives. Unimplemented cognitive purposes use an explicit `asset` mode until a dedicated parametric generator is built:
- `generated-sequence`: Parametric horizontal/vertical step pipeline SVG.
- `generated-layers`: Parametric nested or stacked abstraction box SVG.
- `generated-boundary`: Parametric trusted/untrusted authority boundary SVG.
- `generated-comparison`: Parametric before/after structural diff SVG.
- `asset`: High-fidelity standalone image or custom vector file (`.svg`, `.png`, `.webp`).

### 5.2 Discriminated Union Schema (Strict Typing, No `z.unknown()`)
We explicitly reject `data: z.record(z.unknown())`. Every render mode requires a strictly typed schema:

```typescript
import { z } from "zod";

// Base visual metadata common to all visuals
const BaseVisual = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/, "Visual ID must be kebab-case"),
  purpose: z.enum([
    "sequence",
    "layers",
    "boundary",
    "comparison",
    "state-change",
    "decision",
    "evidence-map",
    "scale",
  ]),
  takeaway: z.string().min(10, "Visual must have an explicit single takeaway"),
  caption: z.string().min(5),
  alt: z.string().min(20, "Alt text must provide accessible descriptive detail"),

  // Evidence relationship
  evidenceRole: z.enum(["explanatory", "evidence"]).default("explanatory"),
  sources: z.array(z.string()).optional(),
});

// 1. Generated Sequence Schema
const GeneratedSequenceVisual = BaseVisual.extend({
  renderAs: z.literal("generated-sequence"),
  data: z.object({
    orientation: z.enum(["horizontal", "vertical"]).default("horizontal"),
    steps: z.array(
      z.object({
        id: z.string(),
        label: z.string(),
        note: z.string().optional(),
      })
    ).min(2).max(6),
  }),
});

// 2. Generated Layers Schema
const GeneratedLayersVisual = BaseVisual.extend({
  renderAs: z.literal("generated-layers"),
  data: z.object({
    layers: z.array(
      z.object({
        id: z.string(),
        label: z.string(),
        note: z.string().optional(),
        highlighted: z.boolean().optional(),
      })
    ).min(2).max(5),
  }),
});

// 3. Generated Boundary Schema
const GeneratedBoundaryVisual = BaseVisual.extend({
  renderAs: z.literal("generated-boundary"),
  data: z.object({
    inside: z.object({
      label: z.string(),
      items: z.array(z.string()).min(1),
    }),
    outside: z.object({
      label: z.string(),
      items: z.array(z.string()).min(1),
    }),
    boundaryLabel: z.string().optional(),
  }),
});

// 4. Generated Comparison Schema
const GeneratedComparisonVisual = BaseVisual.extend({
  renderAs: z.literal("generated-comparison"),
  data: z.object({
    before: z.object({
      label: z.string(),
      items: z.array(z.string()).min(1),
    }),
    after: z.object({
      label: z.string(),
      items: z.array(z.string()).min(1),
    }),
    diffNote: z.string().optional(),
  }),
});

// 5. Asset Visual Schema (Supplied SVG or image)
const AssetVisual = BaseVisual.extend({
  renderAs: z.literal("asset"),
  src: z.string().min(1, "Asset visual must provide a source file path"),
  dimensions: z
    .object({
      width: z.number().positive(),
      height: z.number().positive(),
    })
    .optional(),
});

// Discriminated union on renderAs
export const VisualSchema = z.discriminatedUnion("renderAs", [
  GeneratedSequenceVisual,
  GeneratedLayersVisual,
  GeneratedBoundaryVisual,
  GeneratedComparisonVisual,
  AssetVisual,
]);

export type Visual = z.infer<typeof VisualSchema>;
```

### 5.3 Evidence Semantics for Visuals
To maintain epistemic integrity:
- **Default**: `evidenceRole: "explanatory"`. An explanatory diagram clarifies a mechanism but is not proof. It carries no independent evidentiary weight.
- **Evidence Role**: If `evidenceRole: "evidence"`:
  - The visual **must** declare `sources: string[]` with at least one source ID.
  - Every source ID must resolve to a valid entry in the document's frontmatter `provenance.sources` graph (with inspectable commit SHA for repositories or valid URL/citation for external data).
  - *No second evidence graph is created.* Visuals integrate directly into the existing Editorial Contract v1 claim graph.

### 5.4 The Six-Question Visual Decision Model
Before specifying a visual, authors must verify:
1. **What should the reader see?** (Concrete structural entities, not decorative illustrations).
2. **Why is prose alone insufficient?** (What spatial, hierarchical, or sequential relationship is confusing in linear text?).
3. **What is the single takeaway?** (One standalone sentence).
4. **What is the caption?** (Plain-language label stating the takeaway below the graphic).
5. **What is the alt text?** (Complete screen-reader description of components and connections).
6. **Where does it belong?** (Placed immediately following the paragraph introducing the concept).

> [!IMPORTANT]
> **The Zero-Visual Invariant**:
> *"No visual needed" is an entirely valid, first-class outcome.*
> If prose explains the mechanism cleanly, manufacturing a diagram is clutter. There are no visual quotas.

---

## 6. One Inline Marker Contract & Referential Integrity

### 6.1 Canonical Authoring Marker
Authors place exactly one canonical marker in Markdown body text:

```markdown
When an agent receives a tool execution request, it does not call the operating system directly. Instead, it submits a capability proposal to the host supervisor:

<!-- pmp:visual id="tool-sandbox-boundary" -->

The supervisor verifies the proposed file path against an immutable policy sandbox before spawning the worker process.
```

**Design Advantages**:
- **Invisible Degradation**: Renders as an HTML comment; completely invisible in generic Markdown viewers, GitHub previews, and RSS feeds.
- **Zero Ambiguity**: Exactly one syntax to learn and parse. No conflicting `::visual[]` directives.
- **Deterministic Scanning**: Easily parsed with a single regular expression: `/<!--\s*pmp:visual\s+id="([a-z0-9-]+)"\s*-->/g`.

### 6.2 Deterministic Governor Rules
The deterministic validator (`scripts/lint-editorial-v1.mjs`) will enforce the following invariants on v1 content:
1. **ID Uniqueness**: Visual IDs within an article's frontmatter `visuals` list must be unique.
2. **Referential Resolution**: Every `<!-- pmp:visual id="X" -->` marker in body text must resolve to a declared visual with `id: X`.
3. **No Dangling Visuals**: Every visual declared in frontmatter must have a corresponding placement marker in the body (or be declared as a legacy top-level `figure`).
4. **No Duplicate Placement**: The same visual ID cannot be placed more than once in the body.
5. **Fail-Closed on Unsupported Renderer**: Any visual declaring an unrecognized `renderAs` value fails validation.
6. **Syntax Conformity**: Any malformed marker (e.g. missing quotes, invalid characters) fails validation.

---

## 7. Segmented Rendering Architecture

### 7.1 Separation of Text and React Components
We reject serializing React SVG components into raw HTML strings inside `renderMarkdown()`.

Instead, `renderMarkdown(text)` preserves its clean contract:
$$\text{renderMarkdown}: \text{string (Markdown)} \to \text{string (HTML)}$$

The page renderer introduces a lightweight **segmentation layer**:

```
                       Raw Article Body
                              ↓
                parseVisualSegments(content, visuals)
                              ↓
              Array of Ordered Segments:
              [
                { type: "text",   content: "..." },
                { type: "visual", visual: VisualDeclaration },
                { type: "text",   content: "..." }
              ]
                              ↓
                      React Page Component
                              ↓
          ┌───────────────────┴───────────────────┐
          ↓                                       ↓
   Text Segment                             Visual Segment
   Rendered via                             Rendered as native
   dangerouslySetInnerHTML                  React component
   with renderMarkdown(seg.content)         <VisualBlock visual={seg.visual} />
```

### 7.2 Segmentation Algorithm
```typescript
export type ContentSegment =
  | { type: "text"; content: string }
  | { type: "visual"; visual: Visual };

export function parseVisualSegments(
  content: string,
  visuals: Visual[] = []
): ContentSegment[] {
  const visualMap = new Map(visuals.map((v) => [v.id, v]));
  const regex = /<!--\s*pmp:visual\s+id="([a-z0-9-]+)"\s*-->/g;
  const segments: ContentSegment[] = [];

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(content)) !== null) {
    const textChunk = content.slice(lastIndex, match.index);
    if (textChunk.trim().length > 0) {
      segments.push({ type: "text", content: textChunk });
    }

    const visualId = match[1];
    const visual = visualMap.get(visualId);
    if (visual) {
      segments.push({ type: "visual", visual });
    }

    lastIndex = regex.lastIndex;
  }

  const remaining = content.slice(lastIndex);
  if (remaining.trim().length > 0) {
    segments.push({ type: "text", content: remaining });
  }

  return segments.length > 0 ? segments : [{ type: "text", content }];
}
```

### 7.3 Legacy Compatibility Invariant
- For legacy articles with **zero markers**, `parseVisualSegments` returns exactly one `TextSegment`.
- The legacy `figure` continues to render in its existing slot above the body.
- **Zero regressions or changes to existing archive articles.**

---

## 8. Implementation Phasing & Scope

### 8.1 Pass 4.1: Foundation & Primitives (Strict Scope)
1. **Positioning Contract**:
   - Create `src/lib/config/site-positioning.ts`.
   - Update `Hero.tsx` to use frozen headline and candidate support line.
   - Remove `// TECH-EDITORIAL` tag from `Hero.tsx`.
   - Update `page.tsx` JSON-LD and `site.ts` to consume canonical description.
2. **Typed Visual Schema**:
   - Add `VisualSchema` (discriminated union) to `content-collections.ts` while preserving legacy `figure` compatibility.
3. **Segmented Renderer**:
   - Implement `parseVisualSegments` in `src/lib/visual-segments.ts`.
   - Create `<VisualBlock />` and the four parametric SVG primitives (`sequence`, `layers`, `boundary`, `comparison`).
   - Wire segment rendering in `src/app/systems/[slug]/page.tsx`.
4. **Deterministic Validation**:
   - Add marker referential integrity checks in `scripts/lint-editorial-v1.mjs`.
   - Add regression tests in `scripts/test-contract-v1.mjs` using isolated test fixtures.
5. **Editorial Skill**:
   - Add Plain-Language Comprehension Pass and Six-Question Visual Model to `SKILL.md`.
6. **Scope Boundary**:
   - **Zero archive articles are migrated in Pass 4.1.** Test fixtures only.

### 8.2 Pass 4.2: First Article Exemplar (Single Migration)
1. Select exactly **one** strong Systems explainer from the archive (e.g. `engineering-agentic-systems-for-reliability` or `policy-governed-mcp-runtimes`).
2. Migrate the piece to v1 schema with inline visuals using the new parametric primitives.
3. Inspect and verify:
   - Desktop and mobile responsiveness.
   - Dark mode and light mode contrast and aesthetics.
   - Screen-reader accessibility of SVG labels and alt text.
   - Genuine reduction in cognitive explanation cost.
4. Review findings with the user before deciding on any broader archive migration.

---
*End of Proposed Architecture Specification — Pass 4.0A.*
