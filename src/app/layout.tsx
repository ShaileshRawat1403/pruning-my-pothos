import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BackgroundGrid from "../components/BackgroundGrid";
import ScrollAnimations from "../components/ScrollAnimations";
import ScrollProgress from "../components/ScrollProgress";
import ConsoleToastHost from "../components/ConsoleToastHost";
export const metadata: Metadata = {
  title: "Sans Serif Systems | Open Tools for Natural Language Programming",
  description: "Sans Serif Systems is a solo-builder systems laboratory and utility bench for making AI-assisted work predictable, verifiable, and secure. Built for anyone who builds by intent, not only by code. Natural language is the new API.",
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
    <html lang="en" data-theme="light" className="h-full">
      <body
        className="min-h-full flex flex-col relative overflow-x-hidden"
        style={{ background: "var(--bg-color)", color: "var(--text-primary)" }}
      >
        <ScrollAnimations />
        <ScrollProgress />
        <BackgroundGrid />
        <div className="masthead-scrim" aria-hidden />
        <Header />
        <main className="relative z-10 w-full flex-grow">
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
