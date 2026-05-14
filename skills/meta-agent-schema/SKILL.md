---
name: meta-agent-schema
scope: langsensei
description: "Schema for emploke-compatible agents, skills, and MCPs — frontmatter, layout, naming, dependency origins, MCP cross-platform rules, CHANGELOG conventions"
version: 1.1.0
---

# Meta-Agent Schema Skill

The format contract for **agents**, **skills**, and **MCPs** in emploke-compatible catalogs. This skill is the agent-facing single source of truth: any agent that creates, validates, or modifies catalog entries should load this skill in full and follow it.

The same shape is also reflected in the open [MetaAgents reference spec](https://github.com/metaagents-ai/metaagents). emploke is the canonical implementation; that document is a related spec. Where the two differ, this skill (and the validators that ship with emploke) are authoritative.

## Layout

A catalog has a flat three-bucket layout:

```
<catalog-root>/
  agents/<short-name>/AGENTS.md        (+ any sibling files)
  skills/<short-name>/SKILL.md         (+ scripts/, templates/, references/, hooks/, etc.)
  mcps/<namespace>_<short>.json
```

Rules:

- The folder name MUST equal `frontmatter.name` (kebab-case, lowercase `[a-z0-9]+(-[a-z0-9]+)*`, no `/`).
- All entries in a catalog typically share one `scope:` value (e.g. `langsensei`); the scope is per-catalog convention, not part of the schema itself. Different catalogs use different scopes.

## Naming rules

| Field | Grammar | Notes |
| --- | --- | --- |
| `name` (short) | `^[a-z0-9]+(-[a-z0-9]+)*$`, ≤ 64 chars, no `/` | identifier within a scope |
| `scope` | `^[a-z0-9]+(-[a-z0-9]+)*(\.[a-z0-9]+(-[a-z0-9]+)*)*$`, ≤ 64 chars | reverse-DNS allowed (e.g. `io.playwright`) |
| FQN | computed as `<scope>/<name>` | not stored separately; derived |

`scope` and `name` are **separate frontmatter fields**. Do not write `name: "<scope>/<short>"` — emploke parses them independently.

## Frontmatter — Skill (`skills/<name>/SKILL.md`)

```yaml
---
name: my-skill                                  # kebab-case, matches folder
scope: langsensei                               # the catalog's scope
description: "What the skill does, one line."   # 1-1024 chars
version: 1.0.0                                  # 3-segment semver (bare or quoted)
prereqs: |                                      # OPTIONAL — keep short
  Requires: <one-line summary>. See `references/SETUP.md` for step-by-step setup.
dependencies:                                   # OPTIONAL
  skills:
    - "https://github.com/<owner>/<repo>/tree/<ref>/skills/<other-skill>"
  mcps:
    - "https://github.com/<owner>/<repo>/tree/<ref>/mcps/<file>.json"
---
# Skill body (markdown, verbatim — what the agent sees when this skill loads)
```

Required fields: `name`, `scope`, `description`, `version`.

Optional fields: `prereqs`, `dependencies.skills`, `dependencies.mcps`.

Field rules:

- `description` is one short sentence; the user sees it in install lists.
- `version` is mandatory and must be 3-segment semver; the parser accepts both `1.0.0` (bare) and `"1.0.0"` (quoted).
- `prereqs` is a YAML literal-block string. Keep it short — link to a sibling `references/SETUP.md` for the long version.
- `dependencies.skills` and `dependencies.mcps` are **arrays of bare origin URI strings**. Object form (`{origin: ...}`) is parsed but discouraged.
- Cross-catalog dependencies are allowed: any public GitHub repo URL of the form `https://github.com/<owner>/<repo>/tree/<ref>/<path>` works.

## Frontmatter — Agent (`agents/<name>/AGENTS.md`)

Same shape as Skill, with **one difference**: agents reject `prereqs`.

```yaml
---
name: my-agent
scope: langsensei
description: "What the agent does, one line."
version: 1.0.0
dependencies:
  skills:
    - "https://github.com/<owner>/<repo>/tree/<ref>/skills/git-pr"
  mcps:
    - "https://github.com/<owner>/<repo>/tree/<ref>/mcps/io.playwright_mcp.json"
---
# Agent body
```

Required fields: `name`, `scope`, `description`, `version`.

Optional fields: `dependencies.skills`, `dependencies.mcps`.

`prereqs` is **rejected** — if your agent needs setup steps, put them in the body as a `## Setup` section.

### Required body sections (agent)

Every `AGENTS.md` body must include these sections in order:

- `## Domain` — one paragraph describing what the agent does
- `## Boundary` — two bullet groups, `**In scope:**` and `**Out of scope:**`
- `## Write Access` — which paths the agent may write to (or `(none)`)
- `## Agent Playbook` — the agent's actual instructions

The display title above the frontmatter (`# {Agent Name} Agent`) is human-readable and may differ from the kebab-case `name` field.

## Frontmatter / format — MCP (`mcps/<namespace>_<short>.json`)

```json
{
  "_meta": {
    "name": "<namespace>/<short>"
  },
  "type": "stdio",
  "command": "...",
  "args": ["..."]
}
```

Required `_meta.*`:

- `_meta.name` is the MCP spec FQN. Reverse-DNS namespaces are preferred (`io.playwright/mcp`); single-segment vendor names (`acme/cli`, `azure/mcp`) are also OK.

Filename rule: the on-disk filename is `<namespace>_<short>.json` (replace `/` in the FQN with `_`). For example, the MCP whose `_meta.name` is `io.playwright/mcp` lives at `mcps/io.playwright_mcp.json`.

Other top-level fields (`type`, `command`, `args`, `env`, …) follow the [MCP client-config convention](https://modelcontextprotocol.io). Other `_meta.*` keys (e.g. registry sub-objects) survive untouched on re-write.

Files MUST be pretty-printed with 2-space indent and a trailing newline.

### MCP cross-platform rules

The MCP spec at modelcontextprotocol.io has **no** shell-style variable expansion: `command` is an executable name, `args` is an array of literal strings, `env` is an explicit map. Wrapping commands in `bash -c "..."` to get `$HOME` / `$PATH` expansion is a tempting workaround on POSIX that **breaks Windows immediately** (no `bash` on PATH; no POSIX env var names). Catalog MCP specs MUST be cross-platform.

The four rules:

1. **`command` is a bare executable name** — `npx`, `node`, `python`, `uvx`. Let the OS PATH resolve it (Windows ships `npx.cmd` shims for Node tooling; the same name works on every host). Do NOT hardcode `bash`, `/usr/bin/...`, or any other absolute interpreter.
2. **No shell wrappers** — `["bash", "-c", "..."]` and friends are forbidden. If you need command composition, write a tiny `node` script inside your MCP project and call it directly.
3. **`args` are literal strings** — no `$HOME`, no `${VAR}`, no `~/`. The MCP server receives every arg verbatim.
4. **For paths that can't be hardcoded, use placeholder substitution** (see below). emploke resolves these at provision time, before the MCP child is spawned, so the path the server sees is already absolute and platform-correct.

### Placeholder substitution

Two placeholders are supported in any string field of an MCP spec (`command`, any element of `args`, any value of `env`, plus nested strings inside any custom object you put in the spec):

| Placeholder | Resolves to | Use for |
| --- | --- | --- |
| `${workspaceDir}` | The absolute path of the active emploke workspace | State scoped to a single project (per-workspace cookies, repo-local credentials, browser login state that should reset between projects) |
| `${sharedDir}` | A stable per-machine directory (exposed to subprocesses as `$EMPLOKE_SHARED_DIR`) | State that genuinely belongs to the user account, not any single project (a global API token cache, a shared CA bundle, model weights downloaded once per machine) |

emploke substitutes both before writing `.mcp.json` to the workDir. The substituted paths use forward slashes regardless of host OS, so the same JSON value bytes ship to Windows and POSIX. A typo in a placeholder (`${workspceDir}`) is rejected at install time with a clear error — placeholders aren't silently passed through.

Pick `${sharedDir}` over `${workspaceDir}` only when the state genuinely belongs to the user account rather than the project — e.g. a model download cache or a global API token jar.

#### Example

```json
{
  "_meta": {
    "name": "io.playwright/mcp"
  },
  "type": "stdio",
  "command": "npx",
  "args": [
    "-y",
    "@playwright/mcp@latest",
    "--headless",
    "--storage-state",
    "${workspaceDir}/.playwright/storage-state.json"
  ]
}
```

## Origin URI grammar

Dependency origins (`dependencies.skills`, `dependencies.mcps`) are bare URI strings. Two schemes are accepted:

- `https://github.com/<owner>/<repo>/tree/<ref>[/path]` — recommended for shared catalog entries; supports any public GitHub repo
- `file:<absolute-path>` — local-only; never commit a `file:` origin

## CHANGELOG conventions

Every agent and skill ships a `CHANGELOG.md` next to its `AGENTS.md` / `SKILL.md`.

- Version headers use `## X.Y.Z (YYYY-MM-DD)` format. Example: `## 1.2.0 (2026-04-17)`.
- Bump guidance:
  - **patch (`X.Y.Z+1`)** — bug fixes, typos, minor edits that don't change behavior or the public surface
  - **minor (`X.Y+1.0`)** — new features, behavioral additions, new optional dependencies
  - **major (`X+1.0.0`)** — breaking changes (rename, dropping a public dependency, removing a tool, semantic change to a workflow that downstream agents rely on)
- One version bump per PR per agent/skill — do not bump version multiple times within a single PR.
- Frontmatter `version` MUST match the latest entry in `CHANGELOG.md`.
- Sections that document past renames or breaking changes are **provenance** — do not delete them when later versions move on.

## Submission flow (when publishing to a public catalog)

1. Fork the catalog repo, create a `feat/add-<my-thing>` (or other conventional-commit-prefixed) branch.
2. Add the new entry under the correct directory.
3. Verify locally — install via the emploke dashboard pointing at your fork's branch URL and exercise the entry.
4. `git push` and open a PR.
5. CI (when enabled) re-runs the upstream validators against every changed file.

## References

This skill is the agent-facing contract. Two related surfaces exist:

- **Related open spec:** [`metaagents-ai/metaagents`](https://github.com/metaagents-ai/metaagents) — the open MetaAgents reference document. Useful as background; emploke and this skill are the canonical implementation for emploke-compatible catalogs.
- **Runtime validators (deepest authority — what installs reject):** [`emploke/packages/catalog/`](https://github.com/LangSensei/emploke/tree/main/packages/catalog/src). When this skill's prose and the validators disagree, the validators win and this skill is the bug.
