---
name: message-building-by-channel-line-reporting
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/message_building_by_channel/line/reporting
indexed_at: '2026-04-05'
keywords:
  - LINE
  - reporting
  - metrics
  - campaign
  - conversion
  - performance
  - analytics
  - sends
  - opens
  - clicks
triggers:
  - how to view LINE campaign metrics
  - LINE message performance analysis
  - track LINE conversion events
  - analyze LINE audience performance
  - LINE open and click statistics
---
## LINE Reporting

After launching a LINE campaign or Canvas, key metrics are available on the campaign details page or Canvas analytics.

> **Note:** Open and click statistics for LINE are only calculated when **more than 20 users** perform the event on a given day.

---

### Campaign Details Panel

High-level overview of LINE message performance:
- Number of messages sent vs. recipients
- Primary conversion rate
- Total revenue generated
- Delivery, audience, and conversion settings

**Control groups:** A/B test control group metrics are excluded from the top-level Campaign Details panel.

---

### LINE Performance Panel

Shows message performance across dimensions. Metrics vary by messaging channel and whether a multivariate test is running.

- Use **+ Add/Remove Columns** to customize visible metrics
- Click the **Preview** icon to view messages per variant or channel

#### Key LINE Metrics

| Metric | Definition |
|--------|-----------|
| **Sends** | Total sends successfully communicated between Braze and LINE (does not confirm delivery to user) |
| **Unique Opens** | Distinct users who opened a LINE message (20-message/day minimum threshold applies) |
| **Total Opens** | All opens of LINE messages (20-message/day minimum threshold applies) |
| **Unique Clicks** | Distinct users who clicked a LINE message (20-message/day minimum threshold applies) |
| **Total Clicks** | All clicks on LINE messages (20-message/day minimum threshold applies) |

Full metric definitions: Braze Report Metrics Glossary.

---

### Historical Performance Panel

View Message Performance metrics as a time-series graph.

- Filters available to modify stats and channels shown
- Time range mirrors the page-level time range selector
- **CSV export:** Hamburger menu → **Download CSV** for day-by-day breakdown

---

### Conversion Event Details

Shows performance of conversion events for the campaign. See Braze docs on Conversion Events for full reference.

### Conversion Correlation

Surfaces which user attributes and behaviors help or hurt campaign conversion outcomes. See Braze docs on Conversion Correlation for full reference.
