---
name: extensions-learning-edume
source_url: >-
  https://braze-inc.github.io/braze-docs/_partners/additional_channels_and_extensions/extensions/learning/edume
indexed_at: '2026-04-05'
keywords:
  - edume
  - training
  - integration
  - campaigns
  - courses
  - connected-content
  - onboarding
  - api
  - progress-tracking
triggers:
  - embed training courses in campaigns
  - track user learning progress
  - set up edume integration
  - create course access links
  - configure connected content for training
---

# eduMe

> [eduMe](https://edume.com) is a mobile-based training tool that gives your workforce the knowledge they need to succeed, when they need it, wherever they are. 

_This integration is maintained by eduMe._

## About the integration

The Braze and eduMe integration leverages Braze [Connected Content]({{site.baseurl}}/user_guide/personalization_and_dynamic_content/connected_content/about_connected_content/#about-connected-content) to give your users access to eduMe courses and lessons in your Braze campaigns. Individual and group progress can then be tracked through eduMe reporting functionality.

## Prerequisites

| Requirement | Description |
|---|---|
| eduMe account | An eduMe account is required to take advantage of this partnership. |
| eduMe API key | You must request an API key from your eduMe customer success contact. This key is used in your Braze Connected Content call. |
| eduMe link signing secret | You must request your customer success contact at eduMe to set up a link signing secret for your organization. This secret is used to enable seamless links in Connected Content. You not have to do anything with this secret. |
| eduMe group and content IDs | These identifiers are needed to set up your Connected Content calls. Contact your eduMe customer service contact for help obtaining these identifiers. |
{: .reset-td-br-1 .reset-td-br-2 role="presentation" }

## Integration

### Create your Connected Content call

To give a user access to a course, lesson, or eNPS survey, and to track their progress against your internal user ID in eduMe, follow the API call shown in this example:

{% raw %}
```
Welcome to my Rickshaw App platform.
Access your onboarding course at:

{% connected_content
  https://connect.edume.com/
  EDUME-CONTENT-LINK-AND-CONTENT-ID&groupId=5681&externalUserId={{${driver_id}}}
  :headers {
       "x-api-key": "YOUR-EDUME-API-KEY"
  }
%}
```
{% endraw %}

1. Replace `YOUR-EDUME-API-KEY` with your eduMe API key.<br><br>
2. Replace the `EDUME-CONTENT-LINK-AND-CONTENT-ID` with the corresponding content link string and module, lesson, or survey identifier. These identifiers can be found in your eduMe account.
  - Course: `getCourseLink?moduleId=12087`
  - Lesson: `getLessonLink?lessonId=25805`
  - eNPS survey: `getSurveyLink?surveyId=654`<br><br>
3. Users who arrive at eduMe through this link are added to an eduMe team or group of your choosing. Replace `groupId` with the relevant team ID or eduMe group ID. You typically use the team ID except for courses that require enrollment, in which case you should use the group ID<br><br>
4. Include an appropriate field to map the `externalUserId` field to. The example connected content call uses the `driver_id`, though your field will likely be different. This ID is available in eduMe reports, allowing you to correlate them with your systems.<br><br>
5. Lastly, customize and test your message as needed. We recommend you send at least one test message, access the eduMe content, complete the lesson or course, and verify the eduMe analytics are being recorded. 

