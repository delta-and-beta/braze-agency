---
name: administrative-app_settings-messaging_rate_limits
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/administrative/app_settings/messaging_rate_limits
indexed_at: '2026-04-05'
keywords:
  - messaging
  - ratelimits
  - workspace
  - campaigns
  - dispatch
  - throttling
  - concurrent
  - channels
triggers:
  - how to set messaging rate limits
  - configure workspace rate limits
  - manage campaign throughput
  - control message dispatch rates
  - prevent traffic spikes
---
`★ Insight ─────────────────────────────────────`
Topic files in Nick's pipeline are "atomic knowledge units" — they live in `skills/{skill}/references/*.md` and are loaded selectively based on query depth. Stripping Jekyll template tags (`{% alert %}`, `{% image_buster %}`) and table formatting noise is critical because these files get embedded into LLM context windows at query time.
`─────────────────────────────────────────────────`

## Workspace Messaging Rate Limits

Workspace messaging rate limits cap the **aggregate** outgoing message volume across all campaigns and Canvases in a workspace. This prevents traffic spikes that could degrade server performance.

> **Note:** Gradually rolling out — may not be visible in all dashboards yet.

### How Rate Limits Work

- Limits are enforced as **messages per minute** across the entire workspace
- Applies to API-triggered messages (`/messages/send`, `/messages/schedule/create`) as well as campaign/Canvas sends
- Messages from multiple concurrent campaigns are processed **in parallel** on a first-come, first-served basis — the per-minute output is a mix across all sending campaigns, not sequential
- Rate limit applies to **dispatch** (the start of send attempt), so completed sends may slightly exceed the limit in a given minute; averages normalize over time
- When a campaign has its own rate limit AND a workspace rate limit applies, **both are enforced** — the stricter one wins

**Example — parallel dispatch at 100k/min limit:**

| Campaign | Messages | Send Time |
|----------|----------|-----------|
| Campaign 1 | 100,000 | 12:00 pm |
| Campaign 2 | 100,000 | 12:00 pm |
| Campaign 3 | 100,000 | 12:00 pm |

Result: dispatched over 3 minutes, each minute sending ~100k messages as a mix from all three campaigns.

**Example — staggered dispatch at 100k/min limit:**

| Campaign | Messages | Send Time |
|----------|----------|-----------|
| Campaign 1 | 1,000,000 | 9:00 am |
| Campaign 2 | 1,000,000 | 9:05 am |

Result:
- Campaign 1: dispatches 9:00–9:10 am (100k/min)
- Campaign 2: delayed to 9:10–9:20 am (100k/min) — pushed back 5 minutes from original schedule

### Setting the Rate Limit

1. **Settings** → **Workspace Settings** → **Messaging Rate Limits**
2. **+ Add rate limit** → select messaging channel
3. Enter **Messages per minute**
4. **Save**

> After setting a limit, you can increase it. Messages already processed before the increase use the original limit.

### Exclusions — Not Subject to Workspace Rate Limits

| Excluded | Behavior |
|----------|----------|
| Transactional Email campaigns | Rate-limited separately; not counted toward workspace limit |
| Seed Group sends | Not rate-limited; not counted |
| Test sends | Not rate-limited; not counted |
| SMS auto-responses | Not rate-limited; not counted |
| In-app messages | Not supported |
| Feature flags | Not supported |
| Banners | Not supported |

### Key Behaviors to Remember

- **Even distribution is attempted but not guaranteed** within a minute (e.g., 500k/min ≈ 8,400/sec with some per-second variance)
- Campaign/Canvas-level rate limits are **independent** of workspace limits — both apply simultaneously
- No guaranteed ordering of which campaigns dispatch first within a rate-limited window
