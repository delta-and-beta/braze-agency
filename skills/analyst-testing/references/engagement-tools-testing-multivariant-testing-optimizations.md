---
name: engagement-tools-testing-multivariant-testing-optimizations
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/engagement_tools/testing/multivariant_testing/optimizations
indexed_at: '2026-04-05'
keywords:
  - multivariate
  - A/B testing
  - personalization
  - variant
  - optimization
  - analytics
  - segment
  - campaign
triggers:
  - optimize A/B test campaigns
  - configure winning variant
  - personalized variant selection
  - multivariate test analytics
  - A/B testing optimization
---
## Multivariant Test Optimizations

A/B tests for email, push, webhook, SMS, and WhatsApp one-time campaigns can use one of two optimizations to automatically send the best content to remaining users after an initial test period.

**How it works:** An initial test sends to a percentage of your target segment. When the test ends, the remaining audience receives the variant determined by the optimization type.

Optimizations are configured in **Target Audiences → A/B Testing** during campaign creation.

---

## Winning Variant

Sends the single best-performing variant to remaining users after the initial test.

**Configuration:**

| Field | Notes |
|-------|-------|
| Determine Winning Variant | Metric to optimize: *Unique Opens* or *Clicks* (email), *Opens* (push), *Primary Conversion Rate* (all channels) |
| Winning Variant Send Time | Date/time to send to remaining audience |
| If No Winner | Send best performer anyway, or end test without further sends |

**Control group caveat:** Control group users can't perform Opens/Clicks, so their rate is always `0` — they can never win. You can still include a control group to track other metrics.

---

## Personalized Variant

Sends each remaining user the variant they're individually most likely to engage with, based on associations found in the initial test.

**How personalization works:**
1. Initial test identifies correlations between user characteristics and message preferences
2. Those characteristics determine which variant each remaining user receives
3. If no associations are found, falls back to sending the Winning Variant

**Configuration:**

| Field | Notes |
|-------|-------|
| Determine Personalized Variant | Same metric options as Winning Variant |
| Personalized Variant Send Time | Date/time to send personalized variants |
| If No Personalized Variant Found | Send Winning Variant instead, or end test without further sends |

---

## Key Differences

| | Winning Variant | Personalized Variant |
|---|---|---|
| Outcome | One variant sent to all remaining users | Different variants sent per user |
| Basis | Best aggregate performance | Individual user characteristics |
| Fallback | Best performer | Winning Variant |

---

## Analytics

Results are available in Multivariate and A/B Test Analytics, including how Personalized Variants were determined.
