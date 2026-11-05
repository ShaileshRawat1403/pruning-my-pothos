#!/bin/sh
# Small WebP thumbnails for the storyboard wall (/storyboards/), made from the
# exported article covers and storyboard share cards. Run after
# `npm run export:storyboards` changes a cover:  sh scripts/make-wall-thumbs.sh
set -e
out=public/wall
mkdir -p "$out/systems" "$out/storyboards"
for f in public/covers/systems/*.png; do
  magick "$f" -resize 480x -quality 72 "$out/systems/$(basename "$f" .png).webp"
done
for f in public/storyboards/og/*.png; do
  magick "$f" -resize 480x -quality 72 "$out/storyboards/$(basename "$f" .png).webp"
done
