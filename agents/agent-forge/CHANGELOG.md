# Changelog

## 2.2.0 (2026-05-13)

### Added
- Setup step 1: explicit "load the `git-pr` skill body in full before any `git` command" instruction. Closes the agent-side companion to #7.

### Changed
- Cleanup command: `cd "$(repos_dir)/X" && git worktree remove "$(pwd)/repo" --force` → `git --git-dir="$(repos_dir)/X" worktree remove "$WORK_DIR/repo" --force` (the old `cd … && git …` form silently broke under `safe.bareRepository=explicit` and was also pointing at the wrong path when followed literally).

## 2.1.0 (2026-05-13)

### Changed
- Drop "operation" SWAT-era vocabulary; align with emploke's terminology:
  - "Distilling lessons from past operations" → "...past runs"
  - "One PR per operation" → "One PR per run"

## 2.0.1 (2026-05-11)

- Drop SWAT-era worktree paths. Setup, Write Access, and cleanup steps now use `$(repos_dir)` from the git-pr skill instead of hard-coded `~/.swat/repos/emploke-marketplace/`.

## 2.0.0 (2026-05-11)

### Breaking Changes
- Renamed agent from `squad-forge` to `agent-forge` (folder + frontmatter `name`). emploke uses "agent" as the unit name; "squad" was SWAT terminology.
- Body rewritten to drop SWAT-specific concepts (`MANIFEST.md` → `AGENTS.md`, `squads/` → `agents/`, removed dead links to `blueprints/squads/_framework/TEMPLATE.md` and `PROTOCOL.md` in the deprecated SWAT repo).
- The marketplace it authors against is now `LangSensei/emploke-marketplace` instead of the deprecated `LangSensei/swat-marketplace`.
- Removed the mandatory "Debrief Rules" section that hard-coded a dispatch to `squad-lint`. Without the deprecated SWAT MCP there is no in-process dispatch channel.

### Added
- New section: "Schema reference" pointing at `CONTRIBUTING.md` and the four authoritative validators in the emploke catalog package.
- New section: "Creating an MCP" — with the cross-platform rules from `CONTRIBUTING.md` (no `bash -c`, no `$HOME` / `${VAR}`, only `${workspaceDir}` / `${globalDir}` placeholders).

### Migration provenance
Renamed and retargeted from `squad-forge` v1.2.0.

## 1.2.0 (2026-05-11)

### Removed
- `sop` skill dependency — methodology skills are being redesigned and are no longer a hard dependency for this squad
- `swat/cli` MCP dependency — `swat_cli` MCP is deprecated alongside SWAT

## 1.1.0 (2026-04-17)

### Added
- Mandatory Debrief Rules section — PR opened dispatches to squad-lint; no-PR operations notify
- CHANGELOG format specification in Constraints — mandates `## X.Y.Z (YYYY-MM-DD)` format
- Version bump guidance in Constraints — patch/minor/major criteria

### Removed
- Debrief hint (replaced by mandatory Debrief Rules)

## 1.0.4 (2026-04-14)

### Added
- `swat` MCP dependency — enables `swat_dispatch` during debrief for forge→lint pipeline

## 1.0.3 (2026-04-13)

### Added
- Debrief hint in Delivery section: prefer dispatching to squad-lint over notify when opening PRs

## 1.0.2 (2026-04-12)

### Changed
- Add `sop` skill dependency
- Remove Output Schema section

## 1.0.1 (2026-03-23)

- Fix incorrect TEMPLATE.md path in squad creation step (referenced non-existent `squads/squad-forge/TEMPLATE.md`, now points to References section)

## 1.0.0 (2026-03-09)

- Initial release
- Squad and skill creation from user requirements
- Worktree-based PR workflow to swat-marketplace
- MANIFEST and SKILL structure templates
