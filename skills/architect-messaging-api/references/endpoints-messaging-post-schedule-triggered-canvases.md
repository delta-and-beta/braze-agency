---
name: endpoints-messaging-post-schedule-triggered-canvases
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/messaging/schedule_messages/post_update_scheduled_triggered_canvases
indexed_at: '2026-04-05'
keywords:
  - canvas
  - schedule
  - trigger
  - update
  - endpoint
  - API
  - timing
  - messaging
  - delivery
triggers:
  - update scheduled canvas
  - modify scheduled send time
  - reschedule canvas trigger
  - change canvas delivery time
  - update schedule parameters
---
## POST /canvas/trigger/schedule/update

Updates scheduled API-triggered Canvases created in the dashboard.

**Permission required:** `canvas.trigger.schedule.update`
**Rate limit:** Default

---

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
| `schedule_id` | Required | String | The `schedule_id` to update (from create schedule response) |
| `schedule` | Required | Object | Schedule object — completely overwrites the existing schedule |

---

### Key Behaviors

- **Full overwrite**: The new schedule completely replaces the previous one — partial updates are not supported.
- **UTC default**: If `in_local_time` is omitted, time is interpreted as UTC, even if the original schedule used local time.
- **Best-effort for imminent schedules**: Updates made close to the scheduled send time are applied on a best-effort basis and may not reach all targeted users.

---

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
