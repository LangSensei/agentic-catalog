# Changelog

## 1.3.0 (2026-05-11)

- Drop SWAT-era playwright state path. Storage state moved from `~/.swat/playwright/ctrip-storage-state.json` to `<workspace>/.playwright-state/ctrip/storage-state.json` (per-workspace isolation; workspace resolved by walking up from cwd to a `workspace.json` marker, fallback `${XDG_DATA_HOME:-~/.local/share}/playwright-state/ctrip/storage-state.json`). Existing users need to copy the file into each workspace they want to use the skill in (`mkdir -p "$WS/.playwright-state/ctrip" && cp ~/.swat/playwright/ctrip-storage-state.json "$WS/.playwright-state/ctrip/storage-state.json"`).

## 1.2.0 (2026-04-19)

- **feat:** detail page navigation — extract hotel ID from list page, visit detail page for rich data
- **feat:** booking promotions extraction from "订房优惠" popup (pipe-separated raw coupon text)
- **feat:** room type extraction — name, bed, area, price, originalPrice, discount, tags, soldOut
- **fix:** strip Private Use Area Unicode characters (U+E000–U+F8FF) from Ctrip icon fonts
- **fix:** footer boundary detection to prevent SEO text from being parsed as room data

## 1.1.0 (2026-04-18)

- **refactor:** switch from PC web (hotels.ctrip.com) to mobile web (m.ctrip.com) — more reliable rendering in headless
- **refactor:** remove calendar interaction, use URL date params (c-in/c-out) for date control
- **feat:** sold-out hotel detection — returns `sold_out` status with reference price from page suggestions
- **feat:** 凌晨 (00:00-05:00 CST) date handling — auto-adjusts check-in to previous day per Ctrip convention
- **fix:** hotel matching uses search suggestion click instead of ngram fuzzy scoring

## 1.0.0 (2026-04-18)

- Initial release
