# A-Share Macro Pulse — Template

> 📌 **This is a template bundled with the marketplace agent.** On first run, a-share-analyst copies this file to `<workspace_dir>/data/a-share-analyst/macro-pulse.md` where it becomes the active, operator-maintained working copy. **Do not edit this template directly to record real macro data** — edit the workspace copy.

**Last updated:** YYYY-MM-DD (set on first copy)
**Update frequency:** monthly, or on major macro event (rate change, RRR cut, major policy)
**Maintained by:** operator + agent may suggest updates after large macro moves
**Staleness rule:** If `Last updated` is >60 days old, agent flags warning in report header

> 📌 **使用说明**: 这是 a-share-analyst 在每次跑分析前必读的宏观语境文件(workspace 副本)。所有具体数字字段标注为 `<TODO:填写>` 的位置,需要操作员定期(月度或重大事件后)更新。不要让 agent 自己拍数字 — 数字必须是操作员 verify 过的最新公开数据,否则宁可留 TODO。

---

## 1. Interest Rate Environment

- **1-year LPR**: `<TODO:填写当前值>` (last change: `<TODO:日期>`, direction: `<降息 / 加息 / 持平>`)
- **5-year LPR**: `<TODO:填写当前值>`
- **7-day reverse repo (OMO)**: `<TODO:填写>`
- **10-year 国债收益率**: `<TODO:填写>`
- **Trend (近 6 个月)**: `<降息周期 / 加息周期 / 中性观察>`
- **Implication for equity valuation**: <一句话,例如 "利率下行 → 高股息板块吸引力上升,成长股 PE 容忍度温和提升,但需警惕地产/银行净息差被进一步压缩">

## 2. RRR / Liquidity

- **大行 RRR**: `<TODO:填写当前%>` (last RRR change: `<TODO:日期+方向>`)
- **中小行 RRR**: `<TODO:填写>`
- **M2 YoY**: `<TODO:填写%>`
- **社融存量同比**: `<TODO:填写%>`
- **Implication**: <例如 "M2 增速 X% > 名义 GDP 增速 Y%,流动性宽松,有利金融板块和高 beta 资产">

## 3. Policy Themes (Current 6-Month Window)

> 列出当前 6 个月窗口内最重要的 3-5 个政策主题,标注受益/受损板块。每个主题更新时附"发布日期"。

| 主题 | 发布日期 | 一句话 | 受益板块 | 受损板块 |
|---|---|---|---|---|
| `<TODO:主题 1>` | YYYY-MM-DD | ... | ... | ... |
| `<TODO:主题 2>` | YYYY-MM-DD | ... | ... | ... |

## 4. USD/CNY 汇率

- **当前**: `<TODO:6.xx 或 7.xx>`
- **近 3 个月趋势**: `<升值 / 贬值 / 震荡>`
- **CFETS 一篮子指数**: `<TODO:填写>` (近 3 个月趋势: ...)
- **Implication**: <例如 "人民币贬值 → 利好出口链 (纺织/电子组装/家电/汽车零部件),利空进口依赖 (航空/化工原料/部分医药)">

## 5. North-Bound Capital (北上资金)

- **30-day net flow**: `<TODO:¥xxx 亿>`
- **Top 3 added sectors**: `<TODO>`
- **Top 3 reduced sectors**: `<TODO>`
- **Implication**: <一句话外资 risk-on/off 解读>

## 6. A-Share Overall Valuation

| 指数 | PE (TTM) | 近 10 年百分位 | PB | 近 10 年百分位 |
|---|---|---|---|---|
| 上证综指 | `<TODO>` | `<TODO%>` | `<TODO>` | `<TODO%>` |
| 沪深 300 | `<TODO>` | `<TODO%>` | `<TODO>` | `<TODO%>` |
| 中证 500 | `<TODO>` | `<TODO%>` | `<TODO>` | `<TODO%>` |
| 中证 1000 | `<TODO>` | `<TODO%>` | `<TODO>` | `<TODO%>` |
| 创业板指 | `<TODO>` | `<TODO%>` | `<TODO>` | `<TODO%>` |

**总体判断**: `<整体便宜 / 中位 / 偏贵>` — <一句话理由>

## 7. Sector Themes — Embrace / Avoid (本期 6 个月窗口)

### ✅ Embrace (操作员认为应配置 / 重点关注)
- `<板块>`: <一句话理由>
- ...

### 🚫 Avoid (操作员认为应回避 / 不新增)
- `<板块>`: <一句话理由>
- ...

### ⚖️ Neutral / Watch List (有催化剂可能切换)
- `<板块>`: <切换条件>
- ...

## 8. Operator Insider Channels (Optional)

> 此段用于操作员从特定产业内部获得的非公开信号。仅在操作员有相关产业背景时使用。若操作员有 textile-printing-and-dyeing 背景,可在此填写印染产业链信号 (active dye / disperse dye / 染助剂价格、印染厂开工率、出口订单、环保限产、产能扩张等),供 agent 在分析纺织印染 / 染料化工 / 印染设备 / 化纤 / 染整助剂 / 纺机板块时作为 🎯 Operator-exclusive insight 引用。

- **领域**: `<TODO:操作员产业领域,如不适用留 N/A>`
- **关键信号 1**: `<TODO>`
- **关键信号 2**: `<TODO>`
- **关键信号 3**: `<TODO>`

## 9. Last 3 Macro Events Worth Remembering

> 滚动记录最近 3 件对 A 股有显著影响的宏观事件 (政策、利率、地缘、汇率、监管),新事件加进来时把最老的剔除。

1. `<YYYY-MM-DD>` · `<事件>` → `<市场反应 + agent 应如何在分析里 reference>`
2. ...
3. ...

---

## Bootstrap 状态

本文件由 marketplace template 初始化,所有数据字段尚未填写。第一次跑 a-share-analyst 之前,**操作员需要至少填写**:
- Section 1: 1Y LPR / 5Y LPR / 10Y 国债 (最关键的利率锚)
- Section 6: 沪深 300 PE + 百分位 (最关键的整体估值锚)
- Section 7: 至少 1-2 个 Embrace 板块 + 1-2 个 Avoid 板块

其他 section 可以滚动补充。

**Agent 行为**: 如果遇到大段 `<TODO>` 未填写,在报告里输出 "📂 macro-pulse 部分字段未填写,以下假设基于 agent 默认知识 (可能过期)",并明确列出 fallback 假设。
