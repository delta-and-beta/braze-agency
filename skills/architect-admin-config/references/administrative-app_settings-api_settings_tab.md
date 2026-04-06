---
name: administrative-app_settings-api_settings_tab
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/administrative/app_settings/api_settings_tab
indexed_at: '2026-04-05'
keywords:
  - API
  - keys
  - identifiers
  - allowlisting
  - authentication
  - monitoring
  - alerts
  - webhooks
  - SDK
  - encoding
triggers:
  - Configure REST API keys
  - Set up IP allowlisting
  - Monitor API activity
  - Find object identifiers
  - Set up API usage alerts
---
## API Settings

### REST API Keys

Found under **Settings > APIs and Identifiers**. REST API keys are required with every Braze API request.

**IP Allowlisting** — Restrict which IP addresses can make requests for a given API key. Configure in the **Whitelist IPs** section when creating a new key. If unset, any IP can make requests.

> When using Braze-to-Braze webhooks with allowlisting, consult the documented list of Braze IPs to whitelist.

**API Usage Alerts** — Monitor API activity to detect unexpected traffic patterns early.

Two trackable activity types:
- **REST API endpoints** — message sends, campaign creation, data exports
- **SDK API requests** — in-app message triggers, user profile syncs *(requires Monthly Active Users purchase, CY 24–25)*

Alert conditions are configurable (e.g., error rate increases by 20% within an hour). Notifications delivered via email, webhook, or both.

---

### App Identifiers

Listed on the same APIs and Identifiers page. Used to reference specific apps in API requests.

---

### Other Identifiers

Search for identifiers tied to segments, campaigns, Content Cards, and other objects for use with the external API.

- All API messages must use **UTF-8** encoding
- After selecting an object from the dropdown, its identifier displays beneath it

**Identifier types** include: REST API keys, app identifiers, segment IDs, campaign IDs, Content Card IDs.

`★ Insight ─────────────────────────────────────`
- Braze's identifier model separates concerns cleanly: REST API keys authenticate the caller, app identifiers scope requests to a specific mobile/web app, and object identifiers (segments, campaigns) reference data entities — each with its own lookup path in the dashboard.
- IP allowlisting is configured *at key creation time*, not after — so access control decisions must be made upfront. This is worth calling out in integration guides.
- The SDK API request monitoring being gated behind a MAU purchase (CY 24–25) is an important caveat for teams trying to debug mobile-side issues — they may not have visibility into that traffic class.
`─────────────────────────────────────────────────`
