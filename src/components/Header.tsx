"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // If on homepage, anchor links scroll smoothly in-page; on inner pages, they link back to homepage sections or respective indices
  const isHome = pathname === "/" || pathname === "/editorial-preview";

  const navLinks = [
    { href: isHome ? "#breakdowns" : "/systems", label: "Breakdowns" },
    { href: isHome ? "#projects" : "/tools",     label: "Projects" },
    { href: isHome ? "#tools" : "/shelf",         label: "Tools & SDKs" },
    { href: isHome ? "#methodology" : "/#methodology", label: "Methodology" },
    { href: isHome ? "#about" : "/about",         label: "About" },
  ];

  return (
    <header className="w-full bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#EAE8E2] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 h-20 flex items-center justify-between">
        {/* Brand Logo & Telemetry Indicator */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-3 text-decoration-none group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#121212] rounded-lg p-1"
          >
            <div className="w-8 h-8 rounded-full bg-[#121212] text-white flex items-center justify-center transition-transform group-hover:scale-105 shadow-2xs">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
              </svg>
            </div>
            <span className="font-heading font-extrabold text-lg tracking-tight text-[#121212]">
              Pruning My Pothos
            </span>
          </Link>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-[#F4F2EC] text-[#6B6964] border border-[#E5E2DA]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] animate-pulse" />
            <span>SYS.ONLINE · v2.4</span>
          </span>
        </div>

        {/* Navigation Links (Desktop) */}
        <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-7 text-xs font-mono font-medium text-[#55534E]">
          {navLinks.map(({ href, label }) => {
            const isCurrent =
              (label === "Breakdowns" && pathname.startsWith("/systems")) ||
              (label === "Projects" && pathname.startsWith("/tools")) ||
              (label === "Tools & SDKs" && pathname.startsWith("/shelf")) ||
              (label === "Methodology" && pathname.startsWith("/self")) ||
              (label === "About" && pathname.startsWith("/about"));

            return (
              <Link
                key={label}
                href={href}
                className={`transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#121212] rounded px-1 ${
                  isCurrent
                    ? "text-[#121212] font-semibold underline underline-offset-4 decoration-[#16A34A]"
                    : "hover:text-[#121212]"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Subscribe CTA Button & Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          <Link
            href={isHome ? "#newsletter" : "/#newsletter"}
            className="hidden sm:inline-flex px-5 py-2 rounded-full bg-[#121212] hover:bg-[#2A2926] text-white text-xs font-mono font-semibold tracking-wide transition-all shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#121212]"
          >
            SUBSCRIBE
          </Link>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile navigation"
            aria-expanded={isMobileMenuOpen}
            className="md:hidden p-2 rounded-lg border border-[#EAE8E2] bg-white text-[#121212] hover:bg-[#F4F2EC] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#121212]"
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
        <div className="md:hidden w-full border-t border-[#EAE8E2] bg-[#FAF9F6] px-6 py-4 flex flex-col gap-3 font-mono text-xs animate-fadeIn">
          {navLinks.map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-1 text-[#55534E] hover:text-[#121212] transition-colors"
            >
              {label}
            </Link>
          ))}
          <Link
            href={isHome ? "#newsletter" : "/#newsletter"}
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-2 text-center py-2.5 rounded-full bg-[#121212] text-white font-semibold"
          >
            SUBSCRIBE
          </Link>
        </div>
      )}
    </header>
  );
}
