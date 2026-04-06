---
name: engagement-tools-segments-measuring-segment-size
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/engagement_tools/segments/measuring_segment_size
indexed_at: '2026-04-05'
keywords:
  - segment
  - membership
  - statistics
  - audience
  - reachable
  - channels
  - filters
  - users
  - subscription
  - campaign
triggers:
  - how to measure segment size
  - check segment membership
  - calculate exact statistics
  - view reachable users
  - segment statistics
---
## Measuring Segment Size

### Segment Membership Calculation

Segment membership updates as data reaches Braze servers — typically instantaneous. However, membership changes only take effect after a session is processed (e.g., a user in a "lapsed user" segment is moved out once their new session is processed, not during it).

### Estimated vs. Exact Statistics

Braze provides two modes for segment size:

| Mode | Behavior |
|------|----------|
| **Estimated** | Sampled subset extrapolated to full audience; cached for 15 minutes; may vary between checks |
| **Exact** | Full calculation; 99.999%+ accurate; cached for 24 hours; re-run via "Calculate Exact Statistics" |

**When to use exact stats:**
- Very small segments (estimated range may include 0 even when segment is non-empty)
- Before sending campaigns/Canvases (exact stats are always calculated automatically at send time)
- Large workspaces where estimated/exact divergence is most pronounced

**Why estimates fluctuate:** Braze queries a different random subset each time. Re-ordering filters or rechecking the same unmodified segment can yield different estimates, even though exact stats would be identical.

### Reachable Users

**Total Reachable Users** shows the segment size plus breakdowns by channel. The `Total` row counts unique users — a user with both Android and iOS push counts once in `Total` but appears in both channel rows.

**Channels included in breakdown:** Email, iOS push, Android push, web push, Kindle push  
**Channels NOT in breakdown:** Content Cards, webhooks, WhatsApp

This means `Total` can exceed the sum of listed channels — the gap represents users reachable only through unlisted channels.

#### Reachability Requirements

A user is reachable on a channel only if they have **both**:
1. A valid email address or push token on their profile
2. Opted-in or subscribed to your app

#### Filters Applied Per Channel

| Channel | Filter Applied |
|---------|---------------|
| Email | Email Available = true |
| Push | Foreground Push Enabled = true |
| SMS | In any SMS subscription group AND Invalid Phone Number = false |

### Filter-Level Statistics

Within the segment editor, each filter group shows estimated reachable users. Use **Expand extra funnel statistics** for a per-channel breakdown at the filter level (not just the full segment).

### Key Behaviors to Know

- Estimated stats auto-update when you edit a segment; otherwise they're stale for up to 15 minutes
- Exact stats are cached for 24 hours; use **Refresh exact statistics** to re-run
- For large workspaces with small segments, expect larger variance between estimated and exact counts
- A segment's exact statistics are always recalculated before any campaign or Canvas send

`★ Insight ─────────────────────────────────────`
- The two-tier caching model (15min estimated, 24hr exact) reflects a deliberate performance tradeoff: estimates are cheap to compute via sampling, while exact counts require a full scan — the same pattern used in databases with approximate `COUNT` vs full aggregation queries.
- The "Total can exceed sum of channels" behavior is a classic set union vs. intersection issue — understanding it prevents false assumptions when building multi-channel campaigns.
- Segment membership being session-bound (not event-bound) is an important behavioral nuance: real-time data ingestion doesn't mean real-time membership changes.
`─────────────────────────────────────────────────`
