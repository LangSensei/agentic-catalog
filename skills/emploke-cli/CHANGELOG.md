# Changelog

## 1.2.0 (2026-05-14)

### Changed
- **Drop the `prereqs:` block entirely.** emploke's runtime contract (shipped in emploke#100) auto-injects `EMPLOKE_SERVER` and `EMPLOKE_WORKSPACE` into every spawned task / session, so the agent inherits a server URL and workspace scope without doing anything. The previous prereqs ("CLI on PATH", "running server", "set EMPLOKE_WORKSPACE") were redundant in the in-emploke case (the skill's primary audience) and the workspace-set instruction was actively misleading — agents reading it would overwrite the value emploke already set.
- **Rewrite the "Setup" section** to assume the in-emploke default. Previous version walked through `emploke health` + `workspace list --json` + `export EMPLOKE_WORKSPACE` — all of which the agent doesn't need when emploke has already set up the env. New version: list the env vars emploke injects, plus a one-line health check.
- **Simplify "Workspace discipline"** to acknowledge the inherited `EMPLOKE_WORKSPACE`. The discipline rule (every workspace-scoped command needs an explicit selector) is unchanged — env-inherited counts as "explicit". Dropped the "(a) per-command flag / (b) shell-session env" example block (b is the default now) and the "If you create a new workspace mid-task" niche guidance.
- **Drop the bottom "Not for emploke-runtime-internal agents" exception note.** With the in-emploke default, the exception is the rule.

## 1.1.0 (2026-05-14)

### Changed
- `references/workflows.md`: simplify the "Author and install a local agent" recipe to read `$EMPLOKE_WORKSPACE_DIR` directly instead of round-tripping through `emploke workspace show "$EMPLOKE_WORKSPACE" --json | jq -r .workdir`. The env var ships with emploke's task/session runtime contract and is always set per-run.
- Strip historical / migration / compatibility narrative from `SKILL.md` (prereqs note, "Why this matters for you specifically" paragraph, "❌ Do NOT do this" sample). Marketplace content is provisioned into a clean runtime context every spawn — agents only need correct forward instructions.

## 1.0.0 (2026-05-13)

- Initial release.
- Teaches AI agents how to control an emploke server through the `emploke` CLI:
  - **Workspace discipline** — never use `workspace use` (removed); always pass `--workspace` or set `EMPLOKE_WORKSPACE`. Explains why (race-prone shared mutable server state).
  - **Output discipline** — always `--json` for parsing, `| jq -c` for streams.
  - **Error envelope** — read `code` not just the message; `EntryNotReadyError` carries structured CTAs the CLI renders inline.
  - **Exit codes** — what 0/1/2/3/4 mean and when retrying makes sense.
  - **SSE resume** — `--cursor` + `last seq:` stderr hint.
  - **Anti-patterns** — no busy-poll on `task list`, no `--follow` for one-shot data, etc.
- `references/workflows.md` — copy-paste-ready playbooks for: install agent, dispatch task, monitor task (one-shot / live tail / resume), sync entry, clean up tasks, set up a fresh workspace, **create a local agent on the fly**.
- `references/error-codes.md` — every `code` value the server can emit + the matching `emploke` command to fix it; `EntryNotReadyError` `reason` field cheat-sheet.
