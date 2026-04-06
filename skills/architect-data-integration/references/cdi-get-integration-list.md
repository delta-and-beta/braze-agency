---
name: cdi-get-integration-list
source_url: 'https://braze-inc.github.io/braze-docs/_api/endpoints/cdi/get_integration_list'
indexed_at: '2026-04-05'
keywords:
  - integrations
  - CDI
  - list
  - pagination
  - cursor
  - REST
  - status
  - warehouse
  - endpoint
triggers:
  - list CDI integrations
  - get integration list
  - retrieve integrations
  - paginate integrations
  - check integration status
---
## List CDI Integrations

**Endpoint:** `GET /cdi/integrations`

Returns a list of existing CDI integrations.

**Required permission:** `cdi.integration_list`

---

### Query Parameters

| Parameter | Required | Type | Description |
|---|---|---|---|
| `cursor` | Optional | String | Pagination cursor for the integration list |

Returns 10 items per call. Use the `Link` response header to paginate.

---

### Example Requests

**Without cursor:**
```bash
curl --location --request GET 'https://rest.iad-03.braze.com/cdi/integrations' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer YOUR-REST-API-KEY'
```

**With cursor:**
```bash
curl --location --request GET 'https://rest.iad-03.braze.com/cdi/integrations?cursor=c2tpcDow' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer YOUR-REST-API-KEY'
```

---

### Response

**`200` Success**

```json
{
  "results": [
    {
      "integration_id": "string",
      "app_group_id": "string",
      "integration_name": "string",
      "integration_type": "string",
      "integration_status": "string",
      "contact_emails": "string",
      "last_updated_at": "ISO 8601 timestamp",
      "warehouse_type": "string",
      "last_job_start_time": "ISO 8601 timestamp",
      "last_job_status": "string",
      "next_scheduled_run": "ISO 8601 timestamp"
    }
  ],
  "message": "success"
}
```

**Pagination header** (present when >10 integrations exist):
```
Link: </cdi/integrations?cursor=c2tpcDow>; rel="prev",</cdi/integrations?cursor=c2tpcDoxMDA=>; rel="next"
```

- `prev` omitted on first page (no cursor call)
- `next` omitted on last page
- `Link` header absent when ≤10 total integrations

---

### Errors

| Error | Fix |
|---|---|
| `400 Invalid cursor` | Verify the `cursor` value is valid |

`★ Insight ─────────────────────────────────────`
- Braze's CDI pagination uses opaque cursor strings (base64-encoded: `c2tpcDow` decodes to `skip:0`) rather than page numbers — callers should treat cursors as black-box tokens and not attempt to construct them manually.
- The `Link` header pattern follows RFC 5988, the same standard used by GitHub's API — code that already handles GitHub pagination can be reused here.
`─────────────────────────────────────────────────`
