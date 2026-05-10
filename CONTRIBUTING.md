# Contributing to Emploke Marketplace

This catalog uses emploke's Phase-2 schema. Please read this whole guide before opening a PR.

## Layout

```
emploke-marketplace/
  skills/<short-name>/SKILL.md          (+ any sibling files: scripts/, templates/, references/, hooks/)
  agents/<short-name>/AGENTS.md         (+ any sibling files)
  mcps/<namespace>_<short>.json
```

- The folder name MUST equal `frontmatter.name` (kebab-case, lowercase `[a-z0-9-]+`, no `/`).
- All entries in this repo use `scope: langsensei`.

## Skill — `skills/<name>/SKILL.md`

```yaml
---
name: my-skill                                  # kebab-case, matches folder
scope: langsensei                               # always for this marketplace
description: "What the skill does, one line."
version: 1.0.0                                  # 3-segment semver (bare or quoted)
prereqs: |                                      # OPTIONAL — keep short
  Requires: <one-line summary>. See `references/SETUP.md` for step-by-step setup.
dependencies:                                   # OPTIONAL
  skills:
    - "https://github.com/LangSensei/emploke-marketplace/tree/main/skills/<other-skill>"
  mcps:
    - "https://github.com/LangSensei/emploke-marketplace/tree/main/mcps/<file>.json"
---
# Skill body (markdown, verbatim)
```

Rules:

- `prereqs` is a YAML literal-block string. Keep it short — link to a sibling `references/SETUP.md` for the long version.
- `dependencies.skills` and `dependencies.mcps` are **arrays of bare origin URI strings**. Object form (`{origin: ...}`) is accepted by the parser but discouraged.
- Cross-marketplace deps are allowed: any other public GitHub repo URL of the form `https://github.com/<owner>/<repo>/tree/<ref>/<path>` works.

Authoritative validator: [`packages/catalog/src/skill/skill-frontmatter.ts`](https://github.com/LangSensei/emploke/blob/main/packages/catalog/src/skill/skill-frontmatter.ts).

## Agent — `agents/<name>/AGENTS.md`

Identical to skills, except:

- File and parent directory live under `agents/`.
- The file is named `AGENTS.md` (not `MANIFEST.md`).
- **`prereqs` is REJECTED for agents.** If your agent needs setup steps, put them in the body as a `## Setup` section.

```yaml
---
name: my-agent
scope: langsensei
description: "What the agent does, one line."
version: 1.0.0
dependencies:
  skills:
    - "https://github.com/LangSensei/emploke-marketplace/tree/main/skills/sop"
  mcps:
    - "https://github.com/LangSensei/emploke-marketplace/tree/main/mcps/swat_cli.json"
---
# Agent body
```

Authoritative validator: [`packages/catalog/src/agent/agent-frontmatter.ts`](https://github.com/LangSensei/emploke/blob/main/packages/catalog/src/agent/agent-frontmatter.ts).

## MCP — `mcps/<namespace>_<short>.json`

```json
{
  "_meta": {
    "name": "<namespace>/<short>",
    "origin": "https://github.com/LangSensei/emploke-marketplace/tree/main/mcps/<namespace>_<short>.json"
  },
  "type": "stdio",
  "command": "...",
  "args": ["..."]
}
```

Rules:

- `_meta.name` is the MCP spec FQN. Reverse-DNS namespaces are preferred (`io.playwright/mcp`); single-segment vendor names (`swat/cli`, `azure/mcp`) are also OK.
- The on-disk filename is `<namespace>_<short>.json` (replace `/` in the FQN with `_`).
- `_meta.origin` MUST point at this same file's GitHub URL.
- Other fields (`type`, `command`, `args`, `env`, …) follow the MCP client-config convention.
- Pretty-print with 2-space indent and a trailing newline.
- Other `_meta.*` keys (e.g. registry sub-objects) survive untouched on re-write.

Authoritative validator: [`packages/catalog/src/mcp/mcp-format.ts`](https://github.com/LangSensei/emploke/blob/main/packages/catalog/src/mcp/mcp-format.ts).

## Naming rules

| Field | Grammar |
| --- | --- |
| `name` (short) | `^[a-z0-9]+(-[a-z0-9]+)*$`, ≤ 64 chars, no `/` |
| `scope` | `^[a-z0-9]+(-[a-z0-9]+)*(\.[a-z0-9]+(-[a-z0-9]+)*)*$`, ≤ 64 chars (reverse-DNS allowed) |
| FQN | computed as `<scope>/<name>` |

Authoritative validator: [`packages/catalog/src/skill/validate.ts`](https://github.com/LangSensei/emploke/blob/main/packages/catalog/src/skill/validate.ts).

## Origin URI grammar

Dependencies and MCP `_meta.origin` are bare URI strings. Two schemes are accepted in Phase 2:

- `https://github.com/<owner>/<repo>/tree/<ref>[/path]` — recommended for shared catalog entries
- `file:<absolute-path>` — local-only; never commit a `file:` origin

Authoritative parser: [`packages/catalog-fetcher/src/origin.ts`](https://github.com/LangSensei/emploke/blob/main/packages/catalog-fetcher/src/origin.ts).

## Submission checklist

1. Fork this repo, branch `feat/add-<my-thing>`.
2. Add your skill / agent / mcp under the correct directory.
3. Verify locally: install via the emploke dashboard pointing at your fork's branch URL and exercise the entry.
4. `git push` and open a PR.
5. CI (when enabled) re-runs the upstream validators against every changed file.

## Code of conduct

Be excellent to each other.
