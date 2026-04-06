---
name: >-
  message-building-by-channel-content-cards-best-practices-improving-low-latency-requirements
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/message_building_by_channel/content_cards/best_practices/improving_low_latency_requirements
indexed_at: '2026-04-05'
keywords:
  - latency
  - scheduled
  - impression
  - canvas
  - connected
  - refresh
  - session
  - lifecycle
triggers:
  - improve Content Card latency
  - reduce card delivery time
  - configure scheduled entry
  - At First Impression send logic
  - optimize Content Card performance
---
## Improving Content Card Low Latency

Content Cards for critical use cases (e.g., homepage banners) can suffer latency from card creation timing, excessive refreshing, or Connected Content blocking.

### Use Scheduled Entry (Not Action-Based)

Action-based cards require Braze to receive a trigger event before creating the card, introducing unavoidable delay. Use **Scheduled Entry** instead — cards are pre-created and waiting when the user opens the app.

### Use "At First Impression" Send Logic

Combined with scheduled entry, `At First Impression` minimizes latency:

| Option | Behavior |
|---|---|
| `At Campaign Launch` | Pre-creates cards for all segmented users (slow to complete) |
| `At First Impression` | Creates a card on first request (e.g., session start) — faster availability |

Use `At First Impression` + scheduled entry for cards that must be ready at session start or within a time-based eligibility window.

### Canvas Entry is a Prerequisite

In Canvas flows, a user must:
1. Enter the Canvas (via configured entry criteria)
2. Flow through the Content Card step

Only after both steps is the card available. Built-in latency exists between step completion and card availability.

### Limit Manual Refresh Calls

The SDK auto-refreshes Content Cards at each new session start. Manual refreshes via `requestContentCardsRefresh` are rate-limited — calling it too frequently can block refreshes at critical moments.

**Best practice:** Call `requestContentCardsRefresh` only at high-value lifecycle events:
- After a purchase
- After a subscription upgrade

### Avoid Connected Content When Latency Matters

Connected Content blocks card availability until the external API call completes, potentially causing SDK retry delays.

**If Connected Content is required:**
- Schedule cards in advance
- Use `At Campaign Launch` so cards are pre-created before the session
- Accept that cards won't be immediately available (all eligible users' cards must be written first)

### Summary: Low-Latency Configuration

| Setting | Recommended Value |
|---|---|
| Entry type | Scheduled Entry |
| Send logic | At First Impression |
| Manual refresh | Only at key lifecycle events |
| Connected Content | Avoid; if needed, use At Campaign Launch |

`★ Insight ─────────────────────────────────────`
- The table format for "At First Impression vs At Campaign Launch" makes the tradeoff immediately scannable — this is the core decision point for latency optimization
- Condensing the Canvas prerequisite section into a numbered list makes the two-step dependency explicit, which the original prose buried
- The summary table at the end is additive (not in the original) — it gives a reference row that topic files are often used for at query time
`─────────────────────────────────────────────────`
