---
name: tester-sdk-validation
description: 'SDK integration testing, platform verification, and developer guide tutorials.'
metadata:
  role: braze-tester
  topics:
    - developer-guide-tutorials
    - developer-guide-home
    - developer-guide-getting-started
    - developer-guide-platforms
    - ios-sample-apps
    - api-postman-collection
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
The skill development guide emphasizes **progressive disclosure** — SKILL.md should be lean (1,500–2,000 words) with a clear "lens" statement up front. Since several source topics had minimal content, I'll synthesize what's solid (Getting Started Hub, iOS Sample Apps) and frame sparse topics (Developer Tutorials, Platforms Hub) as pointers rather than fabricating content.
`─────────────────────────────────────────────────`

# SDK Integration Validation

## Purpose

This skill covers the full lifecycle of verifying that a Braze SDK integration is correctly set up, configured, and functioning across platforms. Apply this skill when validating SDK initialization, confirming data collection behavior, testing push token registration, or confirming that session tracking and user profile syncing work as expected.

The lens is **integration verification**: not how to write application code, but how to confirm that an existing integration behaves correctly — from first-time setup through platform-specific validation.

## When to Use This Skill

Apply this skill for queries such as:
- "Is my Braze SDK set up correctly?"
- "How do I verify SDK initialization on iOS / Android / Web?"
- "What should I check after integrating the Braze SDK?"
- "How do I test push notification registration?"
- "Where can I find sample apps to validate my SDK behavior?"
- "How do I use the Postman collection to verify API calls?"
- "What does a working Braze SDK integration look like?"

## SDK Overview

The Braze SDK performs three categories of work automatically once initialized:

1. **User profile sync** — Collects and consolidates user data into unified profiles.
2. **Automatic data collection** — Captures session data, device metadata, and push tokens without additional instrumentation.
3. **In-app channel support** — Enables push notifications, in-app messages, and Content Cards once the SDK is active.

Validation work centers on confirming these three behaviors are functioning, not on debugging application logic.

## Integration Verification Approach

### Initialization Checks

To confirm SDK initialization is working:

- Verify the API key and endpoint are correctly set in the SDK configuration.
- Confirm the SDK initializes before any user identification calls.
- Check that session start events appear in the Braze dashboard within 60 seconds of app launch.

### Data Collection Verification

To confirm automatic data collection is active:

- Confirm device info (OS version, model, locale) appears on the user profile.
- Verify push token registration occurs on the first app open after permission grant.
- Check that session open/close events fire correctly and session duration is tracked.

### Platform-Specific Validation

Validation steps vary by platform. The core questions remain consistent:

| Platform | Key Check |
|----------|-----------|
| iOS | Push entitlements, `UNUserNotificationCenter` delegate, `application(_:didRegisterForRemoteNotificationsWithDeviceToken:)` fires |
| Android | `FirebaseMessagingService` registration, notification channels created |
| Web | Service worker registered, browser push permission granted, `braze.requestPushPermission()` called |
| React Native / Flutter | Bridge initialized before any Braze calls, native modules linked correctly |

Consult platform-specific documentation for the full validation checklist for each target.

## iOS Sample Apps

The Braze iOS SDK ships sample applications directly in the SDK repository. Use these to:

- **Baseline comparison** — Run a sample app against the same environment to confirm whether observed behavior is SDK-level or integration-level.
- **Feature validation** — Test Content Cards, in-app messages, and push notifications in isolation before replicating in the production app.
- **Reproduction cases** — Isolate unexpected behavior in a minimal sample before filing a support ticket.

Sample apps are located in the iOS SDK repository under the standard sample apps directory. Run them against your own workspace API key and endpoint to test with real data.

## API Postman Collection

The Braze API Postman Collection provides a structured set of pre-built requests for validating server-side and REST API integrations. Use the collection to:

- **Confirm user data ingestion** — POST to the `/users/track` endpoint and verify the profile updates in the dashboard.
- **Test event logging** — Send custom events via REST and confirm they appear in user activity.
- **Validate export endpoints** — Pull user data programmatically to confirm the SDK-collected fields match expected values.

Import the collection, set the `api_key` and `instance_url` environment variables for your workspace, then use the pre-built requests to confirm your integration endpoints are reachable and returning expected responses.

## Getting Started Resources

### Developer Home and Tutorials

The Braze developer documentation provides a central entry point for integration guides, SDK changelogs, and platform-specific walkthroughs. When verifying a new integration:

1. Start at the SDK overview to confirm the SDK version in use matches current requirements.
2. Follow the platform-specific getting started guide to verify each required setup step was completed.
3. Review the developer tutorials for platform-specific validation walkthroughs.

Source availability for these resources varies — when source documentation is sparse for a specific platform, refer directly to the Braze developer portal or SDK repository for the authoritative setup guide.

### Platforms Hub

The Platforms Hub aggregates SDK documentation by target platform. Use it as a navigation aid when validating across multiple platforms — each platform entry links to its initialization guide, changelog, and known issues. When validating a cross-platform integration, review each platform's entry independently rather than assuming behavior is consistent.

## Validation Workflow Summary

To validate an SDK integration end-to-end:

1. **Initialize with correct credentials** — API key, endpoint, and SDK version confirmed.
2. **Launch the app and observe session events** — Confirm session open fires within 60 seconds.
3. **Check the user profile** — Device info, push token, and first session timestamp present.
4. **Test a push send** — Use the Braze dashboard or Postman to trigger a push; confirm receipt.
5. **Compare against a sample app** — If behavior diverges, use iOS/Android sample apps to isolate the issue.
6. **Verify via REST** — Use the Postman collection to confirm user data is accurate on the server side.

## Scope Boundaries

This skill covers **verification and validation** of SDK integrations, not initial implementation. For implementation guidance (writing initialization code, platform-specific SDK setup from scratch), refer to the platform-specific getting started guides in the source documentation.

Queries about campaign targeting, segmentation logic, or Braze dashboard configuration fall outside this skill's scope and are better addressed by campaign management or analytics skills.

`★ Insight ─────────────────────────────────────`
Two design choices worth noting: (1) The **validation workflow table** provides the integration verification "lens" concretely — Claude can immediately apply it rather than inferring it from prose. (2) Sparse topics (Developer Tutorials, Platforms Hub) are included as **navigation pointers** rather than fabricated content, which is honest about source availability while still giving Claude actionable routing guidance.
`─────────────────────────────────────────────────`
