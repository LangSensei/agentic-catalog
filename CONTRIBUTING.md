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
    - "https://github.com/LangSensei/emploke-marketplace/tree/main/skills/git-pr"
  mcps:
    - "https://github.com/LangSensei/emploke-marketplace/tree/main/mcps/io.playwright_mcp.json"
---
# Agent body
```

Authoritative validator: [`packages/catalog/src/agent/agent-frontmatter.ts`](https://github.com/LangSensei/emploke/blob/main/packages/catalog/src/agent/agent-frontmatter.ts).

## MCP — `mcps/<namespace>_<short>.json`

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

Rules:

- `_meta.name` is the MCP spec FQN. Reverse-DNS namespaces are preferred (`io.playwright/mcp`); single-segment vendor names (`acme/cli`, `azure/mcp`) are also OK.
- The on-disk filename is `<namespace>_<short>.json` (replace `/` in the FQN with `_`).
- **Do NOT write `_meta.origin`.** Install origin is an install-time fact (the URI emploke fetched from) and lives on the catalog row in the registry, not in the file. The validator ignores any `_meta.origin` it finds (legacy installs, third-party tooling) but authors should not add it. See [`packages/catalog/src/mcp/mcp-format.ts`](https://github.com/LangSensei/emploke/blob/main/packages/catalog/src/mcp/mcp-format.ts) for the rationale.
- Other fields (`type`, `command`, `args`, `env`, …) follow the MCP client-config convention.
- Pretty-print with 2-space indent and a trailing newline.
- Other `_meta.*` keys (e.g. registry sub-objects) survive untouched on re-write.

### Cross-platform rules

The MCP spec at modelcontextprotocol.io has **no** shell-style variable
expansion: `command` is an executable name, `args` is an array of literal
strings, `env` is an explicit map. Wrapping commands in `bash -c "..."`
to get `$HOME` / `$PATH` expansion is a tempting workaround on POSIX
that **breaks Windows immediately** (no `bash` on PATH; no POSIX env
var names). MCP specs in this marketplace MUST be cross-platform.

The four rules:

1. **`command` is a bare executable name** — `npx`, `node`, `python`,
   `uvx`. Let the OS PATH resolve it (Windows ships `npx.cmd` shims for
   Node tooling; the same name works on every host). Do NOT hardcode
   `bash`, `/usr/bin/...`, or any other absolute interpreter.
2. **No shell wrappers** — `["bash", "-c", "..."]` and friends are
   forbidden. If you need command composition, write a tiny `node`
   script inside your MCP project and call it directly.
3. **`args` are literal strings** — no `$HOME`, no `${VAR}`, no `~/`.
   The MCP server receives every arg verbatim.
4. **For paths that can't be hardcoded, use emploke's placeholder
   substitution** (see below). emploke resolves these at provision
   time, before the MCP child is spawned, so the path the server sees
   is already absolute and platform-correct.

### emploke placeholder substitution

Two placeholders are supported in any string field of an MCP spec
(`command`, any element of `args`, any value of `env`, plus nested
strings inside any custom object you put in the spec):

| Placeholder        | Resolves to                                                                 | Use for                                                          |
| ------------------ | --------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `${workspaceDir}`  | The absolute path of the active emploke workspace.                           | State scoped to a single project (per-workspace cookies, repo-local credentials, browser login state that should reset between projects). |
| `${sharedDir}`     | A stable per-machine directory (`<EMPLOKE_HOME>/shared` by default; exposed to subprocesses as `$EMPLOKE_SHARED_DIR`). | State that genuinely belongs to the user account, not any single project (a global API token cache, a shared CA bundle, model weights downloaded once per machine). |

emploke substitutes both before writing `.mcp.json` to the session/task
workdir. The substituted paths use forward slashes regardless of host
OS, so the same JSON value bytes ship to Windows and POSIX. A typo in
a placeholder (`${workspceDir}`) is rejected at install time with a
clear error — placeholders aren't silently passed through.

Example — playwright with a per-workspace login state file (matches what `mcps/io.playwright_mcp.json` ships):

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

Pick `${sharedDir}` over `${workspaceDir}` only when the state genuinely belongs to the user account rather than the project — e.g. a model download cache or a global API token jar.

Authoritative validator: [`packages/catalog/src/mcp/mcp-format.ts`](https://github.com/LangSensei/emploke/blob/main/packages/catalog/src/mcp/mcp-format.ts).

## Workspace path conventions for scripts

Skills and agents that ship executable scripts (`scripts/*.js`, `scripts/*.py`, inline `bash` recipes in `SKILL.md` / `AGENTS.md`) often need to resolve paths inside the active workspace — typically `<workspace>/.playwright/storage-state.json`, `<workspace>/.repos/`, `<workspace>/.ceo/`, and similar.

**The contract**: emploke's task / session runtime injects a fixed set of `EMPLOKE_*` env vars into every spawned subprocess. See [`docs/architecture.md` → "Runtime env contract"](https://github.com/LangSensei/emploke/blob/main/docs/architecture.md) for the authoritative list. The ones a marketplace script will normally care about:

| Env var                  | Set when                       | Meaning                                                       |
| ------------------------ | ------------------------------ | ------------------------------------------------------------- |
| `EMPLOKE_WORKSPACE_DIR`  | inside any emploke task/session | Absolute path to the active workspace root.                   |
| `EMPLOKE_SHARED_DIR`     | inside any emploke task/session | Per-machine shared dir (same path the MCP `${sharedDir}` placeholder resolves to). |
| `EMPLOKE_WORKSPACE`      | inside any emploke task/session | Workspace UUID (routing key for `emploke ... --workspace <id>`). |
| `EMPLOKE_RUN_KIND`       | inside any emploke task/session | `"task"` or `"session"`.                                      |
| `EMPLOKE_RUN_ID`         | inside any emploke task/session | The task / session id.                                        |
| `EMPLOKE_RUN_DIR`        | inside any emploke task/session | The spawned process's `cwd`.                                  |

**The convention**: scripts that need a workspace-scoped path should read `EMPLOKE_WORKSPACE_DIR` from env, with `cwd` as the only fallback. Inline, that's one line per language:

```js
// node
const workspaceDir = process.env.EMPLOKE_WORKSPACE_DIR || process.cwd();
```

```python
# python
workspace_dir = os.environ.get("EMPLOKE_WORKSPACE_DIR") or os.getcwd()
```

```bash
# bash
workspace_dir="${EMPLOKE_WORKSPACE_DIR:-$(pwd)}"
```

The `cwd` fallback supports manual debugging (`cd <workspace> && node scripts/auth.js`). Inside an emploke run the env var is always set, so the fallback path is never taken.

**Anti-patterns** (do NOT do these):

- ❌ **Using `$EMPLOKE_WORKSPACE` as a path.** That env var is the workspace UUID (a routing key), not a filesystem path. Past skills hit this bug and produced relative paths like `fe751922-.../.playwright/storage-state.json` that never exist on disk.
- ❌ **Walking up from `cwd` looking for a `workspace.json` marker.** emploke does not write any marker file at the workspace root; this dance is pure cargo-cult.
- ❌ **Reading `$EMPLOKE_HOME`** from a skill/agent script. That's emploke's own service-internal directory (holds `global.db`, `runtime.json`, server logs). It is deliberately scrubbed from the task path so agents can't accidentally corrupt it. Use `$EMPLOKE_SHARED_DIR` if you need a machine-shared writable directory.

**MCP specs** use the `${workspaceDir}` / `${sharedDir}` placeholders described in the MCP section above — different mechanism (string substitution at provision time), same underlying intent.

## Naming rules

| Field | Grammar |
| --- | --- |
| `name` (short) | `^[a-z0-9]+(-[a-z0-9]+)*$`, ≤ 64 chars, no `/` |
| `scope` | `^[a-z0-9]+(-[a-z0-9]+)*(\.[a-z0-9]+(-[a-z0-9]+)*)*$`, ≤ 64 chars (reverse-DNS allowed) |
| FQN | computed as `<scope>/<name>` |

Authoritative validator: [`packages/catalog/src/skill/validate.ts`](https://github.com/LangSensei/emploke/blob/main/packages/catalog/src/skill/validate.ts).

## Origin URI grammar

Dependency origins (`dependencies.skills`, `dependencies.mcps`) are bare URI strings. Two schemes are accepted in Phase 2:

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
