---
name: whatsapp-overview-phone_number_acquisition
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/message_building_by_channel/whatsapp/overview/phone_number_acquisition
indexed_at: '2026-04-05'
keywords:
  - phone-number
  - acquisition
  - verification
  - Twilio
  - Infobip
  - WhatsApp
  - provisioning
  - webhook
triggers:
  - how to acquire a phone number for WhatsApp
  - set up phone number verification
  - Twilio phone number configuration
  - Infobip phone number setup
  - configure WhatsApp phone verification
---
## Phone Number Acquisition for WhatsApp

Braze does not provision phone numbers — you must acquire one yourself via your business phone provider or through partners **Twilio** or **Infobip** (requires your own account with either).

### WhatsApp API Requirements

The number must:
- Be owned by your business
- Have a country and area code (landline or cell)
- Be able to receive voice calls or SMS
- Be accessible during setup (for verification codes)
- Not be a short code
- Not have been previously used with WhatsApp Business Platform
- Not be connected to a personal WhatsApp account

---

### Acquiring a Twilio Phone Number

**Step 1 — Buy a number**

In the Twilio console: **Develop > Phone Numbers > Manage > Buy a number**  
(Alternate path: **Explore Products > Super Networks > Phone Number > Buy a number**)

Select an area code/locality, find a number, and click **Buy**.

**Step 2 — Configure for verification only**

> **Warning:** Only follow these steps to receive a verification code. Completing additional Twilio steps will bind the number to Twilio, making it unusable in Braze without a migration.

1. In Twilio console, go to **Active Numbers** and select your purchased number.
2. Under **Voice Configuration**, set **Configure with** to: `Webhook, TwiML Bin, Function, Studio Flow, Proxy Service`.
3. In the **A call comes in** row, select **Webhook** and set the URL to:
   ```
   https://twimlets.com/voicemail?Email=YOUR_EMAIL_ADDRESS
   ```
4. Copy your phone number from **2. Link WhatsApp Business Account > 2. Copy the phone number**.

**Step 3 — Complete Braze embedded sign up**

1. In Braze: **Technology Partners > WhatsApp > Begin integration** (or **Add WhatsApp Business Account**).
2. In the **Add a phone number for WhatsApp** step, select **Phone call** as verification method.
3. Wait for the verification code to arrive in your email (up to 10 minutes), then enter it to complete setup.

---

### Acquiring an Infobip Phone Number

1. In Infobip console: **Channels and Numbers > Numbers > Buy Number**.
2. Select your target country, then **SMS**.
3. For US numbers, select the required type (10 DLC or toll-free) if prompted.
4. Select an available offer and proceed. Check status at **Numbers > My Request**.
5. For some countries (e.g., US 10DLC), wait for Infobip to contact you with registration details.
6. Once the number is ready, go to Braze: **Technology Partners > WhatsApp > Begin integration**.
7. In the **Add a phone number for WhatsApp** step, select **Text message** as verification method.
8. Retrieve the verification code from Infobip's [Analyze Logs](https://www.infobip.com/docs/analyze/analyze-logs) in their customer portal (may take a few minutes), then enter it to complete setup.
