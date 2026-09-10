"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  // Navigation target routing: Breakdowns to /systems, Tools & SDKs to /tools, About to /about; Projects and Methodology route to homepage sections
  const isHome = pathname === "/" || pathname === "/editorial-preview";

  const navLinks = [
    { href: isHome ? "#breakdowns" : "/systems", label: "Breakdowns" },
    { href: isHome ? "#projects" : "/#projects", label: "Projects" },
    { href: isHome ? "#tools" : "/tools", label: "Tools & SDKs" },
    { href: isHome ? "#methodology" : "/#methodology", label: "Methodology" },
    { href: "/about", label: "About" },
  ];

  return (
    <header
      onKeyDown={(event) => {
        if (event.key === "Escape" && isMobileMenuOpen) {
          setIsMobileMenuOpen(false);
          menuButton.current?.focus();
        }
      }}
      className="w-full backdrop-blur-md sticky top-0 z-50 transition-colors"
      style={{
        background: "var(--header-bg-scrolled)",
        borderBottom: "1px solid var(--header-border-scrolled)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 h-20 flex items-center justify-between">
        {/* Brand Logo & Telemetry Indicator */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-3 text-decoration-none group focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-green)] rounded-lg p-1"
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center transition-transform group-hover:scale-105 shadow-2xs"
              style={{
                background: "var(--text-primary)",
                color: "var(--bg-color)",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
              </svg>
            </div>
            <span
              className="font-heading font-extrabold text-lg tracking-tight transition-colors"
              style={{ color: "var(--text-primary)" }}
            >
              Pruning My Pothos
            </span>
          </Link>
          <span
            className="hidden 2xl:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider border transition-colors"
            style={{
              background: "var(--card-bg)",
              color: "var(--text-muted)",
              borderColor: "var(--card-border)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] animate-pulse" />
            <span>Field notes</span>
          </span>
        </div>

        {/* Navigation Links (Desktop) */}
        <nav aria-label="Main Navigation" className="hidden xl:flex items-center gap-5 text-xs font-mono font-medium">
          {navLinks.map(({ href, label }) => {
            const isCurrent =
              (label === "Breakdowns" && pathname.startsWith("/systems")) ||
              (label === "Tools & SDKs" && pathname.startsWith("/tools")) ||
              (label === "About" && pathname.startsWith("/about"));

            return (
              <Link
                key={label}
                href={href}
                aria-current={isCurrent ? "page" : undefined}
                className={`transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-green)] rounded px-1 ${
                  isCurrent
                    ? "font-semibold underline underline-offset-4 decoration-[#16A34A]"
                    : "hover:opacity-80"
                }`}
                style={{
                  color: isCurrent ? "var(--text-primary)" : "var(--text-secondary)",
                }}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Actions (Theme Toggle, Subscribe CTA Button & Mobile Menu Toggle) */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          <Link
            href={isHome ? "#newsletter" : "/#newsletter"}
            className="hidden sm:inline-flex px-5 py-2 rounded-full text-xs font-mono font-semibold tracking-wide transition-all shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-green)]"
            style={{
              background: "var(--text-primary)",
              color: "var(--bg-color)",
            }}
          >
            SUBSCRIBE
          </Link>

          {/* Mobile Menu Hamburger */}
          <button
            ref={menuButton}
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile navigation"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            className="xl:hidden p-2.5 rounded-lg border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-green)]"
            style={{
              borderColor: "var(--card-border)",
              background: "var(--card-bg)",
              color: "var(--text-primary)",
            }}
          >
            {isMobileMenuOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Drawer */}
      {isMobileMenuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="xl:hidden w-full max-h-[calc(100dvh-5rem)] overflow-y-auto px-6 py-4 flex flex-col gap-1 font-mono text-sm border-t transition-colors"
          style={{
            background: "var(--header-bg-scrolled)",
            borderColor: "var(--header-border-scrolled)",
          }}
        >
          {navLinks.map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-3 transition-colors hover:opacity-80"
              style={{ color: "var(--text-secondary)" }}
            >
              {label}
            </Link>
          ))}
          <Link
            href={isHome ? "#newsletter" : "/#newsletter"}
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-2 text-center py-2.5 rounded-full font-semibold transition-colors"
            style={{
              background: "var(--text-primary)",
              color: "var(--bg-color)",
            }}
          >
            SUBSCRIBE
          </Link>
        </nav>
      )}
    </header>
  );
}
