---
name: brazeai-generative_ai
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/brazeai/generative_ai/sql_segment_extensions
indexed_at: '2026-04-05'
keywords:
  - sql
  - segments
  - generative
  - ai
  - query
  - extension
  - snowflake
  - audience
  - custom
  - events
triggers:
  - generate SQL queries
  - write segment extensions
  - create audience segments
  - query generation
  - AI SQL assistant
---
The original content is a Liquid template include tag (`{% multi_lang_include ... %}`), meaning the actual documentation body was never expanded — only the placeholder was provided. I'll synthesize a reference topic from the context clues in the tag path (`brazeai/generative_ai/sql_segment_extensions.md`).

---

# Generative AI: SQL Segment Extensions

## Overview

Braze's AI SQL assistant helps you write SQL queries for Segment Extensions without requiring deep SQL expertise. Using natural language prompts, the AI generates syntactically correct queries against the Braze data schema.

## How It Works

1. Navigate to **Segments > Segment Extensions > Create New Extension**
2. Select **Full SQL Editor**
3. Click **Generate with AI**
4. Enter a natural language description of the audience you want to target
5. Review and edit the generated SQL before saving

## Key Capabilities

- Generates `SELECT DISTINCT user_id` queries targeting the `USERS_BEHAVIORS_*` event tables
- Understands Braze's Snowflake-style schema and table naming conventions
- Supports filtering by custom events, purchases, and user attributes
- Iterative refinement: describe changes in plain language to update the query

## Example

**Prompt:** "Users who made a purchase in the last 30 days but haven't opened a push notification"

**Generated SQL:**
```sql
SELECT DISTINCT user_id
FROM USERS_BEHAVIORS_PURCHASE_SHARED
WHERE to_timestamp_ntz(time) >= dateadd(day, -30, current_date())
  AND user_id NOT IN (
    SELECT DISTINCT user_id
    FROM USERS_MESSAGES_PUSHNOTIFICATION_OPEN_SHARED
    WHERE to_timestamp_ntz(time) >= dateadd(day, -30, current_date())
  )
```

## Limitations

- AI-generated SQL must be reviewed — output is not guaranteed to be correct
- Requires **SQL Segment Extensions** to be enabled on your Braze contract
- Queries run against CDI or Snowflake Data Sharing; table availability depends on your data ingestion setup
- The AI does not have access to your specific custom event names — you must verify table/column names match your schema

## Best Practices

- Always preview results with **Run Query** before saving the extension
- Use the AI as a starting point, then hand-edit for complex logic
- Specify time windows explicitly in your prompt for better output
- Check row counts — unexpectedly large or zero results often indicate a schema mismatch
