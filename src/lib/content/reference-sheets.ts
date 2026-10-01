/**
 * Works On My Prompt: the builder section on the Shelf (/shelf/reference/).
 * Sheets for people AI promoted to builder without asking. Every sheet is
 * written and drawn here, under the editorial contract, and has its own page
 * at /shelf/reference/<slug>/. The plan, the voice and the order of work are
 * in docs/BUILDER_TRACK.md; read it before adding or changing anything here.
 *
 * With an empty list, /shelf/reference/ is a noindexed placeholder and stays
 * out of the sitemap. A sheet's step drawing is registered in
 * illustrations/scenes/index.tsx under its `scene` id.
 */

/** The section's name, everywhere it appears. Change copy here, not in pages. */
export const BUILDER_SECTION = {
  name: "Works On My Prompt",
  tagline: "For everyone AI promoted to builder without asking. (Including me.)",
  intro:
    "You can build software now. Nobody checked whether you wanted to. These are the sheets for the part after the demo works: what to set up, what to check, and where it quietly breaks. Each one links back to the Systems article that explains why.",
};

/**
 * Keys stay plain so data never has to change; labels carry the voice.
 * `manual` is the step-by-step one: do this, check that, here is what
 * failure looks like.
 */
export type ReferenceSheetType = "manual" | "mindmap" | "architecture" | "cheatsheet" | "slides";

export const REFERENCE_TYPE_LABEL: Record<ReferenceSheetType, string> = {
  manual: "Post-Mortem, Pre-Written",
  mindmap: "Conspiracy Board",
  architecture: "Blast Radius Map",
  cheatsheet: "Things You'll Google Anyway",
  slides: "The Long Way Round",
};

/** What each type is, in one line, for cards and the empty state. */
export const REFERENCE_TYPE_NOTE: Record<ReferenceSheetType, string> = {
  manual: "Every step you will be told you should have done, in order, while it still helps.",
  mindmap: "One topic, every thread pinned, the string in order.",
  architecture: "Every part, every connection, and how far one mistake travels.",
  cheatsheet: "The one page you keep open in the other tab.",
  slides: "A system, step by step, ending where it breaks.",
};

/** One step of a sheet: the thing to do, how you know it worked, how it fails. */
export interface SheetStep {
  id: string;
  /** The instruction, as a sentence you can act on. */
  do: string;
  /** How you can tell it worked, without trusting anyone's word for it. */
  check: string;
  /** What it looks like when this step was skipped or done badly. */
  fails: string;
}

/**
 * A tool, described from its own documentation: what it is for, what it does
 * not do, a link to the docs, and the date that was true. No rankings, no
 * prices, no "best".
 */
export interface ToolNote {
  name: string;
  forWhat: string;
  notFor: string;
  docs: string;
  /** YYYY-MM-DD: when the docs said so. */
  asOf: string;
}

export interface ReferenceSheet {
  slug: string;
  /** The joke. */
  title: string;
  /** A short label on the cover, under the person who read it. Its own joke. */
  quip?: string;
  type: ReferenceSheetType;
  /** The plain promise, finishing "After this, you can ...". */
  promise: string;
  /** Two or three sentences: the situation this sheet is for. */
  summary: string;
  /** The Systems article that explains why. Its stage is shown with it. */
  article: string;
  steps?: SheetStep[];
  tools?: ToolNote[];
  /** Where the sheet stops: what doing all of this still does not give you. */
  stops: string;
  /** Every outside claim's source. */
  sources: { label: string; url: string }[];
  /** A scroll scene drawn for the steps (illustrations/scenes), if any. */
  scene?: string;
  publishDate: string;
  updatedAt?: string;
}

export const REFERENCE_SHEETS: ReferenceSheet[] = [
  {
    slug: "write-it-down-or-watch-it-guess",
    title: "Write It Down or Watch It Guess",
    quip: "Read it. Guessed anyway.",
    type: "manual",
    promise: "write the one file a coding agent reads before it touches your project, and know what that file cannot do.",
    summary:
      "A coding agent starts every session from nothing. It does not remember yesterday, your rules, or the folder you told it never to touch. Many coding agents read one plain file at the start: AGENTS.md, or CLAUDE.md for Claude Code. Write it once and you stop repeating yourself. Write it badly and it follows the bad version, carefully.",
    article: "agent-instructions-and-handoff-as-an-operating-system",
    steps: [
      {
        id: "what",
        do: "Say what the project is in three lines: what it does, who it is for, what it is built with.",
        check: "Paste only those lines into a fresh chat and ask for the project back in one sentence. It should match yours.",
        fails: "It describes a different, more exciting project. Confidently.",
      },
      {
        id: "never",
        do: "List what it must never do, each one specific: a command, a folder, a file.",
        check: "Every line names something you could point at. \"Be careful\" names nothing.",
        fails: "A rule nobody can check. It gets read, agreed with, and stepped over.",
      },
      {
        id: "done",
        do: "Write how it proves it is done: the exact commands that have to pass.",
        check: "Run them yourself, now. They pass.",
        fails: "\"Done!\" with nothing run. You find out from a user.",
      },
      {
        id: "where",
        do: "Say where things live: one line for each folder that matters.",
        check: "Ask where it would put a new page. It names the right folder.",
        fails: "A second copy of a file you already had, in a folder you did not.",
      },
      {
        id: "date",
        do: "Date it, and change it the day a decision changes.",
        check: "The date is recent, and the last thing you decided is in it.",
        fails: "It follows a rule you dropped a month ago. Exactly as written.",
      },
    ],
    tools: [
      {
        name: "AGENTS.md",
        forWhat: "An open format: one plain file at the root of a repository, described as a README for agents. Its site lists more than twenty tools that read it.",
        notFor: "Enforcing anything. It is a file the agent reads, nothing more.",
        docs: "https://agents.md",
        asOf: "2026-10-01",
      },
      {
        name: "Claude Code (CLAUDE.md)",
        forWhat: "Read at the start of every session; it can read AGENTS.md instead when there is no CLAUDE.md.",
        notFor: "Blocking an action. Its docs call these files context, not enforced configuration, and point to hooks for that.",
        docs: "https://code.claude.com/docs/en/memory",
        asOf: "2026-10-01",
      },
      {
        name: "Cursor",
        forWhat: "Reads an AGENTS.md in the project root, or project rules in .cursor/rules as .mdc files.",
        notFor: "Reading a plain .md file inside .cursor/rules. Its docs say that file is ignored.",
        docs: "https://cursor.com/docs/context/rules",
        asOf: "2026-10-01",
      },
    ],
    stops:
      "A file is read, not obeyed. Claude Code's own documentation calls these files context, not enforced configuration. Anything that must never happen needs a check that runs outside the agent: a permission it does not have, a branch it cannot push to, a test that fails.",
    sources: [
      { label: "AGENTS.md, the open format (agents.md)", url: "https://agents.md" },
      { label: "Claude Code docs: How Claude remembers your project", url: "https://code.claude.com/docs/en/memory" },
      { label: "Cursor docs: Rules", url: "https://cursor.com/docs/context/rules" },
      {
        label: "A working specimen: this site's own AGENTS.md, as of 2026-10-01",
        url: "https://github.com/ShaileshRawat1403/pruning-my-pothos/blob/fc902abab5cd08ad5a863c929d2ea3a4f8bd5c2b/AGENTS.md",
      },
    ],
    scene: "write-it-down-or-watch-it-guess",
    publishDate: "2026-10-01",
  },
];

export function getReferenceSheets(): ReferenceSheet[] {
  return [...REFERENCE_SHEETS].sort((a, b) => b.publishDate.localeCompare(a.publishDate));
}
