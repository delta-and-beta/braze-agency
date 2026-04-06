---
name: query-builder-query-templates
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/analytics/query_builder/query_templates
indexed_at: '2026-04-05'
keywords:
  - query
  - templates
  - channel
  - campaign
  - canvas
  - revenue
  - metrics
  - email
  - segment
  - engagement
triggers:
  - how to create query templates
  - track revenue by segment
  - analyze email metrics
  - build channel reports
  - report canvas performance
---
# Query Builder Templates

Query Builder templates are accessible by selecting **Query Template** when creating a report. All templates surface data from up to the last **60 days** (editable in the editor). For metric definitions, see the Report Metrics Glossary filtered by channel.

---

## Channel Templates

| Template | Description |
|---|---|
| **Channel engagement and revenue** | Engagement metrics (opens, clicks), revenue, number of transactions, and average price per channel. *Transactions* = purchase event count. *Average price* = revenue ÷ transactions. |
| **Purchases and revenue by segment** | Purchase metrics for messages sent to a specific segment. Purchase metrics are unique per reporting period (one user = at most one purchase). Revenue includes all purchases in the period. |
| **Purchases and revenue for variants or steps, by segment** | Same as above, but broken down by Canvas variants or steps per segment. |
| **Top/bottom messaging for purchases** | Purchase metrics for top or bottom campaigns, Canvases, or Canvas steps. Must specify: top vs. bottom, and target metric (e.g., *Unique purchases upon receipt*, *Revenue upon receipt*, *Unique recipients*). Top = best-to-worst; bottom = worst-to-best. |

---

## Campaign Templates

| Template | Description |
|---|---|
| **Campaign revenue by country** | Revenue per country for a specific campaign. **Requires:** campaign API identifier (found at bottom of campaign details page). Shows: revenue, orders, returns, net revenue, gross revenue. *Returns* = purchase events with negative revenue. *Net revenue* = non-returns only. *Gross revenue* = includes return values. |

---

## Canvas Templates

| Template | Description |
|---|---|
| **Canvas revenue by country** | Revenue per country for a specific Canvas. **Requires:** Canvas API identifier (found under **Analyze Variants**). Same metrics as Campaign revenue by country: orders, returns, net revenue, gross revenue. |

---

## Email Templates

| Template | Description |
|---|---|
| **Email bounces per domain** | Bounce counts per email domain: total, hard bounces, soft bounces. |
| **Email delivery metrics by day** | Daily metrics: emails sent, delivered, soft bounced, hard bounced. All metrics are unique per reporting period — a soft bounce on day 1 counts only for day 1, even if it bounced again on day 2. |
| **Email engagement metrics by segment** | Delivery/bounce metrics (sent, delivered, soft bounced, hard bounced) per segment. Same uniqueness rule as above. |
| **Email engagement metrics for variants or steps, by segment** | Same as above, broken down by Canvas variants or steps per segment. |
| **Email performance by country** | Per-country metrics: sends, indirect open rate, direct open rate. Country is determined at time of send. |
| **Email Subscription Change Logs** | Per-user subscription change log: email address, subscription status, time of change, associated Canvas or campaign. |
| **Email subscription group opt-ins and opt-outs** | Weekly unique user opt-ins and opt-outs per email subscription group. |
| **Email URLs clicked** | Click counts per link in an email. **Requires:** campaign or Canvas API identifier. Reports de-personalized URLs (Liquid tags stripped) with click counts. CSV export includes user IDs, links clicked, and timestamps. |
| **Top/bottom messaging for email engagement** | Email engagement metrics for top or bottom campaigns, Canvases, or Canvas steps. Must specify top vs. bottom and target metric. |

---

## Key Notes

- **Data window:** All templates default to last 60 days; editable in the query editor.
- **Uniqueness:** Most metrics (especially email delivery and purchase) are unique per reporting period — a single event on day 1 does not inflate day 2's count.
- **API identifiers:**
  - Campaign API ID: bottom of campaign details page
  - Canvas API ID: under **Analyze Variants**
