---
name: data-unification-data_transformation
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/data/unification/data_transformation
indexed_at: '2026-04-05'
keywords:
  - transformation
  - webhook
  - JavaScript
  - API
  - attributes
  - events
  - identifier
  - payload
  - integration
  - syncing
triggers:
  - transform webhook data
  - set up data transformation
  - convert external data to Braze
  - sync third-party data to Braze
  - write transformation code
---
`★ Insight ─────────────────────────────────────`
Topic files in this pipeline are atomic knowledge units — they live in `skills/{name}/references/*.md` and are loaded selectively based on query depth. Keeping them tight and self-contained matters: at "default" depth, only skill references are loaded, so each topic must stand alone without assuming surrounding context.
`─────────────────────────────────────────────────`

## Data Transformation

Braze Data Transformation receives webhooks from external platforms and converts them into Braze API calls using custom JavaScript code. It bridges third-party webhook sources (survey tools, CRMs, customer service platforms) to Braze user profiles without requiring a dedicated integration.

### How It Works

1. Braze provides a unique URL to receive incoming webhooks (HTTP POST).
2. You write JavaScript to transform the raw webhook payload into a valid Braze API request.
3. Supported destinations: `/users/track` (attributes, events, purchases), `/catalogs`, and other Braze endpoints.
4. Logs are available for QA, debugging, and monitoring.

### Tiers and Limits

| Feature | Free | Pro |
|---|---|---|
| Active transformations | 5 per company | 55 per company |
| Monthly requests | 300,000 | 10,300,000 |
| Rate limit | 1,000 req/min per workspace | Higher (contact account manager) |

To upgrade to Pro: contact your Braze account manager or use **Request Upgrade** in the dashboard.

### Identifier Options

Transformations updating `/users/track` can identify users by:
- `external_id` (default)
- `braze_id`
- `email` — use `email` as the identifier property in transformation code
- `phone` — use `phone` as the identifier property

Note: the legacy `get_user_by_email` function (used before April 2023) has been deprecated.

### Data Points

Each transformation that writes to `/users/track` logs data points for attributes, events, and purchases — identical to a direct API call. You control data point consumption through how you write the transformation code.

### Key Facts

- No developer required — marketers can set up transformations independently.
- Any data the external platform includes in the webhook payload is available for syncing.
- More webhook payload fields = more flexibility in what gets synced.
- For help with transformation code or use case setup, contact your Braze account manager.

`★ Insight ─────────────────────────────────────`
The original docs used Liquid template tags (`{% details %}`, `{% alert %}`, `{{site.baseurl}}/...` links) which are Jekyll-specific and would render as raw text outside the docs site. Stripping these is essential for topic files — they get embedded into agent context where Liquid is meaningless noise.
`─────────────────────────────────────────────────`
