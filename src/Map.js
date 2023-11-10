/*global google*/
import React, { useState, useEffect } from "react";
import { GoogleMap, DirectionsRenderer, Marker } from "@react-google-maps/api";

const defaultLocation = { lat: 50.4501, lng: 30.5234 };
let origin = { lat: 50.4501, lng: 30.5234 };
let directionsService;

const Map = () => {
  const [destination, setDestination] = useState({
    lat: 50.5083,
    lng: 30.4989,
  });
  const [directions, setDirections] = useState(null);

  const onMapLoad = (map) => {
    directionsService = new google.maps.DirectionsService();
    changeDirection(directionsService, origin, destination);
  };

  const changeDirection = (directionsService, origin, destination) => {
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  };

  const onMapClick = (e) => {
    const newDestination = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    setDestination(newDestination);
    changeDirection(directionsService, origin, newDestination);
  };

  return (
    <div>
      <GoogleMap
        center={defaultLocation}
        zoom={7}
        onLoad={(map) => onMapLoad(map)}
        mapContainerStyle={{ height: "400px", width: "800px" }}
        onClick={onMapClick}
      >
        {directions !== null && <DirectionsRenderer directions={directions} />}
        <Marker position={destination} />
      </GoogleMap>
    </div>
  );
};

export default Map;
