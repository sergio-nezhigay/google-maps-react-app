/*global google*/
import ReactDOM from "react-dom";
import React from "react";

import { GoogleMap, DirectionsRenderer } from "@react-google-maps/api";

const defaultLocation = { lat: 40.756795, lng: -73.954298 };
let destination = { lat: 41.756795, lng: -78.954298 };
let origin = { lat: 40.756795, lng: -73.954298 };
let directionsService;
class Map extends React.Component {
  state = {
    directions: null,
    bounds: null,
  };

  onMapLoad = (map) => {
    directionsService = new google.maps.DirectionsService();
    //load default origin and destination
    this.changeDirection(origin, destination);
  };

  //function that is calling the directions service
  changeDirection = (origin, destination) => {
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          //changing the state of directions to the result of direction service
          this.setState({
            directions: result,
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  };

  render() {
    return (
      <div>
        <GoogleMap
          center={defaultLocation}
          zoom={5}
          onLoad={(map) => this.onMapLoad(map)}
          mapContainerStyle={{ height: "400px", width: "800px" }}
        >
          {this.state.directions !== null && (
            <DirectionsRenderer directions={this.state.directions} />
          )}
        </GoogleMap>
      </div>
    );
  }
}

export default Map;
