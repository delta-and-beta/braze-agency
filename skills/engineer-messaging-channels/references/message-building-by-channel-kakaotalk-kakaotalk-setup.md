---
name: message-building-by-channel-kakaotalk-kakaotalk-setup
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/message_building_by_channel/kakaotalk/kakaotalk_setup
indexed_at: '2026-04-05'
keywords:
  - kakaotalk
  - channel
  - integration
  - credentials
  - messaging
  - infobip
  - business
  - sender
triggers:
  - set up KakaoTalk integration
  - configure KakaoTalk credentials
  - apply for business channel
  - connect channel to Braze
  - import phone numbers
---
## KakaoTalk Setup

### Prerequisites

| Requirement | Description |
| --- | --- |
| Partner account | Requires account with **CJ OliveNetworks** or **Infobip** |
| Business channel | Default account type is "basic" — must upgrade to Business channel |
| Sender Key | Valid KakaoTalk Sender Key |
| Contact phone | Admin phone number for the channel |

#### Account Types

- **Basic channel** — broadcast messaging and 1:1 chat; no verification required
- **Business channel** — verified badge, recommended channel status, business messaging support; requires application

#### Apply for Business Channel

Required documents: Korean Business Registration Certificate, Business Representative ID, Employment Certificate, Industry-specific Licenses.

> Channel name, profile image, and other details must **exactly match** submitted documents.

1. Log in to [KakaoTalk Channel Admin Center](https://center-pf.kakao.com/)
2. Select the channel to upgrade
3. Go to **Management (관리)** > **Business Channel Application (비즈니스 채널 신청)**
4. Click **Apply / 신청**
5. Submit required information and wait for review notification

---

### Integration: Connect Channel to Braze

Navigate to **Partner Integrations > Technology Partners**, select your provider, enter credentials, and save.

#### CJ OliveNetworks — Credential Locations (Comm.One dashboard)

| Field | Where to Find |
| --- | --- |
| Login ID | Profile page |
| Sender Key | Template Management > Sender Profile Management |
| Channel name | Template Management > Sender Profile Management |
| Sender number | Account Management > View Details > Business Detailed Info > Company Information |
| Credential ID & Password | Same location as Sender number, then API > Brand Message |

> Only channels mapped to a single common ID can be registered.

#### Infobip — Credential Locations

| Field | Where to Find |
| --- | --- |
| API Base URL | Developer Tools > API Keys |
| API Key | Developer Tools > API Keys |
| Sender name / Sender key | Channels and Numbers > Channels > Senders tab |
| Sender profile UUID | Provided directly by Infobip |
| Channel name | Provided directly by Infobip |

---

### User Profiles & Phone Numbers

- Users must have a phone number to receive KakaoTalk messages
- KakaoTalk uses the **standard phone field** — unlike SMS/WhatsApp, numbers are **not** converted to E.164 format
- Import phone numbers via CSV upload or API when creating users
