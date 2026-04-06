---
name: engineer-sdk-setup
description: >-
  Covers initial SDK setup, platform overview, and integration patterns for
  onboarding new Braze implementations.
metadata:
  role: braze-engineer
  topics:
    - getting-started-sdk-overview
    - getting-started-platform-overview
    - getting-started-integration-overview
    - getting-started-customization-overview
    - getting-started-build-with-llm
    - developer-guide-sdk-integration
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
This is a **reference skill** (not a discipline-enforcing one), so the structure should optimize for retrieval and application — a clear scope declaration, scannable topic summaries, and practical orientation — rather than rationalization tables or pressure scenarios.
`─────────────────────────────────────────────────`

# SDK Setup & Integration

## Overview

This skill covers the initial bootstrapping of Braze SDKs across platforms — from choosing the right SDK for your environment to applying version management strategies and customization patterns. It synthesizes Braze's multi-platform documentation into an implementation-first reference for engineers setting up a new integration or onboarding an existing one.

**Lens:** Implementation-first. Every section prioritizes concrete setup steps and decision points over conceptual background.

## When to Use

Use this skill when:
- Starting a new Braze SDK integration on any platform
- Evaluating which SDK or integration pattern fits a project
- Planning a version upgrade strategy
- Choosing between default UI components and custom implementations
- Connecting AI tooling (e.g., Context7 MCP) to Braze documentation

## Topics Synthesized

### SDK Overview

The Braze SDK is a per-platform library that instruments your app for user data collection, messaging delivery, and engagement tracking. Core capabilities include:

- **Session tracking** — automatic open/close detection
- **Custom events and attributes** — manual instrumentation via `logCustomEvent()` / `setCustomUserAttribute()`
- **Push, in-app messages, Content Cards** — delivered and rendered by the SDK
- **Analytics flushing** — batched to Braze servers on a configurable interval

All SDKs share a common conceptual API surface, but method names, initialization patterns, and configuration keys differ per platform.

### Platform Overview

Braze maintains first-party SDKs across:

| Platform | Package | Notes |
|----------|---------|-------|
| iOS (Swift) | `braze-swift-sdk` | SwiftPM or CocoaPods |
| Android | `android-sdk` | Gradle dependency |
| Web | `@braze/web-sdk` | npm or CDN snippet |
| React Native | `@braze/react-native-sdk` | Bridges Swift + Android SDKs |
| Flutter | `braze_plugin` | Dart plugin wrapping native SDKs |
| Unity | `Appboy-Unity-SDK` | `.unitypackage` or UPM |
| Cordova / Expo / Xamarin | Various | Community-tier support |

**Decision rule:** Prefer the native SDK when you own the app layer. Use a wrapper SDK (React Native, Flutter) only when your project is already committed to that framework — wrapper SDKs add a bridge call overhead and lag behind native SDK releases.

### Integration Overview

A minimal Braze integration follows this sequence:

1. **Add SDK dependency** (package manager, CocoaPods, Gradle)
2. **Configure API key + endpoint** — set your workspace's REST endpoint and SDK API key (never the REST API key)
3. **Initialize on app launch** — call `Braze(configuration:)` (Swift), `Braze.configure()` (Android), or `braze.initialize()` (Web) as early as possible, typically in `AppDelegate`/`Application`/`index.html`
4. **Verify the connection** — send a test event; confirm it appears in the Braze dashboard under the test user's profile
5. **Instrument identity** — call `changeUser()` when a user logs in; this ties anonymous sessions to known profiles

**Common mistake:** Calling `changeUser()` before `initialize()` silently drops the call on some platforms. Always initialize first.

### Customization Overview

Braze offers three tiers of UI customization — often described internally as "crawl, walk, run":

| Tier | Effort | Approach |
|------|--------|----------|
| **Default** | Zero | Use `BrazeUI` / `BrazeInAppMessageUI` out of the box |
| **Configured** | Low | Override display delegates, set dismiss behavior, adjust animation |
| **Custom** | High | Implement your own UI using raw message data from the SDK delegate |

Start at the lowest tier that meets your requirements. Custom implementations require you to re-implement display logic that Braze's default UI handles automatically (impression tracking, click handling, message expiration).

### SDK Version Management

Braze SDKs follow [Semantic Versioning](https://semver.org/) (`MAJOR.MINOR.PATCH`):

| Version bump | Nature | Recommended action |
|---|---|---|
| `PATCH` | Bug fixes, no API change | Update promptly |
| `MINOR` | New features, backward-compatible | Update in next sprint |
| `MAJOR` | Breaking changes | Read migration guide; schedule dedicated upgrade work |

**Practical guidance:**
- Pin to a specific `MINOR` version in production (e.g., `~> 5.14`) to receive patches without unexpected API changes
- Subscribe to the SDK's GitHub releases feed for your platform
- Test against the new SDK in a feature branch before merging upgrades — particularly for `MAJOR` bumps that may change initialization signatures or remove deprecated methods

**Migration pattern:** When upgrading a `MAJOR` version, search your codebase for any symbol that appears in the SDK's deprecation warnings *before* upgrading. Resolve deprecations on the current version first, then upgrade.

### Building with an LLM (Context7 MCP)

For AI-assisted Braze development, connect your IDE to the Braze Docs MCP server via [Context7](https://context7.com/braze-inc/braze-docs):

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"]
    }
  }
}
```

With Context7 active, prefix prompts with `use context7` to pull live Braze documentation into the AI's context window. This is especially useful for:
- Looking up current initialization signatures after a `MAJOR` SDK bump
- Checking which features are supported on a specific platform
- Generating boilerplate setup code grounded in current docs

## Quick Reference

| Task | Where to start |
|------|---------------|
| First-time iOS setup | Swift SDK `BrazeKit` + `AppDelegate.application(_:didFinishLaunchingWithOptions:)` |
| First-time Android setup | `BrazeConfig.Builder` in `Application.onCreate()` |
| First-time Web setup | `braze.initialize(API_KEY, { baseUrl: ENDPOINT })` |
| Identify a logged-in user | `braze.changeUser(userId)` immediately after login |
| Verify integration | Dashboard → Test Users → trigger an event, confirm receipt |
| Upgrade SDK version | Resolve existing deprecations first, then bump |
| Add AI doc access | Context7 MCP → `use context7` prefix in prompts |

## Common Mistakes

- **Wrong API key type** — SDK initialization uses the *SDK API key*, not the REST API key. They are different credentials in the dashboard.
- **Calling `changeUser()` before `initialize()`** — silently fails; always initialize first.
- **Using default UI components and overriding rendering** — if you override the delegate and return `false` from `display()`, you must handle impression/click tracking yourself.
- **Pinning to `LATEST` in production** — a `MAJOR` release will break your build unexpectedly; always pin to a range.
