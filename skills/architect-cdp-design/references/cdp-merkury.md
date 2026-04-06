---
name: cdp-merkury
source_url: >-
  https://braze-inc.github.io/braze-docs/_partners/data_and_analytics/customer_data_platform/merkury
indexed_at: '2026-04-05'
keywords:
  - merkury
  - cdp
  - identity
  - braze
  - sdk
  - attributes
  - email
  - segments
  - integration
  - connector
triggers:
  - how to deploy Merkury tag
  - create custom attributes in Braze
  - set up Merkury integration
  - unify customer data
  - export email universe
---
## Merkury CDP Integration

**Merkury** is Merkle's enterprise identity platform that unifies known/unknown customers, site visits, and consumer data under a single persistent `MerkuryID`. The Braze integration uses this to increase site visitor recognition rates and update Braze profiles with subscriber email addresses — improving abandonment email volumes and personalization.

_Maintained by Merkury._

---

### Prerequisites

| Requirement | Details |
|---|---|
| Merkle account | Required for the partnership |
| Merkle Client ID | Obtain from your Merkle representative |
| Merkury tag | Must be placed on your website |
| Braze REST API key | Needs `users.track`, `users.export.ids`, `users.export.segment`, `segments.list` permissions |
| Braze REST/SDK endpoint | Depends on your Braze instance URL |

> **Rate limits**: Merkury identity connector requests operate within Braze API rate limits. Merkury sends at least one request at the end of each qualified session.

---

### Integration Steps

**1. Deploy Braze Web SDK**
The Braze Web SDK must be deployed on your website before proceeding.

**2. Deploy Merkury Tag**
Deploy Merkle's Merkury tag on your website — your Merkle account manager provides the guide. This makes the Merkury identity connector available client-side.

**3. Create Custom Attributes in Braze**
The Merkury connector populates these fields — create them as custom attributes:

| Attribute | Type | Description |
|---|---|---|
| `hmid` | String | Merkle's Merkury ID |
| `confidence_score` | Number | Identification confidence (1–8, lower = more confident) |

**4. Provide Email Universe to Merkle**
Export your permissible email subscriber segment to Merkle. Follow up with daily exports of active permissible users.

Required fields in the export:
- `braze_id`
- `external_id`
- Email address

---

### How It Works

The Merkury tag captures Braze device identifiers client-side and forwards them to the Merkury identity connector endpoint. When a site visitor is recognized as a brand email subscriber, Merkury updates the corresponding Braze profile with the subscriber's email address, enabling downstream engagement campaigns.
