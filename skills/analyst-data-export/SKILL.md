---
name: analyst-data-export
description: >-
  Manages data export workflows including APIs, CSV generation, revenue data,
  and campaign result extraction.
metadata:
  role: braze-analyst
  topics:
    - data-distribution-export_braze_data
    - data-distribution-export_braze_data-export_apis
    - data-distribution-export_braze_data-segment_data_to_csv
    - data-distribution-export_braze_data-opening_csv_reports_in_excel
    - data-distribution-export_braze_data-exporting_revenue_data
    - data-distribution-export_braze_data-exporting_app_usage_data
    - data-distribution-export_braze_data-export_custom_event_data
    - data-distribution-export_braze_data-export_canvas_data
    - data-distribution-export_braze_data-export_campaign_results_data
    - data-distribution-export_braze_data-message_archiving
    - data-distribution-export_braze_data-faqs
    - data-distribution-export_braze_data-export_troubleshooting
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
- The `plugin-dev:skill-development` guidance emphasizes **progressive disclosure** — SKILL.md body should be lean (1,500–2,000 words), with detail deferred to `references/` files loaded as needed
- Writing in **imperative/infinitive form** ("Export segment data by...") rather than second person ("You should export...") is a hard requirement for plugin skill files
- The **lens** framing is Nick's way of encoding a perspective or mental model into the skill — it shapes *how* Claude interprets the topics, not just *what* topics exist
`─────────────────────────────────────────────────`

# Data Export & Reporting

## Purpose

This skill guides the extraction, formatting, and analysis of exported Braze data for reporting and business insights. Use this skill when working with dashboard CSV exports, programmatic API exports, revenue reports, campaign performance data, or any workflow that involves getting data out of Braze and into a usable format.

## When to Use This Skill

Apply this skill for tasks such as:

- Exporting segment, campaign, or Canvas user data to CSV
- Pulling revenue or app usage statistics from the Braze dashboard
- Setting up or querying the Export REST API for large-scale or automated data pulls
- Troubleshooting failed or missing exports (S3 bucket routing, expiry, file limits)
- Formatting exported files for analysis in Excel or downstream reporting tools
- Configuring message archiving for compliance or audit workflows
- Answering questions about what data is available to export and at what granularity

## Analytical Lens

Approach all export and reporting tasks through the lens of **extraction fidelity and analytical utility** — the goal is not just to get data out of Braze, but to get it in the right shape, at the right scope, through the right mechanism, for the intended analysis.

Key questions that guide this lens:

- **Scope**: Is the target a segment, a campaign, a Canvas, a custom event, or the full app? Each has its own export path.
- **Volume**: Does the dataset exceed the 500,000-row CSV cap? If so, route to the Export API.
- **Destination**: Is there an S3 bucket configured? If yes, all exports route there — the dashboard link will not work.
- **Freshness**: Are the exported files still within the 4-hour expiry window (default Braze S3)?
- **Format**: Does the receiving tool (Excel, BI platform, data warehouse) require specific encoding or column structure?

## Topics Covered

This skill synthesizes the following reference topics:

| Topic | Coverage |
|-------|----------|
| **Export Braze Data Overview** | Entry point for understanding available export mechanisms and their appropriate use cases |
| **Export Segment Data to CSV** | Step-by-step export from segment editor and Segments list page; user data vs. email address exports |
| **Opening CSV Reports in Excel** | Handling default application settings on Windows and Mac; encoding and display issues |
| **Message Archiving** | Configuring archiving for compliance; S3/Azure Blob integration; raw message content retention |
| **Export FAQs** | S3 routing behavior, file limits, common edge cases, and answers to recurring export questions |
| **Exporting Revenue Data** | Revenue Report location, time period filtering, per-product breakdowns, CSV download steps |
| **Exporting App Usage Data** | Home dashboard exports for DAU/MAU and session statistics; time frame and app filtering |
| **Export Troubleshooting** | Diagnosing missing files, expired links, S3 misconfiguration, and ZIP extraction issues |
| **Export Custom Event Data** | Custom Events report; time-based occurrence exports; segment filter application |
| **Export Canvas Data** | Full Canvas export vs. per-component export; step-level user data extraction |
| **Export Campaign Results Data** | Multichannel campaign performance exports; available data series by channel; historical graph access |
| **Export APIs** | REST API endpoints for programmatic JSON export; use cases where API is preferred over CSV |

## Key Constraints and Gotchas

**S3 bucket behavior is all-or-nothing.** When S3 credentials are configured in Braze, every export routes to that bucket. There is no selective routing. If users expect a dashboard download link but see nothing, check S3 configuration first.

**Default Braze storage expires in 4 hours.** Without a storage partner, export links in emails are temporary. Treat these as one-time-use and download immediately.

**CSV exports cap at 500,000 rows.** For larger datasets, route to the Export API. The API returns JSON and supports pagination for arbitrarily large result sets.

**Excel encoding issues are common.** CSVs exported from Braze use UTF-8 encoding. Excel on Windows may misread special characters unless the file is explicitly imported with encoding selection rather than opened directly.

## Export Mechanism Decision Tree

```
Need to export data from Braze?
├── Segment users → Segment Editor > User Data dropdown
├── Campaign performance → Campaigns > select campaign > historical graphs
├── Canvas user data → Canvas > component > Export User Data
├── Revenue stats → Analytics > Revenue Report
├── App usage → Home dashboard > export icon
├── Custom events → Analytics > Custom Events > export CSV
├── Large dataset (>500k rows) → Export REST API
└── Automated / recurring export → Export REST API + S3 destination
```

## Additional Resources

### Reference Files

For detailed procedures, API endpoint references, and troubleshooting steps, consult the `references/` directory:

- **`references/export-apis.md`** — REST API endpoints, authentication, pagination, and JSON response shapes
- **`references/export-segment-data.md`** — Step-by-step segment export procedures
- **`references/export-campaign-results.md`** — Campaign and Canvas export workflows by channel
- **`references/export-troubleshooting.md`** — Diagnosis steps for S3 issues, expired links, and file format problems
- **`references/message-archiving.md`** — Archiving configuration and storage partner setup
- **`references/export-faqs.md`** — Answers to recurring export questions

`★ Insight ─────────────────────────────────────`
- The **decision tree** is a high-value addition here — it collapses 12 distinct topic paths into a single scannable routing heuristic, which is exactly the kind of synthesized knowledge that justifies a skill file over raw topic documents
- Surfacing the **S3 all-or-nothing constraint** and **4-hour expiry** prominently in the skill body (rather than burying them in references) follows the principle: put the "most likely to burn a user" facts at the top level where they're always loaded
- The `references/` section naming mirrors how Nick generates plugin structure — `skills/{name}/references/*.md` — so this SKILL.md is already scaffolded for Nick's two-layer content hierarchy
`─────────────────────────────────────────────────`
