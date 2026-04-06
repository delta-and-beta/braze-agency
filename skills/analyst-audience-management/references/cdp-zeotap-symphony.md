---
name: cdp-zeotap-symphony
source_url: >-
  https://braze-inc.github.io/braze-docs/_partners/data_and_analytics/customer_data_platform/zeotap/symphony
indexed_at: '2026-04-05'
keywords:
  - zeotap
  - braze
  - symphony
  - integration
  - email
  - push
  - campaigns
  - events
  - attributes
  - mapping
triggers:
  - integrate Zeotap with Braze
  - send push notifications via Braze
  - sync user attributes to Braze
  - map data to Braze fields
  - configure Braze campaigns in Symphony
---
## Zeotap Symphony + Braze Integration

Real-time orchestration integration enabling email and push notification campaigns. Sends user attributes and custom events from Zeotap to Braze via the `/users/track` endpoint.

**Key capabilities:**
- Sync first/last name for personalized emails
- Send custom events and purchase events in real-time to trigger Braze campaigns

> For email marketing campaigns, onboard raw emails in Zeotap by mapping them to `Email Raw` in the Zeotap Catalogue.

---

## Prerequisites

| Requirement | How to obtain |
|---|---|
| Client Name | Found in the Braze Console |
| REST API Key | Create in **Settings > API Keys** — requires `users.track` permission |
| Instance | From onboarding manager or the API overview page |

---

## Integration Methods

### Method 1 — SDK + Symphony (Full Features)

1. Integrate the Braze SDK on your website/app
2. Connect Braze with Zeotap through Symphony

**Key rules:**
- Map `User traits` to Braze fields under **Data To Send** tab
- Do NOT map `Event` and `Purchase` attributes as user traits — this causes event duplication
- Map `External ID` → `User ID` (as configured in the Braze SDK)

**Supports:** Email campaigns, push notification campaigns, in-app messaging, Content Cards

---

### Method 2 — Symphony Only (Email Only)

Connect Braze with Zeotap through Symphony, no SDK required.

**Limitations:**
- No in-app messaging, Content Cards, or push notifications
- Email campaigns only

**Recommendation:** Map `hashed email` from Zeotap Catalogue → `External ID`

---

## Destination Setup in Symphony

1. In Symphony, apply filters/conditions, then go to **Send to Destinations**
2. Add new destination: search **Braze**, enter **Client Name**, **API Key**, **Instance**
3. Select destination from **Available Destinations**
4. Enter **Audience Name** — sent as a Custom Attribute to Braze
5. Complete field mapping under **Data To Send** tab

### Data To Send — Mapping Types

| Type | Description |
|---|---|
| **Static Mapping** | Auto-mapped: email, phone, first/last name, gender |
| **Dropdown Selection** | Map Zeotap Catalogue fields to Braze fields from dropdown |
| **Custom Data Input** | Add custom data mapped to a Zeotap field |

---

## Supported Attributes

| Braze Field | Mapping Type | Notes |
|---|---|---|
| External ID | Dropdown | Persistent user identifier. Map to `User ID`. If not mapped, Zeotap sends email as user alias. Recommend mapping `hashed email` → `External ID` |
| Email | Static | Maps to `Email Raw` in Zeotap Catalogue |
| Phone | Static | Maps to `Mobile Raw`. Must be in **E.164 format** — Zeotap does not transform phone numbers |
| First Name | Static | Maps to `First Name` |
| Last Name | Static | Maps to `Last Name` |
| Gender | Static | Maps to `Gender` |
| Custom Event Name | Static | Maps to `Event Name`. **Both Custom Event Name AND Custom Event Timestamp must be mapped** — event is dropped if either is missing |
| Custom Event Timestamp | Static | Maps to `Event Timestamp`. Required alongside Custom Event Name |
| Email Subscribe | Dropdown | Map an `Email Marketing Preference` field. Values: `opted_in`, `unsubscribed`, `subscribed` |
| Push Subscribe | Dropdown | Map a `Push Marketing Preference` field. Values: `opted_in`, `unsubscribed`, `subscribed` |

---

## Data Flow Summary

```
Zeotap Catalogue fields
    → Mapped in "Data To Send" tab
    → POST /users/track (Braze REST API)
    → Braze user profiles updated
```

Zeotap sends: user profile attributes, custom attributes, custom events, purchase fields.
