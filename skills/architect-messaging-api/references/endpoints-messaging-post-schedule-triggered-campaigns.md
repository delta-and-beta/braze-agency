---
name: endpoints-messaging-post-schedule-triggered-campaigns
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/messaging/schedule_messages/post_update_scheduled_triggered_campaigns
indexed_at: '2026-04-05'
keywords:
  - schedule
  - campaign
  - trigger
  - endpoint
  - timezone
  - update
  - messaging
  - time
  - API
triggers:
  - update campaign schedule
  - reschedule API trigger
  - change send time
  - modify trigger schedule
  - manage campaign timing
---
## POST /campaigns/trigger/schedule/update

Updates the schedule for an existing API-triggered campaign created in the dashboard.

**Requires:** API key with `campaigns.trigger.schedule.update` permission
**Rate limit:** Default Braze rate limit

---

### Request

```
POST https://rest.iad-01.braze.com/campaigns/trigger/schedule/update
Content-Type: application/json
Authorization: Bearer YOUR-REST-API-KEY
```

```json
{
  "campaign_id": "campaign_identifier",
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
| `campaign_id` | Yes | String | The campaign to update |
| `schedule_id` | Yes | String | Obtained from the create schedule response |
| `schedule` | Yes | Object | See schedule object spec |

---

### Key Behaviors

- **Full overwrite**: The new schedule completely replaces the previous one — no merging.
- **Timezone handling**: If you remove `in_local_time: true`, the time is interpreted as UTC. Example: updating from `{"time": "...", "in_local_time": true}` to `{"time": "..."}` sends in UTC.
- **Last-second updates**: Updates near send time are applied on a best-effort basis — may apply to all, some, or none of targeted users.
- **Local time edge case**: Updates are not applied if the original schedule used local time and that time has already passed in any timezone.
- **`trigger_properties`**: Can be passed to template values into the message body.

---

### Example (curl)

```bash
curl --location --request POST 'https://rest.iad-01.braze.com/campaigns/trigger/schedule/update' \
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

`★ Insight ─────────────────────────────────────`
- The "full overwrite" semantic is the highest-risk behavior here — partial updates aren't supported, so callers must always re-specify the complete desired schedule, not just the fields they want to change.
- The local-time irreversibility edge case (updates blocked if any timezone has already passed) is a subtle footgun worth surfacing prominently in any agent skill or UI that wraps this endpoint.
`─────────────────────────────────────────────────`
