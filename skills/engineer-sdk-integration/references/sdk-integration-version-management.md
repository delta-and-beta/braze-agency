---
name: sdk-integration-version-management
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/sdk_integration/version_management
indexed_at: '2026-04-05'
keywords:
  - versioning
  - semver
  - SDK
  - PATCH
  - MINOR
  - MAJOR
  - releases
  - compatibility
  - changelog
  - breaking
triggers:
  - how to update SDK versions
  - watch for new releases
  - manage breaking changes
  - subscribe to SDK releases
  - handle version compatibility
---
## SDK Version Management

Braze SDKs follow [Semantic Versioning (SemVer)](https://semver.org/) (`MAJOR.MINOR.PATCH`):

| Type | Breaking? | Action |
|------|-----------|--------|
| `PATCH` | Never | Update immediately — always safe |
| `MINOR` | Never | Update as soon as possible — no code changes required |
| `MAJOR` | Yes | Update when your team has bandwidth to handle code changes |

Keep SDKs current to maintain compatibility with new Android/Apple OS releases.

## Watching for New Releases

Subscribe to GitHub release notifications for any Braze SDK:

1. Open the SDK repository (e.g., `braze-inc/braze-android-sdk`, `braze-inc/braze-swift-sdk`, `braze-inc/braze-web-sdk`)
2. Click **Watch** → **Custom** → select **Releases** → **Apply**

GitHub (and optionally email) will notify you on each new release.

## Known Issues Policy

Braze **never alters or removes a published release** — even if it has known issues. When a release has a known issue:

- The issue is documented in the Braze SDK changelog
- A new patch is released for the affected major/minor versions as soon as possible

This guarantees your build pipelines won't break due to upstream release changes.
