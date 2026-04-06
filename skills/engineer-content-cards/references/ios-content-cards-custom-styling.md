---
name: ios-content-cards-custom-styling
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/platforms/legacy_sdks/ios/content_cards/customization/custom_styling
indexed_at: '2026-04-05'
keywords:
  - styling
  - content-cards
  - images
  - dark-mode
  - customization
  - override
  - assets
  - appearance
  - theme
  - icons
triggers:
  - customize content card styling
  - override default images
  - disable dark mode in content cards
  - style content cards on iOS
  - configure custom content card appearance
---
# Content Cards Custom Styling (iOS)

## Overriding Default Images

**Requirement:** `SDWebImage` must be integrated to display images within Braze Content Cards UI.

To replace default images, add a custom `.png` file to the app's image bundle using the same filename as the default image. Include `@2x` and `@3x` variants to support different screen sizes.

| Asset | Filename |
|-------|----------|
| Placeholder image | `appboy_cc_noimage_lrg` |
| Pinned icon | `appboy_cc_icon_pinned` |

**Content size limit:** Content Cards have a **2 KB maximum** for dashboard-entered content (message text, image URLs, links, and all key-value pairs). Cards exceeding this limit will fail to send.

> Image overrides are **not supported** in the .NET MAUI iOS integration.

## Disabling Dark Mode

Set `ABKContentCardsTableViewController.enableDarkTheme = false` to prevent the Content Cards UI from adopting dark theme styling.

Two access patterns:

**Via `ABKContentCardsViewController` (modal presentation):**

```swift
// Swift
@IBAction func presentModalContentCards(_ sender: Any) {
  let contentCardsVC = ABKContentCardsViewController()
  contentCardsVC.contentCardsViewController.enableDarkTheme = false
  self.navigationController?.present(contentCardsVC, animated: true, completion: nil)
}
```

```objc
// Objective-C
- (IBAction)presentModalContentCards:(id)sender {
  ABKContentCardsViewController *contentCardsVC = [ABKContentCardsViewController new];
  contentCardsVC.contentCardsViewController.enableDarkTheme = NO;
  [self.navigationController presentViewController:contentCardsVC animated:YES completion:nil];
}
```

**Directly on `ABKContentCardsTableViewController` (push navigation):**

```swift
// Swift
@IBAction func presentNavigationContentCards(_ sender: Any) {
  let contentCardsTableVC = ABKContentCardsTableViewController()
  contentCardsTableVC.enableDarkTheme = false
  self.navigationController?.present(contentCardsTableVC, animated: true, completion: nil)
}
```

```objc
// Objective-C
- (IBAction)presentNavigationContentCards:(id)sender {
  ABKContentCardsTableViewController *contentCardsTableVC = [[ABKContentCardsTableViewController alloc] init];
  contentCardsTableVC.enableDarkTheme = NO;
  [self.navigationController pushViewController:contentCardsTableVC animated:YES];
}
```

`★ Insight ─────────────────────────────────────`
- The two dark mode access patterns reflect iOS UI hierarchy: `ABKContentCardsViewController` is a container that wraps `ABKContentCardsTableViewController` — the `contentCardsViewController` property exposes the inner table VC for direct configuration.
- Braze uses `@2x`/`@3x` asset variants rather than asset catalogs here, which is an older iOS pattern — worth noting when integrating with modern Xcode projects that prefer `.xcassets`.
`─────────────────────────────────────────────────`
