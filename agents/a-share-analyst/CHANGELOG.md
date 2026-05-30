# Changelog

## 1.10.0 (2026-05-30)

Self-awareness and epistemic-honesty layer, inspired by `leslieyeo/serenity-reply` skill craft (four-tier evidence layering, self-doubt rituals, insight-exclusivity calibration, perishable-data isolation, failure-log loop). Designed to prevent the agent from producing reports that "look uniformly hard" when they actually mix hard data with subjective judgment.

### Added
- **Evidence Tiering section** — every analytical claim must be tagged `[L1]` (filings), `[L2]` (cross-sectional inference), `[L3]` (model extrapolation), or `[L4]` (subjective). Recommendation strength must match the dominant tier; reports must include evidence-mix distribution. (Inspired by serenity-reply's four-tier directness scale)
- **Evidence Independence Self-Check (Gate 2)** — companion to Evidence Tiering. Counts truly independent sources behind each thesis (filings + Wind + sell-side reports citing same channel check = 1 source, not 3). Single-source theses cannot be marked "high conviction". Guards against data-homogeneity illusion endemic to A-share research ecosystem. (Inspired by serenity-reply's Gate 2 "独立证据 vs 自我宣称" self-check)
- **Self-Doubt Section** — every individual stock and holding-review report must end with mandatory "我没想清楚的 3 件事" listing 3 concrete uncertainties, each tagged **[影响推荐]** or **[仅影响置信度]**. Generic disclaimers are explicitly forbidden. (Inspired by serenity-reply's "我自己也没想清楚的" reflection)
- **Insight Exclusivity Calibration** (inside Moat Assessment step 5) — each moat insight tagged 🌍 Generic / 🏭 Industry-shared / 🎯 Operator-exclusive. Reports where all insights are Generic must flag "no exclusive information edge". Operator-exclusive insights require domain justification and only apply when the operator profile explicitly identifies a relevant domain. (Inspired by serenity-reply's model exclusivity calibration)
- **Supply-chain chokepoint** added as a recognized moat type alongside brand/cost/switching costs/network effect/scale
- **Macro Context Bootstrap** in Data Sourcing Strategy — agent reads `<workspace_dir>/data/a-share-analyst/macro-pulse.md` before any analysis to inject current macro context. Bootstrap protocol auto-initializes the file from the bundled template on first run. Staleness >60 days or many unfilled `<TODO>` fields trigger explicit warnings in the report. (Inspired by serenity-reply's perishable-data isolation pattern via `references/market-pulse.md`)
- **Failure Log Protocol section** — agent maintains workspace-persistent `failure-log.md` recording past misjudgments. New analyses must check the log for applicable patterns. Auto-initialized from bundled skeleton on first run. Entries triggered by miscalibrated trigger conditions, underperformance >15% vs outlook, or explicit operator feedback. After ≥10 entries, recurring patterns are proposed for promotion to permanent checklist items.
- **High-Risk Query Refusal Protocol** (new top-level section) — agent refuses to engage with queries involving 梭哈 / 全仓 / 借钱买股 / 加杠杆 / 卖房买股 / 把养老金投入 etc. Switches out of analyst voice into plain risk-warning voice, offers risk-bounded alternative analyses (e.g., "5% / 10% / 20% 仓位下的 risk-reward profile"). (Inspired by serenity-reply's high-risk-query exit-from-persona protocol)
- **Honest Boundaries section** — every analysis must include a "诚实边界" closing block citing the limitations that actually apply (insider data lag, small-cap liquidity trap, no on-the-ground access, known data-source bugs, sample bias toward large-cap, macro-pulse staleness dependency, no backtesting, no alt-data, final responsibility on operator). Cite only the relevant ones, not all 9 by rote. (Inspired by serenity-reply's "诚实边界" / agent-level limitations disclosure)
- New file: `references/macro-pulse.md` — bundled template, copied to workspace on first run
- New file: `references/failure-log-template.md` — bundled skeleton, copied to workspace on first run

### Workspace state
- Two active files are now persisted per workspace at `<workspace_dir>/data/a-share-analyst/`:
  - `macro-pulse.md` — operator-maintained macro snapshot (monthly update cadence)
  - `failure-log.md` — agent-appended record of past misjudgments

### Changed
- (none — all changes are additive; existing rules and workflows unchanged)

### Not Changed
- Investment Philosophy Constraints, Sell Decision Framework, Devil's Advocate Step — these v1.4.0 mechanisms remain authoritative
- Conviction-Weighted Concentration Thresholds — unchanged
- All four workflow types (Individual Stock / Holding Review / ETF / Portfolio Synthesis) — playbook steps untouched; new sections layered on top
- Dependencies, Data Sourcing priority order, Boundary, Write Access

## 1.9.0 (2026-05-13)

### Changed
- Drop "operation" SWAT-era vocabulary; align with emploke's terminology:
  - "operation directory" → "workDir" (mode-neutral term for the directory the agent is currently running in — covers both `session` and `task` execution modes)
  - "prior operations" / "previous operation" / "operation reports" / "operation data" / "holding review operations" → "prior runs" / "previous run" / "run reports" / "run data" / "holding review runs"
- Drop stale `OPERATION.md` references in the Holding Review and Portfolio Synthesis workflows. `OPERATION.md` was a SWAT-runtime artifact that emploke never produces. The workflow now reads prior runs' `report.html` and any summary the brief explicitly references.

## 1.8.0 (2026-05-13)

### Changed
- Drop "Squad" terminology from prose: `# A-Share Analyst Squad` → `# A-Share Analyst Agent`, `## Squad Playbook` → `## Agent Playbook`, body references to "the squad" / "Squad Playbook" → "the agent" / "Agent Playbook". Closes #5.

## 1.7.0 (2026-05-11)

### Removed
- `scientific-method` skill dependency — methodology skills are being redesigned and are no longer a hard dependency for this squad

## 1.6.0 (2026-04-17)

### Added
- `sector-equity-scoring` skill dependency — percentile-based equity scoring methodology with 18-indicator system and V2 cap rules

## 1.5.0 (2026-04-12)

### Changed
- Add `scientific-method` skill dependency
- Remove Output Schema section

## 1.4.0 (2026-04-02)

Investment philosophy alignment and sell-side logic improvements based on user feedback from portfolio review operations.

### Added
- **Investment Philosophy Constraints section** — 5 explicit rules encoding Buffett value-investing philosophy. Overrides any individual analysis: no selling fundamentally sound holdings on position weight alone, no loss-selling on technicals alone, mandatory Devil's Advocate for all reduce recommendations. (Evidence: mechanical reductions triggered despite improving technicals in multiple consecutive operations)
- **Sell Decision Framework section** — two-path decision tree distinguishing profit-taking (Path A) from loss-cutting (Path B). Path B requires fundamental deterioration or stop-loss trigger, not technical signals. Includes explicit "justified" and "NOT justified" criteria for each path. (Evidence: same logic was applied to profitable and unprofitable positions in v1.3.0)
- **Conviction-Weighted Concentration Thresholds** — replaces hard-coded 25% single-stock cap. Thresholds scale with moat rating: 50% for 5-star moat, 40% for 4-star, 30% for 3-star, 25% for 2-star, 15% for 1-star. Exceeding threshold is informational, not a sell trigger. (Evidence: Buffett held Apple at 49% of portfolio; fixed 25% cap from v1.3.0 was too rigid)
- **Devil's Advocate Step** — mandatory for all reduce recommendations across all workflows. Must list 3+ reasons NOT to sell, assign strength scores, and provide explicit verdict. If hold thesis is stronger, recommendation must change to hold. (Evidence: prior operations had one-directional analysis with no counter-arguments)
- Sell framework integration in Individual Stock (step 6), Holding Review (step 8), ETF Analysis (step 8), and Portfolio Synthesis (steps 4-5) workflows
- Report guidance updated to include sell path classification, Devil's Advocate analysis, and conviction-weighted threshold checks for reduce recommendations

### Changed
- Portfolio Synthesis step 4: "flag single-stock >25%, single-sector >40%" → conviction-weighted threshold assessment with dynamic limits per moat rating
- Portfolio Synthesis step 5: "Rebalancing ideas (reduce overweight sectors)" → Sell Decision Framework application with independent sell condition requirement
- Sector concentration limit: fixed 40% → dynamic 50% (if all holdings ★★★★+) / 40% (otherwise)

### Not Changed
- Domain, Boundary, Dependencies — no reason to modify
- Data Sourcing Strategy, General Rules (except new philosophy constraints added as separate section)
- Individual Stock, Holding Review, ETF Analysis core workflows — framework integrated as additions, not replacements
- Output Schema — no new fields needed

## 1.3.0 (2026-03-25)

Evidence-based playbook optimization from 33 completed operations analysis (squad-distill operation 20260325-e29e01d6).

### Added
- **Holding Review / Tracking (持仓复核) workflow** — new playbook section formalizing the 8-step workflow used in 14 out of 33 operations (42% of all ops). Includes prior context loading, P&L calculation with transaction costs, trigger condition checking, and support/resistance recalibration. (Evidence: ops 20260315-f0050543 through 20260325-ecba6dd0)
- **Data Sourcing Strategy section** — documents the proven fallback chain: sina-quote → yfinance → eastmoney. Includes bank PE/PB scaling fix and HK stock code format. (Evidence: ×11 INTEL entry "eastmoney API在本环境可低频单标访问", confirmed across all 33 ops)
- **P&L tracking with transaction costs** in both Individual Stock and Holding Review sections — 万一佣金 (min ¥5) + 千一印花税. (Evidence: consistently computed in all holding review ops)
- **Cost basis verification** step in Portfolio Synthesis — prevents distorted P&L from inconsistent cost data. (Evidence: ×1 INTEL "组合调仓前必须核对成本口径")
- **Portfolio concentration thresholds** — flag single-stock >25%, single-sector >40%. (Evidence: ×1 INTEL "仓位管理原则", validated in portfolio ops)
- Insurance-specific P/EV guidance in fundamentals. (Evidence: ×1 INTEL "保险股复核需补充P/EV口径")
- ETF "core holdings" outlier-exclusion metric. (Evidence: ×1 INTEL "港股ETF估值应同时给核心权重口径")

### Changed
- K-line fetch period: 120 days → 240 trading days (~1 year) to match actual practice (Evidence: all 33 ops fetch ~242 days via yfinance)
- `python` → `python3` in General Rules (Evidence: every operation requires `python3`, `python` is not available)
- Data sourcing: "Use eastmoney-data skill APIs" → tiered fallback strategy (Evidence: eastmoney fails on batch requests in 100% of operations)
- Report description: removed "price chart with key indicators" — reports are now structured text/tables HTML (15-32KB) instead of chart-embedded (500KB-1.1MB). (Evidence: report size evolution across 33 ops)
- Portfolio Synthesis: added "Refresh prices only" step — reuse prior operation data instead of re-running analyses. (Evidence: ×3 INTEL "组合综合分析复用已完成操作报告")
- Output Schema: added explicit "at seal time" instruction and guidance for portfolio operations. (Evidence: 0/33 operations filled schema fields — now more actionable)
- Screening section: marked as optional — 0 operations used it across 33 completed ops
- ETF price data: changed from "eastmoney-data K-line API" to "sina-quote for real-time; yfinance for K-line"

### Not Changed
- Domain, Boundary, Dependencies — no evidence-based reason to modify
- Output Schema fields — kept as-is but added clearer filling instructions

## 1.2.0 (2026-03-09)

- Standardize to TEMPLATE format (In scope/Out of scope, human-readable title)
- Remove PROTOCOL-redundant content (seal steps, report generation, Write Access duplication)
- Output Schema: squad-specific fields (stock_code, stock_name, pe_ttm, pb, roe, moat_rating, recommendation)
- Report content described inline instead of as separate generation steps

## 1.1.0 (2026-03-09)

- Add ETF/fund analysis playbook (holdings decomposition, weighted PE/PB/ROE, sector assessment)
- Add moat assessment and valuation depth analysis (historical percentile, sector comparison)
- Add decision recommendations (hold/add/reduce with reasoning)
- Add portfolio synthesis task (multi-operation report aggregation, rebalancing suggestions)
- Add cost basis P&L analysis for holdings with cost data
- New dependencies: fund-holdings, sina-quote

## 1.0.0 (2026-03-08)

- Initial release
- A-share stock analysis squad (technical + fundamental)
- Depends on eastmoney-data skill for market data
- Supports: single stock analysis, peer comparison, screening
