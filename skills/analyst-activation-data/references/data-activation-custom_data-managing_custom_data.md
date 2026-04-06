---
name: data-activation-custom_data-managing_custom_data
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/data/activation/custom_data/managing_custom_data
indexed_at: '2026-04-05'
keywords:
  - blocklisting
  - attributes
  - events
  - properties
  - segmentation
  - SDK
  - tracking
  - dashboard
  - data-points
  - permissions
triggers:
  - how to blocklist custom data
  - pre-populate custom events
  - manage custom properties
  - add custom attributes
  - delete custom data
---
## Managing Custom Data

### Pre-populating Custom Data

Pre-populate custom events/attributes before your dev team integrates them, so they're available in dropdowns and campaign builders immediately.

**Steps:**
1. Go to **Data Settings** > **Custom Events**, **Custom Attributes**, or **Products**
2. Select **Add Custom Attributes** / **Add Custom Events** / **Add Products**
   - For custom attributes: select a [data type](custom-attributes-data-types) (boolean, string, etc.) — this determines available segmentation filters
3. Select **Save**

**Naming convention:** Custom events and attributes are **case-sensitive**. Dev team must use the exact names you define here, or Braze creates a duplicate entry.

---

### Managing Properties

On **Custom Events** or **Products** pages, select **Manage Properties** to:
- Add new properties
- Blocklist existing properties
- View which campaigns/Canvases use a property as a trigger event

To make custom data trackable: dev team must create it in the SDK using the exact name defined in the dashboard, or import via the Braze API.

---

### Blocklisting Custom Data

Use blocklisting to stop Braze from recording a custom attribute, event, or purchase event — useful when data logs too many points, is no longer useful, or was recorded in error.

**What blocklisting does:**
- Stops SDK from sending the data
- Dashboard ignores blocklisted data from all sources (API, etc.)
- Data no longer counts as data points going forward
- Blocklisted items disappear from filters and graphs
- Any segment, campaign, or Canvas using the item **will be archived**
- References in active Canvas drafts load as invalid values

**What blocklisting does NOT do:**
- Does not remove existing data from user profiles
- Does not retroactively reduce data points already incurred

**Steps to blocklist:**
1. Search in **Custom Attributes**, **Custom Events**, or **Products** pages
2. Select the item(s) — up to **100 at a time** for attributes/events
3. Select **Blocklist**

**Limits:**
- Max **300 custom attributes** and **300 custom events** can be blocklisted
- Items with **Trashed** status count toward the limit until deleted
- Only 300 items are sent to SDK for blocklisting; if you exceed 300, SDK won't enforce the rest

**Propagation:** Blocklist changes may take a few minutes to propagate. Blocklisted items can be re-enabled at any time.

**Performance consideration:** Blocklisting hundreds of thousands of items is a data-intensive operation — every event/attribute must be checked against the full blocklist on each SDK call. Keep the blocklist lean; remove unused items from app code instead.

**Required permissions** (workspace-level): View/Edit/Archive Campaigns, Canvases, Segments, Templates, Feature Flags, and several others. Check workspace user permissions settings for the full list.

---

### Deleting Custom Data

When a custom event or attribute is no longer needed (e.g., used for a one-time campaign), it can be deleted from the dashboard to keep your data schema clean.
