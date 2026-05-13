# Changelog

## 1.3.0 (2026-05-13)

### Changed
- Drop "operation" SWAT-era vocabulary; align with emploke's terminology:
  - "operation directory" → "workDir"
  - "operation root" (×2 in skeleton-copy step and output path) → "workDir"

## 1.2.0 (2026-05-13)

### Changed
- Drop "Squad" terminology from prose: `# Tao Te Ching Deck Squad` → `# Tao Te Ching Deck Agent`, `## Squad Playbook` → `## Agent Playbook`, "The squad takes" / "this squad's signature" / "this squad targets" / "fork the squad" → equivalent "agent" phrasing.
- Replace stale `MANIFEST` filename references in body prose with `AGENTS.md` (the actual on-disk filename in this marketplace). Closes #5.

## 1.1.0 (2026-05-11)

### Removed
- `sop` skill dependency — methodology skills are being redesigned and are no longer a hard dependency for this squad

## 1.0.0 (2026-05-02)

- Initial release
- Tao Te Ching (Daodejing) chapter HTML slide-deck generator — single-file, ink-style, 10-page narrative
- Fixed lecture rhythm: cover (P1) / concept overview (P2) / original text (P3) / five-paragraph analysis (P4–P8) / key line (P9) / chapter summary (P10)
- Each analysis page carries a 180×180 SVG concept diagram plus paired ancient-modern case studies (one historical case, one modern case)
- Default background strategy: gradient placeholders with TODO comments naming the recommended imagery; optional base64 inline mode for the embedded-image variant
- Three-colour palette: gold `#f5c97a` for highlights, red `#c53d43` for paragraph numbers and history labels, green `#2d5a3d` for the modern-case border
- Reuses HTML / CSS / JS skeleton from the `taoteching-deck-template` skill
- Output stays inside the operation directory: `taoteching-{N}.html` plus `report.html`
- Added `sop` methodology skill to MANIFEST `dependencies.skills` to satisfy marketplace lint Phase 2 (squad must declare a methodology skill — `sop` matches the precedent set by other content/HTML squads)
- Iterated on PR review feedback before release
- Added explicit guidance to start from `templates/skeleton.html` (workflow step 5.5) — operators copy the pre-assembled skeleton rather than stitching SKILL.md sections together
- Reaffirmed scope: Tao Te Ching only — fork the squad to extend coverage of other classical texts (Zhuangzi, Analects, etc.)
