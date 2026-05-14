# Changelog

## 1.4.0 (2026-05-14)

### Changed
- Update env var references from `EMPLOKE_RUN_KIND/_ID/_DIR` to `EMPLOKE_WORK_KIND/_ID/_DIR` to track `LangSensei/emploke#110`.
- Update task dispatch examples and prose from `--instructions` to `--brief` (and optional `--details`) to track the CLI flag rename in `LangSensei/emploke#113`.

## 1.3.0 (2026-05-14)

### Changed
- **Drop the stale "don't use `task activity --limit 1`" anti-pattern warning** in three places (`AGENTS.md`, `references/operating-loop.md`, `references/monitoring/stuck-task-intervention.md`). The warning was true pre-emploke#104 (`--limit` returned oldest-N), but emploke#104 made the activity API tail-first, so `--limit N` now returns the LATEST N items. Replaced the "DO NOT" framing with the genuine rationale — `task show .metadata.lastActiveAtRuntime` is preferred for stuck-detection because it's a cheaper single metadata read, not because `task activity --limit 1` would give the wrong answer.
- **Add a one-line note where `--limit N` is used** (`AGENTS.md` continuous-monitoring example, `stuck-task-intervention.md` triage step) clarifying that the tail-first default is what the CEO wants for "what's happening right now?".

## 1.2.0 (2026-05-14)

### Added
- New optional dependency on the `agency-role-reference` skill (a pointer index of ~185 generic role templates from `msitarzewski/agency-agents`, MIT-licensed). CEO now consults this index as a starting point in the "Create local" branch of the hiring decision tree, then specializes the upstream template for the active mission before writing the resulting `local-agents/<name>/AGENTS.md`. Catalog stays clean (no fork of generic templates); upstream improvements flow automatically.

### Changed
- `references/hiring/decision-tree.md` step 3 (Create local) — added step 3 to consult the role library; renumbered subsequent steps.
- `references/hiring/writing-good-agent-prompts.md` — new "Before you start: check the role library" section at the top guides the drafting flow into the library first when the role is generic.

## 1.1.0 (2026-05-14)

### Changed
- `references/bootstrap.md` and `references/hiring/template-base.md` — simplify the workspace-root resolution to read `$EMPLOKE_WORKSPACE_DIR` directly instead of round-tripping through `emploke workspace show "$EMPLOKE_WORKSPACE" --json | jq -r .workdir`. The new env var ships with emploke's task/session runtime contract and is always set per-run.

## 1.0.0 (2026-05-13)

- Initial release of the workspace-ceo agent.

### What this agent is

A mission-driven CEO of an emploke workspace. Runs as a long-lived **session** (not a one-shot task), continuously monitors all dispatched subagent tasks, derives org structure from the assigned mission, hires/creates specialist agents (employees), drives missions to completion, and evolves the company over time through institutional memory.

### Marketplace artifact

```
agents/workspace-ceo/
  AGENTS.md                              # main playbook (~17KB)
  references/
    bootstrap.md                         # first-ever-session checklist
    operating-loop.md                    # tick-by-tick reference
    state-management.md                  # `.ceo/` layout + read/write conventions
    sub-agent/
      domains.md                         # 4-question domain derivation framework (no hardcoded list)
      lifecycle.md                       # draft → install → probe → hire → use → evaluate → retire/promote
    hiring/
      decision-tree.md                   # reuse > install > create
      probe-tasks.md                     # warmup task patterns by role type
      template-base.md                   # minimal frontmatter + body frame for local agents
      writing-good-agent-prompts.md      # patterns by role type, anti-patterns, iteration
    monitoring/
      stuck-task-intervention.md         # detection + triage + escalation
      mission-progress-tracking.md       # per-mission state files + rollup
    self-improvement/
      hires-evaluation.md                # data-driven hire/fire/promote
      lessons-extraction.md              # post-mortem → reusable wisdom
      playbook-distillation.md           # repeated patterns → reusable workflows
      org-evolution.md                   # split / merge / add / remove roles
      post-mortem-template.md            # structured failure analysis
    rituals/
      weekly-allhands.md                 # status report cadence
      monthly-strategy-review.md         # are we still aimed right?
      quarterly-org-rebalance.md         # major restructures
    communication/
      to-user.md                         # session terminal vs reports/
      to-subagent.md                     # task instruction discipline
      no-direct-subagent-talk.md         # subagents NEVER talk to each other
    edge-cases/
      session-restart-recovery.md        # crash + resume reconciliation
      multi-mission.md                   # parallel missions + attention allocation
      emergency-mode.md                  # mission failing badly, focus rescue
      strategic-pivot.md                 # mission itself changes
  CHANGELOG.md
```

### Key design choices

- **Mission-driven, NOT domain-templated.** CEO derives needed roles from the assigned mission using a 4-question framework (outputs / inputs / work / clusters). No fixed "engineering / writing / ops" template.
- **CEO = session (long-lived); employees = tasks (fire-and-forget).** This maps to the company metaphor: CEO is always in the office; employees are project-based.
- **Continuous monitoring, not on-demand polling.** Every tick, the CEO scans every running task, processes completions, intervenes on stuck tasks, advances missions, and (if idle) reflects to make the company stronger.
- **Persistent institutional memory** in `.ceo/` directory: strategy, org chart, decisions log (append-only), hires performance log, post-mortems, lessons, playbooks, letters to future self, reports, mission state.
- **Hard rules** prevent foot-guns:
  - One CEO per workspace; CEO never dispatches itself
  - Subagents do NOT have the `emploke-cli` skill (no recursive orchestration)
  - Subagents do NOT talk to each other directly (audit + loop prevention)
  - CEO doesn't modify its own marketplace AGENTS.md (only `.ceo/` evolves)
  - CEO doesn't control server lifecycle or touch other workspaces
- **Self-improvement mechanisms**: hires evaluation, lessons extraction, playbook distillation, org evolution, marketplace scanning, strategy review.
- **Scheduled rituals**: weekly all-hands, monthly strategy review, quarterly org rebalance.
- **Edge-case discipline**: session crash recovery, multi-mission parallelism (cap 3), emergency mode, strategic pivots.

### Dependencies

- `langsensei/emploke-cli` (skill) — required, mandatory.

### Migration provenance

New agent. No prior version.
