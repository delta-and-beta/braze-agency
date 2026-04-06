---
name: visual-and-interactive-content-future-anthem
source_url: >-
  https://braze-inc.github.io/braze-docs/_partners/message_personalization/dynamic_content/visual_and_interactive_content/future_anthem
indexed_at: '2026-04-05'
keywords:
  - personalization
  - attributes
  - gaming
  - betting
  - recommendations
  - churn
  - engagement
  - scoring
  - profiles
  - braze
triggers:
  - set up Future Anthem integration
  - personalize player profiles with betting data
  - recommend games and bets
  - identify churn risk players
  - target high-value gaming users
---
## Future Anthem Integration

**Future Anthem Amplifier AI** is an all-in-one personalization product for real money gaming (sports, casino, lottery). It enriches Braze player profiles with industry-specific attributes via the `users.track` API.

> Early Access only — contact the Future Anthem Customer Success Team to enable.

## Prerequisites

| Requirement | Detail |
|---|---|
| Future Anthem account | Required to configure Amplifier AI |
| Braze REST API key | Needs `users.track` permission |
| Braze REST endpoint | e.g., `rest.iad-01.com` |

## Setup

Integration is managed by the Future Anthem Customer Success team. They will identify which attributes to sync into Braze as custom attributes on the user profile.

## Custom Attribute Categories

### Bet Recommendations (Object type)

| Attribute | Example |
|---|---|
| User Preferences | `{"Sport": "Ice Hockey", "League": "NHL", "Market": "Goals", "Team": "Rangers", "Player": "Kreider"}` |
| Single Bet Recommendation | `{"Sport": "Ice Hockey", "League": "NHL", "Market": "Goals", "Team": "Rangers", "Player": "Kreider"}` |
| Accumulator Bet | `{"Bet_1": "Halland Goal vs. Manchester United", "Bet_2": "Liverpool vs. Everton"}` |
| Accumulator Odds | `{"Bet_1": 1.5, "Bet_2": 2}` |
| Bet Builder | `{"Sport": "American Football", "Competition": "NFL", "Event": "Seahawks@Giants", "Market": "MoneyLine", "Selection": "Seahawks"}` |

### Bonus & Scoring (Number/Time type)

| Attribute | Example |
|---|---|
| NGR (lifetime net gaming revenue) | `2232` |
| NGR14 (last 14 days) | `42` |
| Player Profitability Score | `130` |
| Engagement Score | `0.78` |
| Churn Risk Score | `0.02` |
| Estimated Next Bet Date | `2024-08-29` |
| Bet-and-Get Bonus Recommendation | `20` |
| Future CLTV | `3126` |

### Game Recommendations (Array type)

| Attribute | Description |
|---|---|
| Recommended For You | Personalized picks |
| Favourite Games | Player's known favorites |
| Recommended New Games | New titles matching preferences |
| Players Like You Are Playing | Collaborative filtering |
| Because You Played | Game similarity |
| Up Next | Game sequencing / progression |
| Popular Games | Broadly popular titles |
| Trending Games | Currently trending |

### Player Metadata

| Attribute | Example | Type |
|---|---|---|
| Player Cluster | `"High Value Game Diverse"` | String |
| Risk Score | `0.5` | Number |
| Risky Player | `true` | Boolean |

## Use Cases

- Target high-engagement users (`engagement_score > 0.7`) with VIP offers or exclusive promotions
- Recommend similar games using the "Because You Played" attribute
- Proactively re-engage users at churn risk using `churn_risk_score`

## Reference

Full attribute documentation: [Future Anthem: Getting Started](https://knowledge.futureanthem.com/getting-started)
