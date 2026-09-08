"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import NewsletterForm from "./NewsletterForm";

export default function Footer() {
  const pathname = usePathname();
  const year = new Date().getFullYear();

  const isEditorialHome =
    pathname === "/" ||
    pathname === "/editorial-preview" ||
    pathname === "/editorial-preview/";

  if (isEditorialHome) {
    return null;
  }

  const isSentiments =
    pathname.startsWith("/sentiments") ||
    pathname.startsWith("/sentences") ||
    pathname.startsWith("/self") ||
    pathname.startsWith("/shelf");

  if (!isSentiments) {
    return (
      <footer
        className="w-full mt-auto"
        style={{ borderTop: "1px solid var(--card-border)" }}
      >
        <div className="app-shell pt-16 pb-12 flex flex-col gap-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col gap-3">
              <h5
                className="font-heading text-xs font-bold uppercase tracking-wider"
                style={{ color: "var(--text-primary)" }}
              >
                Systems
              </h5>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                Open-source utilities, visual canvases, and evaluation harness
                templates for AI-assisted workflow development.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h5
                className="font-heading text-xs font-bold uppercase tracking-wider"
                style={{ color: "var(--text-primary)" }}
              >
                Ecosystem
              </h5>
              {[
                { href: "/tools", label: "Browse Store" },
                { href: "/canvases", label: "Interactive Canvases" },
                { href: "/docs", label: "Command Documentation" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="link-slide self-start text-sm transition-colors"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {l.label}
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <h5
                className="font-heading text-xs font-bold uppercase tracking-wider"
                style={{ color: "var(--text-primary)" }}
              >
                Newsletter
              </h5>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                AI systems and news, written by one person who builds with it.
              </p>
              <NewsletterForm variant="footer" />
            </div>
          </div>

          <div
            className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8"
            style={{ borderTop: "1px solid var(--card-border)" }}
          >
            <div className="flex flex-col gap-1.5">
              <p className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.16em]" style={{ color: "var(--text-muted)" }}>
                <span className="pulse-dot" aria-hidden />
                Set in Schibsted Grotesk &amp; IBM Plex Mono
              </p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                &copy; {year} Pruning My Pothos. All rights reserved.
                {" · "}
                <a
                  href="mailto:shailesh.rawat1403@gmail.com"
                  className="link-slide font-mono"
                  style={{ color: "var(--accent-purple)" }}
                >
                  shailesh.rawat1403@gmail.com
                </a>
              </p>
            </div>
            <div className="flex gap-5">
              {[
                { href: "/", label: "Systems" },
                { href: "/sentiments", label: "Sentiments" },
                { href: "/sentences", label: "Writing Archive" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="link-slide text-xs font-mono transition-colors"
                  style={{ color: "var(--text-muted)" }}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    );
  }

  // Sentiments workspace footer
  const links = [
    { label: "Email", href: "mailto:shailesh.rawat1403@gmail.com", external: false },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/shailesh-rawat", external: true },
    { label: "GitHub", href: "https://github.com/ShaileshRawat1403", external: true },
    { label: "pruningmypothos.com", href: "https://pruningmypothos.com", external: true },
  ];

  return (
    <footer
      className="w-full mt-auto"
      style={{ borderTop: "1px solid var(--card-border)" }}
    >
      <div className="app-shell py-8 flex flex-col items-center gap-5 text-center">
        <div className="flex flex-wrap justify-center gap-2">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="px-3 py-1 rounded-full text-xs font-mono transition-all"
              style={{
                color: "var(--text-secondary)",
                background: "var(--card-bg)",
                border: "1px solid var(--card-border)",
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
        <p className="text-xs leading-relaxed max-w-[56ch]" style={{ color: "var(--text-secondary)" }}>
          PruningMyPothos is a thinking workspace on AI systems, orchestration,
          platform integration, governance, and adoption.
        </p>
        <div className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>
          &copy; {year} Shailesh Rawat. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
