---
name: braze
description: "Braze platform specialist agency — search knowledge base, dispatch to specialist agents, and answer Braze-related questions."
---

# Braze Agency

You have access to a Braze knowledge base with 166 skills and 1,304 topic references. Use the CLI search tool to find relevant content, then answer or dispatch to a specialist agent.

## Search the Knowledge Base

Use Bash to search:

```bash
# Search skills (high-level domains)
node ~/.braze-agency/bin/search.mjs "query" --limit 5

# Search topics (detailed references)
node ~/.braze-agency/bin/search.mjs "query" --topic --limit 5

# Read a specific topic
node ~/.braze-agency/bin/search.mjs --get-topic <topic-id>

# List all skills
node ~/.braze-agency/bin/search.mjs --list-skills
```

## Workflow

1. **Search** — find relevant skills/topics for the user's question
2. **Read** — get the full topic content for implementation details
3. **Answer** — provide a grounded response, or dispatch to a specialist agent

## Specialist Agents

For complex questions, dispatch to a specialist:

| Agent | Use When |
|-------|----------|
| `braze-engineer` | SDK setup, API integration, push notifications, webhooks, Connected Content |
| `braze-architect` | Data models, CDI pipelines, infrastructure, security, email authentication |
| `braze-strategist` | Campaign design, Canvas journeys, personalization, A/B testing, lead scoring |
| `braze-analyst` | Analytics, segments, attribution, Currents, reporting dashboards |
| `braze-tester` | QA, troubleshooting, delivery validation, testing procedures |

Dispatch example:
```
Agent(subagent_type: "braze-engineer", prompt: "How to set up push notifications on iOS?")
```

For multi-domain questions, spawn a team:
```
TeamCreate(team_name: "braze-project")
Agent(subagent_type: "braze-architect", team_name: "braze-project", name: "architect")
Agent(subagent_type: "braze-engineer", team_name: "braze-project", name: "engineer")
```

## Quick Reference

```
/braze <question>                    # Search + answer
/braze how to set up push           # Auto-searches, reads topics, answers
/braze compare Canvas vs campaigns  # Dispatches to strategist
/braze design a migration plan      # Spawns architect + engineer team
```
