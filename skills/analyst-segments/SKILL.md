---
name: analyst-segments
description: >-
  Audience segmentation creation, filter configuration, SQL and CDI segments,
  suppression lists, and segment performance analysis.
metadata:
  role: braze-analyst
  topics:
    - engagement-tools-segments-creating-a-segment
    - engagement-tools-segments-segmentation-filters
    - engagement-tools-segments-segment-extension
    - engagement-tools-segments-segment-extension-sql-segments
    - engagement-tools-segments-segment-extension-cdi-segments
    - engagement-tools-segments-managing-segments
    - engagement-tools-segments-measuring-segment-size
    - engagement-tools-segments-viewing-and-understanding-segment-data
    - engagement-tools-segments-segment-insights
    - engagement-tools-segments-suppression-lists
    - engagement-tools-segments-location-targeting
    - engagement-tools-segments-regex
    - engagement-tools-segments-troubleshooting
    - engagement-tools-segments-user-profiles
    - engagement-tools-segments-user-profiles-duplicate-users
    - engagement-tools-messaging-fundamentals-targeting-users
    - get-started-users-and-segments
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
Nick skill files serve as synthesis layers — they don't duplicate the reference topics verbatim, but instead provide a navigational lens that tells Claude *when* and *how* to apply the underlying atomic knowledge. The "lens" concept here (Audience definition, filter logic, segment sizing) acts like a role-based filter over the raw documentation.
`─────────────────────────────────────────────────`

# User Segmentation & Targeting

## Purpose

This skill covers the full lifecycle of audience definition in Braze — from building and filtering segments to sizing them, troubleshooting them, and targeting users in campaigns and Canvases. Apply this skill when working on any task that involves deciding *who* receives a message.

The **analyst lens** here is: audience definition, filter logic, and segment sizing for campaign targeting. Every segmentation decision should be evaluated against three questions: Does the filter logic correctly capture the intended audience? Is the segment sized appropriately for the channel and goal? Are there suppression or exclusion rules needed?

## Scope

This skill synthesizes the following reference topics:

| Topic | What it covers |
|-------|----------------|
| **Users and Segments Overview** | User profile structure, key attributes, and how Braze models identity |
| **User Profiles** | Profile components, custom attributes, event data, and session behavior |
| **Creating a Segment** | Navigation, filter construction, real-time update behavior |
| **Segmentation Filters** | Filter types, operators, and logical combinations (AND/OR) |
| **Regex in Segments** | Pattern matching syntax, modifiers by context, common use cases |
| **Segment Extensions** | Long-lookback behavioral targeting (up to 730 days), use cases and limits |
| **SQL Segments** | Writing SQL-based segments for complex behavioral queries |
| **CDI Segments** | Querying external data warehouses via CDI connections |
| **Location Targeting** | Most-recent-location filters, geofence setup |
| **Measuring Segment Size** | Membership calculation timing, reachability metrics |
| **Viewing and Understanding Segment Data** | Dashboard statistics, filter inspection, performance indicators |
| **Segment Insights** | KPI comparison across up to 10 segments vs. a baseline |
| **Managing Segments** | List view, archiving, status filtering, bulk operations |
| **Suppression Lists** | Dynamic exclusion groups, filter-based membership, campaign/Canvas application |
| **Targeting Users** | Targeting options when building campaigns and Canvases |
| **Duplicate Users** | Identifying and merging duplicate profiles (irreversible) |
| **Segment Troubleshooting** | "Target audience too complex" errors, query limits, debugging strategies |

## When to Use This Skill

Use this skill when:

- **Building a new audience** — defining who should receive a campaign or Canvas entry
- **Debugging segment logic** — a segment is returning unexpected counts or filtering the wrong users
- **Choosing a filter approach** — deciding between standard filters, Segment Extensions, SQL segments, or CDI segments
- **Sizing an audience** — estimating reachable users before launch, understanding why counts differ from expectations
- **Configuring exclusions** — setting up suppression lists, global control groups, or re-engagement exclusions
- **Analyzing segment performance** — comparing engagement KPIs across audience cohorts via Segment Insights
- **Handling complex behavioral queries** — when standard filters are insufficient and SQL or CDI queries are needed
- **Resolving duplicate profiles** — identifying merged/conflicting user identities before targeting

## Analyst Perspective

As a Braze analyst, segmentation decisions have direct downstream effects on deliverability, personalization accuracy, and campaign performance. Key judgment calls in this domain:

**Filter logic:** Standard AND/OR combinations suit most demographic/behavioral targeting. Reach for Segment Extensions when you need behavioral history beyond the standard lookback window. Use SQL segments when you need computed fields, aggregations, or joins. CDI segments when the authoritative data lives in your warehouse, not Braze.

**Segment sizing:** Membership updates in real-time as data arrives, but campaign audience locks at send time. Account for the gap between "segment size now" and "segment size at send." Small segments (< 1,000 users) warrant extra scrutiny — check filter logic for overly restrictive combinations.

**Suppression:** Always evaluate whether a segment needs a corresponding suppression list. Recent purchasers, opted-out users, and global control group members are the most common exclusion cases. Suppression list membership is filter-driven and updates dynamically — no manual list management required.

**Complexity limits:** Braze translates segment filters into SQL queries. Deeply nested OR logic across many filters can hit the query character threshold ("Target Audience Too Complex" error). Flatten complex logic by splitting into multiple segments and combining at the campaign level, or migrate to SQL/CDI segments.

## Key Constraints and Gotchas

- Segment Extensions require a **regeneration step** — they do not update in real-time
- SQL segments and CDI segments incur **data point or query costs** — confirm with your Braze contract before scaling
- **Merging duplicate users is irreversible** — always verify before initiating a merge
- Regex modifiers differ by context (email vs. custom attribute vs. event property) — check the Regex reference before writing patterns
- Location targeting uses **most recent location only**, not location history
