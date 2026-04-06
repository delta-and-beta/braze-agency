---
name: analyst-business-intelligence
description: >-
  Configures BI tools and dashboards for executive reporting, operational
  metrics, and marketing performance visualization.
metadata:
  role: braze-analyst
  topics:
    - business-intelligence-thoughtspot
    - business-intelligence-tellius
    - business-intelligence-mozart-data
    - business-intelligence-mixpanel
    - business-intelligence-looker
    - business-intelligence-kubit
    - business-intelligence-heap
    - business-intelligence-datadog
    - business-intelligence-clarisights
    - data-and-analytics-business-intelligence
    - analytics-thoughtspot
    - analytics-mixpanel
    - analytics-heap
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
The `writing-skills` skill emphasizes **CSO (Claude Search Optimization)** — structuring skills so future Claude instances can find and correctly apply them. Key techniques: verb-first section names, symptom-based language, and a quick reference table that lets Claude scan before committing to a full read.
`─────────────────────────────────────────────────`

Here is the generated skill file:

---

# Business Intelligence Reporting

## Overview

This skill covers configuring, integrating, and optimizing BI tools and dashboards for marketing and product analytics. It applies a **braze-analyst lens**: every configuration decision is evaluated through dashboard design, KPI definition, data visualization clarity, and the reliability of automated reporting pipelines.

Use this skill when:
- Connecting a BI platform (Looker, ThoughtSpot, Mixpanel, Heap, etc.) to Braze data exports or Currents
- Defining KPIs and metric hierarchies for executive, operational, or marketing stakeholders
- Designing or reviewing dashboards for campaign performance, user behavior, or funnel analysis
- Building or troubleshooting automated reporting pipelines (scheduled reports, data refreshes, alerting)
- Choosing between BI tools based on use case (self-serve analytics vs. governed reporting vs. real-time observability)

Do **not** use this skill for raw Braze SDK instrumentation, data warehouse schema design, or general SQL authoring — those fall under data engineering or platform integration skills.

---

## Topics Synthesized

This skill draws from the following reference areas:

| Topic | Focus |
|-------|-------|
| **Looker BI Dashboard Integration** | Primary governed BI layer; LookML modeling, Braze Blocks, scheduled deliveries |
| **ThoughtSpot BI / Analytics Integration** | AI-powered search analytics; SpotIQ anomaly detection, live query mode |
| **Tellius BI Integration** | Decision intelligence; natural language query, automated insight narratives |
| **Mozart Data BI Integration** | Modern data stack consolidation; reverse ETL into BI layers |
| **Mixpanel BI / Product Analytics Integration** | Event-based funnel analysis, retention cohorts, A/B test reporting |
| **Heap Digital Analytics Integration** | Retroactive event capture, session replay, conversion path analysis |
| **Kubit BI Integration** | Warehouse-native analytics; no-ETL reporting directly on data lake |
| **Clarisights Marketing BI** | Performance marketing reporting; cross-channel attribution, spend efficiency |
| **Datadog Observability Integration** | Infrastructure and pipeline monitoring; alerting on data delivery SLAs |
| **Business Intelligence Category Overview** | Platform selection criteria, integration patterns, capability matrix |

---

## Lens: How This Skill Approaches Problems

### Dashboard Design
Dashboards serve specific audiences — executive, operational, or analytical. Prioritize:
- **Signal-to-noise ratio**: surface the 3–5 metrics that drive decisions, not every available field
- **Audience-appropriate granularity**: executives need trends and anomalies; operators need actionable drill-downs
- **Consistent visual hierarchy**: KPIs at top, supporting context below, raw tables last

### KPI Definition
Before connecting any BI tool, establish metric definitions:
- **North Star metric** per reporting surface (e.g., 30-day retention for lifecycle, send-to-conversion rate for campaigns)
- **Leading vs. lagging indicators**: open rate is leading; revenue attribution is lagging
- **Agreed denominator**: unambiguous unique user/event counting prevents stakeholder disputes

### Data Visualization
Match chart type to analytical question:
- Trend over time → line chart
- Part-to-whole → stacked bar or pie (only when ≤5 segments)
- Correlation → scatter plot
- Distribution → histogram or box plot
- Ranking → horizontal bar

Avoid decoration: 3D charts, excessive color, and dual Y-axes obscure rather than clarify.

### Automated Reporting Pipelines
Reliable pipelines require:
- **Idempotent refresh logic**: re-running a pipeline must not duplicate data
- **Alerting on data freshness**: stale dashboards are worse than no dashboards
- **Schema change tolerance**: Braze Currents schema evolves — downstream models need versioned references
- **Delivery confirmation**: scheduled report delivery (email, Slack) should log success/failure

---

## Quick Reference: Tool Selection

| Need | Recommended Tool |
|------|-----------------|
| Governed self-serve with semantic layer | Looker |
| AI-powered ad hoc search analytics | ThoughtSpot |
| NLP-driven insight generation | Tellius |
| Cross-channel paid marketing attribution | Clarisights |
| Product funnel and retention cohorts | Mixpanel |
| Retroactive behavioral analytics | Heap |
| Warehouse-native, no-ETL reporting | Kubit |
| Data pipeline observability and alerting | Datadog |
| Modern data stack consolidation layer | Mozart Data |

---

## Common Mistakes

**Connecting BI tools before defining KPIs.** BI tools amplify whatever you measure. Undefined KPIs lead to dashboard sprawl and stakeholder confusion. Define the metric dictionary first.

**Using real-time query mode for all dashboards.** Live query (ThoughtSpot, Kubit) is powerful but expensive at scale. Reserve it for operational dashboards; pre-aggregate for executive summaries.

**Ignoring Currents schema versioning.** Braze Currents event schemas evolve. LookML views and Mixpanel event mappings built against an older schema silently break. Pin schema versions and monitor Braze changelog.

**Building dashboards for data availability, not decisions.** Build only dashboards with a named owner who acts on them. Unmaintained dashboards erode trust in the entire BI layer.

**Skipping pipeline alerting.** A dashboard that shows stale data without surfacing staleness is a liability. Every automated pipeline needs a freshness check and failure notification.
