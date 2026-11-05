/**
 * Chapters (components/visuals/ChapterScene.tsx) tell a scene full screen.
 * The flagship articles, the eight Systems Map stages, use them; the article
 * page decides from the article's place in the map (systems-ia.ts), so a new
 * flagship gets chapters without a list to keep. Companions and notes keep
 * the ordinary pinned scene.
 */

/** Where the camera looks for a step, in scene units (640 x 420); s is zoom. */
export interface Frame { x: number; y: number; s: number }

/**
 * Hand-set framings, by scene id, one per step. A scene without an entry,
 * or a step past the end of its list, gets a gentle default.
 */
export const CHAPTER_FRAMES: Record<string, Frame[]> = {};
