---
name: locations-and-geofences-location-tracking
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/engagement_tools/locations_and_geofences/location_tracking
indexed_at: '2026-04-05'
keywords:
  - location
  - tracking
  - geofencing
  - gps
  - coordinates
  - segmentation
  - targeting
  - beacon
  - api
triggers:
  - enable location tracking
  - set location via API
  - build location-based campaigns
  - create location segments
  - troubleshoot location data
---
## Location Tracking

Braze captures a user's most recent location when the app is opened in the foreground using GPS data. Use this for segmentation, targeting, and location-based campaigns.

### How It Works

- **Mobile**: Uses device GPS chip + Wi-Fi scanning
- **Web**: Uses WPS (Wi-Fi Positioning System)
- All platforms require user opt-in
- Location is captured at **session start** (app open)

**Accuracy caveats**: Android users on "Battery saving" or "Device only" mode may have inaccurate data. Wi-Fi disabled devices are also less accurate.

### IP-Based Country Detection

Braze sets the country on user profiles via IP address from the **first SDK session** — available during and after the first session. (Legacy behavior only updated country after the first session was processed.)

### Enabling Location Tracking

Enable per platform via the developer guide:
- **iOS**: Swift SDK — `analytics/tracking_location`
- **Android**: Android SDK — `analytics/tracking_location`
- **Web**: Web SDK — `analytics/tracking_location`

### Hard-Setting Location via API

Use the `users/track` endpoint to set `current_location` directly:

```
POST https://[your_braze_rest_endpoint]/users/track
Content-Type: application/json
Authorization: Bearer YOUR-REST-API-KEY

{
  "attributes": [
    {
      "external_id": "XXX",
      "current_location": {"longitude": -0.118092, "latitude": 51.509865}
    }
  ]
}
```

### Location Targeting

Use location data with segments to build location-based campaigns (e.g., region-specific promotions, regulatory exclusions). See **Location targeting** docs for creating location segments.

### Partner Integrations (Beacon/Geofence)

- **Radar** — geofencing and location intelligence
- **Infillion** — beacon-based proximity targeting
- **Foursquare** — venue and place data

### Key Filters

| Filter | What it captures |
|--------|-----------------|
| `Most Recent Location` | Last known GPS location at session start |
| `Most Recent Device Locale` | Device language/region setting (independent of GPS) |
| `Location Available` | Whether a user has ever had a location stored |

### Important Behaviors

- Location is only captured when the app is **open in the foreground**
- If location is disabled, `Most Recent Location` shows the last recorded value
- Opting out of tracking does **not** remove previously stored location data
- A user qualifies for `Location Available` even after opting out, if they had a location stored

### Troubleshooting: No Users Have Locations

1. **Check data collection**: iOS requires opt-in prompt; Android requires fine/coarse location permissions
2. **Check data transfer**: Use the `Location Available` filter to see what % of users have a recent location; confirm developers haven't disabled location tracking in the SDK
3. **Background location**: If passing background location to Braze, more granular data may be available beyond session-start captures
