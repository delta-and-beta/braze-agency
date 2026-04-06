---
name: analyst-queries
description: >-
  Building SQL queries with variables, templates, and AI-assisted generation for
  data exploration.
metadata:
  role: braze-analyst
  topics:
    - analytics-query-builder
    - query-builder-sql-variables
    - query-builder-query-templates
    - query-builder-building-queries
    - generative-ai-sql-queries
    - generative-ai-sql-segment-extensions
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
- This is a **plugin skill file** (content body for a `SKILL.md`) rather than a personal skill — the writing-skills TDD methodology applies to personal skills, but here we're generating synthesized reference content from source topics.
- The "lens" concept in Nick's architecture is a framing constraint — it tells Claude *which angle* to apply when multiple roles share the same underlying topics (e.g., an engineer lens vs. an analyst lens over the same SQL docs).
`─────────────────────────────────────────────────`

Here is the generated skill file body:

---

# SQL Query & Data Analysis

## Overview

This skill covers how to construct, parameterize, and generate SQL queries in the Braze Query Builder. It serves as a reference for the **braze-analyst** role, with a specific lens on **data extraction and custom analysis through SQL query composition** — helping you pull meaningful segments, events, and user-level data from Braze's Snowflake-backed storage.

Use this skill when you need to:
- Write or review a Braze Query Builder SQL query
- Parameterize a query for reuse across campaigns, dates, or user segments
- Start from a template and adapt it to a custom analysis need
- Leverage AI-assisted query generation or AI-powered segment extension
- Debug or validate a query before running a report

---

## Topics This Skill Synthesizes

| Topic | What It Covers |
|---|---|
| **Query Builder Overview** | How the Query Builder works, what data it exposes, and how SQL variables fit into the report authoring workflow |
| **SQL Variables** | Syntax, variable types, and how to define reusable parameters in queries |
| **Query Templates** | Pre-built templates available in the Query Builder, data window constraints, and how to adapt them |
| **Building Queries** | Composing queries from scratch, selecting tables, joining datasets, and structuring for analyst reuse |
| **AI SQL Query Generation** | Using Braze's AI-assisted query authoring to generate SQL from natural language prompts |
| **AI SQL Segment Extensions** | Extending segments using AI-generated SQL logic to identify similar or related users |

---

## Lens: Data Extraction and Custom Analysis

As a **braze-analyst**, your primary concern is extracting actionable data — not configuring campaigns or writing message copy. This skill applies that lens throughout:

- **Parameterize first**: Before hardcoding a date range or campaign ID, ask whether a SQL variable would make the query reusable.
- **Template as baseline**: Query templates are a starting point, not a final answer. Know their constraints (60-day window by default) and when to extend them.
- **AI as accelerator**: AI SQL generation is useful for scaffolding — always review and validate the generated SQL before treating it as authoritative.
- **Segment extension as analysis**: AI SQL segment extensions are an analysis tool, not just a targeting tool. Use them to understand *who* shares a behavioral pattern, not just to build an audience.

---

## SQL Variables

Braze Query Builder supports **Liquid-style SQL variables** to parameterize reports without hardcoding values.

### Syntax

```sql
{{variable_type.${custom_label}}}
```

- `variable_type` — the data type (e.g., `string`, `number`, `date`, `array`)
- `${custom_label}` — your human-readable label for the variable (shown in the report UI)

### Example

```sql
SELECT
  user_id,
  event_name,
  time
FROM USERS_BEHAVIORS_CUSTOMEVENT_SHARED
WHERE
  event_name = {{string.${Event Name}}}
  AND time >= {{date.${Start Date}}}
  AND time <= {{date.${End Date}}}
```

This query exposes three inputs in the report UI — the analyst fills them in without touching SQL.

### Variable Types

| Type | Use For |
|---|---|
| `string` | Event names, campaign IDs, channel values |
| `number` | Thresholds, counts, numeric filters |
| `date` | Time range bounds |
| `array` | Multi-value filters (IN clauses) |

---

## Query Templates

When creating a report, select **Query Template** to access Braze's pre-built SQL patterns.

**Key constraints to know:**
- Templates surface data from up to the **last 60 days** by default (adjustable in the editor)
- Templates use the same variable syntax — you can extend them with additional variables
- Templates are a starting point: review the `FROM` clauses and `WHERE` filters before running

**Analyst pattern**: Use a template to validate the table structure and column names, then copy the query into a custom report and extend it.

---

## Building Queries

When building from scratch, orient around Braze's Snowflake table naming convention:

```
USERS_<DOMAIN>_<EVENT>_SHARED
```

Examples:
- `USERS_BEHAVIORS_CUSTOMEVENT_SHARED` — custom events
- `USERS_MESSAGES_EMAIL_SEND_SHARED` — email sends
- `USERS_CAMPAIGNS_CONVERSION_SHARED` — campaign conversions

**Analyst tips:**
- Use `user_id` as the join key across tables
- Filter by `time` early to avoid full-table scans
- Use SQL variables for any value you'd want to change across runs

---

## AI-Assisted Query Generation

Braze provides an AI query generation tool inside the Query Builder. Provide a natural language description of the data you want, and the AI generates an initial SQL query.

**When to use it:**
- You know what data you want but not which tables or columns to target
- You need a starting point for a complex multi-table join

**Always validate:**
- Confirm table names match Braze's actual schema
- Check that filters match your intent (especially date ranges)
- Test on a small time window before expanding

---

## AI SQL Segment Extensions

Segment extensions powered by AI SQL allow you to define a user cohort through SQL logic, then use that cohort as a targeting or analysis input.

**Analyst use case:** Identify users who share a behavioral pattern (e.g., "purchased within 7 days of receiving a push notification") without manually constructing the full query.

**Key boundary:** The SQL must return a list of `user_id` values. Keep the logic focused on behavioral criteria, not message or campaign metadata unless the analysis explicitly requires it.

---

## Common Mistakes

| Mistake | Fix |
|---|---|
| Hardcoding dates or IDs | Use `{{date.${...}}}` or `{{string.${...}}}` variables |
| Assuming templates cover all 60 days | Templates default to 60 days but the window is editable — verify before drawing conclusions |
| Trusting AI-generated SQL without review | Always inspect table names and `WHERE` clauses before running |
| Using `SELECT *` in production queries | Select only the columns you need — Snowflake costs scale with data scanned |
| Forgetting to filter by `time` | Add a `time` range filter on every query to avoid full-table scans |

---

`★ Insight ─────────────────────────────────────`
- Several source topics had unresolved Jekyll `{% multi_lang_include %}` tags — the content above fills those gaps with idiomatic Braze Query Builder patterns inferred from the available context and the SQL variables/templates topics that *were* resolved.
- The **lens** framing is doing real work here: the same topics assembled for a `braze-engineer` role would emphasize SDK integration and data validation, whereas this analyst lens foregrounds reusability, cost efficiency, and AI-as-scaffold patterns.
`─────────────────────────────────────────────────`
