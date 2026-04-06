---
name: banners-placements
source_url: 'https://braze-inc.github.io/braze-docs/_developer_guide/banners/placements'
indexed_at: '2026-04-05'
keywords:
  - banners
  - placements
  - refresh
  - subscribe
  - display
  - impressions
  - analytics
  - caching
  - SDK
  - sessions
triggers:
  - how to refresh banners
  - how to subscribe to banner updates
  - how to display banners in-app
  - how to track banner impressions
  - how to embed banners
---
`★ Insight ─────────────────────────────────────`
- The source uses Jekyll liquid tags (`{% tabs %}`, `{% include %}`) which are build-time template directives — these need to be stripped and replaced with clean markdown since the topic file is consumed as static content, not rendered by Jekyll.
- The 4-step flow (refresh → subscribe → insert) has an important ordering constraint: the subscriber must be registered *before* calling refresh, otherwise you may miss the first update.
`─────────────────────────────────────────────────`

## Banner Placements

Banners are embedded in-app content rendered inside fixed containers. Each placement is identified by a string ID (e.g. `"global_banner"`) that must match a placement configured in the Braze dashboard.

---

## Platform Support

| Platform | Supported |
|---|---|
| Web | Yes |
| Swift (iOS) | Yes |
| Android (Java/Kotlin) | Yes |
| React Native | Yes |
| Flutter | Yes |
| Unity | No |
| Cordova | No |
| Roku | No |

---

## Refresh Placements

Call refresh to fetch banner content for one or more placement IDs. Placements are cached automatically when a user's session expires or when `changeUser` is called.

**Best practice:** Refresh as early as possible to avoid display delays.

**Web**
```javascript
import * as braze from "@braze/web-sdk";
braze.requestBannersRefresh(["global_banner", "navigation_square_banner"]);
```

**Swift**
```swift
AppDelegate.braze?.banners.requestRefresh(placementIds: ["global_banner", "navigation_square_banner"])
```

**Android (Kotlin)**
```kotlin
Braze.getInstance(context).requestBannersRefresh(listOf("global_banner", "navigation_square_banner"))
```

**Android (Java)**
```java
ArrayList<String> listOfBanners = new ArrayList<>();
listOfBanners.add("global_banner");
listOfBanners.add("navigation_square_banner");
Braze.getInstance(context).requestBannersRefresh(listOfBanners);
```

**React Native**
```javascript
Braze.requestBannersRefresh(["global_banner", "navigation_square_banner"]);
```

**Flutter**
```dart
braze.requestBannersRefresh(["global_banner", "navigation_square_banner"]);
```

---

## Listen for Updates

Subscribe to banner updates before calling refresh. Analytics (impressions, clicks) are handled automatically — impressions are only logged when the banner is in view.

**Important:** Always call refresh *after* registering your subscriber.

**Web — Vanilla JS**
```javascript
import * as braze from "@braze/web-sdk";

braze.subscribeToBannersUpdates((banners) => {
  console.log("Banners were updated");
});

braze.requestBannersRefresh(["global_banner", "navigation_square_banner"]);
```

**Web — React**
```typescript
import * as braze from "@braze/web-sdk";

useEffect(() => {
  const subscriptionId = braze.subscribeToBannersUpdates((banners) => {
    console.log("Banners were updated");
  });

  braze.requestBannersRefresh(["global_banner", "navigation_square_banner"]);

  return () => {
    braze.removeSubscription(subscriptionId);
  };
}, []);
```

**Swift**
```swift
let cancellable = brazeClient.braze()?.banners.subscribeToUpdates { banners in
  banners.forEach { placementId, banner in
    print("Received banner: \(banner) with placement ID: \(placementId)")
  }
}
```

**Android (Kotlin)**
```kotlin
Braze.getInstance(context).subscribeToBannersUpdates { update ->
  for (banner in update.banners) {
    Log.d(TAG, "Received banner: " + banner.placementId)
  }
}
```

**Android (Java)**
```java
Braze.getInstance(context).subscribeToBannersUpdates(banners -> {
  for (Banner banner : banners.getBanners()) {
    Log.d(TAG, "Received banner: " + banner.getPlacementId());
  }
});
```

**React Native**
```javascript
const bannerCardsSubscription = Braze.addListener(
  Braze.Events.BANNER_CARDS_UPDATED,
  (data) => {
    const banners = data.banners;
    console.log(
      `Received ${banners.length} Banner Cards with placement IDs:`,
      banners.map((banner) => banner.placementId)
    );
  }
);
```

**Flutter**
```dart
StreamSubscription bannerStreamSubscription = braze.subscribeToBanners((List<BrazeBanner> banners) {
  for (final banner in banners) {
    print("Received banner: " + banner.toString());
  }
});
```

---

## Insert Banner by Placement ID

Create a sized container element, then call `insertBanner` to render the banner content inside it.

**Web — Vanilla JS**

```html
<div id="global-banner-container" style="width: 100%; height: 450px;"></div>
```

```javascript
import * as braze from "@braze/web-sdk";

braze.initialize("sdk-api-key", {
  baseUrl: "sdk-base-url",
  allowUserSuppliedJavascript: true, // required for banners
});

braze.subscribeToBannersUpdates((banners) => {
  const globalBanner = braze.getBanner("global_banner");
  if (!globalBanner) return;

  const container = document.getElementById("global-banner-container");
  braze.insertBanner(globalBanner, container);

  // Handle control variant: hide the container
  if (globalBanner.isControl) {
    container.style.display = "none";
  }
});

braze.requestBannersRefresh(["global_banner", "navigation_square_banner"]);
```

**Key requirement:** `allowUserSuppliedJavascript: true` must be set during `braze.initialize()` for banners to render on Web.

**Control Variant:** When `banner.isControl` is `true`, the user is in a control group — hide or collapse the container rather than showing content.
