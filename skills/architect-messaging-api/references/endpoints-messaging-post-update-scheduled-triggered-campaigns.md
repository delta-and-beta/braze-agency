---
name: endpoints-messaging-post-update-scheduled-triggered-campaigns
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/messaging/schedule_messages/post_update_scheduled_triggered_campaigns
indexed_at: '2026-04-05'
keywords:
  - schedule
  - campaign
  - trigger
  - update
  - time
  - timezone
  - UTC
  - endpoint
  - API
  - messaging
triggers:
  - how to update a campaign schedule
  - reschedule an API-triggered campaign
  - change campaign send time
  - modify scheduled campaign timing
  - update campaign notification time
---
## POST /campaigns/trigger/schedule/update

Updates the schedule for an existing API-triggered campaign that was scheduled via the dashboard or the create schedule endpoint.

**Endpoint:** `POST https://rest.{instance}.braze.com/campaigns/trigger/schedule/update`

**Permission required:** `campaigns.trigger.schedule.update`

---

### Key Behaviors

- **Full overwrite**: The new schedule completely replaces the previous one — no partial updates.
- **UTC handling**: If you update a local-time schedule to one without `in_local_time: true`, Braze will send in UTC regardless of original intent.
- **Best-effort for imminent sends**: Updates made close to the scheduled send time are applied on a best-effort basis and may not reach all targeted users.
- **Local-time edge case**: Updates are not applied if the original schedule used local time and that time has already passed in any timezone.

---

### Request Body

```json
{
  "campaign_id": "campaign_identifier",       // required
  "schedule_id": "schedule_identifier",       // required — from create schedule response
  "schedule": {
    "time": "2017-05-24T21:30:00Z",
    "in_local_time": true                     // optional
  }
}
```

| Parameter | Required | Type | Notes |
|---|---|---|---|
| `campaign_id` | Yes | String | Campaign identifier from dashboard |
| `schedule_id` | Yes | String | Returned by the create schedule endpoint |
| `schedule` | Yes | Object | Fully replaces existing schedule |

---

### Example Request

```bash
curl --request POST 'https://rest.iad-01.braze.com/campaigns/trigger/schedule/update' \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer YOUR-REST-API-KEY' \
  --data-raw '{
    "campaign_id": "campaign_identifier",
    "schedule_id": "schedule_identifier",
    "schedule": {
      "time": "2017-05-24T21:30:00Z",
      "in_local_time": true
    }
  }'
```

---

### Notes

- Requires an API-Triggered Campaign (campaign with a `campaign_id` created for API triggering).
- `trigger_properties` can be templated into the message if needed (set at send time, not here).
- Rate limit: default Braze REST rate limit applies.
