---
name: administrative-app_settings-push_settings
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/administrative/app_settings/push_settings
indexed_at: '2026-04-05'
keywords:
  - push
  - TTL
  - FCM
  - priority
  - delivery
  - Android
  - notifications
  - settings
triggers:
  - configure push TTL
  - set FCM priority
  - manage push settings
  - adjust notification delivery
  - default push configuration
---
## Push Settings

Configure global defaults for push notification delivery under **Settings > Manage Settings > Push Settings**.

---

### Push TTL (Time to Live)

Controls how long Braze attempts to deliver a push notification to offline devices. Once TTL expires, undelivered messages are dropped. Does not remove notifications already received.

**Default maximum TTL values by platform:**

| Platform | Max TTL |
|---|---|
| Web (FCM or Web Push) | 28 days |
| Firebase Cloud Messaging (FCM) | 28 days |
| Kindle (ADM) | 31 days |
| Huawei (HMS) | 15 days |

**To set a custom default TTL:**
1. Go to **Settings > Manage Settings > Push Settings**
2. For each Android platform, set a default TTL (supports hours/seconds for fine-grained control)
3. Select **Save**

> Per-message TTL overrides are available in Advanced Campaign Settings.

---

### Default FCM Priority (Android)

Sets the default Firebase Cloud Messaging delivery priority for all new Android push campaigns.

| Priority | Behavior | Use Case |
|---|---|---|
| Normal | Battery-optimized delivery | Non-urgent content |
| High | Immediate delivery | Time-sensitive notifications |

**To set default FCM priority:**
1. Go to **Settings > Manage Settings > Push Settings**
2. In the FCM Priority section, select **Normal** or **High**
3. Select **Save**

> **Note:** If FCM detects frequent high-priority messages that don't produce user engagement or visible notifications, it may automatically downgrade them to Normal priority.

Both settings apply globally to all campaigns unless overridden at the individual campaign level.
