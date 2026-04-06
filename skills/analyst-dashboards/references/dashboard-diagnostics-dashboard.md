---
name: dashboard-diagnostics-dashboard
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/analytics/dashboard/diagnostics_dashboard
indexed_at: '2026-04-05'
keywords:
  - dashboard
  - diagnostics
  - messaging
  - campaigns
  - canvases
  - abort
  - outcomes
  - delivery
  - liquid
  - webhooks
triggers:
  - why is my campaign not sending
  - troubleshoot message delivery
  - view message send outcomes
  - analyze campaign failures
  - debug abort reasons
---
`★ Insight ─────────────────────────────────────`
Topic files in Nick are atomic knowledge units nested under a skill's `references/` directory. The goal is maximum information density — stripping Jekyll template syntax (`{% alert %}`, `{: .reset-td-br-1 }`, `{{site.baseurl}}`), image references, and early-access caveats while preserving the facts an agent needs to answer questions accurately.
`─────────────────────────────────────────────────`

## Messaging Diagnostics Dashboard

A Braze-created dashboard under **Analytics > Dashboard Builder** that shows message sending outcomes to help identify why campaigns or Canvases aren't sending as expected.

**Data window:** Last 7 days only. Update frequency is typically under 1 hour but not guaranteed.

---

### Setup

1. Go to **Analytics > Dashboard Builder > Messaging Diagnostics**
2. Choose **Campaigns** or **Canvases**
3. Select one or more campaigns/Canvases
4. Click **Run Dashboard**

---

### Sent vs. Delivered — Critical Distinction

"Sent" means Braze successfully processed and dispatched the message — **not** that it reached the user's device. Final delivery depends on third-party partners.

| Channel | What "sent" means |
|---|---|
| Content Cards | Card is eligible for viewing |
| Email | Handed off to ESP (e.g., SendGrid); ESP handles final delivery and may report bounces |
| In-app messages | Message was surfaced to the user |
| LINE | Handed off to sending partner |
| Push | Handed off to APNs (iOS) or FCM (Android); service handles device delivery |
| SMS/MMS/RCS | Handed off to SMS gateway (e.g., Twilio); gateway handles carrier delivery |
| Webhooks | Request completed with a `2xx` response |
| WhatsApp | Handed off to sending partner |

---

### Summary Tiles

| Tile | Definition |
|---|---|
| **Total Aborts** | All aborted messages, including Canvas members who didn't enter or exited due to step failure or exit criteria |
| **Message Sends** | Total messages Braze successfully processed and sent (channel-specific meaning per table above) |

---

### Charts

**Message outcomes over time** — Day-by-day breakdown of abort/drop reasons. Zero-count reasons are hidden. Does not show send counts.

**Message outcomes breakdown** — Proportional view of all outcomes (sends + every abort/drop reason) for the selected time range. Use to identify the most common failure modes.

---

### Abort Outcome Reference

#### Content & Rendering

| Outcome | Cause |
|---|---|
| Content Card expired | Card expired before user saw it |
| Content Card invalid | Errors prevented send — common causes: exceeds 2 KB, invalid expiration date, invalid characters |
| Connected Content failed | Reached max retry limit (default: 5); count reflects aborted messages, not total failed requests |
| In-app message rendering timeout | Liquid could not render after multiple retries |
| Liquid abort | `abort_message` Liquid tag was called explicitly |
| Liquid rendering timeout | Liquid template took too long — most common in Banners, in-app messages, and email |
| Liquid syntax error | Liquid template had a parsing error |

#### Campaign & Canvas State

| Outcome | Cause |
|---|---|
| Delay step failure | Personalized delay variable was empty/invalid type, or delay exceeded Canvas max duration |
| Exception or exit event | User triggered an exception event (action-based campaign) or met Canvas exit criteria mid-journey |
| Inactive campaign | Campaign was stopped while message was in-flight |
| Inactive Canvas | Canvas was stopped before user entered |
| Inactive Canvas step | Step was deleted, or Canvas was stopped (making all steps inactive) |
| Volume limited | Campaign reached its configured volume cap |

#### Rate Limiting & Timing

| Outcome | Cause |
|---|---|
| Frequency capped | User hit the frequency cap limit for the send window |

---

`★ Insight ─────────────────────────────────────`
The source content cuts off mid-table at "Frequency capped" — the original doc likely continues with more rate-limiting and timing abort reasons. When this topic file is used by an agent, it should note that the rate limiting section may be incomplete and refer users to the full Braze docs for exhaustive abort outcome definitions.
`─────────────────────────────────────────────────`
