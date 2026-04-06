---
name: dashboard-ecommerce-revenue-dashboard
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/analytics/dashboard/ecommerce_revenue_dashboard
indexed_at: '2026-04-05'
keywords:
  - revenue
  - ecommerce
  - attribution
  - dashboard
  - campaigns
  - canvases
  - orders
  - conversion
  - metrics
triggers:
  - track ecommerce revenue
  - set up revenue dashboard
  - measure campaign revenue
  - configure attribution
  - analyze order data
---
## eCommerce Revenue Dashboard (Last-Touch Attribution)

Tracks last-touch attributed revenue for campaigns and Canvases using eCommerce recommended events.

**Location:** Analytics > Dashboard Builder > "eCommerce Revenue - Last Touch Attribution"

> **Note:** Requires eCommerce recommended events (early access). Shopify connector users get these automatically; others must implement manually before data appears.

---

## Available Metrics

| Metric | Definition |
|--------|------------|
| eCommerce Revenue | Total last-touch attributed revenue for selected date range + conversion window |
| Daily Orders Placed | Average distinct orders placed per day |
| Average Daily eCommerce Revenue | Average attributed revenue per day |
| eCommerce Revenue Over Time | Time series of attributed revenue |
| eCommerce Revenue by Campaign | Attributed revenue broken down by campaign |
| eCommerce Revenue by Canvas | Attributed revenue broken down by Canvas |

---

## Attribution Model

**Last-touch:** Revenue is attributed to the most recent Braze campaign or Canvas the user engaged with before placing an order, within the selected conversion window.

**Qualifying touch events:**
- Email click
- Push open
- Content Card click
- In-app message click
- SMS short link click
- WhatsApp short link click

Orders without an eligible interaction within the conversion window are **not attributed**.

---

## Data Sources (eCommerce Recommended Events)

```
ecommerce.product_viewed
ecommerce.cart_updated
ecommerce.checkout_started
ecommerce.order_placed
ecommerce.order_refunded
ecommerce.order_cancelled
```

**Metric calculations:**

| Metric | Calculation |
|--------|-------------|
| Total Revenue | Sum of order placed values − Sum of refunded values |
| Total Orders | Distinct orders placed − Distinct orders cancelled |

---

## Exclusions & Limitations

- **Legacy purchase events are excluded** — data from the legacy purchase event does not appear
- LTV and revenue reporting within individual campaigns/Canvases are not supported
- Non-USD currencies are converted to USD using the exchange rate on the event date
  - To prevent conversion: hardcode `currency: "USD"` when sending events
