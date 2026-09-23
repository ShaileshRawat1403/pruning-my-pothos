import { promises as fs } from 'node:fs';
import path from 'node:path';

const SYSTEMS_DIR = path.resolve('src/content/systems');

function countMatches(content, regex) {
  return (content.match(regex) || []).length;
}

function analyze(raw) {
  const internalLinks = countMatches(raw, /\[[^\]]+\]\(\/(?!\/)/g);
  const externalLinks = countMatches(raw, /\[[^\]]+\]\(https?:\/\/[^\s)]+/g);
  const tables = countMatches(raw, /<table\b/gi);
  const diagrams = countMatches(raw, /<figure\s+class=["'][^"']*diagram/gi);
  const callouts = countMatches(raw, /<aside\s+class=["'][^"']*callout/gi);
  const hasAudienceDeclaration =
    /\b(this article|this document|this page|this guide|for practitioners|for builders|for operators|for leaders|for teams|for organizations|for product teams|for small teams)\b/i.test(raw);
  const hasProofLink =
    /\[[^\]]+\]\(\/(portfolio|shelf\/local-experiments|shelf\/shared-resources)\//i.test(raw);

  return {
    internalLinks,
    externalLinks,
    tables,
    diagrams,
    callouts,
    hasAudienceDeclaration,
    hasProofLink,
  };
}

function buildWarnings(file, metrics) {
  const warnings = [];

  if (metrics.internalLinks < 1) {
    warnings.push('missing internal links (recommended: >= 1)');
  }
  if (metrics.tables + metrics.diagrams < 1) {
    warnings.push('missing visual aid (table or diagram recommended: >= 1)');
  }
  if (!metrics.hasAudienceDeclaration) {
    warnings.push('missing audience declaration (recommended: state who the page helps)');
  }
  if (!metrics.hasProofLink) {
    warnings.push('missing proof link (recommended: link to portfolio, local experiment, or shared resource)');
  }

  return warnings.map((warning) => ({ file, warning }));
}

async function main() {
  const entries = await fs.readdir(SYSTEMS_DIR, { withFileTypes: true });
  const files = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.mdx'))
    .map((entry) => path.join(SYSTEMS_DIR, entry.name))
    .sort((a, b) => a.localeCompare(b));

  const allWarnings = [];

  for (const filePath of files) {
    const raw = await fs.readFile(filePath, 'utf8');
    const metrics = analyze(raw);
    const file = path.basename(filePath);
    allWarnings.push(...buildWarnings(file, metrics));
  }

  if (allWarnings.length === 0) {
    console.log('Advisory: no consistency warnings found.');
    return;
  }

  console.log(`Advisory: ${allWarnings.length} warning(s) across systems docs:\n`);
  for (const item of allWarnings) {
    console.log(`- ${item.file}: ${item.warning}`);
  }
  console.log('\nAdvisory checks are non-blocking by design.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
