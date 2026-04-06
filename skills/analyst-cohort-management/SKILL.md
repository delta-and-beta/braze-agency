---
name: analyst-cohort-management
description: >-
  Manages cohort imports, audience segmentation, and customer data platform
  integrations for targeted campaigns.
metadata:
  role: braze-analyst
  topics:
    - cohort-import-treasuredata
    - cohort-import-splio
    - cohort-import-kubit
    - cohort-import-appsflyer-audiences
    - reverse-etl-hightouch-cohort-import
    - reverse-etl-census-cohort-import
    - data-and-analytics-cohort-import
    - data-and-analytics-customer-data-platform
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
This is a **reference-type** skill (domain knowledge, not process enforcement). The writing-skills guidance still applies: optimize for Claude Search (CSO) with symptom-rich language, use quick reference tables, and keep it scannable. The user explicitly excluded YAML frontmatter, so this is the body only.
`─────────────────────────────────────────────────`

---

# Cohort & Audience Management

## Overview

This skill covers how to import user cohorts into Braze from external CDPs and analytics platforms, and how to reason about audience quality across sync cycles. The analyst lens here is **segment integrity** — not just whether data arrived, but whether it arrived fresh, resolved correctly across identity graphs, and is safe to activate.

Use this skill when:
- Connecting a CDP or warehouse tool (Hightouch, Census, Treasure Data) to Braze for cohort-based targeting
- Diagnosing why a cohort-based campaign reached an unexpected audience size
- Evaluating sync cadence tradeoffs for time-sensitive segments
- Resolving identity mismatches between upstream platforms and Braze user profiles
- Auditing whether cohort definitions in the source platform map cleanly to Braze segment logic

## Analytical Lens

Every cohort import decision should be evaluated across four axes:

| Axis | Key Question |
|------|--------------|
| **Segment definition** | Is the cohort definition in the source system equivalent to the intended Braze segment? |
| **Audience sync cadence** | How stale can this cohort be before campaigns become inaccurate or harmful? |
| **Cohort freshness** | What is the actual lag between source behavior and Braze membership update? |
| **Cross-platform identity resolution** | Are users matched by a stable, shared identifier (external ID, email hash) or a fragile one (device ID, anonymous ID)? |

## Supported Integrations

### Hightouch
Pulls from data warehouses (Snowflake, BigQuery, Redshift) and syncs computed cohorts to Braze via the Cohort Import API. Sync frequency is configurable in Hightouch. Identity resolution relies on `external_id` or email — confirm the model's join key matches what Braze holds.

### Census
Reverse ETL from warehouse to Braze. Census defines segments as SQL models; syncs run on schedule or trigger. Watch for cohort drift when the underlying SQL model references mutable data (e.g., `last_30_days` windows).

### Treasure Data
Enterprise CDP with native Braze connector. Cohorts are defined via TD workflows and pushed via the Braze REST API. Useful for large-scale behavioral segmentation that would be expensive to replicate inside Braze.

### Splio
Audience-building platform focused on campaign revenue optimization. Syncs audience lists to Braze for campaign targeting. Primarily used for loyalty and re-engagement segments.

### Kubit
Product analytics platform. Cohort imports are typically behavioral (funnel drop-offs, feature adoption segments). Kubit cohorts are defined in their UI and pushed via the Cohort Import API using `external_id`.

### AppsFlyer Audiences
Mobile attribution-based cohorts. Useful for targeting users by install source, SKAdNetwork campaign, or LTV tier. Resolves identity via IDFA/GAID or `external_id` — fragile on iOS 14.5+ without ATT consent; verify match rate before relying on attribution-based segments.

## Cohort Freshness Patterns

```
Source behavior occurs
        ↓
Source platform computes/updates cohort  [lag: seconds–hours]
        ↓
Sync job runs (scheduled or triggered)   [lag: minutes–24h]
        ↓
Braze cohort membership updates          [lag: API processing]
        ↓
Campaign eligibility re-evaluated        [lag: segment refresh]
```

**Total observable lag** can range from minutes (Hightouch real-time trigger) to 24+ hours (daily batch Census sync). For transactional or time-sensitive campaigns, always confirm the full lag chain before assuming a cohort is current.

## Identity Resolution Risks

| Identifier | Stability | Cross-Platform Risk |
|-----------|-----------|---------------------|
| `external_id` | High | Low — use this if available |
| Email (hashed) | Medium | Moderate — works unless email changes |
| Device ID (IDFA/GAID) | Low on iOS | High — post-ATT, match rates degrade |
| Anonymous ID | Very low | Very high — session-scoped, rarely durable |

Always verify the **match rate** of a cohort import against Braze's known user base before launching. A 40% match rate means 60% of intended recipients won't receive the campaign.

## Common Mistakes

- **Assuming cohort size in source = reachable audience in Braze.** Match rate, reachability (push opt-in, email subscription), and global control group exclusions all reduce actual send volume.
- **Using device IDs as join keys for cross-platform identity.** These degrade quickly on iOS and cause phantom user creation in Braze if not deduplicated.
- **Ignoring sync cadence when measuring campaign performance.** A cohort synced daily will include users who churned since the last sync. Attribution of campaign lift to a stale cohort is unreliable.
- **Conflating Braze Segments with imported cohorts.** Braze Segments recompute dynamically; imported cohorts are static snapshots until the next sync. They behave differently in A/B tests and control groups.
- **Not testing the cohort import endpoint before launching.** Run a dry-run sync with a small test cohort to confirm the `external_id` mapping resolves correctly before importing production audiences.

## Quick Reference

```
Cohort import arrives → check: match rate, freshness timestamp, identifier type
Unexpected audience size → check: sync lag, filter criteria drift, Braze subscription state
Identity mismatch → check: join key consistency, anonymous vs. known user state
Campaign targeting wrong users → check: cohort definition vs. Braze segment logic equivalence
```
