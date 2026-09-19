# Performance Backlog

Recorded findings only. Nothing here is scheduled, and nothing here is a defect.
Each entry states what was measured, when, and what it would take to act.

## PERF-01 · Replace the global framer-motion ScrollProgress with a native implementation

**Status:** recorded 2026-09-18, not scheduled. Later isolated pass.

**Finding.** `src/app/layout.tsx` imports `ScrollProgress`, which imports
`framer-motion`. Because the component sits in the root layout, framer-motion
loads on every route on the site, including plain reading routes that have no
other animation.

**Measured 2026-09-18** against the build for `59c8b41`, from the exported HTML
rather than from build output, counting only scripts a modern browser executes:

| | raw | brotli |
| :--- | :--- | :--- |
| Executed JS on a plain reading route | 655.5K | 167.9K |
| of which framer-motion | 118.3K | 34.2K |

framer-motion is 20 percent of the compressed JavaScript on a text article, in
service of a 2px reading-progress indicator.

**Not findings.** mermaid, marked and katex are correctly code-split and do not
load on reading routes. `/systems/…`, `/self/…` and `/sentences/…` load
byte-identical payloads, so there is no route-specific bloat. The remaining
~134K brotli is the Next and React floor.

**Correction worth keeping.** An earlier figure of "765 KB across 9 files" was
wrong. The ninth chunk is 110.0K of core-js shipped by Next itself under
`noModule`, which modern browsers never fetch. React renders that attribute
camelCased, which is how the first measurement missed it.

**If acted on.** Replace the framer-motion scroll indicator with a native
implementation (scroll listener or `animation-timeline: scroll()`), then
re-measure the same way: parse the exported HTML, exclude `nomodule` scripts,
report brotli.
