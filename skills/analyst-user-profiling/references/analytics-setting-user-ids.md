---
name: analytics-setting-user-ids
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/analytics/setting_user_ids
indexed_at: '2026-04-05'
keywords:
  - userId
  - externalId
  - authentication
  - identification
  - aliases
  - sessions
  - anonymous
  - changeUser
  - impersonation
triggers:
  - how to set user id
  - track users across devices
  - handling anonymous users
  - preventing user impersonation
  - user alias management
---
# Setting User IDs

Braze uses an `external_id` to track users across devices and platforms. Without one, Braze assigns an anonymous ID — but user data import and targeted messaging are unavailable until a real ID is set.

## Anonymous Users

Before identification, Braze tracks users anonymously. If your use case requires zero data collection prior to login, delay SDK initialization until `external_id` is available. **Only delay on first app launch** — blocking initialization on every sign-out will break in-app message and Content Card prefetching.

## Setting a User ID

Call `changeUser()` after login. IDs must be unique; prefer UUIDs (128-bit random strings). If hashing an existing identifier (e.g., email), normalize input first (trim spaces, account for localization), and enable [SDK Authentication](https://www.braze.com/docs/developer_guide/sdk_integration/authentication/) to prevent impersonation.

```javascript
// Web
braze.changeUser(YOUR_USER_ID_STRING);
```
```java
// Android (Java)
Braze.getInstance(context).changeUser(YOUR_USER_ID_STRING);
```
```kotlin
// Android (Kotlin)
Braze.getInstance(context).changeUser(YOUR_USER_ID_STRING)
```
```swift
// Swift
AppDelegate.braze?.changeUser(userId: "YOUR_USER_ID")
```
```objc
// Objective-C
[AppDelegate.braze changeUser:@"YOUR_USER_ID_STRING"];
```
```javascript
// React Native
Braze.changeUser("YOUR_USER_ID_STRING");
```
```csharp
// Unity
AppboyBinding.ChangeUser("YOUR_USER_ID_STRING");
```
```javascript
// Cordova
BrazePlugin.changeUser("YOUR_USER_ID");
```
```brightscript
// Roku
m.Braze.setUserId(YOUR_USER_ID_STRING)
```

### `changeUser()` Behavior

| Scenario | Result |
|---|---|
| Same user ID already set | No effect on session count |
| Different user ID | Ends current session, starts new one |
| Anonymous user → new user ID | Anonymous profile data **merged** into new profile |
| Anonymous user → existing user ID | Anonymous profile data **not merged** |

`changeUser()` automatically flushes pending data for the previous user — no manual flush needed.

**Do not** assign a shared/static ID or call `changeUser()` on logout. This prevents re-engagement of prior users on shared devices and conflates all data under one ID.

## User Aliases

An alias is a secondary identifier consisting of a `name` (the identifier value) and a `label` (the identifier type). Used to track users across platforms without overriding the primary `external_id`.

Example: a user with external ID `987654` in a support platform → alias `name: 987654`, `label: support_id`.

```javascript
// Web
braze.getUser().addAlias(ALIAS_NAME, ALIAS_LABEL);
```
```java
// Android (Java)
Braze.getInstance(context).getCurrentUser().addAlias(ALIAS_NAME, ALIAS_LABEL);
```
```kotlin
// Android (Kotlin)
Braze.getInstance(context).currentUser?.addAlias(ALIAS_NAME, ALIAS_LABEL)
```
```swift
// Swift
Appboy.sharedInstance()?.user.addAlias(ALIAS_NAME, ALIAS_LABEL)
```
```javascript
// React Native
Braze.addAlias("ALIAS_NAME", "ALIAS_LABEL");
```
```json
// REST API
{ "alias_name": "...", "alias_label": "..." }
```

## ID Naming Best Practices

**Recommended:** UUID standard (128-bit random strings).

**Avoid:**

| Bad ID Type | Example |
|---|---|
| Visible profile ID / username | JonDoe829525552 |
| Email address | anna@email.com |
| Auto-incrementing integer | 123 |

Guessable or sequential IDs expose your org to impersonation and data exfiltration attacks. IDs can be renamed later via the `/users/external_ids/rename` endpoint.

---

`★ Insight ─────────────────────────────────────`
- The anonymous-to-identified merge only happens when the target `external_id` is **new** to Braze — this asymmetry is a common source of bugs when testing with pre-existing user records.
- The `changeUser()` auto-flush behavior means you cannot control *when* the flush happens; if your analytics pipeline depends on flush ordering, factor this in.
- User aliases solve the cross-platform identity stitching problem without breaking the primary `external_id` — the label acts as a namespace, so the same numeric ID can exist under multiple labels without collision.
`─────────────────────────────────────────────────`
