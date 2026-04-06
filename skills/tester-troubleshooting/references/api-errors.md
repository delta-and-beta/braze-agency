---
name: api-errors
source_url: >-
  https://braze-inc.github.io/braze-docs/_help/help_articles/api/webhook_connected_content_errors
indexed_at: '2026-04-05'
keywords:
  - webhooks
  - errors
  - authentication
  - timeout
  - ratelimit
  - payload
  - endpoints
  - statuscode
  - headers
  - permissions
triggers:
  - how to fix webhook failures
  - resolve authentication errors
  - troubleshoot request timeout
  - handle rate limit exceeded
  - debug API connection errors
---
## API Errors: Webhooks and Connected Content

### 4XX Errors (Client-Side Issues)

Caused by malformed requests, missing auth headers, or incorrect URLs.

| Code | Meaning | Resolution |
|------|---------|------------|
| **400 Bad Request** | Invalid syntax in request | Validate payload syntax; check all required fields; if Liquid templating is used, preview to confirm it doesn't resolve to blank or JSON-breaking characters (unescaped quotes) |
| **401 Unauthorized** | Missing/invalid authentication | Verify API keys or tokens are included in request headers; confirm user permissions |
| **403 Forbidden** | Auth accepted but access denied | Check API key/token permissions; confirm user permissions for the endpoint |
| **404 Not Found** | Resource doesn't exist at URL | Check endpoint URL for typos/incorrect paths; confirm the resource exists |
| **405 Method Not Allowed** | Wrong HTTP method used | Verify the HTTP method (DELETE, GET, POST, PUT) is supported by the endpoint |
| **408 Request Timeout** | Endpoint timed out | Verify HTTP method; check endpoint responsiveness |
| **409 Conflict** | State conflict prevents completion | Verify HTTP method; check current resource state |
| **429 Too Many Requests** | Rate limit exceeded | Lower the rate limit on your campaign or Canvas step |

### 5XX Errors (Server-Side Issues)

| Code | Meaning |
|------|---------|
| **500 Internal Server Error** | Unexpected server condition prevented request completion |
| **502 Bad Gateway** | Endpoint received invalid response from upstream server |
| **503 Service Unavailable** | Temporary overload or maintenance |
| **504 Gateway Timeout** | No timely response from upstream server |
| **529 Host Overloaded** | Endpoint host overloaded; could not respond |
| **598 Host Unhealthy** | Braze simulated response — endpoint temporarily marked unhealthy (see below) |
| **599 Connection Error** | Network connect timeout when establishing connection; endpoint may be unstable/down |

**Resolving 5XX errors:**
- Review the **Message Activity Log** for specific error details
- Check webhook error timestamps in **Performance Over Time** on the Braze home page
- Reduce request volume via batching or rate limit adjustment

### Unhealthy Host Detection

Braze automatically halts requests to endpoints experiencing high failure rates to protect both the target host and Braze infrastructure.

**Trigger thresholds** (per unique host + app group combination, not per endpoint path):

| Channel | Trigger | Action |
|---------|---------|--------|
| Webhooks | >3,000 failures in any 1-minute window | Halt requests for 1 minute |
| Connected Content | >3,000 failures AND >90% error rate in any 1-minute window | Halt requests for 1 minute |

**Behavior when halted:**
- Braze returns simulated `598` responses
- After 1 minute, Braze resumes at full speed if host is healthy
- If still unhealthy, Braze waits another minute before retrying
- Webhooks: halted requests are automatically retried

**Error codes that count toward unhealthy detection:** `408`, `429`, `502`, `503`, `504`, `529`

---

`★ Insight ─────────────────────────────────────`
- The `598` code is Braze-proprietary (not an IANA-registered HTTP status) — it signals a *simulated* response, meaning Braze never actually contacted the endpoint. This distinction matters for debugging: a `598` means check Braze's unhealthy host state, not the endpoint itself.
- The asymmetry between webhook and Connected Content thresholds (webhooks: failures only; CC: failures *and* error rate) reflects their different failure modes — webhooks are fire-and-forget so any failure is significant, while CC runs inline during message rendering so Braze applies a higher bar before halting.
`─────────────────────────────────────────────────`
