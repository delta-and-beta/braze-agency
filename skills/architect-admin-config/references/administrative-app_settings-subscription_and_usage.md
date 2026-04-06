---
name: administrative-app_settings-subscription_and_usage
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/administrative/app_settings/subscription_and_usage
indexed_at: '2026-04-05'
keywords:
  - billing
  - subscription
  - usage
  - datapoints
  - consumption
  - MAU
  - attributes
  - events
  - contracts
  - workspaces
triggers:
  - monitor data consumption
  - check billing usage
  - view subscription details
  - analyze data point usage
  - identify high-usage events
---
## Subscription and Usage

The **Billing** page (**Settings > Billing**) monitors data consumption across workspaces, apps, and event sources. Data updates daily at 10:00 PM ET — not real-time. Data points information is cached every 24 hours.

---

### Subscriptions and Usage Tab

**Usage graphs** show metrics such as:
- Monthly Active Users (MAU)
- Monthly Unique Visitors (MUV)
- Email sends

Useful for budgeting usage and understanding workspace contribution to overall consumption.

**Contract details** show the start and end date of your current Braze contract.

> **MUV → MAU contract transition:** Historical MUV data remains in the MUV graph; new data appears only in the MAU graph. Example: contract ending in October means MUV graph shows data through end of September.

---

### Most Used Events and Attributes by App Tab

Shows drivers of attribute and custom event data point usage per app.

- Select **See breakdown** on any app to view:
  - Estimated count of each custom attribute, profile attribute, and custom event
  - Percentage of that app's attribute/event updates driven by each item
  - Scoped to a selected time period

Use this to identify data points consuming large percentages of your allotment and avoid accidental/unnecessary spending. Contact your customer success manager for plan optimization guidance.

---

### Total Data Points Usage Tab

In-depth view of data point consumption, aggregated by **week** or **month**.

#### Contract Details Fields

| Field | Description |
|---|---|
| **Contract Type** | Billing term structure: Annual or Multi-Year |
| **Contract Start and End Date** | Full contract duration |
| **Allotted Data Points** | Data points allotted per billing term |
| **Contract Data Point Usage** | Cumulative total across contract lifetime; does not reset between billing terms |

#### Company Billing Data Graphs

| Graph | What it shows |
|---|---|
| **App Level Total Data Point Usage** | Data point usage broken down by app; rows with blank App Name = data points not associated with any app (e.g., requests without `app_id`) |
| **Workspace Data Point Usage** | Total usage by workspace; assess each workspace's contribution to company-wide consumption |
| **Billing Cycle Data Point Usage by Event Source** | Usage spread across event sources: API attributes, custom events, sessions |
| **Data Point Usage Over Time** | Total usage vs. allotted data points for quick over/under assessment |
