---
name: getting-started-build-with-llm
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/getting_started/build_with_llm
indexed_at: '2026-04-05'
keywords:
  - Context7
  - MCP
  - Braze
  - SDK
  - initialization
  - push-notifications
  - in-app-messages
  - custom-events
  - React-Native
  - Web
triggers:
  - how to initialize the Braze SDK
  - set up Context7 in my IDE
  - track custom events with Braze
  - configure push notifications
  - register for web push notifications
---
## Building with an LLM (Braze + Context7 MCP)

### Overview

Connect your IDE to the Braze Docs MCP server via [Context7](https://context7.com/braze-inc/braze-docs) to give AI assistants access to accurate, up-to-date Braze SDK documentation.

> **Note:** Context7 ≠ Braze MCP server. Context7 provides **Braze docs**. The Braze MCP server provides read-only access to **your Braze workspace data** (campaigns, segments, analytics). Both can be used together.

---

### Setup: Add Context7 to Your IDE

Add to your IDE's `mcp.json` (or equivalent config file):

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp@latest"]
    }
  }
}
```

| IDE | Config location |
|-----|----------------|
| **Cursor** | Settings > Tools and Integrations > MCP Tools > Add Custom MCP |
| **Claude Desktop** | Settings > Developer > Edit Config (`claude_desktop_config.json`) |
| **VS Code** | `settings.json` or `.vscode/mcp.json` |

After saving, restart your IDE. Include `use context7` in prompts to activate doc retrieval.

---

### Prompt Patterns

#### React Native SDK

```text
# Initialize SDK
Using the Braze React Native SDK, show me how to initialize the SDK 
in my App.tsx with an API key and custom endpoint. Include the 
configuration for automatic session tracking. Use context7.

# Log custom events
I need to track user activity in my React Native app using the Braze 
React Native SDK. Show me how to log a custom event called 
"ProductViewed" with properties for product_id, category, and price. 
Use context7.

# Push notifications
Using the Braze React Native SDK, walk me through requesting push 
notification permissions on both iOS and Android 13+. Include the 
code for registering the push token with Braze. Use context7.

# In-app messages
Show me how to subscribe to in-app messages using the Braze React 
Native SDK, including how to log impressions and button clicks 
programmatically. Use context7.
```

#### Web SDK

```text
# Initialize SDK
Using the Braze Web SDK, show me how to initialize the SDK with 
braze.initialize(), including the API key, base URL, and options 
for enabling logging and automatic in-app message display. 
Use context7.

# Track events + purchases
Using the Braze Web SDK, create a JavaScript module that logs a 
custom event called "VideoPlayed" with properties for video_id, 
duration_seconds, and completion_percentage. Also show how to log 
a purchase with product ID, price, currency code, and quantity. 
Use context7.

# Web push
Using the Braze Web SDK, provide the HTML and JavaScript needed to 
register a user for web push notifications after they click a 
"Subscribe to updates" button. Include the service worker setup. 
Use context7.

# User attributes
Using the Braze Web SDK, show me how to set standard user attributes 
(first name, email, country) and custom user attributes (favorite_genre, 
subscription_tier) for the current user. Use context7.
```

---

### Plain Text Documentation Files

Braze provides LLM-optimized documentation at these URLs:

| File | Purpose |
|------|---------|
| `https://www.braze.com/docs/developer_guide/llms.txt` | Index of developer docs pages (titles + descriptions). Starting point for discovery. |
| `https://www.braze.com/docs/developer_guide/llms-full.txt` | Complete developer docs as a single plain text file. |

These follow the [llms.txt standard](https://llmstxt.org/). Reference directly in prompts or paste into an LLM for context.
