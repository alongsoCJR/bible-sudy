#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT"

mdbook clean
mdbook build

mkdir -p book/static/js
cp -f src/static/bible_contest.html src/static/bible_score.html \
      src/static/cd-activity.html src/static/cd-contest.html \
      book/static/ 2>/dev/null || true
cp -f src/static/js/cd-music.js book/static/js/ 2>/dev/null || true

echo "access at http://localhost:3000/"
mdbook serve
