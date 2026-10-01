# Hosting, deploys and edge setup

How pruningmypothos.com is built, deployed and served. Edge settings as
configured on 2026-09-24.

```
visitor -> Cloudflare (DNS, proxy, cache) -> Hostinger (LiteSpeed, static files from the deploy branch)
```

## Deploys

**Pushing to `main` deploys production.** Nothing else does.

1. CI (`.github/workflows/ci.yml`) runs lint, the contract suite, the content
   linters, the build and the audit on every push.
2. When CI is green on `main`, "Deploy to Hostinger"
   (`.github/workflows/deploy-hostinger.yml`) builds `out/` and force-publishes
   it to the `deploy` branch. It can also be run by hand from the Actions tab.
3. Hostinger's Git integration watches `deploy` and pulls it. Hostinger never
   builds; it serves what it pulled.

No FTP or SSH credentials are involved. The old FTP mirror script is gone;
the `deploy` branch is the only path.

**Is it live?** The `deploy` branch advancing, Hostinger pulling, and
Cloudflare's cache expiring are three separate states. Ask the origin
directly, bypassing Cloudflare:

```
curl -sI --resolve "pruningmypothos.com:443:82.112.239.210" https://pruningmypothos.com/ | grep -i last-modified
```

Then `SITE_URL=https://pruningmypothos.com npm run verify:deploy` compares every
cover image with the live site and names any that are stale.

## Checks

| Command | What it checks | When |
|:--|:--|:--|
| `npm run test:contract` | the editorial contract, covers, decks, house style | CI, blocking |
| `npm run lint:content`, `lint:systems`, `lint:gates` | frontmatter and structure of each collection, banned copy | CI, blocking |
| `npm run verify:covers` | every cover exists and none is reused | CI, blocking |
| `npm run audit` | all linters, then the build output: robots, sitemap, schema, that no sitemap URL is redirected or gone (`verify:redirects`), and that every internal link from a Systems article reaches a page (`verify:links`) | CI, after the build |
| `npm run verify:deploy` | live cover files match the repository | by hand, after a deploy |

Run `npm run build` before `npm run audit`: the audit reads `out/`, so an
audit before a build inspects stale output.

## Cloudflare (zone pruningmypothos.com)

- **SSL/TLS mode:** Full. Hostinger serves a valid Let's Encrypt certificate.
- **DNS:** one proxied A record for the apex (Hostinger server), `www` proxied
  CNAME. All mail records (MX, DKIM, `autoconfig`, `autodiscover`) are
  **DNS only**; proxying them breaks mail client setup.
- **Tiered Cache:** Smart Tiered Cache on, so fewer Cloudflare data centres
  connect to Hostinger.
- **Cache Rule "Pages: cache per origin Cache-Control":** host is
  pruningmypothos.com and path is not `/cdn-cgi/` -> eligible for cache; Edge
  TTL follows the origin `Cache-Control` (Cloudflare defaults if absent);
  Browser TTL respects origin.

## Hostinger (hPanel)

- **Hostinger CDN: disabled and opted out** of automatic CDN. Two CDNs in a row
  (Cloudflare in front of Hostinger's CDN) caused intermittent 520/522/525.
  Do not re-enable it while Cloudflare proxies the site.

## Cache headers (public/.htaccess)

| Files | Cache-Control | Effect |
|:--|:--|:--|
| `.html`, `.txt` (pages) | `max-age=0, s-maxage=600, stale-while-revalidate=60` | Cloudflare serves a page for up to 10 minutes; browsers always revalidate |
| images, fonts, css/js, pdf | `max-age=86400` | one day at the edge and in browsers |

**After a deploy, pages can take up to 10 minutes to update at the edge**, and
redrawn images (same file name) up to a day in browsers. To publish
immediately, purge the cache: Cloudflare -> Caching -> Configuration -> Purge
Everything.
