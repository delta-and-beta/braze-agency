---
name: banners-migrating-from-content-cards
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/banners/migrating_from_content_cards
indexed_at: '2026-04-05'
keywords:
  - migration
  - banners
  - personalization
  - placement
  - expiration
  - rendering
  - eligibility
  - prioritization
  - feed
  - SDK
triggers:
  - migrate from content cards to banners
  - when to use banners instead
  - banner personalization and expiration
  - subscribe to banner updates
  - banner placement integration
---
# Migrating from Content Cards to Banners

## When to Migrate

**Migrate to Banners when using Content Cards for:**
- Homepage heroes, product page promotions, checkout offers
- Persistent navigation announcements or sidebar messages
- Always-on messages running longer than 30 days
- Real-time personalization and eligibility evaluation

**Keep Content Cards when you need:**
- Feed/Inbox experiences (scrollable multi-message UI)
- Connected Content or Promotional Codes (Banners don't support these)
- API-triggered or action-based delivery

## Key Advantages of Banners

| Feature | Content Cards | Banners |
|---------|--------------|---------|
| Expiration | 30-day limit | No expiration |
| Personalization | Static at send | Liquid refreshes on every load |
| Placement | Feed-based | Native, context-specific |
| Prioritization | Custom logic needed | Native prioritization |
| Rendering | Custom UI possible | SDK methods only (no manual render) |
| Connected Content | Supported | Not supported |
| API-triggered | Supported | Not supported |

## Prerequisites

Ensure minimum SDK version support for Banners (check Braze SDK version matrix for your platform).

## SDK Migration

### Subscribe to Updates

**Content Cards:**
```javascript
// Web
braze.subscribeToContentCardsUpdates((cards) => {
  cards.forEach(card => console.log("Card:", card.id));
});
```
```kotlin
// Android
Braze.getInstance(context).subscribeToContentCardsUpdates { cards ->
  cards.forEach { card -> Log.d(TAG, "Card: ${card.id}") }
}
```
```swift
// Swift
braze.contentCards.subscribeToUpdates { cards in
  for card in cards { print("Card: \(card.id)") }
}
```
```javascript
// React Native
Braze.addListener(Braze.Events.CONTENT_CARDS_UPDATED, (update) => {
  update.cards.forEach(card => console.log("Card:", card.id));
});
```
```dart
// Flutter
braze.subscribeToContentCards((List<BrazeContentCard> contentCards) {
  for (final card in contentCards) { print("Card: ${card.id}"); }
});
```

**Banners** (placement-based, not feed-based):
```javascript
// Web
braze.subscribeToBannersUpdates((banners) => {
  const banner = braze.getBanner("sample_placement_id");
  if (banner) console.log("Banner for placement:", banner.placementId);
});
```
```kotlin
// Android
Braze.getInstance(context).subscribeToBannersUpdates { _ ->
  val banner = Braze.getInstance(context).getBanner("sample_placement_id")
  if (banner != null) Log.d(TAG, "Banner for placement: ${banner.placementId}")
}
```
```swift
// Swift
braze.banners.subscribeToUpdates { _ in
  braze.banners.getBanner(for: "sample_placement_id") { banner in
    guard let banner = banner else { return }
    print("Banner for placement: \(banner.placementId)")
  }
}
```
```javascript
// React Native
Braze.addListener(Braze.Events.BANNER_CARDS_UPDATED, (_) => {
  Braze.getBanner("sample_placement_id").then(banner => {
    if (banner) console.log("Banner for placement:", banner.placementId);
  });
});
```
```dart
// Flutter
braze.subscribeToBanners((List<BrazeBanner> banners) {
  braze.getBanner("sample_placement_id").then((banner) {
    if (banner != null) print("Banner for placement: ${banner.placementId}");
  });
});
```

### Display Content

> **Important:** Content Cards support manual rendering with custom UI. Banners only support out-of-the-box SDK rendering methods.

**Content Cards display (examples):**
```javascript
// Web - default feed or manual render
braze.showContentCards(document.getElementById("feed"));
const cards = braze.getCachedContentCards(); // manual render
```
```kotlin
// Android - default fragment
val fragment = ContentCardsFragment()
supportFragmentManager.beginTransaction().replace(R.id.container, fragment).commit()
val cards = Braze.getInstance(context).getCachedContentCards() // manual render
```
```swift
// Swift - default view controller
let vc = BrazeContentCardUI.ViewController(braze: braze)
navigationController?.pushViewController(vc, animated: true)
let cards = braze.contentCards.cards // manual render
```
```javascript
// React Native
Braze.launchContentCards(); // or: await Braze.getContentCards()
```
```dart
// Flutter
braze.launchContentCards(); // or: await braze.getContentCards()
```

**Banners display:** Use placement-based SDK rendering (implementation varies by platform — use placement ID to fetch and render at designated UI locations).

---

`★ Insight ─────────────────────────────────────`
- The core architectural shift is from **pull/feed** (Content Cards collect into a list the user browses) to **push/placement** (Banners are fetched by placement ID and rendered at specific UI slots) — this affects subscription API shape: cards return arrays, banners return by placement key.
- The Liquid re-evaluation on every refresh is a meaningful behavioral difference: Content Cards evaluate eligibility at send time, Banners re-evaluate at display time — migrate when "stale" targeting is a known pain point.
`─────────────────────────────────────────────────`
