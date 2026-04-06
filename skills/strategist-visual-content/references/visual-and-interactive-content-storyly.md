---
name: visual-and-interactive-content-storyly
source_url: >-
  https://braze-inc.github.io/braze-docs/_partners/message_personalization/dynamic_content/visual_and_interactive_content/storyly
indexed_at: '2026-04-05'
keywords:
  - segments
  - personalization
  - audiences
  - attributes
  - integration
  - targeting
  - SDK
  - Storyly
  - sync
  - external_id
triggers:
  - Connect Braze and Storyly
  - Create audience from Braze segments
  - Set up Storyly integration
  - Personalize story content with user attributes
  - Configure custom parameters for Storyly
---
## Storyly Interactive Content (Braze Integration)

Storyly is a lightweight SDK that brings story-format content to apps and websites. The Braze integration enables targeting Braze segments with specific stories and personalizing story content using Braze user attributes.

### Prerequisites

| Requirement | Detail |
|-------------|--------|
| Braze REST API key | Requires: `users.export.ids`, `users.export.segments`, `segments.list`, `segments.details` |
| Braze REST endpoint | Instance-specific URL |
| Storyly SDK | Installed in your app/site |
| Storyly account | Required for dashboard access |

### Key Use Cases

- **Segment targeting** — Create Storyly audiences from Braze demographic or behavioral segments (location, actions, product interests)
- **Attribute personalization** — Use Braze user attributes (name, basket contents, favorites) to generate dynamic story content

### Setup

**Step 1 — Connect in Storyly Dashboard**

Navigate to **Storyly Dashboard > Settings > Integrations > Connect with Braze**. Enter your Braze REST API key and endpoint.

**Step 2 — Create Audience from Segments**

Navigate to **Storyly Dashboard > Settings > Audiences > New Audience > Create Audience with Braze**.

Sync options:
- **One-time sync** — for specific campaign stories
- **Daily sync** — for long-term/ongoing stories

### Custom Parameter Requirement

Storyly integration must hold **custom parameters matched to Braze `external_id`**. This enables user-level personalization and audience matching.

Platform-specific custom audience docs:
- [iOS](https://integration.storyly.io/ios/personalization-customaudience.html)
- [Android](https://integration.storyly.io/android/personalization-customaudience.html)
- [React Native](https://integration.storyly.io/react-native/personalization-customaudience.html)
- [Flutter](https://integration.storyly.io/flutter/personalization-customaudience.html)
- [Web](https://integration.storyly.io/web/personalization-customaudience.html)

### Integration Direction

This is a **data export integration** — Braze pushes segment/user data to Storyly (not a Braze-native channel). Storyly maintains the integration.

`★ Insight ─────────────────────────────────────`
- The `external_id` bridging pattern is the core of this integration — without it, Braze segments can't be matched to Storyly users, making the custom parameter setup a hard prerequisite, not optional config.
- The one-time vs. daily sync distinction maps directly to campaign lifecycle: one-shot campaign audiences vs. always-on personalization audiences.
`─────────────────────────────────────────────────`
