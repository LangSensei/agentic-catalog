# Changelog

## 1.3.0 (2026-05-11)

- Drop SWAT-era playwright state path. Storage state moved from `~/.swat/playwright/storage-state.json` to `<workspace>/.playwright/storage-state.json` (per-workspace isolation; workspace resolved by walking up from cwd to a `workspace.json` marker, fallback `./.playwright/storage-state.json`). The state file is now shared with other playwright-using skills and the playwright MCP in the same workspace, so a single login serves every component (playwright dedups cookies by name+domain+path on save). All scripts still accept `--storage-state <path>` to override per-invocation. Auth flow now loads existing state before login so other sites' cookies are preserved; to switch xiaohongshu accounts, delete the state file first. Existing users need to copy the file into each workspace they want to use the skill in (`mkdir -p "$WS/.playwright" && cp ~/.swat/playwright/storage-state.json "$WS/.playwright/storage-state.json"`).

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
