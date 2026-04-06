---
name: export-user-data-post-users-global-control-group
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/export/user_data/post_users_global_control_group
indexed_at: '2026-04-05'
keywords:
  - export
  - users
  - global-control-group
  - callback
  - fields
  - batch
  - S3
  - Azure
  - zip
  - pagination
triggers:
  - export global control group users
  - batch export user data
  - configure export callback endpoint
  - export users to cloud storage
  - download user data as file
---
`★ Insight ─────────────────────────────────────`
- The Braze `/users/export/global_control_group` endpoint is a `POST` (not `GET`) despite being a data export — this is common in APIs where the request body needs to carry configuration (fields, format, callback), which HTTP GET doesn't support cleanly.
- The file-per-5000-users batching strategy is a server-side pagination pattern that shifts reassembly responsibility to the client, trading server memory for client flexibility.
`─────────────────────────────────────────────────`

## Export Global Control Group Users

**Endpoint:** `POST /users/export/global_control_group`

Exports all users within a Global Control Group as multiple newline-delimited JSON files (one JSON object per line). All users are included on each export — Braze does not store add/remove history for the group.

**Required permission:** `users.export.global_control_group`

**Rate limit:** Default

---

### Request

```
Content-Type: application/json
Authorization: Bearer YOUR-REST-API-KEY
```

```json
{
  "callback_endpoint": "(optional) endpoint to POST download URL when export is ready",
  "fields_to_export": ["first_name", "email", "purchases"],
  "output_format": "(optional) 'zip' or 'gzip' — defaults to 'zip'"
}
```

| Parameter | Required | Type | Description |
|---|---|---|---|
| `callback_endpoint` | Optional | String | URL to receive a POST when export is ready |
| `fields_to_export` | Required* | Array of Strings | Fields to include. Use `custom_attributes` to export all custom attributes. Individual custom attributes cannot be exported directly. |
| `output_format` | Optional | String | `zip` or `gzip`. Only applies when using your own S3/Azure bucket. |

> *New accounts (post April 2021) must specify explicit fields.

**Example request:**
```bash
curl --location --request POST 'https://rest.iad-01.braze.com/users/export/global_control_group' \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer YOUR-REST-API-KEY' \
  --data-raw '{
    "callback_endpoint": "https://your-server.com/export-callback",
    "fields_to_export": ["first_name", "email", "custom_attributes"],
    "output_format": "zip"
  }'
```

---

### Response Behavior

**With cloud storage credentials (S3/Azure):**
Files are uploaded to your bucket as ZIP (or gzip) files. Path format:
```
bucket-name/segment-export/SEGMENT_ID/YYYY-MM-dd/RANDOM_UUID-TIMESTAMP/filename.zip
```

**Without cloud storage credentials:**
Response includes a URL to download a ZIP. URL is only valid once export is ready. Large exports may fail due to transfer size limits — use `fields_to_export` to minimize payload.

**Callback behavior:** When `callback_endpoint` is set, Braze POSTs `{"success": true}` (plus `"url": "..."` if no cloud storage configured) when ready.

---

### Key Behaviors

- Files are batched at ~5,000 users per file; concatenate JSON files as needed.
- Large exports (e.g., 20M users) can take an hour or more.
- To locate the Global Control Group segment ID, use the Braze dashboard API identifier types page (Segments tab).
- If exports fail due to size, split users into sub-segments by random bucket number (e.g., bucket < 1,000).
- Setting up S3/Azure credentials is strongly recommended to enforce your own bucket policies.
