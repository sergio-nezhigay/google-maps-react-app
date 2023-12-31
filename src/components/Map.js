/*global google*/
import React, { useEffect, useState, useMemo } from "react";
import { Row } from "react-bootstrap";
import { GoogleMap, DirectionsRenderer } from "@react-google-maps/api";

import DirectionForm from "./DirectionForm";
import Marker from "./Marker";
import useCurrentLocation from "../hooks/useCurrentLocation";
import useInitMarkers from "../hooks/useInitMarkers";
import { locationTypes } from "../utils/constants";
import geocodeFromString from "../utils/geocodeFromString";

import isInKyiv from "../utils/isInKyiv";
import filterPoints from "../utils/filterPoints";

const defaultLocation = { lat: 50.4501, lng: 30.5234 };
const MAXDISTANCE = 300; //meters

let directionsService;
// let directionsDisplay;

function Map() {
  const [isValidDestination, setIsValidDestination] = useState(true);
  const [originType, setOriginType] = useState(locationTypes.BROWSER_LOCATION);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [isWaypointsActive, setIsWaypointsActive] = useState(true);
  const currentLocation = useCurrentLocation();

  const [directions, setDirections] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [destinationInput, setDestinationInput] = useState("");

  const markers = useInitMarkers();

  const points = useMemo(
    () => markers.map(({ position }) => position),
    [markers]
  );

  const handleOriginChange = (event) => {
    setOriginType(event.target.value);
  };

  const toggleWaypointCheck = () => {
    setIsWaypointsActive(!isWaypointsActive);
  };

  useEffect(() => {
    directionsService = new window.google.maps.DirectionsService();
  }, []);

  useEffect(() => {
    if (originType === locationTypes.DEFAULT_LOCATION)
      setOrigin(defaultLocation);
    if (originType === locationTypes.BROWSER_LOCATION) {
      if (currentLocation) setOrigin(currentLocation);
      else {
        setOriginType(locationTypes.DEFAULT_LOCATION);
        setOrigin(defaultLocation);
      }
    }
  }, [originType, currentLocation]);

  useEffect(() => {
    if (origin && destination) {
      const waypoints = filterPoints(origin, destination, points, MAXDISTANCE)
        .map((point) => {
          return {
            location: point,
            stopover: true,
          };
        })
        .slice(0, 23);
      directionsService.route(
        {
          origin: origin,
          destination: destination,
          waypoints: isWaypointsActive ? waypoints : null,
          optimizeWaypoints: true,
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
    }
  }, [origin, destination, isWaypointsActive, points]);

  const onMapClick = (e) => {
    directionsService = null;
    directionsService = new window.google.maps.DirectionsService();
    const newDestination = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    setDestination(newDestination);
    setDestinationInput("");
  };

  const handleDestinationInputChange = (event) => {
    setDestinationInput(event.target.value);
    setIsValidDestination(true);
  };

  const handleDestinationSubmit = async (e) => {
    e.preventDefault();
    try {
      const newDestination = await geocodeFromString(destinationInput);
      if (
        newDestination.lat &&
        newDestination.lng &&
        isInKyiv(newDestination.lat, newDestination.lng)
      ) {
        directionsService = null;
        directionsService = new window.google.maps.DirectionsService();
        setSelectedMarker(null);
        setDestination(newDestination);
      } else {
        setIsValidDestination(false);
      }
    } catch (error) {
      setIsValidDestination(false);
      console.error(error);
    }
  };

  const openInfoWindow = (marker) => {
    setSelectedMarker(marker);
  };

  const closeInfoWindow = () => {
    setSelectedMarker(null);
  };

  return (
    <>
      <DirectionForm
        originType={originType}
        handleOriginChange={handleOriginChange}
        currentLocation={currentLocation}
        destinationInput={destinationInput}
        handleDestinationInputChange={handleDestinationInputChange}
        handleSubmit={handleDestinationSubmit}
        isValidDestination={isValidDestination}
        toggleWaypointCheck={toggleWaypointCheck}
        isWaypointsActive={isWaypointsActive}
      />
      <Row style={{ position: "relative", height: "calc(100vh - 230px" }}>
        <GoogleMap
          center={origin}
          zoom={12}
          mapContainerStyle={{ height: "100%" }}
          onClick={onMapClick}
        >
          {directions !== null && (
            <DirectionsRenderer directions={directions} />
          )}

          {markers.map((marker, index) => (
            <Marker
              key={index}
              selectedMarker={selectedMarker}
              index={index}
              openInfoWindow={openInfoWindow}
              closeInfoWindow={closeInfoWindow}
              marker={marker}
            />
          ))}
        </GoogleMap>
      </Row>
    </>
  );
}

export default Map;
