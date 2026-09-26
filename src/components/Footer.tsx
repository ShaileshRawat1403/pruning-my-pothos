"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import NewsletterForm from "./NewsletterForm";
import { SECTIONS } from "../lib/config/sections";

const ELSEWHERE = [
  { label: "Email", href: "mailto:shailesh.rawat1403@gmail.com", external: false },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/shailesh-rawat", external: true },
  { label: "GitHub", href: "https://github.com/ShaileshRawat1403", external: true },
];

/**
 * One footer on every page: a site map read from lib/config/sections.ts (the
 * same source as the header and the section sub-navigation), the newsletter,
 * and where else to find the author. Every public page is linked from here.
 */
export default function Footer() {
  const pathname = usePathname();
  const year = new Date().getFullYear();

  // /editorial-preview is a composition sandbox, not a page anyone navigates from.
  if (pathname === "/editorial-preview" || pathname === "/editorial-preview/") {
    return null;
  }

  return (
    <footer className="w-full mt-auto border-t border-[color:var(--card-border)]">
      <div className="app-shell pt-14 pb-10 flex flex-col gap-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-[minmax(0,5fr)_minmax(0,1.6fr)] gap-x-8 gap-y-10">
          <nav aria-label="Site map" className="col-span-2 sm:col-span-3 lg:col-span-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-10">
          {SECTIONS.map((s) => (
            <div key={s.key} className="flex flex-col gap-2 min-w-0">
              <Link
                href={s.href}
                className="font-heading text-xs font-bold uppercase tracking-wider text-[color:var(--text-primary)] hover:underline underline-offset-4"
              >
                {s.label}
              </Link>
              <p className="text-xs leading-relaxed text-[color:var(--text-muted)]">{s.blurb}</p>
              <ul className="m-0 p-0 list-none flex flex-col gap-1.5 mt-1">
                {s.items.flatMap((i) => i.sub ?? [i]).map((i) => (
                  <li key={i.href + i.label}>
                    <Link href={i.href} className="link-slide text-sm text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)] transition-colors">
                      {i.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          </nav>

          <div className="col-span-2 sm:col-span-3 lg:col-span-1 flex flex-col gap-3">
            <h2 className="font-heading text-xs font-bold uppercase tracking-wider text-[color:var(--text-primary)]">Letters</h2>
            <p className="text-sm leading-relaxed text-[color:var(--text-secondary)]">
              What worked, what broke, and what I learned building with AI.
            </p>
            <NewsletterForm variant="footer" />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-8 border-t border-[color:var(--card-border)]">
          <div className="flex flex-col gap-1.5">
            <p className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.16em] text-[color:var(--text-muted)]">
              <span className="pulse-dot" aria-hidden />
              Set in Schibsted Grotesk &amp; IBM Plex Mono
            </p>
            <p className="text-xs text-[color:var(--text-muted)]">&copy; {year} Shailesh Rawat. Pruning My Pothos.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {ELSEWHERE.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target={l.external ? "_blank" : undefined}
                rel={l.external ? "noopener noreferrer" : undefined}
                className="px-3 py-1 rounded-full text-xs font-mono transition-colors border border-[color:var(--card-border)] bg-[color:var(--card-bg)] text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)]"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
