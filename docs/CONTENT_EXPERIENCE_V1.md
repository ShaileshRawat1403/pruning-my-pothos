# PMP Content Experience v1 — Architecture & Specification

**Status**: Approved Architecture & Specification (Pass 4.0)  
**Target Branch**: `feature/pmp-content-experience-v1`  
**Base Commit**: `289c076f224adf6121409cc50d33cbcf6124628b` (merged Editorial Contract v1)  
**Scope**: Reader experience, positioning source-of-truth, plain-language transformation contract, and visual explanation grammar. (No article rewrites, no UI production implementation until Pass 4.1).

---

## 1. Executive Summary & Reader Promise

### 1.1 The Core Reader Promise
> **"Make complex AI understandable without pretending it is simple."**

Technical writing about artificial intelligence currently oscillates between two unhelpful extremes:
1. **Hype and oversimplification**: Abstract analogies and marketing claims that hide how models and systems actually function, fail, or degrade.
2. **Specialist jargon**: Defensive, acronym-heavy prose written exclusively for machine learning researchers or platform engineers.

*Pruning My Pothos (PMP)* occupies the distinct middle ground: rigorous architectural clarity delivered in clear, unpretentious prose with purposeful visual models.

### 1.2 The Operating Comprehension Test
Every published piece must satisfy this benchmark:
> **"Can a reasonably curious non-developer understand the main idea, see how it works, and know why it matters?"**

If a reader needs a computer science degree to understand *why* a prompt cache misses or *how* a tool sandbox protects a host machine, the piece has failed its editorial mission. Complexity is not eliminated; it is structured and illuminated.

### 1.3 The Frozen Headline Anchor
The primary headline of the publication remains strictly frozen:
> **"Understand AI by putting it to work."**

This headline is authoritative, recognized, and grounded. Content Experience v1 builds the explanatory apparatus beneath this anchor.

### 1.4 The Working Reader-Value Direction
To support the frozen headline, the working supporting statement is established as:
> **"I build with AI, test what happens, and explain what I learn in plain language."**

---

## 2. Positioning Source of Truth Architecture

### 2.1 Current-State Audit: Fragmented Positioning & Narrative Drift
An audit of the existing codebase reveals that site positioning and value proposition copy are currently duplicated across five disparate surfaces with diverging language:

| Surface | File | Current Copy / Positioning | Problem / Drift |
| :--- | :--- | :--- | :--- |
| **Hero Component** | `src/components/home/Hero.tsx` | `// TECH-EDITORIAL` · `39 BREAKDOWNS`<br>Subhead: *"Practical breakdowns of AI coding agents, context compaction, and autonomous workflows, explained against systems that were built, run, inspected, or broken."* | Over-emphasizes narrow coding agents and compaction; uses developer-syntax badge (`// TECH-EDITORIAL`). |
| **Homepage Structured Data & FAQ** | `src/app/page.tsx` | JSON-LD Description: *"Tech-editorial publication exploring AI coding agents, context compaction, deterministic runtimes, and engineering hygiene."*<br>FAQ: *"Pruning My Pothos is an engineering publication and systems laboratory created by Shailesh Rawat..."* | Independently invents categorical agent-failure language and repeats narrow AI agent scope. |
| **Site SEO Config** | `src/lib/seo/site.ts` | Title: *"Pruning My Pothos | The Systems We Build, The Prompts We Prune"*<br>Description: *"A living notebook on AI orchestration, runtime evaluation, context compaction, and systems design: written against things that were built, run, inspected, or broken."* | Third variant of the positioning; mixes "living notebook" with heavy engineering taxonomy. |
| **Home Methodology** | `src/components/home/Methodology.tsx` | `METHODOLOGY // ARCHITECTURAL PRINCIPLES`<br>Subtitle: *"Synthesis for engineers evaluating autonomous systems"* | Strictly engineer-facing; excludes curious non-developers and general builders. |
| **Footer & About Pages** | `src/components/Footer.tsx`<br>`src/app/about/page.tsx` | Footer: *"Open-source utilities, visual canvases, and evaluation harness templates for AI-assisted workflow development."*<br>About: *"The thinker, tinkerer, and translator behind Sans Serif Systems..."* | Fourth and fifth variants; refers to "Sans Serif Systems" instead of unified Pruning My Pothos identity. |

### 2.2 Retirement of `// TECH-EDITORIAL`
**Decision**: Completely remove the `// TECH-EDITORIAL` category tag from the homepage hero.

**Rationale**:
1. **False Taxonomy**: "Tech-editorial" is an insider publishing category, not a reader benefit. The reader does not care about publication industry taxonomy; they care about learning how AI systems operate.
2. **Jargon Tagging**: The pseudo-code syntax (`//`) acts as an engineering shibboleth that immediately signals "this is for coders only," conflicting with the core operating test.
3. **Prune the Noise**: Removing the badge lets the frozen headline—*“Understand AI by putting it to work.”*—command immediate, unobstructed visual and cognitive focus.
4. **Clean Kicker Replacement**: If an eyebrow/kicker is retained for spacing and cadence, it will strictly state reader contents: `EXPLAINERS & FIELD NOTES · {count} ARTICLES`.

### 2.3 Proposed Canonical Module: `src/lib/config/site-messaging.ts`
To permanently prevent copy drift across UI, metadata, and structured data, all positioning strings will be extracted into a single source of truth:

```typescript
export const SITE_MESSAGING = {
  headline: "Understand AI by putting it to work.",
  
  supportLine: 
    "I build with AI, test what happens, and explain what I learn in plain language.",
  
  siteDescription:
    "Practical explainers, field notes, and architectural breakdowns of AI systems, tested in code and explained in plain language.",
  
  kicker: "Explainers & Field Notes",
  
  newsletterTagline:
    "What worked, what broke, and what I learned building with AI.",
  
  author: {
    name: "Shailesh Rawat",
    role: "Builder & Author",
    summary:
      "I build with AI, test failure boundaries in real code, and translate technical mechanisms into plain language.",
  },
  
  faq: [
    {
      question: "What is Pruning My Pothos?",
      answer:
        "Pruning My Pothos is a notebook and publication by Shailesh Rawat. It explains how AI systems, tools, and autonomous workflows work under the hood—tested through real implementations and explained in plain language.",
    },
    {
      question: "What does "pruning" mean in the context of AI?",
      answer:
        "Just as a pothos vine stays healthy when damaged leaves and wild stems are pruned back, AI workflows stay reliable when you strip away ungrounded hype, fragile prompt chains, and unnecessary complexity to focus on verifiable mechanisms.",
    },
    {
      question: "Who is this publication for?",
      answer:
        "It is for curious builders, product thinkers, and engineers who want to understand how modern AI actually works—beyond marketing claims and without drowning in specialist jargon.",
    },
  ],
} as const;
```

All consuming components (`Hero.tsx`, `page.tsx`, `site.ts`, `Footer.tsx`, `About.tsx`) import from this module. When positioning evolves, it is updated in exactly one file.

---

## 3. Plain-Language Experience Contract

### 3.1 The 8 Plain-Language Transformation Rules
Plain language does **not** mean writing for children or dumbing down technology. It means eliminating unnecessary cognitive friction so that the underlying mechanism is immediately apparent.

1. **Explain the Mechanism Before the Terminology**:
   - *Rule*: Describe what physically happens in ordinary words before introducing the formal technical label.
   - *Example*: Say *"saving the conversation summary and trimming older dialogue so the prompt fits"* before naming it *"rolling-window context compaction"*.
2. **Unfamiliar Terminology Must Earn Its Keep**:
   - *Rule*: Never introduce a technical term unless it names a concrete distinction the reader must understand to use or evaluate the system.
   - *Example*: Do not drop *"orthogonal projection in latent vector space"* when *"measuring how closely two sentence meanings match"* fully conveys the operational decision.
3. **Acronyms Are Expanded on Meaningful First Use**:
   - *Rule*: The first time an acronym appears, write out the full name and state its basic job in a short appositive clause.
   - *Example*: *"Model Context Protocol (MCP), a standard way for AI to run tools and read local files..."*
4. **Prefer Ordinary Verbs Over Abstract Technical Nouns**:
   - *Rule*: Replace nominalizations (process nouns ending in -tion, -ment, -ance) with active verbs.
   - *Before*: *"Execution of verification routines facilitates hallucination mitigation."*
   - *After*: *"Running automated checks catches model mistakes before they reach the user."*
5. **Concrete Examples Before Abstraction**:
   - *Rule*: Introduce a tangible, single-sentence scenario before presenting a general architectural rule.
   - *Example*: Introduce an invoice parser encountering a missing date before explaining general schema validation failure handling.
6. **Define Boundaries, Not Only Definitions**:
   - *Rule*: A reader does not understand a mechanism until they know where it stops working. Every concept must state what it does *not* guarantee (enforced via frontmatter `boundary`).
7. **Do Not Remove Necessary Technical Terms**:
   - *Rule*: Plain language protects precision. When an engineer or practitioner needs the exact technical name (e.g., `AST`, `deterministic state machine`, `KV cache`, `idempotency`), keep the term—just ground it in plain language first.
8. **No Readability Scores as Truth, No Word-Count Quotas**:
   - *Rule*: Never optimize for artificial metrics like Flesch-Kincaid grade levels or arbitrary word-count quotas. Length is strictly dictated by the idea; prose ends when resolution is achieved.

### 3.2 Division of Responsibilities
To keep systems decoupled and maintainable:

```
┌────────────────────────────────────────────────────────┐
│                   PMP EDITORIAL SKILL                  │
│  - Cognitive comprehension pass                        │
│  - Mechanism-before-term sequencing                    │
│  - Boundary definition completeness                    │
│  - Author attestation & provenance enforcement         │
└───────────────────────────┬────────────────────────────┘
                            │ feeds into
┌───────────────────────────▼────────────────────────────┐
│                    LANGUAGEOPS RECIPES                 │
│  - Sans Serif Sentiments prose craft                   │
│  - Active verb enforcement                             │
│  - Pruning filler, throat-clearing, and buzzwords      │
│  - Sentence cadence and transition economy             │
└───────────────────────────┬────────────────────────────┘
                            │ verified by
┌───────────────────────────▼────────────────────────────┐
│                     WEBSITEOPS GATES                   │
│  - Deterministic Vale linting (prohibited markers)     │
│  - Acronym expansion signal (advisory)                 │
│  - Schema & claim referential integrity                │
└────────────────────────────────────────────────────────┘
```

---

## 4. Visual Explanation Grammar

### 4.1 Audit of the Existing Figure System
The current visual setup in `src/content/systems` and `src/components/explainer/ExplainerFigure.tsx` has three critical flaws that block visual-first technical explainers:

1. **Single Fixed Slot**: Frontmatter only supports a single optional object:
   ```typescript
   figure: z.object({
     shows: z.enum(["range", "loop", "before-after", "repo-map"]),
     caption: z.string(),
     alt: z.string().min(30),
     src: z.string().optional(),
   }).optional()
   ```
   In `src/app/systems/[slug]/page.tsx`, this figure is rendered at one rigid position above the article body. A 1,500-word explainer cannot place an explanatory visual next to a key mechanism in section 3 or section 5.
2. **Hard-Coded Diagram Contents**:
   The four built-in archetypes in `ExplainerFigure.tsx` are completely hard-coded:
   - `range`: Hardcoded to "Prompt", "System prompt", "Skill", "Workflow".
   - `loop`: Hardcoded to "plan", "act", "observe", "decide".
   - `before-after`: Hardcoded to "request", "cache", "model", "invalidates".
   - `repo-map`: Hardcoded to a specific Python repo structure (`controller.py`, `state.py`, etc.).
   *Result*: If an article is about tokenization, embeddings, or retrieval evaluation, it cannot use any of the four archetypes without displaying unrelated agent-loop or cache diagrams!
3. **Visuals as Decoration Rather than Explanation**:
   Because figures are document-level headers rather than inline explanatory devices, they tend to function as static cover banners rather than active cognitive aids.

### 4.2 The 8 Cognitive Visual Purposes
Visuals in PMP exist to explain mechanisms that are clumsy or high-cost in text alone. Every visual must belong to one of 8 cognitive purposes:

| Purpose | Cognitive Job | What the Reader Sees | Example Use Case |
| :--- | :--- | :--- | :--- |
| `sequence` | Explains order of execution, handoffs, and pipeline stages over time. | Left-to-right or top-to-bottom pipeline nodes with directional arrows and step labels. | Prompt $	o$ Tokenizer $	o$ Embedding $	o$ Vector Index. |
| `layers` | Explains hierarchy, boundaries of authority, and encapsulation. | Nested or stacked boxes showing what wraps or controls what. | Operating System $supset$ Host Sandbox $supset$ MCP Server $supset$ Tool. |
| `boundary` | Clarifies what is inside vs. outside system control or trust boundaries. | A distinct dividing boundary line separating trusted from untrusted zones. | Prompt context (untrusted) vs. Host Authorization Supervisor (trusted). |
| `comparison` | Highlights the exact structural difference between two alternatives. | Side-by-side or before/after diffs highlighting only the changed node or edge. | Direct LLM API calls vs. Cache-Interception gateway. |
| `state-change` | Shows transitions between finite discrete conditions. | State bubbles with labeled trigger conditions causing transition. | Idle $	o$ Planning $	o$ Waiting for Tool $	o$ Reviewing $	o$ Done. |
| `decision` | Explains branching logic and evaluation criteria. | Conditional diamond or fork with explicit true/false path consequences. | Does token length exceed budget? Yes: summarize; No: keep raw. |
| `evidence-map` | Connects an empirical claim to its concrete source data or repo location. | Data callout linking assertion $	o$ test file $	o$ benchmark result. | Claim of latency reduction mapped to test trace logs. |
| `scale` | Conveys orders of magnitude, latency tiers, or trade-off spectrums. | Calibrated axis or continuum showing where approaches fall. | Speed vs. Quality trade-offs across model tiers. |

### 4.3 The Six-Question Visual Decision Model
Before creating or embedding any visual, the author/agent must answer six questions in the design phase:

1. **What should the reader see?** (The exact structural entities, not abstract decorative art).
2. **Why is prose alone insufficient?** (What spatial, temporal, or hierarchical relationship creates excess cognitive load in prose?).
3. **What is the single takeaway?** (One standalone sentence summarizing the core insight).
4. **What is the caption?** (Plain-language label stating the takeaway directly under the visual).
5. **What is the alt text?** (Comprehensive screen-reader description of all nodes, connections, and labels).
6. **Where does it belong?** (Placed immediately after the paragraph that introduces the concept, never arbitrarily grouped).

> [!IMPORTANT]
> **The Zero-Visual Invariant**:
> *"No visual needed" is an entirely valid, first-class outcome.*
> If prose explains the mechanism cleanly, manufacturing a diagram is considered harmful clutter. There are no visual quotas.

---

## 5. Inline Multi-Visual Architecture & Rendering Strategy

### 5.1 Evaluation of Technical Approaches

We evaluated four paths to bring multiple inline visuals to PMP articles:

| Approach | Description | Pros | Cons | Verdict |
| :--- | :--- | :--- | :--- | :--- |
| **A: Raw HTML Tags in Markdown** | Write `<figure class="pmp-visual" data-purpose="...">` directly in Markdown files. | Zero build changes; `marked.ts` already protects HTML tags. | Verbose; error-prone authoring; poor frontmatter schema validation. | ❌ Rejected as primary authoring syntax. |
| **B: Runtime React-MDX Compilation** | Migrate content rendering from `marked` to `next-mdx-remote` or MDX component compilation. | Direct React component embedding anywhere in prose. | Heavy rewrite; breaks static export pipeline; slow builds; risks regression on 85 legacy docs. | ❌ Rejected as high-risk over-engineering. |
| **C: Markdown Directive Syntax** | Write `::visual{id="v1"}` or `<!-- visual:v1 -->` in body, resolved to components during render. | Clean authoring; standard markdown; isolated rendering; zero legacy impact. | Requires lightweight token substitution in Markdown pipeline. | ✅ **Recommended**. |
| **D: Pure Frontmatter Array with Auto-Placement** | Frontmatter `visuals: [...]` with heuristic placement (e.g. after heading 2). | Centralized schema validation. | Detaches visual from the exact prose sentence it illustrates. | ❌ Rejected for lack of author placement control. |

### 5.2 Recommended Architecture: Hybrid Schema + Inline Marker

We adopt a **Hybrid Frontmatter Schema + Inline Markdown Token**:

1. **Frontmatter Schema Evolution** (in `content-collections.ts`):
   Retain legacy `figure` for backward compatibility. Add `visuals?: z.array(VisualSchema)` for v1 articles:
   ```typescript
   export const VisualSchema = z.object({
     id: z.string().regex(/^[a-z0-9-]+$/),
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
     takeaway: z.string(),
     caption: z.string(),
     alt: z.string().min(20),
     // Either structured parameters for parametric rendering, or custom SVG path
     src: z.string().optional(),
     data: z.record(z.unknown()).optional(),
   });
   ```

2. **Inline Placement Marker in Body Prose**:
   In `src/content/**/*.md` or `.mdx`, authors place an inline marker exactly where the visual clarifies the prose:
   ```markdown
   When an agent receives a tool execution request, it does not call the operating system directly. Instead, it submits a capability proposal to the host supervisor:

   ::visual[tool-sandbox-boundary]

   The supervisor verifies the proposed file path against an immutable policy sandbox before spawning the worker process.
   ```
   *(Alternative HTML-comment syntax `<!-- visual:tool-sandbox-boundary -->` is equally supported for pure Markdown compatibility).*

3. **Rendering Pipeline Resolution** (in `src/lib/markdown.ts`):
   `renderMarkdown(content, { visuals })`:
   - Scans for `::visual[id]` or `<!-- visual:id -->`.
   - Resolves `id` against `visuals`.
   - Emits an accessible, responsive, themed `<figure id="visual-{id}" class="pmp-visual-block" ...>` with embedded SVG/HTML and caption.
   - Automatically protected from Marked parsing via `protectHtmlBlocks`.

4. **Parametric SVG Visual Primitives**:
   Instead of static hard-coded diagrams, `ExplainerFigure` provides parametric SVG templates that accept clean data props:
   - `<SequenceDiagram steps={[{ label, note }]} />`
   - `<LayersDiagram layers={[{ title, subtitle, highlighted }]} />`
   - `<BoundaryDiagram inside={...} outside={...} dividingLine={...} />`
   - `<ComparisonDiagram before={{ title, items }} after={{ title, items }} diffNote={...} />`

5. **Legacy Compatibility Guarantee**:
   Existing articles that only declare `figure: { shows, caption, alt }` without inline markers continue to render their legacy top figure untouched. Zero breaking changes to existing archive.

---

## 6. Homepage Copy Direction & Analysis

### 6.1 Evaluation of the Working Direction
Working copy:
> **"I build with AI, test what happens, and explain what I learn in plain language."**

| Criterion | Evaluation | Score |
| :--- | :--- | :---: |
| **1. Understandable without AI-specialist vocabulary** | Uses basic human verbs: *build*, *test*, *explain*, *learn*. Zero jargon terms (*compaction*, *orchestration*, *agentic*). | ✅ Pass |
| **2. Accurately reflects what is on the site** | Shailesh actually constructs applications, runs evaluations, observes breakdowns, and writes field notes and explainers. | ✅ Pass |
| **3. Grounded in work shown** | Directly maps to the 59 Systems explainers, 66 Shelf resources, 26 Self notes, and practical Tools on the site. | ✅ Pass |
| **4. Does not narrow PMP to coding agents** | Encompasses models, prompts, retrieval, evaluation, and developer workflows without locking into one transient paradigm. | ✅ Pass |
| **5. Does not make unsupported claims** | Makes zero boastful promises (*"100% reliable"*, *"enterprise scale"*, *"revolution"*). | ✅ Pass |
| **6. Sounds like Shailesh, not a publication template** | Authentic, first-person builder voice (*"I build... and explain what I learn"*); conveys personal craft and accountability. | ✅ Pass |

### 6.2 Comparison of Candidate Variants
For Pass 4.1 UI implementation, three subtle variations will be reviewed:

- **Option 1 (Direct & Personal — Recommended)**:
  > *"I build with AI, test what happens, and explain what I learn in plain language."*
  - *Best for*: Clarity, warmth, immediate human signal.
- **Option 2 (Mechanism & Contrast)**:
  > *"Most AI tutorials explain what should happen. I build systems, test where they break, and explain how they actually work in plain language."*
  - *Best for*: Sharper editorial positioning, but slightly longer.
- **Option 3 (Practitioner & Focus)**:
  > *"Practical breakdowns of real AI systems—what worked, what broke, and what I learned building them—explained in plain language."*
  - *Best for*: Direct topic focus if third-person/impersonal framing is ever preferred.

**Recommendation**: Option 1 stands as the canonical subhead in `SITE_MESSAGING`.

---

## 7. System Repeatability & Future-Proofing

We evaluate every element of this design against the repeatability invariant:
> *"Will the next article use the same system, or will we solve this again by hand?"*

1. **New Article Authoring**:
   An author or subagent writing a new Systems Explainer does not create custom CSS or one-off React components. They:
   - Formulate the explanation in plain language.
   - Identify if a concept warrants a visual (checking the 8 purposes).
   - If yes, declare the visual in frontmatter with `purpose`, `takeaway`, and data props.
   - Place `::visual[id]` where the concept is introduced.
   - The rendering pipeline automatically produces an accessible, responsive, dark/light themed visual.
2. **New Collection Addition**:
   Adding a new collection (e.g. `kits`, `teardowns`) requires zero bespoke visual code; the same 8 visual primitives and Markdown inline parser serve all collections uniformly.
3. **Homepage Consistency**:
   When site metrics or positioning evolves, updating `SITE_MESSAGING` automatically synchronizes the Hero, OpenGraph tags, JSON-LD schema, and Methodology FAQ simultaneously.

---

## 8. Division of Responsibilities

| Responsibility Layer | Owner | Scope & Functions |
| :--- | :--- | :--- |
| **Editorial Governor** | `scripts/lint-editorial-v1.mjs` & PMP Gate | Validates Zod schema, enforces claim-to-prose matching, inspectable 40-char commit SHAs, author attestation on observed incidents, and collection scoping. |
| **Content Experience** | `docs/CONTENT_EXPERIENCE_V1.md` & Skill | Governs plain-language comprehension pass, mechanism-before-term sequencing, visual need determination, and cognitive purpose selection. |
| **LanguageOps** | LanguageOps YAML Recipes | Governs sentence-level craft: active verbs, pruning filler words, rhythm, and Sans Serif Sentiments tone. |
| **WebsiteOps** | `websiteops-conform.mjs` & CI | Validates file integrity, runs Vale prose linter, manages transactional snapshot-and-restore promotion, and runs audit reports. |
| **Human Reviewer** | Author / Editor | Validates empirical truth of observations, pedagogy, visual layout aesthetics, and nuanced interpretive judgment. |

---

## 9. Implementation Roadmap & Acceptance Criteria (Pass 4.1)

Pass 4.0 establishes the architecture. Pass 4.1 will implement the changes under the following strict acceptance criteria:

### 9.1 Phase 1: Canonical Messaging Single Source of Truth
- [ ] Create `src/lib/config/site-messaging.ts` exporting `SITE_MESSAGING`.
- [ ] Update `src/components/home/Hero.tsx` to import headline, subhead, and kicker from `SITE_MESSAGING`.
- [ ] Remove `// TECH-EDITORIAL` tag from `Hero.tsx`.
- [ ] Update `src/app/page.tsx` JSON-LD and FAQ to consume from `SITE_MESSAGING`.
- [ ] Update `src/lib/seo/site.ts` to consume from `SITE_MESSAGING`.
- [ ] Ensure all home and SEO tests pass with zero drift.

### 9.2 Phase 2: Visual Schema Expansion & Parametric Primitives
- [ ] Add `VisualSchema` to `content-collections.ts` while preserving legacy `figure` compatibility.
- [ ] Implement parametric SVG generator components for the 8 cognitive visual purposes in `src/components/explainer/primitives/`.
- [ ] Ensure all generated SVGs use CSS variables (`var(--text-primary)`, `var(--card-border)`) for seamless theme compatibility.

### 9.3 Phase 3: Inline Markdown Directive Resolver
- [ ] Extend `src/lib/markdown.ts` to parse `::visual[id]` and `<!-- visual:id -->` markers.
- [ ] Resolve markers against article visual declarations and inject accessible semantic `<figure>` HTML.
- [ ] Add regression tests in `scripts/test-contract-v1.mjs` verifying inline visual token replacement, accessibility attributes, and legacy fallback.

### 9.4 Phase 4: Editorial Skill & Recipe Integration
- [ ] Update `.agents/skills/pruningmypothos-editorial/SKILL.md` to incorporate:
  - The Plain-Language Comprehension Pass (Step 7.5).
  - The Six-Question Visual Decision Model (Step 7.6).
- [ ] Update `pmp-systems-explainer.yaml` and `pmp-playbook.yaml` to include plain-language and visual decision primitives.
- [ ] Re-run full quality pipeline (`npm run test:contract`, `npm run lint`, `npm run build`, `npm run audit`).

---
*End of Specification — Pass 4.0.*
