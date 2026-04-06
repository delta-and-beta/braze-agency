---
name: cdp-amplitude-amplitude-for-currents
source_url: >-
  https://braze-inc.github.io/braze-docs/_partners/data_and_analytics/customer_data_platform/amplitude/amplitude_for_currents
indexed_at: '2026-04-05'
keywords:
  - amplitude
  - currents
  - analytics
  - export
  - events
  - integration
  - cohorts
  - rate-limits
  - properties
  - sync
triggers:
  - Set up Amplitude export in Braze Currents
  - Configure Amplitude integration with Braze
  - Handle Amplitude rate limit errors
  - Map Braze events to Amplitude
  - Sync Amplitude cohorts with Braze
---
## Amplitude for Currents

Amplitude is a product analytics platform. Braze Currents can export Braze events to Amplitude for deeper analytics. This is separate from the bidirectional cohort sync (Amplitude Audiences).

**Requirement:** Amplitude account + Braze Currents enabled for your account.

## Data Export Behavior

- All events include the user's `external_user_id` as the Amplitude user ID
- Braze event properties sent under `event_properties` key
- **Amplitude user ID must match Braze external ID**
- For anonymous users, sync Amplitude device ID with Braze device ID:

```java
amplitude.setDeviceId(Appboy.getInstance(context).getDeviceId());
```

**Event naming conventions:**
- Regular events prefixed with `[Appboy]`
- Custom events prefixed with `[Appboy] [Custom Event]`
- Custom event properties prefixed with `[Custom event property]`
- Purchase event properties prefixed with `[Purchase property]`
- Amplitude cohorts imported into Braze: `[Amplitude] {COHORT_NAME}: {cohort_id}`

## Setup Steps

**Step 1 — Get Amplitude API key:** Find your Amplitude export API key in Amplitude settings.

> Keep the API key current. If credentials expire and the connector is down for >48 hours, events will be permanently dropped.

**Step 2 — Create the Current in Braze:** Navigate to **Currents > + Create Current > Create Amplitude Export**. Fill in:
- Integration name
- Contact email
- Amplitude export API key
- Amplitude region

Select events to track, then click **Launch Current**.

> Events sent via Currents count toward your Amplitude event volume quota.

## Rate Limits

Amplitude HTTP API limits:
- **30 events/second per device**
- **500K events/day per device** (undocumented)

Exceeding these causes throttling and delays across all devices. Root cause is typically a misconfigured integration or automated tests generating excessive events for a single device.

## Supported Currents Events

### Behaviors
| Event | Key |
|---|---|
| Custom event | `users.behaviors.CustomEvent` |
| Install Attribution | `users.behaviors.InstallAttribution` |
| Location | `users.behaviors.Location` |
| Purchase | `users.behaviors.Purchase` |
| Uninstall | `users.behaviors.Uninstall` |
| App first session | `users.behaviors.app.FirstSession` |
| App session end | `users.behaviors.app.SessionEnd` |
| App session start | `users.behaviors.app.SessionStart` |
| Subscription global state change | `users.behaviors.subscription.GlobalStateChange` |
| Subscription group state change | `users.behaviors.subscriptiongroup.StateChange` |

### Campaigns
| Event | Key |
|---|---|
| Abort | `users_campaigns_abort` |
| Conversion | `users.campaigns.Conversion` |
| Enroll in Control | `users.campaigns.EnrollInControl` |

### Canvas
| Event | Key |
|---|---|
| Abort | `users_canvas_abort` |
| Conversion | `users.canvas.Conversion` |
| Entry | `users.canvas.Entry` |
| Exit (matched audience) | `users.canvas.exit.MatchedAudience` |
| Exit (performed event) | `users.canvas.exit.PerformedEvent` |
| Experiment step conversion | `users.canvas.experimentstep.Conversion` |
| Experiment step split entry | `users.canvas.experimentstep.SplitEntry` |

### Messages
**Content Card:** `Abort`, `Click`, `Dismiss`, `Impression`, `Send`
— prefix: `users.messages.contentcard.*`

**Email:** `Abort`, `Bounce`, `Click`, `Delivery`, `MarkAsSpam`, `Open`, `Send`, `SoftBounce`, `Unsubscribe`
— prefix: `users.messages.email.*`

**In-app message:** `Abort`, `Click`, `Impression`
— prefix: `users.messages.inappmessage.*`

**Push notification:** `Abort`, `Bounce`, `IosForeground`, `Open`, `Send`
— prefix: `users.messages.pushnotification.*`

**SMS:** `Abort`, `Delivery`, `DeliveryFailure`, `InboundReceive`, `Rejection`, `Send`, `ShortLinkClick`
— prefix: `users.messages.sms.*`

**Webhook:** `Abort`, `Send`
— prefix: `users.messages.webhook.*`

**WhatsApp:** `Abort`, `Delivery`, `Failure`, `InboundReceive`, `Read`, `Send`
— prefix: `users.messages.whatsapp.*`

`★ Insight ─────────────────────────────────────`
- The anonymous user device ID sync is a subtle but critical requirement — without it, anonymous session data is siloed between the two platforms and can never be reconciled retroactively.
- The "48-hour drop" warning reflects Amplitude's stream buffering behavior: events are held temporarily, but once the buffer window closes, they cannot be replayed from Braze's side.
- Currents event keys use a dot-delimited namespace (`users.messages.sms.Delivery`) that maps cleanly to Amplitude's event taxonomy, making it straightforward to create funnels that cross channel types.
`─────────────────────────────────────────────────`
