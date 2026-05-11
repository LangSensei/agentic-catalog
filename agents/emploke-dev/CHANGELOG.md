# Changelog

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
