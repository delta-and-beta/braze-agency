---
name: data-infrastructure-data_points
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/data/infrastructure/data_points
indexed_at: '2026-04-05'
keywords:
  - billing
  - datapoints
  - attributes
  - events
  - profile
  - engagement
  - purchases
  - custom-events
  - segmentation
  - tracking
triggers:
  - how do data points work
  - what counts as a data point
  - how to reduce data point usage
  - view my data point consumption
  - data point pricing
---
`★ Insight ─────────────────────────────────────`
Topic files in Nick's two-layer hierarchy are "atomic knowledge units" — they live under `skills/{id}/references/*.md` and are intentionally narrow in scope. A good topic file is dense with facts but free of navigation chrome, so the embedding model and router can retrieve it precisely without noise diluting relevance scores.
`─────────────────────────────────────────────────`

## Data Points

Data points are Braze's **billable unit of use** — they measure how much user profile data your integration writes. Every data point consumed updates segment membership, can trigger/cancel messaging, and is available for personalization immediately.

### Definition

A data point is counted each time one of the following is **set or recorded** on a user profile:
- Session start
- Session end
- Custom event
- Purchase
- Any attribute set on a profile

**Free (non-billable) by default:**
- Push tokens, device information
- All campaign engagement events (email opens, push clicks, impressions, dismissals)
- Subscription state changes (global and subscription groups)
- Deleting users
- Connected Content usage
- Renaming external IDs via API
- Blocking events/attributes/properties

### Viewing Usage

**Settings > Billing > Total Data Points Usage tab**

### Free (Non-Billable) Profile Fields

| Category | Fields |
|----------|--------|
| Profile data | Country (auto-collected), Language (auto-collected), User ID, User alias |
| Recent devices | Number of devices, most recent watch, app version, device, device OS |
| Contact settings | Email subscribed, push subscribed, apps registered for push, subscription group |
| Attribution | Install source, campaign, ad group, ad |
| Engagement | All campaign/Canvas engagement events |
| Social | Twitter followers/following/tweets, Facebook likes |
| Miscellaneous | Random bucket number |

### Billable Profile Fields

| Category | Fields | Notes |
|----------|--------|-------|
| Profile data | First name, last name, email address, gender, age group, city, time zone, DOB, bio, phone number | |
| Profile data | Country, language | Only when **manually** set; auto-collection is free |
| Profile data | Most recent device locale | |
| App usage | Session start, session end | |
| Custom attributes | All | |
| Custom events | All | |
| Custom event properties | All enabled for segmentation | Count as **additional** data points on top of the event itself when used with `X Custom Event Property in Y Days` filters |
| Purchases | All purchases + all purchase properties | |
| Cohort assignments | Amplitude, Mixpanel, Hightouch, Appsflyer | All assignments billable |
| Location | Most recent location | Geofence enter/exit does **not** log data points |

### Special Circumstances

#### Arrays
- Updating an array costs **1 data point per API call**, even if unchanged
- A `remove` operation on a non-existent value still consumes a data point
- Setting a custom attribute to `null` (to remove it) costs a data point
- **Best practice:** Set the whole array at once — counts as a single data point vs. incremental adds (1 per value)
- Arrays of objects: 1 data point per **key** updated

#### Nested Custom Attributes
- Every key in the object counts as a data point
- Setting the object to `null` also consumes a data point

#### CSV Imports
- Custom attributes uploaded via CSV **do** count toward data points
- **Exception:** CSV imports for segmentation only (rows with only `external_id`, `braze_id`, or `user_alias_name`) do **not** log data points
- Updating `email_subscribe`, `push_subscribe`, `subscription_group_id`, or `subscription_state` in CSV does **not** incur charges

### Key Best Practices

1. **Only send changing data** — avoid re-sending attributes that haven't changed
2. **Prefer full array sets** over incremental updates when possible
3. **Use auto-collection** for country and language rather than manual setting
4. **Minimize nested attribute key updates** — pass only changed keys, not full objects
5. Custom event properties used in segmentation filters double-count — factor this into schema design

`★ Insight ─────────────────────────────────────`
The tables here are organized by **decision-making flow** (free vs. billable, then by category) rather than Braze's original tab-based layout. This structure is better for embedding retrieval because a query like "does updating an array cost data points?" will match the Arrays section without needing to traverse navigation state. Flattening conditional UI (tabs, alerts) into prose and tables is a reliable technique for improving RAG recall quality.
`─────────────────────────────────────────────────`
