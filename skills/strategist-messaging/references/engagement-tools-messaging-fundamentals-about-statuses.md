---
name: engagement-tools-messaging-fundamentals-about-statuses
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/engagement_tools/messaging_fundamentals/about_statuses
indexed_at: '2026-04-05'
keywords:
  - campaign
  - canvas
  - status
  - messaging
  - draft
  - active
  - archived
  - stopped
  - idle
  - scheduling
  - filtering
triggers:
  - how to change campaign status
  - resume a stopped canvas
  - filter campaigns by status
  - what do campaign statuses mean
  - how to pause or stop campaigns
---
## Campaign & Canvas Statuses

### Available Statuses

| Status | Description |
|--------|-------------|
| **Active** | Currently sending. Shown by default on campaign/Canvas pages. |
| **Draft** | Saved but not launched. Find via Messaging > Canvas or Campaigns. |
| **Archived** | No longer sending. Removed from Home and Revenue statistic graphs. |
| **Stopped** | Paused but still editable. Resume via Canvas Summary step > **Resume Canvas**, or via the ellipsis menu for campaigns. |
| **Idle** | Automatically assigned when a campaign/Canvas stops sending messages. Shows associated auto-stop date. |

### Filtering & Changing Status

- **Filter**: Use the **All Statuses** dropdown on the campaigns/Canvas list page.
- **Change**: Select the ellipsis (`⋮`) menu on any campaign or Canvas, then choose a status.

### Stopped Canvas Behavior

When a Canvas is stopped:

- **Scheduled messages** — Not sent, including users queued due to rate limiting.
- **Email sends** — May not stop immediately; ESP may continue processing in-flight requests.
- **Delay steps** — Users remain in delay steps but exit the Canvas when the delay period ends.
- **Draft changes** — Any unsaved draft changes are discarded on stop.

On resume, previously-stopped messages send as scheduled, provided the scheduled time hasn't already passed.

### Best Practices

- **Monitor by status** — Use status filtering to evaluate engagement metrics for active campaigns and decide whether stopped Canvases should be resumed or archived.
- **Audit active messages** — Regularly review active campaigns and Canvases for relevance; remove or update outdated messaging.
- **Organization** — Use teams and tags alongside status filtering for at-a-glance context.
