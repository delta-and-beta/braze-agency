---
name: endpoints-messaging-post-update-scheduled-triggered-canvases
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/messaging/schedule_messages/post_update_scheduled_triggered_canvases
indexed_at: '2026-04-05'
keywords:
  - canvas
  - trigger
  - schedule
  - update
  - endpoint
  - messaging
  - API
  - timezone
  - authentication
  - rate-limit
triggers:
  - update scheduled canvas
  - modify canvas trigger schedule
  - reschedule canvas send time
  - update api-triggered canvas
  - change canvas schedule timing
---
## POST /canvas/trigger/schedule/update

Updates scheduled API-triggered Canvases created in the dashboard.

**Required permission:** `canvas.trigger.schedule.update`
**Rate limit:** Default Braze rate limit

### Key Behaviors

- Any `schedule` provided **completely overwrites** the previous schedule — partial updates are not supported
- Timezone note: if original schedule used `in_local_time: true` and the update omits it, the message sends in UTC
- Updates made close to the send time apply on a best-effort basis — some targeted users may receive the old schedule

### Request

```
POST https://rest.iad-01.braze.com/canvas/trigger/schedule/update
Content-Type: application/json
Authorization: Bearer YOUR-REST-API-KEY
```

```json
{
  "canvas_id": "canvas_identifier",
  "schedule_id": "schedule_identifier",
  "schedule": {
    "time": "2017-05-24T21:30:00Z",
    "in_local_time": true
  }
}
```

### Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `canvas_id` | Required | String | Canvas identifier |
| `schedule_id` | Required | String | Obtained from the create schedule response |
| `schedule` | Required | Object | Schedule object — fully replaces existing schedule |

### Example (curl)

```bash
curl --location --request POST 'https://rest.iad-01.braze.com/canvas/trigger/schedule/update' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer YOUR-REST-API-KEY' \
--data-raw '{
  "canvas_id": "canvas_identifier",
  "schedule_id": "schedule_identifier",
  "schedule": {
    "time": "2017-05-24T21:30:00Z",
    "in_local_time": true
  }
}'
```
