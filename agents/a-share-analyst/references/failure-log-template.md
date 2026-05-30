# A-Share Analyst — Failure Log (Template)

> 📌 **This is a template bundled with the marketplace agent.** On first run, a-share-analyst copies this file to `<workspace_dir>/data/a-share-analyst/failure-log.md` where it becomes the active, agent-appended working copy. **Do not edit this template directly to record real failures** — they go into the workspace copy.

**Bootstrap status:** 📂 Empty — no entries yet. Agent is in bootstrap phase.
**Created:** copy timestamp set on first run (v1.10.0+)
**Updated by:** agent (auto-append on 持仓复核 / portfolio synthesis triggers) + operator (on hindsight feedback)

---

## Purpose

This file is the agent's persistent memory of past misjudgments. Every new individual stock analysis and 持仓复核 must read this file and check for applicable failure patterns before finalizing recommendations.

## Entry Format

Each entry follows this template (newest at top):

    ## YYYY-MM-DD · <stock_code> <stock_name>
    - **Original recommendation:** (date, action [hold/add/reduce], price levels, key thesis in 1 sentence)
    - **What actually happened:** (price evolution, fundamental evolution, time elapsed since original recommendation)
    - **What I got wrong:** (be specific — wrong step, wrong assumption, wrong weighting; not just "市场不及预期")
    - **Which playbook step failed:** (Step 3 technical / Step 4 fundamental / Step 5 moat / Step 6 decision / Sell Decision Framework / Devil's Advocate)
    - **Pattern category:** (e.g. "高 ROE 假象", "估值陷阱", "moat 误判", "技术信号过度信赖", "行业周期顶部误判")
    - **Rule update suggested:** (if pattern recurring, propose a permanent checklist item)

## Promotion Trigger

When this log accumulates **≥10 entries**, the agent should:
1. Group entries by `Pattern category`
2. Identify categories with ≥3 entries (recurring failure modes)
3. Propose to the operator: "建议将 <category> 模式提升为 agent 永久规则,以下是建议的 checklist 文本: ..."
4. After operator approval, the rule should be added to AGENTS.md (next agent version bump) and migrated from log to permanent rules

## When to Append

| Trigger | Source |
|---|---|
| Prior add/reduce trigger condition fired prematurely or never fired when it should have | 持仓复核 review step 7 |
| Holding underperformed prior 6-month outlook by >15% | Portfolio synthesis step 4 |
| Operator explicitly flags a past recommendation as wrong in hindsight | User feedback |
| Agent self-identifies a thesis-invalidating event for a covered stock | Any analysis step |

## When NOT to Append

- Single-week noise / normal volatility within 1σ band
- Macro events that affected the whole market equally (not a stock-specific failure)
- Price moves where the original thesis explicitly accounted for the scenario (no error, just bad luck)

---

## Entries

*(No entries yet. First entry will appear here after the first 持仓复核 or portfolio synthesis identifies a miscalibration.)*
