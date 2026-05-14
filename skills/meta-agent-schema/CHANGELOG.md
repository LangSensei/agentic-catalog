# Changelog

## 1.1.0 (2026-05-14)

### Changed
- MCP frontmatter: drop the `_meta.origin` requirement. emploke's MCP validator confirms install origin is an install-time fact (the URI emploke fetched from, persisted on the SQLite catalog row), not part of the file. Updated the schema description, both example JSONs, and the "Origin URI grammar" section (origin now describes dependency origins only).
- Placeholder substitution: rename `${globalDir}` → `${sharedDir}` to match emploke's runtime placeholder.
- Strip historical / migration / compatibility narrative from instructions. Marketplace content is provisioned into a clean runtime context every spawn — agents only need correct forward instructions, not history of what changed.

## 1.0.0 (2026-05-13)

### Added
- Initial release of the `meta-agent-schema` skill — distills the format contract for emploke-compatible agents, skills, and MCPs into a single agent-facing skill.
- Covers: layout, naming rules, frontmatter (skill/agent/mcp), MCP cross-platform rules, placeholder substitution, origin URI grammar, CHANGELOG conventions, submission flow.
- References the open [MetaAgents reference spec](https://github.com/metaagents-ai/metaagents) as a related document and emploke's runtime validators as deepest authority (with this skill as the agent-facing contract).
- Designed to replace the per-agent "Schema reference" prose blocks (with their fragile links into emploke source files) in `agent-forge`, `agent-distill`, and `agent-lint`.
