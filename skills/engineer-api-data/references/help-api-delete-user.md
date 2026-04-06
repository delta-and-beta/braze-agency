---
name: help-api-delete-user
source_url: 'https://braze-inc.github.io/braze-docs/_help/help_articles/api/delete_user'
indexed_at: '2026-04-05'
keywords:
  - deletion
  - users
  - API
  - profiles
  - attributes
  - endpoint
  - duplicates
  - merge
triggers:
  - remove users via API
  - delete user profiles
  - merge duplicate users
  - how to delete users
---

# Remove users via API

When you [remove a user via the Braze REST API]({{site.baseurl}}/api/endpoints/user_data/#user-delete-endpoint/), the following data is deleted (nulled):
- Any attributes that the user had
- Email address
- Phone number
- External user ID 
- Gender
- Country
- Language

When you [remove a user via the Braze REST API]({{site.baseurl}}/api/endpoints/user_data/#user-delete-endpoint/), the following events occur:
- The user profile is deleted (nulled).
- The [Lifetime Users]({{site.baseurl}}/user_guide/data_and_analytics/analytics/understanding_your_app_usage_data/#lifetime-users) count will be updated to account for the newly removed users.	
- The removed user will still count toward the aggregated conversion percentage. Custom event counts and purchase counts will not be updated for removed users.

## Multiple profiles with a shared email address

Let's say you want to merge multiple user profiles that share the same email address. 

To merge these user profiles:

 1. Identify any users with duplicate email addresses. 
 2. Export all the attributes of a single profile. 
 3. Import those attributes to the user profile either via API or CSV. 
 4. Remove the users via API, essentially deleting these duplicate users and the data outlined above.

_Last updated on September 13, 2023_

