// Meta descriptions shorter than about 120 characters give search engines and
// AI answers too little to go on (Bing flags them), and longer than about 160
// get cut off. Short ones are filled out from the page's own opening text, so
// a description never says more than the page does.

const MIN = 120;
const MAX = 160;

/** Plain sentences from the start of a Markdown or MDX body. */
function openingSentences(body: string): string[] {
  const text = body
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<figure[\s\S]*?<\/figure>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/^\s*(#{1,6}|>|[-*+]|\d+\.)\s.*$/gm, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_`]+/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return text.match(/[^.!?]+[.!?]+(?=\s|$)/g)?.map((s) => s.trim()) ?? [];
}

function endSentence(s: string): string {
  const t = s.trim();
  return /[.!?…]$/.test(t) ? t : `${t}.`;
}

/** Joins sentences into one description of at most MAX characters. */
function fit(parts: string[]): string {
  let out = "";
  for (const part of parts) {
    const next = out ? `${out} ${part}` : part;
    if (next.length <= MAX) {
      out = next;
      continue;
    }
    if (out.length >= MIN) break;
    // Still short: take the words that fit and mark the cut.
    const room = MAX - 1 - (out ? out.length + 1 : 0);
    const words = part.slice(0, room).replace(/\s+\S*$/, "").replace(/[,;:]$/, "");
    out = (out ? `${out} ${words}` : words) + "…";
    break;
  }
  return out;
}

/** The description, filled out from the body when it is short. */
export function fillDescription(description: string, body: string): string {
  const base = endSentence(description);
  if (base.length >= MIN) return description;
  const lead = base.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  const more = openingSentences(body).filter((s) => {
    const norm = s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
    return norm.length > 0 && !lead.includes(norm) && !norm.includes(lead);
  });
  return more.length ? fit([base, ...more]) : description;
}

/** A description for a list page: what it is, then what is on it. */
export function listDescription(lead: string, titles: string[], label = "Includes"): string {
  const base = endSentence(lead);
  if (!titles.length) return base;
  const picked: string[] = [];
  for (const t of titles.map((x) => x.replace(/[.!?]+$/, ""))) {
    const candidate = `${base} ${label} ${[...picked, t].join(", ")}.`;
    if (candidate.length > MAX) break;
    picked.push(t);
  }
  return picked.length ? `${base} ${label} ${picked.join(", ")}.` : base;
}
