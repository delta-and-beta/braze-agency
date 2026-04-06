---
name: engineer-content-cards
description: >-
  Integrates and customizes content card feeds including styling, click
  handling, badges, read/unread indicators, and carousel views.
metadata:
  role: braze-engineer
  topics:
    - ios-content-cards-integration
    - ios-content-cards-implementation-guide
    - ios-content-cards-refreshing-the-feed
    - ios-content-cards-multiple-feeds
    - ios-content-cards-customization
    - ios-content-cards-use-cases
    - ios-content-cards-read-unread-indicators
    - ios-content-cards-handling-clicks-manually
    - ios-content-cards-customizing-feed
    - ios-content-cards-custom-styling
    - ios-content-cards-badges
    - ios-content-cards-carousel-view
    - ios-content-cards
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
- This skill is a **Reference** type — it synthesizes domain docs into a lookup guide rather than enforcing a process. The structure should optimize for Claude finding the right topic quickly, not for step-by-step discipline.
- Braze's iOS SDK has two generations (legacy ObjC `ABK`/`Appboy` vs modern Swift). A good skill makes this boundary explicit upfront so Claude never recommends deprecated APIs for new code.
`─────────────────────────────────────────────────`

# Content Cards Implementation

## Overview

This skill covers the full lifecycle of Braze Content Cards on iOS — from feed refresh and integration to deep UI customization, interaction handling, and analytics. It applies to engineers building or maintaining Content Card surfaces in iOS apps using the Braze SDK.

**Lens:** Feed-driven content delivery with custom UI and interaction patterns. Content Cards are a pull-based channel: the app requests a feed, filters it for context, renders it with custom UI, and must explicitly report analytics back to Braze. This skill addresses every layer of that pipeline.

**SDK Generation Boundary (critical):**

| Generation | Prefix | Status |
|---|---|---|
| Legacy Objective-C | `Appboy`, `ABK` | Deprecated — reference only |
| Swift SDK | `Braze`, `BRZ` | Preferred for all new work |

Always use the Swift SDK for new projects. Legacy API patterns are documented here for maintenance contexts only.

---

## When to Use This Skill

Use this skill when working on any of the following:

- Triggering a manual Content Cards feed refresh
- Integrating the default or a custom Content Cards view controller
- Filtering cards to create multiple independent feeds (e.g. transactional vs. marketing)
- Customizing card appearance: images, colors, fonts, read/unread indicators
- Implementing a fully custom card renderer (custom objects, type routing)
- Intercepting card click events and handling them manually
- Displaying unread badge counts on tab bars or navigation items
- Building a horizontal carousel view over Content Cards data
- Logging card impressions, clicks, and dismissals in custom UI

---

## Topics Synthesized

| Topic | What It Covers |
|---|---|
| **Content Cards Overview** | Feed architecture, refresh lifecycle, SDK entry points |
| **Content Cards Integration** | Default view controller setup, standard integration path |
| **Implementation Guide** | Custom objects, card type routing, manual analytics logging |
| **Refreshing the Feed** | `requestContentCardsRefresh()` / legacy `requestContentCards` method |
| **Multiple Feeds** | Key-value pair filtering to segment cards into independent feeds |
| **Customization** | Subclassing vs. full custom — choosing the right approach |
| **Use Cases** | Common patterns: onboarding, promotions, transactional notifications |
| **Read/Unread Indicators** | Blue line unviewed indicator — enable/disable, custom styling |
| **Manual Click Handling** | Delegate protocol to intercept and override card tap behavior |
| **Customizing the Feed** | ABK-level feed customization (legacy); Swift equivalents |
| **Custom Styling** | Overriding default images; `SDWebImage` integration requirement |
| **Badges** | `unviewedContentCardCount` and `contentCardCount` for badge surfaces |
| **Carousel View** | Fully custom horizontal swipe implementation over card data |

---

## Core Architecture

Content Cards follow a **request → cache → render** model:

```
App calls refresh → Braze fetches from server → Cards cached locally
                                                         ↓
                                              App reads cache → renders UI
                                                         ↓
                                            User interaction → app logs analytics
```

**Key constraint:** In fully custom implementations, analytics (impressions, clicks, dismissals) are **not logged automatically**. You must call the appropriate SDK methods explicitly or metrics will be missing in the Braze dashboard.

---

## Feed Refresh

### Swift SDK
```swift
AppDelegate.braze?.contentCards.requestRefresh { result in
    switch result {
    case .success(let cards): // render cards
    case .failure(let error): // handle error
    }
}
```

### Legacy Objective-C
```objc
[[Appboy sharedInstance] requestContentCardsRefresh];
// Listen via NSNotificationCenter: ABKContentCardsProcessed
```

---

## Multiple Feeds via Key-Value Filtering

Filter cards by extra key-value pairs set in the Braze dashboard:

```swift
let filteredCards = braze.contentCards.cards.filter {
    $0.extras["feed_type"] == "transactional"
}
```

Use this pattern to power separate feed surfaces (e.g., inbox vs. home banner) from a single Content Cards channel without separate campaigns.

---

## Customization Approaches

| Approach | Use When | Analytics |
|---|---|---|
| Default `BrazeContentCardUI` | Minimal UI changes needed | Automatic |
| Subclass `BrazeContentCardUI.ViewController` | Moderate styling overrides | Automatic |
| Fully custom renderer | Custom card objects, carousel, non-standard layout | **Manual — you must log** |

**Image display dependency:** `SDWebImage` must be integrated for default Braze UI to display card images. Without it, image slots render empty.

---

## Read/Unread Indicators

The blue unviewed indicator line renders by default. To disable or restyle:

```swift
// Swift SDK — override cell appearance
// Set `Attributes.defaults.unviewedIndicatorColor = .clear` to hide
```

Legacy (Objective-C): configure via `ABKContentCardsTableViewCell` appearance proxy.

---

## Badge Counts

```objc
// Legacy SDK
NSInteger unviewed = [[Appboy sharedInstance].contentCardsController unviewedContentCardCount];
NSInteger total    = [[Appboy sharedInstance].contentCardsController contentCardCount];
```

Use `unviewedContentCardCount` to drive tab bar badges. Re-query after each feed refresh.

---

## Manual Click Handling

Implement the delegate to intercept taps before default URL handling:

```objc
// Legacy: ABKContentCardsTableViewControllerDelegate
- (BOOL)contentCardTableViewController:(ABKContentCardsTableViewController *)viewController
                 shouldHandleCardClick:(NSURL *)url {
    // Return NO to suppress default handling and take custom action
    return NO;
}
```

Swift SDK equivalent: conform to `BrazeContentCardUIDelegate` and implement `contentCard(_:shouldOpen:)`.

---

## Carousel View

A carousel requires a **fully custom implementation** — Braze's default view controllers do not support horizontal scroll. Pattern:

1. Fetch cards from the SDK cache (filtered if needed)
2. Map SDK card objects to your own model types
3. Render with `UICollectionView` (horizontal flow layout)
4. Log impressions when cards become visible, clicks on tap, dismissals on swipe

There is no partial customization path for carousels. Plan for full manual analytics logging from the start.

---

## Common Mistakes

| Mistake | Fix |
|---|---|
| Forgetting to log impressions in custom UI | Call `logImpression()` when card enters viewport |
| Using `Appboy` APIs in new Swift projects | Use `Braze`/`BRZ` Swift SDK exclusively |
| Missing `SDWebImage` in default UI | Add `SDWebImage` to your dependency manager |
| Reading the card cache before first refresh | Call `requestRefresh` on app launch; cache may be empty or stale |
| Building a carousel on top of default VC | Carousels require fully custom implementation — start there |
| Not re-querying badge count after refresh | Badge count is not a live binding; re-fetch after `contentCardsProcessed` |

`★ Insight ─────────────────────────────────────`
- The Multiple Feeds pattern (key-value filtering) is architecturally powerful — it lets one Braze channel drive multiple independent UI surfaces. Worth highlighting as the preferred alternative to creating separate campaigns per surface.
- Carousel Views are a common product ask that the default SDK simply cannot satisfy. Making this explicit upfront prevents engineers from wasting time trying to configure the default VC into a carousel shape.
`─────────────────────────────────────────────────`
