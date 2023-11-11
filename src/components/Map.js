/*global google*/
import React, { useState } from "react";
import { FormControl, Button, Col, Row } from "react-bootstrap";

import { GoogleMap, DirectionsRenderer } from "@react-google-maps/api";

import useInitMarkers from "../utils/useInitMarkers";
import geocodeFromString from "../utils/geocodeFromString";
import Marker from "./Marker";

const defaultLocation = { lat: 50.4501, lng: 30.5234 };
let origin = { lat: 50.4501, lng: 30.5234 };

let directionsService;
let directionsDisplay;

const Map = () => {
  const [directions, setDirections] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [destinationInput, setDestinationInput] = useState("");
  const markers = useInitMarkers();

  function init() {
    directionsService = new window.google.maps.DirectionsService();
  }

  init();

  const changeDirection = (origin, destination) => {
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: window.google.maps.TravelMode.WALKING,
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
    directionsService = null;
    init();
    const newDestination = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    setDestinationInput("");
    changeDirection(origin, newDestination);
  };

  const handleDestinationInputChange = (event) => {
    setDestinationInput(event.target.value);
  };

  const handleDestinationSubmit = () => {
    geocodeFromString(destinationInput).then((coordinates) => {
      changeDirection(directionsService, origin, coordinates);
      setSelectedMarker(null);
    });
  };

  const openInfoWindow = (marker) => {
    setSelectedMarker(marker);
  };

  const closeInfoWindow = () => {
    setSelectedMarker(null);
  };

  return (
    <div>
      <Row className="mb-2 mx-auto">
        <Col>
          <FormControl
            type="text"
            placeholder="Введіть місце призначення "
            className="mr-sm-2"
            value={destinationInput}
            onChange={handleDestinationInputChange}
          />
        </Col>
        <Col>
          <Button variant="outline-info" onClick={handleDestinationSubmit}>
            Підтвердіть
          </Button>
        </Col>
      </Row>

      <GoogleMap
        center={defaultLocation}
        zoom={12}
        mapContainerStyle={{ height: "500px" }}
        onClick={onMapClick}
      >
        {directions !== null && <DirectionsRenderer directions={directions} />}

        {markers.map((marker, index) => (
          <Marker
            selectedMarker={selectedMarker}
            index={index}
            openInfoWindow={openInfoWindow}
            closeInfoWindow={closeInfoWindow}
            marker={marker}
          />
        ))}
      </GoogleMap>
    </div>
  );
};

export default Map;
