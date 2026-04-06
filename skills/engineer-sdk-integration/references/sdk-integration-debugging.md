---
name: sdk-integration-debugging
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/sdk_integration/debugging
indexed_at: '2026-04-05'
keywords:
  - debugging
  - SDK
  - debugger
  - session
  - logs
  - initialization
  - troubleshoot
  - export
  - channels
  - testing
triggers:
  - how to debug SDK issues
  - create debugging session
  - export debug logs
  - reproduce SDK errors
  - enable SDK debugger
---
## SDK Debugging

The Braze SDK includes a built-in debugger accessible from the dashboard, allowing you to troubleshoot SDK-powered channel issues without enabling verbose logging in your app.

### Requirements

**Permissions needed:**
- "View PII" + "View User Profiles (PII Redacted)" — or legacy "View User Profiles PII Compliant"
- "Export User Data" — required to download session logs

**Minimum SDK versions:**
- Swift: 10.2.0
- Android: 32.1.0
- Web SDK: use a URL parameter instead (no debugger UI needed)

### Debugging Session Workflow

1. **Close the app** experiencing issues before starting
2. **Create session** — go to Settings > Setup and Testing > SDK Debugger > Create debugging session
3. **Select user** — search by email, `external_id`, user alias, or push token
4. **Relaunch the app** — confirm device is paired, then relaunch to capture initialization logs
5. **Reproduce the error** — follow reproduction steps as closely as possible for quality logs
6. **End session** — select End Session > Close (log generation may take a few minutes)
7. **Share or export** — download logs as CSV, or share the **Session ID** so others can search for your session directly

### Key Notes

- Relaunch after pairing ensures initialization logs are fully captured
- Session ID allows teammates to find your debug session without file transfer
- Log generation time depends on session length and network connectivity
- For deeper investigation, pair with verbose logging (separate feature)
