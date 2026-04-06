---
name: analyst-data-management
description: >-
  Data operations including dispatch tracking, custom data types, blocklisting,
  cross-source attribute management, and analytics partner integration.
metadata:
  role: braze-analyst
  topics:
    - help-data
    - help-data-dispatch-id
    - help-data-change-custom-data-type
    - help-data-blocklisting-deletion
    - help-api-attribute-name-id-across-sources
    - partners-data-and-analytics
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
Skill bodies are designed for **progressive disclosure** — the body stays lean (~1,500–2,000 words) and acts as a structured index into deeper topic files. The `braze-analyst` lens shapes *how* topics are framed: not "here's the feature" but "here's what to check, audit, and watch out for."
`─────────────────────────────────────────────────`

# Data Management & Operations

This skill covers how to manage, audit, and operate on Braze data — including custom attributes and events, dispatch tracking, blocklisting, cross-source attribute resolution, and analytics partner integrations. Apply this skill when diagnosing data inconsistencies, performing data hygiene operations, or connecting Braze to downstream analytics systems.

## Scope

This skill synthesizes knowledge across the following operational domains:

| Domain | Purpose |
|--------|---------|
| Attribute identity across sources | Resolve how campaign/Canvas names and IDs differ between Liquid, REST API, and Currents |
| Dispatch ID tracking | Understand `dispatch_id` semantics for scheduled vs. triggered sends |
| Custom data type changes | Change attribute or event data types without data loss surprises |
| Blocklisting vs. deletion | Choose the right data removal strategy for custom attributes and events |
| Data and analytics partner integration | Connect Braze to downstream analytics platforms |

---

## Attribute Identity Across Sources

Campaign and Canvas names and IDs are available in three places — Liquid, REST API, and Currents — but they do **not** share a unified naming scheme. When auditing attribution or debugging cross-source discrepancies:

- **Liquid**: Exposes `campaign.${api_id}`, `canvas.name`, `canvas_step.name` — these are runtime values populated at send time.
- **REST API**: Uses `campaign_id`, `canvas_id`, `canvas_step_id` — the stable identifiers for querying send history.
- **Currents**: Uses `campaign_id`, `canvas_id`, `canvas_step_id` in event payloads, matching the REST API identifiers — but step names are not always included.

To correlate data across these sources:

1. Use the Braze dashboard to map human-readable names to stable IDs before constructing Currents or API queries.
2. Do not rely on names for joins — names can change; IDs are stable.
3. Canvas Step IDs differ from Canvas IDs — always capture both when tracking step-level attribution.

---

## Dispatch ID

A `dispatch_id` is the unique identifier for a single message transmission — one per "send event." Understanding its scope prevents incorrect deduplication or audience analysis:

- **Scheduled messages**: All users in the same scheduled send share the same `dispatch_id`. This is intentional — the dispatch represents the batch.
- **Action-based and API-triggered messages**: Each user receives a unique `dispatch_id` because each send is individually triggered.
- **API-triggered campaigns with `send_id`**: A `send_id` is an optional caller-supplied identifier. It is distinct from `dispatch_id` and does not replace it.

To audit message delivery:

- Use `dispatch_id` to group all users in a scheduled send for aggregate analysis.
- Use `dispatch_id` + `user_id` for individual-level delivery confirmation.
- Avoid using `dispatch_id` as a proxy for "campaign send" — one campaign can produce many dispatch IDs (one per scheduled send or trigger).

---

## Changing Custom Attribute or Event Data Types

To change the data type of a custom attribute or event:

1. Navigate to **Data Settings** in the Braze dashboard.
2. Select **Custom Attributes** or **Custom Events**.
3. Locate the attribute or event and select the new data type.

Operational considerations before changing a type:

- **Existing data is not backfilled or converted.** Historical data retains the old type; only new ingestion uses the new type.
- **SDK and API writes must be updated.** If code continues sending the old type, Braze will reject or coerce values depending on the mismatch.
- **Segmentation filters may break.** Filters referencing the old type should be audited and updated before the type change goes live.
- **Array types require special handling.** Changing to or from an array type has stricter coercion rules — verify current values before switching.

To audit impact before changing:

1. Identify all segments using the attribute.
2. Identify all Canvases or campaigns filtering on the attribute.
3. Coordinate the data type change with any SDK/API update that will begin sending the new type.

---

## Blocklisting vs. Deletion

These two operations are not equivalent. Choosing incorrectly can cause data loss or continued ingestion of unwanted data.

### Blocklisting

Blocklisting a custom attribute or event:

- **Stops ingestion** of new data for that attribute or event.
- **Preserves existing data** — historical values remain queryable and visible.
- **Prevents use in segmentation** — the attribute or event no longer appears in the filter builder.
- Is **reversible** — unblocklist to resume ingestion.

Use blocklisting when:
- A data point is being sent in error and must be stopped without losing historical context.
- Migrating to a renamed attribute — blocklist the old one after the new one is established.
- Temporarily halting ingestion during a data quality investigation.

### Deletion

Deleting a custom attribute or event:

- **Permanently removes** all historical data associated with it.
- **Cannot be undone.**
- Frees up the custom data slot for reuse.

Use deletion only when:
- The data is confirmed to have no analytical or compliance value.
- All downstream dependencies (segments, Canvases, exports) have been updated or decommissioned.

To audit before deleting:

1. Search all active segments for usage of the attribute or event.
2. Review active Canvases and campaigns for filter references.
3. Confirm with stakeholders that the historical data is no longer needed.
4. Blocklist first, wait a grace period, then delete — this pattern prevents accidental permanent loss.

---

## Data and Analytics Partner Integration

Braze supports integration with downstream analytics platforms via:

- **Currents** — Real-time event streaming to supported data warehouses and analytics tools (Amplitude, Mixpanel, Segment, Snowflake, etc.).
- **Export APIs** — Pull-based export of user, segment, and campaign data.
- **Partner integrations** — Native connectors configured in the dashboard under **Technology Partners**.

When evaluating or auditing an analytics integration:

1. Confirm the integration type (Currents vs. API export vs. native partner).
2. For Currents: verify which event types are enabled (message events, user events, purchase events) — not all event types are enabled by default.
3. For native partners: check the data sharing scope and whether PII is included in the payload.
4. Validate that `external_id` or another stable user identifier is included in the exported payload for cross-system joins.
5. For Snowflake Data Sharing: data is read-only and refresh cadence is not real-time — account for latency in downstream reporting.

---

## Operational Checklist

Use this checklist when performing data audits or operational changes:

**Before changing or removing custom data:**
- [ ] Identify all segments using the attribute or event
- [ ] Review all active Canvases and campaigns for references
- [ ] Coordinate with teams owning SDK/API instrumentation
- [ ] Blocklist before deleting (use as a safety step)

**Before analytics partner integration:**
- [ ] Confirm which identifier field will be used for user joins
- [ ] Review which Currents event types are required
- [ ] Validate PII handling and data sharing agreements
- [ ] Test event payload against downstream schema expectations

**When diagnosing cross-source discrepancies:**
- [ ] Map human-readable names to stable IDs via the dashboard
- [ ] Confirm whether Dispatch ID or Send ID is the correct correlation key
- [ ] Verify the source type (scheduled vs. triggered) before interpreting Dispatch ID semantics

---

## Additional Resources

Consult the topic reference files for deeper coverage:

- **`references/attribute-identity.md`** — Full mapping of campaign/Canvas attribute fields across Liquid, REST API, and Currents
- **`references/dispatch-id.md`** — Dispatch ID behavior by send type, including scheduled, triggered, and API-triggered
- **`references/custom-data-types.md`** — Data type change procedures and coercion behavior
- **`references/blocklist-deletion.md`** — Step-by-step blocklist and deletion procedures with rollback guidance
- **`references/analytics-partners.md`** — Partner integration patterns, Currents event types, and Snowflake Data Sharing details

`★ Insight ─────────────────────────────────────`
The **blocklist-then-delete** pattern is a classic data hygiene principle — it mirrors the "soft delete" pattern in databases. Blocklisting acts as the logical delete (stops new writes, preserves reads), while physical deletion is deferred until confidence is high. This matches the principle of making irreversible actions require deliberate, staged effort.

The **dispatch ID scoping** (shared for scheduled, unique for triggered) is a subtlety that trips up analysts — it means `dispatch_id` is only a reliable deduplication key *within* a send type, not across all send mechanisms for a campaign.
`─────────────────────────────────────────────────`
