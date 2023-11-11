import React from "react";

import { MarkerF, InfoWindowF } from "@react-google-maps/api";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Marker({
  selectedMarker,
  index,
  openInfoWindow,
  closeInfoWindow,
  marker,
}) {
  const accessibilityBlock = marker.accessibilities?.length ? (
    <>
      <p>
        <strong>Зручності:</strong>
      </p>
      <ul>
        {marker.accessibilities.map((accessibility, index) => (
          <li key={index}>{accessibility.label}</li>
        ))}
      </ul>
    </>
  ) : null;

  const icon = {
    url: require("../images/pin4.ico"),
    fillColor: "#EB00FF",
  };

  switch (marker.type?.name) {
    case "CATERING":
      icon.url = require("../images/cafee.ico");
      break;
    case "INFRASTRUCTURE":
      icon.url = require("../images/pin2.ico");
      break;
    case "SHOP":
      icon.url = require("../images/pin5.ico");
      break;
    case "PARK":
      icon.url = require("../images/park.ico");
      break;
    // додайте додаткові випадки для інших типів, якщо потрібно
    default:
      break;
  }

  return (
    <MarkerF
      key={index}
      onClick={() => openInfoWindow(marker)}
      position={marker.position}
      icon={icon}
    >
      {selectedMarker?.id === marker?.id && (
        <InfoWindowF position={marker.position} onCloseClick={closeInfoWindow}>
          <div className="card" style={{ width: "18rem" }}>
            <div className="card-body">
              <h5 className="card-title">{marker.info}</h5>
              {marker.description && (
                <p className="card-text">{marker.description}</p>
              )}
              {marker.type?.label && (
                <p className="card-text">
                  <strong>{marker.type.label}</strong>
                </p>
              )}
              {marker.schedule && (
                <p className="card-text">
                  <span>
                    <strong>Розклад роботи:</strong>{" "}
                  </span>
                  {marker.schedule}
                </p>
              )}
              {accessibilityBlock}
            </div>
          </div>
        </InfoWindowF>
      )}
    </MarkerF>
  );
}
