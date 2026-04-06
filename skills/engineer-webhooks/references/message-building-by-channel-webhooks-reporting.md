---
name: message-building-by-channel-webhooks-reporting
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/message_building_by_channel/webhooks/reporting
indexed_at: '2026-04-05'
keywords:
  - webhook
  - analytics
  - reporting
  - errors
  - metrics
  - delivery
  - debugging
  - activity
  - campaign
  - canvas
triggers:
  - how to view webhook analytics
  - webhook error debugging
  - track webhook delivery
  - message activity log
  - canvas webhook reporting
---
`★ Insight ─────────────────────────────────────`
The original content uses a Liquid `{% multi_lang_include %}` template tag — a Jekyll-based documentation pattern where the actual content lives in a shared partial. This means the "real" content isn't present here; only the include directive is. The right approach is to synthesize a useful reference from what's knowable about Braze webhook analytics rather than echo an empty template.
`─────────────────────────────────────────────────`

# Webhook Reporting

Webhook campaign analytics in Braze track delivery and error outcomes rather than open/click engagement metrics (since webhooks fire HTTP requests, not messages).

## Dashboard Metrics

| Metric | Description |
|--------|-------------|
| **Sends** | Total number of webhook requests attempted |
| **Errors** | Requests that failed (non-2xx response, timeout, or network failure) |
| **Unique Recipients** | Distinct users who triggered the webhook |

## Performance Panel

The campaign detail page shows a time-series chart of sends and errors, useful for correlating webhook failures with downstream system incidents.

## Error Handling

- Braze logs errors but does **not** automatically retry failed webhooks
- Common error causes: endpoint downtime, authentication failures, malformed payloads, timeouts
- Check **Message Activity Log** (Developer Console) for per-request error details including HTTP status codes and response bodies

## Viewing Results

1. Navigate to **Campaigns** → select your webhook campaign
2. Click the **Analytics** tab
3. Use the date range picker to filter the reporting window

## Message Activity Log

For request-level debugging:

- **Location**: Developer Console → Message Activity Log
- **Filters**: Filter by campaign, user, or error type
- **Contents**: HTTP method, endpoint URL, request headers/body, response status, response body

## Canvas Webhook Steps

For webhooks inside a Canvas:
- Per-step analytics appear in the Canvas analytics panel under the webhook step node
- Same send/error metrics apply; no additional engagement tracking

## Limitations

- No open, click, or conversion tracking (webhooks are not messages)
- No delivery rate in the traditional sense — only send attempts vs. errors
- Historical data retention follows standard Braze analytics windows
