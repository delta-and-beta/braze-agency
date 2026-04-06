---
name: engineer-platform-android
description: Android-specific SDK implementation and version-specific feature support.
metadata:
  role: braze-engineer
  topics:
    - platforms-android
    - platforms-android-android-13
    - platforms-tv-and-ott
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
Nick skill files for plugins differ from superpowers skills — they're **reference lenses** for domain agents, not process-enforcement documents. The `writing-skills` TDD cycle applies when creating new reusable superpowers-style skills; for plugin knowledge skills like this one, the goal is concise, scannable reference content that tells an agent *when* and *how* to apply domain knowledge.
`─────────────────────────────────────────────────`

Here is the generated skill content:

---

# Android Platform

## Overview

This skill covers Android-specific Braze SDK integration — from baseline setup to OS-version-aware feature handling and non-phone form factor support (TV, OTT). Use it when implementing, diagnosing, or advising on Braze SDK behavior that is specific to the Android runtime, Android API level capabilities, or Android-adjacent platforms.

**Lens:** Android engineering perspective — API level constraints, SDK initialization patterns, manifest configuration, and Android OS behavioral differences take precedence over generic mobile guidance.

## When to Use

- Integrating the Braze Android SDK into a new or existing Android project
- Handling Android 13+ permission changes (e.g., `POST_NOTIFICATIONS` runtime permission)
- Diagnosing push notification delivery issues on specific Android versions
- Implementing in-app messaging, content cards, or custom feed UI on Android
- Supporting non-phone Android targets: Android TV, Fire TV, or OTT streaming devices
- Advising on `minSdkVersion` / `targetSdkVersion` tradeoffs relative to Braze feature availability
- Evaluating which Braze features are gated behind specific Android API levels

## Topics Synthesized

| Topic | Scope |
|-------|-------|
| **Android Platform** | Core SDK setup, Gradle dependencies, `BrazeConfig`, `Application` subclass initialization, ProGuard/R8 rules |
| **Android 13 Updates** | `POST_NOTIFICATIONS` permission flow, notification opt-in UX patterns, targeting SDK 33+ behavior changes |
| **TV & OTT Platforms** | Android TV / Fire TV SDK compatibility, leanback UI constraints, push channel configuration for OTT, feature subset available without a touch interface |

## Key Engineering Considerations

**API Level Gating**
Braze features may require minimum API levels. Always cross-reference `minSdkVersion` against feature requirements before enabling capabilities. Runtime checks (`Build.VERSION.SDK_INT`) are preferred over compile-time exclusions for graceful degradation.

**Android 13 Notification Permission**
Apps targeting API 33+ must request `POST_NOTIFICATIONS` at runtime. Braze provides a built-in opt-in prompt, but custom flows require explicit permission request lifecycle management. Users who deny permission will not receive push — design re-prompt strategy accordingly.

**TV & OTT Constraints**
Android TV and Fire TV lack touch input and may lack Google Play Services. Confirm:
- Push via FCM still works if Play Services are available (Fire TV supports this)
- In-app messages and content cards require leanback-compatible UI adaptations
- Analytics and session tracking behave identically to phone SDK

**SDK Initialization**
Always initialize Braze in `Application.onCreate()`, not in `Activity.onCreate()`. Late initialization causes missed session starts and silent push failures.

## Quick Reference

```kotlin
// Android 13 notification permission check
if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
    requestPermissions(arrayOf(Manifest.permission.POST_NOTIFICATIONS), REQUEST_CODE)
}
```

```gradle
// Braze Android SDK dependency (check docs for latest version)
implementation "com.braze:android-sdk-ui:+"
```

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Initializing SDK in `Activity` | Move to `Application.onCreate()` |
| Not requesting `POST_NOTIFICATIONS` on API 33+ | Add runtime permission request before push opt-in UI |
| Assuming TV has Google Play Services | Check at runtime with `GoogleApiAvailability` |
| Using deprecated `Appboy` class references | Migrate to `Braze` / `BrazeConfig` API surface |
| Omitting ProGuard rules | Add Braze-provided rules to avoid runtime crashes in release builds |

## Source Notes

Source documentation for Android Platform and Android 13 Updates topics had limited coverage at assembly time. Supplement with the official Braze Android SDK documentation and Android developer guides for API-level specifics. The TV & OTT section synthesizes platform compatibility guidance from Braze's multi-platform SDK docs.

---

`★ Insight ─────────────────────────────────────`
The "Source Notes" section at the bottom is a pattern worth noting for plugin skills built from sparse topics — it signals to the agent that authoritative upstream docs should be consulted rather than treating the skill as exhaustive. This is especially important for Android 13 specifics, which evolve with each OS release and SDK bump.
`─────────────────────────────────────────────────`
