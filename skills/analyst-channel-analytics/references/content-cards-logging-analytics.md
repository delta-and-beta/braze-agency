---
name: content-cards-logging-analytics
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/content_cards/logging_analytics
indexed_at: '2026-04-05'
keywords:
  - analytics
  - logging
  - impressions
  - clicks
  - SDK
  - initialization
  - recipients
  - events
  - custom
  - integration
triggers:
  - how to log content card analytics
  - why are content card events missing
  - custom content card implementation logging
  - content card impression tracking
  - analytics debugging for content cards
---
## Content Card Analytics Logging

### Overview

Content Cards analytics (impressions, clicks, unique recipients) require explicit logging. The default Braze UI handles this automatically, but custom implementations must call logging methods manually.

### Platform Behavior

| Implementation | Logging |
|---|---|
| Default Braze UI | Automatic on all platforms (Android, iOS, Web) |
| Custom Content Card view | Must call logging methods explicitly |

### Custom Implementation Requirements

For custom Content Card views, call the appropriate logging methods within your application for each platform:

- **Android / iOS**: Call the platform-specific impression and click logging APIs explicitly when cards are displayed or interacted with.
- **Web (custom implementation)**:
  1. Ensure the Braze Web SDK is fully loaded before interacting with cards.
  2. Check the browser console for errors.
  3. Verify card data is being received from the SDK.

### Missing Analytics Troubleshooting

If cards render correctly but analytics are absent, the cause is almost always an SDK integration issue:

**1. Custom view without explicit logging**
- Default UI logs automatically; custom views do not.
- Must manually invoke impression/click logging methods.

**2. SDK initialization timing**
- Events are **silently dropped** (not queued) if the SDK is:
  - Uninitialized when cards are shown
  - In delayed initialization mode
  - GDPR-disabled
- Always ensure full SDK initialization before displaying cards.

**3. User identity resolution**
- The SDK logs analytics for anonymous users, but dashboard metrics like **"unique recipients"** require a resolved user identity.
- Call `changeUser` before displaying cards wherever possible.

### Key Rule

> Analytics events are dropped silently — there is no retry queue. Initialization order and user identification must be correct at the time cards are displayed.
