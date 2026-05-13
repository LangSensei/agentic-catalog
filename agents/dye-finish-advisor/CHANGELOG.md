# Changelog

## 1.3.0 (2026-05-13)

### Changed
- Drop "Squad" terminology from prose: `# Dye Finish Advisor Squad` → `# Dye Finish Advisor Agent`, `## Squad Playbook` → `## Agent Playbook`, "The squad translates" → "The agent translates".
- Rename "Intel file routing" section heading to "Reference file routing"; rephrase "All squad, skill, and INTEL source files" → "All agent, skill, and reference source files". Closes #5.

## 1.2.0 (2026-05-11)

- **chore:** drop `sop` skill dependency — methodology skills are being redesigned and are no longer a hard dependency for this squad

## 1.1.0 (2026-04-30)

- **refactor:** extract intel/ files into dedicated reference skills (textile-fiber-reference, textile-compliance-reference)
- **feat:** add textile-fiber-reference and textile-compliance-reference to skill dependencies
- **refactor:** update intel file routing to use skill-based paths

## 1.0.0 (2026-04-29)

- **feat:** initial release of the dye-finish-advisor squad package
- **feat:** add three textile-technical skills for fiber analysis, dye-process advisory, and finish/compliance review
- **feat:** add seven INTEL reference files covering fiber identification, dye windows, DWR chemistry, PFAS regulations, hazardous-substance thresholds, supplier brands, and cost/energy structure
