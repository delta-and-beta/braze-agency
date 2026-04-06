---
name: message-building-by-channel-kakaotalk
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/message_building_by_channel/kakaotalk/kakaotalk_setup
indexed_at: '2026-04-05'
keywords:
  - KakaoTalk
  - channel
  - business
  - integration
  - sender
  - credentials
  - partner
  - Infobip
  - phone
  - profile
triggers:
  - how to set up KakaoTalk
  - connect KakaoTalk to Braze
  - configure KakaoTalk sender key
  - apply for business channel
  - integrate KakaoTalk messaging
---
## KakaoTalk Channel Setup

### Prerequisites

**Required accounts:**
- Partner account with **CJ OliveNetworks** or **Infobip** (supported KakaoTalk partners)
- **KakaoTalk Business channel** (default account type is Basic; must be upgraded)
- Valid **KakaoTalk Sender Key**
- Contact phone number for the channel administrator

### Account Types

| Type | Description |
|------|-------------|
| **Basic** | Standard channel, broadcast messaging + 1:1 chat |
| **Business** | Verified, application required; adds verified badge, recommended channel status, business messaging support |

### Apply for Business Channel

**Required documentation:**
- Korean Business Registration Certificate
- ID of the Business Representative
- Employment Certificate
- Industry-specific Licenses

> Channel name, profile image, and other details must exactly match submitted documents.

**Steps:**
1. Log into [KakaoTalk Channel Admin Center](https://center-pf.kakao.com/)
2. Select the channel to upgrade
3. Go to **Management (관리)** > **Business Channel Application (비즈니스 채널 신청)**
4. Click **Apply / 신청**
5. Provide required information
6. Await review notification

---

### Integration: Connect KakaoTalk to Braze

**Path:** Partner Integrations > Technology Partners > select your provider

#### CJ OliveNetworks Credentials (from [Comm.One dashboard](https://ums.cjmplace.com/))

| Field | Where to find it |
|-------|-----------------|
| Comm.One Login ID | Select your profile |
| Sender Key | Template Management > Sender Profile Management |
| Channel name | Template Management > Sender Profile Management |
| Sender number | Account Management > View Details > Business Detailed Information > Company Information |
| Credential ID & Password | Same location as Sender number > API > Brand Message |

> Only channels mapped to a single common ID can be registered.

#### Infobip Credentials

| Field | Where to find it |
|-------|-----------------|
| API Base URL | Developer Tools > API Keys |
| API Key | Developer Tools > API Keys |
| Sender name / Sender key | Channels and Numbers > Channels > Senders tab |
| Sender profile UUID | Provided directly by Infobip |
| Channel name | Provided directly by Infobip |

---

### User Profiles

- Users must have a **phone number** on their profile to receive KakaoTalk messages
- KakaoTalk uses the **standard phone field** — unlike SMS/WhatsApp, numbers are **not** converted to E.164 format
- Import phone numbers via CSV upload or API when creating users
