---
name: architect-system-design
description: >-
  Core Braze platform architecture including network, storage, localization, and
  geofencing infrastructure.
metadata:
  role: braze-architect
  topics:
    - getting-started-architecture-overview
    - developer-guide-network
    - developer-guide-storage
    - developer-guide-localization
    - developer-guide-geofences
    - developer-guide-live-notifications
    - developer-guide-references
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
Nick's skill files serve as **routing context** for Claude — they don't need to teach everything, just enough to tell Claude *when* to reach for this skill and what mental model to apply. The "lens" is critical: it shapes *how* Claude interprets the topic references it loads, not just *which* ones.
`─────────────────────────────────────────────────`

Here is the generated skill file content:

---

# System Architecture

## Overview

This skill covers the foundational infrastructure of the Braze platform — how it stores data, routes messages, localizes content, and tracks physical location. Apply a **systems thinking lens**: every configuration decision has downstream effects on latency, personalization fidelity, and SDK behavior across platforms.

Use this skill when reasoning about cross-cutting platform concerns rather than feature-specific implementation details.

## Scope

This skill synthesizes the following topic areas:

| Topic | What It Covers |
|-------|----------------|
| **Architecture Overview** | Platform topology, SDK integration points, data flow between client and Braze servers |
| **Network Configuration** | SDK endpoint setup, cluster/region selection, SDK tab variants per platform |
| **Storage** | Device properties collected by default, per-platform property availability (Web, iOS, Android), data retention behavior |
| **Localization** | Supported SDK languages, device language matching, in-app message localization behavior |
| **Geofences** | Location-triggered messaging, geofence infrastructure, platform-specific geofence constraints |
| **Live Notifications** | Real-time notification delivery architecture (note: upstream documentation for this topic was sparse) |
| **Developer References** | Canonical SDK reference docs, GitHub repos, and sample apps per platform |

## Lens: Systems Thinking on Infrastructure

When using this skill, reason about the **system as a whole** before advising on individual components:

- **Data flow**: Where does a device property originate, how does it travel to Braze servers, and where is it consumed (segmentation, personalization, analytics)?
- **Cross-platform consistency**: SDK behavior often varies by platform (Web vs iOS vs Android). The Braze docs use `{% sdktabs %}` and `{% multi_lang_include %}` macros — platform-specific behavior lives in partials, not the surface page.
- **Configuration blast radius**: Network endpoint changes, storage opt-outs, and locale settings affect the entire SDK session, not individual features.
- **Infrastructure constraints**: Geofences and live notifications have hard platform-imposed limits (OS permissions, background execution budgets) that shape what Braze can offer.

## When to Use This Skill

Reach for this skill when:

- Advising on SDK initialization, cluster selection, or endpoint configuration
- Reasoning about which device properties Braze collects and how to opt out
- Explaining how localization works at the SDK level vs. content level
- Designing geofence-triggered campaigns with awareness of OS-level constraints
- Answering "why does behavior differ between Web and mobile?" questions
- Orienting a new integration by mapping the full data flow from device to dashboard

## Key Principles

**Properties vs. Events**: Device properties (storage layer) are collected once and updated; events are time-series. Confusing these leads to incorrect segmentation logic.

**Platform divergence is intentional**: Braze SDKs are not wrappers around a shared core — they are platform-native. Assume behavioral differences until the reference docs confirm equivalence.

**Geofences are OS-mediated**: Braze geofence triggering depends on OS location permissions and background execution limits. Infrastructure design cannot override platform constraints.

**Localization applies to SDK UI only**: SDK language support covers Braze-generated messages (e.g., connectivity errors). Content localization (in-app message copy) is a separate concern handled at the campaign level.

## Developer Reference Index

For implementation work, consult the canonical per-platform references:

- **Reference docs**: Platform-specific SDK documentation (see `developer-references` topic)
- **Repositories**: Official Braze SDK GitHub repos per platform
- **Sample apps**: Provided per platform for integration validation

> The `developer-references` topic file contains the full cross-platform SDK resource table.

---

`★ Insight ─────────────────────────────────────`
Notice how the skill avoids restating content from the topic reference files — it instead tells Claude *how to think* when it loads those files. The "lens" section is doing the heaviest lifting: it converts raw documentation into architectural judgment. The table of topics acts as a routing aid, helping Claude decide which reference file to load for a given query.
`─────────────────────────────────────────────────`
