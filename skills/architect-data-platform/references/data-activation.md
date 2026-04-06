---
name: data-activation
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/data/activation/report_metrics
indexed_at: '2026-04-05'
keywords:
  - metrics
  - analytics
  - activation
  - bounces
  - clicks
  - impressions
  - delivery
  - channels
  - email
  - push
triggers:
  - how to calculate bounce rate
  - track email clicks and opens
  - measure campaign performance
  - SMS delivery metrics
  - push notification tracking
---
## Data Activation Overview — Analytics Metrics Reference

### Metric Definitions

---

#### AMP Clicks
**Channels:** Email

Clicks tracked within AMP-enabled emails.

---

#### AMP Opens
**Channels:** Email

Opens tracked for AMP-enabled emails.

---

#### Audience
**Channels:** All

The proportion of recipients in a variant relative to unique recipients.

**Calculation:** `(Recipients in Variant) / (Unique Recipients)`

---

#### Bounces
**Channels:** Email, Web Push, iOS Push

Messages that could not be delivered. Causes include: invalid push token, user unsubscribed after campaign launch, or inaccurate/deactivated email address.

| Channel | Notes |
|---------|-------|
| Email | Includes hard bounces, spam drops (`spam_report_drops`), and invalid addresses (`invalid_emails`). *Bounce Rate* = percentage of messages not received by intended recipients. |
| Push | Users who bounce are automatically unsubscribed from all future push notifications. |

**Calculation:**
- *Bounces*: Count
- *Bounce %* / *Bounce Rate %*: `(Bounces) / (Sends)`

---

#### Body Click
**Channels:** iOS Push, Android Push

A click on the body of a push notification.

**Calculation:** `(Body Clicks) / (Impressions)`

---

#### Body Clicks
**Channels:** In-App Message

Clicks on the body of an in-app message (excluding buttons).

**Calculation:** `(Body Clicks) / (Impressions)`

---

#### Button 1 Clicks
**Channels:** In-App Message

Clicks on the first button of an in-app message. Requires **Identifier for Reporting** set to `"0"`.

**Calculation:** `(Button 1 Clicks) / (Impressions)`

---

#### Button 2 Clicks
**Channels:** In-App Message

Clicks on the second button of an in-app message. Requires **Identifier for Reporting** set to `"1"`.

**Calculation:** `(Button 2 Clicks) / (Impressions)`

---

#### Campaign Analytics
**Channels:** Feature Flags

Performance of messaging across channels. Metrics shown depend on the selected channel and whether the Feature Flag experiment is a multivariate test.

---

#### Choices Submitted
**Channels:** In-App Message

Number of choices submitted in an in-app message (e.g., survey responses).

---

#### Click-to-Open Rate
**Channels:** Email

Ratio of unique clicks to unique opens — measures how effectively opened emails drive clicks.

**Calculation:** `(Unique Clicks) / (Unique Opens)`

---

#### Confirmed Deliveries (SMS/RCS)
**Channels:** SMS/MMS, RCS

Messages confirmed as delivered to the carrier. These count against your SMS allotment.

**Calculation:**
- *Confirmed Deliveries*: Count
- *Confirmed Delivery Rate*: `(Confirmed Deliveries) / (Sends)`

---

#### Confidence
**Channels:** Content Cards, Email, In-App Message, Web Push, iOS Push, Android Push, Webhook, SMS/MMS, WhatsApp

Statistical confidence that a variant is outperforming the control in an A/B test.

---

#### Confirmation Page Button / Confirmation Page Dismissals
**Channels:** In-App Message

Interactions with the confirmation page of an in-app message: button taps and dismissals, respectively.

---

#### Conversions (B, C, D)
**Channels:** Content Cards, Email, In-App Message, Web Push, iOS Push, Android Push, Webhook, SMS/MMS

Secondary conversion events (beyond primary) defined at campaign creation.

| Channel | Conversion Timing |
|---------|------------------|
| Email, Push, Webhooks | Tracked after initial send |
| Content Cards | Counted when the user views the card for the first time |
| In-App Messages | Counted if user received/viewed the message and performs the conversion event within the conversion window — regardless of click. Attributed to the most recently received message. Each delivery is associated with only one conversion. |

---

#### Total Conversions
**Channels:** In-App Message

Total number of conversion events across all impressions of an in-app message campaign.

**Key behavior:**
- If re-eligibility is **off**: at most one conversion per user regardless of multiple conversion events
- If re-eligibility is **on**: *Total Conversions* increments once per new impression that results in a conversion

**Example:** User triggers message twice and converts after each impression → Total Conversions = 2. One impression followed by two conversion events → Total Conversions = 1.

---

#### Close Message
**Channels:** In-App Message

Number of times users dismissed/closed an in-app message.

---

#### Conversion Rate
**Channels:** Content Cards, Email, In-App Message, Web Push, iOS Push, Android Push, Webhook, SMS/MMS

Percentage of users who completed the primary conversion event after receiving the message.

- **In-App Messages:** Uses total daily *Unique Impressions* as the denominator for conversion rate calculation.
