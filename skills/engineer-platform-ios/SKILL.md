---
name: engineer-platform-ios
description: >-
  Platform-specific implementation for iOS, Swift, and visionOS including
  version-specific guidance.
metadata:
  role: braze-engineer
  topics:
    - platforms-swift
    - platforms-swift-visionos
    - platforms-swift-ios-18
    - platforms-swift-ios-17
    - platforms-swift-ios-16
    - platforms-swift-ios-15
    - platforms-swift-ios-14
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
This is a **reference skill** (not a discipline-enforcing one) — its job is to help Claude retrieve and apply the right version-specific iOS/Braze knowledge. The key design choice is organizing by OS version as a lookup dimension while keeping the "lens" (native Swift engineer) front and center so Claude answers from the right perspective.
`─────────────────────────────────────────────────`

```markdown
# iOS & Swift Platform

## Scope

This skill covers platform-specific integration guidance for Braze on Apple's native platforms — iOS, visionOS, and watchOS — using the Braze Swift SDK. It synthesizes version-specific behavioral changes, new platform capabilities, and SDK compatibility notes across iOS 14 through iOS 18.

Use this skill when:
- Implementing or debugging Braze features on iOS/iPadOS/visionOS/watchOS
- A user asks about SDK behavior for a specific iOS version
- Integrating visionOS (Apple Vision Pro) support via Braze Swift SDK 8.0.0+
- Investigating what changed between OS releases that affects Braze behavior
- Determining which Braze features are available on a given Apple platform

Do **not** use this skill for Android, React Native, Flutter, or web integrations — those have their own platform skills.

## Lens: Native iOS Engineering

Answers through this skill come from the perspective of a **native iOS/Swift engineer** who:
- Works directly with the Braze Swift SDK (not wrappers or cross-platform SDKs)
- Understands Apple's OS version lifecycle and adoption curves
- Is familiar with Swift SDK integration patterns (SPM, CocoaPods, Carthage)
- Expects version-specific guidance, not lowest-common-denominator answers
- Needs to know exactly what is and isn't supported before shipping

## Topics Synthesized

### visionOS Support (Swift SDK 8.0.0+)
Available from **Braze Swift SDK 8.0.0+**, visionOS is Apple's spatial computing platform for Apple Vision Pro. This topic covers what Braze features are fully supported, what is limited or unavailable, and how to configure the SDK for visionOS targets.

### iOS 18 / watchOS 11 Updates
Key behavior changes in iOS 18 affecting Braze integrations — including Live Activities support on Apple Watch (watchOS 11) with no additional setup, optional watch interface customization, and any SDK compatibility notes introduced in this release cycle.

### iOS 17 Updates
Braze compatibility notes for iOS 17, covering SDK behavior changes, deprecated APIs, and new capabilities introduced in this cycle.

### iOS 16 Updates
Integration changes and new capabilities relevant to Braze when targeting iOS 16, including any feature availability or behavioral deltas from prior versions.

### iOS 15 Updates
Braze-relevant changes for iOS 15 targets, including SDK compatibility and feature support for this OS generation.

### iOS 14 Updates
Foundation-level iOS 14 considerations — including privacy framework changes (ATT) and feature availability for apps still supporting this OS version.

## Quick Reference: Feature × Platform Matrix

| Feature | iOS 14 | iOS 15 | iOS 16 | iOS 17 | iOS 18 | visionOS |
|---------|--------|--------|--------|--------|--------|---------|
| Analytics (sessions, events, purchases) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Live Activities | — | — | ✓ | ✓ | ✓ (watchOS 11) | — |
| visionOS SDK | — | — | — | — | — | Swift SDK 8.0.0+ |

*(Specific support details are in the individual version topics — consult them for complete coverage.)*

## Usage Pattern

When a user asks a version-specific question (e.g., "Does Braze support Live Activities on Apple Watch?"), first identify the relevant OS version topic, then answer from the native Swift engineering perspective — citing minimum SDK versions, required configuration, and any known limitations.
```

`★ Insight ─────────────────────────────────────`
The quick reference matrix is the most important structural choice here — it lets Claude (and human readers) instantly scan feature availability across versions without reading every topic. This "table as index" pattern is especially valuable for reference skills where the query is "does X work on iOS Y?" rather than "how do I do X?"
`─────────────────────────────────────────────────`
