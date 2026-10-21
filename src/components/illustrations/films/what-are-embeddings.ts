import type { FilmScript } from "./kit";

/**
 * Embeddings. Wide: puppy and small dog, next door. Close-up: the two
 * mailboxes, nearly the same address. Wide: invoice, at the end of the road.
 */
export const film: FilmScript = ({ wide, close, say, hide, fade }) => {
  // Shot 1, wide: the street.
  hide(".fx-label, .fx-aside", 0);
  fade(".fx-label", 0.8, 0.4);
  say(1.2, 0);

  // Shot 2, close-up: the addresses.
  close(2.2, 167, 452, 2.2);

  // Shot 3, wide: the house nobody visits.
  wide(3.8);
  fade(".fx-aside", 4.2, 0.4);
  say(5.0, 1);
};
