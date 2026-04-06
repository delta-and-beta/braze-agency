---
name: api-basics
source_url: 'https://braze-inc.github.io/braze-docs/_api/basics'
indexed_at: '2026-04-05'
keywords:
  - REST
  - endpoints
  - API-keys
  - authentication
  - user-IDs
  - rate-limiting
  - templates
  - collections
  - catalogs
  - subscriptions
triggers:
  - find REST endpoint
  - create API key
  - authenticate API calls
  - set up user tracking
  - manage API permissions
---
`★ Insight ─────────────────────────────────────`
Topic files in Nick's pipeline serve as **atomic knowledge units** — they live in `skills/{name}/references/` and are designed to be retrieved independently at runtime. The key constraint: each must be fully self-contained since the retrieval system may surface just this file, not the surrounding skill context.
`─────────────────────────────────────────────────`

# API Basics

## REST API Endpoint Collections

| Collection | Purpose |
|---|---|
| Catalogs | Create and manage catalogs and catalog items for campaigns |
| Cloud Data Ingestion | Manage data warehouse integrations and syncs |
| Email lists and addresses | Bi-directional sync between Braze and email systems |
| Export | Access and export campaign, Canvas, KPI details |
| Media Library | Manage assets within Braze |
| Messages | Schedule, send, and manage campaigns and Canvases |
| Preference center | Build and style preference centers |
| SCIM | Manage user identities in cloud-based services |
| SMS | Manage users' phone numbers in subscription groups |
| Subscription groups | List and update SMS and email subscription groups |
| Templates | Create and update email and Content Block templates |
| User data | Identify, track, and manage users |

## Endpoints

Braze provisions accounts to specific instances, each with its own dashboard URL and REST endpoint. To find your REST endpoint:

1. Go to **Settings** > **APIs and Identifiers** > **API Keys**
2. Select an existing API key or create a new one
3. Copy the REST endpoint shown on that tab

> **Important:** Use the REST endpoint for API calls. For SDK integration, use the SDK endpoint — these are different.

**Default rate limit:** 250,000 requests per hour. Some request types have custom limits for high-volume handling.

## User IDs

| ID Type | Field | Notes |
|---|---|---|
| External user ID | `external_id` | Your unique identifier — must match what's set in the Braze SDK to avoid duplicate profiles |
| Braze user ID | `braze_id` | Braze-assigned identifier — can be used to delete users via REST API |

## REST API Keys

A REST API key authenticates API calls and identifies the calling application. Keys work with App Identifier keys to enable tracking, access, sending, exporting, and analyzing data.

- Also referred to as `api_key`
- Passed as a **request header** on every API call
- Scoped to specific endpoints — each key only authenticates calls to its permitted endpoints
- Workspace-scoped: each workspace has its own REST API keys

### Creating a REST API Key

1. Go to **Settings** > **APIs and Identifiers**
2. Select **Create API Key**
3. Name the key for easy identification
4. Specify allowlisted IP addresses and subnets
5. Select endpoint permissions to associate with the key

> **Important:** After creation, you **cannot edit** the scope of permissions or allowlisted IPs. To change permissions, create a new key with updated permissions, migrate to it, then delete the old key.

### REST API Key Permissions

Permissions control which API endpoints a key can call. View permissions at **Settings** > **APIs and Identifiers** > select key.

Key permission categories:
- **User Data** — track, export, and manage user records
- **Messages** — send and schedule messages
- **Campaigns/Canvases** — access campaign and Canvas data
- **Segments** — manage audience segments
- **Export** — bulk data export operations

### API IP Allowlisting

Restrict API key usage to specific IP addresses or CIDR subnets. Requests from non-allowlisted IPs are rejected, adding a network-layer security control.

## Identifier Keys vs. REST API Keys

REST API keys handle authentication for general API access. **Identifier keys** are separate — they reference specific Braze objects (apps, templates, Canvases, campaigns, Content Cards, segments) within API calls. Both types may be needed when constructing requests.

`★ Insight ─────────────────────────────────────`
Notice the topic strips all Jekyll template syntax (`{{site.baseurl}}`, `{% alert %}`, `{% tabs %}`) and `{: .reset-td-br-1}` table attributes — these are build-time artifacts that would appear as literal strings when the file is retrieved by the MCP semantic search layer. Clean markdown ensures the content is usable at runtime without a Jekyll build step.
`─────────────────────────────────────────────────`
