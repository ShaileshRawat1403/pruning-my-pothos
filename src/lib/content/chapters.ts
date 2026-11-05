/**
 * Chapters: the flagship articles whose scenes are told full screen
 * (components/visuals/ChapterScene.tsx). Every other article keeps the
 * ordinary pinned scene. Add a slug here to turn an article into chapters.
 */
export const CHAPTER_ARTICLES = new Set<string>([
  "agent-instructions-and-handoff-as-an-operating-system",
]);

/** Where the camera looks for a step, in scene units (640 x 420); s is zoom. */
export interface Frame { x: number; y: number; s: number }

/**
 * Hand-set framings, by scene id, one per step. A scene without an entry,
 * or a step past the end of its list, gets a gentle default.
 */
export const CHAPTER_FRAMES: Record<string, Frame[]> = {};
