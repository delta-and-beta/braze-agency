---
name: message-building-by-channel-kakaotalk-create-kakaotalk-message
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/message_building_by_channel/kakaotalk/create_kakaotalk_message
indexed_at: '2026-04-05'
keywords:
  - kakaotalk
  - campaign
  - canvas
  - message
  - composition
  - personalization
  - buttons
  - tracking
  - image
  - preview
triggers:
  - create kakaotalk message
  - compose kakaotalk content
  - send kakaotalk campaign
  - kakaotalk message types
  - enable click tracking
---
## Create KakaoTalk Message

KakaoTalk messages can be created in **Campaigns** (single send) or **Canvas** (multi-step journeys).

---

### Step 1: Choose Location

**Campaign:**
- Go to **Messaging > Campaigns > Create Campaign**
- Select **KakaoTalk** (single channel) or **Multichannel Campaign**

**Canvas:**
- Add a **Message step** in the Canvas builder, then select **KakaoTalk**

---

### Step 2: Compose the Message

1. Select the **KakaoTalk channel** from the dropdown (channels configured via Technology Partners)
2. Choose a **message type**:

#### Text Message
| Area | Spec |
|---|---|
| Content | Text, emojis, Liquid personalization |
| Max characters | 1,000 |
| Buttons | Up to 5 (URL open only) |

#### Image Message

**General specs:**
| Area | Spec |
|---|---|
| Format | JPEG or PNG |
| Recommended width | 500px |
| Max file size | 500kb |
| Aspect ratio | Between 2:1 (wide) and 3:4 (tall) |

**Narrow image:**
| Area | Spec |
|---|---|
| Text capacity | Up to 500 characters |
| Buttons | Up to 5 |
| Image source | Braze media library or direct URL |

**Wide image:**
| Area | Spec |
|---|---|
| Text capacity | Up to 76 characters |
| Buttons | Up to 2 |
| Image source | Braze media library or direct URL |

> Braze handles all image uploads to KakaoTalk automatically — no pre-upload to KakaoTalk providers needed.

#### List Item Message
| Area | Spec |
|---|---|
| Items required | At least 2–3 items |
| Buttons | Up to 5 |
| Header | Up to 250 characters |
| Item title | Up to 25 characters |
| Website URL per item | Up to 250 characters |

---

### Step 3: Click Tracking

Enable via **Click Tracking** in the **Link options** section.

- Braze auto-shortens URLs (default domain: `https://brz.ai` or custom domain per subscription group)
- Tracks clicks in real time
- Supports: text, image, and list item messages; button links; image on-click actions
- Supports Liquid personalization in URLs

**Retargeting filters:**
- Clicked/Opened Campaign
- Clicked/Opened Campaign or Canvas with Tag
- Clicked/Opened Step

**Action-based triggers:**
- Interact with Campaign
- Interact with Step

---

### Step 4: Preview and Test

- Preview updates live as you compose
- Go to the **Test** tab to send to content test groups, individual users, or preview as a specific user
- Select test users → **Send Test**
- CJ OliveNetworks success response: `C100` — any other response indicates an error (consult CJ KakaoTalk developer docs)
