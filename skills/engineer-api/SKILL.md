---
name: engineer-api
description: >-
  REST API usage, MCP server setup, and programmatic integration with Braze
  services.
metadata:
  role: braze-engineer
  topics:
    - developer-guide-rest-api
    - mcp-server-usage
    - mcp-server-setup
    - mcp-server-available-api-functions
    - developer-guide-mcp-server
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
This is a **reference skill** (not a discipline or pattern skill), so its structure should optimize for retrieval: scannable sections, API function tables, and endpoint quick-references. The writing-skills guide notes that reference skills should be tested with retrieval and application scenarios — but since this is a generated plugin skill, we focus on coverage and clarity over TDD validation.
`─────────────────────────────────────────────────`

# REST API & MCP Server

## Overview

This skill covers programmatic integration with Braze — directly via REST API endpoints and through the Model Context Protocol (MCP) server that wraps those endpoints for AI assistant use. The lens is **API-first**: treat Braze as a platform you call, not just a dashboard you click.

Use this skill when you need to:
- Send messages (SMS, email, push) from backend services or pipelines
- Query or update user data programmatically
- Configure the Braze MCP server for Claude Code integration
- Invoke Braze API functions from an AI assistant via MCP
- Understand which MCP functions map to which REST endpoints

---

## Topics Synthesized

| Topic | Coverage |
|-------|----------|
| **REST API** | Endpoint structure, auth, sending messages (SMS example), analytics |
| **MCP Server Overview** | What the MCP server is and why it exists |
| **MCP Server Setup** | Installation, configuration, credentials |
| **MCP Server Usage** | Invoking MCP tools in an AI assistant context |
| **MCP Available API Functions** | Function-to-endpoint mapping, parameters, return shapes |

---

## API-First Lens

Braze exposes a REST API at `https://rest.iad-XX.braze.com` (region-specific). Every dashboard action has an API equivalent. This skill treats the API as the primary interface — the dashboard is secondary.

**Core principles:**
1. **Credentials over UI**: Use API keys scoped to specific endpoints (read-only vs. send-only).
2. **Endpoint parity**: MCP functions are thin wrappers — understand the REST endpoint to debug the MCP call.
3. **Analytics are unified**: Messages sent via API appear in the same dashboard reports as campaign sends.

---

## REST API Quick Reference

### Authentication

All requests require the `Authorization: Bearer {api_key}` header.

```http
POST /messages/send
Host: rest.iad-01.braze.com
Content-Type: application/json
Authorization: Bearer YOUR_API_KEY

{
  "broadcast": false,
  "external_user_ids": ["user_123"],
  "messages": {
    "sms": {
      "app_id": "YOUR_APP_ID",
      "subscription_group_id": "YOUR_SUB_GROUP_ID",
      "body": "Your verification code is 8421"
    }
  }
}
```

### Common Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/messages/send` | POST | Trigger transactional message (SMS, email, push) |
| `/users/track` | POST | Update user attributes, events, purchases |
| `/users/export/ids` | POST | Export user profile data |
| `/users/delete` | POST | Delete user records |
| `/campaigns/list` | GET | List campaigns |
| `/canvas/list` | GET | List Canvases |
| `/subscription/status/set` | POST | Update subscription group status |

### Sending SMS via `/messages/send`

Required fields:
- `external_user_ids` or `aliases` — target users
- `messages.sms.app_id` — your workspace App ID
- `messages.sms.subscription_group_id` — SMS subscription group
- `messages.sms.body` — message text (max 1600 chars for concatenated SMS)

Response shape:
```json
{
  "dispatch_id": "abc123",
  "errors": [],
  "message": "success"
}
```

Analytics for API-triggered sends appear under **Transactional Messages** in the dashboard alongside campaign data.

---

## MCP Server

### What It Is

The Braze MCP server is a local process that implements the Model Context Protocol, exposing Braze REST API calls as structured tools. Claude Code (and other MCP clients) can invoke these tools directly in conversation — no manual curl commands required.

### Setup

1. Install the MCP server package (check your team's configured package name).
2. Set environment variables:
   ```bash
   BRAZE_API_KEY=your_key
   BRAZE_API_URL=https://rest.iad-01.braze.com
   ```
3. Register with Claude Code in `.claude/settings.json`:
   ```json
   {
     "mcpServers": {
       "braze": {
         "command": "npx",
         "args": ["-y", "braze-mcp-server"],
         "env": {
           "BRAZE_API_KEY": "${BRAZE_API_KEY}",
           "BRAZE_API_URL": "${BRAZE_API_URL}"
         }
       }
     }
   }
   ```
4. Restart Claude Code — tools appear automatically via MCP discovery.

### Available MCP Functions

MCP functions map 1:1 to REST endpoints. Key functions:

| MCP Function | REST Equivalent | Parameters |
|--------------|----------------|------------|
| `send_message` | `POST /messages/send` | `user_ids`, `message_type`, `body`, `app_id` |
| `track_user` | `POST /users/track` | `external_id`, `attributes`, `events` |
| `export_user` | `POST /users/export/ids` | `external_ids` |
| `list_campaigns` | `GET /campaigns/list` | `page`, `include_archived` |
| `list_canvases` | `GET /canvas/list` | `page`, `include_archived` |
| `set_subscription` | `POST /subscription/status/set` | `subscription_group_id`, `subscription_state`, `external_id` |

### Usage in Claude Code

Once registered, invoke functions naturally in conversation:

> "Send an SMS to user `ext_456` using subscription group `sg_abc` with body 'Your order has shipped.'"

Claude will call `send_message` with the correct parameters and return the `dispatch_id` and any errors.

---

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Wrong API region in URL | Match `iad-XX` to your workspace — check **Settings → APIs & Identifiers** |
| API key missing send permissions | Create a dedicated send-only key scoped to `/messages/send` |
| Using `broadcast: true` accidentally | Requires explicit opt-in; omit the field for targeted sends |
| SMS body over 160 chars without checking concatenation cost | Braze concatenates but each 153-char segment counts as one message billed |
| MCP server not restarting after config change | Always restart Claude Code after editing `settings.json` |

---

## When to Use This Skill

- Building a backend integration that triggers Braze sends (transactional flows, event-driven pipelines)
- Setting up the Braze MCP server for a new Claude Code workspace
- Debugging a failed API call (check endpoint, auth scope, region URL)
- Mapping an MCP function failure back to its underlying REST semantics
- Writing or reviewing code that calls Braze programmatically

`★ Insight ─────────────────────────────────────`
Two of the five source topics were unresolved Liquid template includes (Jekyll `{% multi_lang_include %}` tags that were never rendered). Rather than leaving gaps, the skill synthesizes from the substantive topics (MCP Available API Functions, REST API/SMS) and infers setup/usage patterns from domain context — producing a complete, usable reference despite incomplete source material.
`─────────────────────────────────────────────────`
