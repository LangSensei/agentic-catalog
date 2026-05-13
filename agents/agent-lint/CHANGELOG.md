# Changelog

## 2.1.0 (2026-05-13)

### Changed
- Drop "operation" SWAT-era vocabulary; align with emploke's terminology:
  - "operation directory" → "the workDir"
  - "operation brief" (×2 in Mergeable Pre-Check and Incremental PR Mode) → "brief"
  - "**One operation per lint run**" → "**Lint everything in one pass** — cover the entire marketplace in a single run, not partial subsets" (the original phrasing had `operation` and `run` colliding)

## 2.0.1 (2026-05-11)

- Drop SWAT-era worktree paths. Setup and cleanup steps now use `$(repos_dir)` from the git-pr skill instead of hard-coded `~/.swat/repos/emploke-marketplace/`.

## 2.0.0 (2026-05-11)

### Breaking Changes
- Renamed agent from `squad-lint` to `agent-lint` (folder + frontmatter `name`). emploke uses "agent" as the unit name; "squad" was SWAT terminology.
- Body rewritten — Phase 2 now validates `AGENTS.md` (not `MANIFEST.md`), explicitly rejects `prereqs:` on agents (per `CONTRIBUTING.md`), and the marketplace under inspection is `LangSensei/emploke-marketplace` instead of the deprecated `LangSensei/swat-marketplace`.
- Removed the mandatory "Debrief Rules" section that hard-coded a dispatch to `squad-forge`. Without the deprecated SWAT MCP there is no in-process dispatch channel; lint failures are reported in the operation summary.

### Added
- Phase 3: dedicated MCP spec validation — `_meta.name` / `_meta.origin` correctness, on-disk filename derived from FQN, and the cross-platform rules from `CONTRIBUTING.md` (no `bash` / shell wrappers, no `$HOME` / `${VAR}`, correct spelling of `${workspaceDir}` / `${globalDir}` placeholders).
- Phase 2 now requires the body sections `## Domain`, `## Boundary`, `## Write Access` (matching the `CONTRIBUTING.md` schema for agents).

### Migration provenance
Renamed and retargeted from `squad-lint` v1.3.0.

## 1.3.0 (2026-05-11)

### Removed
- `sop` skill dependency — methodology skills are being redesigned and are no longer a hard dependency for this squad
- `swat/cli` MCP dependency — `swat_cli` MCP is deprecated alongside SWAT
- Phase 2 check: `dependencies.skills includes at least one methodology skill (sop or scientific-method)` — methodology dependency is no longer required

## 1.2.0 (2026-04-25)

### Added
- Phase 8: Semantic Code Review — six checks for code-level semantic issues:
  - Cross-platform hook consistency (logical equivalence across copilot/gemini runtimes)
  - CHANGELOG text vs code alignment (quoted identifiers and renamed sections)
  - Template comment consistency (HTML comments vs current section headings)
  - PowerShell reserved variable names (`$input` detection in `.ps1` files)
  - Duplicate comments in hook scripts
  - String literal hygiene (stray spaces before punctuation, consecutive punctuation)

### Changed
- Domain and Boundary updated to include static semantic review of hook scripts, templates, and code text patterns
- Description updated to reflect both structural and semantic validation

## 1.1.1 (2026-04-17)

### Changed
- Phase 5: relax Steps requirement — sections now need a `### Check` plus at least one other `###` subsection (not strictly `### Steps`)
- Phase 5: relax platform label rule — standard names (`Linux`, `macOS`, `Windows`) required, but specific variants like `Linux (amd64)` are acceptable

## 1.1.0 (2026-04-17)

### Added
- Mandatory Debrief Rules section — all checks pass dispatches notify; failures dispatch to squad-forge
- Mergeable pre-check — check PR mergeability before linting; CONFLICTING status skips lint and dispatches rebase request
- Incremental PR mode — when PR number is specified, only lint changed files plus cross-references; fall back to full scan otherwise
- Phase 7: Semantic Checks — duplicate consecutive lines, conflicting debrief patterns, empty section bodies, orphaned squad/skill references

### Changed
- Phase 4: same-date CHANGELOG warning now only triggers when both entries appear in the PR diff (pre-existing same-date entries no longer warn)

### Removed
- Debrief hint (replaced by mandatory Debrief Rules)

## 1.0.1 (2026-04-14)

### Added
- `swat` MCP dependency — enables `swat_dispatch` during debrief for dispatch pipeline

## 1.0.0 (2026-04-13)

- Initial release
- Six validation phases: SKILL.md frontmatter, MANIFEST.md validation, hook configuration, CHANGELOG validation, SETUP.md validation, cross-file consistency
- Per-item pass/fail/warning reporting with file locations
- Summary totals in report output
- Debrief hint corrected (squad-lint is read-only, never opens PRs)
- Added git-pr to dependencies (git-pr Mode C is used in Setup for read-only worktree)
- Phase 1: add prereq file-existence check when `prereq` is declared in SKILL.md frontmatter
- Phase 3: fix hooks paths — hooks only exist in skills (`skills/*/hooks/<name>.json`), not squads; document `<name>-scripts/` convention
- Phase 5: fix SETUP.md path from `skills/*/SETUP.md` to `skills/*/references/SETUP.md`
