---
name: tester-debugging
description: >-
  Diagnoses SDK issues, push notification failures, and integration problems
  across Braze implementations.
metadata:
  role: braze-tester
  topics:
    - sdk-integration-debugging
    - sdk-integration-verbose-logging
    - sdk-integration-reading-verbose-logs
    - push-notifications-troubleshooting
    - push-notifications-sending-test-messages
    - push-notifications-deep-linking-troubleshooting
    - contributing-troubleshooting
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
Skill bodies are written in imperative/infinitive form for AI consumption — verb-first instructions rather than second-person prose. This isn't just style; it reduces ambiguity about who acts. A skill body is effectively a procedure manual for a future Claude instance that has no memory of writing it.
`─────────────────────────────────────────────────`

# Debugging & Troubleshooting

Diagnose and resolve SDK integration failures, push notification delivery issues, and messaging channel problems across Braze implementations. Apply this skill as the primary lens when a Braze-powered feature behaves unexpectedly — before assuming configuration errors or back-end faults, systematically rule out integration, credential, and SDK initialization issues.

This skill is oriented around **root cause analysis**: surface the actual failure point rather than applying workarounds. Each diagnostic procedure moves from observable symptom to underlying cause.

---

## Scope

Apply this skill when:

- Push notifications fail to deliver or render incorrectly
- SDK initialization is suspected to be incomplete or misconfigured
- Deep links open the app but route to the wrong view
- In-app messages or Content Cards are not appearing
- A Braze feature works in staging but fails in production
- The source of a failure is unclear and structured investigation is needed

---

## Diagnostic Lens

Every troubleshooting session follows this sequence:

1. **Isolate the channel** — determine whether the failure is in push, in-app messages, Content Cards, or the SDK layer itself
2. **Enable observability** — turn on verbose logging or use the dashboard debugger before attempting fixes
3. **Read the signal** — interpret log output or debugger state against known failure patterns
4. **Form a hypothesis** — identify one most-likely root cause before making changes
5. **Verify the fix** — use test push sends or controlled repros to confirm resolution, not just absence of error

Do not skip to configuration changes without completing steps 1–3. Premature fixes mask the actual failure and complicate future diagnosis.

---

## Topics Synthesized

### SDK Verbose Logging

Verbose logging exposes SDK initialization state, server communication, and per-channel activity (push registration, in-app message fetch, Content Card sync). Enable it at SDK startup to capture the full initialization sequence. Verbose output is the primary diagnostic signal when a feature silently fails.

Key use: confirm whether the SDK successfully initialized, whether push tokens were registered, and whether network requests to Braze endpoints are succeeding.

### Reading Verbose Logs

Verbose log output follows predictable patterns per channel. Use this knowledge base to interpret initialization confirmations, token registration events, server response codes, and channel-specific delivery signals.

Key use: distinguish between "SDK did not initialize" vs. "push token was not registered" vs. "message was fetched but not displayed" — each points to a different fix.

### SDK Debugging (Dashboard Debugger)

The Braze dashboard includes a built-in SDK debugger that surfaces integration issues without requiring verbose logging to be enabled in a production build. Access it from the dashboard to inspect a specific device's SDK state.

Key use: production diagnosis without code changes; useful when verbose logging has been stripped from release builds or when investigating a user-reported issue.

### Deep Linking Troubleshooting (iOS)

Deep link failures typically present as the app opening to the wrong view, or failing to open at all. The root causes cluster around three areas: scheme registration in `Info.plist`, missing or incorrect delegate implementations, and URL routing logic.

Key use: resolve "app opens but wrong screen" and "custom scheme not handled" failures with a structured verification sequence before touching routing logic.

### Sending Test Push Messages

Test push sends verify push integration and rendering before campaigns reach real users. Tests can target individual devices or internal groups. Use test sends to confirm token registration, certificate validity, and payload rendering independently of campaign configuration.

Key use: isolate whether a push failure is integration-side (token, certificate, SDK) vs. campaign-side (targeting, scheduling, content) by confirming the pipeline works for a controlled test recipient.

### Push Notification Troubleshooting

Push failures span multiple layers: APNs/FCM credential configuration, device token registration, SDK push handling delegates, and notification content rendering. A structured troubleshooting sequence prevents misattributing credential issues to code issues or vice versa.

Key use: systematic elimination of failure layers when push notifications are not delivered or not displayed.

### Contributing Troubleshooting

When a specific failure pattern is not covered by the above topics, document the diagnostic steps taken, the root cause identified, and the resolution. This knowledge feeds back into the skill's reference base and improves future diagnosis for the same pattern.

Key use: capture novel failure modes so they become known patterns rather than requiring rediscovery.

---

## Procedure Priorities

When multiple failure signals are present, triage in this order:

| Priority | Check | Reason |
|----------|-------|--------|
| 1 | SDK initialization logs | All channels depend on SDK init |
| 2 | Push token registration | Delivery impossible without valid token |
| 3 | APNs/FCM credentials | Certificate expiry is a silent failure mode |
| 4 | Delegate implementations | Missing delegates suppress delivery silently |
| 5 | Deep link routing | Only relevant after delivery is confirmed |
| 6 | Message content/rendering | Only relevant after delivery is confirmed |

---

## Constraints

- Always use test push sends to verify fixes — do not assume a configuration change resolved the issue without confirmation
- Verbose logging should be disabled in production builds; use the dashboard debugger for live investigation
- Treat "no error in logs" as incomplete information, not as confirmation of correct behavior — some failure modes are silent

`★ Insight ─────────────────────────────────────`
The priority triage table above reflects a key architectural reality of the Braze SDK: each messaging channel is layered on top of the SDK core. A failure at a lower layer (init, token registration) will silently break all channels above it — so checking credentials before SDK state wastes time. The table encodes that dependency chain as a diagnostic shortcut.
`─────────────────────────────────────────────────`
