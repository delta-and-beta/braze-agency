---
name: analytics-inbox-monster
source_url: >-
  https://braze-inc.github.io/braze-docs/_partners/data_and_analytics/analytics/inbox_monster
indexed_at: '2026-04-05'
keywords:
  - deliverability
  - seedlist
  - rendering
  - templates
  - inbox
  - creative
  - placement
  - signals
  - SMS
  - authentication
triggers:
  - set up Inbox Monster with Braze
  - eliminate seedlist testing
  - automate email deliverability signals
  - review and approve email creative
  - import email templates for diagnostics
---

# Inbox Monster

> [Inbox Monster](https://inboxmonster.com/) is an inbox signals platform that helps enterprise brands land every send. It's an integrated suite of solutions for deliverability, creative rendering, and SMS monitoring, that empowers modern customer relationship management (CRM) teams and ends the sending scaries.

The Braze and Inbox Monster integration allows you to eliminate manual seedlist testing, automate the creation of powerful and actionable inbox placement signals, simplify the process of reviewing and approving email creative assets, and obtain valuable deliverability insights. You can also seamlessly import email templates for creative diagnostics and device previews.

## Prerequisites

| Requirement                    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                          |
|--------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Inbox Monster platform account | An Inbox Monster platform account is required to take advantage of this partnership.                                                                                                                                                                                                                                                                                                                                                                 |
| Braze REST API key             | A Braze REST API key with the following permissions:  <br> - `messages.send` <br>  - `templates.email.create`<br> - `templates.email.update` <br> - `templates.email.info`<br> - `templates.email.list` <br><br> And with the following whitelisted ips: <br> - `3.136.16.19` <br>  - `3.140.233.31`<br> - `18.220.127.138` <br><br> This can be created in the Braze dashboard from **Settings** > **APIs and Identifiers** in the **API Keys** tab |
| Braze app identifier           | A Braze app identifier. <br><br>This can be found in the Braze dashboard from **Settings** > **APIs and Identifiers** in the **App Identifiers** tab.                                                                                                                                                                                                                                                                                                |
| Braze endpoint                 | [Your Braze endpoint]({{site.baseurl}}/api/basics/#endpoints) aligns with your Braze dashboard URL.<br><br> For example, if your dashboard URL is `https://dashboard-03.braze.com`, your endpoint will be `dashboard-03`.                                                                                                                                                                                                                            |
{: .reset-td-br-1 .reset-td-br-2 .reset-td-br-3 .reset-td-br-4 role="presentation" }

## Integration

To integrate Inbox Monster, follow the steps in [Integrating with Inbox Monster](https://intercom.help/inbox-monster/en/articles/9518204-scheduled-placement-tests-with-braze#h_80147afaf3).

## Usage

To learn how to send schedule inbox placement tests through Inbox Monster, refer to [Scheduled Inbox Placement Tests](https://intercom.help/inbox-monster/en/articles/9518204-scheduled-placement-tests-with-braze#h_7e74bc474e).
