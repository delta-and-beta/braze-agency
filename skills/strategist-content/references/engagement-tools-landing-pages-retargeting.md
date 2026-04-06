---
name: engagement-tools-landing-pages-retargeting
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/engagement_tools/landing_pages/retargeting
indexed_at: '2026-04-05'
keywords:
  - retargeting
  - landing-page
  - forms
  - segments
  - action-based
  - delivery
  - canvas
  - campaign
  - targeting
  - submissions
triggers:
  - retarget users who submitted landing page forms
  - set up landing page form retargeting
  - automate follow-up messages after form submission
  - create segments from landing page submissions
  - trigger messages on landing page form action
---
## Landing Page Retargeting

Braze automatically tracks landing page form submissions. For user-specific retargeting, use one of two methods:

### Method 1: Segment-Based Retargeting

When creating a segment, under the **Retargeting** filter group, select **Submitted Form on Landing Page**.

This lets you target users based on whether they **have** or **have not** submitted a specific landing page form.

### Method 2: Action-Based Message Trigger

In campaign or Canvas delivery settings, select **Action-Based Delivery** → **Submitted Landing Page Form**.

Users who submit the form will be messaged via the chosen channel or entered into the Canvas automatically.

> **Note:** Action-based delivery for landing pages is **not available for in-app messages**. To target in-app message recipients, use the **Submitted Form on Landing Page** filter in campaign **Targeting Options** instead.

### Prerequisites

A landing page with a form must exist before setting up retargeting.

`★ Insight ─────────────────────────────────────`
- Braze uses two distinct retargeting paradigms: **passive** (segments, evaluated on-demand) vs **reactive** (action-based triggers, evaluated at event time). Segments are better for batch campaigns; triggers are better for real-time follow-up flows like Canvas journeys.
- The in-app message carve-out is a common Braze constraint — IAM delivery is session-scoped (shown when app is open), so action-based triggers tied to web events like form submissions don't map cleanly to it.
`─────────────────────────────────────────────────`
