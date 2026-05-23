# Emploke Marketplace

The author's personal extensions catalog for [emploke](https://github.com/LangSensei/emploke), published under the `langsensei` scope. Entries here are opt-in installs — they are **not** bundled with emploke.

Official emploke-bundled agents and skills (the canonical `git-pr`, `meta-agent-schema`, `emploke-dev`, `pilot`, etc.) now live in [`emploke/first-party`](https://github.com/LangSensei/emploke/tree/main/first-party) and are pre-installed with emploke. This repo only carries the extras.

The catalog is intentionally **flat** — no domain subdirectories. The content spans textile (dyeing, finishing, compliance), finance (A-share research, fund holdings, sector scoring), lifestyle (wedding planning, hotel scouting, bazi, amap), gaming (Roco Kingdom), content (Xiaohongshu research, Tao Te Ching decks), dev-tools (`go-dev`, `qq-email`, `sop`), and methods (`scientific-method`, `agency-role-reference`).

## Contents

- **`agents/`** — Specialized agent personas (e.g. `wedding-planner`, `a-share-analyst`, `dye-finish-advisor`). Each agent ships an `AGENTS.md` with frontmatter and a markdown body.
- **`skills/`** — Reusable capabilities consumed by agents (e.g. `xiaohongshu`, `amap`, `eastmoney-data`). Each skill ships a `SKILL.md` plus any scripts, templates, hooks, and reference material it needs.
- **`mcps/`** — Model Context Protocol server configs (`<namespace>_<short>.json`), each carrying a top-level `_meta` block with the FQN and origin URL.

## Install

The emploke dashboard accepts any GitHub `https://github.com/<owner>/<repo>/tree/<ref>/<path>` URL as an install origin. To install an entry from this marketplace:

| Type | Origin URL |
| --- | --- |
| Skill | `https://github.com/LangSensei/emploke-marketplace/tree/main/skills/<short-name>` |
| Agent | `https://github.com/LangSensei/emploke-marketplace/tree/main/agents/<short-name>` |
| MCP   | `https://github.com/LangSensei/emploke-marketplace/tree/main/mcps/<filename>.json` |

Examples:

```
https://github.com/LangSensei/emploke-marketplace/tree/main/skills/xiaohongshu
https://github.com/LangSensei/emploke-marketplace/tree/main/agents/wedding-planner
https://github.com/LangSensei/emploke-marketplace/tree/main/mcps/io.playwright_mcp.json
```

emploke resolves the URL, fetches the entry (and its declared dependencies), and writes it into your local catalog. See the [emploke README](https://github.com/LangSensei/emploke#readme) for full setup and CLI reference.

## Catalog scope

All entries in this marketplace use `scope: langsensei`. The fully-qualified name (FQN) of an entry is `langsensei/<short-name>` for skills and agents, and `<namespace>/<short>` (per the MCP spec) for MCPs.

## Schema

The frontmatter / JSON conventions used here are defined by emploke's catalog package. Authoritative validators:

- Skills: [`skill-frontmatter.ts`](https://github.com/LangSensei/emploke/blob/main/packages/catalog/src/skill/skill-frontmatter.ts), [`validate.ts`](https://github.com/LangSensei/emploke/blob/main/packages/catalog/src/skill/validate.ts)
- Agents: [`agent-frontmatter.ts`](https://github.com/LangSensei/emploke/blob/main/packages/catalog/src/agent/agent-frontmatter.ts)
- MCPs: [`mcp-format.ts`](https://github.com/LangSensei/emploke/blob/main/packages/catalog/src/mcp/mcp-format.ts)
- Origins: [`origin.ts`](https://github.com/LangSensei/emploke/blob/main/packages/catalog-fetcher/src/origin.ts)

See [CONTRIBUTING.md](CONTRIBUTING.md) for layout and frontmatter rules.

## Migration provenance

Every entry was migrated from `swat-marketplace` (commit `42f6d91`). The mechanical mapping was:

- `skills/<n>/SKILL.md` → `skills/<n>/SKILL.md` (frontmatter rewritten, sibling files copied verbatim)
- `squads/<n>/MANIFEST.md` → `agents/<n>/AGENTS.md` (renamed file + parent dir, frontmatter rewritten)
- `mcps/<n>.json` → `mcps/<namespace>_<short>.json` (with new `_meta.{name,origin}`)
- Short-name dependency arrays were rewritten as bare GitHub origin URI strings pointing into this repo.
- Skill `prereq:` (path to a setup file) was replaced by a short `prereqs:` summary pointer; the original `references/SETUP.md` is preserved as a sibling file.
