---
name: email-setup-deliverability-pitfalls-and-spam-traps
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/message_building_by_channel/email/email_setup/deliverability_pitfalls_and_spam_traps
indexed_at: '2026-04-05'
keywords:
  - deliverability
  - spam
  - traps
  - bounce
  - opt-in
  - verification
  - complaints
  - sunset
  - addresses
  - authentication
triggers:
  - how to avoid spam traps
  - improve email deliverability
  - set up email verification
  - remove bounced emails
  - implement double opt-in
---

# [![Braze Learning course]({% image_buster /assets/img/bl_icon3.png %})](https://learning.braze.com/email-onboarding-for-pro-and-enterprise-achieving-high-deliverability){: style="float:right;width:120px;border:0;" class="noimgborder"}Deliverability pitfalls and spam traps

Your email deliverability can be affected by any of the following spam traps:

| Trap Type | Description |
|---|---|
| Pristine Traps | Email addresses and domains that have never been used. |
| Recycled Traps | Email addresses that were originally real users, but are now dormant. |
| Typo Traps | Email addresses containing common typos. |
| Spam Complaints | When your email is marked as spam by a customer. |
| High Bounce Rate | When your email consistently fails to deliver because the recipient's address is invalid. |
{: .reset-td-br-1 .reset-td-br-2 role="presentation" }

## How to avoid spam traps

These traps can be avoided if you set up a confirmed opt-in process. By sending an initial opt-in email and asking customers to verify that they want your messages, you're ensuring your recipients want to hear from you, and that you're sending to real, valid addresses. Here are additional ways to avoid spam traps:

1. Send a double opt-in email. This is an email that will require users to confirm their subscription choices by clicking a link.
2. As a best practice, implement a [sunset policy]({{site.baseurl}}/user_guide/message_building_by_channel/email/best_practices/sunset_policies/).
3. **Never purchase email lists.** 

{% alert tip %}
The Braze Customer Success and Deliverability teams can help make sure you're following best practices to maximize deliverability across the globe.
{% endalert %}

## Removing an email address from your bounce or spam list

You can remove bounced emails and emails on your Braze spam list with the following endpoints:
- [`/email/bounce/remove`]({{site.baseurl}}/api/endpoints/email/post_remove_hard_bounces)
- [`/email/spam/remove`]({{site.baseurl}}/api/endpoints/email/post_remove_spam)
