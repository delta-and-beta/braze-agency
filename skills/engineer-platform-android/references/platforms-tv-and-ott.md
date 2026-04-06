---
name: platforms-tv-and-ott
source_url: 'https://braze-inc.github.io/braze-docs/_developer_guide/platforms/tv_and_ott'
indexed_at: '2026-04-05'
keywords:
  - tv
  - ott
  - sdk
  - notifications
  - messages
  - platform
  - firetv
  - android
  - roku
  - apple
triggers:
  - TV platform integration
  - OTT messaging setup
  - TV push notifications
  - Android TV support
  - Fire TV SDK setup
---
`★ Insight ─────────────────────────────────────`
Topic files in Nick's architecture are atomic knowledge units — the raw HTML table with icon-based support indicators needs to be distilled into scannable, text-based reference content since downstream agents can't parse `<i class="fas fa-check">` as meaning "supported".
`─────────────────────────────────────────────────`

## TV & OTT Platform Support

Braze supports messaging and analytics across TV operating systems and Over-the-Top (OTT) content delivery platforms.

### Feature Support Matrix

| Platform | Data & Analytics | In-App Messages | Content Cards | Push Notifications | Canvas | Feature Flags |
|---|---|---|---|---|---|---|
| Amazon Fire TV | Yes | Yes | Yes | Yes | Yes | Yes |
| Kindle Fire | Yes | Yes | Yes | Yes | Yes | Yes |
| Android TV | Yes | Yes | Yes | Manual integration only | Yes | Yes |
| LG TV (webOS) | Yes | Yes | Yes | Not supported by platform | Yes | Yes |
| Samsung Tizen TV | Yes | Yes | Yes | Not supported by platform | Yes | Yes |
| Roku | Yes | Yes | No | Not supported by platform | Yes | Yes |
| Apple TV OS | Yes | Yes | Yes | Partial | Yes | Yes |
| Apple Vision Pro | Yes | Yes | Yes | Partial | Yes | Yes |

### SDK Mapping by Platform

| Platform | SDK to Use |
|---|---|
| Amazon Fire TV | Braze Fire OS SDK |
| Kindle Fire | Braze Fire OS SDK |
| Android TV | Braze Android SDK |
| LG webOS | Braze Web SDK |
| Samsung Tizen TV | Braze Web SDK |
| Roku | Braze Roku SDK |
| Apple TV OS | Braze Swift SDK |
| Apple Vision Pro | Braze Swift SDK |

---

### Amazon Fire TV

**SDK:** Fire OS SDK (Android integration guide)

- Push notifications are called **"Heads Up Notifications"** — priority must be set to `"HIGH"` for them to appear. All notifications appear in the Fire TV settings menu.
- For HTML in-app messages on non-touch environments: set `BrazeConfig.Builder.setIsTouchModeRequiredForHtmlInAppMessages(false)` (requires Android SDK v23.1.0+)

---

### Android TV

**SDK:** Android SDK

- Push notifications are **not natively supported** on Android TV (per Google's Design Guidelines).
- Manual push UI integration is possible — requires custom implementation.
- For HTML in-app messages on non-touch environments: set `BrazeConfig.Builder.setIsTouchModeRequiredForHtmlInAppMessages(false)` (requires Android SDK v23.1.0+)

> **Note:** Create a separate Android app entry in the Braze dashboard for your Android OTT integration.

---

### LG webOS

**SDK:** Web SDK

- Content Cards require a **Headless UI** (custom UI implementation).
- In-app messages supported.

`★ Insight ─────────────────────────────────────`
The original content cuts off mid-sentence for LG webOS — the processed output faithfully reflects what was provided without fabricating missing details, which is the correct approach for topic file generation.
`─────────────────────────────────────────────────`
