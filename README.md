# Pruning My Pothos

Source for [pruningmypothos.com](https://pruningmypothos.com): a field guide to
applied AI systems, by Shailesh Rawat. A static Next.js site (App Router,
static export), content in MDX, drawings in hand-built SVG.

## Start here

- [docs/HANDOVER.md](docs/HANDOVER.md): current state, rules, structure, next steps.
- [AGENTS.md](AGENTS.md): the editorial contract and drawing rules for anyone editing.
- [docs/STORYBOARD_AUTHORING.md](docs/STORYBOARD_AUTHORING.md): covers, films, scenes, storyboards.

## Run it

```bash
npm install
npm run dev              # http://localhost:3000
npm run build            # static export to out/
npm run test:contract    # the contract suite; must pass
```

Pushing to `main` deploys to production. Work on a branch.
