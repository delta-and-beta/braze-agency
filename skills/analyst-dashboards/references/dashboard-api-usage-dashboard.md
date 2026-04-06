---
name: dashboard-api-usage-dashboard
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/analytics/dashboard/api_usage_dashboard
indexed_at: '2026-04-05'
keywords:
  - dashboard
  - API
  - traffic
  - metrics
  - requests
  - endpoints
  - errors
  - alerts
  - limits
  - response
triggers:
  - Monitor API traffic
  - Check API success rate
  - Configure API alerts
  - View API metrics
  - Filter by endpoint
---
## API Usage Dashboard

Monitor incoming REST API traffic for your Braze workspace via **Settings > APIs and Identifiers > Dashboard**.

### Key Metrics

| Metric | Description |
|--------|-------------|
| Total requests | All requests for the workspace given applied filters |
| Success rate | % of requests returning `2XX` |
| Error rate | % of requests returning `4XX` or `5XX` |

### Filters

- **API key** — narrow to a specific key
- **Endpoint** — filter by REST endpoint
- **Response code** — filter by specific HTTP status

### Grouping Options

- Response codes (default)
- API endpoint
- API key
- Success and failure only

### Time Ranges

Today (default), Last 3/6/12/24 Hours, Yesterday, Last 7/14/30 Days, Last Month to Date, Custom.

> **Granularity:** Last 3h and Last 6h show traffic by minute. Larger ranges show traffic every 5 minutes, hourly, or daily.

### What's Included / Excluded

**Included:** All REST API requests with `2XX`, `4XX`, or `5XX` responses — including Data Transformation outputs and Cloud Data Ingestion syncs.

**Excluded:** SDK traffic and User Update steps.

### Operational Notes

- Data may have a short delay for recent traffic.
- During high usage, refresh up to **4 times per minute**; wait a few minutes if throttled.

### Related

- API usage alerts — configure threshold notifications for API traffic anomalies
- Rate limits — understand per-endpoint request limits

---

`★ Insight ─────────────────────────────────────`
- The original doc uses Jekyll-specific template syntax (`{% image_buster %}`, `{% alert %}`, `{{site.baseurl}}`). These are stripped in the topic file since they only render in Jekyll — raw references would appear as literal strings in an AI agent's context window.
- Internal links are converted to descriptive text rather than broken URLs, preserving navigability intent without creating dead references that could confuse an LLM reading this file.
`─────────────────────────────────────────────────`
