---
name: content-cards-customizing-cards-feed
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/content_cards/customizing_cards/feed
indexed_at: '2026-04-05'
keywords:
  - feed
  - refresh
  - cards
  - ordering
  - display
  - caching
  - sorting
  - limits
  - handlers
  - subscription
triggers:
  - customize card display order
  - refresh content card feed
  - request content cards refresh
  - sort cards by priority
  - implement custom card ordering
---
`★ Insight ─────────────────────────────────────`
- Topic files serve as **atomic knowledge units** nested inside skills (`skills/{id}/references/*.md`) — they're designed for fast lookup at the "Default" routing depth without needing full role context
- Stripping Jekyll template tags (`{% tabs %}`, `{% alert %}`, `{{site.baseurl}}`) is essential since those render as literal noise in a Claude context window
- Condensing multi-platform code blocks into a unified structure reduces token cost while preserving the most actionable SDK patterns
`─────────────────────────────────────────────────`

## Content Card Feed

The Content Card feed is the ordered sequence of Content Cards displayed in mobile or web apps. Key behaviors: feed refresh timing, card ordering, and empty state handling.

---

## Feed Refresh

### Automatic Refresh Triggers
- A new session starts
- The default feed is closed and reopened **more than 60 seconds** after the last refresh

**Tip:** Select **At first impression** during card creation to serve up-to-date cards without manual refresh — cards refresh when they become available.

### Manual Refresh

**Web (JavaScript)**
```javascript
import * as braze from "@braze/web-sdk";

// Request a fresh set of cards from the server
braze.requestContentCardsRefresh();

// Get all currently cached cards from last refresh (no network call)
braze.getCachedContentCards();
```

**Android (Java)**
```java
Braze.getInstance(context).requestContentCardsRefresh();
```

**Android (Kotlin)**
```kotlin
Braze.getInstance(context).requestContentCardsRefresh()
```

**Swift — Completion Handler**
```swift
AppDelegate.braze?.contentCards.requestRefresh { result in
  // handle result
}
```

**Swift — Async/Await**
```swift
let contentCards = await AppDelegate.braze?.contentCards.requestRefresh()
```

**Objective-C**
```objc
[AppDelegate.braze.contentCards requestRefreshWithCompletion:^(NSArray<BRZContentCardRaw *> *contentCards, NSError *error) {
  // handle result
}];
```

### Rate Limits (Token Bucket)
| Parameter | Value |
|-----------|-------|
| Max refresh calls per device | 5 (shared across users and `openSession()` calls) |
| Replenishment rate | 1 call every 180 seconds (3 min) |
| Bucket capacity | 5 calls |
| Behavior when rate-limited | `subscribeToContentCards()` still returns cached cards |

> Rate limits apply even during automated tests and manual QA.

---

## Customizing Card Display Order

### Web
Use the `filterFunction` parameter of `showContentCards()`:
```javascript
braze.showContentCards(null, (cards) => {
  return sortBrazeCards(cards); // your sorting function returning a sorted array
});
```

### Android — Custom Update Handler
`ContentCardsFragment` delegates sorting to an `IContentCardsUpdateHandler`. Set a custom handler via `setContentCardUpdateHandler()`.

**Default sort logic (Java):** pinned cards first, then by `updated` timestamp descending.
```java
public class DefaultContentCardsUpdateHandler implements IContentCardsUpdateHandler {
  @Override
  public List<Card> handleCardUpdate(ContentCardsUpdatedEvent event) {
    List<Card> sortedCards = event.getAllCards();
    Collections.sort(sortedCards, (cardA, cardB) -> {
      if (cardA.getIsPinned() && !cardB.getIsPinned()) return -1;
      if (!cardA.getIsPinned() && cardB.getIsPinned()) return 1;
      if (cardA.getUpdated() > cardB.getUpdated()) return -1;
      if (cardA.getUpdated() < cardB.getUpdated()) return 1;
      return 0;
    });
    return sortedCards;
  }
}
```

**Default sort logic (Kotlin):** same pin-first, then descending `updated` timestamp.
```kotlin
class DefaultContentCardsUpdateHandler : IContentCardsUpdateHandler {
  override fun handleCardUpdate(event: ContentCardsUpdatedEvent): List<Card> {
    val sortedCards = event.allCards
    sortedCards.sortWith(Comparator { cardA, cardB ->
      if (cardA.isPinned && !cardB.isPinned) return@Comparator -1
      if (!cardA.isPinned && cardB.isPinned) return@Comparator 1
      cardB.updated.compareTo(cardA.updated) // descending
    })
    return sortedCards
  }
}
```

---

## Key API References
| Platform | Method | Purpose |
|----------|--------|---------|
| Web | `braze.requestContentCardsRefresh()` | Trigger server refresh |
| Web | `braze.getCachedContentCards()` | Read cached cards |
| Web | `braze.showContentCards(null, filterFn)` | Display with custom sort |
| Android | `Braze.getInstance(ctx).requestContentCardsRefresh()` | Trigger refresh |
| Android | `ContentCardsFragment.setContentCardUpdateHandler()` | Custom sort handler |
| Swift | `braze.contentCards.requestRefresh(_:)` | Trigger refresh (sync or async) |

`★ Insight ─────────────────────────────────────`
- The default Android sort (pin → recency) mirrors how most feed UIs work — it's a useful reference pattern for building custom comparators in any language
- The rate-limit bucket size matching the max calls (both 5) means you can burst-refresh on app open without penalty, but sustained polling will quickly exhaust the budget
`─────────────────────────────────────────────────`
