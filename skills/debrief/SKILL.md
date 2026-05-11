---
name: debrief
scope: langsensei
description: "Operation completion gate — notify the user or dispatch the next task"
version: 4.0.0
---

# Debrief Skill

Every operation must end with a debrief. Choose exactly one exit:

1. **Notify** — this is the final step, report results to the user
2. **Dispatch** — further work is needed, hand off to the next agent

Never both. Never neither.

## Decision Tree

Use this flowchart to decide which exit to take. **Agent-specific debrief rules in `AGENTS.md` always override this general guidance.**

```
START
  │
  ├─ Does your agent's AGENTS.md have a "Debrief Rules (mandatory)" section?
  │    YES → Follow those rules exactly. Stop here.
  │    NO  → Continue below.
  │
  ├─ Did your operation produce work that needs follow-up by another agent?
  │    YES → Exit 2 (Dispatch)
  │    NO  → Continue below.
  │
  ├─ Did your operation complete its assigned task successfully?
  │    YES → Exit 1 (Notify)
  │    NO  → Continue below.
  │
  ├─ Did your operation fail in a way another agent could fix?
  │    YES → Exit 2 (Dispatch) with failure context
  │    NO  → Exit 1 (Notify) with failure report
  │
  END
```

### Common Patterns

| Scenario | Exit | Target |
|----------|------|--------|
| PR opened, needs review | Dispatch | reviewer agent |
| PR reviewed, changes requested | Dispatch | dev agent |
| PR reviewed, approved, zero comments | Notify | — |
| Analysis/research completed | Notify | — |
| Lint found errors, needs fix | Dispatch | dev agent |
| All checks pass | Notify | — |
| Task failed, another agent can help | Dispatch | relevant agent |
| Task failed, no recovery path | Notify | — |

## Exit 1: Notify

Send a concise notification to the user with your key findings.

### Usage

Use whatever notification mechanism your runtime exposes — the runtime owns the
delivery channel (desktop notification, dashboard event, webhook, etc.). The
contract this skill enforces is the *content*, not the transport.

A typical runtime call looks something like:

```text
notify(operation_id="<your-operation-id>", message="your notification message")
```

> **`operation_id`** — when your runtime tracks operations and links
> notifications to a final report, include it so the user can jump straight to
> the report from the notification. Optional but recommended.

### Notification Guidelines

- **Match the language of the operation brief** — if the brief is in Chinese, notify in Chinese; if in English, notify in English
- Keep it concise and actionable (2-5 sentences)
- Lead with the conclusion, not the process
- Include key numbers/data points
- No need to repeat the full analysis — the user can check the report for details

### Good Notify Examples

**Good — leads with conclusion, includes data:**
```
PR #42 on LangSensei/emploke approved with no comments. Clean merge candidate.
```

**Good — failure with context:**
```
Build failed for feature/mcp-retry on LangSensei/emploke. TypeScript compile error in packages/runtime/src/client.ts:128 — RetryConfig is not exported. This appears to require a type that wasn't included in the brief.
```

**Bad — too vague:**
```
Operation complete. Check the report for details.
```

## Exit 2: Dispatch

When further work is needed, hand off to the next agent through whatever
dispatch mechanism your runtime exposes. As with Notify, the contract is the
*content* of the brief, not the transport.

### Usage

A typical runtime call looks something like:

```text
dispatch(brief="your dispatch brief", details="additional context, file paths, specifics")
```

> **`brief`** — concise one-line task description (often used for routing or
> classification). Keep it short and actionable.
> **`details`** — expanded context, constraints, file paths, code snippets,
> error messages. Put lengthy context here instead of cramming it into `brief`.

### Dispatch Brief Format

Every dispatch brief must be self-contained — the receiving agent has no access
to your operation context. Include:

1. **What to do** — clear action statement (first sentence)
2. **Target** — repository, branch, PR number as applicable
3. **Context** — why this work is needed, what happened in the previous operation
4. **Specifics** — file paths, line numbers, error messages, categorized items
5. **Constraints** — any special requirements (e.g., "resume existing branch", "do not create new PR")

### Good Dispatch Examples

**Good — PR review dispatch (dev → reviewer):**
```
Review PR #47 on LangSensei/emploke (branch: emploke/20260415-abc12345).

Changes: Added retry logic to the runtime client with exponential backoff. Modified packages/runtime/src/client.ts and packages/runtime/test/client.test.ts.

Files changed: packages/runtime/src/client.ts, packages/runtime/test/client.test.ts, packages/runtime/src/config.ts
```

**Good — fix dispatch (reviewer → dev):**
```
Fix review comments on PR #47, LangSensei/emploke. Branch: emploke/20260415-abc12345. Resume the existing branch.

Fixes needed:
[blocking] packages/runtime/src/client.ts:142 — retry loop does not check abort signal, risk of infinite retry on shutdown
[blocking] packages/runtime/src/client.ts:156 — error wrapping drops the original cause, breaks downstream `instanceof` checks
[suggestion] packages/runtime/src/config.ts:28 — MaxRetries default of 10 seems high, consider 3 with longer backoff

PR context: Adds retry logic to the runtime client for transient network failures.
```

**Bad — missing context:**
```
Fix the PR issues.
```
