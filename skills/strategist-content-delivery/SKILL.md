---
name: strategist-content-delivery
description: >-
  Content card creation, customization, and inbox management for persistent
  content delivery.
metadata:
  role: braze-strategist
  topics:
    - content-cards-customizing-cards
    - content-cards-customizing-cards-style
    - content-cards-customizing-cards-feed
    - content-cards-customizing-cards-behavior
    - content-cards-embedding-gifs
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
The skill-development guide emphasizes **progressive disclosure** — SKILL.md is the "always-loaded" layer that points Claude to topic references. For a synthesizing skill like this, the body should orient Claude around when/how to apply the lens, not reproduce the topic details already in the reference files.
`─────────────────────────────────────────────────`

Here is the generated skill file:

---

# Content Card Strategy

Content Cards are Braze's persistent in-app messaging surface — they sit in a dedicated inbox rather than interrupting the user. This skill applies a **content strategy lens** to Content Card implementation: guiding decisions around card type selection, inbox composition, lifecycle management, and personalization that align with long-term engagement goals.

Use this skill when planning or auditing a Content Card program, selecting card types for a campaign, customizing card presentation to match brand standards, or managing inbox behavior across platforms.

## Scope

This skill synthesizes the following topic areas:

| Topic | Focus |
|---|---|
| **Content Card GIFs** | Animated media in cards — format support, fallback behavior, platform constraints |
| **Customizing Content Cards** | Platform-specific customization APIs — overriding default card rendering |
| **Content Card Styling** | Visual properties (`title`, `cardDescription`, `imageUrl`) and per-platform style overrides |
| **Content Card Feed** | Feed composition, ordering logic, refresh behavior, and display lifecycle |
| **Content Card Behavior** | Impression tracking, click handling, dismissal, pinning, and expiration |

## Strategic Lens

Approach Content Cards as a **persistent content channel**, not a push-equivalent. The inbox persists between sessions, so card decisions compound over time — a poorly timed card that users never dismiss pollutes the feed indefinitely. Content strategy governs:

- **Card type selection**: Prioritize card type (image-only, captioned, classic) based on message hierarchy and content density, not just visual preference.
- **Feed composition**: Treat the inbox as a curated surface. Audit active cards regularly — expiration dates and max impression caps are editorial controls, not just technical settings.
- **Personalization depth**: Use Liquid templating and Connected Content to serve contextually relevant cards rather than generic broadcasts. A personalized card with lower reach outperforms a generic card shown to everyone.
- **Lifecycle management**: Cards without explicit expiration become permanent inbox debt. Define end dates at creation.

## When to Apply This Skill

Apply this skill when:

- Selecting between Content Card types for a campaign or onboarding flow
- Deciding how to order or surface cards in a feed (pinned vs. time-ordered vs. score-based)
- Customizing card rendering beyond Braze defaults to meet brand or accessibility standards
- Diagnosing why cards are not appearing, not refreshing, or not tracking impressions correctly
- Auditing an existing inbox for stale or conflicting cards
- Implementing animated (GIF) content within cards across iOS, Android, and Web

## Platform Considerations

Content Card behavior and customization APIs differ meaningfully across platforms. Before prescribing an implementation:

1. Confirm the target platform (iOS Swift/ObjC, Android Kotlin/Java, Web JS).
2. Check platform-specific constraints — GIF animation support, feed refresh triggers, and style override mechanisms vary.
3. Account for SDK version; some customization patterns require minimum SDK versions.

The topic references in this skill's `references/` directory contain platform-specific detail for each area above.

## Key Concepts

**Feed refresh** — The Content Card feed does not auto-refresh on every app open by default. Implement explicit refresh calls at session start or at logical re-entry points to ensure users see current cards.

**Impression vs. click tracking** — Impressions fire when a card enters the viewport (platform-defined threshold). Clicks are distinct events. Both feed into campaign analytics; ensure custom feed implementations fire the correct SDK methods or analytics will undercount.

**Card dismissal** — Users can dismiss cards (swipe-to-delete on mobile). Dismissed cards do not reappear. Design card content so dismissal is intentional, not accidental — avoid vague CTAs that prompt users to dismiss rather than engage.

**Pinned cards** — Pinned cards always appear at the top of the feed regardless of creation time. Use sparingly; pinning too many cards undermines feed freshness.

## Additional Resources

### Reference Files

For platform-specific implementation detail, consult the topic files in `references/`:

- **`references/content-card-gifs.md`** — GIF support by platform, fallback handling
- **`references/customizing-content-cards.md`** — Customization APIs per platform
- **`references/content-card-styling.md`** — Style properties, override patterns
- **`references/content-card-feed.md`** — Feed behavior, refresh, ordering
- **`references/content-card-behavior.md`** — Impression, click, dismissal, expiration

---

`★ Insight ─────────────────────────────────────`
- The **table mapping topics to focus areas** serves double duty: it tells Claude what's in scope AND gives it a triage layer — if a query is about "feed ordering" it can jump straight to the feed reference without loading all five topic files.
- The **"When to Apply" list** uses concrete action verbs ("Selecting", "Deciding", "Auditing") rather than abstract conditions — this mirrors the trigger-phrase pattern from the skill-development guide, making it easier for Claude to pattern-match against user intent.
- Lifecycle debt ("inbox debt") is framed as a **content strategy concern**, not a technical one — this keeps the strategist lens coherent even when discussing SDK behavior.
`─────────────────────────────────────────────────`
