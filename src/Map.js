/*global google*/
import React, { useState } from "react";
import {
  GoogleMap,
  DirectionsRenderer,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api";

const defaultLocation = { lat: 50.4501, lng: 30.5234 };
let origin = { lat: 50.4501, lng: 30.5234 };

let directionsService;

const Map = () => {
  const [destination, setDestination] = useState({
    lat: 50.5083,
    lng: 30.4989,
  });
  const [directions, setDirections] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);

  const markersArray = [
    {
      id: "mark1",
      position: { lat: 50.4785672, lng: 30.4352165 },
      info: "Info for Marker 1",
    },
    {
      id: "mark2",
      position: { lat: 50.4885672, lng: 30.4452165 },
      info: "Info for Marker 2",
    },
    {
      id: "mark",
      position: { lat: 50.4985672, lng: 30.4552165 },
      info: "another",
    },
  ];

  const onMapLoad = (map) => {
    directionsService = new window.google.maps.DirectionsService();
    changeDirection(directionsService, origin, destination);
  };

  const changeDirection = (directionsService, origin, destination) => {
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error(`Error fetching directions ${result}`);
        }
      }
    );
  };

  const onMapClick = (e) => {
    const newDestination = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    setDestination(newDestination);
    changeDirection(directionsService, origin, newDestination);
    setSelectedMarker(null);
  };

  const openInfoWindow = (marker) => {
    setSelectedMarker(marker);
  };

  const closeInfoWindow = () => {
    setSelectedMarker(null);
  };

  return (
    <div>
      <GoogleMap
        center={defaultLocation}
        zoom={12}
        onLoad={(map) => onMapLoad(map)}
        mapContainerStyle={{ height: "500px", width: "900px" }}
        onClick={onMapClick}
      >
        {directions !== null && <DirectionsRenderer directions={directions} />}

        {markersArray.map((marker, index) => (
          <MarkerF
            key={index}
            onClick={() => openInfoWindow(marker)}
            position={marker.position}
          >
            {selectedMarker?.id === marker?.id && (
              <InfoWindowF
                position={marker.position}
                onCloseClick={closeInfoWindow}
              >
                <p>{marker.info}</p>
              </InfoWindowF>
            )}
          </MarkerF>
        ))}
      </GoogleMap>
    </div>
  );
};

export default Map;
