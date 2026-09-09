#!/usr/bin/env node

import { readdir, readFile } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

const SITE_URL = process.env.SITE_URL || 'https://pruningmypothos.com';
// Next.js static export (output: "export") writes to out/, not dist/. dist/ was
// the Astro-era output dir; this got missed in the migration and silently made
// every check in this script report "file not found" instead of running.
const DIST_DIR = './out';

console.log('# SEO/AEO/GEO Indexing Verification Report');
console.log(`Site: ${SITE_URL}`);
console.log(`Generated: ${new Date().toISOString()}`);
console.log('\n---\n');

const checks = [];

function addCheck(name, status, details = '') {
  checks.push({ name, status, details });
  const icon = status === 'pass' ? '✅' : status === 'warn' ? '⚠️' : '❌';
  console.log(`${icon} ${name}${details ? ': ' + details : ''}`);
}

async function checkFile(path) {
  return existsSync(join(DIST_DIR, path)) ? await readFile(join(DIST_DIR, path), 'utf8') : null;
}

console.log('## 1. Core Files\n');

const robotsContent = await checkFile('robots.txt');
if (robotsContent) {
  const hasAllowAll = robotsContent.includes('Allow: /');
  const hasGPTBot = robotsContent.includes('GPTBot') || robotsContent.includes('ChatGPT-User');
  const hasPerplexity = robotsContent.includes('PerplexityBot');
  const hasClaude = robotsContent.includes('ClaudeBot');
  const hasSitemap = robotsContent.includes('Sitemap:');
  
  addCheck('robots.txt exists', 'pass');
  addCheck('Allows crawling', hasAllowAll ? 'pass' : 'fail', hasAllowAll ? 'Yes' : 'No');
  addCheck('Allows GPTBot', hasGPTBot ? 'pass' : 'warn', hasGPTBot ? 'Yes' : 'Not specified');
  addCheck('Allows PerplexityBot', hasPerplexity ? 'pass' : 'warn', hasPerplexity ? 'Yes' : 'Not specified');
  addCheck('Allows ClaudeBot', hasClaude ? 'pass' : 'warn', hasClaude ? 'Yes' : 'Not specified');
  addCheck('Has sitemap reference', hasSitemap ? 'pass' : 'fail', hasSitemap ? 'Yes' : 'No');
} else {
  addCheck('robots.txt exists', 'fail', 'File not found in out/');
}

const llmsContent = await checkFile('llms.txt');
addCheck('llms.txt exists', llmsContent ? 'pass' : 'warn', llmsContent ? 'Yes' : 'Missing (GEO)');

const sitemapContent = await checkFile('sitemap.xml');
if (sitemapContent) {
  const urlCount = (sitemapContent.match(/<loc>/g) || []).length;
  addCheck('sitemap.xml exists', 'pass');
  addCheck('Sitemap URL count', urlCount > 100 ? 'pass' : 'warn', `${urlCount} URLs`);
  
  let invalidRoutes = 0;
  const origin = new URL(SITE_URL).origin;
  for (const match of sitemapContent.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const url = new URL(match[1]);
    if (url.origin !== origin) {
      invalidRoutes++;
      addCheck('Sitemap origin', 'fail', url.href);
      continue;
    }
    const route = decodeURIComponent(url.pathname).replace(/^\/+/, '');
    const html = await checkFile(join(route, 'index.html'));
    if (!html || /<meta\b[^>]*name="robots"[^>]*content="[^"]*noindex/i.test(html) ||
        /<meta\b[^>]*http-equiv="refresh"/i.test(html)) {
      invalidRoutes++;
      addCheck('Sitemap route is exported, indexable and not a redirect', 'fail', url.pathname);
    }
  }
  addCheck('All sitemap routes resolve to indexable exports', invalidRoutes === 0 ? 'pass' : 'fail', `${invalidRoutes} invalid routes`);
} else {
  addCheck('sitemap.xml exists', 'fail', 'File not found');
}

console.log('\n## 2. Schema Markup\n');

const indexContent = await checkFile('index.html');
if (indexContent) {
  const hasOrg = indexContent.includes('"@type":"Organization"');
  const hasPerson = indexContent.includes('"@type":"Person"');
  const hasArticle = indexContent.includes('"@type":"Article"');
  const hasBreadcrumb = indexContent.includes('"@type":"BreadcrumbList"');
  
  addCheck('Organization schema', hasOrg ? 'pass' : 'fail');
  addCheck('Person schema', hasPerson ? 'pass' : 'fail');
  addCheck('Article schema (homepage)', hasArticle ? 'warn' : 'pass', hasArticle ? 'Found' : 'N/A for homepage');
  addCheck('BreadcrumbList schema', hasBreadcrumb ? 'pass' : 'warn');
}

console.log('\n## 3. Meta Tags (Homepage)\n');

if (indexContent) {
  const hasTitle = indexContent.includes('<title>');
  const hasDescription = indexContent.includes('<meta name="description"');
  const hasCanonical = indexContent.includes('<link rel="canonical"');
  const hasAuthor = indexContent.includes('<meta name="author"');
  const hasOgImage = indexContent.includes('og:image');
  const hasTwitterCard = indexContent.includes('twitter:card');
  
  addCheck('Title tag', hasTitle ? 'pass' : 'fail');
  addCheck('Meta description', hasDescription ? 'pass' : 'fail');
  addCheck('Canonical URL', hasCanonical ? 'pass' : 'fail');
  addCheck('Author meta', hasAuthor ? 'pass' : 'warn');
  addCheck('OG image', hasOgImage ? 'pass' : 'fail');
  addCheck('Twitter card', hasTwitterCard ? 'pass' : 'warn');
}

console.log('\n## 4. Content Collections\n');

const systemsDir = './src/content/systems';
const sentencesDir = './src/content/sentences';
const selfDir = './src/content/self';
const shelfDir = './src/content/shelf';

async function countFiles(dir) {
  try {
    const files = await readdir(dir);
    return files.filter(f => f.endsWith('.md') || f.endsWith('.mdx')).length;
  } catch {
    return 0;
  }
}

async function checkCollectionFaq(dir) {
  try {
    const files = await readdir(dir);
    const mdFiles = files.filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
    let withFaq = 0;
    for (const file of mdFiles) {
      const content = await readFile(join(dir, file), 'utf8');
      if (content.includes('faq:')) withFaq++;
    }
    return { total: mdFiles.length, withFaq };
  } catch {
    return { total: 0, withFaq: 0 };
  }
}

const systemsCount = await countFiles(systemsDir);
const sentencesCount = await countFiles(sentencesDir);
const selfCount = await countFiles(selfDir);

const systemsFaq = await checkCollectionFaq(systemsDir);

addCheck('Systems pages', systemsCount > 0 ? 'pass' : 'fail', `${systemsCount} docs`);
addCheck('Sentences pages', sentencesCount > 0 ? 'pass' : 'warn', `${sentencesCount} docs`);
addCheck('Self pages', selfCount > 0 ? 'pass' : 'warn', `${selfCount} docs`);
addCheck('Systems FAQ coverage', systemsFaq.total > 0 ? (systemsFaq.withFaq / systemsFaq.total > 0.5 ? 'pass' : 'warn') : 'fail', 
  `${systemsFaq.withFaq}/${systemsFaq.total} have FAQ`);

console.log('\n## 5. Image Alt Text (Spot Check)\n');

const systemsFiles = await readdir(systemsDir);
const filesToCheck = systemsFiles.slice(0, 5);
let imagesWithoutAlt = 0;
let imagesWithAlt = 0;

for (const file of filesToCheck) {
  const content = await readFile(join(systemsDir, file), 'utf8');
  const imgMatches = content.match(/!\[([^\]]*)\]\(/g) || [];
  const altMatches = content.match(/alt="([^"]*)"/g) || [];
  
  for (const match of imgMatches) {
    const altPart = match.replace('![', '').replace('](', '');
    if (altPart && altPart.trim()) {
      imagesWithAlt++;
    } else {
      imagesWithoutAlt++;
    }
  }
}

addCheck('Images have alt text', imagesWithoutAlt === 0 ? 'pass' : 'warn', 
  `${imagesWithAlt} with alt, ${imagesWithoutAlt} without`);

console.log('\n## 6. Indexing Checklist\n');

console.log('### Submit to Search Engines');
console.log('Submit the sitemap through Google Search Console and Bing Webmaster Tools.');
console.log('\n### Google Search Console');
console.log(`1. Go to: https://search.google.com/search-console`);
console.log(`2. Enter: ${SITE_URL}`);
console.log('3. Select "URL inspection" to check individual pages');
console.log('4. Use "Coverage" report to find indexing issues');
console.log('\n### Bing Webmaster');
console.log(`1. Go to: https://www.bing.com/webmasters`);
console.log(`2. Add your site and submit sitemap at: ${SITE_URL}/sitemap.xml`);

console.log('\n### AI Search Indexing');
console.log('Once deployed, verify:');
console.log('- GPTBot access: Check server logs for OpenAI crawler');
console.log('- PerplexityBot: Check for "python-requests" or "PerplexityBot" in logs');
console.log('- ClaudeBot: Check for "ClaudeBot" in logs');

console.log('\n---\n');
console.log('## Summary');

const passCount = checks.filter(c => c.status === 'pass').length;
const warnCount = checks.filter(c => c.status === 'warn').length;
const failCount = checks.filter(c => c.status === 'fail').length;

console.log(`Pass: ${passCount} | Warnings: ${warnCount} | Failures: ${failCount}`);

if (failCount > 0) {
  console.log('\n⚠️  Some critical checks failed. Review before deploying.');
  process.exitCode = 1;
}
