---
name: api-objects-schedule-object
source_url: 'https://braze-inc.github.io/braze-docs/_api/objects_filters/schedule_object'
indexed_at: '2026-04-05'
keywords:
  - schedule
  - datetime
  - timezone
  - campaign
  - canvas
  - scheduling
  - optimal_time
  - schedule_id
triggers:
  - how to schedule messages
  - create scheduled campaigns
  - configure send times
  - set optimal send time
  - specify schedule parameters
---
## Schedule Object

Used in campaign and Canvas schedule creation endpoints to specify when users receive messages.

### Object Structure

```json
"schedule": {
  "time": (required, datetime as ISO 8601 string) time to send the message in UTC,
  "in_local_time": (optional, bool),
  "at_optimal_time": (optional, bool)
}
```

### Parameters

| Parameter | Type | Notes |
|---|---|---|
| `time` | ISO 8601 string | Required. Send time in UTC. |
| `in_local_time` | bool | Send at `time` in each user's local timezone. Returns error if `time` has already passed in all time zones. |
| `at_optimal_time` | bool | Send at the optimal time on the specified date, regardless of the `time` value provided. |

**Time format note:** When using `in_local_time` or `at_optimal_time`, omit timezone designators from `time`:
- Correct: `"2015-02-20T13:14:47"`
- Incorrect: `"2015-02-20T13:14:47-05:00"`

### Schedule ID Response

After scheduling, save the returned `schedule_id` for future cancel/update operations.

```json
{
  "schedule_id": (required, string) identifier for the scheduled message you created
}
```

The response also includes a `dispatch_id` — a unique identifier for each transmission sent from Braze.
