# Changelog

## 1.2.0 (2026-05-13)

### Added
- Setup step 1: explicit "load the `git-pr` skill body in full before any `git` command" instruction. Closes the agent-side companion to #7.

## 1.1.0 (2026-05-13)

### Changed
- Drop "operation" SWAT-era vocabulary; align with emploke's terminology:
  - "operation brief" (×3 in Setup, Audit Mode scope) → "brief"

## 1.0.1 (2026-05-11)

- Drop SWAT-era worktree paths. Setup, Write Access, and audit-mode cleanup steps now use `$(repos_dir)` from the git-pr skill instead of hard-coded `~/.swat/repos/`.

## 1.0.0 (2026-05-11)

### Breaking Changes
- Renamed agent from `swat-review` to `emploke-review` (folder + frontmatter `name`). SWAT is being deprecated; the agent now reviews emploke instead.
- Repository scope changed from `LangSensei/swat` and `LangSensei/swat-openclaw` (Go) to `LangSensei/emploke` and `LangSensei/emploke-marketplace` (TypeScript/pnpm).
- Removed the `swat/cli` MCP dependency — `swat_cli` MCP is deprecated alongside SWAT.
- Removed the `sop` skill dependency — methodology skills are being redesigned and are no longer a hard dependency.
- Removed the mandatory `Debrief Rules` section that dispatched every non-clean PR to `swat-dev`. Without the deprecated SWAT MCP there is no in-process dispatch channel; the GitHub PR comment thread is the handoff surface.

### Added
- TypeScript / Biome review criteria.
- Marketplace schema review (frontmatter, dependency origins, cross-platform MCP rules) for PRs that touch `agents/`, `skills/`, or `mcps/`.

### Migration provenance
Renamed and retargeted from `swat-review` v1.4.0.
