---
name: engineer-messaging-channels
description: >-
  Setup and implementation of LINE, KakaoTalk, and other regional messaging
  channels including user management and click tracking.
metadata:
  role: braze-engineer
  topics:
    - message-building-by-channel-line-line-setup
    - message-building-by-channel-line-create
    - message-building-by-channel-line-messaging-users
    - message-building-by-channel-line-line-users
    - message-building-by-channel-line-line-users-user-management
    - message-building-by-channel-line-line-users-subscription-groups
    - message-building-by-channel-line-create-message-types
    - message-building-by-channel-line-create-line-click-tracking
    - message-building-by-channel-line-testing
    - message-building-by-channel-line-reporting
    - message-building-by-channel-kakaotalk-kakaotalk-setup
    - message-building-by-channel-kakaotalk-create-kakaotalk-message
    - message-building-by-channel-kakaotalk-kakaotalk-click-tracking
    - message-building-by-channel-kakaotalk-kakaotalk-reporting
  keywords: []
  generator: nick
  version: 1.0.0
---
`★ Insight ─────────────────────────────────────`
Skill files in Nick's architecture serve as the "schema layer" between atomic topic references and agent personas — they synthesize multiple topic files into a coherent domain lens. Good skills are lean (~1,500–2,000 words) and direct the agent to the right topic references rather than duplicating their content.
`─────────────────────────────────────────────────`

# Regional Messaging Channel Engineering

## Purpose

This skill covers the setup, configuration, and operational management of regional messaging channels in Braze — specifically **LINE** (Japan/East Asia) and **KakaoTalk** (South Korea). Apply this skill when working with platform-specific prerequisites, user identity mapping, subscription state management, message creation workflows, click tracking, and campaign reporting for these channels.

Use this skill for:
- Configuring LINE or KakaoTalk as a Braze messaging channel from scratch
- Mapping LINE follower IDs or KakaoTalk user identities to Braze user profiles
- Building campaigns or Canvas steps that send LINE or KakaoTalk messages
- Enabling and validating click tracking for regional channel messages
- Diagnosing subscription state issues or reporting gaps in LINE/KakaoTalk analytics

## Lens: Platform-Specific Setup, User Identity Mapping, and Regional Compliance

Regional messaging channels have fundamentally different identity and compliance models compared to email or push. Key perspective shifts to apply throughout:

- **Partner mediation**: KakaoTalk requires a CJ OliveNetworks or Infobip partner account — Braze does not connect directly. LINE connects via LINE's official channel infrastructure. Always verify partner account status before diagnosing send failures.
- **Follower-based identity**: LINE users must follow the brand's LINE Official Account before they can receive messages. KakaoTalk users must opt in via the business channel. User identity is the LINE User ID (follower ID) or KakaoTalk user ID, not email or phone.
- **Subscription state as a compliance gate**: Both channels enforce opt-in/opt-out at the platform level, not just in Braze. Unsubscribed users will not receive messages regardless of Braze segment membership.
- **Click data sourced from Braze, not platform**: LINE's native dashboard provides only aggregate click data. Braze's click tracking provides per-user, real-time granular data — a meaningful operational advantage when diagnosing delivery or engagement issues.

---

## LINE Channel

### Setup and Prerequisites

Before sending any LINE messages, complete channel connection in the Braze dashboard. The LINE Official Account must be active and the LINE channel access token integrated into Braze. Refer to `references/line-setup.md` for the full prerequisites and configuration steps.

Key identity requirement: users must have a LINE follower ID stored in their Braze profile. Without this, campaigns will silently exclude users.

### User Identity and Subscription Management

LINE is a two-way channel. Users can trigger action-based campaigns by sending inbound messages, including trigger words that activate specific Canvas journeys. Braze records follower status (subscribed/unsubscribed) based on whether the user follows or unfollows the LINE Official Account.

Subscription states:
- **Subscribed**: User follows the LINE Official Account
- **Unsubscribed**: User unfollowed — no messages can be sent

Manage subscription group membership through `references/line-subscription-groups.md`. Subscription group filters are the correct way to scope LINE sends in segments; do not rely on channel reachability alone.

For managing LINE users in campaigns and Canvas — including inbound message handling and unrecognized response flows — consult `references/line-messaging-users.md` and `references/line-users.md`.

### Message Types

LINE supports four message types in the Braze composer:

| Type | Character Limit | Notes |
|------|----------------|-------|
| Text | 5,000 characters | Supports emojis, Liquid personalization |
| Image | — | Static image with optional action |
| Rich message | — | Image + text layout combinations |
| Card-based | — | Carousel or flex message variants |

Refer to `references/line-message-types.md` for full specs, image dimension requirements, and Liquid support per type. When selecting message type, match to the content objective: text for transactional/informational, image/card for promotional.

### Creating LINE Messages

To create a LINE message in a Campaign or Canvas:

1. Navigate to **Messaging > Campaigns** or open a Canvas step
2. Select **LINE** as the channel
3. Choose message type and compose content
4. Apply Liquid for personalization where supported
5. Configure action buttons (if applicable)

Full step-by-step workflow is in `references/create-line-message.md`.

### Click Tracking

Enable click tracking in the LINE message composer to activate Braze URL shortening and per-user click recording. Unlike LINE's native analytics (aggregate only), Braze tracking provides:
- Per-user click attribution
- Real-time recording
- Click data surfaced in campaign analytics and user event streams

Supported for text, image, and list item messages. Refer to `references/line-click-tracking.md` for configuration and limitations.

### Reporting

After launch, LINE campaign metrics appear on the campaign details page or Canvas analytics. Key caveat: **open and click statistics are only calculated for messages sent within the last 30 days**. For historical analysis beyond 30 days, use Currents or data exports.

Consult `references/line-reporting.md` for available metrics, dashboard navigation, and known reporting gaps.

### Testing

Validate LINE message rendering and delivery before launch using Braze's send-to-device test flow. Refer to `references/line-testing.md` for test user setup requirements and known limitations in preview fidelity.

---

## KakaoTalk Channel

### Setup and Prerequisites

KakaoTalk requires a partner account with **CJ OliveNetworks** or **Infobip** before Braze integration is possible. The business channel (플러스친구 / BizMessage channel) must be approved and active.

Partner account setup is outside Braze's control — coordinate with the business stakeholder or the partner directly. Once the partner account is active, configure the KakaoTalk channel credentials in the Braze dashboard. Full prerequisites and setup steps are in `references/kakaotalk-setup.md`.

### Creating KakaoTalk Messages

KakaoTalk messages can be created in:
- **Campaigns** — for single sends
- **Canvas** — for multi-step journeys

To create a KakaoTalk message:

1. Go to **Messaging > Campaigns** or a Canvas step
2. Select **KakaoTalk** as the channel
3. Choose the message template type (text, image, or list item)
4. Compose content and apply variables
5. Configure buttons and call-to-action links

KakaoTalk messages typically use pre-approved message templates (알림톡 / Alimtalk format). Unapproved template text may be rejected at send time by the partner. Full creation workflow is in `references/create-kakaotalk-message.md`.

### Click Tracking

Braze automatically shortens URLs and adds tracking when click tracking is enabled in the KakaoTalk composer. Tracking is recorded in real time and supports text, image, and list item message types.

Refer to `references/kakaotalk-click-tracking.md` for configuration details and partner-specific tracking constraints.

### Reporting

KakaoTalk campaign and Canvas reporting is available in the Braze dashboard with standard messaging analytics (sends, deliveries, clicks). Refer to `references/kakaotalk-reporting.md` for metric definitions and dashboard navigation.

---

## Diagnostic Patterns

When troubleshooting regional channel issues, apply this triage order:

1. **Partner account status** (KakaoTalk only) — is the CJ OliveNetworks/Infobip account active?
2. **Channel credentials** — are the access tokens/API keys current in Braze dashboard settings?
3. **User identity** — do target users have the required LINE follower ID or KakaoTalk user ID on their Braze profile?
4. **Subscription state** — are users in the correct subscription group and in a subscribed state?
5. **Template approval** (KakaoTalk) — is the message template pre-approved by the partner?
6. **Click tracking scope** — is tracking enabled per message, not just at the campaign level?

---

## Reference Files

| File | Contents |
|------|----------|
| `references/line-setup.md` | LINE channel prerequisites and Braze configuration |
| `references/line-subscription-groups.md` | Subscription states and group management |
| `references/line-messaging-users.md` | Action-based triggers, inbound message handling |
| `references/line-users.md` | Trigger words, unrecognized response configuration |
| `references/line-message-types.md` | Text, image, rich, and card specs |
| `references/create-line-message.md` | Step-by-step message creation workflow |
| `references/line-click-tracking.md` | Click tracking setup and data model |
| `references/line-reporting.md` | Metrics, dashboard navigation, known gaps |
| `references/line-testing.md` | Test user setup, preview limitations |
| `references/kakaotalk-setup.md` | Partner account requirements and Braze setup |
| `references/create-kakaotalk-message.md` | KakaoTalk message creation workflow |
| `references/kakaotalk-click-tracking.md` | Click tracking for KakaoTalk |
| `references/kakaotalk-reporting.md` | KakaoTalk analytics and dashboard access |

`★ Insight ─────────────────────────────────────`
The reference table at the end of a skill file acts as the skill's "table of contents" for progressive disclosure — Claude loads SKILL.md first, then pulls specific reference files only when the query demands that depth. This keeps the base skill lean while making the full topic corpus accessible. Naming reference files after their topic slugs (e.g., `line-click-tracking.md`) also makes them greppable and auto-discoverable.
`─────────────────────────────────────────────────`
