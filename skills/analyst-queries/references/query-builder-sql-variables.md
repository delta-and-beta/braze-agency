---
name: query-builder-sql-variables
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/analytics/query_builder/sql_variables
indexed_at: '2026-04-05'
keywords:
  - sql-variables
  - parameterize
  - query-builder
  - campaign-variable
  - date-range
  - liquid-syntax
  - options
  - dropdown
  - radio-buttons
  - multi-select
triggers:
  - how to add variables to SQL queries
  - create reusable parameterized queries
  - set up date range picker for reports
  - configure campaign selection variable
  - build interactive user-facing reports
---
`★ Insight ─────────────────────────────────────`
- Braze uses Liquid-style `{{type.${label}}}` syntax for SQL variables — the `${...}` wrapper distinguishes the user-defined label from the variable type
- The filter chain syntax (`| is_radio_button: 'true' | options: '[...]'`) mirrors Liquid filters, letting complex UI behavior be encoded inline in SQL comments
`─────────────────────────────────────────────────`

## SQL Variables in Query Builder

Variables let you parameterize queries to avoid hardcoding values, enable reuse across campaigns, and make reports accessible to non-technical teammates via a UI-driven **Variables** tab.

### Syntax

```sql
{{variable_type.${custom_label}}}
```

- `variable_type` — predefined type (see below)
- `custom_label` — display name shown in the Variables tab

### Example Query

```sql
SELECT COUNT(*) AS total_users
FROM USERS_CAMPAIGNS_REVENUE_SHARED
WHERE campaign_id = '{{campaign.${Campaign}}}'
  AND TIME > '{{start_date.${Month First Day}}}'
  AND TIME < '{{end_date.${Month Last Day}}}';
```

The **Variables** tab appears automatically after adding the first variable to a query.

---

## General Variable Types

### `number`
Accepts any positive or negative number, including decimals (e.g., `5.5`).
```sql
some_number_column < {{number.${custom_label}}}
```

### `string`
For repetitive string values that change between report runs.
```sql
'{{string.${add a string here.}}}'
```

### `options` (List)

**Single-select (dropdown):**
```sql
{{options.${metrics} | options: '[{"label": "test", "value": "test_value"}, {"label": "test2", "value": "test_value2"}]'}}
```

**Single-select (radio buttons):**
```sql
{{options.${metrics} | is_radio_button: 'true' | options: '[{"label": "test", "value": "test_value"}, {"label": "test2", "value": "test_value2"}]'}}
```

**Multi-select:**
```sql
{{options.${metrics} | is_multi_select: 'true' | options: '[{"label": "test", "value": "test_value"}, {"label": "test2", "value": "test_value2"}]'}}
```

List modifiers (must be combined with `options`):
| Modifier | Effect |
|---|---|
| `is_radio_button: 'true'` | Renders options as radio buttons instead of dropdown |
| `is_multi_select: 'true'` | Allows selecting multiple options |
| `options: '[...]'` | Defines available choices as JSON array of `{label, value}` objects |

---

## Braze-Specific Variable Types

### Date Range

Use `start_date` and `end_date` with matching labels to create a date range picker. Unmatched labels create two independent date pickers.

```sql
time > {{start_date.${custom_label}}} AND time < {{end_date.${custom_label}}}
```

Default values: Unix timestamp in seconds (UTC), e.g., `1696517353`.

| Option | Required Variables |
|---|---|
| Relative (past X days) | `start_date` only |
| Start date | `start_date` only |
| End date | `end_date` only |
| Date range | Both `start_date` and `end_date` with same label |

### Campaign Variables

**Single campaign:**
```sql
campaign_id = '{{campaign.${custom_label}}}'
```

**Multiple campaigns (IN clause):**
```sql
campaign_id IN ({{campaigns.${custom_label}}})
```

**Campaign variants** (requires a `campaign`/`campaigns` variable with same label):
```sql
message_variation_api_id IN ({{campaign_variants.${custom_label}}})
```
Replacement value: comma-delimited API IDs (e.g., `api-id1, api-id2`).

> Sharing a label between a `campaign` and a Canvas variable adds a radio button to select between the two types.

`★ Insight ─────────────────────────────────────`
- The label-matching behavior for `start_date`/`end_date` and `campaign`/Canvas pairs shows how Braze uses the label as a semantic key — same label = paired UI widget, different label = independent controls
- Variable types are essentially a small DSL embedded in SQL comments; Braze parses them before query execution, replacing them with user-selected values
`─────────────────────────────────────────────────`
