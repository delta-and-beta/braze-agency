---
name: message-building-by-channel-content-cards-creative-details
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/message_building_by_channel/content_cards/creative_details
indexed_at: '2026-04-05'
keywords:
  - cards
  - captioned
  - dismissal
  - customization
  - image
  - liquid
  - deeplink
  - GIF
  - ratio
triggers:
  - create content cards
  - customize card appearance
  - configure card dismissal
  - design card content
  - set up card images
---
# Content Cards Creative Details

## Card Types

### Classic Card
Best for standard messaging, notifications, or icon-based categorization.

| Field | Spec |
|---|---|
| Header Text | 18px bold; 1 line ideal; Liquid supported |
| Message Text | 13px regular; 2–4 lines ideal; Liquid supported |
| Link Text | Optional; 13px; web URL or deep link |
| Image | Optional; must be **1:1 ratio**; recommended 60×60px |

### Captioned Image Card
Best for high-impact promotions or feature announcements.

| Field | Spec |
|---|---|
| Header Text | 18px bold; 1 line ideal; Liquid supported |
| Message Text | 13px regular; 2–4 lines ideal; Liquid supported |
| Link Text | Optional; 13px; web URL or deep link |
| Image | Suggested **4:3 ratio**; 600px min width; PNG, JPEG, GIF |

### Image-Only Card
Full creative control — no text fields. Upload any custom image.

| Field | Spec |
|---|---|
| Linked Card | Optional; on-click links to web page or deep link |
| Image | Any aspect ratio; 600px min width; PNG, JPEG, GIF |

## Global Details

Card styling cannot be configured natively in the Braze dashboard — customization requires developer integration. See developer docs for [Customizing Content Cards](https://www.braze.com/docs/developer_guide/content_cards/).

### Dismissal Behavior
- **Mobile**: swipe to dismiss
- **Web SDK**: `close X` button appears on hover
- Empty feed state appears when all cards are dismissed or no new updates exist

> **Tip:** Set promotional cards to auto-dismiss after a user completes a relevant action (e.g., dismiss purchase offer after checkout).

### GIF Support

| Platform | GIF Support |
|---|---|
| Android | Not enabled by default; requires additional setup |
| iOS (Swift SDK) | Not enabled by default; requires GIF support tutorial |
| Web SDK | Included by default |
