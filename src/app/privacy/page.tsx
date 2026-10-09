import Link from "next/link";
import { constructMetadata } from "../../lib/seo/metadata";
import CookieSettingsLink from "../../components/CookieSettingsLink";

export const metadata = constructMetadata({
  title: "Privacy",
  description: "What Pruning My Pothos measures, with which tools, and how to say no.",
  path: "/privacy",
});

const UPDATED = "9 October 2026";

/**
 * The privacy page. Plain statements of what the site does; keep it in step
 * with src/components/Analytics.tsx and the newsletter form.
 */
export default function PrivacyPage() {
  return (
    <article className="mx-auto flex max-w-[720px] flex-col gap-6 py-12 content-body">
      <header className="flex flex-col gap-2">
        <h1 className="font-heading text-3xl font-extrabold text-[color:var(--text-primary)]">Privacy</h1>
        <p className="m-0 font-mono text-xs text-[color:var(--text-muted)]">Updated {UPDATED}</p>
      </header>

      <p>
        This is a publication. It does not run ads, sell data, or need an account. It measures how it is read, so that the next
        article can be better than the last one.
      </p>

      <h2>What is measured, and with what</h2>
      <ul>
        <li>
          <strong>Google Analytics 4</strong> counts page views and records things like the page, the referring site, the device
          type and an approximate location derived from the connection.
        </li>
        <li>
          <strong>Microsoft Clarity</strong> records clicks, scrolling and anonymised session replays to produce heatmaps. Clarity
          masks text you type and other sensitive content by default.
        </li>
      </ul>
      <p>
        Both tools can set cookies. If you are in the European Economic Area, the United Kingdom or Switzerland, they do not set
        analytics cookies unless you choose <em>Fine</em> on the banner; until then they run without cookies. Elsewhere they are on
        by default, and choosing <em>No thanks</em> turns their cookies off. Advertising storage is always off.
      </p>
      <p>
        You can change your answer at any time: <CookieSettingsLink className="underline underline-offset-4 cursor-pointer" />.
      </p>

      <h2>The newsletter</h2>
      <p>
        If you subscribe, your email address is sent to Kit, the service that sends the letters. You can unsubscribe from any
        letter.
      </p>

      <h2>Questions</h2>
      <p>
        Write to <a href="mailto:shailesh.rawat1403@gmail.com">shailesh.rawat1403@gmail.com</a>. More about who runs this site is on
        the <Link href="/about/">About</Link> page.
      </p>
    </article>
  );
}
