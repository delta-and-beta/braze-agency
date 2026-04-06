---
name: administrative-access_braze-support
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/administrative/access_braze/support
indexed_at: '2026-04-05'
keywords:
  - support
  - portal
  - cases
  - contacts
  - permissions
  - severity
  - console
  - HAR
  - tickets
  - troubleshooting
triggers:
  - how to access support
  - submit a support case
  - designate support contact
  - attach network logs
  - troubleshoot portal login
---
## Braze Support

### Accessing Support

Navigate to **Support** > **Get help** in the Braze dashboard. Depending on your permissions and designated contact status, you'll reach either:
- The **Braze support portal** (submit and track cases)
- The **standard support form**

If unsure of your status, contact your company's Braze administrator, success manager, or account owner.

### Designated Support Contacts

Designated contacts can view all company support cases regardless of submitter.

**To designate a user:**
1. **Settings** > **Company Users** → search by name or email
2. Hover over the user row → **Edit**
3. Check **Set this user as a Designated Support Contact for Braze Support Portal**

After designation, the portal sends a welcome email with access setup instructions.

### Best Practices for Support Cases

| Practice | Details |
|---|---|
| **Include context** | Workspace, campaign/segment URL, external IDs |
| **Sample users** | Provide a small subset, not the full affected segment |
| **Clarify behavior** | State expected vs. actual outcome |
| **Attach screenshots** | Illustrate the problem visually |
| **Set severity correctly** | "Critical" = production down, all work stopped |

### Providing Developer Console Screenshots

- **Chrome / Firefox**: Right-click page → **Inspect** (or **Inspect Element**) → **Console** tab → screenshot
- **Safari**: Safari menu → **Preferences** → **Advanced** → enable **Show Develop menu in menu bar** → right-click → **Inspect Element** → **Console** tab → screenshot

### Attaching HAR (Network) Logs

HAR logs capture browser-server network requests and accelerate diagnosis.

1. Open developer tools: `⌥ + ⌘ + J` (macOS) or `Shift + Ctrl + J` (Windows/Linux)
2. Select **Network** → **Fetch/XHR** (or **XHR**)
3. Capture **Name**, **Status**, **Size**, and **Time** columns
4. Attach the recording/screenshot to the support ticket

### Troubleshooting Portal Login

If you see `Check your entry` when logging in, ensure you used the link in your welcome email to set a password. If already done or previously logged in, create a support ticket.
