---
name: cdp-amplitude-amplitude-cohort-import
source_url: >-
  https://braze-inc.github.io/braze-docs/_partners/data_and_analytics/customer_data_platform/amplitude/amplitude_cohort_import
indexed_at: '2026-04-05'
keywords:
  - amplitude
  - cohort
  - import
  - segment
  - sync
  - identifiers
  - integration
  - campaign
  - matching
  - datapoints
triggers:
  - import cohorts from amplitude
  - sync amplitude cohorts to braze
  - create segments from amplitude
  - match users between amplitude and braze
  - export behavioral cohorts
---
`★ Insight ─────────────────────────────────────`
Topic files in Nick's architecture are atomic knowledge units nested inside a skill's `references/` directory. They're designed to be retrieved at "Default" depth (Sonnet, fast lookup) — so brevity and scannability matter more than exhaustiveness. Stripping Jekyll liquid tags (`{% image_buster %}`, `{{site.baseurl}}`) is essential since they won't render outside the Braze docs site.
`─────────────────────────────────────────────────`

## Amplitude Cohort Import

Import user cohorts from Amplitude into Braze to use them as segments in campaigns and Canvases.

> **Note:** Cohort Import only adds/removes existing Braze users — it does not create new users.

---

### Setup (One-Time)

**Step 1 — Get Braze credentials**

In Braze: **Partner Integrations > Technology Partners > Amplitude**
- Copy the **REST endpoint**
- Generate your **data import key** (can be rotated or invalidated at any time)

**Step 2 — Configure in Amplitude**

In Amplitude: **Sources & Destinations > [project] > Destinations > Braze**
- Paste the data import key and REST endpoint → **Save**

---

### Exporting a Cohort

**Step 3 — Sync cohort from Amplitude**

1. Create a [behavioral cohort](https://help.amplitude.com/hc/en-us/articles/231881448-Behavioral-Cohorts) in Amplitude
2. Click **Sync to...** and select Braze

**Supported identifiers** (evaluated in priority order):
| Priority | Identifier |
|----------|-----------|
| Primary | User Alias |
| Secondary | Device ID |
| Tertiary | User ID (External ID) |

Amplitude falls back to the next available identifier when the primary is missing — maximizing sync coverage for anonymous/partially-identified users.

**Sync cadence options:**
- One-time
- Scheduled daily or hourly
- Real-time (updates every minute)

> Each sync consumes Braze data points.

---

### Using the Cohort in Braze

**Step 4 — Create a segment**

In Braze: **Engagement > Segments > Create Segment**
- Filter: **Amplitude Cohorts** → `includes` → select your cohort name

Reference this segment in campaign or Canvas targeting.

---

### User Matching Reference

| User Type | Matching Method |
|-----------|----------------|
| Identified users | `external_id` or `alias` |
| Anonymous users | `device_id` |
| Originally anonymous, now identified | Must use `external_id` or `alias` (not `device_id`) |
