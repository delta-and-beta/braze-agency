---
name: engineer-ios-setup
description: >-
  Covers initial SDK installation, storage configuration, push notification
  setup, and changelog tracking for the legacy iOS SDK.
metadata:
  role: braze-engineer
  topics:
    - ios-initial-sdk-setup
    - ios-storage
    - ios-push-notifications
    - ios-changelog
    - ios-changelog-swift
    - ios-changelog-objc
    - ios-sample-apps
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
- Plugin skills (like this Braze one) are **domain reference docs** for agent personas, not discipline-enforcement rules — they tell an agent *what it knows*, not how to behave
- The "implementation-first lens" is the key shaping force here: every section should lead with the actionable integration step, not the conceptual explanation
- Changelog topics serve a subtle but important role in setup skills — they anchor the agent's version awareness so it doesn't recommend deprecated patterns
`─────────────────────────────────────────────────`

Here is the generated skill file:

---

# iOS SDK Setup & Configuration

## Scope

This skill covers the end-to-end process of getting the Braze iOS SDK installed, configured, and running correctly in an iOS application. It addresses initial integration, device property collection, push notification setup, and version tracking across both Swift and Objective-C SDK lineages.

Use this skill when:
- Setting up the Braze iOS SDK for the first time in a new app
- Configuring storage and device property collection
- Integrating or debugging rich push notifications on iOS
- Determining which SDK version to adopt, or understanding what changed between versions
- Looking up sample app references to validate SDK behavior before shipping

Do not use this skill for server-side push delivery, cross-platform SDK setup (Android, Web, Flutter), or advanced channel features (Content Cards, Feature Flags) — those require separate skills.

## Lens: Implementation-First

This skill approaches iOS SDK work from the perspective of a Braze engineer whose primary job is getting the SDK running correctly. Conceptual depth matters only insofar as it informs integration decisions. The dominant questions are:

- What is the minimum required to make this work?
- What will silently break if I skip a step?
- Which SDK version should I be on, and are there breaking changes I need to handle?

## Topics Synthesized

### iOS Initial SDK Setup

The Braze iOS SDK provides session tracking and in-app messaging out of the box. No additional configuration is needed for these baseline capabilities. All other channels (push, Content Cards, Feature Flags) require explicit integration steps layered on top of the base install.

Key integration checkpoints:
- SDK initialized before any Braze method calls (typically in `AppDelegate.application(_:didFinishLaunchingWithOptions:)`)
- API key and endpoint configured correctly for the target environment
- Session lifecycle wired up so Braze can track opens and closes

Additional features are opt-in and must be enabled individually — the base SDK will not activate them automatically.

### iOS SDK Storage — Device Properties

The SDK collects device-level properties by default to enable personalization (device type, locale, time zone). These properties are sent automatically and do not require developer configuration unless the default set needs to be restricted.

When to act on this:
- If your app has privacy requirements that limit device data collection, review the default property list and configure the SDK to exclude specific fields
- If campaign targeting by locale or time zone is not working, verify that device property collection has not been inadvertently disabled

The SDK captures properties at session start; changes to collection configuration take effect on the next session.

### iOS Push Notifications — Rich Media

Rich push (images, GIFs, video, audio) requires iOS 10+ and a **Notification Service Extension** added to the Xcode project. This is a developer-side requirement — it cannot be configured from the Braze dashboard alone.

Integration checklist:
1. Add a Notification Service Extension target to the Xcode project
2. Add the Braze Push Story framework (or BrazeKit dependency) to the extension target
3. Implement `didReceive(_:withContentHandler:)` in the extension to process rich content
4. Ensure App Groups are configured if sharing data between the extension and the main app

A missing or misconfigured service extension is the most common cause of rich push rendering failures. Standard push (text-only) works without the extension.

### iOS SDK Changelog

Version history for both the Swift SDK (`braze-swift-sdk`) and the legacy Objective-C SDK (`Appboy-iOS-SDK`) is maintained in their respective changelogs. Consult changelogs:
- Before upgrading to understand breaking changes and migration steps
- When a feature behaves unexpectedly after an upgrade
- To confirm when a specific capability was introduced or deprecated

**Swift SDK (`braze-swift-sdk`):** Primary SDK for new integrations. Follows semantic versioning. Breaking changes are documented with migration notes in the changelog. API surface differs from the Objective-C SDK.

**Objective-C SDK (`Appboy-iOS-SDK`):** Legacy SDK. New integrations should use the Swift SDK. If maintaining an existing Objective-C integration, the changelog documents deprecations and the migration path to the Swift SDK.

When choosing between SDK lineages: use the Swift SDK for all new projects. For existing Objective-C projects, the migration to the Swift SDK is documented and recommended but not required.

### iOS Sample Apps

The Braze iOS SDK repository ships sample applications that demonstrate SDK features in isolation. Use them to:
- Validate SDK behavior before implementing in your own app
- Reproduce integration issues in a clean environment
- Reference correct initialization and feature configuration patterns

Sample apps are located in the iOS SDK repository. They are runnable as-is after supplying an API key and endpoint in the sample configuration file.

## Quick Reference

| Task | What to check |
|---|---|
| SDK not initializing | API key, endpoint, initialization timing in AppDelegate |
| Rich push not rendering | Notification Service Extension present and linked |
| Device properties missing | Collection configuration, session lifecycle |
| Upgrade breaking changes | `braze-swift-sdk` changelog (Swift) or `Appboy-iOS-SDK` changelog (ObjC) |
| Reproduce an issue cleanly | Sample apps in SDK repository |
| New project SDK choice | Swift SDK (`braze-swift-sdk`) |

## Common Mistakes

**Initializing the SDK after first use.** Any Braze call before initialization silently fails. Initialize in `application(_:didFinishLaunchingWithOptions:)` before any other SDK usage.

**Omitting the Notification Service Extension for rich push.** Rich media will not display. Standard push continues to work, which can mask the missing extension during testing if only text-only notifications are sent.

**Using the Objective-C SDK for new projects.** The Swift SDK is the current, actively maintained implementation. New integrations on the Objective-C SDK will encounter an increasing gap in feature support.

**Ignoring changelog breaking changes on upgrade.** The Swift SDK uses semantic versioning; major version bumps contain breaking API changes that require code changes to resolve. Always read the changelog before upgrading across major versions.
