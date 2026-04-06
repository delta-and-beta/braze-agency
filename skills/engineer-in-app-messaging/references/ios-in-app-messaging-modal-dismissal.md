---
name: ios-in-app-messaging-modal-dismissal
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/platforms/legacy_sdks/ios/in-app_messaging/customization/modal_dismissal
indexed_at: '2026-04-05'
keywords:
  - modal
  - dismissal
  - tap
  - iOS
  - SDK
  - plist
  - configuration
  - runtime
  - in-app
  - messaging
triggers:
  - how to dismiss modal on outside tap
  - configure modal dismissal behavior
  - enable outside tap dismissal
  - iOS in-app message dismissal
  - modal tap handling
---
## Modal Dismissal on Outside Tap

Controls whether a modal in-app message is dismissed when the user taps outside it.

**Default:** Disabled (`NO`)

### Configure via Info.plist

Add to your `Info.plist`:

```xml
<key>Braze</key>
<dict>
  <key>DismissModalOnOutsideTap</key>
  <boolean>YES</boolean>
</dict>
```

> **Note:** For Braze iOS SDK < v4.0.2, use `Appboy` as the dictionary key instead of `Braze`.

### Configure at Runtime

Set in `appboyOptions`:

```
ABKEnableDismissModalOnOutsideTapKey = YES
```

### Reference

| Value | Behavior |
|-------|----------|
| `YES` | Modal dismissed on outside tap |
| `NO` | Modal not dismissed on outside tap (default) |

`★ Insight ─────────────────────────────────────`
- The dual configuration paths (plist vs. runtime) reflect a common iOS SDK pattern: plist for static app-wide defaults, runtime options for dynamic or conditional behavior
- The `Appboy` → `Braze` key rename in v4.0.2 is a branding migration — worth noting in topic files because legacy codebases may still use the old key and silently fail to apply the setting
`─────────────────────────────────────────────────`
