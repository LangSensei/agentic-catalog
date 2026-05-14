# Changelog

## 1.3.0 (2026-05-14)

### Fixed
- **Workspace path resolution** — drop the buggy `EMPLOKE_WORKSPACE` (workspace UUID treated as a filesystem path) and `workspace.json` walk-up branches from `scripts/lib/__init__.py`. The `_project_root()` resolver now reads `EMPLOKE_WORKSPACE_DIR` (emploke's task/session runtime contract, always set per-run) and falls back to `cwd` for manual debugging. Repository cache resolution at `$EMPLOKE_WORKSPACE_DIR/.repos/china-testing-bazi/` is now reliable in every emploke-spawned task. Closes emploke-marketplace#14 (bug A).

### Changed
- `SKILL.md` — rewrite the `<repos-dir>` resolution note to describe the new contract.
- `_repos_dir()` — collapse the dead `if root:` branch (the new resolver never returns `None`).

## 1.2.0 (2026-05-11)

- Drop SWAT-era cache path. The bazi reference repo is now provisioned under `<repos-dir>/china-testing-bazi/` where `<repos-dir>` is `<workspace>/.repos/` when a `workspace.json` marker is found by walking up from cwd, or `./.repos/` (cwd-relative) otherwise. `WORKSPACE_DIR` / `EMPLOKE_WORKSPACE` env vars override the marker walk-up. Existing users can keep the old clone (it is harmless) or delete it and let auto-provisioning re-clone (`rm -rf ~/.swat/repos/china-testing-bazi`).

## 1.1.0 (2026-04-13)

- **Add references/SETUP.md:** Standardized prerequisite guide with Check + Steps format for Python 3.8+, pip packages (lunar-python, colorama, bidict), and git. Follows the xiaohongshu SETUP.md convention.
- **Update `prereq` in SKILL.md frontmatter:** Changed from inline pip command to `references/SETUP.md` for prerequisite management.
- **Simplify Setup section in SKILL.md:** Now references SETUP.md for prerequisites instead of inline instructions.

## 1.0.0 (2026-03-31)

### Improvements (pre-release revision)

- **Automatic repo setup:** The bazi calculation engine (`china-testing/bazi`) is now automatically cloned and set up on first script execution. No manual setup steps needed — `lib/__init__.py` handles bare clone to `~/.swat/repos/china-testing-bazi/` and detached worktree creation pinned to commit `c425f0c`.
- **Automatic dependency check:** `lib/__init__.py` verifies that `lunar-python`, `colorama`, and `bidict` are importable at startup and prints a clear `pip3 install` command if any are missing.
- **Removed SETUP.md:** Manual setup guide removed — replaced by fully automatic provisioning.
- **Removed git-pr dependency:** No longer requires git-pr skill for setup since provisioning is self-contained.
- **Shared repo via git-pr:** Use git-pr skill Mode C (read-only worktree) for the china-testing/bazi dependency instead of cloning into the skill directory. Shared location: `~/.swat/repos/china-testing-bazi/worktrees/readonly/`, pinned to commit `c425f0c`.
- **Unknown birth hour handling:** When `--hour` is omitted, the hour pillar is marked as "unknown" instead of silently defaulting to noon. Output includes `hour_known: false` flag. Compatibility analysis skips hour-dependent comparisons when either person's hour is unknown.
- **Transparent compatibility scoring:** Added `score_breakdown` to compatibility output showing per-dimension scores and weights: zodiac compatibility (20%), day master relationship (25%), spouse palace (25%), five-element complementarity (15%), nayin compatibility (15%).
- **Bilingual output:** All scripts now output bilingual `{cn, en}` pairs for zodiac animals, five elements, ten deities, twelve stages, and jianchu (12-day cycle) names. Includes pinyin for jianchu names.

### Initial release

- Add shared library (`scripts/lib/__init__.py`) for bazi repo path setup and common helpers
- Add BaZi analysis script (`scripts/bazi-analysis.py`) — four pillars, day master, five elements, nayin, major luck periods
- Add marriage compatibility script (`scripts/compatibility.py`) — zodiac harmony, day master relationship, spouse palace, five-element complementarity, overall rating
- Add auspicious date selection script (`scripts/date-selection.py`) — 12-day cycle (jianchu), San Niang Sha avoidance, profit month checks for weddings
- Add setup guide (`references/SETUP.md`) — Python dependencies and bazi repo setup
- Supports 7 event types: wedding, move, business, travel, construction, burial, general
- All scripts accept solar dates, output structured JSON, and support `--help`
