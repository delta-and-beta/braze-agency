---
name: message-building-by-channel-push-creating-a-push-message
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/message_building_by_channel/push/creating_a_push_message
indexed_at: '2026-04-05'
keywords:
  - push
  - notification
  - campaign
  - canvas
  - multichannel
  - message
  - composition
  - platforms
  - variants
  - audience
triggers:
  - how to create a push message
  - building a push notification campaign
  - composing push notifications
  - setting up multichannel push
  - creating push stories
---
`★ Insight ─────────────────────────────────────`
Topic files in Nick's architecture are atomic knowledge units nested under `skills/{name}/references/` — they're designed for fast lookup at the default depth level using Sonnet, so stripping navigation markup and Liquid templating makes them significantly more useful for embedding and semantic search.
`─────────────────────────────────────────────────`

## Creating a Push Message

Push notifications are ideal for time-sensitive calls-to-action and re-engaging lapsed users.

---

### Step 1: Choose Where to Build

**Campaign** (single, targeted messaging):
1. Go to **Messaging > Campaigns > Create campaign**
2. Select **Push notification** (single platform) or **Multichannel** (multiple platforms/devices)
3. Name your campaign clearly
4. Add Teams and Tags as needed
5. Add variants — each can have different platforms, message types, and layouts

**Canvas** (multi-step user journeys):
1. Create a Canvas using the Canvas composer
2. Add a Message step, name it clearly
3. Set a step schedule and delay
4. Filter audience per step
5. Set advancement behavior
6. Add additional messaging channels as needed

#### Campaign Type Decision Guide

| Scenario | Selection |
|----------|-----------|
| Single platform/device | Push Notification |
| Multiple platforms, standard push, no device-specific settings needed | Push Notification (quick push) |
| Multiple platforms, need device-specific settings | Multichannel |
| Push Stories or Inline Image | Multichannel |

**Quick push limitations** — when targeting multiple devices with Push Notification:
- No push action buttons
- No notification channels/groups
- No push TTL
- No display priority
- No custom sounds

---

### Step 2: Select Push Platforms

Limit delivery to specific apps by selecting platform and device combinations.

| Context | How to Add Platforms |
|---------|---------------------|
| Push notification campaign | Select one or more platforms/devices at campaign creation |
| Multichannel campaign | Use **Add Messaging Channel** per variant |
| Canvas | Use **+ Add more** in the Message step per variant |

Platform selections are **variant-specific** in multichannel campaigns and Canvases — useful for A/B testing engagement by platform.

---

### Step 3: Select Notification Type (iOS and Android)

Quick push campaigns: locked to **Standard push**.

Other campaigns, choose from:
- **Standard push** — default notification
- **Push stories** — multi-page rich push
- **Inline image** — Android only

For image-rich campaigns, use the rich notification guides for iOS or Android separately.

---

### Step 4: Compose the Message

The **Compose** tab controls all content and behavior. Available options vary by notification type:

| Option | Notes |
|--------|-------|
| **Notification channel/group** | iOS and Android — platform-specific options differ |
| **Language** | Add multiple languages via **Add Languages**; select languages *before* writing content so Liquid placeholders are in place |

**Right-to-left language note:** Final appearance depends on how the service provider renders it — test thoroughly before sending.

**Efficiency tip:** If all variants share similar content, compose the message first, then use **Copy from Variant** when adding additional variants.

`★ Insight ─────────────────────────────────────`
The original docs use Jekyll Liquid tags (`{% tabs %}`, `{% alert %}`, `{% image_buster %}`) which are meaningless noise in an embedding context. Stripping them and converting to Markdown tables preserves the decision logic in a format that vector search can reason over effectively. The table format for decision guides (campaign type selection, platform options) is particularly valuable because it makes conditional logic explicit.
`─────────────────────────────────────────────────`
