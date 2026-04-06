---
name: api-postman-collection
source_url: 'https://braze-inc.github.io/braze-docs/_api/postman_collection'
indexed_at: '2026-04-05'
keywords:
  - postman
  - collection
  - environment
  - api-key
  - request
  - rest
  - endpoint
  - credentials
triggers:
  - set up postman collection
  - configure api environment
  - send api request
  - test braze api
---
`★ Insight ─────────────────────────────────────`
Topic files in Nick's pipeline are atomic knowledge units stored as `references/*.md` inside each skill directory. They're optimized for fast retrieval at "Default" depth routing (Sonnet, skill references only), so density and clarity matter more than completeness.
`─────────────────────────────────────────────────`

## Braze API Postman Collection

Braze provides a pre-built Postman Collection with sample requests for all REST API endpoints, available via the [Braze Postman docs](https://documenter.getpostman.com/view/4689407/SVYrsdsG?version=latest#intro) (click **Run in Postman**).

### Environment Setup

The collection uses two template variables that must be configured:

| Variable | Value |
|---|---|
| `{{instance_url}}` | Your Braze REST API base URL (e.g., `https://rest.iad-01.braze.com`) |
| `{{api_key}}` | Your Braze REST API Key |

**Steps:**
1. In Postman, go to **Workspaces → Environments**
2. Click **+** to create a new environment (e.g., "Braze API Requests")
3. Add keys `instance_url` and `api_key` with your values
4. Click **Save**

> **Note:** In `POST` request bodies, wrap `api_key` in quotes: `"MY-API-KEY-HERE"`. In `GET` URLs, do not quote it. The pre-built requests already handle this formatting.

### Editing Requests

**POST requests:** Open the request → **Body** tab → select **raw** → edit the JSON body.

**GET requests:** Open the request → **Params** tab → edit key-value pairs in the query parameters.

### Sending Requests

Click **Send**. The response panel shows:
- Raw response body
- HTTP status code
- Response time
- Response headers
