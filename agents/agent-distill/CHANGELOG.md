# Changelog

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
