# Changelog

## 1.2.0 (2026-05-13)

### Added
- Setup preamble: explicit "load the `git-pr` skill body in full before any `git` command" instruction. Closes the agent-side companion to #7.

## 1.1.0 (2026-05-13)

### Changed
- Drop "operation" SWAT-era vocabulary; align with emploke's terminology:
  - "Operation history analysis" → "Run history analysis"
  - "operation directory" → "workDir"
  - "at the end of the operation" → "at the end of the run" — emploke-strategist

## 1.0.0 (2026-05-11)

### Breaking Changes
- Renamed agent from `swat-strategist` to `emploke-strategist` (folder + frontmatter `name`). SWAT is being deprecated; the agent now researches emploke instead.
- Repository scope changed from `LangSensei/swat` and `LangSensei/swat-marketplace` to `LangSensei/emploke` and `LangSensei/emploke-marketplace`.
- Removed the `scientific-method` skill dependency — methodology skills are being redesigned and are no longer a hard dependency.

### Added
- emploke-specific reading list (package layering, atomic-write seam, runtime adapter contract, REST URL scheme, the *What we believe about agentic systems* paper).
- Catalog-aware research guidance: respect or explicitly challenge the schema in `CONTRIBUTING.md`.

### Migration provenance
Renamed and retargeted from `swat-strategist` v1.1.0.
