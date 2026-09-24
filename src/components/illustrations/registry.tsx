import { DECKS } from "./decks";
import type { FrameProps } from "./templates";

const FRAMES = new Map(DECKS.flatMap((d) => d.frames.map((f) => [f.key, f.Render] as const)));

if (FRAMES.size !== DECKS.reduce((n, d) => n + d.frames.length, 0)) {
  throw new Error("Storyboard frame keys must be unique across all decks. Prefix each key with its deck's short name.");
}

/**
 * Render one storyboard frame by key, failing the build loudly if it is not
 * drawn. Frames are pure drawings with no hooks or state, so each is called as
 * a plain function rather than chosen as a component during render.
 */
export function Frame({ frameKey, label, number, total }: { frameKey: string } & FrameProps) {
  const draw = FRAMES.get(frameKey);
  if (!draw) {
    throw new Error(`Storyboard frame "${frameKey}" is declared but has no drawing.`);
  }
  return draw({ label, number, total });
}
