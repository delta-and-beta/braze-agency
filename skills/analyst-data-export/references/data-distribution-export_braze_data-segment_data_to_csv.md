---
name: data-distribution-export_braze_data-segment_data_to_csv
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/data/distribution/export_braze_data/segment_data_to_csv
indexed_at: '2026-04-05'
keywords:
  - export
  - CSV
  - segment
  - data
  - user
  - email
  - profile
  - S3
  - API
  - bucket
triggers:
  - how to export segment data
  - export to CSV
  - download user profiles
  - large segment export
  - csv export limit
---
## Export Segment Data to CSV

### How to Export

**From segment editor:** Select **User Data** dropdown → choose "User Data" or "Email Addresses"

**From Segments list page:** Select the gear icon (⚙) next to a segment → CSV Export

> **Tip:** To export all user profiles, create a segment with no filters, then request a CSV export.

Braze generates the report in the background and emails the download link to the currently logged-in user.

### Important Limits

- Exports **fail if estimated segment size exceeds 500,000 users** (uses estimated, not exact size)
- If Amazon S3 is linked, the CSV uploads to your S3 bucket at: `segment-export/SEGMENT_ID/YYYY-MM-dd/users-RANDOMSTRING.zip`

---

### Exported Fields

#### User Data Export

| Field | Description |
|---|---|
| Appboy ID | Internal ID (immutable) |
| country | Country |
| created_at | Profile creation timestamp |
| created_from | Creation method (REST API, SDK, CSV import) |
| devices | Device information |
| date_of_birth | Date of birth |
| email | Email address |
| unsubscribed_from_emails_at | Email unsubscribe date |
| user_id | External ID |
| first_name / last_name | Name |
| first_session / last_session | Session timestamps |
| gender | Gender |
| google_ad_ids | Google advertising IDs |
| city | City |
| IDFAs | Identifier for Advertising values |
| IDFVs | Identifier for Vendor values |
| language | ISO-639-1 language code |
| last_app_version_used | Last app version |
| number_of_google_ad_ids | Count of Google ad IDs |
| number_of_IDFAs | Count of IDFAs |
| number_of_IDFVs | Count of IDFVs |
| number_of_push_tokens | Count of push tokens |
| number_of_roku_ad_ids | Count of Roku ad IDs |
| number_of_windows_ad_ids | Count of Windows ad IDs |
| phone_number | Phone number |
| opted_into_push_at | Push opt-in date |
| unsubscribed_from_push_at | Push unsubscribe date |
| random_bucket | Random bucket number (0–9999) |
| roku_ad_ids | Roku advertising IDs |
| session_count | Total sessions |
| timezone | IANA Time Zone Database format |
| in_app_purchase_total | Total in-app purchase spend |
| user_aliases | User aliases |
| windows_ad_ids | Windows advertising IDs |
| Custom events / attributes | Based on export selection |

#### Email Addresses Export

| Field | Description |
|---|---|
| user_id | External ID |
| first_name / last_name | Name |
| email | Email address |
| unsubscribed_from_emails_at | Email unsubscribe date |
| opted_in_to_emails_at | Email opt-in date |
| user_aliases | User aliases |

---

### Exporting Large Segments (500k+ Users)

Three strategies to work around the 500k limit:

**1. Split into multiple segments** — Manually create smaller sub-segments and export each separately.

**2. Random bucket numbers** — Filter by `random_bucket` to split evenly:
- Segment 1: `random_bucket < 5000` (covers 0–4999)
- Segment 2: `random_bucket > 4999` (covers 5000–9999)

**3. API endpoints** — Export programmatically (subject to data limits):
- `POST /users/export/segment`
- `POST /users/export/global_control_group`
