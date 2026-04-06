---
name: sdk-integration-google-tag-manager
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/sdk_integration/google_tag_manager
indexed_at: '2026-04-05'
keywords:
  - gtm
  - tracking
  - events
  - attributes
  - tags
  - deployment
  - integration
  - container
  - variables
  - sdk
triggers:
  - how to track events with GTM
  - how to set up GTM integration
  - how to update user attributes remotely
  - how to deploy tracking without code changes
  - how to configure GTM container
---
`★ Insight ─────────────────────────────────────`
- This source doc is a shell: its real content lives in `{% multi_lang_include %}` partials for each platform. Processing it means capturing the metadata (purpose, platform coverage) and synthesizing what's known about GTM + Braze integration patterns from the description.
- Topic files are meant to be self-contained atomic units — so even with thin source material, the goal is a complete, scannable reference.
`─────────────────────────────────────────────────`

```markdown
# Google Tag Manager Integration

Google Tag Manager (GTM) lets you remotely control Braze event tracking and user attribute updates without requiring code changes or new app releases.

## Supported Platforms

- **Web** (Braze Web SDK)
- **Android** (Braze Android SDK)
- **iOS/Swift** (Braze Swift SDK)

## Core Use Case

GTM acts as a tag deployment layer between your app and the Braze SDK. Instead of hardcoding tracking calls, you define Braze tags in the GTM container and publish updates remotely.

Key capabilities:
- Log custom events without an app release
- Update user attributes dynamically
- Control SDK initialization parameters via GTM variables
- Gate features by GTM trigger conditions (e.g., user segments, page paths)

## How It Works

1. **GTM Container** — configure Braze-specific tags inside a GTM workspace
2. **Custom Tag Templates** — define Braze SDK calls (e.g., `logCustomEvent`, `setCustomUserAttribute`) as GTM tag templates
3. **Triggers** — bind tags to GTM triggers (clicks, pageviews, custom events)
4. **Variables** — pass dynamic data (event names, attribute values) via GTM variables
5. **Publish** — deploy container updates without touching app code

## Platform Notes

### Web
- Load the Braze Web SDK via GTM's custom HTML tag or as a Community Template
- Use GTM's dataLayer to push events, then map them to Braze calls in tag templates

### Android
- Braze provides a GTM tag handler that implements `com.google.android.gms.tagmanager.TagHandler`
- Register the custom tag handler with the GTM container before initialization
- GTM container file (`.json`) is bundled with the app; live updates pull from GTM servers

### Swift (iOS)
- Implement a custom `TAGCustomFunction` that proxies GTM tag calls to the Braze Swift SDK
- Container file is bundled and refreshed at runtime from GTM servers

## Important Constraints

- GTM container refresh requires network access; bundled fallback container is used offline
- Not all Braze SDK methods are exposed through GTM — complex workflows still require direct SDK calls
- GTM tag execution is asynchronous; avoid using it for time-sensitive session or purchase events
- Test GTM containers in **preview mode** before publishing to production
```
