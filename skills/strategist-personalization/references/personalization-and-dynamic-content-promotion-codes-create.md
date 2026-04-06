---
name: personalization-and-dynamic-content-promotion-codes-create
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/personalization_and_dynamic_content/promotion_codes/create
indexed_at: '2026-04-05'
keywords:
  - promotion
  - codes
  - CSV
  - expiration
  - snippet
  - Liquid
  - upload
  - alerts
  - list
  - integration
triggers:
  - create a promotion code list
  - upload promotion codes
  - set promotion code expiration
  - configure threshold alerts
  - update promotion codes
---
`★ Insight ─────────────────────────────────────`
Topic files in this pipeline are "atomic knowledge units" — they should be scannable reference cards, not tutorials. The key transformation is removing Jekyll template syntax (`{%`, `{{site.baseurl}}`), image references, and nav boilerplate while preserving every constraint and limit that a developer would actually need.
`─────────────────────────────────────────────────`

## Creating a Promotion Code List

Navigate to **Data Settings > Promotion Codes**, then select **Create Promotion Code List**.

### Step 1: Name and Code Snippet

- Give the list a name and optional description.
- Create a **code snippet** — the Liquid variable used to reference this list in messages.
- **Snippet rules:**
  - Cannot be edited after saving.
  - Case-sensitive (`Birthday_promo` ≠ `birthday_promo`).
  - Must be unique across all lists.
  - Referenced in Liquid by snippet name.

### Step 2: Expiration

- Every list has an expiration date/time set at creation.
- **Maximum expiration: 6 months** from creation or last edit date.
- Expiration can be updated repeatedly within that window.
- On expiration: all codes are deleted from Braze; messages using the list's snippet are **not sent**.

### Step 3: Threshold Alerts (Optional)

Configure email alerts for:
- List running low on available codes.
- List approaching expiration.

Alerts fire **once per day** to the designated recipient.

### Step 4: Upload Codes (CSV)

Braze does not generate or redeem codes — you must supply them.

**CSV requirements:**
- One column for promotion codes.
- One code per row.

**Limits:**
- Max file size: **100 MB**
- Max list size: **20 million unused codes**
- Wrong file uploaded? Upload a replacement — it overwrites the previous file.

**Integration options:** Voucherify or Talon.One can generate and export codes directly.

After upload, select **Save List**. Check import status via the **Sync** button in Import History. Large files take several minutes; you can navigate away while the import runs.

---

## Updating an Existing List

Open any existing list to:
- Change name, description, expiration date, or threshold alerts.
- Add more codes by uploading additional CSV files and selecting **Update List**.

All codes in a list share the same expiration date regardless of when they were imported.

> **Promotion codes cannot be deleted.**

---

## Fixing an Incorrectly Uploaded List

If the wrong codes were uploaded and saved, two resolution paths:

| Approach | Steps |
|---|---|
| **Deprecate the list** | Stop using the list in all campaigns/Canvases/templates. Upload correct codes to a new list. |
| **Exhaust incorrect codes** | Run a campaign sending incorrect codes to a placeholder segment until depleted. Then upload correct codes to the same list. |

`★ Insight ─────────────────────────────────────`
Notice how the two-column table for "fixing incorrect lists" compresses what was prose into a scannable decision matrix — this pattern works well for mutually exclusive approaches. The original also buried the critical "codes cannot be deleted" constraint in an alert block; surfacing it as a blockquote after the update section makes it harder to miss in reference lookups.
`─────────────────────────────────────────────────`
