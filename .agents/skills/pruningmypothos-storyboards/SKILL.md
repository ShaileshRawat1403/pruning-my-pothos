---
name: pruningmypothos-storyboards
description: Draw a new PMP storyboard (illustrated PDF explainer) or article cover, each with its own visual idea, export it, and verify it. Use when asked to add, change or fix a storyboard, a deck, a frame, a cover, or the cast drawings on Pruning My Pothos.
---

# PMP storyboards and covers

Follow `docs/STORYBOARD_AUTHORING.md` exactly. It is the process; this skill
only points at it and states the non-negotiables.

1. Read the owning Systems article first. Every frame and every cover quip must
   trace to a claim the article makes. Illustrative details stay illustrative.
2. One deck file per storyboard: `src/components/illustrations/decks/<article-slug>.tsx`,
   copied from `what-an-ai-model-actually-is.tsx`, built only from the templates
   in `illustrations/templates.tsx` and the cast and props in `kit.tsx` and
   `props.tsx`. Register it in `decks/index.ts`.
3. Every Systems article needs a cover entry in `illustrations/covers.tsx` and
   its own emblem in `illustrations/emblems.tsx`: a metaphor that belongs to
   that article alone. The theme repeats; characters and doodles don't. Never
   reuse another article's drawing or put the cast on a cover.
4. `npm run build && npm run export:storyboards` after any drawing change.
5. Look at every frame at `/storyboards/<slug>/print/` before committing:
   no overlaps, no clipped text, nothing under 27px.
6. Gates: `npm run lint`, `npm run test:contract`, `npm run verify:covers`, `npm run audit`.
