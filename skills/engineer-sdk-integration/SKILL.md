---
name: engineer-sdk-integration
description: >-
  Implements and configures Braze SDK integration including authentication,
  version management, and tag managers.
metadata:
  role: braze-engineer
  topics:
    - sdk-integration-authentication
    - sdk-integration-version-management
    - sdk-integration-rate-limits
    - sdk-integration-google-tag-manager
    - sdk-integration-chatgpt-apps
    - sdk-integration-verbose-logging
    - sdk-integration-reading-verbose-logs
    - sdk-integration-debugging
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
- A SKILL.md body is the "always-loaded" layer — it fires context into the conversation when the skill triggers. Keeping it lean (~1,500–2,000 words) and pointing outward to `references/` topic files is how Nick implements **progressive disclosure**: metadata → SKILL.md → references, each layer only loaded when needed.
- The `lens` concept is important here: the same raw topic (e.g. "SDK Rate Limits") can be presented through different lenses for different roles. An `engineer` lens means code patterns, config snippets, and decision trees — not marketing copy or conceptual overviews.
`─────────────────────────────────────────────────`

```markdown
# SDK Integration

## Purpose

This skill covers the full lifecycle of integrating Braze SDKs into a client application — from initial authentication setup through version management, debugging, and third-party tag manager wiring. Apply this skill when implementing SDK initialization, troubleshooting SDK behavior in a development or QA environment, or connecting Braze to external platforms like Google Tag Manager or ChatGPT Apps.

The lens here is **implementation patterns and SDK configuration**: concrete decisions, code-level specifics, and configuration tradeoffs. Conceptual overviews of what the SDK does belong in product documentation; this skill focuses on how to configure it correctly and what to do when it misbehaves.

---

## When to Use This Skill

Reach for this skill when:

- Setting up or rotating SDK authentication credentials
- Pinning, upgrading, or auditing SDK versions across environments
- Diagnosing unexpected SDK behavior using verbose logging or the built-in debugger
- Integrating Braze via Google Tag Manager instead of a native SDK install
- Connecting Braze to ChatGPT Apps for conversational channel support
- Interpreting rate limit behavior on the client side

---

## Topics This Skill Synthesizes

| Topic | Reference File | Use When |
|-------|---------------|----------|
| SDK Authentication | `references/sdk-authentication.md` | Configuring signed JWT auth or rotating API keys |
| SDK Version Management | `references/sdk-version-management.md` | Pinning versions, upgrading safely, reading changelogs |
| SDK Rate Limits | `references/sdk-rate-limits.md` | Diagnosing throttling, tuning flush intervals |
| Google Tag Manager Integration | `references/google-tag-manager-integration.md` | Deploying Braze via GTM instead of native SDK |
| ChatGPT Apps Integration | `references/chatgpt-apps-integration.md` | Wiring Braze messaging channels into ChatGPT Apps |
| SDK Verbose Logging | `references/sdk-verbose-logging.md` | Enabling detailed diagnostic output during development |
| Reading Verbose Logs | `references/reading-verbose-logs.md` | Interpreting raw log output across messaging channels |
| SDK Debugging | `references/sdk-debugging.md` | Using the dashboard debugger without enabling verbose mode |

---

## Core Implementation Patterns

### Authentication

SDK authentication uses either a standard API key (suitable for most server-side or controlled environments) or signed JWT tokens (required when SDK Authentication is enabled on the dashboard). Key decisions:

- **API key only**: Simpler setup; sufficient when the client environment is trusted.
- **JWT-signed requests**: Required when the Braze dashboard has "SDK Authentication" enforced. The JWT must be generated server-side and refreshed before expiry.

See `references/sdk-authentication.md` for token generation patterns, error handling on auth failures, and rotation procedures.

### Version Management

Braze SDKs follow SemVer. As a practical rule:

- Apply `PATCH` upgrades without review gates — they are non-breaking.
- Gate `MINOR` upgrades behind a changelog review; new features may require opt-in configuration.
- Treat `MAJOR` upgrades as a migration: read the upgrade guide, audit initialization code, and test all active channels before promoting to production.

Maintain a single pinned version per environment (dev / staging / prod). Avoid floating version constraints (`^`, `~`) in production dependencies. See `references/sdk-version-management.md` for platform-specific lockfile patterns.

### Rate Limiting

The SDK implements a **token bucket** algorithm on the client side — it does not surface HTTP 429 responses to the application layer. Symptoms of rate limiting include messages being queued longer than expected or flush events being deferred.

Tuning levers:
- Adjust the flush interval (not below the SDK minimum).
- Reduce event volume by batching attributions before calling `logCustomEvent`.
- Avoid calling `requestImmediateDataFlush` in tight loops.

See `references/sdk-rate-limits.md` for algorithm details and per-platform configuration options.

### Debugging Approach

Two complementary tools are available:

1. **Dashboard Debugger** — Attach a real device from the Braze dashboard. No code changes required. Useful in QA and for channel-specific issues (push, in-app messages, Content Cards). See `references/sdk-debugging.md`.

2. **Verbose Logging** — Enable in initialization code for low-level output including server round-trips, event queuing, and channel rendering. Not for production. See `references/sdk-verbose-logging.md` to enable and `references/reading-verbose-logs.md` to interpret output.

Start with the dashboard debugger. Escalate to verbose logging only when the debugger does not surface enough detail.

---

## Third-Party Integrations

### Google Tag Manager

GTM integration deploys the Braze SDK as a custom tag rather than a direct SDK install. This pattern is common in web contexts where the tag manager already owns the page lifecycle. Key constraints:

- The GTM container fires asynchronously — avoid calling Braze methods before the tag has initialized.
- Variable mappings between the dataLayer and Braze custom attributes require explicit configuration.
- Platform-specific instructions (Web, iOS, Android) differ significantly — consult `references/google-tag-manager-integration.md` for the correct template per platform.

### ChatGPT Apps

Connecting Braze to ChatGPT Apps enables messaging via conversational AI interfaces. Configuration involves OAuth credential exchange and webhook endpoint registration. See `references/chatgpt-apps-integration.md` for the connection workflow and payload schema.

---

## Quick Decision Guide

```
Need to set up SDK for the first time?
  └─ Read references/sdk-authentication.md first, then sdk-version-management.md

SDK not sending events?
  └─ Start with references/sdk-debugging.md (dashboard debugger)
  └─ If debugger insufficient → references/sdk-verbose-logging.md

Events sending but delayed or dropped?
  └─ Check references/sdk-rate-limits.md

Deploying via tag manager?
  └─ references/google-tag-manager-integration.md

Integrating with ChatGPT Apps?
  └─ references/chatgpt-apps-integration.md
```

---

## Additional Resources

### Reference Files

All detailed implementation specifics live in `references/`:

- **`references/sdk-authentication.md`** — JWT signing, API key management, auth error handling
- **`references/sdk-version-management.md`** — SemVer upgrade paths, changelog review process, lockfile patterns
- **`references/sdk-rate-limits.md`** — Token bucket mechanics, flush tuning, per-platform limits
- **`references/google-tag-manager-integration.md`** — GTM tag setup per platform, dataLayer patterns
- **`references/chatgpt-apps-integration.md`** — OAuth flow, webhook config, payload schemas
- **`references/sdk-verbose-logging.md`** — Enabling verbose output, initialization flags per platform
- **`references/reading-verbose-logs.md`** — Log format reference, channel-specific log patterns
- **`references/sdk-debugging.md`** — Dashboard debugger workflow, device attachment, session inspection
```

`★ Insight ─────────────────────────────────────`
- The **Quick Decision Guide** tree is a high-value addition to skill files: it lets Claude route to the right reference immediately rather than loading all 8 topic files. This is the progressive disclosure principle applied within SKILL.md itself.
- The table mapping topics → reference files → trigger conditions gives Claude a routing map. Without it, Claude would need to infer which reference to load from the description alone — the table makes that explicit and reduces hallucinated file paths.
`─────────────────────────────────────────────────`
