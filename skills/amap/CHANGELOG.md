# Changelog

## 1.1.1 (2026-05-13)

- Drop "Captain agents" SWAT-era phrasing in SKILL.md intro — scripts now output structured JSON for parsing by agents (no role qualifier). Closes #5.

## 1.1.0 (2026-05-11)

- Drop SWAT-era cred path. Credentials now load from `~/.amap/.env` (per-app dot-dir under `$HOME`, matching the convention used by `aws`, `kubectl`, `docker`, `npm`). Existing users with `~/.swat/.env` need to copy the relevant key (`mkdir -p ~/.amap && grep AMAP_WEBSERVICE_KEY ~/.swat/.env >> ~/.amap/.env`).

## 1.0.1 (2026-04-12)

- Fix Windows compatibility: `process.env.HOME` → `os.homedir()` in `scripts/lib/env.js`

## 1.0.0 (2026-03-25)

- Initial release
- Add shared env loader (`scripts/lib/env.js`) for API key resolution from env var or `~/.swat/.env`
- Add POI search script (`scripts/poi-search.js`) — keyword search with city filter and radius search
- Add route planning script (`scripts/route-planning.js`) — walking, driving, riding, and transit with waypoints support
- Add geocoding script (`scripts/geocode.js`) — forward and reverse geocoding
- Add weather script (`scripts/weather.js`) — live weather and 3-day forecast by city
- Add setup guide (`references/SETUP.md`) — Amap Web Service Key acquisition
- Zero dependencies — uses Node.js native `fetch` (Node 18+)
