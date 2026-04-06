---
name: braze
description: "Braze platform specialist agency — routes all questions through the consultant orchestrator who assembles the right team of specialists."
---

# Braze Agency

**Always dispatch to the consultant first.** The consultant analyzes the question, decides which specialists are needed, and orchestrates the team.

```
Agent(subagent_type: "braze:consultant", prompt: "<the user's full question>")
```

The consultant will:
1. Search the knowledge base for context
2. Reason about which domains the question touches
3. For simple questions (1 domain): dispatch to a single specialist
4. For complex questions (2+ domains): create a team via TeamCreate and fan out to multiple specialists in parallel
5. Synthesize all findings into a unified answer

## Available Specialists (managed by the consultant)

| Agent | Domain |
|-------|--------|
| `braze:architect` | Data models, API design, infrastructure, workspace config |
| `braze:engineer` | SDK, API integration, push, webhooks, Connected Content |
| `braze:strategist` | Campaigns, Canvas journeys, personalization, content |
| `braze:analyst` | Segments, analytics, attribution, Currents, reporting |
| `braze:tester` | QA, delivery validation, troubleshooting |
| `braze:researcher` | Documentation lookup |
| `braze:validator` | Fact-checking against docs |
| `braze:presenter` | Report formatting, visual artifacts |

## Search (for quick lookups before dispatching)

```bash
braze-agency search "query" --limit 5
braze-agency search "query" --topic --limit 5
braze-agency search --get-topic <topic-id>
braze-agency search --list-skills
```
