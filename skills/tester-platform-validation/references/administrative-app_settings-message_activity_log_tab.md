---
name: administrative-app_settings-message_activity_log_tab
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/administrative/app_settings/message_activity_log_tab
indexed_at: '2026-04-05'
keywords:
  - activity
  - log
  - errors
  - bounce
  - webhook
  - campaign
  - messages
  - push
  - diagnostics
  - sms
triggers:
  - view message errors
  - diagnose campaign failures
  - troubleshoot delivery issues
  - check bounce status
  - understand error logs
---
## Message Activity Log

A diagnostic tool for viewing errors and messages from campaigns and API sends. Access via **Settings > Message Activity Log**.

### Filterable Error Types

- Push notification errors
- Aborted message errors
- Webhook errors
- Mail errors (soft bounce, hard bounce, block)
- API message records
- Connected Content errors
- REST API connected audience errors
- User aliasing errors
- A/B testing errors
- SMS/MMS errors
- WhatsApp errors
- Live Activity errors
- Bad user trigger errors
- Braze Agents (daily invocation limit exceeded, unavailable model)

### Reading Log Entries

Use the **Type** column alongside the **Message** column for context. Example: a message reading `empty-cart_app` with Type = "Aborted Message Error" means Liquid abort logic fired because the user had an empty cart.

### Common Message Types

| Type | Example Message | Meaning |
|---|---|---|
| Soft Bounce | `same@example.com soft bounced` | Valid address, temporary rejection (full mailbox, server down, message too large). Braze retries within 72 hours. |
| Hard Bounce | `The email account does not exist` | No inbox to reach. Check **View Details** to inspect recipient profile. |
| Block | `Spam message is rejected because of anti-spam policy` | Email categorized as spam by ESP. Reconsider send habits, content, or IP warming status. |
| Aborted Message Error | `empty-cart_web` | Liquid abort message fired; value shown is the custom abort string. |

Block messages can also include ISP-specific text like `Client host blocked using Spamhaus` — these come from third-party sources and are not exhaustive.

### Data Retention

- **Window**: Last 60 hours only. Older logs are deleted and inaccessible.
- **Volume caps** (errors are sampled, not fully captured):

| Cap | Scope | Error Types |
|---|---|---|
| 20 per clock hour | Same campaign/Canvas step | Connected Content, Abort Message, Webhook, SMS Rejection/Delivery Failure, WhatsApp Failure, A/B Testing |
| 20 per clock hour | Same campaign/Canvas step + app | Invalid/No Push Credential, Invalid Push Token, Token Errors, Quota Exceeded, Retries Timed Out, Invalid Payload, Unexpected Error |
| 100 per clock hour | Same app | Live Activity errors (all variants), APNS Feedback Removed Token |
| 100 per clock hour | Same campaign/Canvas step | Email Soft Bounce, Hard Bounce, Block |
| 100 per clock hour | Same workspace | User aliasing errors |

### Test Sends

Test send logs are available for: **SMS, WhatsApp, LINE, KakaoTalk, Webhook**.

Not available for: email, Content Cards, in-app messages, push.

Test logs are prefixed with `[TEST SEND]` — note that Connected Content errors in test sends may not carry this prefix.
