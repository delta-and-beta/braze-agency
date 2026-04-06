---
name: strategist-personalization
description: >-
  Liquid templating strategy, promotion code management, Connected Content usage
  patterns, deep linking, and Canvas entry properties.
metadata:
  role: braze-strategist
  topics:
    - personalization-and-dynamic-content-overview
    - personalization-and-dynamic-content-liquid
    - personalization-and-dynamic-content-key-value-pairs
    - personalization-and-dynamic-content-deep-linking-to-in-app-content
    - personalization-and-dynamic-content-canvas-persistent-entry-properties
    - personalization-and-dynamic-content-promotion-codes
    - personalization-and-dynamic-content-promotion-codes-create
    - personalization-and-dynamic-content-promotion-codes-manage
    - >-
      personalization-and-dynamic-content-promotion-codes-migrating-from-data-feeds
    - personalization-and-dynamic-content-connected-content
    - personalization-and-dynamic-content-connected-content-making-an-api-call
    - personalization-and-dynamic-content
    - >-
      personalization-and-dynamic-content-connected-content-user-profile-fields-connected-content
    - partners-message-personalization
    - partners-referrals-extole
    - partners-referrals-friendbuy
    - partners-referrals-mention-me
    - partners-referrals-viralsweep
    - message-personalization-location
    - message-personalization-localization
    - message-personalization-dynamic-content
    - message-personalization-referrals
    - message-personalization-creative-studio
    - location-radar
    - location-foursquare
    - location-accuweather
    - localization-smartling
    - localization-phrase
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
A skill file body serves two audiences: the routing engine (which scans for trigger signals) and the Claude instance that loads it at runtime. The opening section does double duty — it sets the scope AND acts as a semantic fingerprint for relevance matching. Organize by decreasing specificity: core mechanics first, integration patterns second, partner ecosystem last.
`─────────────────────────────────────────────────`

# Personalization & Dynamic Content

## Scope and Purpose

This skill covers the full personalization stack available in Braze — from the Liquid template language used to inject user-profile data into message copy, to server-side data fetches via Connected Content, to promotion code distribution, deep link routing, and Canvas entry property propagation.

Apply this skill when questions touch any of the following:
- Writing or debugging Liquid expressions in message copy
- Fetching external data into messages at send time (Connected Content)
- Inserting unique promotion codes into campaigns or Canvases
- Configuring deep links that route users to specific in-app screens
- Passing and referencing Canvas entry properties across steps
- Attaching key-value pairs to push, in-app, email, or Content Card messages
- Personalizing messages with location, weather, referral, or localization data via Braze technology partners

The lens throughout is **content strategy and user-centric dynamic messaging**: every personalization mechanism exists to make a message more relevant to the individual recipient at the moment they receive it.

---

## Core Concepts

### Liquid Templating

Liquid is the primary personalization language in Braze, adapted from Shopify's open-source library. Use it to inject user profile attributes, custom attributes, event properties, and conditional logic directly into message body, subject lines, and metadata fields.

Key operational rules:
- Braze supports a **subset** of Liquid — not all Shopify tags are available
- Undefined variables render as empty strings by default; use `| default:` filters to provide fallbacks
- Wrap conditional blocks in `{% if %}...{% endif %}` for audience-segment branching
- Use `{% abort_message("reason") %}` inside conditionals to suppress sends when personalization data is missing or invalid
- Liquid runs **server-side at send time**, not at display time — data is evaluated once and baked into the rendered message

### Connected Content

Connected Content lets a message make an outbound HTTP request at send time and inject the response into the message body using Liquid.

Operational patterns:
- Declare the call with `{% connected_content URL :save variable_name %}`
- User profile fields referenced in the call URL or body must be **pre-declared in the message** before the Connected Content tag — Braze resolves them left-to-right
- Responses are cached per send; use `:no_cache` sparingly for truly real-time data
- Treat Connected Content as a read-only data fetch — avoid side-effecting calls (writes, order creation) since retries can duplicate them
- When a call returns Liquid personalization tags in its body, those tags are evaluated in the message context, not inside Connected Content

### Promotion Codes

Promotion codes distribute unique, single-use values from a pre-loaded list into messages — useful for coupons, referral codes, and limited offers.

Core mechanics:
- Upload lists via **Promotion Codes** in the dashboard (up to 20 million codes per list, expiry up to 6 months)
- Reference a list in a message using the **Copy Snippet** button, which generates the correct Liquid tag
- Each code is consumed exactly once per send — no deduplication is needed on the receiving system
- Migrating from **Data Feeds** (deprecated): promotion code lists support all prior Data Feed use cases plus additional capabilities — use the feature comparison table in `references/` to guide migrations

### Deep Linking

A deep link is a URI that identifies an app **and** a specific screen or action within it. Every deep link has three components: the scheme (identifies the app), the host, and the path/parameters (specify the destination).

Authoring guidelines:
- Use **custom URI schemes** (`myapp://`) for internal navigation; use **universal links** (HTTPS URLs) for web-browser fallback
- Test links on both iOS and Android — scheme registration and universal link entitlements differ between platforms
- Pass parameters as query strings when the destination screen needs context (e.g., product ID, campaign source)
- Deep links in push, in-app messages, and Content Cards share the same URI syntax but differ in how the SDK intercepts and routes them

### Key-Value Pairs

Key-value pairs (KVPs) attach structured metadata to a message. They are invisible to the recipient but are read by the app SDK or downstream systems to trigger rendering logic, routing, or processing.

Common use cases:
- Instruct the app to render a custom in-app message layout
- Route a push notification to a specific handler (e.g., a silent push for background refresh)
- Pass campaign context to analytics or attribution systems
- Configure Content Card display behavior (card type, image ratio, action URL)

KVPs are available on push, in-app messages, email (custom headers), and Content Cards.

### Canvas Entry Properties

Canvas entry properties are values captured at the moment a user enters a Canvas — from the triggering event, API call, or segment entry. They persist for the duration of that user's Canvas journey and can be referenced in any step.

Design patterns:
- Reference entry properties with `canvas_entry_properties.${property_name}` in Liquid
- Use entry properties to carry event context (e.g., cart contents, viewed product ID) forward into personalized message copy
- Entry properties are **immutable** within a journey — they reflect the state at entry, not the current state
- For mutable state that updates as the user progresses, use Canvas step properties or custom attributes instead

---

## Topics Synthesized

This skill draws on the following reference areas:

| Topic | What It Covers |
|---|---|
| Liquid Templating | Tag syntax, filters, conditionals, `abort_message`, Braze-specific limitations |
| Connected Content | Call syntax, caching, user-field pre-declaration, error handling |
| Promotion Codes Overview | List setup, code lifecycle, expiry rules |
| Creating Promotion Codes | Upload workflow, list configuration |
| Managing Promotion Codes | Copy Snippet usage, embedding in messages |
| Migrating from Data Feeds | Feature comparison, migration path |
| User Profile Fields in Connected Content | Pre-declaration requirement, resolution order |
| Making a Connected Content API Call | Call syntax, response variables, Liquid evaluation |
| Deep Linking to In-App Content | URI anatomy, platform differences, parameter passing |
| Key-Value Pairs | Per-channel usage, rendering and routing patterns |
| Canvas Entry Properties | Reference syntax, mutability rules, design patterns |
| Dynamic Content Personalization | `abort_message` usage, conditional suppression |
| Personalization Overview | Index of personalization mechanisms |
| Location Partners (Radar, Foursquare, AccuWeather) | Geofencing, location targeting, weather-based personalization |
| Referral Partners (ViralSweep, Mention Me, Friendbuy, Extole) | Referral program integration patterns |
| Localization Partners (Smartling, Phrase, Transifex) | Translation workflow integration |
| Message Personalization Partners | Partner ecosystem overview |
| Creative Studio | Dynamic creative capabilities |

---

## Personalization Strategy Lens

When advising on personalization, apply a **user-centric content strategy** perspective:

1. **Relevance over richness** — A single well-chosen personalization token (the user's first name, their last viewed product) outperforms a message dense with data that feels robotic. Recommend the minimum personalization needed to make the message feel human.

2. **Graceful degradation** — Every dynamic expression should have a fallback. Use `| default:` filters for missing attributes, `abort_message()` when a missing value would make the message misleading or broken, and stub content when Connected Content calls fail.

3. **Data availability at send time** — Connected Content fetches at send, Liquid resolves profile data at send, entry properties freeze at Canvas entry. Advise on which mechanism fits the data freshness requirement: real-time (Connected Content), near-real-time (profile attributes updated via API), or historical (entry properties).

4. **Channel-appropriate depth** — Push notifications support limited KVPs and short Liquid expressions. Email supports full Connected Content and complex Liquid. In-app messages bridge both. Tailor personalization complexity to channel constraints.

5. **Promotion code hygiene** — Unique codes are consumed on send; failed sends may still consume a code. Advise on list sizing (buffer for retries), expiry alignment with campaign windows, and testing with list previews before launch.

---

## When to Apply This Skill

Apply this skill when a request involves any of:
- Writing, debugging, or explaining Liquid syntax in Braze messages
- Designing a Connected Content call to fetch external data into a campaign
- Setting up or troubleshooting promotion code lists and Liquid snippets
- Building deep link URIs for push or in-app message CTAs
- Passing data through Canvas entry properties or reading them in message steps
- Attaching key-value pairs for client-side rendering or routing logic
- Integrating a location, referral, or localization partner for dynamic message content
- Evaluating whether to use abort_message, a default filter, or a fallback content block
