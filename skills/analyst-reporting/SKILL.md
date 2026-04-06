---
name: analyst-reporting
description: >-
  Performance measurement across push, webhooks, content cards, LINE, KakaoTalk,
  banners, and landing pages.
metadata:
  role: braze-analyst
  topics:
    - analytics
    - message-building-by-channel-push-push-reporting
    - message-building-by-channel-webhooks-reporting
    - message-building-by-channel-content-cards-reporting
    - message-building-by-channel-line-reporting
    - message-building-by-channel-kakaotalk-kakaotalk-reporting
    - message-building-by-channel-banners-analytics
    - engagement-tools-landing-pages-tracking-users
    - engagement-tools-landing-pages-about-tracking-data
    - engagement-tools-messaging-fundamentals-conversion-events
    - analytics-reporting
    - reporting-revenue-report
    - reporting-retention-reports
    - reporting-report-metrics
    - reporting-report-builder
    - reporting-report-builder-legacy
    - reporting-global-control-group-reporting
    - reporting-funnel-reports
    - reporting-engagement-reports
    - reporting-data-by-segments
    - reporting-configuring-reporting
    - reporting-canvas-analytics
    - reporting-campaign-analytics
    - reporting-dashboard-builder
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
The skill development guide establishes a clear tension: SKILL.md should be **lean** (~1,500–2,000 words) while the topic list here spans 24 distinct areas. The right approach is to synthesize themes and direct Claude toward topic references rather than restating every metric — this is exactly the "progressive disclosure" pattern the guide enforces.
`─────────────────────────────────────────────────`

# Cross-Channel Reporting & Analytics

## Purpose

This skill provides analytical guidance for measuring and interpreting campaign performance across all Braze messaging channels — including push notifications, webhooks, Content Cards, LINE, KakaoTalk, banners, and landing pages. Apply this skill to diagnose campaign health, benchmark channel performance, attribute conversions, and navigate Braze's reporting infrastructure to surface actionable insights.

The analytical lens here is **metric interpretation, performance benchmarking, and conversion attribution** — not configuration or send mechanics. Use this skill when the question is "how is it performing?" not "how do I set it up?"

---

## Scope

### Channel-Level Reporting

Each Braze channel surfaces metrics through the campaign details page or Canvas analytics. The measurement approach differs by channel — particularly around open and click tracking:

**Push Notifications**
Push reporting follows the standard messaging analytics structure: impressions, opens, direct opens, influenced opens, bounces, and conversions. When benchmarking push performance, distinguish between direct and influenced opens, as influenced opens reflect background engagement that wouldn't appear in direct-click attribution.

**Webhooks**
Webhook reporting tracks delivery and error rates rather than engagement metrics. Successful delivery is confirmed at the HTTP response level. Because webhooks drive backend actions (not user-facing impressions), analyze them by error rate, retry behavior, and downstream conversion events — not open or click rates.

**Content Cards**
Content Card reporting operates at both campaign and Canvas step level. Key metrics include impressions, clicks, dismissals, and card-level CTR. Content Cards persist in the feed, so retention of card views over time matters more than single-send opens.

**LINE**
Open and click statistics for LINE are calculated only for users who have opted into Braze's tracking. Report on message-level delivery and conversion events; do not treat raw open rates as representative of full audience reach.

**KakaoTalk**
KakaoTalk campaign and Canvas reports are available through the standard Braze dashboard. Apply the same messaging analytics model as other channels — impressions, opens, conversions — calibrated to the KakaoTalk delivery context.

**Banners**
Banner analytics provide campaign-level and message-level performance data. Navigate to the Banner campaign in the Braze dashboard to access impression, click, and conversion breakdowns.

**Landing Pages**
Landing page tracking integrates with the Braze Web SDK. The SDK initializes on form submission or when a `{% landing_page_url %}` Liquid tag resolves for a known user. Track form submission events as conversion events; link submitted profiles to existing Braze users via the Liquid tag to avoid duplicate profile creation.

---

## Conversion Attribution

### Conversion Events

Conversion events are the primary mechanism for measuring campaign impact beyond direct engagement. When analyzing conversions:

- Identify primary vs. secondary conversion events per campaign
- Evaluate conversion windows — the time boundary within which a post-send action counts as attributed
- Distinguish between conversion rate (events / recipients) and conversion volume (raw count)

### Global Control Group

To isolate the causal impact of messaging (rather than correlation with user behavior), use Global Control Group reporting. Compare conversion behavior between:

- **Control group**: Users unexposed to messaging
- **Treatment sample**: Random selection of non-control users

This methodology controls for organic user activity. When reporting campaign ROI, reference Global Control Group data to separate lift from baseline.

### Funnel Reports

Funnel reports visualize user progression through a series of events after receiving a campaign or Canvas. Key parameters:

- Time window: 1–30 days post-receive
- Event sequence: Define ordered steps to measure drop-off
- Available at campaign and Canvas level

Use funnel reports when conversion is multi-step (e.g., receive → open → add to cart → purchase). Single-step conversion events won't reveal where users abandon the flow.

---

## Report Infrastructure

### Report Builder (Current)

Report Builder (New) enables granular, customizable reports using campaign and Canvas data. Supports:
- Template-based report creation
- Drilldowns into variant and step performance
- Dashboard sharing and scheduled delivery

### Report Builder (Legacy)

Legacy Report Builder supports multi-campaign comparison in a single view. Use for identifying which engagement strategies most affected key metrics across time periods. Supports CSV export.

### Engagement Reports

Engagement Reports aggregate engagement statistics for campaigns and Canvases and deliver them as email with downloadable CSV files. Requires **Export User Data** permission. Schedule these for recurring stakeholder reporting.

### Retention Reports

Retention reports track whether users return and perform a defined action over time after an initial event. Use retention reports to measure whether a campaign improves long-term behavioral patterns, not just immediate conversions.

### Revenue Report

Located at **Analytics > Revenue Report**. View revenue over time, by product, and as total app revenue. Filter by:
- Date range
- App or product segment

Cross-reference revenue spikes with campaign send dates to identify revenue attribution opportunities.

### Data by Segments

Break down performance metrics by segment using Query Builder report templates. Analytics tracking must be enabled for each segment before use. Segment-level breakdowns reveal whether a campaign performs differently across audience cohorts — critical for personalization benchmarking.

### Dashboard Builder

Dashboard Builder enables custom reporting dashboards combining multiple data visualizations. Use for executive reporting or ongoing channel health monitoring across campaigns.

---

## Benchmarking Framework

When interpreting performance, apply this hierarchy:

1. **Baseline comparison** — Compare current campaign metrics to historical averages for the same channel and audience segment
2. **Variant comparison** — For A/B tests, evaluate statistical lift between control and treatment variants
3. **Cross-channel comparison** — Normalize metrics to comparable units (e.g., CTR) before comparing push vs. Content Cards vs. banners
4. **Global Control lift** — Use Global Control Group data to measure true incremental impact

Avoid comparing raw open counts across channels — delivery mechanics differ. Use rates (open rate, CTR, conversion rate) for cross-channel benchmarking.

---

## Configuring Reporting Infrastructure

Braze sends a **weekly email analytics report** summarizing app and campaign performance automatically. To manage subscriptions:

- Navigate to **Settings > Admin Settings**
- Add or remove report recipients

For custom reporting schedules, use Engagement Reports (for campaign CSVs) or the Report Builder with scheduled delivery.

---

## Topic Reference Index

The following topic files in `references/` contain detailed metric definitions, dashboard navigation paths, and channel-specific reporting nuances:

| Topic | File | Content |
|---|---|---|
| Analytics Overview | `references/analytics-overview.md` | Dashboard entry points |
| Campaign Analytics | `references/campaign-analytics.md` | Campaign-level metrics |
| Canvas Analytics | `references/canvas-analytics.md` | Canvas step metrics |
| Push Reporting | `references/push-reporting.md` | Push-specific metrics |
| Webhook Reporting | `references/webhook-reporting.md` | Delivery and error tracking |
| Content Cards Reporting | `references/content-cards-reporting.md` | Card-level CTR and retention |
| LINE Reporting | `references/line-reporting.md` | Open/click tracking scope |
| KakaoTalk Reporting | `references/kakaotalk-reporting.md` | KakaoTalk dashboard access |
| Banner Analytics | `references/banner-analytics.md` | Banner impression and click data |
| Conversion Events | `references/conversion-events.md` | Attribution windows and types |
| Landing Page User Tracking | `references/landing-page-user-tracking.md` | Liquid tag and SDK init |
| Landing Page Tracking Data | `references/about-landing-page-tracking-data.md` | Web SDK initialization details |
| Reporting Overview | `references/reporting-overview.md` | Dashboard navigation |
| Revenue Report | `references/revenue-report.md` | Revenue filters and views |
| Retention Reports | `references/retention-reports.md` | Long-term behavioral retention |
| Report Metrics | `references/report-metrics.md` | Metric definitions glossary |
| Report Builder | `references/report-builder.md` | Current Report Builder guide |
| Report Builder (Legacy) | `references/report-builder-legacy.md` | Legacy comparison reports |
| Global Control Group | `references/global-control-group-reporting.md` | Causal lift measurement |
| Funnel Reports | `references/funnel-reports.md` | Multi-step funnel analysis |
| Engagement Reports | `references/engagement-reports.md` | CSV export and scheduling |
| Data by Segments | `references/data-by-segments.md` | Segment breakdown queries |
| Configuring Reporting | `references/configuring-reporting.md` | Weekly report setup |
| Dashboard Builder | `references/dashboard-builder.md` | Custom dashboard creation |

---

## When to Apply This Skill

Apply this skill when questions involve:

- Interpreting a specific channel's performance metrics
- Comparing performance across channels or campaigns
- Setting up or reading funnel, retention, or revenue reports
- Understanding conversion attribution logic and windows
- Measuring incremental lift vs. organic user behavior
- Building or scheduling reports for stakeholder delivery
- Diagnosing why a metric (open rate, CTR, conversion rate) appears unexpectedly high or low

`★ Insight ─────────────────────────────────────`
The topic reference table at the end is a deliberate architectural choice — it maps human-readable topics to file paths so Claude can load only the relevant reference file rather than scanning all 24 topics. This keeps the SKILL.md body under 2,000 words while keeping the full knowledge base accessible.
`─────────────────────────────────────────────────`
