# Changelog

## 1.5.0 (2026-05-13)

### Changed
- **Switch all bare-repo commands from `cd "$REPO_DIR" && git …` to `git --git-dir="$REPO_DIR" …`** — defends against `safe.bareRepository=explicit` (a default in newer git installs that rejects every `git` invocation whose cwd is inside a bare repo, including the very `git worktree add` you were trying to run). The old form silently failed; the new form works on every host. Updated in Repository Setup, Mode A/B/C bash blocks, and the Worktree Cleanup section.

### Added
- New top-level **"Anti-pattern: do NOT put the worktree inside the bare clone"** section between Repository Setup and Worktree Workflow. Spells out the two failure modes (relative `repo` argument while cwd is inside the bare; using `cd` at all under `safe.bareRepository=explicit`) with explicit ✅ / ❌ command pairs, and lists the three consequences (cache pollution, sibling-cwd `git` failures, files surviving `git worktree remove`).
- Two new bullets in the Rules section: "Never `cd` into the bare clone" and "Worktree path is always `\"$WORK_DIR/repo\"` — absolute, written from the workDir; never a bare relative `repo`."
- Inline comment in the Repository Setup bash block explaining why the snippets use `git --git-dir` instead of `cd`.

Closes the skill side of #7.

## 1.4.0 (2026-05-13)

### Changed
- Drop "operation" SWAT-era vocabulary; align with emploke's terminology:
  - "subsequent operations re-fetch instead of re-cloning" → "subsequent runs re-fetch instead of re-cloning"
  - "Each operation gets its own worktree" → "Each run gets its own worktree"
  - `WORK_DIR="$(pwd)"  # operation dir` → `WORK_DIR="$(pwd)"  # workDir` (variable name unchanged; comment fixed)
  - "operation brief" → "brief" (Mode A/B decision rule)
  - "If the operation only needs to read source code" → "If the run only needs to read source code"
  - "never into the operation dir directly" → "never into the workDir directly" (Rules)
- The variable name `WORK_DIR` is intentionally preserved — it already reads as the mode-neutral term that abstracts over `session` and `task` execution modes.

## 1.3.0 (2026-05-11)

- Drop SWAT-era paths and naming. Bare clones now live under `$(repos_dir)` — resolved as `<workspace>/.repos/` when a `workspace.json` marker is found by walking up from cwd, falling back to `./.repos/` (cwd-relative) otherwise. `WORKSPACE_DIR` / `EMPLOKE_WORKSPACE` env vars override the marker walk-up.
- Replace fixed `swat/{operation-id}` branch template with descriptive conventional-commit slugs (`<type>/<slug>`, e.g. `chore/remove-deprecated-paths`). No fixed prefix; the agent names the branch based on what the PR is changing.

## 1.2.2 (2026-05-11)

- Update example `REPO_NAME` / `REPO_URL` from `swat` to `emploke` (SWAT is being deprecated; emploke is the going-forward target)

## 1.2.1 (2026-04-17)

- Fix bare clone missing refspec — add `remote.origin.fetch` config after `git clone --bare` so `git fetch --all --prune` correctly updates `origin/*` remote-tracking branches

## 1.2.0 (2026-03-23)

- Add Mode C: read-only access via `--detach` worktree (no branch created, supports concurrency)
- Replace all `master` references with `main` (default branch standardization)

## 1.1.0 (2026-03-09)

- Add Mode B: resume existing branch (for fixing review comments on open PRs)
- Worktree cleanup is now mandatory at seal time (was optional)
- Add rule: always clean up worktree at seal

## 1.0.0 (2026-03-09)

- Initial release
- Worktree-based branch workflow with `~/.swat/repos/` caching
- Conventional commits reference
- PR description template
- GitHub CLI commands
