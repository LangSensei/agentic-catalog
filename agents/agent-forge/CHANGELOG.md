# Changelog

## 3.1.0 (2026-05-14)

### Added
- **CONTRIBUTING.md as a conventions source** — when the target catalog ships a `CONTRIBUTING.md` at its root, load it in full alongside `meta-agent-schema`. `meta-agent-schema` stays focused on schema (frontmatter, layout, naming); `CONTRIBUTING.md` covers catalog-specific conventions (workflow rules, runtime env contract for scripts, anti-patterns). Catalogs without `CONTRIBUTING.md` fall back to schema-only — and the agent keeps new entries minimal rather than inventing conventions.
- **Creating a Skill** step explicitly directs the agent at the catalog's `CONTRIBUTING.md` → "Workspace path conventions for scripts" section when authoring scripts that need a workspace path (storage state, repo cache, …). The historical bug class (broken UUID-as-path / `workspace.json` walk-up resolvers shipped by 4 skills) is the case this guards against.

### Changed
- MCP cross-platform rule: rename `${globalDir}` → `${sharedDir}` to match emploke's renamed placeholder (the old `${globalDir}` name is now rejected by the loader).
- Rename the "Schema reference" section → "Schema and conventions reference" to reflect the dual source (schema + conventions).

## 3.0.0 (2026-05-13)

### Changed (BREAKING)
- **Default mode is now Local, not Remote.** Previous versions hardcoded `LangSensei/emploke-marketplace` as the target and always cloned + PR'd. The new default writes files directly into the current run's workDir (`<workDir>/agents/<name>/AGENTS.md`, etc.) so any installation can use this agent against any catalog without coupling. Remote mode (clone + PR) only triggers when the brief explicitly names a target catalog repo.
- Drop hardcoded `LangSensei/emploke-marketplace` from Domain, Boundary, Write Access, Setup, and Delivery. The agent is now catalog-target-agnostic.
- New top-level **"Mode Selection"** subsection in the playbook with a Local-vs-Remote decision table; states the trigger and behavior for each.
- Setup split into Local (no setup) vs. Remote (load `git-pr` skill + clone + worktree) flows.
- Creating an Agent / Skill / MCP sections now reference `<catalog-root>` (which resolves to `<workDir>` in Local and `<workDir>/repo` in Remote) instead of hardcoded paths.
- Delivery split into Local (file list, no git) vs. Remote (push + PR + worktree cleanup).

### Added
- **Hard dependency on the `meta-agent-schema` skill** (1.0.0+). The schema for emploke-compatible agents, skills, and MCPs is now the single source of truth for frontmatter, naming, layout, MCP cross-platform rules, origin URI grammar, and CHANGELOG conventions. agent-forge loads it in full at the start of every run.
- New "Schema reference" subsection now points operators at the schema skill instead of inlining 30 lines of frontmatter rules + brittle GitHub source-code links. Concrete example study (read 2-3 entries in any reachable catalog) preserved as an addendum.
- New constraint: "Follow `meta-agent-schema` — that skill is the format contract; do not improvise frontmatter, naming, or layout from memory."

### Removed
- "Schema reference" prose block citing `packages/catalog/src/{skill,agent,mcp}/*.ts` and `packages/catalog-fetcher/src/origin.ts` directly. These were fragile (one of the cited paths was already stale) and required the agent to either fetch and parse TypeScript at runtime or invent the rules from memory. The schema is now in `meta-agent-schema`.
- Inline frontmatter / MCP `_meta` examples in "Creating an Agent / Skill / MCP" — moved to the `meta-agent-schema` skill so the format is defined in one place.
- Inline "Naming Conventions" subsection — same content lives in `meta-agent-schema`.
- "CHANGELOG format" and "Version bump guidance" Constraints bullets — same content lives in `meta-agent-schema`.

Closes the agent-side companion to issue #7's design discussion (no hardcoded marketplace target; no fragile code-path links).

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
