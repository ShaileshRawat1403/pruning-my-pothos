(function (global) {
  var SVGNS = "http://www.w3.org/2000/svg";

  function seededRandom(seed) {
    var s = (seed * 9301 + 49297) % 233280;
    if (s <= 0) s += 233279;
    return function () {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };
  }
  function jitter(rand, amount) {
    return (rand() - 0.5) * 2 * amount;
  }

  function el(tag, attrs) {
    var e = document.createElementNS(SVGNS, tag);
    for (var k in attrs) {
      if (attrs[k] !== undefined && attrs[k] !== null) e.setAttribute(k, attrs[k]);
    }
    return e;
  }

  function roughRectPath(x, y, w, h, r, seed, dash) {
    var rand = seededRandom(seed || 1);
    function j(amt) { return jitter(rand, amt === undefined ? 1.3 : amt); }
    r = Math.max(2, Math.min(r || 10, h / 2 - 1, w / 2 - 1));
    var x0 = x + j(), y0 = y + j(), x1 = x + w + j(), y1 = y + h + j();
    return (
      "M " + (x0 + r) + " " + y0 + " " +
      "L " + (x1 - r) + " " + (y0 + j(0.6)) + " " +
      "Q " + (x1 + j(0.8)) + " " + (y0 + j(0.8)) + " " + (x1 + j(0.6)) + " " + (y0 + r) + " " +
      "L " + (x1 + j(0.6)) + " " + (y1 - r) + " " +
      "Q " + (x1 + j(0.8)) + " " + (y1 + j(0.8)) + " " + (x1 - r) + " " + (y1 + j(0.6)) + " " +
      "L " + (x0 + r) + " " + (y1 + j(0.6)) + " " +
      "Q " + (x0 + j(0.8)) + " " + (y1 + j(0.8)) + " " + (x0 + j(0.6)) + " " + (y1 - r) + " " +
      "L " + (x0 + j(0.6)) + " " + (y0 + r) + " " +
      "Q " + (x0 + j(0.8)) + " " + (y0 + j(0.8)) + " " + (x0 + r) + " " + y0 + " Z"
    );
  }

  function roughCirclePath(cx, cy, r, seed) {
    var rand = seededRandom(seed || 1);
    var pts = 9;
    var coords = [];
    for (var i = 0; i < pts; i++) {
      var ang = (Math.PI * 2 * i) / pts;
      var rr = r + jitter(rand, r * 0.032);
      coords.push([cx + Math.cos(ang) * rr, cy + Math.sin(ang) * rr]);
    }
    var d = "M " + coords[0][0] + " " + coords[0][1] + " ";
    for (var k = 1; k <= pts; k++) {
      var c = coords[k % pts];
      var prev = coords[k - 1];
      var mx = (prev[0] + c[0]) / 2 + jitter(rand, 3);
      var my = (prev[1] + c[1]) / 2 + jitter(rand, 3);
      d += "Q " + mx + " " + my + " " + c[0] + " " + c[1] + " ";
    }
    return d + "Z";
  }

  function roughDiamondPath(cx, cy, w, h, seed) {
    var rand = seededRandom(seed || 1);
    function j() { return jitter(rand, 2); }
    var top = [cx + j(), cy - h / 2 + j()];
    var right = [cx + w / 2 + j(), cy + j()];
    var bottom = [cx + j(), cy + h / 2 + j()];
    var left = [cx - w / 2 + j(), cy + j()];
    return (
      "M " + top[0] + " " + top[1] +
      " Q " + (cx + w / 4) + " " + (cy - h / 4) + " " + right[0] + " " + right[1] +
      " Q " + (cx + w / 4) + " " + (cy + h / 4) + " " + bottom[0] + " " + bottom[1] +
      " Q " + (cx - w / 4) + " " + (cy + h / 4) + " " + left[0] + " " + left[1] +
      " Q " + (cx - w / 4) + " " + (cy - h / 4) + " " + top[0] + " " + top[1] + " Z"
    );
  }

  function roughLinePath(x1, y1, x2, y2, seed, bow) {
    var rand = seededRandom(seed || 1);
    bow = bow === undefined ? 6 : bow;
    var mx = (x1 + x2) / 2 + jitter(rand, bow);
    var my = (y1 + y2) / 2 + jitter(rand, bow);
    return "M " + x1 + " " + y1 + " Q " + mx + " " + my + " " + x2 + " " + y2;
  }

  var Ink = {
    svg: function (viewBox) {
      var svg = document.getElementById("s");
      svg.setAttribute("viewBox", viewBox);
      return svg;
    },
    rect: function (svg, o) {
      var p = el("path", {
        class: (o.cls || "ink") + " draw",
        "stroke-width": o.sw || 1.7,
        "stroke-dasharray": o.dash ? "5 5" : undefined,
        d: roughRectPath(o.x, o.y, o.w, o.h, o.r, o.seed),
      });
      svg.appendChild(p);
      if (o.label) {
        var lx = o.x + (o.lx !== undefined ? o.lx : 14);
        var ly = o.y + (o.ly !== undefined ? o.ly : o.h / 2 + 4);
        this.text(svg, { x: lx, y: ly, text: o.label, size: o.size || 12, cls: o.labelCls || (o.hi ? "label-hi" : "label"), anchor: o.anchor });
        if (o.sublabel) {
          var subs = Array.isArray(o.sublabel) ? o.sublabel : [o.sublabel];
          for (var i = 0; i < subs.length; i++) {
            this.text(svg, { x: lx, y: ly + 16 * (i + 1), text: subs[i], size: (o.size || 12) - 2, cls: "label label-muted", anchor: o.anchor });
          }
        }
      }
      return p;
    },
    circle: function (svg, o) {
      var p = el("path", { class: (o.cls || "ink") + " draw", "stroke-width": o.sw || 1.8, d: roughCirclePath(o.cx, o.cy, o.r, o.seed) });
      svg.appendChild(p);
      if (o.label) this.text(svg, { x: o.cx, y: o.cy + (o.ly || 4), text: o.label, size: o.size || 12, cls: o.labelCls || "label", anchor: "middle" });
      if (o.sublabel) this.text(svg, { x: o.cx, y: o.cy + (o.ly || 4) + 16, text: o.sublabel, size: (o.size || 12) - 2, cls: "label label-muted", anchor: "middle" });
      return p;
    },
    diamond: function (svg, o) {
      var p = el("path", { class: (o.cls || "ink") + " draw", "stroke-width": o.sw || 1.7, d: roughDiamondPath(o.cx, o.cy, o.w, o.h, o.seed) });
      svg.appendChild(p);
      if (o.label) this.text(svg, { x: o.cx, y: o.cy + (o.ly || 4), text: o.label, size: o.size || 10.5, cls: o.labelCls || "label", anchor: "middle" });
      return p;
    },
    line: function (svg, o) {
      var p = el("path", {
        class: (o.cls || "ink ink-3") + " draw" + (o.pulse ? " pulse" : ""),
        "stroke-width": o.sw || 1.5,
        "stroke-dasharray": o.dash ? undefined : undefined,
        d: roughLinePath(o.x1, o.y1, o.x2, o.y2, o.seed, o.bow),
      });
      svg.appendChild(p);
      if (o.dot) svg.appendChild(el("circle", { cx: o.x2, cy: o.y2, r: o.dotR || 2.4, class: o.dotCls || "fillink" }));
      return p;
    },
    path: function (svg, o) {
      var p = el("path", {
        class: (o.cls || "ink") + " draw" + (o.pulse ? " pulse" : ""),
        "stroke-width": o.sw || 1.5,
        "stroke-dasharray": o.dash ? "5 5" : undefined,
        d: o.d,
      });
      svg.appendChild(p);
      return p;
    },
    dot: function (svg, o) {
      var c = el("circle", { cx: o.cx, cy: o.cy, r: o.r || 2.6, class: o.cls || "fillink" });
      svg.appendChild(c);
      return c;
    },
    text: function (svg, o) {
      var t = el("text", { x: o.x, y: o.y, class: o.cls || "label", "font-size": o.size || 12, "text-anchor": o.anchor || "start" });
      t.textContent = o.text;
      svg.appendChild(t);
      return t;
    },
    run: function () {
      var root = document.documentElement;
      function theme() {
        try {
          var p = window.parent && window.parent.document.documentElement;
          var t = (p && p.getAttribute("data-theme")) || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
          root.setAttribute("data-theme", t);
        } catch (e) {
          root.setAttribute("data-theme", "light");
        }
      }
      theme();
      try {
        var p = window.parent && window.parent.document.documentElement;
        if (p) new MutationObserver(theme).observe(p, { attributes: true, attributeFilter: ["data-theme"] });
      } catch (e) {}
      function draw() {
        document.querySelectorAll(".draw").forEach(function (elm, i) {
          var len = (elm.getTotalLength && elm.getTotalLength()) || 300;
          elm.style.setProperty("--len", len);
          elm.style.transition = "none";
          elm.style.strokeDashoffset = len;
          elm.getBoundingClientRect();
          elm.style.transition = "stroke-dashoffset 1.3s cubic-bezier(0.16,1,0.3,1) " + i * 45 + "ms";
          elm.style.strokeDashoffset = "0";
        });
      }
      addEventListener("load", draw);
      setTimeout(draw, 60);
    },
  };
  global.Ink = Ink;
})(window);
