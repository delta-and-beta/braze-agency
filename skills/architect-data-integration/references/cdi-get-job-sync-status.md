---
name: cdi-get-job-sync-status
source_url: 'https://braze-inc.github.io/braze-docs/_api/endpoints/cdi/get_job_sync_status'
indexed_at: '2026-04-05'
keywords:
  - CDI
  - sync
  - job
  - status
  - integration
  - pagination
  - endpoint
  - API
triggers:
  - get CDI job sync status
  - check sync status for integration
  - view job sync history
  - monitor CDI sync progress
  - paginate sync results
---
## Get CDI Job Sync Status

**Endpoint:** `GET /cdi/integrations/{integration_id}/job_sync_status`

Returns a list of past sync statuses for a given CDI integration.

**Required permission:** `cdi.integration_job_status`

---

### Path Parameters

| Parameter | Required | Type | Description |
|---|---|---|---|
| `integration_id` | Required | String | Integration ID |

### Query Parameters

| Parameter | Required | Type | Description |
|---|---|---|---|
| `cursor` | Optional | String | Pagination cursor for sync status results |

Returns 10 items per call. Use the `Link` header to paginate when more than 10 syncs exist.

---

### Example Requests

**Without cursor:**
```bash
curl --location --request GET 'https://rest.iad-03.braze.com/cdi/integrations/00000000-0000-0000-0000-000000000000/job_sync_status' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer YOUR-REST-API-KEY'
```

**With cursor:**
```bash
curl --location --request GET 'https://rest.iad-03.braze.com/cdi/integrations/00000000-0000-0000-0000-000000000000/job_sync_status?cursor=c2tpcDow' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer YOUR-REST-API-KEY'
```

---

### Response

**Success (`200`):**
```json
{
  "results": [
    {
      "job_status": "success",
      "sync_start_time": "2023-01-01T00:00:00Z",
      "sync_finish_time": "2023-01-01T00:05:00Z",
      "last_timestamp_synced": "2023-01-01T00:04:59Z",
      "rows_synced": 1000,
      "rows_failed_with_errors": 0
    }
  ],
  "message": "success"
}
```

**Pagination header (when >10 syncs exist):**
```
Link: </cdi/integrations/{id}/job_sync_status?cursor=c2tpcDow>; rel="prev",
      </cdi/integrations/{id}/job_sync_status?cursor=c2tpcDoxMDA=>; rel="next"
```

- `prev` is absent on the first page; `next` is absent on the last page.

### Job Status Values

| `job_status` | Meaning |
|---|---|
| `running` | Sync is currently in progress |
| `success` | All rows synced successfully |
| `partial` | Some rows failed due to errors |
| `error` | No rows were synced |
| `config_error` | Integration configuration error — check setup |

---

### Errors

| Error | Fix |
|---|---|
| `400 Invalid cursor` | Verify the `cursor` value is valid |
| `400 Invalid integration ID` | Verify the `integration_id` value is valid |
