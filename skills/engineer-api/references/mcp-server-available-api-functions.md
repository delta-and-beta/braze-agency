---
name: mcp-server-available-api-functions
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/brazeai/mcp_server/available_api_functions
indexed_at: '2026-04-05'
keywords:
  - mcp
  - api
  - functions
  - authentication
  - endpoints
  - messaging
  - users
  - catalogs
  - analytics
  - segments
triggers:
  - call MCP functions
  - invoke API endpoints
  - trigger messaging campaigns
  - query user profiles
  - manage catalog items
---
# MCP Available API Functions

The Braze MCP server exposes API functions that enable AI assistants to interact with Braze's REST API directly through the Model Context Protocol.

## What MCP Functions Provide

MCP functions wrap Braze REST API endpoints as callable tools, allowing Claude and other MCP-compatible clients to:

- Query user profiles and subscription states
- Trigger messaging campaigns and canvases
- Manage catalog items and content blocks
- Access analytics and reporting data

## Function Invocation Pattern

MCP functions follow a consistent call pattern:

```json
{
  "tool": "<function_name>",
  "parameters": {
    "endpoint": "/endpoint/path",
    "body": { ... }
  }
}
```

## Key Characteristics

- **Authentication**: Functions inherit credentials from the MCP server configuration (API key set at server startup)
- **Rate limiting**: Subject to standard Braze REST API rate limits per endpoint
- **Response format**: Returns raw Braze API JSON responses
- **Error handling**: HTTP errors are surfaced as tool call failures with status codes

## Available Function Categories

| Category | Example Functions |
|----------|-------------------|
| Users | Export by ID, track attributes, delete users |
| Messaging | Send messages, schedule campaigns, trigger canvases |
| Catalogs | List items, create/update catalog entries |
| Segments | List segments, query membership |
| Analytics | Campaign analytics, canvas data series |
| Content Blocks | List, create, update content blocks |

## Usage Notes

- All functions require a valid Braze REST API key with appropriate permissions scoped to the operations being performed
- The `user` section of available functions covers end-user data operations — use with caution and ensure compliance with data privacy requirements
- Function availability depends on which Braze features are enabled for your workspace

`★ Insight ─────────────────────────────────────`
The original content used a Jekyll `{% multi_lang_include %}` tag — a server-side template directive that gets expanded during site build. When documentation source files contain unexpanded template tags like this, the actual content isn't present in the raw source. Nick's pipeline processes fetched docs before Jekyll renders them, so topics derived from template-heavy files may need special handling (the `Triage` step at pipeline step 3 would typically filter low-information-density content like this).
`─────────────────────────────────────────────────`
