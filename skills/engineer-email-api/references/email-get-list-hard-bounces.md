---
name: email-get-list-hard-bounces
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/email/get_list_hard_bounces
indexed_at: '2026-04-05'
keywords:
  - email
  - bounces
  - hard-bounce
  - addresses
  - pagination
  - filtering
  - endpoints
  - permission
triggers:
  - list hard bounced emails
  - retrieve bounced email addresses
  - check if email hard bounced
  - find hard bounces by date
  - query bounced addresses
---
## List Hard Bounced Emails

**Endpoint:** `GET /email/hard_bounces`

Retrieves email addresses that hard bounced within a specified time frame.

**Required permission:** `email.hard_bounces`

---

### Request Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `start_date` | Optional* | String (YYYY-MM-DD) | Start of date range. Treated as midnight UTC. |
| `end_date` | Required | String (YYYY-MM-DD) | End of date range. Treated as midnight UTC. |
| `limit` | Optional | Integer | Max results to return. Default: 100, max: 500. |
| `offset` | Optional | Integer | Pagination offset. |
| `email` | Optional* | String | Check if a specific email has hard bounced. |

**Rules:**
- Must provide `end_date` AND either `start_date` or `email`.
- If all three are provided, `email` takes priority and date range is ignored.
- Using `offset`/`limit` with `email` can return an empty response.
- For date ranges exceeding `limit` results, paginate by incrementing `offset` until fewer than `limit` results are returned.

---

### Example Request

```bash
curl --location --request GET \
  'https://rest.iad-01.braze.com/email/hard_bounces?start_date=2019-01-01&end_date=2019-02-01&limit=100&offset=1' \
  --header 'Authorization: Bearer YOUR-API-KEY-HERE'
```

---

### Response

Results are in descending order.

```json
{
  "emails": [
    {
      "email": "user@example.com",
      "hard_bounced_at": "2019-01-15T10:30:00Z"
    }
  ],
  "message": "success"
}
```
