import Script from "next/script";

/**
 * Site analytics: Google Analytics 4 (traffic) and Microsoft Clarity
 * (heatmaps, session recordings). Loaded after hydration so neither delays
 * the page, and only on the production host: local builds, the dev server,
 * static previews and the export routes that screenshot covers never send
 * data. GA4's enhanced measurement records client-side route changes as page
 * views. Clarity masks sensitive content by default.
 */
const GA_ID = "G-EQ4JMFY925";
const CLARITY_ID = "lqscm7xayr";
const HOST = "pruningmypothos.com";

const LOADER = `
(function () {
  if (location.hostname !== "${HOST}") return;
  var s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=${GA_ID}";
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag("js", new Date());
  window.gtag("config", "${GA_ID}");
  (function (c, l, a, r, i, t, y) {
    c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
    t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
    y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
  })(window, document, "clarity", "script", "${CLARITY_ID}");
})();
`;

export default function Analytics() {
  return <Script id="site-analytics" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: LOADER }} />;
}
