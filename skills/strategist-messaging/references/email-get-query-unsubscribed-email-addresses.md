---
name: email-get-query-unsubscribed-email-addresses
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/email/get_query_unsubscribed_email_addresses
indexed_at: '2026-04-05'
keywords:
  - unsubscribes
  - email
  - subscription
  - endpoint
  - pagination
  - API
  - permission
  - offset
  - sync
  - dates
triggers:
  - query unsubscribed email addresses
  - get unsubscribed emails
  - sync unsubscribed contacts
  - check email subscription status
  - retrieve unsubscribe history
---
## Query Unsubscribed Email Addresses

**Endpoint:** `GET /email/unsubscribes`

Returns emails that unsubscribed within a date range. Useful for bi-directional sync between Braze and external email systems or databases.

**Required permission:** `email.unsubscribe`

---

### Request Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `start_date` | Conditional | String (YYYY-MM-DD) | Range start. Treated as midnight UTC. Required unless `email` is provided. |
| `end_date` | Conditional | String (YYYY-MM-DD) | Range end. Treated as midnight UTC. Required always. |
| `limit` | Optional | Integer | Max results to return. Default: 100, max: 500. |
| `offset` | Optional | Integer | Pagination offset. |
| `sort_direction` | Optional | String | `asc` (oldest first) or `desc` (newest first, default). |
| `email` | Conditional | String | Check subscription status for a specific email. |

**Constraint:** Must provide `end_date` AND either `email` or `start_date`.

**Pagination:** If results exceed `limit`, increment `offset` on successive calls until fewer than `limit` results are returned.

---

### Example Request

```bash
curl --location --request GET \
  'https://rest.iad-01.braze.com/email/unsubscribes?start_date=2020-01-01&end_date=2020-02-01&limit=1&offset=1&sort_direction=desc&email=example@braze.com' \
  --header 'Authorization: Bearer YOUR-API-KEY-HERE'
```

---

### Response

```json
{
  "emails": [
    {
      "email": "user@example.com",
      "unsubscribed_at": "2020-01-15T10:00:00Z"
    }
  ],
  "message": "success"
}
```

Results are listed in descending order by default. `unsubscribed_at` is ISO 8601 format.

---

> For full subscription state history, use Braze Currents rather than this endpoint.

`★ Insight ─────────────────────────────────────`
- The "conditional required" pattern here (need `end_date` + one of `email`/`start_date`) is a common API design for flexible querying — worth noting explicitly since the original docs bury this constraint in an alert box
- Stripping Jekyll template tags (`{% api %}`, `{% apimethod %}`, `{: .reset-td-br-*}`) is the primary cleanup work — these are Braze's static site generator artifacts that have no meaning outside their doc build pipeline
- The pagination pattern (increment `offset` until `< limit` results) is the practical operational detail engineers need most; it's preserved verbatim from the original
`─────────────────────────────────────────────────`
