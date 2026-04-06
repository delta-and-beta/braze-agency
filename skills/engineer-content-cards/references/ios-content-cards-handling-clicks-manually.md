---
name: ios-content-cards-handling-clicks-manually
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/platforms/legacy_sdks/ios/content_cards/customization/handling_clicks_manually
indexed_at: '2026-04-05'
keywords:
  - content-cards
  - delegate
  - click-handling
  - ios
  - sdk
  - objective-c
  - swift
  - url
  - manual-handling
triggers:
  - handle card clicks manually
  - intercept content card clicks
  - custom card click handling
  - suppress card click behavior
  - implement content card delegate
---
## Content Cards Manual Click Handling (iOS Legacy SDK)

> **Note:** This applies to the legacy Objective-C Braze iOS SDK (`ABKContentCardsTableViewController`).

### Setup

Implement `ABKContentCardsTableViewControllerDelegate` and assign it to the `delegate` property:

```objc
// Objective-C
contentCardsTableViewController.delegate = delegate;
```
```swift
// Swift
contentCardsTableViewController.delegate = delegate
```

### Delegate Methods

**`shouldHandleCardClick`** — intercept clicks before the SDK handles them. Return `false`/`NO` to suppress default behavior, `true`/`YES` to let the SDK proceed.

**`didHandleCardClick`** — called after the SDK handles the click (only fires when `shouldHandleCardClick` returns `true`/`YES`).

**Objective-C:**
```objc
- (BOOL)contentCardTableViewController:(ABKContentCardsTableViewController *)viewController
                 shouldHandleCardClick:(NSURL *)url {
  if ([[url.host lowercaseString] isEqualToString:@"my-domain.com"]) {
    // Custom handling
    return NO; // Suppress SDK default
  }
  return YES; // Let SDK handle
}

- (void)contentCardTableViewController:(ABKContentCardsTableViewController *)viewController
                    didHandleCardClick:(NSURL *)url {
  NSLog(@"SDK handled click: %@", url.absoluteString);
}
```

**Swift:**
```swift
func contentCardTableViewController(_ viewController: ABKContentCardsTableViewController!,
                                    shouldHandleCardClick url: URL!) -> Bool {
  if url.host?.lowercased() == "my-domain.com" {
    // Custom handling
    return false // Suppress SDK default
  }
  return true // Let SDK handle
}

func contentCardTableViewController(_ viewController: ABKContentCardsTableViewController!,
                                    didHandleCardClick url: URL!) {
  NSLog("SDK handled click: %@", url.absoluteString)
}
```

### Key Caveat

If you override `handleCardClick:` on `ABKContentCardsTableViewController` directly, the delegate methods above may not be called. Use the delegate pattern instead of subclass overrides.
