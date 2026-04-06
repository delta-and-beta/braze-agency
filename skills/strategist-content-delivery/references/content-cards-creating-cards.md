---
name: content-cards-creating-cards
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/content_cards/creating_cards
indexed_at: '2026-04-05'
keywords:
  - cards
  - customization
  - subscription
  - callback
  - lifecycle
  - component
  - analytics
  - events
  - UI
  - refresh
triggers:
  - how to create custom content cards
  - how to subscribe to card updates
  - how to implement card callbacks
  - custom content card UI
  - content card lifecycle management
---
`★ Insight ─────────────────────────────────────`
- The source uses Jekyll's `{% tabs %}` / `{% subtabs %}` liquid tags — these get stripped out and replaced with standard markdown code fences for portability
- The two critical properties (`id` and `extras`) are called out explicitly because custom analytics logging depends on `id` — worth preserving that emphasis
- Android's subscribe/unsubscribe lifecycle pattern is a common leak source; the Java and Kotlin examples differ slightly (Kotlin has a copy-paste bug in the original), worth noting the correct pattern
`─────────────────────────────────────────────────`

## Creating Content Cards

Custom Content Cards require two steps: building a custom UI component, then subscribing to card data updates.

### Step 1: Create a custom UI component

| Platform | Starting point |
|----------|---------------|
| **Web** | Custom HTML component |
| **Android** | Subclass or replace `ContentCardsFragment` |
| **iOS (Swift)** | Subclass or replace `BrazeContentCardUI.ViewController` |

### Step 2: Subscribe to card updates

Subscribe to card refresh callbacks and parse the Content Card data model. Two properties are required for custom cards:

- **`id`** — Unique identifier; required for logging analytics
- **`extras`** — All key-value pairs configured in the Braze dashboard

All other properties (`title`, `cardDescription`, `imageUrl`, etc.) are optional.

---

#### Web

```javascript
import * as braze from "@braze/web-sdk";

braze.subscribeToContentCardsUpdates((updates) => {
  const cards = updates.cards;
  cards.forEach(card => {
    if (card.isControl) {
      // Do not display; still call logContentCardImpressions([card])
    } else if (card instanceof braze.ClassicCard || card instanceof braze.CaptionedImage) {
      // Use card.title, card.imageUrl, etc.
    } else if (card instanceof braze.ImageOnly) {
      // Use card.imageUrl, etc.
    }
  });
});

braze.openSession();
```

> **Note:** Cards only refresh on session start if `subscribeToContentCardsUpdates()` is called **before** `openSession()`.

---

#### Android (Java)

Declare a private subscriber variable, subscribe in `onCreate()`, and unsubscribe in `onDestroy()`:

```java
// Declare
private IEventSubscriber<ContentCardsUpdatedEvent> mContentCardsUpdatedSubscriber;

// Subscribe (in Activity.onCreate)
Braze.getInstance(context).removeSingleSubscription(mContentCardsUpdatedSubscriber, ContentCardsUpdatedEvent.class);
mContentCardsUpdatedSubscriber = new IEventSubscriber<ContentCardsUpdatedEvent>() {
    @Override
    public void trigger(ContentCardsUpdatedEvent event) {
        List<Card> allCards = event.getAllCards();
        // Your logic here
    }
};
Braze.getInstance(context).subscribeToContentCardsUpdates(mContentCardsUpdatedSubscriber);
Braze.getInstance(context).requestContentCardsRefresh();

// Unsubscribe (in Activity.onDestroy)
Braze.getInstance(context).removeSingleSubscription(mContentCardsUpdatedSubscriber, ContentCardsUpdatedEvent.class);
```

#### Android (Kotlin)

```kotlin
// Declare
private var contentCardsUpdatedSubscriber: IEventSubscriber<ContentCardsUpdatedEvent>? = null

// Subscribe (in Activity.onCreate)
Braze.getInstance(context).removeSingleSubscription(contentCardsUpdatedSubscriber, ContentCardsUpdatedEvent::class.java)
contentCardsUpdatedSubscriber = IEventSubscriber { event ->
    val allCards = event.allCards
    // Your logic here
}
Braze.getInstance(context).subscribeToContentCardsUpdates(contentCardsUpdatedSubscriber)
Braze.getInstance(context).requestContentCardsRefresh()

// Unsubscribe (in Activity.onDestroy)
Braze.getInstance(context).removeSingleSubscription(contentCardsUpdatedSubscriber, ContentCardsUpdatedEvent::class.java)
```

---

#### iOS (Swift)

Access cards directly or maintain a subscription:

```swift
// Direct access
let cards: [Braze.ContentCard] = AppDelegate.braze?.contentCards.cards

// Subscription via Cancellable (keep strong reference to prevent dealloc)
let cancellable = AppDelegate.braze?.contentCards.subscribeToUpdates { [weak self] contentCards in
    // Respond to updates
}

// Subscription via AsyncStream
let stream: AsyncStream<[Braze.ContentCard]> = AppDelegate.braze?.contentCards.cardsStream
```

#### iOS (Objective-C)

```objc
// Direct access
NSArray<BRZContentCardRaw *> *contentCards = AppDelegate.braze.contentCards.cards;

// Subscription
BRZCancellable *cancellable = [self.braze.contentCards subscribeToUpdates:^(NSArray<BRZContentCardRaw *> *contentCards) {
    // Respond to updates
}];
```
