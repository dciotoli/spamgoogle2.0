# spamgoogle2.0


4-25
Topography is done
Features to add:
-Formula for rating elevation

Bugs:
-When map is idle, it resets.  Causes old directions and charts to continue showing. (need to find a way to clear these when map becomes idle)
-Safari Browser (mobile and desktop) causes api calls to repeat countless times.  Causes errors with elevation charts showing multiple times each (4+).  And Over Query Limit from the API.




format of directionsService.route() response as explained: https://developers.google.com/maps/documentation/javascript/directions

response{
  geocoded_waypoints{
    geocoder_status
    partial_match
    place_id
    types[]
  }
  routes[]{
    legs[]{
      steps[]{

      }
      distance{
        value
        text
      }
      duration{
        value
        text
      }
      start_location
      end_location
    }
    waypoint_order
    overview_path  <-- THIS IS FOR TOPOGRAPHY,  everything else doesn't matter for this app
    overview_polyline
    bounds
    copyrights
    warnings[]
    fare
  }
}
