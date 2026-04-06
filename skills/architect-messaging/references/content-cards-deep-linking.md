---
name: content-cards-deep-linking
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/content_cards/deep_linking
indexed_at: '2026-04-05'
keywords:
  - deeplinks
  - content-cards
  - android
  - ios
  - swift
  - uris
  - schemes
  - routing
  - delegation
  - intercepting
triggers:
  - how to deep link in content cards
  - implement deep linking android
  - configure deep links ios
  - handle content card clicks
  - content card routing setup
---
## Content Card Deep Linking

Deep links within Content Cards are handled per-platform by the Braze SDK.

### Platform Support

| Platform | Supported |
|----------|-----------|
| Web | No — not supported |
| Android | Yes |
| Swift (iOS) | Yes |

### Web SDK

Content Card deep links are **not supported** for the Braze Web SDK.

### Android SDK

Deep linking in Content Cards follows the standard Android deep link integration. Implement a custom `IContentCardsActionListener` and override `onContentCardClicked` to intercept and handle deep link URIs before they are processed by the default handler.

### Swift SDK (iOS)

Deep linking in Content Cards follows the standard Swift/iOS deep link integration. Conform to `BrazeContentCardUIViewControllerDelegate` and implement `contentCard(_:shouldOpenURL:)` to intercept deep link URLs from card taps.

### Key Notes

- Deep link handling for Content Cards is an extension of the SDK's general deep linking setup — the same URI schemes and routing logic apply.
- For Android and iOS, ensure your app's deep link handler is registered before Content Cards are displayed.
- Refer to the SDK's core deep linking documentation for URI scheme registration, `BrazeDelegate` / intent filter setup, and custom routing logic.
