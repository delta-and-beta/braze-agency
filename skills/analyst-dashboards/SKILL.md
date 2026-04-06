---
name: analyst-dashboards
description: >-
  Configuring and interpreting performance dashboards for email, e-commerce,
  deliverability, and API usage.
metadata:
  role: braze-analyst
  topics:
    - analytics-dashboard
    - dashboard-home-dashboard
    - dashboard-email-performance-dashboard
    - dashboard-ecommerce-revenue-dashboard
    - dashboard-diagnostics-dashboard
    - dashboard-deliverability-center
    - dashboard-conversions-dashboard
    - dashboard-api-usage-dashboard
    - dashboard-api-usage-alerts
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
The `writing-skills` skill distinguishes between skill types: this one is a **Reference** skill — it's documentation/API-style guidance for an analyst. That means the structure should favor scannable tables and quick-reference sections over process flowcharts or discipline enforcement patterns.
`─────────────────────────────────────────────────`

# Dashboard Monitoring

## Overview

This skill covers configuring and interpreting Braze's built-in analytics dashboards for real-time operational visibility. Use it to understand what each dashboard surface shows, how to navigate between them, and how to detect and respond to performance signals across channels, revenue, deliverability, and API health.

**Lens:** Real-time operational monitoring and performance visibility — answering "what is happening right now?" across the Braze workspace.

## When to Use This Skill

Use when:
- Investigating live campaign or Canvas performance metrics
- Setting up or interpreting dashboards for email, e-commerce, or API health
- Diagnosing deliverability issues or unusual traffic spikes
- Explaining what a specific dashboard tracks and how to read it
- Configuring API usage alerts to detect anomalies before they impact sends

**Not for:** Building custom reports from scratch (see Query Builder / Report Builder), or attribution modeling beyond last-touch.

## Dashboard Surfaces at a Glance

| Dashboard | Location | Primary Use |
|-----------|----------|-------------|
| Home | Home page | Workspace-level pulse; recent activity |
| Dashboard Builder | Analytics > Dashboard Builder | Custom dashboards from Report/Query Builder data |
| Email Performance | Analytics > Email Performance | Channel-level email metrics |
| eCommerce Revenue | Analytics > Dashboard Builder | Last-touch attributed revenue |
| Diagnostics | Analytics > Diagnostics | Delivery and error diagnostics |
| Deliverability Center | Analytics > Deliverability Center | ISP reputation, bounces, spam rates |
| Conversions | Analytics > Conversions | Conversion event performance |
| API Usage | Settings > APIs and Identifiers > Dashboard | REST API traffic monitoring |

## Topic Synthesis

### Home Dashboard
The **Home** page surfaces key workspace metrics and recent activity. It includes a "Pick Up Where You Left Off" section that reappears after editing or creating campaigns, giving analysts a lightweight operational status view without needing to open individual campaigns.

### Dashboard Builder
Custom dashboards are assembled from **Report Builder** (no-code) or **Query Builder** (SQL) outputs. Dashboards are composed of report tiles and support flexible layout. Use this when you need a persistent, curated view combining multiple data sources or metrics not available in a single native dashboard.

### Email Performance Dashboard
Tracks channel-level email metrics in aggregate — opens, clicks, bounces, unsubscribes, and spam reports. Use this for trend monitoring across all email sends rather than campaign-by-campaign inspection.

### eCommerce Revenue Dashboard
Tracks **last-touch attributed revenue** for campaigns and Canvases using eCommerce recommended events. Covers both campaign and Canvas-level attribution. The last-touch model means revenue is credited to the most recent message touchpoint before a purchase event.

### Diagnostics Dashboard
Operational health view for delivery errors and pipeline issues. Useful for identifying systemic problems (e.g., rendering failures, send failures) that would not surface in conversion metrics alone.

### Deliverability Center
Monitors ISP-level reputation signals — spam complaint rates, hard bounces, soft bounces, and block rates by domain. Essential for identifying deliverability degradation before it impacts inbox placement at scale.

### Conversions Dashboard
Tracks conversion event performance across campaigns and Canvases. Use to evaluate whether messaging is driving the intended user actions within attribution windows.

### API Usage Dashboard & Alerts
The **API Usage Dashboard** (Settings > APIs and Identifiers > Dashboard) monitors incoming REST API traffic for the workspace. **API Usage Alerts** extend this by enabling threshold-based notifications for:
- REST API endpoint traffic
- SDK request volumes

Alerts help detect unexpected traffic spikes or drops before they cause campaign disruption or quota issues.

## Operational Monitoring Patterns

**Anomaly detection flow:**
1. Start at **Home Dashboard** for workspace pulse
2. Drill into **Diagnostics** for delivery errors
3. Cross-check **Deliverability Center** for ISP reputation signals
4. Review **API Usage Dashboard** for traffic anomalies if sends are failing unexpectedly

**Revenue attribution check:**
- Use **eCommerce Revenue Dashboard** for last-touch attribution
- Remember: this dashboard only reflects purchases tied to eCommerce recommended events — gaps may indicate missing event instrumentation

**Alert configuration best practice:**
- Set API Usage Alerts for both REST endpoints and SDK traffic
- Baseline normal traffic ranges before setting thresholds to avoid alert fatigue

## Common Mistakes

| Mistake | Correction |
|---------|------------|
| Using Email Performance for campaign-level analysis | Email Performance is channel-aggregate; use Campaign Analytics for per-campaign |
| Expecting multi-touch attribution in eCommerce Revenue | This dashboard uses last-touch only |
| Diagnosing deliverability problems from conversion data alone | Deliverability signals appear in Deliverability Center before they show in conversions |
| Missing API traffic anomalies before they impact sends | Configure API Usage Alerts proactively with baseline thresholds |
