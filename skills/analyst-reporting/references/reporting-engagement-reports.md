---
name: reporting-engagement-reports
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/analytics/reporting/engagement_reports
indexed_at: '2026-04-05'
keywords:
  - engagement
  - reports
  - campaigns
  - canvases
  - statistics
  - export
  - csv
  - email
  - push
  - sms
triggers:
  - how to create engagement reports
  - generating campaign statistics
  - scheduling recurring reports
  - exporting engagement data
  - downloading report files
---
## Engagement Reports

Engagement Reports pull engagement statistics for campaigns and Canvases, delivered as an email with downloadable CSV files.

**Requirements:** "Export User Data" permissions.

**Key behavior:**
- Generates up to 2 CSV files: one for all campaign data, one for all Canvas data
- Download links **expire 1 hour** after the report email is sent
- Reports are not saved in the Braze dashboard; re-run to get updated stats
- Deleting a Canvas step after launch removes its data from reports

---

### Creating a Report

**Path:** Analytics > Engagement Reports > + Create New Report

**Step 1 — Add messages** (choose one method):
- **Manual:** Select specific campaigns/Canvases
- **Automatic:** Include all messages matching specific [tags](https://www.braze.com/docs/user_guide/administrative/app_settings/tags/) (any or all tags); useful for recurring reports

**Step 2 — Add statistics** (available per channel):

| Channel | Statistics |
|---------|-----------|
| Email | Sends, Opens, Unique Opens, Clicks, Unique Clicks, Click-to-Open, Unsubscribes, Bounces, Delivered, Reported Spam |
| Push | Sends, Opens, Influenced Opens, Bounces, Body Clicks |
| Web Push | Sends, Opens, Bounces, Body Clicks |
| In-app message | Impressions, Clicks, First Button Clicks, Second Button Clicks |
| Webhook | Sends, Errors |
| SMS | Sends, Sends to Carrier (deprecated), Confirmed Deliveries, Delivery Failures, Rejections |

**Step 3 — Configure format:**
- **Compression:** ZIP (default), Uncompressed, or gzip
- **Delimiter:** Comma (default), Colon, Semicolon, or Pipe

**Step 4 — Set time frame and data display:**
- Default range: earliest selected message → present (company timezone)
- Aggregation options: daily (default), weekly, monthly, quarterly, or at campaign/Canvas level
- For accurate open/click rates, ensure the date range covers when Sends events occurred

**Step 5 — Schedule:**
- **Send immediately** — report sent upon launch
- **Send at designated time** — recurring schedule (every N days/weeks/months) with optional end date

**Step 6 — Launch** and check email for download links (expire after 1 hour).

`★ Insight ─────────────────────────────────────`
- The 1-hour link expiration is a critical operational detail often missed — worth surfacing prominently in the topic file since it affects how teams should handle report delivery (e.g., don't schedule for times when recipients may be away)
- The data aggregation note (campaign-level vs. variant/step level) is easy to overlook but explains why granular A/B test data won't appear in these reports
- "Sends to Carrier" being deprecated but still supported is exactly the kind of transitional state that confuses users — flagging it helps engineers avoid building integrations around it
`─────────────────────────────────────────────────`
