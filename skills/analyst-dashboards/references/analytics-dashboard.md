---
name: analytics-dashboard
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/analytics/reporting/dashboard_builder
indexed_at: '2026-04-05'
keywords:
  - dashboard
  - tiles
  - metrics
  - charts
  - reports
  - queries
  - analytics
  - visualization
  - revenue
  - campaigns
triggers:
  - how to create a custom dashboard
  - how to add tiles to a dashboard
  - how to manage dashboard tiles
  - how to run a dashboard
  - building analytics dashboards
---
# Dashboard Builder Overview

Dashboard Builder creates and visualizes custom analytic dashboards using reports from Report Builder (no-code) or Query Builder (SQL).

## Creating a Custom Dashboard

**Navigation:** Analytics > Dashboard Builder > Create Dashboard

### With Report Builder (Reports)

1. Select **+ Add Tile**, choose a Report Builder report
2. Select the pencil icon to edit tile title and chart type
   - Chart types: bar (horizontal/vertical), line (only if **Date** was selected as drilldown in Report Builder)
   - Use metrics dropdown to select which metrics display; first column is default
3. Select **Save**
4. Add name, description, and tag

> **Important:** Report Builder tiles are not live-linked to the original report. If the source report changes, delete the tile and recreate it.

### With Query Builder (Custom Queries)

1. Select **+ Add Tile**, choose a Query Builder query
2. Select the pencil icon to edit title and chart type
   - Chart types: tables, bar (horizontal/vertical), line charts
   - **X-axis** dropdown: select one column as x-axis
   - **Y-axis** dropdown: select metrics (all columns shown by default; deselect unwanted)
   - **Grouping** dropdown (optional): aggregate rows sharing a column value
   - To edit underlying data, select the attached query to open Query Builder
3. Select **Save**
4. Add name, description, and tag

**Limit:** Up to 10 tiles per dashboard.

After adding all tiles: **View Dashboard** > **Run Dashboard** (may take a few minutes).

## Managing Tiles

| Action | How |
|--------|-----|
| Delete | **Delete Tile** at bottom of tile (irreversible) |
| Duplicate | **Duplicate Tile** at bottom of tile |
| Resize | Drag bottom-right corner |
| Reposition | Drag handle at top-right corner |

## Running a Dashboard

Analytics > Dashboard Builder → select a dashboard → **Run Dashboard**

Braze-supplied dashboards appear at the top, marked with "(Braze)" in the title.

## Pre-Built Dashboards

### Revenue - Last Touch Attribution

Reviews revenue across campaigns, Canvases, and channels. Revenue attributed to the last-touched message within the attribution window.

**Counted touch types:** Email Click, Content Card Click, In-App Message Click (excluding close), Push Opens, SMS Short Link Click, WhatsApp Read, Webhook Send.

| Metric | Definition |
|--------|-----------|
| Total Last Touch Revenue | Sum of all revenue events with a last-touch event in the selected date range and attribution window |
| Total Purchase Conversions | Count of all revenue events with a qualifying last-touch event |
| Average Days to Convert | Average time between purchase events and qualifying last-touch events |
| Revenue per Recipient | Qualified revenue sum ÷ unique users who received a message in the date range |
| Unique Purchasers | Count of unique users with a qualified revenue event |
| Revenue by Country | Revenue grouped by country |
| Revenue by Campaign | Revenue grouped by campaign |
| Revenue by Campaign Variant | Revenue grouped by campaign variant |
| Revenue by Canvas | Revenue grouped by Canvas |
| Revenue by Canvas Variant | Revenue grouped by Canvas variant |
| Purchases per Product | Purchase count grouped by product |
| Revenue by Channel | Revenue grouped by channel |
| Revenue Time Series | Revenue grouped by day (UTC) |

### Devices and Carriers

| Metric | Definition |
|--------|-----------|
| Device Carriers | Users who opened a push notification, grouped by device carrier |
| Device Model | Users who opened a push notification, grouped by device model |
| Device Operating System | Users who opened a push notification, grouped by OS |
| Device Screen Size | Users who opened a push notification, grouped by screen size |

> Pre-built dashboards are read-only. Contact your customer success manager to request additional dashboards.

`★ Insight ─────────────────────────────────────`
- Jekyll template syntax (`{% tabs %}`, `{% image_buster %}`, `{: start="4"}`) is stripped entirely — these are build-time directives that have no meaning outside the Jekyll rendering pipeline and would appear as literal noise in a plain markdown topic file.
- The tile disconnection behavior for Report Builder is a non-obvious gotcha worth preserving prominently — it's the kind of fact that causes silent data drift if a user edits the source report expecting the dashboard to update automatically.
- The metrics tables are kept verbatim since they are the densest reference material in the source; condensing them further would destroy lookup utility.
`─────────────────────────────────────────────────`
