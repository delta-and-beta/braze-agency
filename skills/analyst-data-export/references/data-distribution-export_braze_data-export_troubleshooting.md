---
name: data-distribution-export_braze_data-export_troubleshooting
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/data/distribution/export_braze_data/export_troubleshooting
indexed_at: '2026-04-05'
keywords:
  - export
  - troubleshooting
  - S3
  - CSV
  - bucket
  - API
  - storage
  - credentials
  - expiration
  - errors
triggers:
  - export failed or expired
  - troubleshoot export errors
  - export file too large
  - download link not working
  - access denied during export
---
# Export Troubleshooting

## Default Braze S3 Bucket (No Storage Partner)

Files are temporary and **expire after 4 hours**.

### CSV Exports

- Braze emails a download link (ZIP of multiple smaller files) to the logged-in user.
- Must be logged in to use the link; link expires after 4 hours.
- Exports over 500,000 users may fail — split into smaller groups or add a storage partner.

| Error | Cause | Fix |
|-------|-------|-----|
| `AccessDenied` | File expired or not yet ready | Wait a few minutes and retry |
| `ExpiredToken` | 4-hour window passed | Re-run the export |
| "File doesn't exist anymore" | File still uploading to S3 | Wait a few minutes and retry |

**Note on apostrophes:** Fields starting with `-`, `=`, `+`, or `@` are prefixed with `'` (e.g., `-1943` → `'-1943`). This prevents spreadsheet misinterpretation. Does not apply to JSON exports from `/users/export/segment`.

### API Exports

- No email sent — download URL is in the API response.
- Same 4-hour expiration applies.
- Use `callback_endpoint` in the request to receive a notification when the file is ready.
- Large exports may time out — make smaller requests or connect a storage partner.

**Common errors:** `AccessDenied` / `ExpiredToken` — link expired or file not ready yet. Re-run or wait.

---

## Cloud Storage Connected (S3, GCS, Azure Blob)

Set as default from **Technology Partners** in the dashboard. More reliable for large exports.

### CSV Exports

- Braze emails a link (expires ~4 hours) AND delivers a copy to your bucket.
- Bucket copy follows your own retention/expiration policies.
- Exports are ZIPs of multiple smaller CSVs; large exports split into ~5,000-user chunks — this is expected, not missing data.
- If the emailed link fails, retrieve directly from your bucket.

| Error | Cause | Fix |
|-------|-------|-----|
| `AccessDenied` | Braze can't write to bucket | Verify credentials and bucket permissions |
| `ExpiredToken` | Braze lost access to bucket | Update credentials in Braze dashboard |
| Files smaller than expected | Normal chunked splitting | No action needed |

**Apostrophe prefix behavior** same as default bucket (see above).

### API Exports

- Files written directly to your bucket — no email sent.
- Download URLs from Braze may still be time-limited; objects in your storage follow your retention settings.
- Large exports may be split into multiple ZIP files (each containing JSON, one object per line).

| Error | Cause | Fix |
|-------|-------|-----|
| `AccessDenied` | Braze can't write to bucket, or objects deleted externally | Check permissions; confirm nothing external is clearing files |
| `ExpiredToken` | Braze's bucket credentials outdated | Refresh credentials in the dashboard |
| Files missing/smaller than expected | External deletion or normal chunking | Confirm no external process is removing objects; smaller sizes are expected |

`★ Insight ─────────────────────────────────────`
- The tab-based structure (`sdktabs`) in Braze's Jekyll docs is a UI navigation pattern — flattening it into a two-section document with clear headings is the right call for a reference topic, since the divergence is about infrastructure setup, not user persona.
- The apostrophe-prefix behavior is a classic CSV injection defense (also called formula injection prevention). By prepending `'`, values starting with `=`, `+`, `-`, or `@` are treated as strings rather than formulas in Excel/Sheets. Worth preserving explicitly since engineers often flag it as a bug.
`─────────────────────────────────────────────────`
