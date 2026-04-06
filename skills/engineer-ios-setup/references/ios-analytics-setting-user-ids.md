---
name: ios-analytics-setting-user-ids
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/platforms/legacy_sdks/ios/analytics/setting_user_ids
indexed_at: '2026-04-05'
keywords:
  - authentication
  - user-id
  - changeUser
  - logout
  - aliasing
  - identifier
  - events
  - campaign
  - threading
triggers:
  - how to assign user ID
  - setting user ID after login
  - handling logout behavior
  - creating user aliases
  - multi-user device handling
---
`★ Insight ─────────────────────────────────────`
- The source uses Liquid template includes (`{% multi_lang_include %}`) which pull in shared content — when those aren't available, we preserve the structural intent (naming conventions, best practices) as headers with placeholder notes
- Both Objective-C and Swift examples are kept since the SDK was transitioning between them; omitting either would lose coverage for legacy codebases
`─────────────────────────────────────────────────`

## iOS Setting User IDs

### Assigning a User ID

Call `changeUser()` as soon as the user is identified (typically after login):

**Objective-C:**
```objc
[[Appboy sharedInstance] changeUser:@"YOUR_USER_ID_STRING"];
```

**Swift:**
```swift
Appboy.sharedInstance()?.changeUser("YOUR_USER_ID")
```

**Critical rules:**
- Call on the **main thread only** — async calls cause undefined behavior
- Call **only when the user logs in**, never on logout
- Setting `changeUser()` to a static default value associates ALL activity with that default user until the next login

### Logout Behavior

Do not call `changeUser()` on logout. Instead:
- Track the target user ID separately during logged-out state
- Switch back to that user ID as part of the logout process
- This preserves the ability to target previously logged-in users with re-engagement campaigns

### Multi-User Device Handling

If multiple users share a device but you only want to target one during logged-out state:
1. Keep a separate reference to the desired user ID
2. Restore it explicitly during logout — do not rely on `changeUser()` to handle this

### User ID Naming Convention

Follow Braze's standard naming convention for user IDs (see shared naming convention guidelines: use a stable, unique identifier — not email or phone number, which can change).

### Aliasing Users

Braze supports creating user aliases to reference users by an alternate identifier. This is useful for anonymous-to-known user merging. See the iOS-specific aliasing documentation for implementation details.

### Best Practices

- Use a stable, internal identifier (not PII like email/phone)
- Set the user ID immediately after authentication, before logging any events
- Avoid changing user IDs mid-session
- Test that `changeUser()` fires exactly once per login, not on every app launch
