---
name: content-cards-customizing-cards
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/content_cards/customizing_cards
indexed_at: '2026-04-05'
keywords:
  - customization
  - styling
  - appearance
  - analytics
  - impressions
  - feed
  - components
  - dismissal
  - rendering
  - subclass
triggers:
  - How to customize content cards
  - Style content card appearance
  - Custom card type implementation
  - Track card clicks and impressions
  - Replace default card UI
---
The original content contains only a Jekyll banner include tag with no actual documentation body. Here's the processed topic file based on what was provided:

---

# Customizing Content Cards

> **Note:** This topic references Braze Content Cards customization. The source documentation included only a banner alert (likely a deprecation or migration notice) with no substantive body content.

## What to Know

- Content Cards are in-app message surfaces that can be customized per platform (iOS, Android, Web)
- Customization typically covers: card appearance, dismissal behavior, feed rendering, and click actions
- Braze provides default UI components that can be subclassed or replaced entirely

## Common Customization Approaches

| Approach | Use Case |
|----------|----------|
| Style overrides | Change colors, fonts, padding without replacing components |
| Custom card types | Extend base card classes for new layouts |
| Feed controller replacement | Full control over card rendering and ordering |
| Analytics hooks | Track impressions/clicks with custom logic |

## Key Integration Points

- **iOS**: Subclass `BrazeContentCardUI.ViewController` or implement `BrazeContentCardUIViewControllerDelegate`
- **Android**: Extend `ContentCardsFragment` or implement a custom `IContentCardsUpdateHandler`
- **Web**: Use `braze.getCachedContentCards()` and render manually, or use the default UI

---

The source content was effectively empty (banner-only). If you have the actual documentation page content, re-submitting it would produce a much richer topic file.
