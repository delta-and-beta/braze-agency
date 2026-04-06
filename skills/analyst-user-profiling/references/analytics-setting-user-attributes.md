---
name: analytics-setting-user-attributes
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/analytics/setting_user_attributes
indexed_at: '2026-04-05'
keywords:
  - attributes
  - segmentation
  - personalization
  - targeting
  - customization
  - subscription
  - profile
  - arrays
  - metadata
  - opt-in
triggers:
  - how to set user attributes
  - how to set custom attributes
  - how to segment users
  - manage push subscriptions
  - customize user profile
---
`★ Insight ─────────────────────────────────────`
This source uses Jekyll's `{% multi_lang_include %}` liquid templating — the actual content lives in platform-specific partials, not the index file. Processing the stub produces a platform-overview reference that summarizes the pattern rather than repeating SDK-specific code for each platform.
`─────────────────────────────────────────────────`

# Setting User Attributes

Braze lets you assign attributes to users to segment, personalize, and target messaging. Attributes fall into two categories: **standard** (predefined by Braze) and **custom** (defined by you).

## Core Concept

User attributes are set on the current user object returned by `braze.getUser()` (Web) or equivalent SDK accessor. Attributes persist on the user profile in Braze.

---

## Standard Attributes

These map to built-in Braze profile fields:

| Attribute | Method (Web) | Notes |
|---|---|---|
| First name | `setFirstName(name)` | |
| Last name | `setLastName(name)` | |
| Email | `setEmail(email)` | Required for email campaigns |
| Language | `setLanguage(lang)` | ISO 639-1 code (e.g. `"en"`) |
| Country | `setCountry(country)` | ISO 3166-1 alpha-2 (e.g. `"US"`) |
| Home city | `setHomeCity(city)` | |
| Date of birth | `setDateOfBirth(year, month, day)` | |
| Gender | `setGender(gender)` | Use `braze.ab.User.Genders` enum |
| Phone | `setPhoneNumber(number)` | E.164 format recommended |
| Push opt-in | `setPushNotificationSubscriptionType(type)` | `OPTED_IN`, `SUBSCRIBED`, `UNSUBSCRIBED` |
| Email opt-in | `setEmailNotificationSubscriptionType(type)` | Same enum values |

---

## Custom Attributes

### Scalar Types

```js
// Web
const user = braze.getUser();
user.setCustomUserAttribute("plan", "premium");       // string
user.setCustomUserAttribute("login_count", 42);       // integer
user.setCustomUserAttribute("score", 98.6);           // float
user.setCustomUserAttribute("is_verified", true);     // boolean
user.setCustomUserAttribute("signup_date", new Date()); // date
```

```kotlin
// Android
Braze.getInstance(context).currentUser?.apply {
    setCustomUserAttribute("plan", "premium")
    setCustomUserAttribute("login_count", 42)
    setCustomUserAttribute("is_verified", true)
}
```

```swift
// Swift
Appboy.sharedInstance()?.user.setCustomAttributeWithKey("plan", andStringValue: "premium")
Appboy.sharedInstance()?.user.setCustomAttributeWithKey("login_count", andIntegerValue: 42)
```

### Arrays

```js
// Web — set, add, or remove items
user.setCustomUserAttribute("tags", ["sports", "tech"]);
user.addToCustomAttributeArray("tags", "music");
user.removeFromCustomAttributeArray("tags", "sports");
```

### Unsetting an Attribute

```js
user.unsetCustomUserAttribute("plan");
```

---

## Platform-Specific Entry Points

| Platform | User Accessor |
|---|---|
| Web | `braze.getUser()` |
| Android | `Braze.getInstance(context).currentUser` |
| Swift/ObjC | `Appboy.sharedInstance()?.user` |
| Flutter | `BrazePlugin.setFirstName(name)` (top-level methods) |
| React Native | `Braze.setFirstName(name)` (top-level methods) |
| Unity | `Appboy.AppboyBinding.SetFirstName(name)` |
| Roku | `m.Braze.setFirstName(name)` |

> For wrapper SDKs not listed, use the relevant native Android or Swift method.

---

## Key Notes

- Custom attribute **keys** must be `< 255` characters; **string values** must be `< 255` characters.
- Custom attribute **arrays** support up to 25 items by default (configurable in dashboard).
- Attribute writes are batched and flushed automatically; call `braze.requestImmediateDataFlush()` to force an immediate sync (Web).
- Attributes take effect on the **next session** for segmentation purposes after server-side processing.
