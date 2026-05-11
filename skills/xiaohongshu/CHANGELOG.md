# Changelog

## 1.3.0 (2026-05-11)

- Drop SWAT-era playwright state path. Storage state moved from `~/.swat/playwright/storage-state.json` to `~/.playwright-state/xiaohongshu-storage-state.json` (machine-level, cross-workspace shared; renamed for clarity to disambiguate from other playwright-using skills). Existing users need to move and rename the file (`mkdir -p ~/.playwright-state && mv ~/.swat/playwright/storage-state.json ~/.playwright-state/xiaohongshu-storage-state.json`).

## 1.2.1 (2026-04-12)
- Fix Windows compatibility: `process.env.HOME` → `os.homedir()`, `/tmp/` → `os.tmpdir()`, `process.getuid()` → `os.userInfo().username`

## 1.2.0 (2026-03-16)
- search.js: keyword search with anti-captcha route interception, stealth patches, API response capture
- detail.js: note detail extraction (API capture + DOM fallback)
- SKILL.md: document CLI scripts usage, anti-detection features

## 1.1.1 (2026-03-16)
- auth.js: screenshot dir now uses UID suffix (`xhs-auth-<uid>`) to avoid permission conflicts in multi-user environments

## 1.1.0 (2026-03-16)
- auth.js: support optional SMS verification after QR scan
- SMS popup detected via `input.r-input-inner` (no phase state machine needed)
- Code delivered via signal file (`/tmp/xhs-sms-code.txt`), auto-submits
- SETUP.md updated with full login flow documentation

## 1.0.0 (2026-03-16)
- Initial release: QR code login, storage-state persistence, --check/--login modes
