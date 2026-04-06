---
name: engineer-localization
description: >-
  Technical setup of translation management and localization partner platforms
  for multi-language content delivery.
metadata:
  role: braze-engineer
  topics:
    - message-personalization-localization
    - localization-transifex
    - localization-tangerine
    - localization-smartling
    - localization-phrase
    - localization-lokalise
    - localization-lilt
    - localization-crowdin
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
- Skill files are reference guides optimized for scanning — tables and bullets over prose
- The "lens" (API integration + pipeline configuration) tells us to emphasize technical setup steps over UX workflows
- All localization partner integrations share a common pattern: Braze content export → translation management → reimport; making this explicit once saves repeating it per-partner
`─────────────────────────────────────────────────`

# Localization Integration Engineering

## Overview

This skill covers the technical integration of translation management systems (TMS) and localization platforms with Braze for multi-language content delivery. It addresses API authentication, content pipeline configuration, webhook setup, and ongoing sync orchestration for each supported partner.

**Core principle:** Localization integrations follow a common pipeline pattern — Braze content export → TMS ingestion → translation workflow → reimport into Braze. The platform-specific differences lie in authentication method, content format expectations, and sync trigger mechanism.

## When to Use

Use this skill when:
- Setting up or configuring a new localization partner integration with Braze
- Troubleshooting content sync failures between Braze and a TMS
- Evaluating which localization partner to recommend for a given workflow requirement
- Configuring webhooks, API keys, or connected content calls for translated content delivery
- Building or auditing a multi-language content pipeline

Do **not** use this skill for:
- Authoring translation copy or managing translation glossaries (content concern, not engineering)
- Liquid templating for in-message language switching (use the Personalization skill)
- Campaign or Canvas scheduling across locales (use the Orchestration skill)

## Common Pipeline Architecture

All supported partners integrate with Braze via one of two pipeline models:

| Model | Flow | Best For |
|-------|------|----------|
| **Push-Pull** | Braze → TMS (export), TMS → Braze (reimport via API) | Batch campaigns, scheduled sends |
| **Connected Content** | Braze calls TMS API at send time to fetch translated string | Dynamic/real-time content, short strings |

Establish which model applies before configuring any partner — it determines which API credentials are needed and where they are configured.

## Supported Partners

### Transifex

**Integration type:** Push-Pull (file-based)

**Setup steps:**
1. Create a Transifex project and note the **Organization slug** and **Project slug**
2. Generate a Transifex API token (`Settings → API token`)
3. In Braze, configure a Content Export webhook pointing to the Transifex `/resource_strings_async_uploads/` endpoint
4. Map Braze content types (email body, push title/body, in-app message) to Transifex resource file format (typically JSON or YAML)
5. Configure a Transifex automation rule to trigger translation on resource upload
6. On translation completion, use the Transifex webhook (`project.translated`) to POST translated strings back to Braze via the `/templates/email/update` or `/campaigns/trigger/send` endpoints

**Auth:** Bearer token in `Authorization` header

**Key config values:**
- `TRANSIFEX_TOKEN` — API token
- `TRANSIFEX_ORG` — organization slug
- `TRANSIFEX_PROJECT` — project slug

---

### Smartling

**Integration type:** Push-Pull (file-based) or Connected Content

**Setup steps:**
1. Create a Smartling project; capture **Project ID** and **User ID + User Secret** from project settings
2. Use the Smartling Files API (`/files-api/v2/projects/{projectId}/file`) to upload source content
3. Configure the Smartling workflow to route files through the appropriate translation job type (human, MT, hybrid)
4. On job completion, pull translated files via the `/files-api/v2/projects/{projectId}/locales/{localeId}/file` endpoint
5. Parse returned content and update Braze via the Campaigns or Templates API

**Auth:** OAuth 2.0 client credentials — exchange User ID + Secret for a bearer token at `/auth-api/v2/authenticate`

**Key config values:**
- `SMARTLING_USER_ID`
- `SMARTLING_USER_SECRET`
- `SMARTLING_PROJECT_ID`

**Note:** Smartling supports a Braze-native connector (available in the Smartling dashboard under *Integrations → Braze*) that handles content extraction automatically — evaluate this before building a custom pipeline.

---

### Phrase

**Integration type:** Push-Pull; optional Connected Content via Phrase Strings OTA API

**Setup steps:**
1. Create a Phrase project; generate an **Access Token** under `Profile → Access Tokens`
2. Use the Phrase API (`/api/v2/projects/{project_id}/uploads`) to push source strings as JSON or XLIFF
3. Assign translators or configure machine translation providers within the Phrase workflow
4. Poll or webhook on `translation.completed` to download translated locale files via `/api/v2/projects/{project_id}/locales/{id}/download`
5. Reimport into Braze via the appropriate API endpoint

**For OTA/Connected Content use:**
- Enable the Phrase Strings OTA distribution
- Use the distribution URL in a Braze Connected Content block: `{% connected_content https://ota.phrase.com/api/v2/.../{locale}.json :save translations %}`

**Auth:** `Authorization: token {ACCESS_TOKEN}` header

---

### Lokalise

**Integration type:** Push-Pull with native Braze connector

**Setup steps:**
1. In Lokalise, navigate to *Apps → Braze* and follow the OAuth connection flow
2. Configure the project mapping: select which Lokalise project maps to which Braze workspace
3. Choose content types to sync (email templates, push notifications, in-app messages)
4. Set sync direction: **Lokalise → Braze** (publish), **Braze → Lokalise** (extract source)
5. Trigger initial source extraction; verify strings appear in the Lokalise editor
6. After translation, publish back to Braze using the *Publish to Braze* button or automate via the Lokalise webhook on `project.published`

**Auth:** Managed via OAuth within the Lokalise ↔ Braze connector; API token (`LOKALISE_API_TOKEN`) required for custom pipeline work outside the native connector

**Key difference from other partners:** The native connector handles content mapping automatically — avoid duplicating this logic in a custom integration.

---

### LILT

**Integration type:** Push-Pull with AI-assisted translation

**Setup steps:**
1. Obtain LILT API key from your LILT account manager (enterprise provisioning)
2. Use LILT Workflows API to create a new workflow job: `POST /v2/workflows/jobs`
3. Upload source segments via `POST /v2/memory` (for TM seeding) and `POST /v2/workflows/jobs/{id}/docs`
4. LILT's AI engine + human review pipeline processes translation
5. Poll job status via `GET /v2/workflows/jobs/{id}` or configure a delivery webhook
6. On completion, retrieve translated documents and ingest into Braze

**Auth:** `Authorization: Basic {BASE64(api_key:)}` — note the trailing colon

**Key consideration:** LILT is optimized for large-volume, high-quality enterprise translation. Set realistic SLA expectations in the pipeline orchestration layer; this is not suitable for real-time Connected Content delivery.

---

### Crowdin

**Integration type:** Push-Pull with optional Crowdin Apps connector

**Setup steps:**
1. Create a Crowdin project; generate a **Personal Access Token** under `Account Settings → Access Tokens`
2. Use the Crowdin API v2 to upload source files: `POST /api/v2/projects/{projectId}/files`
3. Configure the Crowdin translation workflow (crowdsource, vendor, or MT)
4. On translation completion (webhook: `file.translated`), download via `GET /api/v2/projects/{projectId}/translations/builds/{buildId}/download`
5. Parse and sync translated content to Braze

**Auth:** `Authorization: Bearer {PERSONAL_ACCESS_TOKEN}`

**Crowdin Apps:** Evaluate the Crowdin Marketplace for a Braze-specific connector before building custom — reduces integration maintenance overhead.

---

### Tangerine

**Integration type:** Minimal documentation available — verify with platform team

**Known:** Tangerine is a localization partner in the Braze ecosystem. Full API documentation was not available at skill authoring time.

**Recommended approach:**
- Contact your Tangerine account representative for API credentials and endpoint documentation
- Default to the Push-Pull pipeline pattern used by other partners in this skill
- Confirm auth method (API key vs. OAuth) before implementation

---

## Quick Reference: Auth Patterns by Partner

| Partner | Auth Method | Credential Location in Braze |
|---------|-------------|-------------------------------|
| Transifex | Bearer token | Connected Content credential store |
| Smartling | OAuth 2.0 (client credentials) | Fetch token at pipeline init; store in env |
| Phrase | Static access token | Connected Content credential store |
| Lokalise | OAuth (native connector) | Managed within Lokalise app |
| LILT | HTTP Basic (key + empty secret) | Pipeline environment variable |
| Crowdin | Bearer token | Connected Content credential store |

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Using locale codes inconsistently across systems | Normalize to BCP 47 (e.g., `en-US`, `fr-FR`) at the pipeline boundary; map to TMS-specific codes in the adapter layer |
| Reimporting translated content over live production content | Stage translated content in a separate Braze workspace or template variant until QA is complete |
| Building a custom connector when a native one exists | Check the TMS marketplace (Lokalise, Crowdin, Smartling all have native Braze connectors) before writing integration code |
| Polling for translation completion on short intervals | Use webhooks where supported; polling at <5-min intervals risks rate limiting on TMS APIs |
| Storing API credentials in Braze message bodies | Use Braze Connected Content credential store or environment-level secrets management |

## Related Skills

- **Content Personalization** — Liquid-based locale switching within a single Braze message
- **API Rate Limit Management** — Handling TMS and Braze API throttling in pipeline orchestration
- **Template Management** — Braze email and push template versioning during translation cycles

`★ Insight ─────────────────────────────────────`
- Each partner section follows the same structure (type → steps → auth → key values) — this parallel structure lets engineers scan to the partner they need without reading everything
- The Quick Reference auth table serves as a cheat sheet that answers the most common setup question ("how do I authenticate?") without reading full partner sections
- Documenting Tangerine's known unknowns explicitly (rather than omitting it) prevents engineers from assuming the skill is incomplete and re-researching
`─────────────────────────────────────────────────`
