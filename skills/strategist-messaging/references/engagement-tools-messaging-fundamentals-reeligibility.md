---
name: engagement-tools-messaging-fundamentals-reeligibility
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/engagement_tools/messaging_fundamentals/reeligibility
indexed_at: '2026-04-05'
keywords:
  - re-eligibility
  - campaigns
  - canvas
  - receipt
  - delivery
  - filters
  - variants
  - scheduling
  - delays
  - transactional
triggers:
  - how to enable message re-eligibility
  - prevent duplicate messages
  - set up re-eligibility delays
  - configure canvas re-entry
  - multivariate testing with re-eligible sends
---
## Message Re-eligibility

Re-eligibility controls whether users can receive a campaign or Canvas more than once. By default, Braze sends a message to a user only once, even if they re-qualify.

### Campaigns

Enable via **Delivery Controls → Allow users to become re-eligible to receive campaign**.

- Maximum re-eligibility window: **720 days**
- Re-eligibility is based on **message receipt**, not campaign entry
- Users who triggered a campaign but didn't receive it automatically qualify on their next trigger event
- Re-eligibility window of zero minutes: Braze always attempts to schedule immediately, regardless of prior receipt

**API-triggered campaigns:** Re-eligibility limits how many times a user receives the campaign regardless of how many times the API trigger fires. Useful for rate-limiting (e.g., max 1 message/day for browse-abandonment). For transactional campaigns, set delay to zero minutes to ensure delivery every time.

### Canvas

Enable via **Entry Controls → Allow users to re-enter this Canvas**.

- Re-eligibility is tied to **Canvas entry**, not message receipt
- Users can re-enter before completing their first journey (e.g., 7-day Canvas with 3-day re-eligibility window)
- Re-eligibility of zero seconds: user can re-enter without exiting first
- Steps previously received during a prior journey are **not visible** to the user on re-entry — they may receive the same message again

**Preventing duplicate messages:**
- Add filters to exclude users who already received specific steps
- Use a [User Update step] to log a custom attribute marking step receipt, then filter on it
- Set re-eligibility to the maximum Canvas duration to prevent premature re-entry

**In-app message caution:** If re-eligibility is shorter than Canvas duration, multiple in-app messages can be triggered by the same session start, causing the user to see the same message repeatedly.

### Re-eligibility Delay Calculations

Delays are measured in **seconds**, not calendar days:

| Unit | Seconds |
|------|---------|
| 1 day | 86,400 s (24 hours from receipt) |
| 1 month | 2,592,000 s (~30 days) |

**Implication:** A campaign set to send monthly on the 15th with 30-day re-eligibility will **not** reach users on March 15 if they received it February 15 — February to March 15 is fewer than 30 days. Similarly, send latency can push a user outside their re-eligibility window for next-day sends.

### Multivariate Testing

- Variant assignment is **consistent** across re-eligible sends when percentages are unchanged — users always enter the same variant
- Changing variant percentages may redistribute users to different variants
- Control group membership is stable: no user who received a message ever moves to the control group, and no control group user ever receives a message
