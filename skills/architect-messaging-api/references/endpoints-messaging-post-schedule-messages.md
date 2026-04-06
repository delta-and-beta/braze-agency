---
name: endpoints-messaging-post-schedule-messages
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/messaging/schedule_messages/post_update_scheduled_triggered_canvases
indexed_at: '2026-04-05'
keywords:
  - canvas
  - schedule
  - trigger
  - update
  - messaging
  - API
  - endpoint
  - broadcast
  - timing
triggers:
  - update scheduled canvas
  - reschedule canvas message
  - modify canvas send time
  - change canvas schedule
---
## POST /canvas/trigger/schedule/update

Updates scheduled API-triggered Canvases created in the dashboard.

**Required permission:** `canvas.trigger.schedule.update`
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
  "canvas_id": "(required, string)",
  "schedule_id": "(required, string)",
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
| `schedule` | Required | Object | Schedule object |

---

### Key Behaviors

- **Full overwrite**: The new schedule completely replaces any previously set schedule — partial updates are not supported.
- **UTC vs local time**: If your update omits `in_local_time`, the message sends in UTC even if the original schedule used local time.
- **Late updates**: Updates made close to or during the scheduled send time are applied on a best-effort basis — some or none of targeted users may receive the change.

---

### Example

```bash
curl --request POST 'https://rest.iad-01.braze.com/canvas/trigger/schedule/update' \
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
