---
name: message-building-by-channel-push-push-error-codes
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/message_building_by_channel/push/push_error_codes
indexed_at: '2026-04-05'
keywords:
  - push
  - error
  - token
  - FCM
  - APNs
  - authentication
  - device
  - payload
  - registration
  - certificate
triggers:
  - push error codes
  - troubleshoot push delivery
  - invalid push token
  - why is push failing
  - device unregistered
---
`★ Insight ─────────────────────────────────────`
- Braze's push error taxonomy splits cleanly by platform (Android FCM vs. iOS APNs) and by root cause category: auth failures, token lifecycle, payload issues
- The `DEVICE_UNREGISTERED` / `Unregistered` pair is the same semantic error surfaced differently on each platform — worth noting the cross-reference so readers don't diagnose them separately
- Token invalidation errors (`NotRegistered`, `BadToken`) are often misread as "user push-disabled" but actually just mean a specific token was removed — the distinction matters for support workflows
`─────────────────────────────────────────────────`

## Push Error Codes

### Android (FCM)

#### MismatchSenderId
Authentication failure. FCM validates both the **senderID** and **FCM API key** — both must be correct.

Causes:
- Incorrect senderID in Firebase configuration
- App registered with multiple push services using different senderIDs

#### InvalidRegistration
Malformed push token.

Causes:
- Passing the full instance ID instead of calling `getToken()` — malformed tokens look like `|ID|1|:[regular token]`
- Registering with multiple push services causes Braze to receive tokens from unrelated intents

#### NotRegistered
App was deleted from the device (primary signal for uninstall detection). Can also occur when multiple registrations invalidate a previously captured token.

#### DEVICE_UNREGISTERED
Appears in Message Activity Log as:
```
Received 'Error: DEVICE_UNREGISTERED, ' sending to '[Token String]'
```

Causes:
- User uninstalled the app (most common)
- FCM credentials/certificates changed in the app — previously registered users have invalid tokens until re-registration
- Custom logic explicitly unregistering the device via Firebase/Android SDK

> **Note:** This does not mean the user is push-disabled — only that a specific token was removed. To check for valid tokens, go to **User Search > Engagement tab > Contact Settings**.

---

### iOS (APNs)

#### Invalid payload
Appears in user profile under **Engagement > Contact Settings > Push Changelog**.

APNs error reasons:
- `PayloadEmpty` — payload missing required content
- `PayloadTooLarge` — payload exceeded APNs maximum size

Causes:
- Custom keys or large Liquid-rendered values bloating payload size
- Empty or missing alert/body in `aps` payload

Resolution:
- Trim custom keys and shorten dynamic values
- For API sends, validate final JSON payload size before sending

#### BadToken
Causes:
- Token not sent to Braze correctly via `registerDeviceToken:` — check Message Activity Log; valid tokens are long alphanumeric strings like `6e407a9be8d07f0cdeb9e714733a89445f57a89ec890d63867c482a483506fa6`
- **Mismatched provisioning environment** — registered with development certificate but sending with production (or vice versa). Braze only supports universal certificates for production; testing with a universal cert on development will not work.
- **Mismatched provisioning profile** — certificate doesn't match the one used to obtain the token. Resolution: ensure push certificate in Braze dashboard and provisioning profile align; recreate APNs certificate and provisioning profile if needed.

#### TopicDisallowed (Bundle ID not allowed)
APNs rejected the push because the topic (bundle ID) isn't allowed for the auth credentials used.

Resolution:
1. Confirm the bundle ID in Braze app settings exactly matches the app bundle ID (including suffixes like `.debug`, `.staging`)
2. Verify the `.p8` key is associated with the correct Apple Developer Team
3. For separate dev/prod App IDs in Braze, confirm each uses the correct credentials and environment

#### Unregistered
Appears in Message Activity Log as:
```
Received 'Unregistered' sending to '[Token String]'
```

iOS equivalent of Android's `DEVICE_UNREGISTERED`. Causes:
- User uninstalled the app (most common)
- APNs certificates changed or renewed — previously registered users have invalid tokens until re-registration
- Custom logic unregistering from remote notifications via iOS SDK

> **Note:** Does not mean the user is push-disabled. Check **User Search > Engagement tab > Contact Settings** for valid tokens.

#### InvalidProviderToken
APNs rejected the request because the `.p8` auth token or `.p12` certificate doesn't match the app's bundle ID or Team ID.

Resolution:
1. **Verify Team ID and Key ID** — for `.p8` keys, confirm values in Braze dashboard (**Settings > App Settings > [iOS app]**) match Apple Developer account
2. **Check bundle ID** — any mismatch (capitalization, `.debug` suffix) triggers this error
3. **Re-upload key or certificate** — if the `.p8` or `.p12` was recently regenerated or revoked, upload the new version and remove the old one
