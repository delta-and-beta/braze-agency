---
name: dynamic-content-personalized-recommendations
source_url: >-
  https://braze-inc.github.io/braze-docs/_partners/message_personalization/dynamic_content/personalized_recommendations/personalize
indexed_at: '2026-04-05'
keywords:
  - recommendations
  - personalization
  - churn
  - attributes
  - profiles
  - canvas
  - export
  - integration
  - targeting
  - operationalization
triggers:
  - set up Personalize.AI integration
  - configure recommendation export
  - use churn prediction in campaigns
  - personalize customer targeting
---
## Personalize.AI Integration

[Personalize.AI](https://www.zs.com/solutions/artificial-intelligence-and-analytics/personalize-ai/) integrates with Braze to export personalized recommendation data for message targeting and personalization.

## Prerequisites

| Requirement | Description |
|---|---|
| Personalize.AI instance | Active instance required |
| Braze REST API key | Full permissions; create at **Settings > API Keys** |
| Braze REST endpoint | Instance-specific endpoint URL |

## Use Cases

- Personalized item/offer recommendations with treatment, timing, and content control
- Churn prediction with risk scoring and proactive interventions
- Re-engagement targeting for lapsed users
- Geolocation-based audience targeting for new locations
- Lookalike modeling for newer users with limited data
- Lifecycle engagement and optimal audience identification

## Setup: Configure Connection in Personalize.AI

1. Navigate to **Operationalization > Integrations > Braze**
2. Configure:
   - **Connection Name** — display name for this integration
   - **Sync Frequency** — Daily, Weekly, or Monthly
   - **API Key** — Braze REST API key
   - **API URL** — Braze REST endpoint URL
3. Click **EXPORT** to initiate first export

After initial export, data syncs automatically at the configured frequency.

## Data Format

Personalize.AI exports custom attributes to Braze customer profiles. Attributes are renamed using a `P.AI_` prefix convention for clarity in Canvases. Data can be passed as events or via Connected Content APIs instead of stored on profiles.

**Identifier:** Uses `external_id` for customer matching.

**Example attributes for a churn-focused Canvas:**

| Personalize.AI Attribute | Example Value |
|---|---|
| `Customer_ID` | `12345` |
| `Target_Canvas` | `C4` |
| `Target_Objective` | `"Churn_Mitigation"` |
| `C4_Target_Date` | `3/1/2023` |
| `C4_Target_Variant` | `Treatment` |
| `C4_Treatment` | `"P.AI_Model"` |
| `C4_Offer_Value` | `$3` |
| `C4_Item_Recom` | `"Caesar Salad"` |
| `C4_Subject_Line` | `"We miss you"` |

Exported attributes are validated continuously and designed to avoid conflicts with existing Braze attributes or tracking.

---

`★ Insight ─────────────────────────────────────`
- The attribute renaming pattern (`C402_Target_Variant` → `"P.AI_Model_Treatment"`) is a namespace isolation strategy — third-party integrations prefix their attributes to prevent collisions with native Braze attributes or other partners' data
- The "events vs. profile attributes" flexibility reflects a fundamental Braze data model choice: profile attributes persist but can get stale, while events are immutable and time-stamped — Connected Content APIs offer a third path for real-time lookups without storing data at all
`─────────────────────────────────────────────────`
