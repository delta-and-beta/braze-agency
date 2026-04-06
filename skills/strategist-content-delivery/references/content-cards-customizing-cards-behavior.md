---
name: content-cards-customizing-cards-behavior
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/content_cards/customizing_cards/behavior
indexed_at: '2026-04-05'
keywords:
  - extras
  - key-value
  - class-type
  - badge
  - coupon
  - deeplink
  - interactive
  - supplemental
  - unread
  - API-triggered
triggers:
  - send extra data with content cards
  - customize content card behavior
  - display unread badge count
  - use content cards for promotions
  - blend cards into existing feed
---
The `learn` skill is for capturing insights into the knowledge base — not applicable here. Processing the documentation directly.

`★ Insight ─────────────────────────────────────`
- Topic files in Nick's architecture are "atomic knowledge units" stored under `skills/{name}/references/*.md` — they're designed for fast retrieval, so stripping navigation boilerplate maximizes signal density
- Collapsing platform-specific tabs into a unified structure (with clear labels) reduces cognitive overhead while preserving all actionable info
`─────────────────────────────────────────────────`

---

## Content Card Behavior

### Key-Value Pairs

Send extra data payloads with Content Cards using key-value pairs. Configure via the Braze dashboard or API-triggered campaigns.

> **Note:** Do not send nested JSON as key-value pairs — flatten JSON before sending.

Access extras via `card.extras` on all platforms:

| Platform | Access |
|----------|--------|
| Web | `card.extras` on [`card`](https://js.appboycdn.com/web-sdk/latest/doc/classes/braze.card.html) objects |
| Android | [`card.extras`](https://braze-inc.github.io/braze-android-sdk/kdoc/braze-android-sdk/com.braze.models.cards/-card/extras.html) |
| Swift | [`card.extras`](https://braze-inc.github.io/braze-swift-sdk/documentation/brazekit/braze/contentcard/data-swift.struct/extras) |

**Coordination requirement:** Marketing and developer teams must agree on exact key-value pair names (e.g., `feed_type = brand_homepage`) — dashboard inputs must exactly match app logic.

---

### Use Case: Supplemental Content

Blend Content Cards into an existing feed so Braze cards appear alongside local content. Cards become indistinguishable from native feed items.

**API-triggered approach:** Use [API-triggered campaigns](https://www.braze.com/docs/user_guide/engagement_tools/campaigns/building_campaigns/delivery_types/api_triggered_delivery/) when card values depend on external factors. Set key-value pairs using Liquid (e.g., `tile_id`, `tile_deeplink`, `tile_title`). Note: `class_type` must be known at setup time.

---

### Use Case: Interactive Content (Promotions/Coupons)

Display Content Cards as pop-ups or overlays for last-minute promotions at key moments (e.g., checkout).

Example key-value pairs for a coupon use case:
- `discount_percentage` — the discount amount
- `class_type` — set to `coupon_code`

Use `class_type` to filter and display type-specific cards on targeted screens. See multiple-feed management for routing by `class_type`.

---

### Unread Badge Count

Display the number of unread Content Cards as a badge on the app icon.

**Web:**
```javascript
braze.getCachedContentCards().getUnviewedCardCount();
```

**Android (Java):**
```java
Braze.getInstance(context).getContentCardUnviewedCount();
```

**Android (Kotlin):**
```kotlin
Braze.getInstance(context).contentCardUnviewedCount
```

**Swift:**
```swift
// In applicationDidEnterBackground(_:)
let unreadCards = AppDelegate.braze?.contentCards.cards.filter { $0.viewed == false }
UIApplication.shared.applicationIconBadgeNumber = unreadCards?.count ?? 0
```

**Objective-C:**
```objc
// In applicationDidEnterBackground:
NSInteger unreadCardCount = 0;
for (BRZContentCardRaw *card in AppDelegate.braze.contentCards.cards) {
  if (card.viewed == NO) {
    unreadCardCount += 1;
  }
}
UIApplication.shared.applicationIconBadgeNumber = unreadCardCount;
```

`★ Insight ─────────────────────────────────────`
- The badge pattern (Swift filters on `viewed == false` inside `applicationDidEnterBackground`) is session-scoped — it reflects cards the user hasn't seen *this session*, not all-time unread
- The `class_type` key-value pair is a common Braze convention for routing cards to different UI components; it's a consumer-defined contract, not a Braze-native field
`─────────────────────────────────────────────────`
