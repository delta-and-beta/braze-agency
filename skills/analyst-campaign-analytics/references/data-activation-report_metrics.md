---
name: data-activation-report_metrics
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/data/activation/report_metrics
indexed_at: '2026-04-05'
keywords:
  - metrics
  - clicks
  - bounces
  - opens
  - conversions
  - engagement
  - impressions
  - delivery
  - audience
  - rates
triggers:
  - track email metrics
  - measure campaign engagement
  - analyze conversion rates
  - report bounce performance
  - understand channel analytics
---
# Report Metrics

## AMP Clicks
**Channel:** Email

Tracks clicks on AMP-enabled email content.

---

## AMP Opens
**Channel:** Email

Tracks opens of AMP-enabled emails.

---

## Audience
**Channel:** All

The proportion of users who received a specific variant.

**Calculation:** (Number of Recipients in Variant) / (Unique Recipients)

---

## Bounces
**Channels:** Email, Web Push, iOS Push

Messages that could not be delivered. Causes include invalid/deactivated push tokens, user unsubscribes after launch, or inaccurate/deactivated email addresses.

| Channel | Details |
|---------|---------|
| Email | Includes hard bounces, spam (`spam_report_drops`), and invalid addresses (`invalid_emails`). Bounce % = percentage of messages unsuccessfully sent or returned. |
| Push | Bounced users are automatically unsubscribed from all future push notifications. |

**Calculation:**
- *Bounces*: Count
- *Bounce %* / *Bounce Rate %*: (Bounces) / (Sends)

---

## Body Click
**Channels:** iOS Push, Android Push

**Calculation:** (Body Clicks) / (Impressions)

---

## Body Clicks
**Channel:** In-App Message

Clicks on the body area of an in-app message.

**Calculation:** (Body Clicks) / (Impressions)

---

## Button 1 Clicks
**Channel:** In-App Message

Clicks on the first button. Requires **Identifier for Reporting** set to `"0"` in the in-app message configuration.

**Calculation:** (Button 1 Clicks) / (Impressions)

---

## Button 2 Clicks
**Channel:** In-App Message

Clicks on the second button. Requires **Identifier for Reporting** set to `"1"` in the in-app message configuration.

**Calculation:** (Button 2 Clicks) / (Impressions)

---

## Campaign Analytics
**Channel:** Feature Flags

Performance of the message across channels. Metrics shown depend on the selected messaging channel and whether the Feature Flag experiment is a multivariate test.

---

## Choices Submitted
**Channel:** In-App Message

Count of survey/poll choices submitted by users.

---

## Click-to-Open Rate
**Channel:** Email

**Calculation:** (Unique Clicks) / (Unique Opens)

---

## Confirmed Deliveries (SMS/RCS)
**Channels:** SMS/MMS, RCS

Verified deliveries from the carrier. Charged toward your SMS allotment.

**Calculation:**
- *Confirmed Deliveries*: Count
- *Confirmed Delivery Rate*: (Confirmed Deliveries) / (Sends)

---

## Confidence
**Channels:** Content Cards, Email, In-App Message, Web Push, iOS Push, Android Push, Webhook, SMS/MMS, WhatsApp

Statistical confidence score for A/B test variant performance.

---

## Confirmation Page Button / Dismissals
**Channel:** In-App Message

Tracks interactions with the confirmation page — button clicks and dismissals respectively.

---

## Conversions (B, C, D)
**Channels:** Content Cards, Email, In-App Message, Web Push, iOS Push, Android Push, Webhook, SMS/MMS

Secondary conversion events defined at campaign build time.

| Channel | Conversion Tracking Behavior |
|---------|-------------------------------|
| Email, Push, Webhooks | Tracked after initial send |
| Content Cards | Counted on first view of the card |
| In-App Messages | Counted if user received, viewed, and performed the conversion event within the conversion window — regardless of click. Attributed to most recently received message. Each delivery associates with only one conversion. |

---

## Total Conversions
**Channel:** In-App Message

Total conversion events across all impressions of a campaign.

**Key rules:**
- Single view → max one conversion counted, even if the event fires multiple times
- Re-eligibility enabled → *Total Conversions* increments once per new impression that leads to a conversion
- Example: Two impressions + two conversions = +2 total; one impression + two conversion events = +1 total

---

## Close Message
**Channel:** In-App Message

Count of times a user explicitly dismissed the in-app message.

---

## Conversion Rate
**Channels:** Content Cards, Email, In-App Message, Web Push, iOS Push, Android Push, Webhook, SMS/MMS

Percentage of recipients who completed the primary conversion event.

- **In-App Messages:** Uses total daily *Unique Impressions* as the denominator for conversion rate calculation.
