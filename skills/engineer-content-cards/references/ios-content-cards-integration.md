---
name: ios-content-cards-integration
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/platforms/legacy_sdks/ios/content_cards/integration
indexed_at: '2026-04-05'
keywords:
  - content-cards
  - iOS
  - Swift
  - ABKContentCard
  - notifications
  - impression
  - dismissible
  - webview
  - observer
  - properties
triggers:
  - subscribe to content card updates
  - display content cards on iOS
  - log card impressions and clicks
  - customize card data models
  - handle card dismissals
---
`★ Insight ─────────────────────────────────────`
- The original doc uses Jekyll liquid tags (`{% tabs %}`, `{% multi_lang_include %}`) — strip these entirely; they're build-time templating, not content
- The `ABKContentCard` class hierarchy follows classic OOP inheritance: one base class + 3 concrete subclasses, which maps cleanly to a flat reference table format
- Removing `{: .reset-td-br-1 ...}` Kramdown attribute syntax keeps tables valid in standard Markdown renderers
`─────────────────────────────────────────────────`

# Content Cards Integration (iOS SDK)

> **Note:** The Objective-C API shown here is deprecated. Prefer Swift for new integrations.

## Subscribing to Updates

```swift
// Subscribe — remove observer when appropriate
NotificationCenter.default.addObserver(self,
  selector: #selector(contentCardsUpdated),
  name: NSNotification.Name.ABKContentCardsProcessed,
  object: nil)

@objc private func contentCardsUpdated(_ notification: Notification) {
  if let updateIsSuccessful = notification.userInfo?[ABKContentCardsProcessedIsSuccessfulKey] as? Bool,
     updateIsSuccessful {
    // Access cards via: Appboy.sharedInstance()?.contentCardsController.contentCards
  }
}
```

To modify card data after receipt: store a deep copy locally, mutate it, and render from your copy. Cards are accessible via `ABKContentCardsController`.

---

## Card Data Models

### Base Properties (`ABKContentCard`)

| Property | Notes |
|---|---|
| `idString` | Read-only. Set by Braze. |
| `viewed` | Whether the user has viewed the card. |
| `created` | Read-only. Unix timestamp of creation. |
| `expiresAt` | Read-only. Unix timestamp of expiration. |
| `dismissible` | Whether the user can dismiss the card. |
| `pinned` | Whether the card is pinned in the dashboard. |
| `dismissed` | Whether the user has dismissed the card. |
| `url` | HTTP(s) or protocol URL opened on tap. |
| `openURLInWebView` | `true` = in-app web view; `false` = external browser. |
| `extras` | Optional `NSDictionary<String, String>` of key-value pairs. |

### Banner (`ABKBannerContentCard`)

| Property | Notes |
|---|---|
| `image` | URL of card image. |
| `imageAspectRatio` | Aspect ratio hint before image loads (may be absent). |

### Captioned Image (`ABKCaptionedImageCard`)

| Property | Notes |
|---|---|
| `image` | URL of card image. |
| `imageAspectRatio` | Aspect ratio of card image. |
| `title` | Title text. |
| `cardDescription` | Body text. |
| `domain` | Link label shown in UI (e.g. `"blog.braze.com"`). |

### Classic (`ABKClassicContentCard`)

| Property | Notes |
|---|---|
| `image` | Optional. URL of card image. |
| `title` | Title text. |
| `cardDescription` | Body text. |
| `domain` | Link label shown in UI. |

---

## Card Methods

| Method | Description |
|---|---|
| `logContentCardImpression` | Manually log an impression for a card. |
| `logContentCardClicked` | Log a click — only fires if `url` has a valid value. |
| `logContentCardDismissed` | Log a dismissal — only fires if `dismissed` is not already `true`. |
| `isControlCard` | Returns `true` if this card is the A/B test control variant. |

Full class reference: [`ABKContentCard` docs](https://appboy.github.io/appboy-ios-sdk/docs/interface_a_b_k_content_card.html)

---

## View Controller Integration

### Navigation (push)

```swift
let contentCards = ABKContentCardsTableViewController()
contentCards.title = "Content Cards Title"
contentCards.disableUnreadIndicator = true
navigationController?.pushViewController(contentCards, animated: true)
```

To customize the nav bar title, set `navigationItem.title` on the `ABKContentCardsTableViewController` instance.

### Modal (present)

Renders with a navigation bar and a **Done** button.

```swift
let contentCards = ABKContentCardsViewController()
contentCards.contentCardsViewController.title = "Content Cards Title"
contentCards.contentCardsViewController.disableUnreadIndicator = true
self.present(contentCards, animated: true, completion: nil)
```

To customize the header in modal context, set `navigationItem.title` on the embedded `ABKContentCardsTableViewController` (accessible via `contentCardsViewController`).

`★ Insight ─────────────────────────────────────`
- The modal variant (`ABKContentCardsViewController`) wraps the same `ABKContentCardsTableViewController` — the double `.contentCardsViewController.title` access pattern reveals this composition
- `disableUnreadIndicator` is the only configuration property shown in both contexts, suggesting it's the most commonly needed customization point at the VC level; deeper card-level customization lives in the model layer
`─────────────────────────────────────────────────`
