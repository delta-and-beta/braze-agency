---
name: intelligence-suite-intelligent-channel
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/brazeai/intelligence_suite/intelligent_channel
indexed_at: '2026-04-05'
keywords:
  - engagement
  - channel
  - routing
  - segmentation
  - targeting
  - interaction
  - mobile
  - likelihood
  - delivery
  - audience
triggers:
  - Select messaging channel by engagement
  - Set up intelligent channel filter
  - Configure channel targeting for campaigns
  - Target users by channel engagement likelihood
  - Choose best channel for message delivery
---
## Intelligent Channel Filter

The **Intelligent Channel** filter selects the messaging channel with the highest likelihood of engagement for each user, based on their history. Available channels: email, SMS, WhatsApp, web push, mobile push (any OS/device).

### How It Works

- Computes engagement rate per user per channel: `interactions (opens/clicks) / messages received` over the last 6 months
- Channels are ranked by engagement ratio; highest = "Most Engaged" for that user
- Recalculated within seconds after each send or interaction
- A user counts as interacting with a message only once (open + click on same email = 1 interaction)

### Setup

Enable on the **Target Audiences** page when creating email, web push, or mobile push campaigns.

> **SMS tracking requirement:** To compute SMS engagement rate, enable [SMS link shortening](https://www.braze.com/docs/user_guide/message_building_by_channel/sms/campaign/link_shortening/) with advanced tracking and click tracking. Without it, SMS may be selected at 0% engagement due to tie-breaking behavior.

### "Not Enough Data" Option

Threshold: user must have received **3+ messages per channel** across **at least 2 of the 3 available channels**.

Users below this threshold fall into "Not Enough Data" and can be targeted via any channel.

**Pattern for combining:**
```
Intelligent Channel = Mobile Push
  OR
Intelligent Channel = Not Enough Data
```
Use a separate campaign for users where `Intelligent Channel = Email`.

> Campaigns/Canvas Steps ignoring frequency capping are excluded from Intelligent Channel calculations.

### Mobile Push Behavior

- Covers Android, iOS, Kindle, and other mobile devices
- Each device type is evaluated separately; the highest engagement rate among devices represents the "Mobile Push" category
- Used only for comparison against email and web push — does not force delivery to a specific device

### Message Open Likelihood Filter (Per-Channel)

For channel-specific targeting, use the **Message Open Likelihood** segmentation filter:
- Calculates `interactions / total messages` for the last 100 messages sent per channel
- Requires 3+ messages received on that channel to produce a score
- Users without sufficient data: use "is blank" to select them

### Tie-Breaking

Ties in engagement rates are resolved by prioritizing the channel with the **most recent open events**.

### Unreachable Users

If a user has enough data to rank channels but becomes unreachable on their top channel, they receive nothing. Target unreachable users separately.

### Audience Sizing Expectations

Intelligent Channel typically identifies **5–20%** of your usual audience — those with an established engagement record on a specific channel. It is not designed to target the majority.
