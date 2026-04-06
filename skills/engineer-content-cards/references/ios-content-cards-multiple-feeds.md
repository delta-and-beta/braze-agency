---
name: ios-content-cards-multiple-feeds
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/platforms/legacy_sdks/ios/content_cards/multiple_feeds
indexed_at: '2026-04-05'
keywords:
  - feeds
  - filtering
  - observer
  - notification
  - contentcards
  - transactional
  - marketing
  - dashboard
  - extras
  - keyvalue
triggers:
  - how to set up multiple feeds
  - filter content cards by type
  - observe content card updates
  - handle content card notifications
  - configure content card feeds
---
# Multiple Content Card Feeds

Content Cards can be filtered to display only specific cards, enabling multiple feeds for different use cases (e.g., transactional vs. marketing).

## Overview

Use key-value pairs set during campaign creation to categorize cards, then filter at runtime using a notification observer.

## Step 1: Set Key-Value Pairs on Cards

In the Braze dashboard when creating a Content Card campaign, add:

- **Key:** `feed_type`
- **Value:** custom feed name (e.g., `Transactional`, `Marketing`)

## Step 2: Add a Content Card Observer

**Swift:**
```swift
NotificationCenter.default.addObserver(self, selector:
  #selector(contentCardsUpdated),
  name: NSNotification.Name.ABKContentCardsProcessed, object: nil)
```

## Step 3: Handle Updates and Filter Cards

**Swift:**
```swift
@objc private func contentCardsUpdatedNotificationReceived(notification: NSNotification) {
    guard let updateSuccessful = notification.userInfo?[ABKContentCardsProcessedIsSuccessfulKey] as? Bool else { return }
    if updateSuccessful {
        let filteredArray = getCards(forFeedType: "Transactional")
        // Pass filteredArray to your UI layer for display.
    }
}

func getCards(forFeedType type: String) -> [ABKContentCard]? {
    guard let allCards = Appboy.sharedInstance()?.contentCardsController.contentCards as? [ABKContentCard] else { return nil }
    return allCards.filter {
        $0.extras?["feed_type"] as? String == type
    }
}
```

**Objective-C:**
```objc
- (void)contentCardsUpdatedNotificationReceived:(NSNotification *)notification {
  BOOL updateIsSuccessful = [notification.userInfo[ABKContentCardsProcessedIsSuccessfulKey] boolValue];
  if (updateIsSuccessful) {
    NSArray<ABKContentCard *> *filteredArray = [self getCardsForFeedType:@"Transactional"];
    // Pass filteredArray to your UI layer for display.
  }
}

- (NSArray<ABKContentCard *> *)getCardsForFeedType:(NSString *)type {
  NSArray<ABKContentCard *> *cards = [Appboy.sharedInstance.contentCardsController getContentCards];
  return [cards filteredArrayUsingPredicate:[NSPredicate predicateWithBlock:^BOOL(ABKContentCard *card, NSDictionary *bindings) {
    NSDictionary *extras = [card extras];
    return extras != nil
      && [extras objectForKey:@"feed_type"] != nil
      && [[extras objectForKey:@"feed_type"] isEqualToString:type];
  }]];
}
```

## Key Points

- The `extras` dictionary on each `ABKContentCard` holds the key-value pairs set in the dashboard
- `ABKContentCardsProcessedIsSuccessfulKey` indicates whether the update fetch succeeded
- Call `getCards(forFeedType:)` with different type strings to populate separate UI feeds
- `contentCardsController.contentCards` returns all cards; filtering is done client-side

`★ Insight ─────────────────────────────────────`
- The observer pattern used here (`NSNotificationCenter`/`NotificationCenter`) is Braze's push model — the SDK broadcasts updates rather than your code polling. This means the filter runs reactively, only when fresh data arrives.
- The `extras` dictionary is the canonical extensibility point in Braze Content Cards — it's how you attach any structured metadata to a card without changing the card's core schema.
- The Swift version's `filter` closure is more idiomatic than the Objective-C `NSPredicate` block, but both achieve the same client-side partition of a single card pool into multiple logical feeds.
`─────────────────────────────────────────────────`
