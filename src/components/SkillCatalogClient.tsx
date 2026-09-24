"use client";

import LintConsole, { Finding } from "./LintConsole";

const SAMPLE = `---
name: changelog-generator
description: Use this skill when the user asks for a changelog, release notes, or a summary of recent commits.
version: 1.0.0
tags: [git, release]
---
Generate a changelog from recent git commits by reading conventional commit messages and grouping them by type.
===
---
name: Release_Notes_Tool
description: Notes.
version: 1.0
---
`;

interface SkillRecord {
  name?: string;
  description?: string;
  version?: string;
  body: string;
}

function parseSkillBlock(block: string): SkillRecord {
  const fmMatch = block.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  if (!fmMatch) return { body: block.trim() };
  const fm = fmMatch[1];
  const body = (fmMatch[2] ?? "").trim();
  const clean = (v?: string) => v?.trim().replace(/^["']|["']$/g, "");
  const name = clean(fm.match(/^name:\s*(.+)$/m)?.[1]);
  const description = clean(fm.match(/^description:\s*(.+)$/m)?.[1]);
  const version = clean(fm.match(/^version:\s*(.+)$/m)?.[1]);
  return { name, description, version, body };
}

function wordSet(s: string): Set<string> {
  return new Set(s.toLowerCase().split(/\W+/).filter(Boolean));
}

function analyze(text: string): Finding[] {
  const blocks = text.split(/\n===\n/).map((b) => b.trim()).filter(Boolean);
  const records = blocks.map(parseSkillBlock);
  const findings: Finding[] = [];
  const nameCounts = new Map<string, number>();

  records.forEach((r, i) => {
    const label = r.name || `skill #${i + 1}`;

    if (!r.name) findings.push({ severity: "err", label: "missing_name", detail: `${label}: no "name" in frontmatter.` });
    else if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(r.name)) findings.push({ severity: "warn", label: "non_canonical_name", detail: `"${r.name}" is not kebab-case.` });

    if (!r.description) {
      findings.push({ severity: "err", label: "missing_description", detail: `${label}: no "description" in frontmatter.` });
    } else {
      if (r.description.length < 40) findings.push({ severity: "warn", label: "short_description", detail: `${label}: description is only ${r.description.length} chars.` });
      if (!/\b(use this|when|triggers?|phrases? like)\b/i.test(r.description)) {
        findings.push({ severity: "warn", label: "description_lacks_triggers", detail: `${label}: description doesn't name when to use the skill.` });
      }
    }

    if (r.version && !/^\d+\.\d+\.\d+$/.test(r.version)) {
      findings.push({ severity: "warn", label: "invalid_version", detail: `${label}: version "${r.version}" is not semver (X.Y.Z).` });
    }

    if (!r.body) findings.push({ severity: "err", label: "empty_body", detail: `${label}: body is empty.` });

    if (r.name) nameCounts.set(r.name, (nameCounts.get(r.name) ?? 0) + 1);
  });

  nameCounts.forEach((count, name) => {
    if (count > 1) findings.push({ severity: "err", label: "name_collision", detail: `"${name}" is used by ${count} skills.` });
  });

  for (let i = 0; i < records.length; i++) {
    for (let j = i + 1; j < records.length; j++) {
      const a = wordSet(records[i].description || "");
      const b = wordSet(records[j].description || "");
      if (a.size === 0 || b.size === 0) continue;
      const inter = [...a].filter((w) => b.has(w)).length;
      const union = new Set([...a, ...b]).size;
      const sim = union === 0 ? 0 : inter / union;
      if (sim > 0.7) {
        findings.push({ severity: "err", label: "description_overlap_error", detail: `"${records[i].name}" and "${records[j].name}" descriptions are ${Math.round(sim * 100)}% similar, so they are likely to misfire under an agent.` });
      } else if (sim > 0.5) {
        findings.push({ severity: "warn", label: "description_overlap_warning", detail: `"${records[i].name}" and "${records[j].name}" descriptions are ${Math.round(sim * 100)}% similar.` });
      }
    }
  }

  return findings;
}

export default function SkillCatalogClient() {
  return (
    <LintConsole
      accent="var(--accent-cyan)"
      command="tessera skills compile --input skills/ --output out/"
      pack="tesserakit-skills"
      placeholder="Paste one SKILL.md (frontmatter + body). To check several together, separate blocks with a line containing only ==="
      sample={SAMPLE}
      analyze={analyze}
      voice={{ clean: "Catalog is clean. Every trigger is legible.", dirty: "Found issues an agent would trip on." }}
    />
  );
}
