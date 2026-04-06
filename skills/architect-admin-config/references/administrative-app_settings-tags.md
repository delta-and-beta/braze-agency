---
name: administrative-app_settings-tags
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/administrative/app_settings/tags
indexed_at: '2026-04-05'
keywords:
  - tags
  - filtering
  - campaigns
  - segments
  - nesting
  - engagement
  - taxonomy
  - throttling
  - reporting
triggers:
  - how to add tags to campaigns
  - how to filter by tags
  - how to organize tags hierarchically
  - bulk tag multiple items
  - manage and rename tags
---
## Tags

Braze tags organize and filter campaigns, Canvases, and segments. Tags also track status labels like **Archived** and **Draft**.

### Adding Tags

- **Single item**: Click the tag icon under the engagement name during creation or editing. Select existing or type to create new.
- **Bulk tagging**: Select multiple campaigns/Canvases/segments → click **Tag As**.
- **Limit**: Up to 175 tags per campaign, Canvas, or segment.

> **Bulk tagging behavior**: Applying a new tag to multiple items that already have different tags causes all tags from all selected items to merge onto every selected item — not just the new tag.

### Viewing & Filtering

- Tags appear on the engagement details page and campaign analytics.
- Filter by tag in list views (campaigns, Canvases, segments) by selecting a tag name.

### Managing Tags

Navigate to **Settings > Tag Management** to rename, remove, or add tags globally across the dashboard.

**Nested tags**: Organize tags hierarchically under parent tags (e.g., all holiday tags under `Holidays`).
- Create a new tag → select **Nest Tag Under** → choose parent tag.
- Nest existing tags via **Tag Management**: hover a row → click **Edit**.

### Custom Data Tags

Tags can be added to custom attributes and custom events via their respective management pages. *(Feature in early access — contact your CSM.)*

### Best Practices

Link tags to business objectives and funnel stages. Example taxonomy for an eCommerce app:

| Category | Examples |
|---|---|
| Funnel | `On-boarding`, `Re-engagement`, `Loyal`, `PowerUser`, `Churn` |
| Business Objectives | `HighSpender`, `ActiveUser`, `NewUsers`, `FirstAction` |
| Regional | `UnitedStates`, `LATAM`, `WesternEurope`, `MiddleEast` |
| Campaigns | `Sales`, `Coupons`, `Events` |
| Holidays | `Christmas`, `Thanksgiving`, `Halloween`, `NewYears` |
| Transactions | `Transactional`, `Notification`, `ConnectedActionTaken` |

### Use Cases

**Throttling**: Limit promotional campaign frequency using segment filters:
- `Last received campaign` with tag `Promo` more than 5 days ago
- `OR` `Has not received campaign` with tag `Promo`

**Reporting**: Tag campaigns (e.g., `Push Reporting`) then configure an Engagement Report to automatically aggregate and send daily reports for all matching tagged campaigns.
