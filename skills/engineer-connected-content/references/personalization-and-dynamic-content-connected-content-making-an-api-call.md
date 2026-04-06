---
name: personalization-and-dynamic-content-connected-content-making-an-api-call
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/personalization_and_dynamic_content/connected_content/making_an_api_call
indexed_at: '2026-04-05'
keywords:
  - connected-content
  - API
  - endpoints
  - retry
  - rate-limits
  - liquid
  - attributes
  - messaging
  - health-detection
triggers:
  - How to make a connected content API call
  - Handling connected content errors and failures
  - Rate limiting and retry behavior
  - Endpoint health detection
  - Including user attributes in API URLs
---
`★ Insight ─────────────────────────────────────`
Topic files in Nick's pipeline are "atomic knowledge units" — they live in `skills/{name}/references/` and should be self-contained. The goal is maximum information density with zero navigation chrome, since these get embedded into vector memory and retrieved by semantic search.
`─────────────────────────────────────────────────`

## Making a Connected Content API Call

Connected Content inserts data from any accessible API directly into messages using the `{% connected_content %}` tag.

### Basic Syntax

```liquid
{% connected_content http://numbersapi.com/random/trivia :save result %}
Hi there: {{result.text}}
```

- Use `:save <varname>` to assign the response to a Liquid variable
- Reference response fields via `{{varname.field}}`
- Supports **GET and POST** requests only

### Including User Attributes in URLs

```liquid
{% connected_content http://www.yourwebsite.com/articles?email={{${email_address} | url_param_escape}}&user_id={{${user_id}}} %}
```

- Attribute values require `${}` syntax within Liquid
- Use `url_param_escape` filter for attributes containing special characters (e.g., `@` in email)

### Call Volume — Critical Behavior

**One send ≠ one Connected Content call.** Braze does not guarantee a 1:1 ratio. Endpoints must handle more requests than recipients or messages sent.

Reasons for multiple calls per recipient:
| Cause | Details |
|---|---|
| Multi-part email | HTML body, plain text, and AMP each trigger separate rendering passes |
| Validation/retries | Message payloads may render multiple times for internal validation |
| Channel timing | In-app messages render at impression time, not send time |

### Error Handling

| Condition | Behavior |
|---|---|
| URL returns 404 | Renders empty string |
| URL returns 500/502 | Triggers retry logic |
| JSON response is null | Check `connected` value; use conditional abort |
| Port restriction | Only ports 80 (HTTP) and 443 (HTTPS) allowed |

To abort a message on null JSON response, check `connected` value and use the abort tag.

### Unhealthy Host Detection

Braze automatically detects overloaded endpoints. When triggered:
1. Braze **halts requests for 1 minute** and simulates a failure response
2. After 1 minute, probes with a small number of requests
3. If still unhealthy, waits another minute before retrying

Failure codes that count toward detection threshold: `408`, `429`, `502`, `503`, `504`, `529`

- Use `:retry` option to ensure requests are retried when halted by the detector
- You can allowlist specific URLs for Connected Content (contact your CSM)

### Rate Limits (429) vs. Unhealthy Host Detection

These are distinct mechanisms:

| Mechanism | Trigger | Source |
|---|---|---|
| 429 Too Many Requests | Endpoint/upstream returning 429 | Your server's own rate limit |
| Unhealthy host detection | High rate of failures in a 1-minute window | Braze-side safeguard |

**Key implication of 429s:** Connected Content volume scales with your campaign's message delivery rate. Because emails render multiple times (HTML, plain text, AMP), Connected Content calls can **exceed** your messages-per-minute rate limit. To fix: scale your endpoint or lower the campaign/Canvas rate limit.
