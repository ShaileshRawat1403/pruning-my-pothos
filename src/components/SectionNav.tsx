"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locate, under } from "../lib/config/sections";

/**
 * The second row of navigation, for sections that hold several pages (Stack
 * and Self). It appears on every page of the section and names where you are
 * within it. Read from lib/config/sections.ts, like the header and footer.
 */
export default function SectionNav() {
  const pathname = usePathname() ?? "/";
  const here = locate(pathname);
  if (!here || here.section.items.length < 3) return null;
  const { section, item } = here;

  const link = (href: string, label: string, active: boolean) => (
    <Link
      key={href + label}
      href={href}
      aria-current={active ? "page" : undefined}
      className={`shrink-0 py-3 transition-colors ${
        active
          ? "text-[color:var(--text-primary)] font-semibold underline underline-offset-[6px] decoration-[color:var(--accent-green)]"
          : "text-[color:var(--text-muted)] hover:text-[color:var(--text-primary)]"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <nav aria-label={`${section.label} pages`} className="w-full border-b border-[color:var(--card-border)] bg-[color:var(--bg-color)]">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-12 flex items-center gap-5 overflow-x-auto font-mono text-xs">
        <span className="shrink-0 py-3 uppercase tracking-[0.18em] text-[10px] font-bold text-[color:var(--text-muted)]">
          {section.label} /
        </span>
        {section.items.map((i) => link(i.href, i.label, i === item))}
      </div>
      {item?.sub && (
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-12 flex items-center gap-4 overflow-x-auto font-mono text-[11px] border-t border-dashed border-[color:var(--card-border)]">
          {item.sub.map((s) => link(s.href, s.label, under(pathname, s.href)))}
        </div>
      )}
    </nav>
  );
}
