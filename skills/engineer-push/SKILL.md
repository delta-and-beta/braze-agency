---
name: engineer-push
description: >-
  Implementation of push notifications across iOS, Android, and web platforms
  including registration, advanced options, and platform-specific configuration.
metadata:
  role: braze-engineer
  topics:
    - message-building-by-channel-push-ios
    - message-building-by-channel-push-android
    - message-building-by-channel-push-web
    - message-building-by-channel-push-creating-a-push-message
    - message-building-by-channel-push-push-registration
    - message-building-by-channel-push-advanced-push-options
    - message-building-by-channel-push-types
    - message-building-by-channel-push-users-and-subscriptions
    - message-building-by-channel-push-ios-utilizing-badge-count
    - message-building-by-channel-push-best-practices
    - message-building-by-channel-push-faq
    - message-building-by-channel-push-testing
    - message-building-by-channel-push-troubleshooting
    - message-building-by-channel-push-push-error-codes
    - message-building-by-channel-push-push-reporting
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
Nick skills use a two-layer hierarchy: roles (agents) own skills, and skills own topic references. A SKILL.md is the synthesized "expertise layer" — it tells Claude *when* to route here and what the skill's lens is, while the topic `references/*.md` files carry the atomic detail. The skill file itself is intentionally higher-level.
`─────────────────────────────────────────────────`

# Push Notification Engineering

## Scope

This skill covers end-to-end push notification implementation in Braze across **iOS**, **Android**, and **web** platforms. It synthesizes platform-specific registration flows, delivery mechanics, token lifecycle management, error handling, and advanced configuration options.

Use this skill when implementing, debugging, or optimizing push notification delivery — from SDK registration through advanced options like badge counts, rich media, and multi-platform targeting.

## Lens: Platform-Specific Implementation

This skill is filtered through an **engineering lens**: emphasis is on registration flows, token mechanics, platform credential systems (APNs, FCM), subscription state, and delivery path — not campaign strategy or copywriting.

Questions answered by this skill:
- How does push token registration work on each platform?
- Why is a user not receiving pushes despite being opted in?
- What do specific FCM/APNs error codes mean and how are they resolved?
- How do iOS and Android differ in push permissions, payloads, and delivery behavior?
- How is web push implemented with service workers and VAPID keys?
- How are badge counts, notification channels, and advanced payload options configured?

## Topics

### Registration & Subscription

- **Push Registration** — SDK registration flows for iOS (APNs), Android (FCM), and web (service worker + VAPID). Covers provisional authorization, foreground/background handling, and token update mechanics.
- **Push Users and Subscriptions** — Subscription state machine (`opted_in`, `subscribed`, `unsubscribed`). How tokens are assigned and reassigned on logout, and how subscription groups interact with push eligibility.

### Platform-Specific Implementation

- **iOS Push Notifications** — APNs integration, provisional authorization, Notification Service Extensions for rich media, and silent push behavior.
- **Android Push Notifications** — FCM setup, notification channels (required Android O+), notification importance levels, and foreground vs. background delivery behavior.
- **Web Push Notifications** — Service worker registration, VAPID key management, push permission prompts, and cross-browser delivery differences.
- **iOS Badge Count** — Programmatic badge management, clearing badge on app open, and server-side badge sync via Braze.

### Message Creation & Configuration

- **Creating a Push Message** — Composer fields, character limits by platform, asset attachment, action buttons, and TTL settings.
- **Push Notification Types** — Silent pushes, notification-only, data-only, and alert pushes. Platform support matrix.
- **Advanced Push Options** — Priority, collapse keys, mutable content, image attachments, deep link handling, custom key-value pairs, and iOS sound files.

### Quality & Operations

- **Push Best Practices** — Opt-in timing, permission prompt patterns, frequency capping, segmentation hygiene, and re-permission flows.
- **Push Troubleshooting** — Diagnostic checklist covering subscription status, certificate/FCM credential validity, payload validation, and delivery pipeline inspection.
- **Push Error Codes** — Platform-specific error taxonomy: APNs codes (`BadDeviceToken`, `Unregistered`, `PayloadTooLarge`) and FCM errors (`InvalidRegistration`, `NotRegistered`, `MessageTooBig`). Root cause and remediation for each.
- **Push Testing** — Test send workflows, device log inspection, and Braze test send vs. campaign preview differences.
- **Push Reporting** — Delivery, open, and bounce metrics. Distinguishing direct opens from influenced opens.
- **Push FAQ** — Multi-user device token reassignment, handling GDPR deletion with push tokens, and devices without push capability.

## Platform Requirements at a Glance

| Platform | Credential | Permission Model | Key Constraint |
|----------|------------|-----------------|----------------|
| iOS | APNs certificate or .p8 key | Explicit prompt required | Token invalidates on app reinstall |
| Android | FCM Server Key or Service Account | Auto (API ≤32); prompt (API 33+) | Channels required (API 26+) |
| Web | VAPID key pair | Browser permission prompt | Requires HTTPS + service worker |

## Routing Signals

Route queries to this skill when the request involves:
- Setting up or debugging push credentials (APNs, FCM, VAPID)
- Token registration, lifecycle, or reassignment behavior
- Platform-specific push payload construction or limits
- Subscription state and opt-in flow implementation
- Delivery failures, bounce codes, or error resolution
- Advanced payload features: rich media, action buttons, silent push, badge counts
- Web push service worker setup or cross-browser compatibility

`★ Insight ─────────────────────────────────────`
The "Platform Requirements at a Glance" table is a high-value addition to skills — it gives Claude a fast-path answer for comparison queries ("iOS vs Android push setup") without needing to load individual topic files. Synthesized tables in the skill layer are what justify having both a skill layer and a topic layer in Nick's hierarchy.
`─────────────────────────────────────────────────`
