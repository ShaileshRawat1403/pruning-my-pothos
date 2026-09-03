"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

// Named by what is behind the link, not by the reader's state and not by
// an internal metaphor. Sentences, Sentiments, Self and Schema come out of
// the nav: 139 of 263 content files, zero clicks between them in 16 months.
// Their URLs stay live, so nothing 404s and no equity is lost. Playbooks,
// Teardowns and Field Notes join this list when those routes exist; naming
// them here before then would be four dead links.
const navLinks = [
  { href: "/systems",   label: "Explainers" },
  { href: "/tools",     label: "Tools" },
  { href: "/shelf",     label: "Resources" },
  { href: "/about",     label: "About" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-4 z-50 mt-4">
      <div className="app-shell">
      <nav
        className="flex items-center justify-between px-5 py-2.5 transition-all duration-300"
        style={{
          background: scrolled ? "var(--header-bg-scrolled)" : "var(--header-bg-idle)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          borderRadius: "4px",
          border: `1px solid ${scrolled ? "var(--header-border-scrolled)" : "var(--header-border-idle)"}`,
          boxShadow: scrolled ? "0 10px 34px rgba(0,0,0,0.28)" : "none",
        }}
      >
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group" style={{ textDecoration: "none" }}>
          <div
            className="transition-all duration-300"
            aria-hidden="true"
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              overflow: "hidden",
              backgroundColor: "var(--card-bg)",
              border: "1px solid var(--card-border-hover)",
              boxShadow: "inset 0 0 0 1px color-mix(in srgb, var(--bg-color) 28%, transparent)",
            }}
          >
            <img
              src="/favicon.png"
              alt=""
              className="header-logo-badge"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                display: "block",
              }}
            />
          </div>
          <span
            className="font-heading font-semibold text-[15px] tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Sans Serif Systems
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1.5">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="nav-ink relative px-3 py-1.5 transition-all duration-200"
              style={{
                color: isActive(href) ? "var(--text-primary)" : "var(--text-muted)",
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                borderRadius: "2px",
                background: isActive(href) ? "color-mix(in srgb, var(--accent-purple) 12%, transparent)" : "transparent",
              }}
            >
              {label}
              {isActive(href) && (
                <span
                  className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-px"
                  style={{ width: "16px", background: "var(--accent-cyan)" }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href="https://github.com/ShaileshRawat1403"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-1.5 px-3.5 py-1.5 transition-all duration-200"
            style={{
              color: "var(--text-secondary)",
              background: "var(--card-bg)",
              border: "1px solid var(--card-border)",
              borderRadius: "2px",
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.4-1.34-1.77-1.34-1.77-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.14 3 .4 2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span className="block w-5 h-px transition-all duration-300" style={{ background: "var(--text-secondary)", transform: menuOpen ? "translateY(8px) rotate(45deg)" : "none" }} />
            <span className="block w-5 h-px transition-all duration-300" style={{ background: "var(--text-secondary)", opacity: menuOpen ? 0 : 1 }} />
            <span className="block w-5 h-px transition-all duration-300" style={{ background: "var(--text-secondary)", transform: menuOpen ? "translateY(-8px) rotate(-45deg)" : "none" }} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="lg:hidden mt-2 p-4 flex flex-col gap-1 animate-slide-down"
          style={{
            background: "var(--header-bg-scrolled)",
            backdropFilter: "blur(18px)",
            border: "1px solid var(--card-border)",
            borderRadius: "4px",
          }}
        >
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="px-4 py-2.5 transition-all duration-200"
              style={{
                color: isActive(href) ? "var(--text-primary)" : "var(--text-muted)",
                fontFamily: "var(--font-mono)", fontSize: "11px",
                letterSpacing: "0.14em", textTransform: "uppercase",
                borderRadius: "2px",
                background: isActive(href) ? "color-mix(in srgb, var(--accent-purple) 12%, transparent)" : "transparent",
              }}
            >
              {label}
            </Link>
          ))}
          <a
            href="https://github.com/ShaileshRawat1403"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 px-4 py-2.5 text-center"
            style={{
              color: "var(--text-muted)",
              border: "1px solid var(--card-border)",
              borderRadius: "2px",
              fontFamily: "var(--font-mono)", fontSize: "11px",
              letterSpacing: "0.14em", textTransform: "uppercase",
            }}
          >
            GitHub ↗
          </a>
        </div>
      )}
      </div>
    </header>
  );
}
