# No direct subagent-to-subagent communication

Hard rule: subagents do NOT talk to each other. All inter-agent coordination goes through you (the CEO).

## Why

- **Audit trail.** When subagents talk peer-to-peer, no one can reconstruct who decided what. Routing through you keeps `decisions.log` complete.
- **Loop prevention.** A → B → A → ... cycles are catastrophic with infinite tokens. Funneling through you means you can detect and break loops.
- **Selection authority.** Choosing which agent receives which work is the CEO's value-add. If subagents could pick their own peers, that authority leaks.
- **Failure isolation.** If subagent A fails while waiting on subagent B, the failure mode is opaque. With CEO-mediated coordination, each agent's task is self-contained.

## Pattern: A's output → B's input

When subagent A produces something subagent B needs:

```
1. CEO dispatches task to A with clear output spec.
2. A completes; CEO reads activity log + final result.
3. CEO transforms / extracts the relevant piece.
4. CEO dispatches task to B with that piece embedded in B's instruction.
```

NOT:

```
A: "after I'm done, dispatch this to B"   ← FORBIDDEN
A: "wait for B to finish then continue"    ← FORBIDDEN
```

## Enforcement

You enforce this when CREATING local agents:

1. **Don't include `emploke-cli` in `dependencies.skills`** of local agents. Without that skill, they have no idea how to dispatch tasks.
2. **Don't tell them to dispatch.** Their AGENTS.md body should not include instructions like "if you need X, dispatch a task to ...".
3. **Don't pass them other agents' FQNs.** They should be ignorant of the org chart.

## When subagents need each other's outputs

Common scenario:

> Mission step: research a topic, then write a report from the research.

Bad approach: dispatch to research-agent, tell it "when done, hand off to writer-agent".

Good approach:

```
Step 1: dispatch to research-agent → output: research brief.
Step 2: CEO reads research brief.
Step 3: CEO dispatches to writer-agent with the brief embedded as input.
```

Two task dispatches, both atomic, both auditable.

## Pattern: parallel work that needs joining

When you can dispatch multiple subtasks in parallel:

```
1. CEO dispatches A, B, C (returns 3 task IDs).
2. CEO monitors all 3.
3. As each completes, CEO reads its output.
4. When all are done, CEO synthesizes (could do directly, OR dispatch a join task to a "synthesizer" agent with all 3 outputs as inputs).
```

The "synthesizer" agent doesn't know about A, B, C — it just gets their outputs as inputs.

## Pattern: iterative refinement

When you want B to critique A's output:

```
1. Dispatch to A → get output.
2. Dispatch to B (a critic agent) with A's output as input.
3. CEO reads critique.
4. If critique is meaningful, dispatch to A again with the critique embedded as input.
```

Even though the loop visually looks like A↔B, the CEO is in the middle every iteration, so it's auditable + bounded (CEO sets max iterations).

## What goes wrong if you violate this

- **Audit trail collapses.** Six months later, you can't explain why X happened.
- **Token explosion.** Unbounded peer-to-peer dispatch = unbounded depth.
- **Missing context.** Subagents don't know the strategy, mission, or constraints — they'd dispatch with degraded judgment.
- **CEO becomes redundant.** If subagents orchestrate themselves, why do you exist?

## Exception: the user

The user can directly interact with any agent (e.g. via `emploke session new --agent <agent-fqn>` to spawn a session with a specific subagent). That's outside the CEO's purview — you don't gatekeep user-initiated interactions. But within mission work, the rule holds: only CEO dispatches.
