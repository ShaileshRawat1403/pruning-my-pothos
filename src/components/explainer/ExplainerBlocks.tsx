import React from "react";

/**
 * Slot 04. The retrieval unit.
 * Two to four sentences that survive being lifted out of the page, because
 * that is exactly what an answer engine does with them.
 */
export function AnswerBlock({ children }: { children: React.ReactNode }) {
  return (
    <aside className="explainer-answer">
      <span className="explainer-kicker">The short answer</span>
      <p>{children}</p>
    </aside>
  );
}

/**
 * Slot 05. The analogy, and the seam.
 * `breaksWhen` is not decoration. An analogy without its failure point is a
 * claim nobody has checked, and a reader who finds the seam later stops
 * trusting everything around it.
 */
export function AnalogyBlock({
  mapping,
  breaksWhen,
}: {
  mapping: string;
  breaksWhen: string;
}) {
  return (
    <aside className="explainer-analogy">
      <span className="explainer-kicker">Think of it like this</span>
      <p className="explainer-analogy-mapping">{mapping}</p>
      <div className="explainer-analogy-break">
        <span className="explainer-kicker explainer-kicker-break">Where the analogy breaks</span>
        <p>{breaksWhen}</p>
      </div>
    </aside>
  );
}

/**
 * Slot 10. Evidence.
 * What was done, where, and what changed because of it. Three fields, because
 * "I read about this" is not any of them.
 */
export function EvidenceBlock({
  what,
  where,
  changed,
  tags = [],
}: {
  what: string;
  where: string;
  changed: string;
  tags?: string[];
}) {
  return (
    <aside className="explainer-evidence">
      <span className="explainer-kicker explainer-kicker-evidence">Where this was tested</span>
      <dl className="explainer-evidence-list">
        <dt>Built or run</dt>
        <dd>{what}</dd>
        <dt>Where</dt>
        <dd>{where}</dd>
        <dt>What changed</dt>
        <dd>{changed}</dd>
      </dl>
      {tags.length > 0 && (
        <ul className="explainer-evidence-tags">
          {tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      )}
    </aside>
  );
}

export interface RelatedItem {
  type: "explainer" | "playbook" | "teardown" | "tool";
  title: string;
  href: string;
  note?: string;
}

/**
 * Slot 12. The internal link model, made visible.
 * Three, one per type, so concept and evidence stay wired together without
 * anyone maintaining a map by hand.
 */
export function RelatedThree({ items }: { items: RelatedItem[] }) {
  if (!items || items.length === 0) return null;
  return (
    <nav className="explainer-related" aria-label="Related reading">
      <span className="explainer-kicker">Follow this through</span>
      <ul>
        {items.slice(0, 3).map((item) => (
          <li key={item.href}>
            <span className="explainer-related-type">{item.type}</span>
            <a href={item.href}>{item.title}</a>
            {item.note && <span className="explainer-related-note">{item.note}</span>}
          </li>
        ))}
      </ul>
    </nav>
  );
}
