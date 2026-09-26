<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Start here

Current state, rules, commands and next steps: 👉 [docs/HANDOVER.md](docs/HANDOVER.md)

# Editorial Governor: PMP Editorial Contract v1

All content authoring and modification in `src/content/` is strictly governed by:
👉 [Pruning My Pothos Editorial Skill](.agents/skills/pruningmypothos-editorial/SKILL.md)

Key rules for AI agents:
1. **Never manufacture lived experience**: Do not write first-person incident stories ("we received a bug report", "in our cluster") unless explicitly declared as real experience under `provenance: { primary: "observed", claims: [{ attestation: "author" }] }`.
2. **Never convert an illustrative scenario into a first-person observation**: Keep constructed examples explicitly framed as illustrative.
3. **Trace consequential claims**: Every consequential claim must map to an assertion in the body and reference a declared source ID.
4. **Immutable repository references**: Repository sources require an immutable 40-character git commit SHA (not mutable branches or tags).
5. **Quality over formula**: No 800-word floors. No Act I/II/III headings. Structure derives from the idea.

# Storyboards, covers and cards

Storyboards (illustrated PDF explainers) and article covers are authored by one
repeatable process. The house style repeats (paper, ink, type, the Pruning
Mark); the subjects never do. See:
👉 [Storyboard and cover authoring](docs/STORYBOARD_AUTHORING.md)

1. **One deck file per storyboard** in `src/components/illustrations/decks/`, built from the templates, registered in `decks/index.ts`.
2. **Every Systems article has a cover** entry in `src/components/illustrations/covers.tsx` and its own emblem in `emblems.tsx`, used for its article cover, storyboard cover and share card.
3. **Export after drawing**: `npm run build && npm run export:storyboards`. The contract suite fails if a deck or cover has no exported file.
4. **A drawing never claims more than its article.** Illustrative details stay illustrative.
5. **Any card that is a link uses `SpotlightCard`.**
