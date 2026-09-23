"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  // The four reader surfaces, plus About. Every destination is a real route on
  // every page: a primary nav item that only works on the homepage is not
  // navigation, it is a scroll link wearing navigation's clothes.
  const navLinks = [
    { href: "/systems/", label: "Systems" },
    { href: "/storyboards/", label: "Storyboard Explainers" },
    { href: "/current-work/", label: "Current Work" },
    { href: "/shelf/", label: "Shelf" },
    { href: "/about/", label: "About" },
  ];

  return (
    <header onKeyDown={(event) => {
      if (event.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        menuButton.current?.focus();
      }
    }} className="w-full bg-[color:var(--bg-color)]/95 backdrop-blur-md border-b border-[color:var(--card-border)] sticky top-0 z-50">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-12 h-20 flex items-center justify-between">
        {/* Brand Logo & Telemetry Indicator */}
        <div className="flex items-center">
          <Link
            href="/"
            className="flex items-center gap-3 text-decoration-none group focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--text-primary)] rounded-lg p-1"
          >
            <div className="w-8 h-8 rounded-full bg-[color:var(--text-primary)] text-white flex items-center justify-center transition-transform group-hover:scale-105">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
              </svg>
            </div>
            <span className="font-heading font-extrabold text-lg tracking-tight text-[color:var(--text-primary)]">
              Pruning My Pothos
            </span>
          </Link>
        </div>

        {/* Navigation Links (Desktop) */}
        <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-5 text-xs font-mono font-medium text-[color:var(--text-secondary)]">
          {navLinks.map(({ href, label }) => {
            const isCurrent = pathname.startsWith(href.replace(/\/$/, ""));

            return (
              <Link
                key={label}
                href={href}
                aria-current={isCurrent ? "page" : undefined}
                className={`transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--text-primary)] rounded px-1 ${
                  isCurrent
                    ? "text-[color:var(--text-primary)] font-semibold underline underline-offset-4 decoration-[color:var(--accent-green)]"
                    : "hover:text-[color:var(--text-primary)]"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Toggle. The header orients; it does not sell.
            The wrapper itself is hidden at lg so the nav stays flush right
            instead of floating against a zero-width flex child. */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            ref={menuButton}
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile navigation"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            className="p-3 rounded-lg border border-[color:var(--card-border)] bg-[color:var(--card-bg)] text-[color:var(--text-primary)] hover:bg-[color:var(--bg-surface)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--text-primary)]"
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
        <nav id="mobile-navigation" aria-label="Mobile navigation" className="lg:hidden w-full max-h-[calc(100dvh-5rem)] overflow-y-auto border-t border-[color:var(--card-border)] bg-[color:var(--bg-color)] px-6 py-4 flex flex-col gap-1 font-mono text-sm">
          {navLinks.map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-3 text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)] transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
