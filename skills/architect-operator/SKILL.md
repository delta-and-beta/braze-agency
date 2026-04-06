---
name: architect-operator
description: >-
  Managing the Braze Operator for support ticket automation, action review, and
  troubleshooting.
metadata:
  role: braze-architect
  topics:
    - operator-troubleshooting
    - operator-support-tickets
    - operator-reviewing-actions
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
Nick skills are synthesized from atomic topic files — the skill's job is to give the agent *orientation* (when to use, how to think), not to repeat the raw topic content verbatim. The "lens" parameter is what distinguishes two skills covering similar raw topics: it filters which aspects matter and frames the right mental model.
`─────────────────────────────────────────────────`

# Operator & Automation Oversight

## Scope

This skill covers the governance layer around BrazeAI Operator — the AI-powered assistant embedded in the Braze dashboard. It addresses how to review proposed automated actions before they execute, how to file support tickets directly from the Operator interface, and how to diagnose problems when Operator behaves unexpectedly or fails to complete a task.

Use this skill when the question involves **Operator as an actor in your workflows**, not just a Q&A tool. If a user is asking Operator to *do* something (launch a campaign, modify a segment, update a Canvas), this skill applies. If they are troubleshooting unexpected dashboard changes, support escalation paths, or action review checkpoints, this skill applies.

## Lens: Operational Oversight and Automated Action Governance

From a braze-architect perspective, Operator is a **delegated executor**, not a fully autonomous agent. Every action it proposes passes through a human review gate. Your responsibility is to design and maintain the oversight layer — ensuring teams understand when to approve, reject, or escalate, and that there is always a clear path to human control.

This skill does not treat Operator as a black box. It surfaces the control surfaces: action cards, ticket escalation, diagnostic patterns.

## Topics Synthesized

### Reviewing Operator Actions

BrazeAI Operator presents proposed dashboard changes as **action cards** before execution. This is the primary governance surface. Architects should ensure their teams understand:

- Action cards appear after Operator summarizes its plan — they are approval checkpoints, not confirmations
- Each card describes the specific change (audience, message content, timing) before it is applied
- Rejecting or modifying a card stops execution without side effects
- Action review is the moment to verify alignment between intent and execution — treat it as a mandatory step, not a formality

Design team workflows so that action card review is assigned to someone with the authority and context to approve. Ambiguous approvals upstream lead to silent mistakes downstream.

### Filing Operator Support Tickets

When Operator produces unexpected output or fails a task, support tickets can be filed **from inside the Braze dashboard** without switching tools. Key operational points:

- Tickets can be initiated directly from an Operator conversation thread
- Filing in-context preserves the conversation history and proposed actions as supporting evidence
- This is the escalation path when troubleshooting does not resolve the issue at the team level

Recommend this path when the problem appears to be a capability gap, model error, or behavior that cannot be explained by workspace configuration.

### Operator Troubleshooting

When Operator does not behave as expected, diagnose before escalating. Common patterns:

- **Scope mismatch**: Operator may be attempting an action outside its configured permissions — check workspace-level Operator settings
- **Ambiguous prompt**: Operator's proposed action reflects the literal instruction; rephrase the request with explicit constraints
- **Stale context**: Long conversations can cause Operator to lose track of earlier constraints — start a new thread
- **API/service degradation**: Check Braze status before assuming a logic error

Escalate via support ticket when the issue is reproducible, not explained by the above, and involves actions Operator should be capable of performing.

## When to Apply This Skill

- A team member asks how to review or reject what Operator is about to do
- There is confusion about whether an Operator-proposed change has already been applied
- An Operator action produced an unexpected result and the team needs to escalate
- You are designing a workflow that delegates dashboard tasks to Operator and need to establish review checkpoints
- Someone needs to file a support ticket about Operator behavior and is unsure how

## What This Skill Does Not Cover

This skill does not cover Operator's underlying capabilities (what kinds of tasks it can perform), workspace configuration for enabling Operator, or general Braze campaign architecture. Those are covered by separate skills in this plugin.

`★ Insight ─────────────────────────────────────`
The closing "What this skill does not cover" section is a deliberate boundary-setting pattern — it helps the routing layer (and the agent) avoid false positives where this skill gets loaded for adjacent topics. Sharp edges on scope boundaries reduce noise in multi-skill retrieval.
`─────────────────────────────────────────────────`
