---
name: strategist-in-app-messaging
description: >-
  Strategic use of in-app messages including customization, conditional display,
  and deferred triggers.
metadata:
  role: braze-strategist
  topics:
    - in-app-messages-customization
    - in-app-messages-tutorials
    - in-app-messages-gifs
    - in-app-messages-tutorials-deferring-triggered-messages
    - in-app-messages-tutorials-customizing-message-styling
    - in-app-messages-tutorials-conditionally-displaying-messages
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
This is a **knowledge synthesis skill** — it doesn't teach Claude how to do something procedurally, but rather *how to think* about a domain. The "lens" metadata is the key differentiator: it tells Claude which angle to approach questions from when multiple skills might cover overlapping technical territory.
`─────────────────────────────────────────────────`

# In-App Messaging Strategy

## Purpose

Apply this skill when advising on Braze in-app messaging decisions — covering when to show messages, how to adapt their presentation, and how to control display timing to maximize user engagement without disrupting experience.

This skill synthesizes technical capabilities (customization APIs, trigger deferral, conditional logic, GIF support) through a **user engagement lens**: the right message at the right moment, styled to feel native to the product, shown only when it serves the user's current context.

## Scope

This skill covers the following topics:

| Topic | What It Addresses |
|---|---|
| **In-App Message Customization** | SDK-level customization options per platform (iOS, Android, Web) |
| **Customizing Message Styling** | Using `message.extras` / `inAppMessage.extras` KVPs to apply dynamic styles from the dashboard |
| **Conditionally Displaying Messages** | Intercepting triggered messages before display and applying business logic to suppress or allow them |
| **Deferring Triggered Messages** | Capturing triggered messages, holding them, and restoring them at contextually appropriate moments |
| **In-App Message GIFs** | Embedding animated GIFs with platform-specific setup requirements |
| **In-App Message Tutorials** | Foundational patterns for tutorial-style IAM flows |

## Engagement Lens

When answering questions through this skill, reason from the user's perspective first, then map backward to implementation. Key principles:

- **Timing over volume**: A deferred message shown at a natural pause is more effective than an immediate interrupt during active user flow
- **Context awareness**: Conditional display logic should model what the user is trying to accomplish, not just what segment they belong to
- **Visual coherence**: Style customization via KVPs should make messages feel like part of the product, not Braze templates
- **Progressive disclosure in UX**: Multi-step or tutorial-style IAMs should match the pacing of user onboarding or feature discovery

## When to Apply This Skill

Apply this skill when the conversation involves:

- Deciding *when* to show an in-app message (timing, triggers, deferral)
- Deciding *whether* to show a message based on app state or user context
- Customizing message appearance to match product design
- Evaluating the user experience impact of IAM frequency or placement
- Planning tutorial flows or feature announcement sequences using in-app messages
- Embedding rich media (GIFs) in IAMs and evaluating platform readiness

## Core Patterns

### Conditional Display

Intercept messages before display using the SDK's delegate/listener pattern. Apply custom logic — app state, user activity, screen context — to decide whether `display()` or `suppress()`. Store suppressed messages for later if the content remains relevant.

### Deferral for Contextual Fit

When a message triggers at an inconvenient moment (e.g., mid-transaction, during onboarding step), capture and defer rather than suppress. Restore via the SDK's re-display mechanism at the next appropriate moment (e.g., after task completion, on next app open).

### KVP-Driven Styling

Define visual parameters in the Braze dashboard as key-value pairs. Read them via `message.extras` (Web) or `inAppMessage.extras` (Android/Swift) at display time. Apply dynamically to override default styles — all values arrive as strings, so parse numerics and booleans explicitly.

### GIF Support

GIF embedding requires platform-specific configuration beyond default SDK setup. Evaluate platform support before recommending GIFs in IAMs; for unsupported platforms, recommend static alternatives or Lottie animations.

## Strategic Guidance Approach

When advising on IAM strategy:

1. **Clarify the user moment** — what is the user doing when this message would appear?
2. **Evaluate interrupt cost** — will showing this message break user flow or feel helpful?
3. **Recommend the right control mechanism** — conditional display (show/don't show), deferral (show later), or styling (make it feel right)
4. **Identify platform constraints** — GIF support, SDK version requirements, and KVP parsing behavior vary by platform
5. **Validate the fallback** — what happens if the message is suppressed or deferred indefinitely?
