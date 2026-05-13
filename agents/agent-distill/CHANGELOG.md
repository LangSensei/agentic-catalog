# Changelog

## 2.1.0 (2026-05-13)

### Changed
- Drop "operation" SWAT-era vocabulary throughout. Replace with **run** (mode-neutral term for a single agent execution; covers both `session` and `task` execution modes — agent-distill already correctly distinguished `<workspace>/tasks/<id>/` and `<workspace>/sessions/<id>/`):
  - description: "agent operation history" → "agent run history"
  - "Cross-operation analysis" → "Cross-run analysis"
  - "operation history" (×3 in Boundary and brief intake) → "run history"
  - "**Operation range** — 'last N operations'" → "**Run range** — 'last N runs'"
  - "for each operation in scope" → "for each run in scope"
  - "Skip failed/cancelled operations" → "Skip failed/cancelled runs"
  - "same error across operations" → "same error across runs"
  - "haven't been used or relevant in recent operations" → "...recent runs"
  - "the operation(s) that justify it" / "specific operation(s)" → "the run(s) that justify it" / "specific run(s)"
  - "with last-used operation" → "with last-used run"
  - "One PR per distill operation" → "One PR per distill run"
  - "which operations were analyzed" → "which runs were analyzed"
  - Final report bullet: "operations analyzed" → "runs analyzed"

## 2.0.1 (2026-05-11)

- Drop SWAT-era worktree paths. Setup, Write Access, and cleanup steps now use `$(repos_dir)` from the git-pr skill instead of hard-coded `~/.swat/repos/emploke-marketplace/`.

## 2.0.0 (2026-05-11)

### Breaking Changes
- Renamed agent from `squad-distill` to `agent-distill` (folder + frontmatter `name`). emploke uses "agent" as the unit name; "squad" was SWAT terminology.
- Body rewritten to drop SWAT-specific concepts (`MANIFEST.md` → `AGENTS.md`, `squad` → `agent`, `INTEL` → reference material). The marketplace it operates against is now `LangSensei/emploke-marketplace` instead of the deprecated `LangSensei/swat-marketplace`.
- Operation history is now resolved against the runtime that produced it (emploke writes tasks under `<workspace>/tasks/<id>/` and sessions under `<workspace>/sessions/<id>/`) rather than fixed `~/.swat/squads/{target}/operations/` paths.

### Migration provenance
Renamed and retargeted from `squad-distill` v1.2.0.

## 1.2.0 (2026-05-11)

### Removed
- `sop` skill dependency — methodology skills are being redesigned and are no longer a hard dependency for this squad

## 1.1.0 (2026-04-12)

### Changed
- Add `sop` skill dependency
- Remove Output Schema section

## 1.0.0 (2026-03-23)

- Initial release
- Analyze squad operation history for patterns and optimization opportunities
- Optimize MANIFEST playbooks with evidence-based changes
- Extract reusable skills from repeated INTEL/findings
- Prune stale INTEL entries
- PR workflow to swat-marketplace
