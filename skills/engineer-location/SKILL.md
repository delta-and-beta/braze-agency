---
name: engineer-location
description: >-
  Technical implementation of location-based partner services including
  geofencing, weather data, and proximity detection.
metadata:
  role: braze-engineer
  topics:
    - message-personalization-location
    - location-radar
    - location-loplat
    - location-infillion
    - location-foursquare
    - location-flybuy
    - location-bluedot
    - location-accuweather
  keywords: []
  generator: nick
  version: 1.0.0
---
Using `superpowers:writing-skills` to guide the structure of this skill file. The key principles: clear lens, partner taxonomy as quick-reference tables, common mistakes section, and CSO-optimized structure.

`★ Insight ─────────────────────────────────────`
- Skill files for plugin roles act as **retrieval-time reference** — Claude loads them when routing a query to the `braze:engineer` role, so the "when to use" and partner taxonomy tables are more important than prose explanations
- The "lens" concept (technical integration patterns) should shape *every* section — it's what distinguishes this skill from a general product overview
`─────────────────────────────────────────────────`

Here is the generated markdown body:

---

# Location Integration Engineering

## Overview

This skill covers technical implementation of Braze's location-based partner integrations — geofencing, proximity detection, venue targeting, and weather-conditional personalization. It serves the **braze:engineer** role with a focus on SDK wiring, custom event mapping, and data pipeline configuration.

**Lens:** Technical integration patterns and SDK configuration — how to connect partner location SDKs to Braze custom events, user attributes, and action-based campaign triggers.

## When to Use

Use this skill when:
- Configuring a third-party location SDK to emit Braze custom events on geofence entry/exit or arrival
- Debugging location events not appearing in Braze user profiles
- Choosing between location partners for a specific geofencing or proximity use case
- Implementing weather-conditional messaging via AccuWeather Connected Content
- Syncing partner user IDs to Braze external IDs for attribution

## Partner Integrations Covered

### Geofencing & Proximity Partners

| Partner | Core Capability | Integration Style |
|---------|-----------------|-------------------|
| **Radar** | Geofences, trip tracking, place detection | SDK → custom events via `BrazeManager` |
| **Bluedot** | High-accuracy geofencing, zone callbacks | SDK → `logCustomEvent()` in zone entry/exit handlers |
| **Loplat** | Offline venue detection (Korea-focused) | SDK → custom events + user attributes |
| **Infillion** | Geofencing + beacon proximity | SDK → Braze custom events with beacon metadata |
| **Flybuy** | Curbside/pickup arrival detection | SDK → custom event trigger on order arrival state |
| **Foursquare** | Venue visit data, audience segmentation | Location data targeting in Braze segments |

### Weather & Contextual Data

| Partner | Core Capability | Integration Style |
|---------|-----------------|-------------------|
| **AccuWeather** | Real-time weather for message personalization | Connected Content API pull at send time |

## Common Integration Architecture

All SDK-based partners follow a shared pattern when wiring into Braze:

1. **Initialize Braze first** — location SDK initialization must occur after `Braze.start()` to avoid missing the user context
2. **Sync user identity** — set partner SDK user ID to match Braze external ID for unified attribution
3. **Map partner events to Braze custom events** — translate location callbacks (geofence enter/exit, arrival, zone detection) via `Braze.logCustomEvent()` with event properties (zone name, confidence, distance)
4. **Write location context to attributes** — push current city, venue category, or weather condition to Braze user attributes for segment targeting
5. **Trigger campaigns via action-based delivery** — configure Braze campaigns to fire on the mapped custom events

### Partner-Specific Notes

**Radar:** Radar fires `radarEvent` callbacks — forward these to Braze via a `BrazeManager` wrapper. Radar's `userId` field must match Braze external ID.

**Bluedot:** Zone entry/exit callbacks call `BDLocationDelegate` methods — invoke `Braze.logCustomEvent()` inside these delegates. Zone metadata (name, ID, custom data) maps to event properties.

**Flybuy:** Detects curbside arrival via geofence + ETA model — maps to a Braze custom event (e.g., `customer_arrived`) that triggers in-app or push notifications for order pickup workflows.

**Loplat:** Uses passive Wi-Fi/sensor fusion for indoor venue detection — emits place entry events that map to Braze custom events with loplat place ID and category as properties.

**Infillion:** Beacon proximity and geofence events are delivered via `MediaMathLocationDelegate` — forward to Braze with beacon UUID and proximity as event properties.

**Foursquare:** Not a runtime SDK integration — Foursquare provides location data targeting at the campaign audience level, not real-time event triggers.

**AccuWeather:** Not an SDK. Use Braze **Connected Content** to call the AccuWeather API at message send time. Pull current conditions (temperature, icon, severity) via Liquid and personalize subject lines, copy, or image variants.

## Location Personalization Context

Location partners serve distinct roles in a campaign stack — they are complementary, not interchangeable:

| Layer | Partners | Purpose |
|-------|----------|---------|
| Real-time behavioral trigger | Radar, Bluedot, Loplat, Infillion | Fire campaigns when user enters/exits a location |
| Operational moment | Flybuy | Trigger at curbside arrival, order-ready state |
| Audience segmentation | Foursquare | Target users by historical venue visit patterns |
| Contextual content | AccuWeather | Personalize message copy based on current weather |

## Common Mistakes

| Mistake | Correct Approach |
|---------|-----------------|
| Partner user ID does not match Braze external ID | Always set partner SDK user ID to Braze external ID at login/identify |
| Location events fire before Braze SDK initializes | Initialize Braze first; queue partner events until SDK is ready |
| Treating AccuWeather as an SDK integration | AccuWeather is a Connected Content pull — no SDK, no custom events |
| Logging geofence events without event properties | Include zone name, confidence level, and radius as event properties for segment filtering |
| Running multiple geofencing partners simultaneously | One partner per campaign as source of truth; duplicate events corrupt analytics |
| Forgetting to log geofence *exit* events | Enter and exit events are both needed for dwell-time segmentation and re-entry suppression |

---

`★ Insight ─────────────────────────────────────`
- The "Partner-Specific Notes" section is deliberately brief per partner — enough for an engineer to identify the right callback/delegate pattern without duplicating full SDK docs
- Separating AccuWeather and Foursquare from the SDK-based partners in both the table and the integration notes prevents a common confusion: engineers often expect all location partners to follow the same event-based SDK wiring
- The "Location Personalization Context" table gives the braze:engineer a mental model for recommending partners — it answers "which one?" before the engineer asks
`─────────────────────────────────────────────────`
