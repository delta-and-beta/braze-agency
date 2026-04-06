---
name: endpoints-messaging-post-update-scheduled-messages
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/messaging/schedule_messages/post_update_scheduled_triggered_canvases
indexed_at: '2026-04-05'
keywords:
  - canvas
  - schedule
  - update
  - trigger
  - message
  - api
  - timezone
  - endpoint
  - scheduled
triggers:
  - how to update scheduled messages
  - reschedule canvas messages
  - modify canvas send time
  - update canvas trigger schedule
---
## POST /canvas/trigger/schedule/update

Updates scheduled API-triggered Canvases created in the dashboard.

**Required permission:** `canvas.trigger.schedule.update`
**Rate limit:** Default

---

### Key Behavior

- **Full overwrite**: Each update completely replaces the previous schedule — partial updates are not supported.
- **Local time caveat**: If you originally scheduled with `in_local_time: true` and update without it, the message sends in UTC.
- **Last-second updates**: Updates close to send time are best-effort — some, all, or no targeted users may receive the change.

---

### Request

```
POST https://rest.iad-01.braze.com/canvas/trigger/schedule/update
Content-Type: application/json
Authorization: Bearer YOUR-REST-API-KEY
```

### Parameters

| Parameter | Required | Type | Description |
|---|---|---|---|
| `canvas_id` | Required | String | Canvas identifier |
| `schedule_id` | Required | String | The schedule to update (from create schedule response) |
| `schedule` | Required | Object | Schedule object (completely replaces existing schedule) |

### Example Request

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

### Schedule Object Fields

| Field | Type | Description |
|---|---|---|
| `time` | String (ISO 8601) | When to send |
| `in_local_time` | Boolean | Send at `time` in each user's local timezone |

---

**Note:** The `schedule_id` is returned in the response from `POST /canvas/trigger/schedule/create`.
