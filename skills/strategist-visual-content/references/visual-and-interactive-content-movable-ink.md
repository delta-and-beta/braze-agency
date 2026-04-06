---
name: visual-and-interactive-content-movable-ink
source_url: >-
  https://braze-inc.github.io/braze-docs/_partners/message_personalization/dynamic_content/visual_and_interactive_content/movable_ink
indexed_at: '2026-04-05'
keywords:
  - personalization
  - dynamic
  - content
  - campaign
  - targeting
  - optimization
  - integration
  - email
  - push
  - data
triggers:
  - create personalized visual content
  - integrate with Movable Ink
  - set up data sources
  - use Creative Optimizer
  - target by time and date
---
`★ Insight ─────────────────────────────────────`
Topic files in Nick's architecture are "atomic knowledge units" — they live inside `skills/{id}/references/` and are loaded at query time based on routing depth. Keeping them self-contained and dense is critical because at Default depth, only these references are loaded (not the full Skill file), so every sentence must carry weight.
`─────────────────────────────────────────────────`

## Movable Ink Visual Content

Movable Ink is a cloud-based platform for creating dynamic, personalized visual content (images, blocks) that renders at open-time using real-time data. The Braze integration enables data-driven images in email, push, in-app messages, and Content Cards.

### Supported Capabilities

| Capability | Feature | Rich Push | IAM / Content Cards / Email |
|---|---|---|---|
| Creative Optimizer | A/B Display | ✗ | ✔ |
| Creative Optimizer | Optimize | ✗ | ✔ (requires Branch deep linking) |
| Targeting Rules | Date / Day / Time of Day | ✔* | ✔ |
| Countdown Timer | | ✔* | ✔ |
| Polling | | ✗ | ✔ (redirects to mobile landing page after vote) |
| Scratch Off | | ✔* | ✔* (redirects on click) |
| Video / GIF | | ✔* (GIF only) | ✔* (GIF only; Android requires GIF support) |
| Stories / Behavior Activity | | ✔* | ✔* |

*\* Push notifications are cached on receipt and do not refresh — time/date targeting not recommended for push.*

### Prerequisites

- Active Movable Ink account
- Data source connected in Movable Ink (CSV, website import, or API)
- Shared unifying identifier between Braze and Movable Ink (e.g., `external_id`)

---

### Integration Steps

#### 1. Create a Data Source in Movable Ink

Choose one of three source types:

- **CSV Upload**: Each row needs at least one segment column and one content column. Upload and map which columns drive targeting vs. content.
- **Website Import**: Map fields to segments and to dynamic data properties (e.g., first name, city).
- **API Integration**: Feed content directly from an API response payload.

#### 2. Build a Campaign in Movable Ink

From the Movable Ink home screen, create a campaign. Recommended type: **Block** (works across push, in-app, and Content Cards). Use the drag-and-drop editor to add text, images, and data-driven elements. Set fallback content for users who don't match personalization criteria.

Preview dynamic images and test query parameters before exporting.

#### 3. Obtain the Content URL

After completing the campaign:
1. Go to **Finish** page in Movable Ink dashboard
2. Copy the `img src` value from the creative tag — this is your dynamic source URL

#### 4. Insert into Braze and Replace Merge Tags

Paste the URL into the appropriate Braze field per channel:

| Channel | Where to paste |
|---|---|
| Email | Email body (as image src in HTML) |
| Android Push | **Push Icon Image** and **Expanded Notification Image** fields |
| In-App Message / Content Card | Image URL field |

Replace Movable Ink merge tags with Liquid variables:

```liquid
# Before (Movable Ink merge tag)
&mi_u=%%email%%

# After (Braze Liquid)
&mi_u={{${email_address}}}
```

---

### Common Use Cases

- Personalized year-in-review or monthly recap images
- Countdown timers for sales events (Black Friday, Valentine's Day)
- Dynamic event schedules pulled from API data via rich push
- Scratch-off promotion code reveals
- Behavior-driven image personalization based on last known user action
