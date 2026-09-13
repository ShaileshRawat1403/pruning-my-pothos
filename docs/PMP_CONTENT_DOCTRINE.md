# PMP Content Doctrine

**Status**: v1 · approved doctrine · 2026-09-13. The six principles in section 1 are locked: change them only by reopening that decision. The rest of this document is versioned and is expected to evolve as it is tested against real pieces.
**Relationship to other documents**: The Editorial Contract ([SKILL.md](../.agents/skills/pruningmypothos-editorial/SKILL.md)) defines how claims are validated. [CONTENT_EXPERIENCE_V1.md](CONTENT_EXPERIENCE_V1.md) defines how content is typed and rendered. This document defines what the content is for. On claim integrity, the contract decides. On reader experience and editorial judgment, this document decides.

> **PMP should feel like someone investigated something and left the useful marks on the page.**

---

## 1. Principles

**1. The contract governs the article. It does not write the article.**
Schema, claims, provenance, reader intent and LanguageOps stay backstage unless the reader benefits from seeing them. Passing the contract means a piece is honest. It does not mean the piece is good, needed or finished.

**2. Orient once, then start the writing.**
One useful line tells the reader what this is and why it matters to them. Then the article begins. There is no summary of the article inside the article.

**3. Explain through actors and events before abstractions.**
The model, the program, a person: what each actually did. A technical term arrives after the reader has seen the thing it names. A useful check is whether a sentence could be filmed. If it could not, it needs a sentence beside it that could.

**4. Evidence must be inspectable, and synthesis must look like synthesis.**
When a claim rests on work, the reader can inspect that work. When a piece is argument, the reader can tell.

**5. A visual must reveal something prose hides.**
No visual is required. When one exists, it shows a real thing, or a structure that linear text obscures.

**6. Prune before migrate. Show what was removed and why.**
Decide whether something deserves to exist before improving it. Then make the pruning visible wherever it teaches: the failed prompt, the rejected architecture, the irrelevant log lines, the abandoned assumption, the action the program refused, the claim cut because the evidence did not hold, the tool that looked useful and was not needed. What did not survive is often the most useful thing on the page.

---

## 2. Reader obligations

Every piece meets four obligations. They are obligations, not sections, headings or components. Meet them wherever the writing does it best, including inside the prose.

1. **Orient the reader quickly.**
2. **Make limits discoverable.** Where the mechanism or argument stops, and what it does not guarantee.
3. **Make the basis of the piece clear.** See section 4.
4. **Give the reader somewhere useful to go next,** when there is somewhere useful.

**Backstage by default.** These fields are never rendered to the reader:
- `contentKind`, `readerIntent`, `readerOutcome`, `thesis`
- the language recipe and `provenance.claims`
- `boundary.is`
- visual metadata (`purpose`, `renderAs`, `evidenceRole`)
- any slot numbering

**Rendered only when a piece benefits:**
- short-answer boxes
- takeaway lists
- FAQ
- tag chips
- on-page cover images

A cover can still serve as the social image. Site chrome stays out of the reading column.

---

## 3. Voice

- **Plain words, exact claims.** A simplification that makes a claim false is not plain language.
- **"I" for judgment, "you" for the reader's situation.** Not "teams", not "system designers".
- **Claim at the strength you have.** Possibility is not frequency.
- **The contract's words are not the publication's words.** House vocabulary (boundary, deterministic, governed, runtime, invariant, primitive, hybrid) appears in reader prose only after a concrete sentence has made it unnecessary.
- **Contrast only against a view someone actually holds.**
- **One earned line per piece is welcome.** A moral as the last line is not.
- **No em dashes.**

---

## 4. What a Systems article is

A Systems article helps a reader understand one mechanism well enough to do something with it: choose, question, configure, debug, or explain it to someone else.

Before drafting, complete the sentence *"After reading, the reader can ___."* The blank is a verb that happens off the page. If the blank is "understand X", the piece is not ready.

### Basis

Every piece has an honest basis, and the reader can tell which it is.

| Basis | Meaning | Provenance |
| :--- | :--- | :--- |
| **Inspected** | The author examined code, documentation or data | `primary: repository` or `external`, with pinned sources |
| **Observed** | The author watched it happen in real use | `primary: observed`, with author attestation |
| **Built** | The author made the thing and reports what happened | Not a provenance type (see below) |
| **Synthesis** | An argument, not a measurement | `primary: synthesis` |

**Built is not a new provenance type.** It is a reader-facing description, used when observed work and inspectable evidence coincide. In the contract, that means attested `observed` claims plus repository or external sources. Do not add `primary: built` to the schema.

**Mixed pieces are normal.** Declare the basis of the central claim.

**Constructed examples** (`illustrative`) may appear under any basis. They are always framed as constructed ("Suppose...") and never promoted into observation.

### Synthesis

Synthesis is legitimate. It earns its place by being the better argument, not by borrowing the look of evidence. A synthesis piece:

- states judgment in first person where it is judgment
- claims possibility, not frequency
- frames constructed examples as constructed
- never uses evidence styling for illustration
- uses related PMP evidence where it exists, and says what that evidence does and does not show
- lets the reader see that it is synthesis. One plain line is enough: "This piece is synthesis, not measurement."

**Unused evidence is a review signal, not a failure.** If real work on the topic exists and the piece ignores it, a reviewer flags it.

---

## 5. Evidence

Evidence must be available and inspectable. It does not need to be embedded every time.

- **If the artifact materially helps the reader evaluate the claim, show it. Otherwise link it.** Articles are not case files.
- **A shown artifact has four parts:**
  1. the shortest span that proves the point
  2. where it came from (path and commit, URL and date, or "observed by the author", when and where)
  3. one sentence on what it shows
  4. one sentence on what it does not show
- **Evidence styling belongs to evidence.** An illustration never wears it.
- **Keep source and interpretation visibly separate.** The homepage project cards set the tone: "The excerpt above is source material. The summary and boundary are editorial interpretation."

---

## 6. Visuals

### Frozen principles

- **Real artifact first.** Draw only what cannot be shown: time, hidden structure, proportion.
- **Annotation over decoration.** Circles, brackets, underlines, leader lines, and margin notes in the author's voice.
- **Faded context.** What does not matter is visibly quieter. What was removed stays visible when it teaches.
- **One restrained warm accent** on paper and ink. No filled cards, pills or shadows.
- **Phone first.** Legible at phone width. Text stays text wherever possible.
- **Mono only for literal machine text.** Tool names, paths, commands, log lines.
- **No box unless containment matters.**
- **Every arrow needs a verb.**
- **Caption test.** If the caption alone does the job, there is no figure.

### When no visual is correct

- The idea is a definition or a judgment, not a structure.
- The figure would restate a list or table already in the prose.
- The reader's mental picture is already right.
- The only available image would be decoration.

Zero figures is a normal outcome.

### Infrastructure

- `asset` is the primary path for real artifacts with annotations.
- The generated `comparison`, `boundary`, `sequence` and `layers` visuals are utilities, not the visual identity.

### Working visual patterns (not frozen)

These names may change. Prove them on real articles before building components or schema around them.

- **Specimen**: a real artifact with annotations.
- **Trace**: a run read top to bottom, each step marked by who decided (model, program, person) and where something said no.
- **Ghost**: the whole faded, with the part under discussion in full ink.
- **Scale**: true proportion.
- **Sketch**: rough ink, for reflective and speculative pieces.

---

## 7. Archive

> **Integrity decides whether a claim can stay. Editorial disposition decides whether the page should exist.**

**The goal is the smallest archive that still contains all the useful ideas.** The goal is not every article converted to v1.

### Two records, kept separate

- **Integrity** lives in [EDITORIAL_AUDIT.md](EDITORIAL_AUDIT.md). Audit status is not disposition. When this doctrine was written, all 58 Amber flags had one cause: the legacy Act I-III template. Green self pieces had been scanned for a narrow incident pattern, not attested. A Green page can be weak or redundant. An Amber page can hold the best idea on the site.
- **Disposition** lives in the archive disposition ledger (`docs/ARCHIVE_DISPOSITION_LEDGER.md`, to be created). It is one table, one row per article:

| Article | Reader question | Basis | Distinct? | Evidence available? | Disposition | Merge target | Redirect required? |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |

### Dispositions

- **Keep and rewrite**: a distinct idea with real reader use. Rewritten evidence-led if work exists, as synthesis otherwise.
- **Keep, strip only**: useful, but not worth a rewrite now. Remove legacy scaffolding and do not migrate.
- **Merge**: several pieces answer the same reader question. One survives and the rest redirect to it.
- **Reduce**: one good idea padded into an article becomes a short note, or a section of another piece.
- **Retire**: no distinct idea, or off-mission. Redirect to the nearest useful page and never delete silently.
- **Attest or reframe**: first-person experience is confirmed by the author and becomes an evidence source, or it is reframed as illustrative.

### Criteria

Apply these in order. The first decisive answer wins.

1. **Mission.** Does it help someone do something they could not do before? If not, retire.
2. **Distinctness.** Is it PMP's best answer to its reader question? If not, merge into the one that is.
3. **Density.** Can it be halved without losing anything? If so, reduce.
4. **Basis.** Is there real work behind it, or could there be? Rewrite evidence-led if so, or as synthesis if the argument is distinctive.
5. **Accuracy.** Fixable errors mean rewrite. Structural errors mean retire.
6. **Cost of removal.** Inbound links, homepage placement and traffic decide how a page is removed, not whether.

**Coined frameworks** survive only when the piece shows the framework used on something. A coined name is a claim.

### Order of work

1. Build the disposition ledger.
2. Run an attestation pass on evidence sources: shelf experiments, first-person self pieces, and case studies.
3. Run a disposition pass, cluster by cluster, reading every piece.
4. Choose exemplars from the ledger: one evidence-led, one synthesis, one short observed note. Prove the working visual patterns on them.
5. Freeze only what survived the exemplars. Migrate survivors, merges first, with redirects in the same change.
6. Run a strip-only pass on the pieces kept as they are.

---

## 8. What PMP refuses to standardize

- Section order, section names or section count; length; endings.
- Whether a piece has a short answer, takeaways, FAQ, an analogy or a figure.
- A layout per figure type. A comparison never has to mean two boxes.
- Voice through more linting. Gates catch strings, not register, so voice belongs to human review.
- One line style across the whole site.
- The contract's vocabulary in reader prose.
- Uniform migration.
