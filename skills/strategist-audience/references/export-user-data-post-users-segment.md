---
name: export-user-data-post-users-segment
source_url: >-
  https://braze-inc.github.io/braze-docs/_api/endpoints/export/user_data/post_users_segment
indexed_at: '2026-04-05'
keywords:
  - export
  - segment
  - users
  - storage
  - fields
  - callback
  - bucket
  - permissions
  - format
  - endpoint
triggers:
  - export users from segment
  - bulk download user data
  - configure cloud storage for exports
  - set up segment export callback
---
# Export Users by Segment

**Endpoint:** `POST /users/export/segment`

Exports all users within a segment as multiple files of JSON objects (one object per line).

## Requirements

- API key with `users.export.segment` permission
- `fields_to_export` is **required** in every request
- Only one export per segment can run at a time — wait for completion before retrying

## Request

```
POST https://rest.iad-01.braze.com/users/export/segment
Content-Type: application/json
Authorization: Bearer YOUR-REST-API-KEY
```

```json
{
  "segment_id": "required — identifier for the segment",
  "callback_endpoint": "optional — URL to POST when export is ready",
  "fields_to_export": ["required — array of field names, e.g. 'email', 'custom_attributes'"],
  "output_format": "optional — 'zip' or 'gzip' (default: zip, only applies when using cloud storage)"
}
```

## Response Behavior

| Scenario | Response |
|---|---|
| No cloud storage configured | HTTP response includes a download URL for a ZIP/GZIP file |
| S3, Azure, or GCS credentials configured | File written directly to your bucket; no URL in response |
| Export fails | Email notification sent |

**Recommendation:** Configure cloud storage credentials — reduces failure risk for large exports.

## Cloud Storage Path Format

When credentials are configured, files are written to:

```
bucket-name/segment-export/SEGMENT_ID/YYYY-MM-dd/RANDOM_UUID-TIMESTAMP/filename.zip
```

**Example:**
```
braze.docs.bucket/segment-export/abc56c0c-rd4a-pb0a-870pdf4db07q/2019-04-25/d9696570-dfb7-45ae-baa2-25e302r2da27-1556044807/114f0226319130e1a4770f2602b5639a.zip
```

- `TIMESTAMP` = Unix seconds since `2017-01-01T00:00:00Z`
- Braze creates ~1 file per 5,000 users
- Use `output_format: "gzip"` for `.gz` extension instead of `.zip`

## Data Notes

- `custom_events`, `purchases`, `campaigns_received`, `canvases_received` — **last 90 days only**
- Large exports (e.g. 20M users) can take an hour or more
- If no cloud storage and export is too large, the transfer may fail

## Reducing Export Size

- Always specify only needed fields in `fields_to_export`
- If getting errors, split users into sub-segments using random bucket numbers (e.g. bucket < 1,000; bucket 1,000–2,000)

## Callback Notification

If `callback_endpoint` is provided, Braze POSTs to that URL when the export is ready:

```json
// With cloud storage:
{ "success": true }

// Without cloud storage (includes download URL):
{ "success": true, "url": "https://..." }
```

`★ Insight ─────────────────────────────────────`
- The original Jekyll doc uses Liquid template tags (`{% api %}`, `{% alert %}`, `{% apiref %}`) — these are stripped since they're rendering instructions, not content
- The path breakdown table was collapsed into a single annotated example, which conveys the same structural information more compactly
- The two separate "important" alerts were merged into the Response Behavior table — tabular format makes the conditional logic scannable without losing any facts
`─────────────────────────────────────────────────`
