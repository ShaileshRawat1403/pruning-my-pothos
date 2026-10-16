"""Link audit over the static export (out/).

Usage: python3 -I scripts/link-audit-build.py out /tmp/link-audit.json
Then:  python3 -I scripts/link-audit-live.py <pages.txt> /tmp/live.json
(pages.txt: one live URL per line, e.g. every out/**/index.html as a URL).
Ignore /_next/ chunk 404s from a local build when checking live: CI builds
its own chunk names. Background: docs/HANDOVER.md, section 6.

Pass 1: every internal href/src in every HTML page must resolve to a file in
out/ (or be a redirect/410 declared in out/.htaccess, reported separately).
Writes JSON with broken links and the full set of internal targets and
external links for later passes.
"""
import html, json, os, re, sys
from urllib.parse import urljoin, urlparse, unquote

OUT = sys.argv[1]
REPORT = sys.argv[2]
SITE = "https://pruningmypothos.com"

ATTR = re.compile(r'\b(href|src|srcset|poster|data-src)\s*=\s*"([^"]*)"', re.I)

def page_url(path):
    rel = os.path.relpath(path, OUT).replace(os.sep, "/")
    if rel.endswith("index.html"):
        rel = rel[: -len("index.html")]
    return SITE + "/" + rel

def resolves(p):
    p = unquote(p.split("#")[0].split("?")[0])
    if not p.startswith("/"):
        return True
    fs = os.path.join(OUT, p.lstrip("/"))
    if p.endswith("/"):
        return os.path.isfile(os.path.join(fs, "index.html"))
    if os.path.isfile(fs):
        return True
    if os.path.isfile(fs + ".html") or os.path.isfile(os.path.join(fs, "index.html")):
        return True
    return False

broken, internal, external = {}, set(), {}
pages = 0
for root, _, files in os.walk(OUT):
    for f in files:
        if not f.endswith(".html"):
            continue
        path = os.path.join(root, f)
        rel = os.path.relpath(path, OUT)
        if rel.startswith(("dank-samples", "visual-preview", "_next")):
            continue
        pages += 1
        src = page_url(path)
        text = open(path, encoding="utf-8", errors="replace").read()
        # Skip inline JSON/RSC payload noise: only real attributes.
        for attr, val in ATTR.findall(text):
            val = html.unescape(val).strip()
            cands = [c.strip().split(" ")[0] for c in val.split(",")] if attr.lower() == "srcset" else [val]
            for v in cands:
                if not v or v.startswith(("mailto:", "tel:", "javascript:", "data:", "#", "blob:")):
                    continue
                absu = urljoin(src, v)
                u = urlparse(absu)
                if u.netloc in ("pruningmypothos.com", "www.pruningmypothos.com"):
                    p = u.path or "/"
                    internal.add(p)
                    if not resolves(p):
                        broken.setdefault(p, set()).add(src.replace(SITE, ""))
                elif u.scheme in ("http", "https"):
                    external.setdefault(absu.split("#")[0], set()).add(src.replace(SITE, ""))

json.dump({
    "pages": pages,
    "broken": {k: sorted(v) for k, v in sorted(broken.items())},
    "internal": sorted(internal),
    "external": {k: sorted(v)[:3] for k, v in sorted(external.items())},
}, open(REPORT, "w"), indent=1)
print("pages", pages, "internal targets", len(internal), "broken", len(broken), "external", len(external))
for k, v in sorted(broken.items()):
    print("BROKEN", k, "<-", ", ".join(sorted(v)[:4]), f"(+{len(v)-4})" if len(v) > 4 else "")
