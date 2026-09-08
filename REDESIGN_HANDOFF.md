# Sans Serif Systems — Redesign Handoff

Direction: **Lovelace Atelier** (manuscript meets machine). Warm ink and parchment,
oxblood and brass as the only signal colors, engraved display type over a literary
body serif, motion that responds to the reader. Anti-hype, restrained, not tacky.
IA is unchanged (all routes and slugs preserved for SEO).

This doc is the source of truth for continuing the work consistently.

---

## How to run and verify

```bash
cd /Users/Shared/MYAIAGENTS/pruningmypothos
npm run dev        # http://localhost:3000  (hot-reloads on save)
npx tsc --noEmit   # type-check (passes clean as of this handoff)
```

Note: `next build` needs a platform-native SWC binary. It builds on macOS (your
machine). A Linux sandbox without network cannot fetch the binary, so type-check is
the offline gate there.

---

## Design system (single source: `src/app/globals.css`)

Colors are CSS variables, re-toned per theme. The original accent variable NAMES are
kept and remapped, so legacy inline styles inherit the palette automatically.

Palette (ink / dark, primary):
- bg: `#14110b` surface `#1a160e` card `#1b160d`
- text: primary `#efe5cf` secondary `#b7a685` muted `#837457`
- accents (variable name → role): `--accent-purple` = oxblood `#b5402f`,
  `--accent-cyan` = brass `#c79a3e`, `--accent-amber` = gold, `--accent-pink` =
  light oxblood, `--accent-green` = sage, `--accent-blue` = ledger blue.

Parchment (light) theme mirrors these warmer/darker. Theme toggles via
`data-theme="light|dark"` (see `ThemeToggle.tsx`, key `systems-theme`).

Tailwind built-in ramps are overridden in `globals.css` `@theme` blocks so legacy
`zinc/slate/neutral/gray/stone` and status hues (`green/red/amber/blue/violet…`)
resolve to warm Atelier tones without editing each file. `--color-accent-orange`
is aliased to amber.

Type (superseded 2026-09 — see `globals.css` `:root` block, the single source
of truth going forward; this doc's "Lovelace Atelier" serif pairing below was
never actually loaded and is kept only for history):
- Display / headings: **Schibsted Grotesk** (`--font-heading`)
- Body: **Schibsted Grotesk** (`--font-sans`)
- Machine / labels: **IBM Plex Mono** (`--font-mono`)

Texture: `.grid-overlay` (laid-paper rules), `.paper-grain` (engraving noise),
`.page-vignette` (edge frame). No glow orbs. Corners are sharp (3–4px) site-wide.

Reusable classes: `.card-glass`, `.spotlight-card` (+ `.spotlight-glow`,
`.spotlight-rule`), `.btn-premium .btn-primary/.btn-secondary` (primary has a
hover sheen), `.badge`, `.rule` / `.section-divider`, `.eyebrow-tick`,
`.ledger-surface` (terminal panels), `.drop-cap`, `.link-slide`.

---

## Components

New:
- `ScrollProgress.tsx` — top reading-progress hairline (spring).
- `SpotlightCard.tsx` — cursor-tracking glow + growing top rule + spring lift.
  Props: `href`, `accent`, `className`, children.
- `NaturalLanguagePlate.tsx` — the "sentence → governed schema" section (home).

Rewritten to the Atelier system, then rewritten again (2026-09) into a dark,
newsletter-first hero — see `HeroSection.tsx`'s own header comment:
- `HeroSection.tsx` — was: framed Ada painting plate, pointer tilt + parallax,
  cursor glare, ken-burns drift, periodic light sweep, marginalia (removed,
  see git history). Then: plain-text minimal hero. Now: dark-scoped hero with
  gradient headline + inline `NewsletterForm`, the site's acquisition funnel.
- `Header.tsx`, `BackgroundGrid.tsx`, `ThemeToggle.tsx`, `CockpitConsole.tsx`,
  `SentimentsClient.tsx` (masonry replaced by an equal-height grid).
- `layout.tsx` — masthead scrim + bulletproof centered container
  (`max-width:1180px; margin-inline:auto; padding-inline: clamp(1.5rem,5.5vw,6.5rem)`).

Removed: `AdaCameo.tsx` was abandoned (SVG portrait read as broken). The real
painting at `public/images/ada-lovelace-hero.jpg` is used instead.

---

## Layout bugs fixed (regression checklist)

Verify these after any change:
1. No page content peeks ABOVE the floating header while scrolling (masthead scrim).
2. Content is centered with generous, scaling side padding (not flush-left).
3. Hero headline does not overflow its column at any width.
4. Sentiments wall is an orderly equal-height grid (no ragged CSS-columns masonry).
5. Hero caption is not covered by the floating "6 active tools" card.

---

## Status

Done: design system; shell (header, footer, background, layout, scrim, scroll
progress); homepage (hero + natural-language section + all sections); systems and
sentiments list pages; site-wide re-tone + corner sharpening; homepage spotlight
cards; hero pointer motion. `tsc` clean.

Remaining / next steps:
- Roll `SpotlightCard` hover onto the systems, sentiments, self, shelf, and tools
  card grids (currently homepage only).
- Hand-audit structural layout on: `docs` (sidebar), the six tool consoles
  (`*Client.tsx`), `about`, `portfolio`, `live-lab`, `canvases`, `tags`. They are
  re-toned in color/corners but may have their own spacing/structure quirks and
  leftover dead classes (`glow-blob`, `shadow-glow-*`) that are currently no-ops.
- Optional hero motion ideas discussed: ink-wipe reveal on first load; hover state
  that overlays live scrolling CRT code; drifting punched-card particle layer.
- Verify the light (parchment) theme across pages.

---

## Working notes

- Files live in the user's repo and the dev server hot-reloads them.
- The mount is read/write for file edits but `rm` is blocked; overwrite instead of
  delete if a file must be retired.
- Keep using CSS variables / token classes. Do not reintroduce literal hex or cool
  grays; that is what made the original look generic.
