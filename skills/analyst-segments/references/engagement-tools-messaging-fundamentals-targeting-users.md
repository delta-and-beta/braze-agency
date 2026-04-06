---
name: engagement-tools-messaging-fundamentals-targeting-users
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/engagement_tools/messaging_fundamentals/targeting_users
indexed_at: '2026-04-05'
keywords:
  - segment
  - targeting
  - filters
  - audience
  - campaigns
  - canvas
  - testing
  - multivariate
  - apps
triggers:
  - how to target users
  - filter users by segment
  - set up multivariate testing
  - test audience criteria
---
Here is the processed topic file:

---

# Targeting Users

## Targeting Options

When building a campaign or Canvas, target your audience using one or more of these approaches. Segment membership is calculated **just before the message is sent**.

### By single segment
Select one previously created segment from the **Target Users by Segment** dropdown.

### By multiple segments
Add multiple segments from the dropdown. The resulting audience is the **intersection** (AND logic) of all selected segments — users must belong to every selected segment.

### By filters (no segment)
Apply ad-hoc filters directly without creating a segment. Useful for one-off sends.

Example filter combination: last opened app within 1 day + never received a campaign or Canvas step + made a purchase less than 30 days ago.

### By segments + additional filters
Select one or more segments, then refine further using **Additional Filters**. Example: users in "Daily Active Users" AND "Never opened email" segments, AND last purchase more than 30 days ago.

### Targeting specific apps
The **Has app** filter identifies users who have a given app, but does **not** restrict which device receives the message. A user with both Android and iOS will receive the message on both.

To send only to Android:
1. Create a segment with **Apps and websites targeted** set to **Users from specific apps**, and select the Android app.
2. Reference that segment directly in **Target Users By Segment** (not in Additional Filters) in your campaign or Canvas.

> **Note:** Adding the segment via a membership filter in Additional Filters will not restrict delivery to that app — you must use the primary Target Users By Segment field.

### Seed Groups (email only)
For email campaigns, you can target Seed Groups under the **Seed Groups** section. Seed Groups are not available for API campaigns (but can be included via API-triggered entry).

---

## Testing Your Audience

After configuring segments and filters, use **User Lookup** to check whether a specific user matches the audience criteria.

### Audience Summary
Displays an overview of who is in your target audience. From here you can:
- Set a **maximum user cap**
- Configure **rate limiting** on delivery speed

### A/B Testing
Set up multivariate tests to compare user responses to multiple campaign versions. Versions share goals but differ in wording and style. See Braze's Multivariate & A/B Testing documentation for best practices.

### Audience Statistics
Braze shows reachable user counts per channel in the footer.

- For large user bases, **Reachable Users** is an estimate.
- Counts decrease if a Global Control Group is active or message eligibility rules apply.
- **Calculate exact statistics** searches every user in the base for an accurate count (may take a few minutes; accurate to 99.999%+; operates at segment level, not filter level).
- **Show Additional Statistics** reveals the percentage of the user base targeted and Lifetime Value (LTV) for the segment.

> The target audience count and reachable users count can differ because reachable users accounts for channel-specific eligibility (e.g., opted-in, subscribed) while the audience count reflects segment/filter membership only.

---

## How Target Audience and Entry Criteria Work Together

Targeting in Braze campaigns and Canvases has two distinct parts:

| Part | What it does |
|------|-------------|
| **Target audience** | Defines who qualifies |
| **Entry criteria** | Defines what triggers delivery |

**Order of evaluation:** Braze checks target audience membership **before** evaluating the entry criteria. If a user doesn't qualify for the audience at the moment the trigger fires, they will not enter — even if they would qualify later.

Think of the target audience as a **waiting room**: only users already inside when the trigger occurs can proceed.

### Example
To send a push on a user's first session:
- **Target audience:** Users with session count = 0
- **Entry event:** Session start

A user who already has sessions will not enter, even if they start a new session, because they fail the audience check before the entry event is evaluated.

---

`★ Insight ─────────────────────────────────────`
- The AND-intersection logic for multiple segments is easy to miss in the original tab-based UI — surfacing it explicitly in prose prevents a common misconfiguration where marketers expect OR behavior
- The "specific apps" caveat (Has app ≠ restrict delivery channel) is buried in the source; elevating it with a bold callout reflects how often this surprises engineers building cross-platform campaigns
- The target audience / entry criteria ordering is the highest-value conceptual piece here — framing it as "waiting room" gives engineers a mental model that directly prevents a class of delivery bugs
`─────────────────────────────────────────────────`
