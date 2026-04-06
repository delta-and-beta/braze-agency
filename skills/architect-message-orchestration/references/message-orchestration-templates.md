---
name: message-orchestration-templates
source_url: >-
  https://braze-inc.github.io/braze-docs/_partners/message_orchestration/templates/taxi_for_email
indexed_at: '2026-04-05'
keywords:
  - email
  - templates
  - integration
  - campaigns
  - connector
  - API
  - export
  - editor
  - collaboration
  - platform
triggers:
  - set up Taxi for Email integration
  - create email template with Braze
  - export email template to Braze
  - configure Braze connector
  - integrate Taxi email editor
---

# Taxi for Email

> [Taxi for Email](http://taxiforemail.com/) is an online email marketing tool that offers an intuitive drag-and-drop visual email editor. Taxi encourage teams to easily collaborate on email campaigns, allowing copywriters and editors the access and resources they need to build emails, all without code.

_This integration is maintained by Taxi for Email._

## About the integration

The Braze and Taxi integration uses Taxi's simple yet powerful syntax to create and export intelligent email templates to Braze. 

## Prerequisites

| Requirement | Description |
| ------------| ----------- |
| Taxi for Email account | A Taxi for Email account is required to take advantage of this partnership. |
| Braze REST API key | A Braze REST API key with full **Templates** permissions. <br><br> This can be created in the Braze dashboard from **Settings** > **API Keys**. |
| Braze endpoint | [Your Braze endpoint]({{site.baseurl}}/api/basics/#endpoints) aligns with your Braze dashboard URL.<br><br> For example, if your dashboard URL is `https://dashboard-03.braze.com`, your endpoint will be `dashboard-03`. |
{: .reset-td-br-1 .reset-td-br-2 .reset-td-br-3 role="presentation" }

## Integration

### Step 1: Create a Taxi email template

Create a Taxi template on the Taxi platform. After the template is created, navigate to your **Organization Settings** and select the **ESP Connectors** tab.

### Step 2: Create Braze connector

1. In the dialogue that appears, select the **Add New** button, then select **Braze** from the dropdown. 
2. Select **Braze** to edit the Braze connector settings.
3. Enter your Braze endpoint and your Braze API key.

Your connector field will change colors after details with correct permissions are provided. If this field does not change, check that your fields align with the requirements listed.

## Usage

Find your uploaded Taxi template in your Braze account's **Templates & Media > Email Templates** section. You can now use this email template to start sending engaging email messages to your customers!


