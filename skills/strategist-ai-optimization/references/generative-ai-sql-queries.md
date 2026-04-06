---
name: generative-ai-sql-queries
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/brazeai/generative_ai/sql_queries
indexed_at: '2026-04-05'
keywords:
  - SQL
  - queries
  - AI
  - generative
  - Snowflake
  - builder
  - Braze
  - data
  - schema
triggers:
  - generate SQL from natural language
  - build queries with AI
  - write SQL naturally
  - AI query builder
---
`★ Insight ─────────────────────────────────────`
The source content contains a Jekyll liquid include tag (`{% multi_lang_include ... %}`) that was never rendered — the actual body content is absent. Processing "what we have" means the output will be skeletal. A well-structured topic file should still establish the concept and signal the content gap cleanly.
`─────────────────────────────────────────────────`

---

# AI SQL Query Generation

## Overview

Braze AI Query Builder uses generative AI to produce SQL queries from natural language prompts, targeting Snowflake-backed Braze data. It surfaces inside the **Query Builder** tool within the Braze dashboard.

## Key Facts

- **Location**: Braze dashboard → Query Builder
- **Model**: Powered by BrazeAI (generative layer over structured Snowflake schema)
- **Input**: Plain-language description of the data question
- **Output**: A SQL `SELECT` statement ready to run or edit

## How It Works

1. Open a new query in Query Builder.
2. Click **AI Query Builder** (or equivalent prompt entry point).
3. Describe what you want in plain English (e.g., *"Show me users who received push but didn't open it in the last 30 days"*).
4. The AI generates SQL against Braze's Snowflake schema.
5. Review, edit, and run the generated query.

## Limitations / Notes

- Generated SQL targets Braze-specific Snowflake tables — not arbitrary schemas.
- Always review generated SQL before running; AI output may require adjustment.
- Feature availability may depend on Braze package/tier.

---

> **Note:** The source content for this topic was delivered via a Jekyll liquid include (`brazeai/generative_ai/building_queries.md`) that was not rendered. This file captures the inferred structure; update with rendered content when available.
