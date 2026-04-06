---
name: administrative-app_settings-workspaces
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/administrative/app_settings/workspaces
indexed_at: '2026-04-05'
keywords:
  - workspace
  - apps
  - instances
  - platform
  - API
  - SDK
  - targeting
  - environment
  - settings
  - integration
triggers:
  - create a workspace
  - add app instances
  - manage workspaces
  - delete workspace
  - set up testing workspace
---
# Workspaces

Workspaces are shared environments for tracking and managing engagement for related apps or websites. Group the same or similar apps together (e.g., iOS and Android versions of the same app) within one workspace.

## Creating a Workspace

1. Select the workspace dropdown in the global header → **Create workspace**
2. Enter a name (recommended convention: `"AppName Region – Environment"`, e.g., `"Upon Voyage US – Production"`)
3. Select **Create** — Braze redirects you to **App Settings**

## Adding App Instances

App instances are the individual sites/apps within a workspace.

1. **Settings** → **App Settings** → **+ Add app**
2. Name the instance and select platform(s) — Braze creates one app instance per platform selected
3. Select **Add app** to confirm

**API Keys:** Each app instance gets its own API key, used for SDK integration and API requests.

**Key rule:** Create separate app instances for each platform × version combination. Example: Free iOS, Free Android, Pro iOS, Pro Android = 4 app instances = 4 API keys.

**Live SDK Version:** Displayed after SDK integration. Shows highest app version with ≥5% of daily sessions AND ≥500 sessions in the past day. Flags when a newer SDK version is available.

## Workspace Management

### Favorites
**Profile dropdown** → **Manage your account** → **Account Profile** → **Favorite workspaces** → Select → **Save changes**

### Renaming
**Settings** → **App Settings** → hover workspace name → pencil icon → enter new name → **Save**

### Deleting

**Settings** → **App Settings** → **Delete workspace** (or trash icon for app instances)

**Restrictions:** Cannot delete workspaces/app instances currently used for user targeting or with >1,000 users. Contact Support with a dashboard link and name to request deletion.

> **Warning:** Workspace deletion is permanent and cannot be undone.

## Testing Best Practice

Create a dedicated testing workspace to sandbox integration and campaign testing. When publishing to production, switch the API key from the testing workspace key to the production workspace key.

## New App Release vs. App Update

| Scenario | Recommendation |
|----------|----------------|
| **Updating existing app** | Add a new **app instance** within the same workspace. Allows targeting by version; avoids duplicate user profiles across workspaces. |
| **Releasing an entirely new app** | Create a **new workspace**. Historical data and profiles from the old app won't carry over — this is intentional for a clean slate. |

**Risk of creating a new workspace for an update:** Users exist in two workspaces and may share push tokens, causing old-workspace messages to reach users who have already upgraded.
