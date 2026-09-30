#!/usr/bin/env bash
# Собирает PDF резюме (RU и EN) из локально запущенного сайта.
# Сначала запусти: bundle exec jekyll serve
set -euo pipefail

BASE_URL="${BASE_URL:-http://localhost:4000/cova.github.io}"
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
OUT_DIR="$(cd "$(dirname "$0")/.." && pwd)/assets/docs"

for lang in ru en; do
  out="$OUT_DIR/Igor-Cova-$(echo "$lang" | tr a-z A-Z).pdf"
  "$CHROME" --headless=new --disable-gpu --no-pdf-header-footer \
    --virtual-time-budget=5000 --print-to-pdf="$out" "$BASE_URL/$lang" 2>/dev/null
  echo "✔ $out"
done
