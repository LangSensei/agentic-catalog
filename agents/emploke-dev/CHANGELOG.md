# Changelog

## 1.3.0 (2026-05-14)

### Changed
- **Write Access** section rewritten to describe the new workspace resolution via `$EMPLOKE_WORKSPACE_DIR` (emploke's task/session runtime contract from PR emploke#100). Drops the obsolete "walk up to `workspace.json` marker" wording.
- **Marketplace schema constraint** — placeholder rename `${globalDir}` → `${sharedDir}` (matches the placeholder name shipped by emploke's runtime).

## 1.2.0 (2026-05-13)

### Added
- Setup step 1: explicit "load the `git-pr` skill body in full before any `git` command" instruction. Closes the agent-side companion to #7.

### Changed
- Cleanup command: `cd "$(repos_dir)/emploke" && git worktree remove "$(pwd)/repo" --force` → `git --git-dir="$(repos_dir)/emploke" worktree remove "$WORK_DIR/repo" --force` (use the matching repo path for marketplace work). The old form silently failed under `safe.bareRepository=explicit`.

## 1.1.0 (2026-05-13)

### Changed
- Drop "operation" SWAT-era vocabulary; align with emploke's terminology:
  - "One PR per operation" → "One PR per run"

## 1.0.1 (2026-05-11)

- Drop SWAT-era worktree paths. Setup, Write Access, and cleanup steps now use `$(repos_dir)` from the git-pr skill instead of hard-coded `~/.swat/repos/`. The git-pr skill resolves the repos dir to `<workspace>/.repos/` (when a `workspace.json` marker is found) or `./.repos/` (cwd-relative) otherwise.

## 1.0.0 (2026-05-11)

### Breaking Changes
- Renamed agent from `swat-dev` to `emploke-dev` (folder + frontmatter `name`). SWAT is being deprecated; the agent now develops emploke instead.
- Repository scope changed from `LangSensei/swat` and `LangSensei/swat-openclaw` (Go) to `LangSensei/emploke` and `LangSensei/emploke-marketplace` (TypeScript/pnpm monorepo).
- Removed the `swat/cli` MCP dependency — `swat_cli` MCP is deprecated alongside SWAT.
- Removed the `scientific-method` skill dependency — methodology skills are being redesigned and are no longer a hard dependency.
- Removed the `go-dev` skill dependency — emploke is a TypeScript codebase; build/test commands are documented inline in the playbook.
- Removed the mandatory `Debrief Rules` section that dispatched every PR to `swat-review`. Without the deprecated SWAT MCP there is no in-process dispatch channel; reviewers are picked up via the human PR workflow.

### Added
- TypeScript / pnpm workflow guidance: `pnpm install`, `pnpm build`, `pnpm typecheck`, `pnpm test`, `pnpm lint`.
- Layering reference pointing at `docs/architecture.md` in the emploke repo.
- Marketplace-content guidance pointing at `CONTRIBUTING.md` and the cross-platform MCP rules.

### Migration provenance
Renamed and retargeted from `swat-dev` v1.7.0.
