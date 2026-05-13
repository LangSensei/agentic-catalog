# Changelog

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
