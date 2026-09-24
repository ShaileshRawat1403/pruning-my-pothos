# Hosting and edge setup

How pruningmypothos.com is served, as configured on 2026-09-24.

```
visitor -> Cloudflare (DNS, proxy, cache) -> Hostinger (LiteSpeed, static files from the deploy branch)
```

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
