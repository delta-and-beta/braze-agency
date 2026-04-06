---
name: personalization-engines-limbik
source_url: >-
  https://braze-inc.github.io/braze-docs/_partners/message_personalization/dynamic_content/personalization_engines/limbik
indexed_at: '2026-04-05'
keywords:
  - personalization
  - audiences
  - messaging
  - targeting
  - campaigns
  - forecasting
  - segments
  - authentication
triggers:
  - generate message copy
  - target synthetic audiences
  - retrieve audience segments
  - send personalized campaign
  - predict audience response
---
## Limbik Personalization Engine

Limbik is an AI resonance layer that predicts how real audiences interpret and respond to messages before market launch. Powered by continuous primary research across 60+ countries and 25+ languages, it delivers human-validated synthetic audiences (95% confidence, 1.5–3% margin of error).

---

## Prerequisites

| Item | How to Obtain |
|------|---------------|
| `account_id` | GET `/rest/api/organizations` endpoint |
| `access_token` | POST to Limbik `login` endpoint; use returned token as Bearer |
| Braze REST API key | Braze dashboard → **Settings** > **API Keys** (requires "Messages" permission) |
| Braze `campaign_id` | **Messaging** > **Campaigns** → Campaign API identifier at bottom of campaign page |

---

## Authentication

### 1. Get your `account_id`

```sh
curl -X GET 'https://cortex.prod.limbik.com/rest/api/organizations' \
  -H 'accept: application/json'
```

Response: use `data[].uid` as `account_id` in all subsequent requests.

### 2. Get bearer token

```sh
curl -X POST 'https://cortex.prod.limbik.com/rest/api/auth/login' \
  -H 'Content-Type: application/json' \
  -d '{"username": "your_username", "password": "your_password"}'
```

Response: `access_token` — include as `Authorization: Bearer <token>` in all API requests.

---

## Use Case 1: Generate Message Copy

### Step 1: Generate copy via Limbik

```sh
curl -X GET \
  'https://cortex.prod.limbik.com/rest/api/forecasts/generate/template?prompt=YOUR_PROMPT' \
  -H 'account_id: YOUR_ACCOUNT_ID' \
  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
  -H 'accept: application/json'
```

**Key response fields:**

| Field | Description |
|-------|-------------|
| `additionalDetail` | **Primary field** — the complete AI-generated message copy to use |
| `displayText` | Short title/summary |
| `type` | `"Generate"` for AI-generated, `"Message"` for validated |
| `population` | Target audience segment used |

### Step 2: Send copy via Braze

Pass `additionalDetail` into the Braze trigger send endpoint:

```json
{
  "campaign_id": "{{YOUR_CAMPAIGN_ID}}",
  "trigger_properties": {
    "payload": "{{additionalDetail}}"
  },
  "broadcast": true
}
```

Alternatively, use `additionalDetail` to populate the message object in the `/messages/send` endpoint.

---

## Use Case 2: Synthetic Audience Targeting

Use Limbik's population data to populate Braze Connected Audience objects.

> **Note:** Connected Audience objects cannot target Braze "default" attributes — store any targeted attributes as **custom attributes** in Braze.

### Step 1: List available countries

```sh
curl -X GET \
  'https://cortex.prod.limbik.com/rest/api/populations/list/{account_id}' \
  -H 'accept: application/json'
```

Returns country list with IDs (e.g., US Adults = `id: 56`).

### Step 2: Retrieve segments for a country

```sh
curl -X GET \
  'https://cortex.prod.limbik.com/rest/api/populations/{account_id}/{population_id}' \
  -H 'accept: application/json'
```

> Response can be large — cache this data to avoid repeated calls.

Use returned demographic data (gender, location, etc.) to construct Connected Audience filter objects when calling Braze messaging endpoints.

---

## API Base URL

All Limbik API calls use: `https://cortex.prod.limbik.com/rest/api/`
