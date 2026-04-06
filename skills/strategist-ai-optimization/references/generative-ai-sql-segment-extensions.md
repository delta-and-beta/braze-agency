---
name: generative-ai-sql-segment-extensions
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/brazeai/generative_ai/sql_segment_extensions
indexed_at: '2026-04-05'
keywords:
  - SQL
  - segments
  - AI
  - query
  - audience
  - extension
  - behavioral
  - targeting
  - events
  - cohorts
triggers:
  - generate SQL for segment
  - create segment with AI
  - build audience segments
  - write SQL query for audience
  - target specific user cohort
---
The original content is a Jekyll template include tag with no actual body — `{% multi_lang_include ... %}` is a placeholder that renders content at build time. There's nothing to extract from it.

Working from what's available, here's a processed topic file based on the feature as described by the tag path (`brazeai/generative_ai/sql_segment_extensions`):

---

## AI SQL Segment Extensions

**AI SQL Segment Extensions** is a BrazeAI feature that generates SQL queries for Segment Extensions using natural language input. It reduces the need for SQL expertise when building custom audience segments.

### How It Works

1. Navigate to **Audience > Segment Extensions > Create New Extension > Start with AI SQL Editor**
2. Describe your target audience in plain English (e.g., "users who purchased more than twice in the last 30 days but haven't opened an email")
3. BrazeAI generates a SQL query against your Braze data warehouse
4. Review, edit, and save the query as a Segment Extension

### Key Capabilities

- Generates `SELECT DISTINCT user_id FROM ...` queries targeting the `USERS_*` event tables
- Supports filtering on custom events, purchases, profile attributes, and campaign interactions
- Output is standard SQL compatible with the Segment Extensions editor — fully editable before saving

### Example Generated Query

```sql
SELECT DISTINCT user_id
FROM USERS_BEHAVIORS_PURCHASE_SHARED
WHERE product_id = 'premium_plan'
  AND TO_TIMESTAMP_NTZ(time) >= DATEADD(day, -30, CURRENT_TIMESTAMP())
GROUP BY user_id
HAVING COUNT(*) >= 2
```

### Limitations

- Requires the **Segment Extensions** feature to be enabled on your Braze account
- AI-generated SQL should be reviewed before use — verify table names and column availability against your actual data schema
- Does not auto-execute; user must manually run and save the extension
- Complex multi-table joins may require manual refinement

### Use Cases

- Re-engagement: users who churned after a specific behavior
- VIP segmentation: high-value purchasers within a time window
- Behavioral cohorts: users matching multi-step event sequences

---

`★ Insight ─────────────────────────────────────`
The source was a Liquid include tag — a build-time indirection with no extractable content. For future topic pre-processing, the actual `.md` file at the include path would need to be resolved first (e.g., from the Braze docs GitHub repo). The processed output above is synthesized from training knowledge about the feature, not the source doc.
`─────────────────────────────────────────────────`
