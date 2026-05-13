# Changelog

## 3.0.0 (2026-05-13)

### Changed (BREAKING)
- **Default mode is now Local, not Remote.** Previous versions hardcoded `LangSensei/emploke-marketplace` as the catalog to push optimization PRs to. The new default writes the optimization output (revised `AGENTS.md`, new skill drafts, prune recommendations) directly into the current run's workDir so any installation can analyze any agent and integrate the changes into their own catalog by hand. Remote mode (clone + PR) only triggers when the brief explicitly names a target catalog repo.
- Drop hardcoded `LangSensei/emploke-marketplace` from Domain, Boundary, Write Access, Setup, and Delivery. The agent is now catalog-target-agnostic.
- New top-level **"Mode Selection"** subsection in the playbook with a Local-vs-Remote decision table.
- Setup split into Local (no setup) vs. Remote (load `git-pr` skill + clone + worktree) flows.
- Optimization Phase rewritten to write under `<output-root>` (resolves to `<workDir>` in Local and `<workDir>/repo` in Remote) instead of directly editing marketplace files; explicit constraint that the target agent's installed `AGENTS.md` is read-only.
- Prune recommendations now ship as `<output-root>/prune-report.md` rather than being pushed back to a marketplace.
- Delivery split into Local (file list, no git) vs. Remote (push + PR + worktree cleanup).

### Added
- **Hard dependency on the `meta-agent-schema` skill** (1.0.0+). When the Extract-Skill workflow writes a new `SKILL.md`, the format comes from `meta-agent-schema` instead of from prose embedded in this agent.
- New constraint: "Follow `meta-agent-schema` — frontmatter, naming, and CHANGELOG conventions for any file you write must match the schema skill; do not improvise from memory."

### Removed
- Implicit reliance on `agent-forge`'s in-prose schema reference for the Extract-Skill workflow. The two agents now share the `meta-agent-schema` dependency directly.

Closes the agent-side companion to issue #7's design discussion (no hardcoded marketplace target; no fragile code-path links).

## 2.2.0 (2026-05-13)

### Added
- Setup step 1: explicit "load the `git-pr` skill body in full before any `git` command" instruction. Closes the agent-side companion to #7.

### Changed
- Cleanup command: `cd "$(repos_dir)/X" && git worktree remove "$(pwd)/repo" --force` → `git --git-dir="$(repos_dir)/X" worktree remove "$WORK_DIR/repo" --force`. The old form was silently broken — `$(pwd)` evaluated *after* the `cd`, so `git worktree remove` was being asked to delete `<bare>/repo` (the wrong location) and only "worked" when the worktree was wrongly placed inside the bare clone (i.e. the bug from #7 itself).

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
