# spamgoogle2.0


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
