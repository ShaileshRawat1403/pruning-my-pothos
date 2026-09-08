import { promises as fs } from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const PUBLIC_HTACCESS = path.join(ROOT, 'public', '.htaccess');
// Next.js static export writes to out/, not dist/ (Astro-era leftover path).
// Next already copies dotfiles from public/ into out/ on its own, so this is a
// belt-and-suspenders safety net, not the primary mechanism.
const DIST_HTACCESS = path.join(ROOT, 'out', '.htaccess');

async function main() {
  try {
    await fs.access(PUBLIC_HTACCESS);
  } catch {
    return;
  }

  await fs.copyFile(PUBLIC_HTACCESS, DIST_HTACCESS);
  console.log('Copied public/.htaccess to out/.htaccess');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
