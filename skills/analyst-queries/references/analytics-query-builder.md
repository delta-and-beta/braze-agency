---
name: analytics-query-builder
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/analytics/query_builder/sql_variables
indexed_at: '2026-04-05'
keywords:
  - variables
  - parameterization
  - query
  - sql
  - campaign
  - timestamp
  - options
  - syntax
  - dropdown
  - range
triggers:
  - parameterize queries
  - use variables in query builder
  - configure campaign variables
  - set up date ranges
  - add options to filters
---
# Query Builder SQL Variables

SQL variables let you parameterize queries in the Braze Query Builder, making reports reusable without hardcoding values.

## Variable Syntax

```sql
{{variable_type.${custom_label}}}
```

- `variable_type` — predefined type (e.g., `campaign`, `start_date`, `number`)
- `custom_label` — label shown in the Variables tab UI

The **Variables** tab only appears after at least one variable is added to a query.

### Full Example

```sql
SELECT COUNT(*) AS total_users
FROM USERS_CAMPAIGNS_REVENUE_SHARED
WHERE campaign_id = '{{campaign.${Campaign}}}'
  AND TIME > '{{start_date.${Month First Day}}}'
  AND TIME < '{{end_date.${Month Last Day}}}';
```

---

## Variable Types

### General Types

| Type | Usage | Notes |
|------|-------|-------|
| `number` | `some_column < {{number.${label}}}` | Positive/negative, decimals OK (e.g., `5.5`) |
| `string` | `'{{string.${label}}}'` | Avoids hardcoding repeated string values |

### List (options)

**Single select (dropdown):**
```sql
{{options.${metrics} | options: '[{"label": "test", "value": "test_value"}, {"label": "test2", "value": "test_value2"}]'}}
```

**Multi-select:**
```sql
{{options.${metrics} | is_multi_select: 'true' | options: '[{"label": "test", "value": "test_value"}, {"label": "test2", "value": "test_value2"}]'}}
```

**Radio buttons instead of dropdown:**
```sql
{{options.${metrics} | is_radio_button: 'true' | options: '[...]'}}
```

List modifiers (`is_radio_button`, `is_multi_select`, `options`) cannot be used standalone — always combine with an `options` variable.

---

## Braze-Specific Types

### Date Range

```sql
time > {{start_date.${label}}} AND time < {{end_date.${label}}}
```

- `start_date` / `end_date` values are Unix timestamps (seconds, UTC)
- When both share the same label → treated as a date range with all options (relative, start, end, range)
- When labels differ → treated as two independent dates

| Option | Required |
|--------|----------|
| Relative (past X days) | `start_date` |
| Start date only | `start_date` |
| End date only | `end_date` |
| Date range | Both `start_date` and `end_date` |

### Campaigns

| Variant | Usage | Replacement value |
|---------|-------|-------------------|
| One campaign | `campaign_id = '{{campaign.${label}}}'` | Campaign BSON ID |
| Multiple campaigns | `campaign_id IN ({{campaigns.${label}}})` | Campaign BSON IDs |
| Campaign variants | `message_variation_api_id IN ({{campaign_variants.${label}}})` | Comma-delimited API IDs (e.g., `api-id1, api-id2`) |

- `campaign` and `campaigns` variables sharing a label with a Canvas variable display a Canvas/campaign radio selector in the Variables tab.
- `campaign_variants` must be used with a `campaign` or `campaigns` variable.

`★ Insight ─────────────────────────────────────`
- The `{{variable_type.${label}}}` syntax uses Liquid-style double-braces but is Braze-specific — the `${...}` inner syntax distinguishes it from standard Liquid templates.
- List modifiers chain with pipe syntax (`| is_multi_select: 'true' | options: '[...]'`), mirroring Liquid filter chaining — this is a composable design where display behavior and data are separated.
- Date range variables use matching labels as a semantic signal to group into a range UI — label identity doubles as a pairing mechanism, avoiding the need for explicit grouping syntax.
`─────────────────────────────────────────────────`
