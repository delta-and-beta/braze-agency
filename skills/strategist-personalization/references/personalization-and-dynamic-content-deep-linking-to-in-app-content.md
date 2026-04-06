---
name: personalization-and-dynamic-content-deep-linking-to-in-app-content
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/personalization_and_dynamic_content/deep_linking_to_in-app_content
indexed_at: '2026-04-05'
keywords:
  - deeplink
  - UTM
  - attribution
  - scheme
  - tracking
  - campaigns
  - personalization
  - analytics
  - mobile
  - routing
triggers:
  - how to deep link to content
  - setting up UTM campaign tracking
  - creating deep links with UTM tags
  - configuring mobile app links
  - tracking campaign attribution
---
## Deep Linking to In-App Content

### What is Deep Linking?

Deep linking launches a native app and directs it to a specific action or content. Every deep link has three parts:

1. **Identify** which app to launch
2. **Instruct** the app on which action to perform
3. **Provide** any additional data the action needs

Deep links are custom URIs containing all three parts. The scheme (e.g., `http:`) identifies the app — `twitter://` opens the Twitter/X mobile app on iOS. Schemes must start with a letter, then may contain letters, numbers, `+`, `-`, or `.`.

**Best practice:** Include your domain name in the scheme to avoid conflicts (no central registry exists).

Everything after the colon is free-form. Common convention follows HTTP URL structure with `//` and query params:

```
twitter://user?screen_name=[id]
```

> **Wrapper frameworks (Flutter, Cordova, etc.):** Braze does not provide wrapper-specific deep linking support. Configure deep links at the native iOS/Android layers.

---

### UTM Tags and Campaign Attribution

UTM (Urchin Traffic Manager) tags embed campaign attribution data directly in links, tracked by Google Analytics.

| Parameter | Purpose | Example |
|---|---|---|
| `utm_source` | Traffic source | `my_app` |
| `utm_medium` | Campaign medium | `push`, `iam` |
| `utm_campaign` | Campaign identifier | `spring_2016_campaign` |
| `utm_term` | Paid search term | `pizza` |
| `utm_content` | Specific link/content clicked | `android_iam_button2` |

> **Note on click counts:** Braze reports _Total Clicks_ for all links including those without UTM tags. This will often differ from Google Analytics numbers, which only count tagged links.

---

### Using UTM Tags in Braze

**Web links:** Use [Google's URL Builder](https://ga-dev-tools.google/ga4/campaign-url-builder/) to generate UTM links, then embed them in campaign copy like any other link.

**Deep links:** Requires the [Google Analytics SDK](https://developers.google.com/analytics/devguides/collection/) integrated and configured to handle deep links in your app.

#### Push Notifications

Set on-click behavior to "deep link", then write the deep link with UTM tags appended:

```
myapp://products/20-gift-card?utm_source=my_app&utm_medium=push&utm_campaign=spring2016giftcards&utm_content=ios_deeplink
```

#### In-App Messages

Include UTM tags directly in the deep link destination:

```
myapp://products/20-gift-card?utm_source=my_app&utm_medium=iam&utm_campaign=spring2021giftcards&utm_content=web_link
```
