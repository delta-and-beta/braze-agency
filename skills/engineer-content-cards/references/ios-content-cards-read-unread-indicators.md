---
name: ios-content-cards-read-unread-indicators
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/platforms/legacy_sdks/ios/content_cards/customization/read_unread_indicators
indexed_at: '2026-04-05'
keywords:
  - cards
  - unviewed
  - indicator
  - swift
  - customize
  - color
  - appearance
  - cell
  - disable
  - styling
triggers:
  - hide unviewed indicator
  - customize indicator color
  - disable blue line
  - style content cards
  - change card appearance
---
# Content Cards Read/Unread Indicators

> **Note:** Objective-C APIs are deprecated. Swift is preferred.

## Unviewed Indicator (Blue Line)

Content cards display a blue line at the bottom to indicate unviewed status. This is controlled via `ABKContentCardsTableViewController`.

**Disable the indicator:**
```objc
// Objective-C
abkContentCardsTableVC.disableUnviewedIndicator = YES;
```

## Customizing the Indicator Color

Access the indicator via the `unviewedLineView` property on `ABKBaseContentCardCell`. Must be set **before the cell is drawn**.

```swift
// Swift
(card as? ABKBaseContentCardCell).unviewedLineView.backgroundColor = UIColor.red
```

```objc
// Objective-C
((ABKBaseContentCardCell *)cell).unviewedLineView.backgroundColor = [UIColor redColor];
```

## Key Classes

| Symbol | Purpose |
|---|---|
| `ABKContentCardsTableViewController.disableUnviewedIndicator` | Boolean — set `YES`/`true` to hide blue line globally |
| `ABKBaseContentCardCell.unviewedLineView` | `UIView` — customize color/appearance of the indicator |
