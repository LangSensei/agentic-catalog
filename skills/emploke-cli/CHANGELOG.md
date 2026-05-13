# Changelog

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
