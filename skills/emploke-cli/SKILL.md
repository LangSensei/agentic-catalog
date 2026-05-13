---
name: emploke-cli
scope: langsensei
description: "Control an emploke server from the CLI — workspaces, agents, tasks, sessions, catalog"
version: 1.0.0
prereqs: |
  Requires the `emploke` CLI on PATH and a running emploke server (`emploke start`).
  Set `EMPLOKE_WORKSPACE=<id>` before any workspace-scoped command — `workspace use` was removed.
---

# emploke-cli skill

You're an AI controlling an emploke server through its CLI. This skill teaches you the **conventions that aren't obvious from `--help`** — most importantly the workspace-scoping discipline that prevents your commands from racing with other clients.

## When to use

- Dispatching a task to an emploke agent
- Installing / syncing / enabling an agent or skill
- Inspecting a task's progress (one-shot or live tail)
- Managing workspaces, sessions, MCP catalog entries

If the user just wants you to read repo files or run shell commands, this skill is irrelevant.

## Setup (do once per shell session)

```sh
emploke health                                # confirm server is up (exit 0 + JSON `ok`)
emploke workspace list --json                 # find or note the workspace id you'll work in
export EMPLOKE_WORKSPACE=<id-from-above>      # MANDATORY — see "Workspace discipline" below
```

If `emploke health` fails with `server unreachable`, ask the user to run `emploke start` (or pass `--server http://...` if they're pointing at a remote one).

## Workspace discipline (read this carefully)

**Every workspace-scoped command requires an explicit selector.** The CLI will refuse with exit 1 + a usage error if it can't find one.

✅ **Two valid sources** (both process-local, race-free):

```sh
# (a) per-command flag
emploke task dispatch --workspace ws-X --agent writer --instructions "..."

# (b) shell-session env (preferred for long sessions)
export EMPLOKE_WORKSPACE=ws-X
emploke task dispatch --agent writer --instructions "..."
```

❌ **Do NOT do this:**

```sh
emploke workspace use ws-X            # REMOVED — exits 2 with a redirection message
emploke task dispatch ...             # would race with other clients if it worked
```

**Why this matters for you specifically.** The server's "current workspace" was a single shared variable across every CLI process, every dashboard tab, every other AI agent connected to the same emploke server. If you set it, then a human switched it via dashboard, your next command would silently target the wrong workspace. The CLI no longer reads that variable. Pass `--workspace` or set the env, every time.

If you create a new workspace mid-task, **immediately update your env**:

```sh
NEW_WS=$(emploke workspace add --name "..." --workdir "..." --json | jq -r .id)
export EMPLOKE_WORKSPACE="$NEW_WS"
```

## Output discipline

- **For parsing, always pass `--json`.** Human format is not a stable contract.
- **For streaming activity, pipe through `jq -c`** to keep one event per line.
- **Read `code` in error stderr**, not just the message. Errors look like:
  ```
  agent "writer" is not ready: prereqs not acknowledged (HTTP 409, EntryNotReadyError)
    agent: langsensei/writer
    cause: prereqs not acknowledged
    fix:   emploke catalog agent ack-prereqs langsensei/writer
  ```
  The `fix:` line is your next command, verbatim. See `references/error-codes.md` for the full table.

## Common workflows

Detailed playbooks live in `references/workflows.md`. Quick index:

- **Install an agent and make sure it's ready to dispatch** — handles `prereqs not acknowledged`, `disabled by user`, missing dependencies.
- **Dispatch a task and wait for completion** — covers the `EntryNotReadyError` retry loop.
- **Monitor a long-running task** — one-shot history, live tail, resume after Ctrl+C.
- **Sync (re-resolve) an installed entry against its upstream origin** — preview-then-apply with `planToken`.
- **Clean up failed / stale tasks** — list, filter, archive vs purge.
- **Set up a fresh workspace with a standard agent set** — atomic onboarding script.
- **Create a local agent on the fly** — write `AGENTS.md`, `catalog agent install file://...`, dispatch.

## Exit codes

| code | meaning | what to do |
|---|---|---|
| 0 | success | continue |
| 1 | generic error (incl. missing workspace) | read stderr; usually missing flag/env |
| 2 | usage error (missing required flag, removed subcommand) | fix the invocation; do not retry as-is |
| 3 | server unreachable | ask user to `emploke start` or check `--server` |
| 4 | server returned 4xx/5xx | read `code` in stderr; consult `references/error-codes.md` |

Exit code 2 means **"the command itself is wrong"** — never retry it without changing the invocation. Exit code 4 means "the server rejected this" — read the `code` field, it tells you the next move.

## Anti-patterns

- **Don't poll without backoff.** `while true; do emploke task list; done` is wrong. If you need to wait for a task, use `emploke task activity <tid> --follow` (real-time SSE) instead of polling `task list`.
- **Don't use `--follow` for one-shot data.** `--follow` blocks until the task terminates. For "what's the latest activity right now?" use `emploke task activity <tid>` (no `--follow`) and read the JSON.
- **Don't `--purge` casually.** Default `task rm` (no flag) cancels the running subprocess + removes the metadata row, but **keeps the workdir + runtime per-task state on disk** for post-mortem (`stderr.log`, etc). `task rm --purge` additionally removes those — use only after you're sure you don't need the post-mortem material.
- **Don't ignore `last seq:` on stderr** when streaming. If `--follow` exits non-zero, the stderr's last line is `last seq: <N>` — pass `--cursor <N>` to the next `--follow` invocation to resume without gaps or duplicates.
- **Don't construct workspace ids from the dashboard URL.** Always `emploke workspace list --json | jq` to get a current id.

## Common SSE resume pattern

```sh
# History-then-tail (combines snapshot with live)
N=$(emploke task activity <tid> --json | jq -r '.cursor')
emploke task activity <tid> --follow --cursor "$N" | jq -c

# Resume after Ctrl+C / disconnect
# (stderr's last line on a clean --follow exit is `last seq: <N>`)
emploke task activity <tid> --follow --cursor <N> | jq -c
```

## What this skill is NOT

- **Not a substitute for `--help`.** Concrete flag lists / new subcommands change with releases; consult `emploke <cmd> --help` for the canonical surface.
- **Not a server admin guide.** This skill assumes the server is running and configured. Service lifecycle (`emploke start / stop / restart / serve`) is a separate concern.
- **Not for emploke-runtime-internal agents that already have workspace scope.** If you're an agent already running inside an emploke task runtime where the host has wired up `EMPLOKE_WORKSPACE` for you, you can skip the workspace-discovery step in setup.

## See also

- `references/workflows.md` — multi-step playbooks for the common goals
- `references/error-codes.md` — every `code` value the server emits + the matching `emploke` command to fix it
