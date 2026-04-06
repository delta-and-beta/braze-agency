---
name: get-started-braze-pilot-getting-started
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/get_started/braze_pilot/getting_started
indexed_at: '2026-04-05'
keywords:
  - SDK
  - QR
  - push
  - workspace
  - dashboard
  - permissions
  - initialization
  - profile
  - campaign
  - canvas
triggers:
  - how to set up Braze Pilot
  - how to initialize SDK connection
  - how to enable push notifications
  - how to test campaigns
  - how to switch workspaces
---
## Braze Pilot Getting Started

Braze Pilot is a mobile app for testing Braze SDK integration and messaging. Available on iOS (App Store) and Android (Google Play).

### Setup Steps

**1. Download & Sign In**
- Download from Apple App Store or Google Play Store
- Accept terms and conditions
- Enter work email (used for analytics only, not marketing)

**2. Initialize SDK Connection**

Two methods available from the App Settings page:

**Method A: Demo QR Code**
- Scan a QR code from the companion drawer of a demo campaign in your free trial
- Automatically initializes SDK, creates user profile, and deep links to an app simulation
- Separate QR codes for Android and iOS

**Method B: Setup Wizard**
- Step-by-step guide in your Braze dashboard under **App Settings**
- Connection is workspace-specific — if you switch workspaces (e.g., Demo → Live), you must re-initialize the SDK from the new workspace

**3. Enable Push Permissions**

Two options:
- **Device Settings**: Navigate to Braze Pilot in your device settings → enable notifications on lock screen
- **Push Primer**: Send a Braze in-app message requesting push permissions (same flow as production consumer apps)

### Usage

Once connected, Pilot receives campaigns and Canvases from the linked Braze dashboard workspace. Use the demo workspace for pre-built use case examples, then switch to your live workspace to test your own campaigns.

### Key Constraints

- SDK connection is per-workspace — switching workspaces requires re-initialization
- Push testing requires explicit permission grant (device settings or push primer IAM)
