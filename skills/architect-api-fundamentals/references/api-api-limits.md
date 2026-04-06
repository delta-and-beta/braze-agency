---
name: api-api-limits
source_url: 'https://braze-inc.github.io/braze-docs/_api/api_limits'
indexed_at: '2026-04-05'
keywords:
  - rate-limits
  - endpoints
  - batching
  - '429'
  - track
  - throttling
  - backoff
  - capacity
triggers:
  - how to handle rate limits
  - 429 error response
  - batch tracking requests
  - exponential backoff retry
  - increase API quota
---
## API Rate Limits

Braze enforces API rate limits per workspace. Exceeding limits returns HTTP `429`. Limits can be increased by contacting your customer success manager.

---

### Rate Limits by Endpoint

| Endpoint(s) | Rate Limit |
|---|---|
| `POST /users/track` | 3,000 requests per 3 seconds; up to 75 combined objects (attributes + events + purchases) per request |
| `POST /users/export/ids` | 250 req/min (onboarded on/after Aug 22, 2024); 2,500 req/min (before Aug 22, 2024) |
| `POST /users/delete` | 20,000 req/min (shared across group below) |
| `POST /users/alias/new` | ↑ shared |
| `POST /users/alias/update` | ↑ shared |
| `POST /users/identify` | ↑ shared |
| `POST /users/merge` | ↑ shared |
| `POST /users/external_id/rename` | 1,000 req/min |
| `POST /users/external_id/remove` | 1,000 req/min |
| `GET /events/list` | 1,000 req/hour (shared with `/purchases/product_list`) |
| `GET /purchases/product_list` | 1,000 req/hour (shared with `/events/list`) |

---

### Batching `/users/track`

- Combine up to **75 total objects** across `attributes`, `events`, and `purchases` arrays per request.
- Legacy rate limit customers: up to 75 objects **per array** independently.

### Monthly Active Users (MAU) Limits

Special limits apply for Monthly Active Users CY 24-25, Universal MAU, Web MAU, and Mobile MAU on `/users/track` — consult Braze documentation for current thresholds.

---

### Error Handling

- **HTTP 429** — Rate limit exceeded. Implement exponential backoff and retry logic.
- Rate limits are subject to change. Build defensively with configurable limits.

`★ Insight ─────────────────────────────────────`
- The `/users/track` limit is the most nuanced: the "75 combined objects" constraint applies across all three payload arrays together (not 75 each), which is a common source of unexpected 429s in batch ingestion pipelines.
- The `/users/delete`, `/users/identify`, and related endpoints share a single 20,000 req/min pool — important when orchestrating bulk user lifecycle operations that touch multiple endpoints simultaneously.
`─────────────────────────────────────────────────`
