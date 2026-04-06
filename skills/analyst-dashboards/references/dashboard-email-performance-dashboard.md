---
name: dashboard-email-performance-dashboard
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/analytics/dashboard/email_performance_dashboard
indexed_at: '2026-04-05'
keywords:
  - email
  - performance
  - analytics
  - engagement
  - delivery
  - bounce
  - unsubscribe
  - clicks
  - opens
  - devices
triggers:
  - email performance dashboard
  - track email engagement metrics
  - view delivery and bounce rates
  - analyze clicks and opens by device
  - mailbox provider insights
---
The Nick skill doesn't apply here. Processing the documentation now.

`★ Insight ─────────────────────────────────────`
Topic files are atomic knowledge units — they should be dense and self-contained. Stripping Jekyll liquid tags (`{% image_buster %}`, `{% alert %}`) and relative `site.baseurl` links is key since these are meaningless outside the source repo context. The goal is "survives extraction" — someone reading this file alone gets full value.
`─────────────────────────────────────────────────`

---

## Email Performance Dashboard

Access via **Analytics > Email Performance**. Select a date range up to one year in the past. Metrics are aggregated across all campaigns and Canvases for the selected period — same calculation logic as individual campaign analytics.

### Metric Tiles

Each tile shows the rate metric first, then count (except *Sends*, which shows count then average per day). Every tile also shows a comparison to the prior equivalent period.

| Metric | Type | Calculation |
|--------|------|-------------|
| Sends | Count | Total sends across each day in range |
| Delivery rate | Rate | Total deliveries / Total sends |
| Bounce rate | Rate | Total bounces / Total sends |
| Unsubscribe rate | Rate | Unique unsubscribes / Total deliveries — logged across all sources (SDK, REST API, CSV, email, list unsubscribes) |
| Unique open rate | Rate | Unique opens / Total deliveries |
| Other opens rate | Rate | Total other opens / Total deliveries — non-unique; includes non-machine-identified opens |
| Unique click rate | Rate | Unique clicks / Total deliveries |
| Unique click-to-open rate | Rate | Unique clicks / Unique opens |

---

## Email Insights Dashboard

Access via **Analytics > Email Performance > Email Insights**. Contains up to 6 months of data. Tracks *where* and *when* customers engage with emails.

### Engagement by Device

Breaks down engagement (clicks/opens) by device type: mobile, desktop, tablet, other.

- Data source: user agent string from users' devices
- **"Other"** includes TVs, game consoles, OTT devices, and null/empty user agents
- **CloudFront CDN note:** Ensure user agent is passed to your ESP — otherwise all agents appear as "Amazon Cloudfront"

**Proxy services** (tracked separately for opens):
- **Google Image Proxy**, **Apple Image Proxy**, **Yahoo Mail Proxy** — these pre-load images before delivery, triggering opens from the provider's server rather than the recipient's. This can inflate open counts. Real opens may be included since proxy services mask the original user agent.

**Investigating "Other" device agents:**
- Use **Currents** to receive the raw user agent string
- Use the **Query Builder** (SQL or AI Query Builder) to query user agents directly

### Engagement by Mailbox Provider

Shows top mailbox providers contributing to clicks or opens. Drill into a provider (e.g., Microsoft) to see individual receiving domains (outlook.com, hotmail.com, live.com).

### Time of Engagement

Shows when users engage — by day of week and time of day. All times use the company's configured time zone. Use to identify optimal send windows and experiment with send timing.
