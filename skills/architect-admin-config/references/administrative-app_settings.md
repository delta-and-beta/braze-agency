---
name: administrative-app_settings
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/administrative/app_settings/workspaces
indexed_at: '2026-04-05'
keywords:
  - workspace
  - app-instance
  - api-key
  - sdk
  - platform
  - settings
  - integration
  - version
  - testing
  - dashboard
triggers:
  - how to create a workspace
  - adding app instances
  - where is my api key
  - setting up sdk
  - managing workspaces and apps
---
`★ Insight ─────────────────────────────────────`
- Topic files in Nick's pipeline are "atomic knowledge units" — they live in `skills/{name}/references/*.md` and are consumed at the Default routing depth (Sonnet, fast lookup), so brevity directly improves response latency
- Stripping Jekyll liquid tags (`{{site.baseurl}}`, `{% image_buster %}`, `{% alert %}`) is essential here — these are server-side template directives that would render as literal noise in an LLM context
- The FAQ section is high-signal content that's often omitted in naive summarization but answers real practitioner questions about edge cases
`─────────────────────────────────────────────────`

## App Settings Overview

Workspaces are the top-level organizational unit in Braze. Everything—campaigns, users, analytics—lives within a workspace. A workspace groups related apps (e.g., the iOS and Android versions of the same product).

---

### Creating a Workspace

1. Select the workspace dropdown in the global header → **Create workspace**
2. Name the workspace (recommended convention: `"ProductName Region – Environment"`, e.g., `"Upon Voyage US – Production"`)
3. Click **Create** — you're redirected to **Settings > App Settings**

---

### Adding App Instances

Each site/app tracked in a workspace is an "app instance."

1. **Settings > App Settings** → **+ Add app**
2. Name the instance, select one or more platforms
3. Braze creates one app instance per platform selected

**Key rule:** Create separate instances for each platform × version combination. Example for a Free/Pro app on iOS/Android = 4 app instances = 4 API keys.

---

### App API Keys

Each app instance gets a unique API key used for:
- SDK integration
- Server-side Braze API requests

Access the key at **Settings > App Settings** → select the app instance.

---

### Live SDK Version

Displayed on the App Settings page per app instance. Shows the highest app version where:
- ≥5% of total daily sessions
- ≥500 sessions in the past day

A "Newer Version Available" tag appears when a newer Braze SDK release exists for that platform.

---

### Managing Workspaces

| Action | Path |
|--------|------|
| Rename | **Settings > App Settings** → hover workspace name → pencil icon |
| Favorite | Profile dropdown → **Manage your account** → **Favorite workspaces** |
| Delete workspace | **Settings > App Settings** → **Delete workspace** |
| Delete app instance | **Settings > App Settings** → trash icon next to instance |

**Deletion constraint:** Cannot delete workspaces or app instances that are actively used for targeting or have >1,000 users. Submit a support case with the dashboard link and name to proceed. Deletion is **irreversible**.

---

### Testing Best Practice

Maintain a dedicated testing workspace to sandbox test users from production. When publishing, switch the Braze API key in your app to the production workspace key.

---

### FAQ: New App Version vs. New Workspace

**Updating an existing app** → add a new **app instance** within the same workspace.
- Keeps users in one place
- Enables version-based segmentation and targeting

**Releasing a brand-new app** → create a new **workspace**.
- Old user profiles and historical data do not carry over
- Avoids push token conflicts (same user in two workspaces could receive duplicate messages)

> If you create a new workspace for what is really just an update, users will exist in both the old and new workspace. This can cause marketing messages meant only for old-version users to reach users who have already upgraded.
