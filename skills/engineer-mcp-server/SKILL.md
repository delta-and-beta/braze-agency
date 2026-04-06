---
name: engineer-mcp-server
description: Setting up and using the Braze MCP server for programmatic API access.
metadata:
  role: braze-engineer
  topics:
    - mcp-server-setup
    - mcp-server-usage
    - mcp-server-available-api-functions
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
- Skill files serve as **routing documents first** — Claude reads the overview to decide relevance, then dives into topic detail. Front-loading triggering conditions and keywords matters more than completeness.
- The "lens" concept acts as an interpretive filter: the same Braze API topics read through a *developer tooling* lens emphasize ergonomics, integration patterns, and code-level mechanics rather than marketing strategy or business configuration.
- When source topics have missing/placeholder content (unrendered Liquid templates), the skill file's synthesized summary becomes the primary knowledge surface — it needs to stand alone.
`─────────────────────────────────────────────────`

# MCP Server Integration

This skill covers setting up and using the Braze MCP server to give AI assistants direct, programmatic access to Braze's REST API through the Model Context Protocol. Use this skill when configuring the MCP server, calling Braze API functions from Claude Code, or debugging MCP-based integrations.

## Scope

This skill applies when you are working with the Braze MCP server as a developer integration layer — not when using the Braze dashboard or SDK. The perspective here is **developer tooling and API integration patterns**: emphasis is on server configuration, function signatures, authentication flows, and how MCP bridges the gap between Claude Code and Braze's REST surface.

## Topics Synthesized

### MCP Server Setup

Covers the configuration steps required to run the Braze MCP server locally or in a hosted environment. This includes environment variables (API key, base URL, endpoint region), dependency installation, and verifying the server is discoverable by Claude Code. When the MCP server is not responding or Claude cannot find Braze tools, this topic guides diagnosis.

### MCP Server Usage

Covers how to invoke the MCP server from within Claude Code once it is running. Includes how tool calls are structured, how responses map back to Braze API responses, and patterns for chaining multiple MCP calls in a single workflow (e.g., fetch a user profile, then trigger a campaign send).

### MCP Available API Functions

The Braze MCP server exposes a set of API functions that map to Braze's REST endpoints. These functions allow AI assistants to perform actions such as:

- Querying user profiles and segment membership
- Triggering campaign and Canvas sends
- Logging custom events and purchases
- Managing subscription groups
- Retrieving analytics and delivery statistics

Each function accepts structured arguments matching Braze's API parameter schema and returns typed responses. Use this topic when you need to know which functions exist, what arguments they accept, or how to interpret their return values.

## When to Use This Skill

- You are setting up the Braze MCP server for the first time
- Claude Code cannot find or call Braze tools (MCP discovery or auth failure)
- You need to know which Braze API operations are available as MCP functions
- You are building a workflow that chains multiple Braze API calls through Claude
- You are debugging a failed MCP function call (wrong arguments, unexpected response shape)

## Lens: Developer Tooling and API Integration Patterns

This skill reads Braze documentation through an integration engineer's perspective. Prefer:

- **Code-level accuracy** over conceptual overview — exact parameter names, required vs. optional fields, and type constraints matter
- **Error surface awareness** — know which failure modes are auth-related, network-related, or schema-related
- **Composability** — design MCP call sequences that are idempotent and recoverable
- **Local-first validation** — confirm server health and tool registration before attempting API calls
