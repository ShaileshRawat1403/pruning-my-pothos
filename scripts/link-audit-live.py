"""Crawl the live site from its page list; check every asset each live page
references, every internal link in it, and the RSC data files client-side
navigation fetches, through Cloudflare as visitors see them.

Usage: python3 -I scripts/link-audit-live.py pages.txt out.json
Make pages.txt from the build:
  cd out && find . -name index.html | grep -v dank-samples \
    | sed 's|^\.|https://pruningmypothos.com|; s|index.html$||' > pages.txt
A 4xx or 429 with cf-cache-status HIT is a cached origin error: purge
those URLs in Cloudflare (Caching, Configuration, Custom Purge). Expected
and harmless: /404/ and /technical-marketing-portfolio/ RSC files, and
/cdn-cgi/l/email-protection (Cloudflare's email obfuscation)."""
import json, re, sys, html
from concurrent.futures import ThreadPoolExecutor
from urllib.parse import urljoin, urlparse
from urllib.request import Request, urlopen
from urllib.error import HTTPError

SITE = "https://pruningmypothos.com"
UA = {"User-Agent": "Mozilla/5.0 (pmp-link-audit)"}

def get(url, body=False):
    try:
        r = urlopen(Request(url, headers=UA), timeout=30)
        data = r.read() if body else b""
        return r.status, r.headers.get("cf-cache-status", ""), data
    except HTTPError as e:
        return e.code, e.headers.get("cf-cache-status", ""), b""
    except Exception as e:
        return 0, str(e)[:40], b""

pages = [l.strip() for l in open(sys.argv[1]) if l.strip()]
ATTR = re.compile(r'\b(?:href|src)\s*=\s*"([^"]*)"')

def crawl(url):
    st, cf, data = get(url, True)
    refs = set()
    if st == 200:
        for v in ATTR.findall(data.decode("utf-8", "replace")):
            v = html.unescape(v)
            u = urlparse(urljoin(url, v))
            if u.netloc in ("pruningmypothos.com",) and u.scheme == "https":
                refs.add(u.path)
    return url, st, cf, refs

with ThreadPoolExecutor(10) as ex:
    res = list(ex.map(crawl, pages))

page_status = {u: (st, cf) for u, st, cf, _ in res}
refs = {}
for u, st, cf, rs in res:
    for r in rs:
        refs.setdefault(r, set()).add(u.replace(SITE, ""))

# RSC payloads for each page (client navigation).
rsc = set()
for u, st, _, _ in res:
    if st == 200:
        p = urlparse(u).path
        if not p.endswith("/"):
            continue
        rsc.add(p + "index.txt")
        rsc.add(p + "__next._tree.txt")

targets = sorted((set(refs) | rsc) - {urlparse(u).path for u in pages})
def chk(p):
    st, cf, _ = get(SITE + p)
    return p, st, cf
with ThreadPoolExecutor(12) as ex:
    tres = list(ex.map(chk, targets))

bad_pages = {u: v for u, v in page_status.items() if v[0] != 200}
bad_refs = {p: (st, cf, sorted(refs.get(p, ["(rsc)"]))[:4]) for p, st, cf in tres if st not in (200,)}
json.dump({"bad_pages": bad_pages, "bad_refs": bad_refs}, open(sys.argv[2], "w"), indent=1)
print("pages", len(pages), "bad pages", len(bad_pages), "targets", len(targets), "bad targets", len(bad_refs))
for u, v in bad_pages.items():
    print("PAGE", v, u)
for p, v in sorted(bad_refs.items())[:80]:
    print("REF", v[0], v[1], p, "<-", ", ".join(v[2]))
