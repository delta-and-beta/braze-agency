---
name: data-distribution-export_braze_data-export_campaign_results_data
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/data/distribution/export_braze_data/export_campaign_results_data
indexed_at: '2026-04-05'
keywords:
  - export
  - campaign
  - analytics
  - engagement
  - recipients
  - email
  - push
  - CSV
  - multivariate
  - variants
triggers:
  - export campaign results
  - download campaign analytics
  - export recipient data
  - export campaign performance
  - how to export campaign metrics
---
## Export Campaign Results Data

Access campaign exports from **Campaigns** → select campaign → scroll to historical performance graphs.

---

### Multichannel Campaign Exports

Available data series (when channels are used in the campaign):

**Messages Sent by Date**
- Total Messages Sent
- Messages Sent Across Channels (push, email, in-app)

**Email Engagement by Date**
- Delivered, Sent, Opened, Clicks, Bounces, Spam Reports

**In-App Message Engagement by Date**
- Sent, Impressions, Clicks

**iOS Push Engagement by Date**
- Sent, Total Opens, Direct Opens, Bounces

**Android Push Engagement by Date**
- Sent, Total Opens, Direct Opens, Bounces

---

### Multivariate Campaign Exports

Single-channel campaigns with variants. Data can be grouped by **statistic** or **message variant**.

| Channel | Available Analytics (per variant, by date) |
|---|---|
| Push | Messages Sent, Conversions, Unique Recipients, Opens, Direct Opens, Bounces |
| Email | Delivered, Sent, Opens, Clicks, Bounces, Spam Reports |
| In-App | Sent, Impressions, Clicks |

---

### Campaign Recipient Export (User Data)

Export all recipient user profiles as CSV via **Campaign Details → User Data** button.

**Requirements:**
- Requires **Export User Data** permission for the workspace

**Delivery:**
- Generated in the background; emailed to the logged-in user
- If Amazon S3 credentials are linked, CSV is also uploaded to your S3 bucket
- Email link expires after a few hours (without S3)

**Exported fields include:**
- All standard segment user data fields
- If "Export All Recipient Data" is selected, also includes:
  - Name of campaign variation received
  - API ID of campaign variation received
  - Whether the user is in the control group

> For export issues, see Export Troubleshooting.
