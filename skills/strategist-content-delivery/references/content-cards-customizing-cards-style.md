---
name: content-cards-customizing-cards-style
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/content_cards/customizing_cards/style
indexed_at: '2026-04-05'
keywords:
  - styling
  - customization
  - theming
  - css
  - compose
  - colors
  - override
  - properties
  - branding
triggers:
  - how to style content cards
  - customize card appearance
  - override default styles
  - change card colors
  - theme content cards
---
# Content Card Styling

Content Cards ship with default styles that can be overridden per platform to match your brand. Card properties like `title`, `cardDescription`, and `imageUrl` are best changed via the Braze dashboard rather than code.

---

## Web

Default styles are defined in CSS within the Braze SDK. Override them in your app's stylesheet.

```css
/* Example: set feed width to 800px */
body .ab-feed {
  width: 800px;
}
```

Full list of configurable properties: [Braze Web SDK config options](https://js.appboycdn.com/web-sdk/latest/doc/modules/braze.html)

---

## Android (XML)

Default styles are in [`res/values/styles.xml`](https://github.com/braze-inc/braze-android-sdk/blob/master/android-sdk-ui/src/main/res/values/styles.xml). To override, **copy the entire style block** into your project's `styles.xml` and modify — partial overrides will not correctly set unspecified attributes.

**Correct override (full block):**
```xml
<style name="Braze.ContentCardsDisplay">
  <item name="android:background">@color/mint</item>
  <item name="android:cacheColorHint">@color/mint</item>
  <item name="android:divider">@android:color/transparent</item>
  <item name="android:dividerHeight">16.0dp</item>
  <item name="android:paddingLeft">12.5dp</item>
  <item name="android:paddingRight">5.0dp</item>
  <item name="android:scrollbarStyle">outsideInset</item>
</style>
```

**Incorrect override (partial block — missing attributes will be unset):**
```xml
<style name="Braze.ContentCardsDisplay">
  <item name="android:background">@color/mint</item>
  <item name="android:cacheColorHint">@color/mint</item>
</style>
```

---

## Android (Jetpack Compose)

Two approaches available:

**Option 1 — Per-component styling via `ContentCardsList`:**
```kotlin
ContentCardsList(
    style = ContentCardListStyling(listBackgroundColor = Color.Red),
    cardStyle = ContentCardStyling(
        titleTextStyle = TextStyle(fontFamily = fontFamily, fontSize = 25.sp),
        shadowRadius = 10.dp,
        shortNewsContentCardStyle = BrazeShortNewsContentCardStyling(shadowRadius = 15.dp)
    )
)
```

**Option 2 — Global styling via `BrazeStyle`:**
```kotlin
BrazeStyle(
    contentCardStyle = ContentCardStyling(
        textAnnouncementContentCardStyle = BrazeTextAnnouncementContentCardStyling(
            cardBackgroundColor = Color.Red,
            descriptionTextStyle = TextStyle(fontFamily = fontFamily, fontSize = 25.sp)
        ),
        titleTextColor = Color.Magenta
    )
) {
    // App content, including ContentCardsList()
}
```

Relevant types: [`ContentCardListStyling`](https://braze-inc.github.io/braze-android-sdk/kdoc/braze-android-sdk/com.braze.jetpackcompose.contentcards.styling/-content-card-list-styling/index.html), [`ContentCardStyling`](https://braze-inc.github.io/braze-android-sdk/kdoc/braze-android-sdk/com.braze.jetpackcompose.contentcards.styling/-content-card-styling/index.html), [`BrazeStyle`](https://braze-inc.github.io/braze-android-sdk/kdoc/braze-android-sdk/com.braze.jetpackcompose/-braze-style.html)

---

## Swift

Customization uses [`BrazeContentCardUI.ViewController.Attributes`](https://braze-inc.github.io/braze-swift-sdk/documentation/brazeui/brazecontentcardui/viewcontroller/attributes-swift.struct). **Swift only.**

**Option 1 — Modify global defaults (affects all instances):**
```swift
BrazeContentCardUI.ViewController.Attributes.defaults.cellAttributes.cornerRadius = 20
BrazeContentCardUI.ViewController.Attributes.defaults.cellAttributes.classicImageSize = CGSize(width: 65, height: 65)
```

**Option 2 — Pass custom `Attributes` to a specific view controller instance:**
```swift
var attributes = BrazeContentCardUI.ViewController.Attributes.defaults
attributes.cellAttributes.cornerRadius = 20
attributes.cellAttributes.classicImageSize = CGSize(width: 65, height: 65)

let viewController = BrazeContentCardUI.ViewController(braze: AppDelegate.braze, attributes: attributes)
```

**Option 3 — Subclass cells for full UI control:**

Register custom cell classes per card type via the `cells` property in the `Attributes` struct. This enables fully custom interfaces.
