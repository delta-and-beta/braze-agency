---
name: engagement-tools-segments-segment-extension
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/engagement_tools/segments/segment_extension
indexed_at: '2026-04-05'
keywords:
  - segments
  - extensions
  - targeting
  - events
  - purchase
  - audience
  - properties
  - SQL
  - refresh
  - lookback
triggers:
  - create a segment extension
  - target users by purchase behavior
  - configure event property filters
  - extend segmentation lookback window
  - set up SQL segment extension
---
## Segment Extensions

Segment Extensions let you target users based on custom event or purchase behavior across up to **730 days (2 years)** of history — far beyond standard Braze segmentation's default lookback windows.

**When to use:** Advanced targeting scenarios requiring long lookback windows or complex behavioral logic (e.g., "users who bought a specific product color at least twice between 18–24 months ago").

**Workspace limit:** 25 active Segment Extensions per workspace by default. Contact your CSM to increase.

---

## Extension Types

| Type | Description | SQL Credits? |
|------|-------------|--------------|
| **Simple extension** | Form-based, single event focus, no SQL | No |
| **Start with template** | SQL with Snowflake, customizable template | Yes |
| **Incremental refresh** | SQL, auto-refreshes last 2 days | Yes |
| **Full refresh** | SQL or CDI source, recalculates entire audience | Yes |

CDI Segments consume credits within your own data warehouse.

---

## Creating a Simple Extension

**Navigate:** Audience > Segment Extensions > Create New Extension > Simple extension

### Criteria Options
- Purchase event
- Message engagement
- Custom event

### Configuration
1. Select event type and specific event
2. Set frequency: more than / less than / equal to N times
3. Set time period: relative (last X days), start/end dates, or exact date range — up to 730 days back

### Event Property Filters

Enable **Add Property Filters** to drill down on event properties:

| Property Type | Behavior |
|--------------|----------|
| String | Supports multiple values (e.g., status = gold OR silver OR bronze) |
| Numeric | Standard numeric comparisons |
| Boolean | True/false matching |
| Datetime | Date range matching |
| Nested objects | Supported via nested event properties |

Event property storage within Segment Extensions has **no time-stamped limit** and does **not impact data point usage**.

### Refresh Settings
Configured in Step 4 (optional) — controls how often the extension recalculates its user list.

### Processing
After saving, the extension enters a processing queue. Processing time depends on user volume, event capture rate, and lookback window length.

---

## Key Constraints

- **Not required** for event properties in segments — standard segments support event properties from the past 30 days without extensions
- **Not required** for real-time triggered delivery — event property triggers work without Segment Extensions
- Extensions extend the historic window only; they don't replace real-time segmentation

---

## SQL Segment Extensions

For SQL-based extensions (incremental/full refresh), see the SQL Segment Extensions documentation. These support Snowflake data and CDI connected sources.
