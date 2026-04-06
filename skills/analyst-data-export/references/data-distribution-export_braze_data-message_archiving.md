---
name: data-distribution-export_braze_data-message_archiving
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/data/distribution/export_braze_data/message_archiving
indexed_at: '2026-04-05'
keywords:
  - archiving
  - export
  - storage
  - compliance
  - S3
  - Azure
  - GCS
  - payload
  - channels
  - identifier
triggers:
  - set up message archiving
  - export messages to cloud storage
  - configure data export destination
  - enable message archiving
  - understand archive file structure
---
`★ Insight ─────────────────────────────────────`
- Topic files in Nick's architecture are **atomic knowledge units** nested under each skill's `references/` directory — they're the lowest layer of the content hierarchy, designed to be fast-lookup fragments
- The goal is stripping Braze's Jekyll template syntax (`{{site.baseurl}}`, `{% image_buster %}`, `{% alert %}`) since those only render in their docs site — they become noise in embeddings
- MD5 of the downcased identifier is a one-way hash used as a privacy-preserving path segment — worth preserving because engineers debugging archiving pipelines need to know to downcase first
`─────────────────────────────────────────────────`

## Message Archiving

Message archiving saves a copy of sent messages to your cloud storage bucket (AWS S3, Azure Blob Storage, or Google Cloud Storage) for compliance, audit, or customer support purposes. Available as a paid add-on — contact your Braze CSM to enable.

### How It Works

When enabled, Braze writes a **gzipped JSON file** for each message sent through selected channels (email, SMS/MMS, push). Files contain final templated values (e.g., `{{${first_name}}}` resolves to the actual name the user received).

**Storage key structure:**
```
sent_messages/{channel}/{MD5 of downcased identifier}/{campaign or Canvas step API ID}/{dispatch_id}.json.gz
```

- Channel: `email`, `push`, or `sms`
- Identifier: downcased email address, push token, or E.164 phone number
- MD5 is one-way — cannot be reversed to recover the original identifier

**Example path:**
```
sent_messages/email/819baa08d8d7e77e19d4666f5fc6050b/ee965cb2-8934-4b0a-acf1-91c899c2f915/651fd10b282850b39e1169c13975234b.json.gz
```

**Push token note:** Braze downcases push tokens before hashing. `Test_Push_Token12345` → `test_push_token12345` → hash `32b802170652af2b5624b695f34de089`.

**Export destination:** Exports to the default data export destination. If no default is set and AWS S3 is connected, it uploads there.

**Performance impact:** File upload occurs immediately before send — archiving adds latency proportional to cloud provider throughput and document size.

### Setup

1. **Connect a cloud storage bucket** — AWS S3, Azure Blob Storage, or Google Cloud Storage. (Currents is not required.)
2. **Select channels** — Go to **Settings > Message Archiving**, select Email, Push, and/or SMS, then **Save changes**.

### JSON Payload Reference

#### Email

```json
{
  "version": 1,
  "to": "customer@example.com",
  "subject": "20% off coupon inside!",
  "from_name": "Braze",
  "from_address": "no-reply@braze.com",
  "html_body": "<html>...",
  "plaintext_body": "...",
  "amp_body": "...",
  "extras": { "key": "value" },
  "headers": { "key": "value" },
  "sent_at": 1609459200,
  "dispatch_id": "...",
  "campaign_id": "...",           // may not be available
  "canvas_id": "...",             // may not be available
  "canvas_step_id": "...",        // may not be available
  "canvas_variation_id": "...",   // may not be available
  "message_variation_id": "...",  // may not be available
  "attachments": [{ "bytes": "...", "file_name": "..." }],  // may not be available
  "user_id": "...",
  "campaign_name": "...",         // only if from a campaign
  "canvas_name": "...",           // only if from a Canvas
  "canvas_step_name": "...",      // only if from a Canvas
  "external_id": "..."
}
```

The `extras` field contains key-value pairs from the **Email Extras** field in the HTML editor. Works across all email service providers (SendGrid, Sparkpost, etc.).

#### SMS/MMS

```json
{
  "version": 1,
  "to": "+15555555555",
  "body": "Hi there!",
  "subscription_group": "...",
  "provider": "...",
  "media_urls": ["..."],          // present only for MMS messages
  "sent_at": 1609459200,
  "dispatch_id": "...",
  "campaign_id": "...",           // may not be available
  "canvas_id": "...",             // may not be available
  "canvas_step_id": "...",        // may not be available
  "canvas_variation_id": "...",   // may not be available
  "message_variation_id": "...",  // may not be available
  "user_id": "...",
  "campaign_name": "...",         // only if from a campaign
  "canvas_name": "...",           // only if from a Canvas
  "canvas_step_name": "...",      // only if from a Canvas
  "external_id": "..."
}
```

#### Push

```json
{
  "version": 1,
  "to": "<push_token>",
  "payload": { /* full push payload JSON */ },
  "platform": "android_push" | "ios_push" | "kindle_push" | "web_push" | "...
```

*(Push payload truncated in source — full schema available in Braze sample files repo: `braze-inc/braze-examples/tree/main/message-archiving`)*

`★ Insight ─────────────────────────────────────`
- The push payload was truncated in the original source — noting this explicitly in the topic file is better than silently omitting it, so future readers know to check the sample repo
- The `extras` field detail (works across all ESPs, maps to Email Extras in the HTML editor) is the kind of non-obvious operational fact worth preserving — it's easy to miss in the original but critical for debugging archived emails
`─────────────────────────────────────────────────`
