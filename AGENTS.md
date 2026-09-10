<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Editorial Governor: PMP Editorial Contract v1

All content authoring and modification in `src/content/` is strictly governed by:
👉 [Pruning My Pothos Editorial Skill](.agents/skills/pruningmypothos-editorial/SKILL.md)

Key rules for AI agents:
1. **Never manufacture lived experience**: Do not write first-person incident stories ("we received a bug report", "in our cluster") unless explicitly declared as real experience under `provenance: { primary: "observed", claims: [{ attestation: "author" }] }`.
2. **Never convert an illustrative scenario into a first-person observation**: Keep constructed examples explicitly framed as illustrative.
3. **Trace consequential claims**: Every consequential claim must map to an assertion in the body and reference a declared source ID.
4. **Immutable repository references**: Repository sources require an immutable 40-character git commit SHA (not mutable branches or tags).
5. **Quality over formula**: No 800-word floors. No Act I/II/III headings. Structure derives from the idea.
