# Changelog

## 3.3.0 (2026-05-22)

### Changed
- Drop the Phase 2 check that required `## Domain`, `## Boundary`, `## Write Access` body sections on every agent. Drop the Phase 8 sub-rules that named those specific sections (duplicate-line and orphan-reference checks are now generalised to any section). Companion schema relaxation lives in `meta-agent-schema` 1.3.0+. Other Phase 2 frontmatter checks (required fields, semver, dependency resolution, `prereqs` rejection) and other Phase 8 content checks stay.

## 3.2.0 (2026-05-14)

### Added
- **Phase 9 check 8 — runtime-agnostic file references in agent / skill bodies.** Flags any provider config dir (`.github/`, `.claude/`, `.gemini/`, `.cursor/`, `.windsurf/`, `.codex/`, etc.) followed by emploke content subdirs (`skills/`, `hooks/`); `<scope>__<short>` flatten conventions written literally as path components; and absolute / `$HOME` / `~` paths. Applies to `AGENTS.md` / `SKILL.md` bodies and reference markdown files. Exclusions: CHANGELOG provenance, `scripts/` content (legitimate runtime-side use), and antipattern-documentation prose itself. Companion check to `meta-agent-schema` 1.2.0's new "Runtime-agnostic file references in agent / skill bodies" section. Surfaced after the `agency-role-reference` PR (#16) iterated through several wrong path schemes; this lint catches the same bug class going forward — for any current OR future provider.

## 3.1.0 (2026-05-14)

### Added
- **Conventions doc loaded from canonical URL** — load <https://raw.githubusercontent.com/LangSensei/emploke-marketplace/main/CONTRIBUTING.md> alongside `meta-agent-schema` before running Phase 9. If the fetch fails, Phase 9 conventions checks are skipped with a note.
- **Phase 9 — three workspace-path conventions checks** for scripts (`.js` / `.py` / `.sh` / `.ps1` and bash recipes inline in `SKILL.md` / `AGENTS.md`):
  - `EMPLOKE_WORKSPACE_DIR` is the workspace root path; `EMPLOKE_WORKSPACE` in a path-join context is a bug (var is a UUID, not a path).
  - emploke does not write a `workspace.json` marker; flag scripts that walk up from cwd looking for one.
  - `EMPLOKE_HOME` is not part of the runtime contract for scripts; flag reads of it. Scripts that need a machine-shared writable directory should read `EMPLOKE_SHARED_DIR`.
- **Phase 3 — unrecognized placeholder is a fatal error.** Only `${workspaceDir}` and `${sharedDir}` are accepted; any other `${name}` is rejected by the loader.

### Changed
- Boundary updated to describe MCP validation as `_meta.name` + cross-platform rules.
- MCP cross-platform lint rule (Phase 3): rename `${globalDir}` → `${sharedDir}` reference.
- Strip historical / migration / compatibility narrative from instructions; keep forward-only.

## 3.0.0 (2026-05-13)

### Changed (BREAKING)
- **No hardcoded catalog target.** Previous versions cloned `LangSensei/emploke-marketplace` and lint it. The new behavior is catalog-target-agnostic — the brief specifies which catalog to lint, with three resolution modes:
  1. Local path (primary) — lint the directory directly, no git
  2. GitHub URL — read-only fetch via `git-pr` Mode C, then lint the worktree
  3. No catalog supplied — lint the workDir itself
- Drop hardcoded `LangSensei/emploke-marketplace` from Domain, Boundary, Setup, and Delivery. Domain prose now reads "validation of … in any catalog directory".
- Add new top-level **"Catalog Resolution"** subsection in the playbook describing the three modes and the mismatch-detection rule.
- Setup split into Local-catalog (no setup, no git) vs. Remote-catalog (load `git-pr` skill + Mode C worktree) flows.
- Phase 1/2 frontmatter scope check rewritten to read the catalog's expected `scope` from existing entries rather than hardcoding `langsensei` (different catalogs use different scopes).
- Delivery: lint report saved to `<workDir>/lint-report.md` (was: produced inline). Remote-catalog mode also cleans up the read-only worktree.
- New constraint: "No hardcoded catalog target — the catalog under inspection is supplied by the brief; never default to a specific marketplace."

### Added
- **Hard dependency on the `meta-agent-schema` skill** (1.0.0+). The schema skill is now the authoritative format spec that every Phase 1-9 check validates against. The Lint Checks intro instructs operators to load the schema skill in full at the start of the run.
- Domain paragraph updated to call out the schema-skill dependency explicitly.

### Other
- Write Access clarified: still none, but explicitly noted "no git operations of any kind" since lint never pushes.
- `git-pr` kept as a `dependencies.skills` entry — required for Remote-catalog mode (resolution rule 2). Local-catalog and workDir modes do not invoke it.

Closes the agent-side companion to issue #7's design discussion (no hardcoded marketplace target; no fragile code-path links).

## 2.2.0 (2026-05-13)

### Added
- Setup step 1: explicit "load the `git-pr` skill body in full before any `git` command" instruction. Closes the agent-side companion to #7.

### Changed
- Cleanup command: `cd "$(repos_dir)/X" && git worktree remove "$(pwd)/repo" --force` → `git --git-dir="$(repos_dir)/X" worktree remove "$WORK_DIR/repo" --force`. agent-lint runs read-only (Mode C) but still creates a worktree, so the same fix applies.

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
