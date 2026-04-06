---
name: get-started-b2b-use-cases-b2b-salesforce-sales-cloud
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/get_started/b2b_use_cases/b2b_salesforce_sales_cloud
indexed_at: '2026-04-05'
keywords:
  - webhook
  - Salesforce
  - OAuth
  - authentication
  - lead
  - integration
  - API
  - credentials
triggers:
  - create lead in Salesforce
  - update lead stage
  - integrate Braze with Salesforce
  - sync leads to Salesforce
  - connect Braze Salesforce
---
# Braze → Salesforce Sales Cloud Integration (Webhooks)

**Integration type:** Community-submitted (not officially Braze-supported)  
**Mechanism:** Braze webhooks → Salesforce `sobjects/Lead` REST API  
**Auth:** Salesforce OAuth 2.0 Client Credentials Flow

## Two Use Cases

1. **Create Lead** — triggered by Braze user events (e.g., form fill)
2. **Update Lead** — patch existing Salesforce lead fields (e.g., MQL stage transition)

> This is one-way: Braze → Salesforce only. For reverse sync, use B2B data models or a technology partner.

---

## Prerequisites: Salesforce Connected App

Follow Salesforce docs: *Configure a Connected App for the OAuth 2.0 Client Credentials Flow*

Required settings (override defaults only for these):
- **Enable for device flow**: checked
- **OAuth Scopes**: add `Manage user data via APIs (api)`
- **Enable Client Credentials Flow**: checked
- **Callback URL**: can leave blank

Retrieve credentials: **Platform Tools → Apps → App Manager → [your app] → View → Manage Consumer Details**
- `client_id` = Consumer Key
- `client_secret` = Consumer Secret

---

## Create Lead Webhook

**Template name:** `Salesforce Sales Cloud > Create Lead`

### Compose Tab

| Field | Value |
|-------|-------|
| Webhook URL | `https://[instance].my.salesforce.com/services/data/v60.0/sobjects/Lead/` |
| HTTP Method | `POST` |
| Request Body | JSON Key/Value Pairs |

### Request Body (example mapping)

| Key | Value |
|-----|-------|
| `firstName` | `{{${first_name}}}` |
| `lastName` | `{{${last_name}}}` |
| `email` | `{{${email_address}}}` |
| `company` | `{{custom_attribute.${company}}}` |

Any Braze attribute can be mapped to any Salesforce Lead field.

### Request Headers

| Key | Value |
|-----|-------|
| `Authorization` | `{% connected_content https://[instance].my.salesforce.com/services/oauth2/token :method post :body client_id=[client_id]&client_secret=[client_secret]&grant_type=client_credentials :save result %}Bearer {{result.access_token}}` |
| `Content-Type` | `application/json` |

---

## Update Lead Webhook

**Requires a shared identifier** between Braze and Salesforce. Common approach: use Salesforce `lead_id` as Braze `external_id`.

**Primary use case:** Advance lead stage to MQL after lead scoring threshold is crossed.

**Template name:** `Salesforce Sales Cloud > Update Lead to MQL`

### Compose Tab

| Field | Value |
|-------|-------|
| Webhook URL | `https://[instance].my.salesforce.com/services/data/v60.0/sobjects/Lead/{{${user_id}}}` |
| HTTP Method | `PATCH` |
| Request Body | JSON Key/Value Pairs |

### Request Body

| Key | Value |
|-----|-------|
| `Lead_Stage__c` | `MQL` |

> `Lead_Stage__c` is an example. Match the actual custom field name in your Salesforce org.

### Request Headers

Same `Authorization` connected_content block as Create Lead (see above), plus `Content-Type: application/json`.

---

## Notes

- The `Authorization` header uses Braze's `connected_content` to fetch an OAuth token inline on each webhook send — no pre-stored token needed
- Replace `[instance]` with your Salesforce org's instance name (e.g., `na1`, `eu6`)
- The `PATCH` update endpoint URL includes `{{${user_id}}}` — this resolves to the Braze `external_id`, which must match the Salesforce Lead ID
- Both webhooks are saved as reusable templates and can be added to any Canvas or campaign operational workflow
