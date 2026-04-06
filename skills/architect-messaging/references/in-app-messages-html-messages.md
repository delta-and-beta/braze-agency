---
name: in-app-messages-html-messages
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/message_building_by_channel/in-app_messages/traditional/customize/html_in-app_messages
indexed_at: '2026-04-05'
keywords:
  - HTML
  - CSS
  - JavaScript
  - brazeBridge
  - in-app
  - SDK
  - tracking
  - animation
  - assets
  - deeplink
triggers:
  - create custom HTML messages
  - use brazeBridge methods
  - track button clicks
  - upload media assets
  - enable JavaScript animations
---
## HTML In-App Messages

Custom HTML in-app messages provide full control over look and feel using HTML, CSS, and JavaScript.

**Capabilities:** Custom fonts/styles, videos, multiple images, on-click behaviors, interactive components, custom animations.

**Web SDK requirement:** Must enable `allowUserSuppliedJavascript` during initialization:
```js
braze.initialize('YOUR-API-KEY', { allowUserSuppliedJavascript: true });
```

---

## JavaScript Bridge

Use `brazeBridge` methods inside your HTML to interact with the SDK:

- `brazeBridge.closeMessage()` — closes the in-app message
- Other methods: log events, set custom attributes (see JavaScript Bridge reference)

**Note:** `brazeBridge` methods do **not** update user profiles when previewing in the dashboard.

---

## Link-Based Actions

URL query parameters and schemes are **case-sensitive**.

### Button Click Tracking (deprecated)

Append `abButtonId` as a query parameter to track button clicks:

| Parameter | Action |
|---|---|
| `?abButtonId=0` | Button 1 click |
| `?abButtonId=1` | Button 2 click |

```
https://example.com/?abButtonId=0
https://example.com/?utm_source=braze&abButtonId=0
myApp://deep-link?page=home&abButtonId=1
<a href="https://example.com/?abButtonId=1">Click</a>
```

- Only Button 1 and Button 2 are supported; others log as generic "body clicks"
- **Not supported** in HTML with Preview message types

### Other URL Parameters (mobile only)

| Parameter | Effect |
|---|---|
| `?abExternalOpen=true` | Open link in new window outside app; message dismissed first |
| `?abDeepLink=true` | Handle HTTP/HTTPS URL as a deep link |

### Close Message

```html
<a onclick="brazeBridge.closeMessage()" href="#">Close</a>
```

---

## HTML Upload with Preview

Preview and interact with custom HTML in the dashboard editor — supports pagination, forms, JavaScript animations.

### Minimum SDK Versions

| Platform | Version |
|---|---|
| Swift (iOS) | 5.0.0 |
| Android | 8.0.0 |
| Web | 2.5.0 |

Users on older SDK versions **will not receive** the message. Target or nudge users to upgrade before launching.

### Asset Files

Upload assets to the **Media Library** for offline availability and cross-campaign reuse.

**Supported file types:**

| Type | Extensions |
|---|---|
| Fonts | `.ttf`, `.woff`, `.otf`, `.woff2` |
| SVG Images | `.svg` |
| JavaScript | `.js` |
| CSS | `.css` |

- If an uploaded asset filename matches a local HTML reference (e.g., `cat.png`), it replaces automatically
- Otherwise, copy the asset URL from the library and reference it in your HTML

### HTML Editor

- Live preview renders as you type
- Use **Search** to find within code

---

## Resources

- [Braze HTML in-app message templates (GitHub)](https://github.com/braze-inc/in-app-message-templates)
