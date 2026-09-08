# Deploy

Static export, hosted on Hostinger via FTP. No auto-deploy on push — deploying
is always a deliberate, manual step.

## What broke once, and why this doc exists

This site migrated from Astro to Next.js. Astro's default build output is
`dist/`; Next's static export (`output: "export"`) writes to `out/`. Several
scripts under `scripts/` and both GitHub Actions workflows still pointed at
`dist/` after the migration — including `deploy-ftp.sh`, the one script that
does a full `mirror --delete` sync. Because it silently no-op'd (`out/ not
found`), deploys happened through manual, partial FTP uploads instead, which
don't reliably overwrite files that already exist on the server. Result: 8
cover images on the live site were stale — old pre-redesign art sitting under
filenames that had long since been replaced in the repo — and nothing caught
it until someone happened to look at the rendered pages.

All of that is fixed now (every `dist/` reference below points at `out/`).
The two verify scripts exist so the next version of this problem gets caught
by a command instead of a screenshot.

## Build

```
npm run build
```

Writes the static export to `out/`. Requires an Apple Silicon or matching Mac
locally — native deps (`@next/swc`, `esbuild`) are platform-specific, so this
can't be cross-built from a Linux sandbox with `node_modules` installed on
macOS.

## Before deploying

```
npm run lint:content
npm run lint:systems
npm run verify:covers
```

All three are also part of CI (`.github/workflows/ci.yml`), so a green CI run
on `main` already covers this. `lint:systems:advisory` and `report:systems`
run too but are non-blocking by design.

## Deploy

Preferred — a full mirrored sync, so nothing can be left stale:

```
FTP_SERVER=... FTP_USERNAME=... FTP_PASSWORD=... FTP_PORT=... \
  scripts/deploy-ftp.sh
```

Requires `lftp` (`brew install lftp`). Runs `mirror -R --delete` against
`out/`, which overwrites everything and removes anything on the server that
no longer exists locally. This is the only deploy path that can't leave
stale files behind.

If deploying by hand instead (dragging files in an FTP client), make sure
the client is set to overwrite unconditionally, not "upload if newer" or
"skip existing" — that setting is almost certainly what caused the original
staleness incident.

## After deploying

```
SITE_URL=https://pruningmypothos.com npm run verify:deploy
```

Hashes every cover under `public/covers/` and compares it against the live
site. Exits non-zero and lists exactly which files are stale if anything
didn't make it up. Needs to run somewhere with normal outbound network
access — it will fail with `fetch failed` in network-restricted sandboxes,
which is an environment limitation, not a script bug.

## Scripts reference

| Script | What it checks | Blocking? |
|---|---|---|
| `lint-content-consistency.mjs` | self/sentences/sticky-notes/shelf frontmatter + body length | yes |
| `lint-systems-consistency.mjs` | systems doc structure (Act I/II/III, TOC, callout, etc.) | yes |
| `lint-systems-advisory.mjs` | softer systems doc quality signals | no |
| `verify-covers.mjs` | every heroImage/coverUrl exists; no systems doc reuses another's cover; cover label text doesn't end on a dangling word | missing/reused cover on a systems doc: yes. everything else: no |
| `verify-deploy.mjs` | local cover files match what's actually live | yes (run manually post-deploy) |
| `verify-htaccess-sitemap.mjs` | sitemap URLs don't collide with `.htaccess` redirect/410 rules | manual |
| `verify-indexing.mjs` | robots.txt, sitemap, schema markup present in the build output | manual |
