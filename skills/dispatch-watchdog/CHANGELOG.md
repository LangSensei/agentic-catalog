# Changelog

## 0.1.0 (2026-05-22)

Initial release.

- Spawns a properly-detached cross-platform watchdog (PowerShell + bash variants) over a running emploke task and reliably surfaces runtime completion notifications.
- Uses `EMPLOKE_WORKSPACE_DIR` for path joins (the workspace root path); `EMPLOKE_WORKSPACE` is the scope id and is never used as a path component.
