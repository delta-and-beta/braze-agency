---
name: ios-content-cards-customizing-feed
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/platforms/legacy_sdks/ios/content_cards/customization/customizing_feed
indexed_at: '2026-04-05'
keywords:
  - customization
  - cards
  - iOS
  - subclass
  - analytics
  - filtering
  - templates
  - registration
  - UI
  - feed
triggers:
  - customize content card feed
  - register custom card cells
  - filter and order cards
  - customize card appearance
  - implement card analytics
---
# Customizing Content Card Feed (iOS Legacy SDK)

> **Note:** This applies to the legacy Objective-C iOS SDK (`ABK`-prefixed classes).

## Overview

Two approaches to custom Content Card feeds:

| Approach | Control Level | Tradeoff |
|----------|--------------|----------|
| Subclass `ABKContentCardsTableViewController` | Medium — use `populateContentCards` for filter/sort | Simpler; analytics handled automatically |
| Fully custom view controller + data subscription | Full — carousel, interactive elements | Must implement analytics methods manually (impressions, dismissals, clicks) |

## Customizing UI

### Dynamic (per-card)

Use `applyCard` to update UI based on card's key-value pairs:

```swift
override func apply(_ captionedImageCard: ABKCaptionedImageContentCard!) {
  super.apply(captionedImageCard)
  if let backgroundColor = card.extras?[ContentCardKey.backgroundColor.rawValue] as? String,
     let backgroundColorValue = backgroundColor.colorValue() {
    rootView.backgroundColor = backgroundColorValue
  } else {
    rootView.backgroundColor = .lightGray
  }
}
```

### Static (all cards)

Use `setUpUI` to apply uniform styling across all cards:

```swift
override func setUpUI() {
  super.setUpUI()
  rootView.backgroundColor = .lightGray
  rootView.layer.borderColor = UIColor.purple.cgColor
  unviewedLineViewColor = .red
  titleLabel.font = .italicSystemFont(ofSize: 20)
}
```

## Registering Custom Cell Classes

Override `registerTableViewCellClasses` to substitute default cells with custom subclasses:

```swift
override func registerTableViewCellClasses() {
  super.registerTableViewCellClasses()
  tableView.register(CustomCaptionedImageContentCardCell.self, forCellReuseIdentifier: "ABKCaptionedImageContentCardCell")
  tableView.register(CustomBannerContentCardCell.self,         forCellReuseIdentifier: "ABKBannerContentCardCell")
  tableView.register(CustomClassicImageContentCardCell.self,   forCellReuseIdentifier: "ABKClassicImageCardCell")
  tableView.register(CustomClassicContentCardCell.self,        forCellReuseIdentifier: "ABKClassicCardCell")
}
```

**Three built-in card templates:** banner, captioned image, classic.

## Filtering and Ordering Cards

Override `populateContentCards` to programmatically modify card content or order:

```swift
override func populateContentCards() {
  guard let cards = Appboy.sharedInstance()?.contentCardsController.contentCards else { return }
  for card in cards {
    if let classicCard = card as? ABKClassicContentCard {
      classicCard.cardDescription = "Custom Feed Override title [classic cards only]!"
    }
  }
  super.cards = (cards as NSArray).mutableCopy() as? NSMutableArray
}
```

This is the **recommended** approach for filtering/ordering when subclassing.

## Key Reuse Identifiers

| Card Type | Reuse Identifier |
|-----------|-----------------|
| Banner | `ABKBannerContentCardCell` |
| Captioned Image | `ABKCaptionedImageContentCardCell` |
| Classic (with image) | `ABKClassicImageCardCell` |
| Classic (no image) | `ABKClassicCardCell` |
