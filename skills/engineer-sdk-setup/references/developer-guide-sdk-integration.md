---
name: developer-guide-sdk-integration
source_url: >-
  https://braze-inc.github.io/braze-docs/_developer_guide/sdk_integration/version_management
indexed_at: '2026-04-05'
keywords:
  - SDK
  - versioning
  - semver
  - updates
  - releases
  - patches
  - breaking
  - compatibility
  - changelog
  - github
triggers:
  - how to update SDK version
  - what version should I upgrade to
  - handling breaking changes in SDK
  - watching for new SDK releases
  - managing SDK compatibility
---
## SDK Version Management

Braze SDKs follow [Semantic Versioning (SemVer)](https://semver.org/) (`MAJOR.MINOR.PATCH`).

### Update Strategy by Version Type

| Type | Nature | Action |
|------|--------|--------|
| `PATCH` | Non-breaking bug fixes | Update immediately |
| `MINOR` | Non-breaking new features, no code changes required | Update as soon as possible |
| `MAJOR` | Breaking changes, may require code changes | Update on a timeline that works for your team |

> OS updates (Android/Apple) sometimes require SDK changes — keep SDK current for device compatibility.

### Watching for New Releases

Subscribe to GitHub release notifications for any Braze SDK:

1. Go to the SDK's GitHub repo (e.g., `braze-android-sdk`, `braze-swift-sdk`, `braze-web-sdk`)
2. Click **Watch** → **Custom** → select **Releases** → **Apply**

You'll receive a GitHub notification (and optionally email) on each new release.

### Known Issues Policy

Braze **never alters or removes a published release** — even if it has known issues. Instead:
- The issue is documented in the [Braze SDK changelog](https://www.braze.com/docs/developer_guide/changelogs/)
- A new patch is released for affected major/minor versions as soon as possible
