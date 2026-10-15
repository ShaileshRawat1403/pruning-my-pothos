"""Render a `tmux capture-pane -e -p -N` dump (SGR colours) as a standalone HTML page.

Used to make the DAX product stills (`public/images/dax/`) from the real
binary, so every pixel is what the terminal showed. Steps are in
docs/HANDOVER.md ("Product stills from a terminal app").

Usage: python3 -I scripts/ansi-to-html.py capture.ans out.html [bg] [fg]
Then: Chrome --headless=new --force-device-scale-factor=2
      --window-size=1040,650 --screenshot=out.png file://.../out.html
"""
import html
import re
import sys

BASE16 = ["#1b1d2a", "#e06c75", "#98c379", "#e5c07b", "#61afef", "#c678dd", "#56b6c2", "#abb2bf",
          "#5c6370", "#e06c75", "#98c379", "#e5c07b", "#61afef", "#c678dd", "#56b6c2", "#ffffff"]


def x256(n):
    if n < 16:
        return BASE16[n]
    if n < 232:
        n -= 16
        r, g, b = n // 36, (n // 6) % 6, n % 6
        f = lambda v: 0 if v == 0 else 55 + v * 40
        return "#%02x%02x%02x" % (f(r), f(g), f(b))
    v = 8 + (n - 232) * 10
    return "#%02x%02x%02x" % (v, v, v)


def render(text, bg_default, fg_default):
    out = []
    st = {"fg": None, "bg": None, "b": False, "dim": False, "i": False, "u": False, "rev": False}
    for line in text.split("\n"):
        parts = re.split(r"(\x1b\[[0-9;:]*m)", line)
        row = []
        for p in parts:
            m = re.fullmatch(r"\x1b\[([0-9;:]*)m", p)
            if m:
                codes = [int(c) if c else 0 for c in re.split(r"[;:]", m.group(1))] or [0]
                i = 0
                while i < len(codes):
                    c = codes[i]
                    if c == 0:
                        st = {k: (None if k in ("fg", "bg") else False) for k in st}
                    elif c == 1: st["b"] = True
                    elif c == 2: st["dim"] = True
                    elif c == 3: st["i"] = True
                    elif c == 4: st["u"] = True
                    elif c == 7: st["rev"] = True
                    elif c == 22: st["b"] = st["dim"] = False
                    elif c == 23: st["i"] = False
                    elif c == 24: st["u"] = False
                    elif c == 27: st["rev"] = False
                    elif 30 <= c <= 37: st["fg"] = BASE16[c - 30]
                    elif 90 <= c <= 97: st["fg"] = BASE16[c - 90 + 8]
                    elif 40 <= c <= 47: st["bg"] = BASE16[c - 40]
                    elif 100 <= c <= 107: st["bg"] = BASE16[c - 100 + 8]
                    elif c == 39: st["fg"] = None
                    elif c == 49: st["bg"] = None
                    elif c in (38, 48) and i + 1 < len(codes):
                        key = "fg" if c == 38 else "bg"
                        if codes[i + 1] == 5 and i + 2 < len(codes):
                            st[key] = x256(codes[i + 2]); i += 2
                        elif codes[i + 1] == 2 and i + 4 < len(codes):
                            st[key] = "#%02x%02x%02x" % tuple(codes[i + 2:i + 5]); i += 4
                    i += 1
                continue
            if not p:
                continue
            fg, bg = st["fg"] or fg_default, st["bg"]
            if st["rev"]:
                fg, bg = (bg or bg_default), fg
            css = [f"color:{fg}"]
            if bg: css.append(f"background:{bg}")
            if st["b"]: css.append("font-weight:700")
            if st["dim"]: css.append("opacity:.6")
            if st["i"]: css.append("font-style:italic")
            if st["u"]: css.append("text-decoration:underline")
            row.append(f'<span style="{";".join(css)}">{html.escape(p)}</span>')
        out.append('<div class="l">' + ("".join(row) or "&nbsp;") + "</div>")
    return "".join(out)


if __name__ == "__main__":
    src, dst = sys.argv[1], sys.argv[2]
    raw = open(src, encoding="utf-8").read()
    counts = {}
    for m in re.finditer(r"\x1b\[[0-9;]*48;2;(\d+);(\d+);(\d+)", raw):
        k = "#%02x%02x%02x" % tuple(int(x) for x in m.groups()); counts[k] = counts.get(k, 0) + 1
    bg = max(counts, key=counts.get) if counts else (sys.argv[3] if len(sys.argv) > 3 else "#1b1d2a")
    fg = sys.argv[4] if len(sys.argv) > 4 else "#d7dae0"
    body = render(open(src, encoding="utf-8").read().rstrip("\n"), bg, fg)
    open(dst, "w", encoding="utf-8").write(f"""<!doctype html><meta charset="utf-8">
<style>html,body{{margin:0;background:{bg}}}pre{{margin:0;padding:18px 22px;font:15px/20px 'JetBrains Mono','SF Mono',Menlo,monospace;color:{fg};background:{bg};display:inline-block;white-space:pre}}.l{{height:20px}}.l span{{display:inline-block;height:20px;vertical-align:top}}</style>
<pre id="t">{body}</pre>""")
