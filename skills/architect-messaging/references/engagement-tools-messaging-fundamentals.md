---
name: engagement-tools-messaging-fundamentals
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/engagement_tools/messaging_fundamentals/targeting_users
indexed_at: '2026-04-05'
keywords:
  - segment
  - targeting
  - audience
  - filtering
  - campaign
  - canvas
  - delivery
  - entry
  - multivariate
  - seed
triggers:
  - how to target users
  - create audience segments
  - set up a/b testing
  - validate user targeting
  - configure message delivery
---
# Target Audience Selection

## Targeting Options

When creating a campaign or Canvas, you can target users four ways:

| Method | Description |
|--------|-------------|
| **Single segment** | Select one previously created segment |
| **Multiple segments** | Add multiple segments — users must qualify for ALL segments (AND logic) |
| **Filters only** | Build an ad-hoc audience with filters, no segment required |
| **Segments + filters** | Target segment members AND apply additional filters to refine |

> Segment membership is calculated just before the message is sent.

### App-Specific Targeting

To send a message to only one platform (e.g., Android only):

1. Create a segment with **Apps and websites targeted** → **Users from specific apps** → select your app
2. In the campaign/Canvas, add the segment under **Target Users By Segment** (not under Additional Filters)

**Important:** The `Has app` filter identifies users who have the app — it does not restrict delivery. A user with both Android and iOS apps will receive the message on both if only `Has app: Android` is used as a filter.

## Audience Testing and Validation

After setting up targeting, use **User Lookup** to verify a specific user matches the audience criteria.

### Audience Summary

- Set a **maximum user cap** to limit total sends
- Configure **rate limiting** to control delivery speed

### A/B Testing

Set up multivariate tests comparing message versions directly in the targeting step. See Braze Multivariate & A/B Testing docs for best practices.

### Audience Statistics

- **Reachable Users** in the footer is an estimate — accuracy decreases with large user bases, Global Control Groups, or message eligibility rules
- **Calculate exact statistics** searches all users (takes a few minutes); accurate to 99.999%+
- **Show Additional Statistics** reveals % of user base targeted and Lifetime Value (LTV)

## How Target Audience and Entry Criteria Work Together

Braze evaluates targeting in two sequential steps:

1. **Target audience** — who qualifies (evaluated first)
2. **Entry criteria** — what triggers delivery (evaluated second)

A user must already be in the target audience at the moment the entry event fires. If they qualify later, they will not enter retroactively.

**Example:** To send during a user's first session:
- Setting `Target audience: session count = 0` + `Entry event: session start` will likely fail — by the time the session starts, the session count increments and the user no longer qualifies
- The target audience check acts as a **gate**, not a filter applied after triggering

## Email: Seed Groups

For email campaigns, target Seed Groups under the **Seed Groups** section. Not available for API campaigns directly, but can be included via API-triggered entry.

`★ Insight ─────────────────────────────────────`
- The AND logic for multi-segment targeting (users must be in ALL segments) is a common source of over-narrowing bugs — worth calling out explicitly so agents advise testing audience size
- The two-phase evaluation order (audience gate → entry trigger) is a subtle behavioral gotcha that causes real campaign failures; preserving this with an example is high-value for a topic file
- The "Has app" filter vs. app-specific segment distinction is a non-obvious platform behavior that warrants explicit documentation
`─────────────────────────────────────────────────`
