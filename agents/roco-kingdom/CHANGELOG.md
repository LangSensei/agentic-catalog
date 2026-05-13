# Changelog — roco-kingdom

## 1.3.0 (2026-05-13)

### Changed
- Drop "Squad" terminology from prose: `# Roco Kingdom Squad` → `# Roco Kingdom Agent`, `## Squad Playbook` → `## Agent Playbook`, "Do NOT attempt login from within this squad" → "Do NOT attempt login from within this agent".
- Rephrase the auth-check failure path from "debrief the user to re-authenticate" to plain "ask the user to re-authenticate". Closes #5.

## 1.2.0 (2026-05-11)

### Removed
- `scientific-method` skill dependency — methodology skills are being redesigned and are no longer a hard dependency for this squad

## 1.1.0 (2026-04-12)

### Changed
- Add `scientific-method` skill dependency
- Remove Output Schema section

## 1.0.0 (2026-04-11)

### Added
- Initial MANIFEST.md for the Roco Kingdom (洛克王国) game research squad
- Three core workflows: Game Research, Guide Synthesis (Xiaohongshu), and Meta Analysis
- Prompt injection defense section for scraped game content
- Output Schema with game_topic, research_sources, xhs_posts_analyzed, key_findings fields
- Dependencies: xiaohongshu skill, playwright MCP
