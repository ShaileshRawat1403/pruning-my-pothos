---
name: pruningmypothos-storyboards
description: Draw a new PMP storyboard (illustrated PDF explainer), article cover, cover film or scroll scene, each with its own visual idea, export it, and verify it. Use when asked to add, change or fix a storyboard, a deck, a frame, a cover, a cover film, a scroll scene, a section drawing, or the cast drawings on Pruning My Pothos.
---

# PMP storyboards, covers, films and scenes

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
4. Every cover also has a film: `illustrations/films/<article-slug>.ts`, three
   shots, animating only the emblem's `fx-` groups, ending on the still cover.
   Every article visual has a scroll scene: `illustrations/scenes/<visual-id>.tsx`.
   Freeze them on the local contact sheets (`/dank-samples/films/`,
   `/dank-samples/scenes/`) and watch each once in a visible tab.
5. `npm run build && npm run export:storyboards` after any drawing change.
6. Look at every frame at `/storyboards/<slug>/print/` before committing:
   no overlaps, no clipped text, nothing under 27px.
7. Gates: `npm run lint`, `npm run test:contract`, `npm run verify:covers`, `npm run audit`.
