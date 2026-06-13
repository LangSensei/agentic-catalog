# Agentic Catalog

The author's personal extensions catalog for any [MetaAgents](https://github.com/metaagents-ai/metaagents)-format runtime, published under the `langsensei` scope. Entries here are opt-in installs — they are not bundled with any runtime.

Designed for [glyph](https://github.com/glyphs-ai/glyph) (which pre-installs its own `official` first-party catalog from `glyph/first-party`), but the format is runtime-agnostic — any MetaAgents-compatible substrate can install from these origin URLs.

The catalog is intentionally **flat** — no domain subdirectories. The content spans textile (dyeing, finishing, compliance), finance (A-share research, fund holdings, sector scoring), lifestyle (wedding planning, hotel scouting, bazi, amap), gaming (Roco Kingdom), content (Xiaohongshu research, Tao Te Ching decks), dev-tools (`go-dev`, `qq-email`, `sop`), and methods (`scientific-method`, `agency-role-reference`).

## Contents

- **`agents/`** — Specialized agent personas (e.g. `wedding-planner`, `a-share-analyst`, `dye-finish-advisor`). Each agent ships an `AGENTS.md` with frontmatter and a markdown body.
- **`skills/`** — Reusable capabilities consumed by agents (e.g. `xiaohongshu`, `amap`, `eastmoney-data`). Each skill ships a `SKILL.md` plus any scripts, templates, hooks, and reference material it needs.
- **`mcps/`** — Model Context Protocol server configs (`<namespace>_<short>.json`), each carrying a top-level `_meta` block with the FQN and origin URL.

## Install

Any MetaAgents-compatible runtime accepts a GitHub `https://github.com/<owner>/<repo>/tree/<ref>/<path>` URL as an install origin. To install an entry from this catalog:

| Type | Origin URL |
| --- | --- |
| Skill | `https://github.com/LangSensei/agentic-catalog/tree/main/skills/<short-name>` |
| Agent | `https://github.com/LangSensei/agentic-catalog/tree/main/agents/<short-name>` |
| MCP   | `https://github.com/LangSensei/agentic-catalog/tree/main/mcps/<filename>.json` |

Examples (using glyph):

```sh
glyph catalog skill install --url https://github.com/LangSensei/agentic-catalog/tree/main/skills/xiaohongshu
glyph catalog agent install --url https://github.com/LangSensei/agentic-catalog/tree/main/agents/wedding-planner
glyph catalog mcp install   --url https://github.com/LangSensei/agentic-catalog/tree/main/mcps/io.playwright_mcp.json
```

The runtime resolves the URL, fetches the entry (and its declared dependencies), and writes it into your local catalog. See the [glyph README](https://github.com/glyphs-ai/glyph#readme) for full setup and CLI reference.

## Catalog scope

All entries in this catalog use `scope: langsensei`. The fully-qualified name (FQN) of an entry is `langsensei/<short-name>` for skills and agents, and `<namespace>/<short>` (per the MCP spec) for MCPs.

## Schema

The frontmatter / JSON conventions used here are defined by the [MetaAgents](https://github.com/metaagents-ai/metaagents) specification, with authoritative validators living in glyph's catalog package:

- Skills: [`skill-frontmatter.ts`](https://github.com/glyphs-ai/glyph/blob/main/packages/catalog/src/skill/skill-frontmatter.ts), [`validate.ts`](https://github.com/glyphs-ai/glyph/blob/main/packages/catalog/src/skill/validate.ts)
- Agents: [`agent-frontmatter.ts`](https://github.com/glyphs-ai/glyph/blob/main/packages/catalog/src/agent/agent-frontmatter.ts)
- MCPs: [`mcp-format.ts`](https://github.com/glyphs-ai/glyph/blob/main/packages/catalog/src/mcp/mcp-format.ts)
- Origins: [`origin.ts`](https://github.com/glyphs-ai/glyph/blob/main/packages/catalog/src/fetcher/origin.ts)

See [CONTRIBUTING.md](CONTRIBUTING.md) for layout and frontmatter rules.

## History

This repo was previously named `emploke-marketplace` (and before that, `swat-marketplace`). GitHub auto-redirects the old URLs, but install origins should be updated to the new path.

Every entry was originally migrated from `swat-marketplace` (commit `42f6d91`). The mechanical mapping was:

- `skills/<n>/SKILL.md` → `skills/<n>/SKILL.md` (frontmatter rewritten, sibling files copied verbatim)
- `squads/<n>/MANIFEST.md` → `agents/<n>/AGENTS.md` (renamed file + parent dir, frontmatter rewritten)
- `mcps/<n>.json` → `mcps/<namespace>_<short>.json` (with new `_meta.{name,origin}`)
- Short-name dependency arrays were rewritten as bare GitHub origin URI strings pointing into this repo.
- Skill `prereq:` (path to a setup file) was replaced by a short `prereqs:` summary pointer; the original `references/SETUP.md` is preserved as a sibling file.