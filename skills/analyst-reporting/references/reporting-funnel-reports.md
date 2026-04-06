---
name: reporting-funnel-reports
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/analytics/reporting/funnel_reports
indexed_at: '2026-04-05'
keywords:
  - funnel
  - reporting
  - conversion
  - variants
  - campaign
  - canvas
  - analytics
  - events
  - engagement
  - journey
triggers:
  - analyze funnel reports
  - compare variant performance
  - track conversions
  - understand customer journeys
  - analyze campaign analytics
---
## Funnel Reports

Funnel reporting provides a visual report to analyze customer journeys after receiving a campaign or Canvas. It shows the progression of users through a series of events over 1–30 days from the date they enter the campaign or Canvas.

**Key capability:** Compare control groups and multiple variants to understand how each affected conversion at a granular level.

**Not available for:** API campaigns.

---

## Setup

Access from:
- **Campaign Analytics** page for a specific campaign
- **Canvas Details** page → **Analyze Variants** button

### Step 1: Select Date Range

- Time frame: up to the past 6 months
- Completion window: up to 30 days from campaign/Canvas entry
- **1-day window:** funnel event must occur within 24 hours of message receipt
- **Multi-day window:** counted as calendar days in the company time zone

### Step 2: Select Funnel Events

First event is always message receipt. Subsequent events narrow the user count.

| Context | Available Events |
|---------|-----------------|
| Campaign | Started Session, Made Purchase, Performed Custom Event, Message Engagement Event |
| Canvas | Started Session, Made Purchase, Performed Custom Event, Received Canvas Step, Interacted with Step |

> **Note:** "Interacted with Step" is only available for Canvas steps using Email or push channels.

**Use case example:** Track conversions for events not set up initially. If you select a 14-day window with `Added to Cart` → `Made Purchase`, you see both the users who added to cart and those who then purchased — all within 14 days of message receipt.

Report generation can take several minutes; you can navigate away and will receive an in-dashboard notification when ready.

---

## Reading the Report

### Chart Components

| Component | Description |
|-----------|-------------|
| Horizontal axis | Percentage of message recipients who performed each action |
| Chart | Number of received messages, users performing prior/current actions, conversion rate, % change from control |
| Variants | Up to 8 variants + control group; default view shows 3 — manually select more |
| Regenerate | Re-run report; shows when it was last generated |

### Special Cases

**Multiple variants:** Table shows metrics per event/variant plus percentage change from control. Conversion rate = users who performed the event (and all preceding) ÷ message recipients.

**Re-eligibility campaigns:** Braze uses the actions taken after the *first* receipt within the time window. Funnel reports count a maximum of one conversion per user even if the event occurs multiple times.

**Multivariant + re-eligibility:** A user who received multiple variants can count toward each variant's funnel independently, based on actions after their first receipt of each variant.

**Orphaned users:** Not tracked. If an anonymous user later becomes identified via `changeUser()`, their Braze ID changes. Only follow-up events matching the user ID *at time of entry* are counted — post-identification conversions are excluded.

---

## FAQ

### Why do Canvas analytics differ from the funnel report?

They use different scoping rules for the same date range:

| Report | Scoping Rule |
|--------|-------------|
| Canvas analytics (Analyze Variants) | Filters events by **when they occurred** — only events within the selected date window count, regardless of when the user entered |
| Funnel report | Tracks events relative to **when the user entered** — counts actions within the completion window from entry date |

**Example:** A user who entered on January 1 but converted on January 8: Canvas analytics for Jan 1–7 shows 1 entry, 0 conversions. Funnel report with a 14-day window would include the January 8 conversion.

`★ Insight ─────────────────────────────────────`
**Scoping semantics matter for analytics interpretation:** The Canvas vs. funnel discrepancy is a classic "event-time vs. entry-time" problem — the same pattern appears in stream processing (event time vs. processing time). Understanding which reference point a report anchors to is critical for avoiding misinterpretation.

**Ordered event funnels vs. unordered conversion events:** Funnel steps require events in sequence, while standard conversion events just require occurrence within a window. This distinction lets funnel reports answer "did the user follow the intended path?" rather than just "did they convert?"
`─────────────────────────────────────────────────`
