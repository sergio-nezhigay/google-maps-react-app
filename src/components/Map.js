/*global google*/
import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  DirectionsRenderer,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api";

import rawPlaces from "../convertcsv.json";
const places = [];

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
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    rawPlaces.forEach((item, index) => {
      if (+item?.AB > 20) {
        places.push({
          id: index,
          position: { lat: +item.AB, lng: +item.AC },
          info: item.C,
        });
      }
    });
    setMarkers(places);
  }, []);

  const onMapLoad = () => {
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

        {markers.map((marker, index) => (
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
