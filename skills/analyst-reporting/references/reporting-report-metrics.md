---
name: reporting-report-metrics
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/analytics/reporting/report_metrics
indexed_at: '2026-04-05'
keywords:
  - metrics
  - reporting
  - analytics
  - bounces
  - clicks
  - opens
  - engagement
  - audience
  - campaign
triggers:
  - how to measure campaign performance
  - analyze email engagement metrics
  - track message delivery rates
  - report on click-through metrics
  - measure audience engagement
---
`★ Insight ─────────────────────────────────────`
- Jekyll docs use `{% multi_lang_include %}` liquid tags as content stubs — we replace those with the semantic meaning implied by the metric name since the actual included content isn't available here
- The `{::nomarkdown}` / `{:/}` wrappers are Kramdown-specific syntax for raw HTML passthrough — stripping these and normalizing the calculation lines into a consistent markdown pattern improves portability
`─────────────────────────────────────────────────`

## Report Metrics

### AMP Clicks
**Channels:** Email

Number of times links within AMP emails were clicked.

---

### AMP Opens
**Channels:** Email

Number of times AMP emails were opened.

---

### Audience
**Channels:** All

The proportion of recipients in a given variant relative to all unique recipients.

**Calculation:** (Number of Recipients in Variant) / (Unique Recipients)

---

### Bounces
**Channels:** Email, Web Push, iOS Push

Messages that were unsuccessfully sent — either due to invalid push tokens, post-launch unsubscribes, or inaccurate/deactivated email addresses.

| Channel | Notes |
|---------|-------|
| Email | Includes hard bounces, spam drops (`spam_report_drops`), and emails to invalid addresses (`invalid_emails`). Bounce % = percentage of messages that were not received by the intended recipient. |
| Push | Users who bounce are automatically unsubscribed from all future push notifications. |

**Calculations:**
- *Bounces*: Count
- *Bounce %* / *Bounce Rate %*: (Bounces) / (Sends)

---

### Body Click
**Channels:** iOS Push, Android Push

Recorded when a user taps the notification body (outside of action buttons).

**Calculation:** (Body Clicks) / (Impressions)

---

### Body Clicks
**Channels:** In-App Message

Recorded when a user taps the body of an in-app message. See iOS SDK changelog (3.3.1+) and Android SDK changelog (1.1.0+) for details.

**Calculation:** (Body Clicks) / (Impressions)

---

### Button 1 Clicks
**Channels:** In-App Message

Clicks on the first button of an in-app message. Only tracked when **Identifier for Reporting** is set to `"0"`.

**Calculation:** (Button 1 Clicks) / (Impressions)

---

### Button 2 Clicks
**Channels:** In-App Message

Clicks on the second button of an in-app message. Only tracked when **Identifier for Reporting** is set to `"1"`.

**Calculation:** (Button 2 Clicks) / (Impressions)

---

### Campaign Analytics
**Channels:** Feature Flags

Performance of the message across various channels. Metrics shown depend on the selected messaging channel and whether the Feature Flag experiment is a multivariate test.

---

### Choices Submitted
**Channels:** In-App Message

Number of choices submitted in a survey-style in-app message.

---

### Click-to-Open Rate
**Channels:** Email

Ratio of unique email clicks to unique opens — measures engagement quality among openers.

**Calculation:** (Unique Clicks) / (Unique Opens)

---

### Confirmed Deliveries (SMS/MMS and RCS)
**Channels:** SMS/MMS, RCS

Messages confirmed as delivered by the carrier. Counts toward your SMS allotment.

**Calculations:**
- *Confirmed Deliveries*: Count
- *Confirmed Delivery Rate*: (Confirmed Deliveries) / (Sends)

---

### Confidence
**Channels:** Content Cards, Email, In-App Message, Web Push, iOS Push, Android Push, Webhook, SMS/MMS, WhatsApp

Statistical confidence that a variant is outperforming the control group. Used in multivariate and A/B testing.

---

### Confirmation Page Button
**Channels:** In-App Message

Clicks on the button within the confirmation page of a survey in-app message.

---

### Confirmation Page Dismissals
**Channels:** In-App Message

Number of times users dismissed the confirmation page of a survey in-app message.

---

### Conversions (B, C, D)
**Channels:** Content Cards, Email, In-App Message, Web Push, iOS Push, Android Push, Webhook, SMS/MMS

Secondary conversion events (beyond the primary) defined when building a campaign.

| Channel | Conversion tracking behavior |
|---------|------------------------------|
| Email, Push, Webhooks | Tracked after initial send. |
| Content Cards | Counted when the user views the card for the first time. |
| In-App Messages | Counted if user received and viewed the message and performs the conversion event within the conversion window — regardless of click. Attributed to the most recently received message. With re-eligibility, assigned to the latest in-app message received. Each delivery is associated with only one conversion. |

---

### Total Conversions
**Channels:** In-App Message

Total number of conversion events across all impressions of an in-app message campaign.

- If a user sees the campaign **once**, only one conversion is counted even if they perform the event multiple times.
- With **re-eligibility enabled**, each new impression instance can generate one additional conversion. For example: 2 impressions + 1 conversion each = Total Conversions +2. But 1 impression + 2 conversion events = Total Conversions +1.

---

### Close Message
**Channels:** In-App Message

Number of times users explicitly dismissed/closed an in-app message.

---

### Conversion Rate
**Channels:** Content Cards, Email, In-App Message, Web Push, iOS Push, Android Push, Webhook, SMS/MMS

Percentage of message recipients who completed a defined conversion event within the conversion window.

- For **in-app messages**, the total daily *Unique Impressions* is used as the denominator.

`★ Insight ─────────────────────────────────────`
- Conversion attribution for in-app messages uses a "last-received-wins" model — this is a non-obvious behavior worth highlighting in training data, as it affects how multivariate results are interpreted
- The Button 1/2 Click metrics require a specific "Identifier for Reporting" value — this is an easy-to-miss configuration detail that commonly causes missing data in reporting
`─────────────────────────────────────────────────`
