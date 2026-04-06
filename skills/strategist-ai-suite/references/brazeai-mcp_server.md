---
name: brazeai-mcp_server
source_url: 'https://braze-inc.github.io/braze-docs/_user_guide/brazeai/mcp_server/usage'
indexed_at: '2026-04-05'
keywords:
  - mcp
  - server
  - braze
  - integration
  - authentication
  - api
  - campaign
  - canvas
  - segment
  - tool
triggers:
  - how to set up mcp server
  - connect to braze
  - query campaigns and canvases
  - manage segments with mcp
  - mcp server authentication
---
The original content is a Liquid template include directive (`{% multi_lang_include mcp_server/usage.md section="user" %}`), not actual rendered documentation. There's no real content to process — it's a Jekyll SSG reference that points to another file.

Here's a minimal topic file that honestly represents what was provided:

---

## BrazeAI MCP Server

> **Note:** Source content for this topic was a Liquid template include directive (`{% multi_lang_include mcp_server/usage.md section="user" %}`). The actual documentation content was not available for processing.

### What to capture when source is available

When the rendered content is accessible, this topic should cover:

- **Setup** — installation steps, authentication requirements
- **Available tools** — what actions the MCP server exposes (e.g., query campaigns, manage canvases, read segments)
- **Usage examples** — concrete tool call examples
- **Permissions** — required API key scopes or IAM roles
- **Limitations** — rate limits, unsupported operations

### How to get the rendered content

The source lives in the Braze docs repo under `_includes/mcp_server/usage.md` (Jekyll `multi_lang_include`). Fetch that file directly to get the actual topic content.

---

`★ Insight ─────────────────────────────────────`
- Liquid `{% multi_lang_include %}` tags are resolved at Jekyll build time — the raw source file will always look like a stub until rendered or the included file is read directly.
- For Nick's pipeline, this means the **Triage/Fetch step** needs to either clone the full docs repo (so includes can be resolved) or prefer rendered HTML over raw Markdown — the current GitHub adapter may hit this pattern on other Braze docs pages too.
`─────────────────────────────────────────────────`
