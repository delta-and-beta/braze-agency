---
name: intelligence-suite-intelligent-timing
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/brazeai/intelligence_suite/intelligent_timing
indexed_at: '2026-04-05'
keywords:
  - timing
  - engagement
  - scheduling
  - optimal
  - campaigns
  - delivery
  - channels
  - fallback
  - quiet
  - segments
triggers:
  - how to use intelligent timing
  - configure optimal delivery times
  - set quiet hours for campaigns
  - optimize message timing
  - schedule campaigns intelligently
---
```
★ Insight ─────────────────────────────────────
• Topic files in Nick's architecture are "atomic knowledge units" — they live in
  skills/{skill-name}/references/*.md and are the finest-grained layer of the
  two-layer content hierarchy (Topics → Skills → Roles).
• Good topic files strip Jekyll liquid tags ({% %}, {{ }}) and image references
  since those are build-time artifacts meaningless to an LLM at query time.
• Self-contained means every fact stands alone — no "see above" or relative links.
─────────────────────────────────────────────────
```

## Intelligent Timing

Intelligent Timing delivers messages to each user at their statistically optimal engagement time — when they are most likely to open or click — based on their historical interaction patterns.

### How the Optimal Time Is Calculated

Braze analyzes past interaction data per user, per channel:

- Session times
- Push Direct Opens and Influenced Opens
- Email Clicks and Opens (machine opens excluded)
- SMS Clicks (requires link shortening + advanced tracking)

**Example:** A user who reads emails in the morning but opens the app at night will receive email campaigns in the morning and push campaigns in the evening.

If no relevant engagement data exists for a user, a **fallback time** is used.

---

### When to Use Intelligent Timing

- Recurring campaigns that are not time-sensitive
- Campaigns targeting users across multiple time zones
- Campaigns targeting highly engaged users (more data = better predictions)

---

### Configuration (Campaigns)

1. Create a campaign and compose your message.
2. Select **Scheduled Delivery**.
3. Under **Time-Based Scheduling Options**, select **Intelligent Timing**.
4. Set entry frequency: **Once**, **Daily**, **Weekly**, or **Monthly**.
5. Optionally enable **Quiet Hours**.
6. Set a **fallback time** for users with insufficient data.

---

### Quiet Hours

Prevents delivery during specified hours (e.g., overnight). Replaces the older "Only send within specific hours" setting.

**Configuration logic:** Set the window when messages should *not* send.
- To send between 4 PM–6 PM → set quiet hours from 6 PM to 4 PM next day.

**Behavior when optimal time falls in quiet window:** Message is held and delivered at the nearest edge of the quiet window.
- Example: Quiet hours 10 PM–6 AM, optimal time 5:30 AM → message sends at 6:00 AM.

---

### Preview Delivery Times (Campaigns Only)

Shows how many users will receive the message in each hour of the day.

1. Add segments/filters in the Target Audiences step.
2. In **Preview Delivery Times for**, select your channel.
3. Click **Refresh Data**.

---

### Critical Timing Rules

#### Launch 48 Hours in Advance
Launch campaigns at least **48 hours before** the scheduled send date.

- Braze calculates optimal times at midnight Samoa Time (UTC+13), one of the earliest time zones.
- A single calendar day spans ~48 hours globally.
- Launching within the 48-hour buffer risks missing users whose optimal time has already passed.

| Scenario | Outcome |
|---|---|
| Optimal time < 1 hour in the past | Message sends immediately |
| Optimal time > 1 hour in the past | Message is **not sent** |

#### Segment Filters: Use a 3-Day Window
When targeting users who performed an action within a time period, use at least a **3-day window** to prevent users from falling out of the segment before their optimal time is reached.

| Avoid | Use Instead |
|---|---|
| First used app > 1 day ago AND < 3 days ago | First used app > 1 day ago AND < 4 days ago |

#### A/B Testing with Winning Variant
Schedule the Winning Variant send at least **2 days after** the A/B test begins to give Braze sufficient time to evaluate behavior.

- A/B test starts April 16 at 4:00 PM → schedule Winning Variant no earlier than April 18 at 4:00 PM.

---

### Fallback Time

Required configuration. Specifies when to send messages for users whose profiles lack sufficient engagement data to compute an optimal time.
