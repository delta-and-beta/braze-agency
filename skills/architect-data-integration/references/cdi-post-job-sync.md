---
name: cdi-post-job-sync
source_url: 'https://braze-inc.github.io/braze-docs/_api/endpoints/cdi/post_job_sync'
indexed_at: '2026-04-05'
keywords:
  - sync
  - cdi
  - integration
  - endpoint
  - authentication
  - permission
  - job
  - cloud
  - ingestion
triggers:
  - trigger a sync
  - sync CDI integration
  - start integration sync
  - trigger job sync
---
## Trigger CDI Job Sync

**POST** `/cdi/integrations/{integration_id}/sync`

Triggers a sync for a given Cloud Data Ingestion integration.

**Required permission:** `cdi.integration_sync`

### Path Parameters

| Parameter | Required | Type | Description |
|---|---|---|---|
| `integration_id` | Required | String | Found in the Braze dashboard URL: `https://[instance].braze.com/integrations/cloud_data_ingestion/[integration_id]` |

### Example Request

```bash
curl --location --request POST 'https://rest.iad-03.braze.com/cdi/integrations/00000000-0000-0000-0000-000000000000/sync' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer YOUR-REST-API-KEY'
```

### Response

**202 Success**
```json
{ "message": "success" }
```

### Errors

| Error | Resolution |
|---|---|
| `400 Invalid integration ID` | Verify `integration_id` is valid |
| `404 Integration not found` | No integration exists for the given ID |
| `429 Another job is in progress` | A sync is already running — retry after it completes |
