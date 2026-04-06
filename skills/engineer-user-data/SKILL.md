---
name: engineer-user-data
description: >-
  Implements SDK data collection, user profile lifecycle management, and user
  import/export workflows.
metadata:
  role: braze-engineer
  topics:
    - data-unification-user_data
    - data-unification-user_data-user_profile_lifecycle
    - data-unification-user_data-sdk_data_collection
    - data-unification-user_data-language_codes
    - data-unification-user_data-import_users
    - data-unification-user_data-delete_users
    - data-unification-user_data-collection_use_case
    - data-unification-user_data-best_practices
    - data-unification-creating_a_formula
    - data-activation-custom_data-custom_attributes
    - data-activation-custom_data-custom_events
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
- Nick skills use a **lens** to constrain how broad topic content is filtered — two skills can share a topic file but interpret it differently based on their lens
- The topic list here spans both *data modeling decisions* (custom events vs. attributes) and *operational workflows* (import/delete/lifecycle) — a well-structured skill surface groups these into coherent decision layers
- "Dummy user blocking" at 5M sessions is an operational tripwire worth surfacing early — engineers who miss it often diagnose it as a data pipeline bug rather than a Braze safety feature
`─────────────────────────────────────────────────`

Here is the generated skill file content:

---

# User Data Engineering

## Scope

This skill covers the full lifecycle of user data in Braze: how data enters the platform (SDK instrumentation, bulk import, API write), how user profiles are structured and maintained over time, and how to clean up or remove data when needed.

**Lens:** Every topic is interpreted through the question — *how should an engineer collect, structure, and manage user data correctly?* That means weighing SDK vs. API write paths, choosing between custom events and custom attributes, and avoiding common profile corruption patterns.

## When to Use This Skill

Use this skill when:
- Instrumenting a mobile or web SDK to track user behavior or attributes
- Deciding between a custom event and a custom attribute for a data point
- Importing users via CSV or API, especially with existing external IDs
- Managing profile merges, aliases, or anonymous-to-identified transitions
- Deleting user profiles for compliance (GDPR/CCPA) or data hygiene
- Diagnosing why a user profile looks wrong or has unexpected session counts
- Setting up language/locale fields on user profiles

## Topics Synthesized

| Topic | What It Covers |
|-------|---------------|
| **SDK Data Collection** | How to instrument SDKs to capture events, attributes, and sessions correctly |
| **Data Collection Use Cases** | Framework for deciding *what* to collect: goal → funnel steps → user characteristics |
| **Custom Events** | High-value, time-series user actions — triggerable for campaigns; when to use them |
| **Custom Attributes** | User traits and low-frequency data — no time-series; dashboard management, limits |
| **User Profile Lifecycle** | Anonymous → identified transitions, external ID assignment, alias management |
| **User Data Best Practices** | Profile deduplication, merge safety, writing data without overwriting valid state |
| **User Data Management** | Dummy user blocking (5M session threshold), session counting edge cases |
| **Import Users** | CSV and API import patterns, HTML validation warning, field handling during import |
| **Delete Users** | Compliance deletion (GDPR/CCPA), required permissions, early access considerations |
| **Language Codes** | Valid locale/language values for user profiles; sourced from ISO standard |
| **Creating a Formula** | Normalizing behavioral metrics against MAU/DAU for cross-segment analysis |

## Core Decision Framework

### Choosing a Data Type

```
Is this something the user DID (an action)?
  └─ Yes → Does it need trend/time-series analysis or campaign triggering?
              └─ Yes → Custom Event
              └─ No  → Custom Attribute (store as a flag or counter)
  └─ No  → Is it a stable trait (language, plan tier, preferences)?
              └─ Yes → Custom Attribute
              └─ No  → Re-examine — you may be logging state instead of behavior
```

**Key distinction:** Custom attributes have no time-series support — you cannot graph them or see how they changed over time. If behavioral analysis matters, use a custom event.

### Choosing a Write Path

| Situation | Recommended Path |
|-----------|-----------------|
| Real-time user interaction in app/web | SDK (automatic session + identity handling) |
| Batch backfill or CRM sync | `/users/track` REST API or CSV import |
| Server-side event (purchase confirmed, order shipped) | Server-side SDK or REST API |
| Profile deletion for compliance | REST API `/users/delete` (requires specific permissions) |

## Critical Implementation Details

### Dummy User Blocking
Braze blocks profiles that accumulate **5 million sessions with no SDK event ingestion**. This is a safety mechanism against misconfigured integrations (e.g., session start fired on every page load with no corresponding events). If you see unexpected profile bans, audit session instrumentation first.

### Profile Integrity on Import
Braze does **not** sanitize or validate HTML during import. Strip HTML before sending — malformed markup will render literally in messages. Also verify external IDs match your canonical user identifier before bulk import; mismatches create orphaned profiles that are costly to merge.

### Merge Safety
Before writing to a profile, verify the data point doesn't already exist in a form that would be overwritten. Profile merges (anonymous → identified) can silently drop attribute values if the identified profile has a conflicting entry. Follow a read-before-write pattern for high-value fields.

### Language Codes
User `language` fields must use valid ISO 639-1 codes (e.g., `en`, `fr`, `pt-BR`). Invalid values are accepted silently but will not match Braze's segmentation and localization filters.

## Common Mistakes

| Mistake | Consequence | Fix |
|---------|-------------|-----|
| Logging every page view as a custom event | Profile event count bloat; triggers unwanted campaigns | Use session tracking or a custom attribute counter instead |
| Using custom attributes for behavioral analysis | No trend graphs available | Use custom events with properties |
| Importing users without stripping HTML | Raw tags rendered in messages | Pre-process import files |
| Firing session start without any SDK events | Dummy user blocking at 5M sessions | Ensure at minimum one event is logged per session |
| Deleting users without the Delete Users permission | API returns 403 | Verify IAM/permission configuration before compliance workflows |

## Formulas and Analysis

When analyzing behavioral data across user segments, use **Formulas** to normalize raw event counts against MAU or DAU. This accounts for audience size differences and surfaces true behavioral patterns rather than volume artifacts.
