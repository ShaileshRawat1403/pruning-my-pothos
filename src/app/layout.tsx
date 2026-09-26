import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SectionNav from "../components/SectionNav";
import BackgroundGrid from "../components/BackgroundGrid";
import ScrollAnimations from "../components/ScrollAnimations";
import ConsoleToastHost from "../components/ConsoleToastHost";
export const metadata: Metadata = {
  title: "Pruning My Pothos | AI Systems, Learned in Public",
  description: "A living notebook on AI orchestration, runtime evaluation, context compaction, and systems design: written against things that were built, run, inspected, or broken.",
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  alternates: {
    types: {
      "application/rss+xml": "https://pruningmypothos.com/rss.xml",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light" className="h-full" suppressHydrationWarning>
      <head>
        {/* Apply the saved or system theme before first paint, so a dark-mode
            reader never sees a flash of the light page. ThemeToggle keeps it
            in sync after hydration. Light stays the no-script default. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var t=localStorage.getItem('systems-theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.setAttribute('data-theme',t)}catch(e){}",
          }}
        />
      </head>
      <body
        className="min-h-full flex flex-col relative overflow-x-hidden"
        style={{ background: "var(--bg-color)", color: "var(--text-primary)" }}
      >
        <a href="#main-content" className="skip-link">Skip to content</a>
        <ScrollAnimations />
        {/* ScrollProgress is intentionally not mounted globally: a saturated
            gradient bar across the top of every route is product chrome, and
            reading progress means little on an index or a tool page. The
            component is kept for a future article-scoped use. */}
        <BackgroundGrid />
        <Header />
        <SectionNav />
        <main id="main-content" tabIndex={-1} className="relative z-10 w-full flex-grow">
          <div className="app-shell">
            {children}
          </div>
        </main>
        <Footer />
        <ConsoleToastHost />
      </body>
    </html>
  );
}
