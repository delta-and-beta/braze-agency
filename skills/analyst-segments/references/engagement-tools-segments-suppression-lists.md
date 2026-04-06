---
name: engagement-tools-segments-suppression-lists
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/engagement_tools/segments/suppression_lists
indexed_at: '2026-04-05'
keywords:
  - suppression
  - exclusion
  - filtering
  - segments
  - campaigns
  - audience
  - activation
  - canvas
  - exceptions
  - messaging
triggers:
  - how to create a suppression list
  - exclude users from campaigns
  - set up exception tags
  - manage suppression lists
  - check if a user is suppressed
---
## Suppression Lists

Suppression lists are dynamic groups of users who automatically do not receive campaigns or Canvases. Membership is filter-based — users enter and exit automatically as they meet criteria.

### Key Behaviors

- Apply to **all message types and channels** except feature flags
- Includes: API campaigns (with `campaign_id`), API-triggered campaigns/Canvases, transactional emails
- Does **not** apply to: feature flags, or messages sent via Braze messaging endpoints without a `campaign_id`
- Inactive suppression lists have no effect — must be explicitly activated

### Exception Tags

Add exception tags to a suppression list so that users in the list are still reached by campaigns/Canvases tagged with those exceptions.

> Example: Exception tag "Shipping confirmation" → suppressed users still receive messages tagged "Shipping confirmation", but not any other messaging.

### Setup (Admin-only)

1. Go to **Audience > Suppression Lists**
2. Select **Create Suppression List** and name it
3. Define users using segment filters (at least one required)
4. Optionally add exception tags for campaigns/Canvases that should bypass suppression
5. **Save** (inactive, no effect) or **Activate** (immediately applied)

**Limits:** Up to 5 active suppression lists at a time (beta).

### Save vs. Activate

| Action | Effect |
|--------|--------|
| Save | Stored but inactive — users not excluded from any messages |
| Activate | Immediately applied — users excluded from all messaging except exception-tagged campaigns |

### Canvas Behavior

- Users already in a Canvas when added to a suppression list will **advance through non-message steps** but exit at the next Message step (without receiving it)
- They are counted in exited metrics
- New Canvas entries are blocked from the moment of suppression list addition

### Checking Suppression Status

- **User Lookup** in the **Target Audience** step of a campaign or Canvas shows which suppression list a user belongs to
- Also visible in the **Summary** step

### Management

- **Deactivate**: Suspends effect; can be reactivated later
- **Archive**: Permanent removal from the Suppression Lists page
- All users can **view** suppression lists; only **admins** can create, manage, save, or activate them

`★ Insight ─────────────────────────────────────`
- Braze's "save vs. activate" pattern is a deliberate two-stage commit — useful to capture in topic files because it affects how suppression lists interact with live campaigns
- The Canvas partial-traversal behavior (advance through non-message steps, exit at message steps) is a subtle edge case that's easy to miss but critical for data accuracy in exit metrics
- The `campaign_id` carve-out for API endpoints is a common source of confusion — worth preserving verbatim for accurate referencing
`─────────────────────────────────────────────────`
