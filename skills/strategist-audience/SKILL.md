---
name: strategist-audience
description: >-
  Defines audience segments, manages content templates and translations, and
  curates media assets.
metadata:
  role: braze-strategist
  topics:
    - export-segments-get-segment
    - export-segments-get-segment-details
    - export-user-data-post-users-segment
    - endpoints-subscription-groups
    - endpoints-templates
    - endpoints-translations
    - endpoints-media-library
    - endpoints-user-data
    - export-segments
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
- This skill bridges raw API documentation (endpoint specs) and strategic intent — the "lens" transforms technical capability into audience-centric workflows
- Without YAML frontmatter, this file's discoverability is handled by the plugin registry externally, so content can optimize for depth over CSO keyword density
- The topics are heavily endpoint-oriented, so the skill needs to provide the "why" layer: when a strategist reaches for each API, not just how it works
`─────────────────────────────────────────────────`

# Audience & Content Strategy

## Overview

This skill covers how a Braze strategist defines and manages audiences, personalizes content at scale, and governs media and translation assets across the subscriber lifecycle. It synthesizes Braze's segmentation, template, subscription, and media APIs through a strategic lens: **audience targeting, content personalization, and subscriber lifecycle planning**.

Use this skill when the task involves deciding *who* receives a message, *what* content they see, or *how* their subscription and profile state should be managed — rather than just executing a single API call.

## When to Use

- Designing or auditing audience segmentation strategy
- Planning content personalization across languages or regions
- Managing subscriber opt-in/opt-out state across groups
- Exporting user cohorts for analysis, targeting, or downstream activation
- Curating or uploading media assets for use in campaigns
- Merging duplicate user profiles to maintain clean audience data
- Building or updating content templates for reuse across campaigns

**Not the right skill for:** Real-time event ingestion, canvas/campaign orchestration logic, or analytics and reporting (those fall under separate roles).

## Strategic Lens

Every topic in this skill is read through the same lens:

> *How does this capability help a strategist reach the right audience, deliver the right content, and maintain a healthy subscriber relationship over time?*

This means API endpoints are not just technical primitives — they are levers for:
- **Audience quality**: clean profiles, accurate segmentation, no duplicates
- **Content relevance**: localized templates, curated media, consistent messaging
- **Subscriber trust**: transparent opt-in state, respected consent, lifecycle-aware targeting

## Topics This Skill Synthesizes

### Audience & Profile Management

**User Data Endpoints Overview** — Covers the `POST /users/merge` endpoint for deduplicating user records (up to 50 merges per request, asynchronous). Strategically, profile merging is a data hygiene operation that directly affects segment accuracy and personalization fidelity. Use when consolidating anonymous-to-known user transitions or cleaning up duplicate acquisition records.

**Export Users by Segment** — `POST /users/export/segment` exports all users in a segment as paginated JSON files. Use when building audience snapshots for downstream analysis, seeding lookalike models, or auditing segment composition before a campaign launch.

### Segmentation

**Get Segment Details** — `GET /segments/details` retrieves metadata for a specific segment by ID (requires `segments.details` permission). Use when validating segment definitions before targeting, or inspecting filter logic for a high-value cohort.

**List Segments** — `GET /segments/details` (list variant) surfaces available segment metadata. Use for discovery: identifying which segments exist, their sizes, and whether an appropriate audience is already defined before creating a new one.

**Segments Export Overview** — Includes `POST /export/segment/cancel` to halt ongoing exports. Use when managing export operations in progress, especially in high-volume or time-sensitive workflows where stale data must be discarded.

### Content & Templates

**Templates Endpoints Overview** — Covers the Templates API for managing reusable email and message templates. Strategically, templates enforce brand and messaging consistency at scale. Use when building a content library, auditing existing template coverage, or planning localization rollouts.

**Translations Endpoints Overview** — Covers the Translations API for managing locale-specific content variants. Use when planning multi-region campaigns, ensuring translated variants are complete before launch, or auditing coverage gaps across languages.

**Media Library Endpoints Overview** — Covers the Media Library API for uploading and managing image and asset files. Use when curating the visual content layer of a campaign — ensuring assets are available, correctly formatted, and accessible to template builders.

### Subscription Management

**Subscription Groups Endpoints Overview** — Covers `POST /v2/subscription/status/set` for batch-updating subscription state across up to 50 users and multiple groups per request. Use when managing opt-in/opt-out flows at scale, processing consent changes from external systems, or re-aligning subscription state after a data migration.

## Lifecycle Planning Model

When applying this skill, think across three lifecycle stages:

| Stage | Key Capability | Relevant Topics |
|---|---|---|
| **Acquire** | Build clean, accurate audience records | User merge, segment export |
| **Engage** | Deliver personalized, localized content | Templates, translations, media library |
| **Retain** | Respect consent, manage subscription state | Subscription groups, segment filtering |

Audience quality at the Acquire stage directly determines personalization fidelity at Engage, which in turn shapes subscriber trust at Retain. Degradation at any stage compounds downstream.

## Common Strategic Mistakes

| Mistake | Better Approach |
|---|---|
| Building campaigns before auditing segment definitions | Always inspect segment details before targeting |
| Launching multi-region content without translation coverage checks | Verify translation variants exist for all target locales before scheduling |
| Ignoring profile merge operations as "technical cleanup" | Treat merges as a prerequisite to accurate personalization — run before major sends |
| Batch-updating subscription state without validating source data | Confirm external consent records are canonical before applying via API |
| Uploading media ad hoc without a naming or governance convention | Establish media library taxonomy early; retroactive cleanup is costly |

`★ Insight ─────────────────────────────────────`
- The lifecycle table (Acquire → Engage → Retain) is the most strategically load-bearing part of this skill — it's the mental model that connects otherwise disparate API endpoints into a coherent workflow
- Framing "profile merges as data hygiene prerequisite" is a non-obvious insight that belongs in a skill but not in raw API docs — exactly the kind of judgment layer this file provides
- The "common mistakes" section inverts the usual API-first framing: it starts from strategic failure modes and works backward to the API that prevents them
`─────────────────────────────────────────────────`
