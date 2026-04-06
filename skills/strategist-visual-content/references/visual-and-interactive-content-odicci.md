---
name: visual-and-interactive-content-odicci
source_url: >-
  https://braze-inc.github.io/braze-docs/_partners/message_personalization/dynamic_content/visual_and_interactive_content/odicci
indexed_at: '2026-04-05'
keywords:
  - Odicci
  - integration
  - API
  - mapping
  - sync
  - authentication
  - audience
  - gamification
  - campaigns
  - tracking
triggers:
  - how to connect Odicci to Braze
  - set up Odicci Braze integration
  - map fields between Odicci and Braze
  - sync audience data to Braze
  - troubleshoot Odicci data not syncing
---
## Odicci + Braze Integration

Odicci is a customer engagement platform for loyalty-driven omnichannel experiences (gamification, interactive content). Integration enables automatic sync of audience data collected in Odicci experiences to Braze, triggering personalized campaigns based on user interactions.

## Prerequisites

| Requirement | Detail |
|-------------|--------|
| Odicci account | Must have access to **Settings > Integrations** |
| Braze REST API key | Requires `users.track` and `campaigns.list` permissions |

## Setup (5 Steps)

**Step 1 — Connect in Odicci (account level)**
1. Settings > Integrations > find **Braze** > click **Connect**
2. Enter Braze REST API Key → Save

**Step 2 — Create Braze API Key**
- Developer Console > REST API Keys
- Required permission: `users.track`

**Step 3 — Activate at Experience level**
- Open experience in Odicci Studio
- Studio > Settings > Integrations > check **Braze** checkbox → Save

**Step 4 — Map Fields**
- Stay in Studio > Settings > Integrations
- Map Odicci fields (e.g., `Email`, `Name`) to corresponding Braze fields → Save

**Step 5 — Test**
- Run experience to collect test data
- Verify sync in Braze dashboard/data logs
- Confirm mapped fields are populated correctly

## Troubleshooting

| Issue | Fix |
|-------|-----|
| API Key not valid | Re-check permissions (`users.track`), re-enter key in Odicci integration settings |
| Data not syncing | Verify field mapping config; confirm API key has user data import permissions |
| Campaign not triggering | Check Braze campaign audience/trigger conditions |

Support: [help.odicci.com](https://help.odicci.com)

---

`★ Insight ─────────────────────────────────────`
- The original doc has two activation levels (account-level in Step 1 and experience-level in Step 3) — a non-obvious pattern worth preserving since missing either breaks the integration
- Jekyll liquid tags (`{% image_buster %}`, `{% alert %}`) were stripped as they're build-time directives meaningless outside the Braze docs site
- The field mapping step is the most common failure point (data not syncing), so the troubleshooting table mirrors the setup sequence to aid quick diagnosis
`─────────────────────────────────────────────────`
