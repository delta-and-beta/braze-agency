---
name: sdk-integration-rate-limits
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/sdk_integration/rate_limits
indexed_at: '2026-04-05'
keywords:
  - rate-limits
  - token-bucket
  - batching
  - flushing
  - throttling
  - optimization
  - bandwidth
  - network
  - adaptive
  - performance
triggers:
  - SDK rate limits and throttling
  - How to optimize SDK performance
  - Why are my requests being rate limited
  - SDK batching and automatic flushing
  - Reduce bandwidth and battery usage
---
## SDK Rate Limits

The Braze SDK uses intelligent, client-side rate limiting to optimize battery life, reduce bandwidth, and ensure reliable delivery.

### Token Bucket Algorithm

Rate limiting uses an asynchronous token bucket (not a strict queue):

- Tokens replenish at a steady rate; requests consume one token each
- Requests with an available token proceed immediately — no strict ordering
- Short bursts are allowed if tokens are available
- Long-term throughput is capped by the replenishment rate

### Adaptive Rate Limiting

Limits adjust in real time based on network conditions and usage patterns. Exact bucket sizes and static values are not published — they change dynamically.

### Built-in Networking Optimizations

| Behavior | Description |
|---|---|
| Automatic batching | Events queued and sent in efficient batches |
| Network-aware flushing | Flush rate adjusts to connectivity quality |
| Battery optimization | Minimizes radio wake-ups and network calls |
| Graceful degradation | Maintains functionality on poor connections |
| Lifecycle awareness | Optimizes behavior on background/foreground transitions |

### Best Practices

| Do | Avoid |
|---|---|
| Track meaningful user actions and milestones | Tracking every minor interaction or UI event |
| Refresh content only when necessary | Refreshing on every scroll/user action |
| Let the SDK batch automatically | Forcing immediate transmission unless required |
| Call SDK methods at meaningful frequencies | Calling SDK methods in rapid succession |

### Diagnosing Rate Limit Issues

Review usage of these methods when experiencing issues:

- `requestImmediateDataFlush()`
- `requestContentCardsRefresh()`
- `refreshFeatureFlags()`
- `logCustomEvent()`
- `logPurchase()`

When filing a support ticket, provide this for each method:

```plaintext
Method name:

Frequency:
[How often called, e.g., at every app launch, once per session]

Trigger/context:
[What causes the call, e.g., button click, scroll event]

Code snippet:
[Exact code where method is called]

Patterns that may cause bursts or excessive calls:
[Description]
```
