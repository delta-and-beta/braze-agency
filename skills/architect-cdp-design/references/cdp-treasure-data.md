---
name: cdp-treasure-data
source_url: >-
  https://braze-inc.github.io/braze-docs/_partners/data_and_analytics/cohort_import/treasuredata
indexed_at: '2026-04-05'
keywords:
  - cohort
  - import
  - braze
  - treasure-data
  - segment
  - authentication
  - external-id
  - device-id
  - activation
triggers:
  - import cohorts from Treasure Data into Braze
  - set up Treasure Data and Braze integration
  - sync user cohorts to Braze
  - authenticate Treasure Data
  - export audience segment to Braze
---
## Treasure Data CDP — Braze Cohort Import

Imports user cohorts from Treasure Data into Braze for targeted campaigns. Currently in beta. Only syncs existing Braze users — does not create new profiles.

## Prerequisites

| Requirement | Notes |
|-------------|-------|
| Treasure Data account | Required |
| Braze Data Import Key | Found at **Partner Integrations > Technology Partners > Treasure Data** |
| Braze REST endpoint | Instance-specific URL |
| Treasure Data static IP | Contact TD Customer Success or Technical Support to obtain |

## Setup

**Step 1: Get Braze Data Import Key**

Navigate to **Partner Integrations > Technology Partners > Treasure Data**. Generate or rotate the import key here.

**Step 2: Authenticate in Treasure Data**

1. Go to **Integrations Hub > Catalog**
2. Search for Braze integration
3. Hover icon → **Create Authentication**
4. Enter credentials and name, then **Done**

## Defining Cohorts (Two Methods)

### Method A: Data Workbench

Navigate to **Data Workbench > Queries > New Query**.

Query columns must use exact names. Must include at least one of: `user_ids`, `device_ids`, or a braze alias column.

**Sync by External ID** — column must be named `user_ids`:
```sql
SELECT external_id as user_ids FROM example_cohort_table
```

**Sync by User Alias** — use any non-reserved column (e.g., `email`):
```sql
SELECT email FROM example_cohort_table
```
Result: adds alias entries as `{"alias_label":"email", "alias_name":"<value>"}`.

**Sync by Device ID** — column must be named `device_ids`:
```sql
SELECT device_ids FROM example_cohort_table
```

**Export Results configuration:**

| Field | Description |
|-------|-------------|
| Cohort ID | Backend identifier sent to Braze |
| Cohort Name (optional) | Appears in Braze Segmentation filter; defaults to Cohort ID |
| Operation | Add or remove profiles from cohort |
| Aliases (optional) | Column name → `alias_label`; row values → `alias_name` |
| Thread Count | Concurrent API calls |

Run query to execute and auto-export results to Braze.

### Method B: Audience Studio

1. Create or select a segment → **Create Activation**
2. Fill activation details: name, description, authentication (from Step 2), Cohort ID, optional Cohort Name, and Operation (add/remove)

## Key Constraints

- **Cohort Import will not create new Braze users** — only existing profiles are added/removed
- Column name must be exactly `user_ids` for external ID syncs (not `external_id`)
- Column name must be exactly `device_ids` for device ID syncs
