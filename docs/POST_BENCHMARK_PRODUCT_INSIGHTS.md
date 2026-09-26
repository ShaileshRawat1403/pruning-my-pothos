# GoATee Post-Benchmark Product Insights

**Status**: DRAFT / FUTURE PRODUCT SPECIFICATION (Post-Benchmark Freeze)  
**Date**: September 23, 2026  
**Context**: Discovered and crystallized during GoATee Benchmark Pilot.4 execution (Run 19 observation)

---

## 1. Locked Core Product Principles

### Principle 1: Language-Independent Comprehension
> **"A GoATee approval should require understanding the change, not understanding the implementation language."**

### Principle 2: Genuine Consent Requires Intelligibility
> **"A human gate is useful only when the human understands the decision they are being asked to make and can give explicit consent."**

These principles establish that the human approval gate within GoATee must optimize for **decision comprehension**, not implementation syntax parsing.

---

## 2. The Decision Comprehension Questions

A non-technical or cross-functional human reviewer must be able to confidently answer the following nine questions without needing to parse the target programming language:

1. **What is going to change?**
2. **Why is that change necessary?**
3. **Which files / systems are expected to change?**
4. **What is explicitly not going to change?**
5. **What existing capability is being reused?**
6. **Are any dependencies being introduced?**
7. **How will the machine prove the implementation worked?**
8. **What still requires human judgment or observation?**
9. **What exact decision am I authorizing?**

Implementation syntax remains accessible as secondary supporting detail, but must never be the prerequisite for making the approval decision.

---

## 3. Dual-Layer Architecture

To maintain rigorous machine enforcement alongside accessible human comprehension, GoATee will adopt a strict dual-layer model:

```
┌─────────────────────────────────────────────────────────────┐
│ LAYER 1: MACHINE CONTRACT (Authoritative Source of Truth)   │
│ - change.md, Build Budget, receipt.md                       │
│ - Precise, deterministic, implementation-aware              │
│ - Enforced cryptographically and mechanically by GoATee CLI │
└──────────────────────────────┬──────────────────────────────┘
                               │
                deterministic projection
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ LAYER 2: HUMAN DECISION VIEW (Projection for Review)        │
│ - Plain-language projection of the machine contract         │
│ - Zero independent state; derived strictly from Layer 1     │
│ - Designed for complete decision comprehension & consent    │
└─────────────────────────────────────────────────────────────┘
```

- **Invariance Rule**: The human decision view must be a projection derived directly from the contract, never an independent or editable source of truth.
- **Enforcement Rule**: The underlying machine contract remains strictly authoritative for all automated enforcement, baseline locking, and verification.

---

## 4. Human Decision View Specification

The standard human review layer projected from `change.md` includes the following structured fields:

| Field | Content & Purpose |
| :--- | :--- |
| **WHAT WILL CHANGE?** | Plain-language description of the intended behavior and capabilities being added or altered. |
| **WHY?** | The user-visible rationale or architectural motivation for the change. |
| **EXPECTED CHANGE SURFACE** | Explicit files, modules, services, or components expected to be created or modified. |
| **WHAT WILL NOT CHANGE?** | Protected areas, explicitly excluded modules, and boundary fences that must remain untouched. |
| **REUSE STRATEGY** | Existing components, utilities, or libraries in the repository being leveraged. |
| **DEPENDENCIES** | External runtime or test dependencies being introduced (or explicitly *"None"*). |
| **HOW WILL WE KNOW IT WORKED?** | Deterministic, machine-verifiable evidence (automated tests, static analysis, command exit codes). |
| **WHAT STILL NEEDS HUMAN JUDGMENT?** | Manual observation, interactive UX checks, visual confirmations, or policy decisions requiring human attestation. |
| **YOUR DECISION** | Explicit choices: `[A] APPROVE`, `[B] REQUEST ONE STRUCTURAL CLARIFICATION`, `[C] REJECT`. |

---

## 5. Non-Negotiable Design Constraint: No Information Loss

Plain language must improve comprehension without weakening control:

- **No Masked Scope**: Simplification must never hide scope expansions or edge cases.
- **No Masked Dependencies**: External dependencies must be highlighted prominently.
- **No Masked Surface**: Protected-surface touches or deviations must never be omitted.
- **No False Certainty**: Epistemic uncertainty or incomplete evidence must not be hidden.
- **No False Automation**: Manual evidence must never be converted or disguised as automated proof.
- **No Inferred Consent**: Silence, informal remarks, or conversational assent must never be treated as approval.

---

## 6. Affirmative Consent & Approval Provenance

A valid gate requires **"Understandable decision + explicit decision."**

In post-benchmark GoATee architecture, approval records must cryptographically bind to the originating human-input event rather than existing as unanchored controller assertions:

### Candidate Future Provenance Fields
- `human_event_id`: Unique identifier of the user input event.
- `human_event_source`: Verified human source (`USER_EXPLICIT`).
- `human_event_timestamp`: ISO 8601 UTC timestamp of user input.
- `exact_human_decision`: Verbatim user-authored decision text (e.g. `[A] APPROVE`).
- `contract_version_hash`: SHA-256 hash of the exact `change.md` contract being authorized.

---

## 7. Connection to Core GoATee Thesis

GoATee's foundational control model rests on three pillars:
1. **Agree exactly.**
2. **Build minimally.**
3. **Prove delivery.**

The human-readable approval layer directly strengthens **"Agree exactly"**: an agreement cannot be exact if the human authorizing it does not understand what they are committing to. Making the approval boundary understandable and affirmative is an integral mechanism of governance, not cosmetic UI polish.
