---
name: personalized-recommendations-personalize
source_url: >-
  https://braze-inc.github.io/braze-docs/_partners/message_personalization/dynamic_content/personalized_recommendations/personalize
indexed_at: '2026-04-05'
keywords:
  - personalization
  - recommendations
  - attributes
  - churn
  - targeting
  - integration
  - canvas
  - treatment
  - export
  - sync
triggers:
  - connect personalize.ai to braze
  - export customer attributes
  - predict customer churn
  - deliver personalized recommendations
  - set up offer targeting
---
## Personalize.AI — Personalized Recommendations

Personalize.AI integrates with Braze to deliver personalized messages, offers, and targeting by exporting AI-generated customer attributes into Braze.

## Prerequisites

| Requirement | Details |
|---|---|
| Personalize.AI instance | Required |
| Braze REST API key | All permissions; create under **Settings > API Keys** |
| Braze REST endpoint | Instance-specific URL |

## Key Use Cases

- Personalized item/offer recommendations (treatment, timing, content)
- Churn prediction and early-indicator scoring
- Re-engagement of lapsed users
- Geolocation-based audience targeting
- Lookalike modeling for newer users
- Lifecycle-based engagement targeting

## Setup: Connect Personalize.AI to Braze

1. In Personalize.AI, go to **Operationalization > Integrations > Braze**
2. Configure:
   - **Connection Name** — label for this integration
   - **Sync Frequency** — Daily, Weekly, or Monthly
   - **API Key** — Braze REST API key
   - **API URL** — Braze REST endpoint URL
3. Click **EXPORT**

After initial export, Personalize.AI syncs automatically at the configured interval.

## How Attributes Work

Personalize.AI exports custom attributes to Braze customer profiles. These represent targeting parameters: timing, content, treatment variant, and offers.

- Uses `external_id` as the customer identifier
- Attributes are prefixed (`P.AI_`) to avoid colliding with existing Braze attributes
- Can be passed as events or via Connected Content APIs instead of profile attributes
- Designed for direct use in Canvas flows

**Attribute naming example:**

| Personalize.AI attribute | Braze export name |
|---|---|
| `C402_Target_Variant` | `P.AI_Model_Treatment` |

## Example: Churn Canvas Attributes

| Attribute | Example Value |
|---|---|
| `Customer_ID` | 12345 |
| `Target_Canvas` | C4 |
| `Target_Objective` | `"Churn_Mitigation"` |
| `C4_Target_Date` | 3/1/2023 |
| `C4_Target_Variant` | Treatment |
| `C4_Treatment` | `"P.AI_Model"` |
| `C4_Offer_Value` | $3 |
| `C4_Item_Recom` | `"Caesar Salad"` |
| `C4_Subject_Line` | `"We miss you"` |

Attributes are continuously validated for reliability in Canvas references.
