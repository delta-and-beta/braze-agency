---
name: whatsapp-whatsapp_campaign-user_retargeting
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/message_building_by_channel/whatsapp/whatsapp_campaign/user_retargeting
indexed_at: '2026-04-05'
keywords:
  - retargeting
  - WhatsApp
  - engagement
  - campaign
  - segment
  - receipt
  - messaging
  - canvas
  - compliance
  - filtering
triggers:
  - retarget users by WhatsApp engagement
  - filter users by message receipt
  - build WhatsApp retargeting segment
  - create audience from campaign interaction
  - apply privacy filters to retargeting
---
## WhatsApp User Retargeting

Braze records WhatsApp interactions on user profiles, enabling filtering and triggering based on message receipt and engagement history.

### Filter by Message Receipt

**Last received WhatsApp** — Filter users based on when they last received any WhatsApp message. Set in the Target Users step of the campaign builder.

**Received from specific campaign** — Filter users who received (or did not receive) a message from a specific WhatsApp campaign.

### Filter by Engagement (Read Status)

Retarget users based on whether they opened/read a WhatsApp message.

**From a specific Campaign:**
1. Create a segment using the **Clicked/Opened Campaign** filter
2. Select **read WhatsApp message**
3. Choose the desired campaign

**From a specific Canvas Step:**
1. Create a segment using the **Clicked/Opened Step** filter
2. Select **read WhatsApp message**
3. Choose the desired Canvas and Canvas steps

**By campaign/Canvas attribution** — Filter users who opened/read a specific WhatsApp campaign, Canvas component, or tag.

### Privacy Compliance Note

When building retargeting audiences, apply relevant filters for users' eligibility in Canvas/Campaign entry criteria to comply with privacy laws (e.g., CCPA "Do Not Sell or Share" rights). Exclude users based on their preferences where required.

`★ Insight ─────────────────────────────────────`
- The original uses Jekyll liquid tags (`{% image_buster %}`, `{% alert %}`) — stripping these produces clean markdown safe for embedding in topic files without template engine dependencies
- "Clicked/Opened" is Braze's unified engagement filter name, even for read-receipts on WhatsApp — worth preserving verbatim since users will search for this exact UI label
`─────────────────────────────────────────────────`
