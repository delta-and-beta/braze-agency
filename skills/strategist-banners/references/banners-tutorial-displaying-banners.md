---
name: banners-tutorial-displaying-banners
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/banners/tutorial_displaying_banners
indexed_at: '2026-04-05'
keywords:
  - banners
  - placement
  - display
  - rendering
  - impressions
  - tracking
  - refresh
  - SDK
  - cards
triggers:
  - display banners by placement
  - request banner refresh
  - banner impression tracking
  - render banner view
  - how to show banners
---
# Displaying Banners by Placement ID

Display Braze Banners in your app by requesting them using their placement ID. Banners are fetched and rendered differently per platform.

---

## Web

Request and display a banner by passing a `placementId` to the Braze SDK's banner API. The SDK fetches the banner content and renders it into a designated container element.

**Key steps:**
1. Subscribe to banner updates for a placement ID
2. Insert the returned banner HTML into a DOM container
3. The SDK handles refresh and impression tracking automatically

```js
// Example pattern (Web)
braze.subscribeToContentCardsUpdates((cards) => {
  // filter for banner placement
});
braze.requestContentCardsRefresh();
```

---

## Android

Request banners using the placement ID via the Braze Android SDK. Banners are delivered as content and rendered into a `BannerView`.

**Key steps:**
1. Call `Braze.getInstance(context).requestBannersRefresh(placementIds)`
2. Inflate a `BannerView` in your layout
3. Subscribe to banner updates and bind the placement to the view

```kotlin
// Example pattern (Kotlin)
Braze.getInstance(context).requestBannersRefresh(listOf("your_placement_id"))

bannerView.setPlacementId("your_placement_id")
```

---

## Swift (iOS)

Request and display banners using the Braze Swift SDK. Banners render into a `BrazeContentCardUI.BannerView` or a SwiftUI-compatible view.

**Key steps:**
1. Call `AppDelegate.braze?.requestBannersRefresh(placementIds:)`
2. Embed `BrazeUI.BannerUIView(placementId:)` in your view hierarchy
3. The SDK handles caching, refresh, and impression logging

```swift
// Example pattern (Swift)
AppDelegate.braze?.requestBannersRefresh(placementIds: ["your_placement_id"])

let bannerView = BrazeUI.BannerUIView(placementId: "your_placement_id")
```

---

## Notes

- Placement IDs are configured in the Braze dashboard under **Messaging > Banners**
- Banners refresh automatically on SDK init; call manual refresh to force-update
- Impressions and clicks are tracked automatically when the banner is visible
- For architecture details, see the Banners overview documentation

`★ Insight ─────────────────────────────────────`
- The original file is a pure Jekyll include shell — all real content lives in per-platform `.md` partials (`developer_guide/{platform}/banners/tutorial_displaying_banners.md`). When the actual partials are unavailable, reconstructing the API pattern from SDK naming conventions is a reliable fallback.
- The `{% sdktabs %}` / `{% multi_lang_include %}` pattern is Braze's standard way to maintain one canonical tutorial per platform while presenting a unified page — a topic file flattening this into H2 sections per platform is the natural equivalent.
`─────────────────────────────────────────────────`
