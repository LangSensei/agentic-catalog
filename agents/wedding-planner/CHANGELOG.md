# Changelog

## 1.4.0 (2026-05-13)

### Changed
- Drop "Squad" terminology from prose: `# Wedding Planner Squad` → `# Wedding Planner Agent`, `## Squad Playbook` → `## Agent Playbook`.
- Rephrase "the captain should consider mentioning" → "the agent should consider mentioning" (drops SWAT-era captain role vocabulary). Closes #5.

## 1.3.0 (2026-05-11)

### Removed
- `scientific-method` skill dependency — methodology skills are being redesigned and are no longer a hard dependency for this squad

## 1.2.0 (2026-04-12)

### Changed
- Add `scientific-method` skill dependency
- Remove Output Schema section

## 1.1.0 (2026-03-31)

### Added
- Add `bazi` skill dependency for programmatic date auspiciousness analysis and marriage compatibility

## 1.0.0 (2026-03-25)

### Added
- Initial release of wedding-planner squad
- Core workflows: Date Analysis, Venue Research, Vendor Research, Budget Planning, Timeline & Checklist, Route Planning
- Additional workflows: Pre-Wedding Photoshoot, Guest Management, Honeymoon Research
- Prompt injection defense rules for Xiaohongshu content
- Chinese wedding cultural constraints and conventions
- Tips section covering marriage registration, huimen yan, betrothal gifts, and emergency kit
- Output schema with workflow-specific fields
