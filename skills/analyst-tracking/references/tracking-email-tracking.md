---
name: tracking-email-tracking
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/analytics/tracking/email_tracking
indexed_at: '2026-04-05'
keywords:
  - email
  - tracking
  - pixel
  - open
  - click
  - profile
  - engagement
  - privacy
  - compliance
  - attributes
triggers:
  - enable email tracking
  - configure tracking settings
  - disable click tracking
  - set up open pixel
  - manage email engagement
---
## Email Open Pixel and Click Tracking

Open pixel and click tracking can be enabled or disabled per user profile — useful for regional privacy compliance.

### User Profile Fields

Set via [API](user attributes object), CSV import, or Cloud Data Ingestion (CDI):

| Field | Values | Effect |
|-------|--------|--------|
| `email_open_tracking_disabled` | `true` / `false` | Set `false` to add open tracking pixel to future emails |
| `email_click_tracking_disabled` | `true` / `false` | Set `false` to add click tracking to all links in future emails |

> **Note:** Both fields are available for **SparkPost and SendGrid only**.

### Where to View

User profile → **Engagement** tab → **Contact Settings** (email section)

### Key Behavior

- Tracking is configured at the individual user profile level
- Changes apply to **future emails** only (not retroactive)
- Setting a field to `false` enables tracking; `true` disables it
