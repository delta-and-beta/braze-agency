---
name: >-
  personalization-and-dynamic-content-connected-content-connected-content-retries
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/personalization_and_dynamic_content/connected_content/connected_content_retries
indexed_at: '2026-04-05'
keywords:
  - retry
  - connectedcontent
  - exponential
  - backoff
  - abort
  - ratelimit
  - fallback
  - personalization
triggers:
  - retry Connected Content API calls
  - handle failures with exponential backoff
  - configure Connected Content retries
  - troubleshoot failed API requests
  - set up retry logic for personalization
---
## Connected Content Retries

Add `:retry` to re-attempt failed Connected Content calls using exponential backoff. Up to **5 retries** are attempted.

> **Note:** `:retry` is not available for in-app messages.

### Syntax

```liquid
{% connected_content https://yourwebsite.com/api/endpoint :retry %}
{% connected_content https://www.braze.com :save my_content :basic_auth auth_name :retry %}
```

### Behavior

| Scenario | Result |
|----------|--------|
| Retry succeeds | Message sends, no further retries attempted |
| All 5 retries fail | Message aborted (same behavior as `abort_message` tag) |
| API fails mid-send | Failed messages move to back of queue; respects campaign rate limits; may add minutes to total send time |

### Key Facts

- Max retries: **5 attempts**
- Backoff strategy: exponential
- On exhaustion: message is aborted (not sent with fallback content)
- Rate limiting: Braze respects your configured delivery-speed rate limit during retries

`★ Insight ─────────────────────────────────────`
- The `:retry` tag integrates with Braze's existing rate-limit system rather than bypassing it — retries join the back of the send queue, which means high-volume sends can have their total delivery time extended by retry overhead.
- The abort-on-exhaustion behavior (5 failures = silent drop) mirrors the `abort_message` tag pattern, so teams relying on Connected Content for personalization should pair `:retry` with fallback logic or monitoring rather than assuming delivery.
- The in-app message exclusion is architectural: Connected Content for IAMs is evaluated at display time (client-side), not at send time, making server-side retry queuing impossible.
`─────────────────────────────────────────────────`
