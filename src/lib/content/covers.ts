import { getSystemsMap } from "./systems-map";

/** The small line above a cover's title: the article's Systems Map stage, if any. */
export function coverKicker(slug: string): string {
  const map = getSystemsMap();
  const i = map.findIndex((m) => m.slug === slug);
  return i >= 0 ? `SYSTEMS · STAGE ${String(i + 1).padStart(2, "0")}` : "SYSTEMS";
}
