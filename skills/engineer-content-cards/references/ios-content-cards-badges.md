---
name: ios-content-cards-badges
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/platforms/legacy_sdks/ios/content_cards/customization/badges
indexed_at: '2026-04-05'
keywords:
  - badges
  - content-cards
  - ios
  - appboy
  - unviewed
  - viewed
  - deduplication
  - background
triggers:
  - how to update app icon badge count
  - sync badge with unread cards
  - get unviewed content card count
  - detect when card is viewed
  - app badge on background
---
# Content Cards Badges (iOS)

## Badge Count Methods

`ABKContentCardsController` exposes two methods for badge count queries:

```objc
- (NSInteger)unviewedContentCardCount;
// Returns active Content Cards not yet viewed.
// "Viewed" = card scrolled onto screen. Cards counted once, even across devices.

- (NSInteger)contentCardCount;
// Returns total active Content Cards. Counted once even across multiple views.
```

## Updating App Icon Badge on Background

Call in `applicationDidEnterBackground` to sync the app badge with unread card count when the user leaves the app.

**Objective-C:**
```objc
- (void)applicationDidEnterBackground:(UIApplication *)application {
    [UIApplication sharedApplication].applicationIconBadgeNumber =
        [[Appboy sharedInstance].contentCardsController unviewedContentCardCount];
}
```

**Swift:**
```swift
func applicationDidEnterBackground(_ application: UIApplication) {
    UIApplication.shared.applicationIconBadgeNumber =
        Appboy.sharedInstance()?.contentCardsController.unviewedContentCardCount() ?? 0
}
```

## Key Behavior Notes

- A card is "viewed" once it scrolls on-screen — not when the feed opens
- Scrolling a card off and back on does **not** re-count it
- Card counts are deduplicated across multiple Content Cards views and devices
- Badge updates in `applicationDidEnterBackground` reflect cards viewed during the current session

## References

- [`ABKContentCardsController` API docs](https://appboy.github.io/appboy-ios-sdk/docs/interface_a_b_k_content_cards_controller.html)
- [`Appboy.h` header file](https://github.com/Appboy/appboy-ios-sdk/blob/master/AppboyKit/include/Appboy.h)
