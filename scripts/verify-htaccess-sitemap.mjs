import fs from 'node:fs/promises';
import path from 'node:path';

async function main() {
  // Next.js static export writes to out/, not dist/ (Astro-era leftover path).
  const sitemapPath = path.resolve('out/sitemap.xml');
  const sitemapXml = await fs.readFile(sitemapPath, 'utf8');
  
  // Extract all urls using regex
  const urls = [];
  const matches = sitemapXml.matchAll(/<loc>(https:\/\/pruningmypothos\.com)?([^<]+)<\/loc>/g);
  for (const match of matches) {
    urls.push(match[2]);
  }
  
  console.log(`Loaded ${urls.length} URLs from sitemap.`);

  // htaccess rules to test
  const goneRules = [
    /^\/shelf\/movies\/?.*$/,
    /^\/sentences\/sentence-[0-9]+\/?$/,
    /^\/systems\/simple-tokenizer\/?$/,
    /^\/shelf\/music\/music-recommendation.*$/
  ];

  const redirectRules = [
    /^\/notes\/?$/,
    /^\/notes\/([^/]+)\/?$/
  ];

  let failures = 0;

  for (const url of urls) {
    // Check if any rule matches
    for (const rule of goneRules) {
      if (rule.test(url)) {
        console.error(`ERROR: Sitemap URL "${url}" matches 410 Gone rule: ${rule}`);
        failures++;
      }
    }
    for (const rule of redirectRules) {
      if (rule.test(url)) {
        console.error(`ERROR: Sitemap URL "${url}" matches 301 Redirect rule: ${rule}`);
        failures++;
      }
    }
  }

  if (failures === 0) {
    console.log("SUCCESS: No sitemap URLs are matched by the redirect or 410 rules!");
  } else {
    console.error(`FAILED: Found ${failures} conflicts.`);
    process.exitCode = 1;
  }
}

main().catch(console.error);
