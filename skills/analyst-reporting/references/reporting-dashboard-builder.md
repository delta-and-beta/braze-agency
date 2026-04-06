---
name: reporting-dashboard-builder
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/analytics/reporting/dashboard_builder
indexed_at: '2026-04-05'
keywords:
  - dashboard
  - analytics
  - reporting
  - query
  - tile
  - metrics
  - chart
  - attribution
  - campaign
  - revenue
triggers:
  - create a custom dashboard
  - add a tile to dashboard
  - configure dashboard metrics
  - run a dashboard report
  - track revenue by campaign
---
`★ Insight ─────────────────────────────────────`
Topic files in this codebase are "atomic knowledge units" — they live in `skills/{skill-name}/references/` and are designed to be loaded as context snippets during query routing. The goal is high signal-to-noise: strip Liquid template syntax (`{% tabs %}`, `{% image_buster %}`), navigation links, and repetitive framing while keeping every fact a developer or marketer would actually look up.
`─────────────────────────────────────────────────`

## Dashboard Builder

Dashboard Builder creates custom analytic dashboards from Report Builder (no-code) or Query Builder (SQL) data sources. Pre-built Braze dashboards are also available.

**Location:** Analytics > Dashboard Builder

---

### Creating a Custom Dashboard

1. Go to **Analytics > Dashboard Builder** > **Create Dashboard**.
2. Choose a data source: **Reports** (Report Builder) or **Custom Queries** (Query Builder).

#### Using Report Builder Reports

3. Select **+ Add Tile** > choose a report from Report Builder.
   - **Important:** Tiles are not linked to the original report. If you edit the source report, delete the tile and recreate it.
4. Select the pencil icon to edit title and chart type.
   - Chart types: bar (horizontal/vertical), line (only if **Date** was selected as a drilldown in Report Builder).
   - Use the metrics dropdown to select which metrics display. Default: first column in the report.
5. Select **Save**.

#### Using Query Builder Queries

3. Select **+ Add Tile** > choose a Query Builder query.
4. Select the pencil icon to edit title and chart type.
   - Chart types: table, bar (horizontal/vertical), line.
   - **X-axis dropdown:** select a single column as the x-axis.
   - **Y-axis dropdown:** select metrics to display (all columns shown by default; deselect unwanted ones).
   - **Grouping dropdown (optional):** group query results by a column value (e.g., sum rows by campaign ID).
   - To edit the underlying query, select the attached query to open it in Query Builder.
5. Select **Save**.

#### Finishing

6. Add a name, description, and tag.
7. Repeat tile creation (up to **10 tiles** per dashboard).
8. Select **View Dashboard** > **Run Dashboard**.

Dashboards may take a few minutes to generate.

---

### Managing Tiles

| Action | How |
|---|---|
| Delete | Select **Delete Tile** at the bottom of the tile. **Irreversible.** |
| Duplicate | Select **Duplicate Tile** at the bottom of the tile. |
| Resize | Drag the bottom-right corner of the tile. |
| Reposition | Drag the handle at the top-right corner of the tile. |

---

### Running a Dashboard

1. Go to **Analytics > Dashboard Builder**.
2. Select a dashboard. Braze-created dashboards appear at the top, labeled with "(Braze)".
3. Select **Run Dashboard**.

---

### Pre-built Braze Dashboards

#### Revenue – Last Touch Attribution

Reviews revenue across campaigns, Canvases, and channels. Revenue is attributed to the last-touched message within the attribution window.

**Qualifying touch events:** Email Click, Content Card Click, In-App Message Click (excluding close), Push Open, SMS Short Link Click, WhatsApp Read, Webhook Send.

| Metric | Definition |
|---|---|
| Total Last Touch Revenue | Sum of all revenue events with a last-touch event within the date range and attribution window. |
| Total Purchase Conversions | Count of all revenue events with a qualifying last-touch event. |
| Average Days to Convert | Average time between purchase events and the qualifying last-touch event. |
| Revenue per Recipient | Qualified revenue ÷ unique users who received a message in the date range. |
| Unique Purchasers | Count of unique users with a qualified revenue event. |
| Revenue by Country | Revenue grouped by country. |
| Revenue by Campaign | Revenue grouped by campaign. |
| Revenue by Campaign Variant | Revenue grouped by campaign variant. |
| Revenue by Canvas | Revenue grouped by Canvas. |
| Revenue by Canvas Variant | Revenue grouped by Canvas variant. |
| Purchases per Product | Purchase count grouped by product. |
| Revenue by Channel | Revenue grouped by channel. |
| Revenue Time Series | Revenue grouped by day (UTC). |

#### Devices and Carriers

| Metric | Definition |
|---|---|
| Device Carriers | Users who opened a push notification, grouped by device carrier. |
| Device Model | Users who opened a push notification, grouped by device model. |
| Device Operating System | Users who opened a push notification, grouped by OS. |
| Device Screen Size | Users who opened a push notification, grouped by screen size. |

`★ Insight ─────────────────────────────────────`
The original doc used Jekyll's `{% tabs %}` Liquid template — the processed version collapses those into sequential `####` headers, which is the right pattern for topic files since they're consumed as raw markdown by the vector search and agent context systems, not rendered by a Jekyll site. The metric tables are kept intact because they're the highest-density lookup content in this doc.
`─────────────────────────────────────────────────`
