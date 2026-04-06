---
name: message-building-by-channel-push-best-practices
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/message_building_by_channel/push/best_practices
indexed_at: '2026-04-05'
keywords:
  - push
  - payload
  - messages
  - targeting
  - subscription
  - permissions
  - composition
  - segments
  - opt-in
  - optimization
triggers:
  - push notification best practices
  - how to optimize push payload size
  - push notification targeting strategy
  - push subscriber permissions and opt-in
  - push message composition guidelines
---
`★ Insight ─────────────────────────────────────`
Topic files in this pipeline are "atomic knowledge units" — they live in `skills/{skill-name}/references/` and are designed to be self-contained snippets that the MCP semantic search can surface independently. The goal is maximum signal-to-noise: strip Jekyll templating, navigation links, and boilerplate, while preserving all actionable facts.
`─────────────────────────────────────────────────`

## Push Best Practices

### Message Composition

- Keep title and message body to **30–40 characters** per line
- The composer's character counter excludes Liquid characters — final length depends on render
- When in doubt, keep it short

### Payload Size Limits

Braze reserves payload space for integration/analytics, so effective maximums are lower than platform limits:

| Platform | Braze Max | Platform Max |
|---|---|---|
| Web | 3,807 bytes | 3,807 bytes |
| Android | 3,930 bytes | 3,930 bytes |
| iOS | 3,960 bytes | 3,960 bytes |
| Kindle | 5,985 bytes | — |

Most push services (APNs, FCM, Web Push, Huawei) enforce a hard **4 KB (4,096 bytes)** limit and refuse anything over it. Keep payloads to a few hundred bytes as a best practice.

**What counts toward payload size:**
- Title and message body copy
- Final rendered Liquid output (varies per user)
- Image URLs (not image file size)
- Click target URLs
- Button names
- Key-value pairs

**Reducing payload size:**
- Keep messages under 40 characters — actionable and beneficial
- Omit whitespace and line breaks
- Test Liquid-heavy messages on a real device before sending — Braze can't pre-calculate variable Liquid output
- Shorten URLs with a URL shortener

### Targeting

- Use Braze's device/usage data plus custom events and attributes to target relevant segments
- Create a **notification settings page** in your app; use boolean custom attributes (e.g., `Subscribes to Politics`) to let users self-select notification categories, then filter segments on those attributes

### Opt-In Strategy

**Android 13+** requires explicit permission before showing push. Older Android subscribes users by default.

**iOS**: Users removed automatically if they turn off notifications — Apple won't send the push token.

- Users get **one chance** to grant permission; declining makes re-enabling very difficult
- Use an **in-app push primer** (in-app message) before showing the OS permission prompt to warm users up
- Add in-app push subscription controls so users can adjust preferences without disabling at the OS level, which removes the foreground push token entirely

### Push Subscription State vs. Push Enabled

Subscription state (`subscribed`) ≠ push will be delivered. A user needs both:
1. A valid **foreground push token** (device-level permission granted)
2. A `subscribed` push subscription state

A user can be `subscribed` but still not `Foreground Push Enabled for App` if they've disabled push at the device level. Segment filters on `Foreground Push Enabled` will return false if no valid token exists.

### Sunset Policy for Unresponsive Users

Stop sending push to users who repeatedly ignore notifications before they uninstall or mark as spam:

1. Identify users with no direct or influenced opens over a defined period
2. Gradually reduce push frequency to those users
3. Send one **final notification** explaining they'll no longer receive pushes — gives them a chance to re-engage by opening it
4. Remove from push sends after the sunset window expires

---

*Compliance note: All push messages must comply with Apple App Store and Google Play Store policies — no ads, spam, or unsolicited promotions.*
