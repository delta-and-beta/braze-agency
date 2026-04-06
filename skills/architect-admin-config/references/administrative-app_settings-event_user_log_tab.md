---
name: administrative-app_settings-event_user_log_tab
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/administrative/app_settings/event_user_log_tab
indexed_at: '2026-04-05'
keywords:
  - logging
  - debugging
  - SDK
  - events
  - sessions
  - troubleshooting
  - attributes
  - campaigns
  - JSON
  - retention
triggers:
  - view event logs
  - debug SDK errors
  - filter user events
  - force data flush
  - inspect raw JSON
---
## Event User Log

A debugging tool in **Settings > Event User Log** that logs SDK/API errors with type, associated app, timestamp, and raw data.

**Log retention:** 30 days.

### Filtering Options
- SDK or API
- App Names
- Time frame
- User

### Log Sections
Each log may include: Device Attributes, User Attributes, Events, Campaign Events, Response Data. Use the **Expand data** icon to view raw JSON.

---

### Troubleshooting

**Missing SDK logs for test users**
If a user is in an internal group but shows no SDK logs, enable **Record User Events for group members** in the Internal Group Settings for that group.

**Delayed log updates**
Expected behavior. The SDK caches events locally and flushes to the server every ~10 seconds; job queue ingestion adds additional latency (seconds to minutes depending on load).

To force immediate flush, call:
```
requestImmediateDataFlush()
```

**In-app message impression failures**
Expand raw JSON for the relevant SDK request and inspect the `error_code` field in the response data. This identifies the specific failure reason (e.g., invalid color value, rendering issue).

**Session end/start with similar timestamps (iOS)**
iOS aggressively suspends background threads, so Braze cannot flush session-end data until the app reopens. The Event User Log shows the flush timestamp (milliseconds before next session start), not the actual end time.

- Session Duration is flushed separately and reflects accurate open time
- `Median Session Duration` filter is **not** affected by this behavior

### Session Data Available via Braze
- Number of sessions per user
- Last session start timestamp
- Session start after campaign receipt
- Median session duration
