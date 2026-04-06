---
name: content-cards-content-card-inbox
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/content_cards/content_card_inbox
indexed_at: '2026-04-05'
keywords:
  - contentcards
  - compose
  - lazycolumn
  - recyclerview
  - impressions
  - clicks
  - subscriptions
  - inbox
  - messaging
  - android
triggers:
  - how to display content cards
  - build content card inbox
  - track impressions and clicks
  - subscribe to content card updates
  - log content card events
---
# Content Card Inbox

Build a custom message inbox using Braze Content Cards. Two Android approaches are covered: Jetpack Compose (LazyColumn) and RecyclerView.

---

## Android — Jetpack Compose

### 1. Initialize Braze (`MainApplication.kt`)

```kotlin
class ContentCardsApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        BrazeLogger.enableVerboseLogging() // Optional: verbose logging during dev
        val config = BrazeConfig.Builder()
            .setApiKey("YOUR_API_KEY")
            .setCustomEndpoint("YOUR_API_ENDPOINT")
            .build()
        Braze.configure(this, config)
    }
}
```

### 2. Subscribe to Content Card Updates

Use `DisposableEffect` to manage subscription lifecycle — it cleans up when the composable leaves composition:

```kotlin
DisposableEffect(Unit) {
    val subscriber = IEventSubscriber<ContentCardsUpdatedEvent> { event ->
        cards = event.allCards.filter { !it.isControl }  // Exclude control cards
    }
    Braze.getInstance(context).subscribeToContentCardsUpdates(subscriber)
    Braze.getInstance(context).requestContentCardsRefresh(false)

    onDispose {
        Braze.getInstance(context)
            .removeSingleSubscription(subscriber, ContentCardsUpdatedEvent::class.java)
    }
}
```

### 3. Display Cards with LazyColumn

```kotlin
LazyColumn(modifier = Modifier.fillMaxSize().padding(horizontal = 16.dp)) {
    items(cards, key = { it.id }) { card ->
        ContentCardItem(
            card = card,
            onImpression = {
                if (!loggedImpressions.contains(card.id)) {
                    card.logImpression()
                    loggedImpressions.add(card.id)
                }
            },
            onClick = {
                card.logClick()
                card.url?.let { context.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(it))) }
            }
        )
    }
}
```

### 4. Build Card UI from Attributes

Extract `title`, `description`, and `url` from typed card models:

```kotlin
val title = when (card) {
    is CaptionedImageCard -> card.title
    is ShortNewsCard -> card.title
    is TextAnnouncementCard -> card.title
    else -> null
}
val description = when (card) {
    is CaptionedImageCard -> card.description
    is ShortNewsCard -> card.description
    is TextAnnouncementCard -> card.description
    else -> null
}
```

Card attributes reference: [`Card` KDoc](https://braze-inc.github.io/braze-android-sdk/kdoc/braze-android-sdk/com.braze.models.cards/-card/index.html)

### 5. Track Impressions and Clicks

- **Impressions**: Log once per card view using `LaunchedEffect` (fires when card enters composition):
  ```kotlin
  LaunchedEffect(card.id) { onImpression() }
  ```
- **Clicks**: Call `card.logClick()` in the click handler before navigating.
- Use a `mutableSetOf<String>()` to deduplicate impression logging by card ID.

Key methods:
- [`card.logImpression()`](https://braze-inc.github.io/braze-android-sdk/kdoc/braze-android-sdk/com.braze.models.cards/-card/log-impression.html)
- [`card.logClick()`](https://braze-inc.github.io/braze-android-sdk/kdoc/braze-android-sdk/com.braze.models.cards/-card/log-click.html)

---

## Android — RecyclerView

Setup mirrors Compose: same `MainApplication.kt` initialization. Use `RecyclerView` with `LinearLayoutManager` and an `IEventSubscriber<ContentCardsUpdatedEvent>` to drive the adapter.

*(Full RecyclerView implementation follows the same 5-step pattern: init → subscribe → display → extract attributes → track analytics.)*

`★ Insight ─────────────────────────────────────`
- Control cards (`isControl`) must be filtered out before rendering — they're used for A/B hold groups and have no display content.
- `DisposableEffect` maps to Android's `onDestroy`/unsubscribe pattern: it's Compose's way of expressing RAII-style lifecycle cleanup.
- Impression deduplication via a `Set<String>` of card IDs guards against Compose recomposition triggering duplicate analytics events.
`─────────────────────────────────────────────────`
