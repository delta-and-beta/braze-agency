---
name: data-unification-cloud_ingestion-sync_logs
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/data/unification/cloud_ingestion/sync_logs
indexed_at: '2026-04-05'
keywords:
  - sync
  - logs
  - ingestion
  - status
  - errors
  - rows
  - payload
  - retention
  - filtering
  - monitoring
triggers:
  - monitor sync runs
  - diagnose sync errors
  - view sync details
  - export sync logs
  - check data retention
---
`★ Insight ─────────────────────────────────────`
Topic files in Nick's architecture are "atomic knowledge units" — each one should be independently comprehensible and scoped to a single concept. The goal is to strip Jekyll liquid tags (`{% image_buster %}`, `{% multi_lang_include %}`), navigation links, and image references while preserving every operational detail an engineer would need to diagnose a sync problem.
`─────────────────────────────────────────────────`

## Cloud Ingestion Sync Logs

The CDI **Sync Log** dashboard (under **Data Settings > Cloud Data Ingestion > Sync Log** tab) lets you monitor all data processed by Cloud Data Ingestion, verify sync success, and diagnose missing or incorrect data.

---

### Sync Run Statuses

| Status | Meaning |
|---|---|
| **Running** | Sync job currently in progress |
| **Success** | All rows processed successfully |
| **Partial Success** | Completed, but one or more rows had errors |
| **Error** | Sync failed to complete |
| **Limit Exceeded** | Stopped because a data limit was exceeded |

---

### Sync Log Fields

Each entry in the Sync Log table includes:

| Field | Description |
|---|---|
| **Sync name** | Name of the sync configuration |
| **Run ID** | Unique execution identifier; usable in CDI API endpoints and Braze Support references |
| **Status** | Current/final status of the run |
| **New rows read from source** | Rows pulled from the data warehouse for this run |
| **Results** | Count of rows succeeded vs. failed |
| **Last "UPDATED_AT"** | Timestamp of the most recent record processed |
| **Run start time** | When the sync job began |
| **Run duration** | Total time to complete |

---

### Data Retention

- **Row-level payloads and error details:** Retained for **30 days**, then automatically purged.
- **Run metadata** (row counts, etc.): Retained for at least **12 months**.

---

### Filtering Sync Logs

Available filters on the Sync Log table:

- **Job start date:** Predefined range (e.g., "Last 30 days") or custom date range
- **Status:** Filter by one or more statuses (e.g., Error + Partial Success only)
- **Sync name:** Search by sync configuration name

---

### Run Details (Row-Level View)

Selecting a **Run ID** opens the Run Details page with:

**Run Overview**
- Start time, end time, duration
- Total rows read from source
- Count of successes vs. errors

**Rows Processed Table**

| Column | Description |
|---|---|
| **UPDATED_AT** | Timestamp from the `UPDATED_AT` column for that row |
| **ID** | User identifiers (`external_id`, `email`, `alias_name`) used to match a Braze profile |
| **Status** | `Success` or `Error` per row |
| **Source payload** | Link to view the raw JSON payload sent to Braze |
| **Error reason** | Why the row failed (only shown when Status = Error) |

**Search:** Find a specific user within the run using the **Search by user ID** bar.

---

### Exporting Sync Logs

Use **Export rows** on the Run Details page. Two export options:

- **Rows with errors only** — file with Error-status rows
- **All rows** — file with every row in the run

> Note: Exports are not downloaded directly from the dashboard. An email with a download link is sent after the export is generated. (All-rows export is an early access/beta feature.)

---

### Email Notifications

Notifications are configured at sync creation time and can be updated anytime.

**Required:** At least one email address must be set to receive error notifications.

**Error notification triggers:**
- Entire sync job fails to run or complete
- Sync encounters an error requiring user intervention (e.g., expired credentials, missing source table)

**Additional notification options:**

| Option | Description |
|---|---|
| **Row error** | Alert when a percentage of rows fail within a sync |
| **Failure threshold (%)** | Set the failure percentage that triggers the alert (e.g., `1` = alert if ≥1% of rows error) |
| **Sync success** | Notification on successful sync completion |
| **Alert even if no rows change** | Notify even when a successful sync processes zero new/updated rows |

`★ Insight ─────────────────────────────────────`
The table-heavy structure here mirrors how Nick's topic generator works best — scannable reference tables preserve the same information density as the original prose but dramatically reduce token count during runtime retrieval. The failure threshold example (`1` = 1%) is the kind of concrete operational detail worth keeping verbatim, since it's the difference between a useful and a useless reference.
`─────────────────────────────────────────────────`
