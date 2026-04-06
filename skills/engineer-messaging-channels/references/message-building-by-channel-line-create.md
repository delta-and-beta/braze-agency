---
name: message-building-by-channel-line-create
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/message_building_by_channel/line/create
indexed_at: '2026-04-05'
keywords:
  - LINE
  - campaign
  - Canvas
  - message
  - Liquid
  - variant
  - targeting
  - conversion
  - delivery
  - personalization
triggers:
  - Create a LINE message campaign
  - Build LINE message variants
  - Set up LINE message delivery
  - Compose LINE messages with personalization
  - Configure LINE message conversion tracking
---
`★ Insight ─────────────────────────────────────`
Topic files in Nick's architecture are "atomic knowledge units" — the smallest self-contained reference a query can retrieve. Good topic files strip Liquid/Jekyll templating artifacts and internal cross-references that won't resolve outside the source docs site, while preserving the procedural sequence that makes the content actionable.
`─────────────────────────────────────────────────`

## Create a LINE Message

LINE campaigns let you reach customers directly with programmatic, personalized messaging using Liquid and Connected Content.

### Prerequisites

- Complete LINE setup (LINE connection configured in Braze)
- Review LINE policies, limits, and content rules
- LINE messages consume Message Credits from your account

---

### Step 1: Choose Campaign or Canvas

| Use | When |
|-----|------|
| Campaign | Single, targeted messaging sends |
| Canvas | Multi-step user journeys |

**Campaign setup:**
1. Go to **Messaging > Campaigns** → **Create Campaign**
2. Select **LINE** (or **Multichannel Campaign** for multi-channel sends)
3. Name the campaign clearly
4. Add Teams and Tags as needed
5. Add variants as needed — each can have different platforms, message types, and layouts
   - Tip: Compose first, then use **Copy from Variant** when adding similar variants

**Canvas setup:**
1. Create a Canvas using the Canvas composer
2. Add a step, name it clearly
3. Set step schedule and delay
4. Filter audience for this step (evaluated at send time, after delay)
5. Set advancement behavior
6. Optionally pair with other messaging channels

---

### Step 2: Compose the LINE Message

- Up to **5 message bubbles** per message
- Available layouts: **text, image, rich, card-based**
- Supports Liquid personalization and Connected Content

**Liquid tips:**
- Always include default values to avoid blank placeholders
  - Bad: `"Hi, !"` — Good: `"Hi, new subscriber!"`
- Use defaults for any personalization attribute that may be missing from user profiles

**Right-to-left messages:** Final appearance depends on how LINE renders them — follow Braze's right-to-left message best practices for accuracy.

---

### Step 3: Preview and Test

- Use the **Test** tab to:
  - Send a test message to content test groups or individual users
  - Preview the message as a specific user directly in Braze

---

### Step 4: Delivery, Targeting, and Conversion (Campaigns)

**Delivery options:**
- Scheduled time
- Action-based trigger
- API trigger

**Delivery controls:**
- Re-eligibility settings
- Frequency capping rules
- Campaign duration and Quiet Hours (action-based only)

**Targeting:**
- Select segments and apply additional filters
- Subscription group selection narrows audience by communication preference
- Exact segment membership is calculated at send time

**Conversion events:**
- Track up to a **30-day window** after message receipt
- Examples:
  - Purchase-goal campaign → set conversion event to `Purchase`
  - App engagement campaign → set conversion event to `Starts Session`
  - Custom events supported for specific use cases

For Canvas: complete remaining Canvas sections including multivariate testing and Intelligent Selection as needed.

---

### Step 5: Review and Deploy

Review campaign/Canvas details, run final tests, then send.

**Post-send:** Access results via LINE Reporting to track campaign performance.
