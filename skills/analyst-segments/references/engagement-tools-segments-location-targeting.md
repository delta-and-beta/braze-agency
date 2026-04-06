---
name: engagement-tools-segments-location-targeting
source_url: >-
  https://braze-inc.github.io/braze-docs/_user_guide/engagement_tools/segments/location_targeting
indexed_at: '2026-04-05'
keywords:
  - location
  - targeting
  - segment
  - geofence
  - beacon
  - radius
  - polygon
  - region
  - filtering
  - integration
triggers:
  - target users by location
  - create location segment
  - set up geofencing
  - filter by recent location
  - integrate location partners
---
## Location Targeting

Target users by their most recent app location using segment filters.

### Setup

1. Navigate to **Audience > Segments** and select **Create Segment**
2. Add a **Most Recent Location** filter to the segment
3. Choose a region type: circular or polygonal

### Region Types

**Circular**
- Adjustable origin point and radius
- Best for simple radius-based targeting (e.g., "within 5 miles of downtown")

**Polygonal**
- Custom shape drawn around specific areas
- Best for irregular boundaries (e.g., targeting a specific neighborhood or state)

### Partner Integrations for Beacon & Geofence

For advanced physical location tracking beyond most-recent-location filtering, integrate with:

| Partner | Use Case |
|---------|----------|
| Radar | Geofencing and trip tracking |
| Infillion (formerly GroundTruth) | Beacon and geofence targeting |
| Foursquare | Place-based targeting |

These partners extend location capabilities with real-time entry/exit triggers, enabling message delivery based on physical actions rather than just last-known location.
