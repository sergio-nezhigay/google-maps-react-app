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
  const icon = {
    url: require("../images/pin4.ico"),
    fillColor: "#EB00FF",
  };

  switch (marker.type?.name) {
    case "CATERING":
      icon.url = require("../images/catering.ico");
      break;
    case "INFRASTRUCTURE":
      icon.url = require("../images/infrastructure.ico");
      break;
    case "SHOP":
      icon.url = require("../images/shop.ico");
      break;
    case "PARK":
      icon.url = require("../images/park.ico");
      break;
    case "BUILDING":
      icon.url = require("../images/building.ico");
      break;
    case "EDUCATION":
      icon.url = require("../images/education.ico");
      break;
    case "FACILITY":
      icon.url = require("../images/facility.ico");
      break;
    case "MEDICINE":
      icon.url = require("../images/medicine.ico");
      break;
    case "TRANSPORT":
      icon.url = require("../images/transport.ico");
      break;
    case "PLAYGROUND":
      icon.url = require("../images/playground.ico");
      break;
    default:
      break;
  }

  const accessibilityBlock = marker.accessibilities?.length ? (
    <>
      <p>
        <strong>Зручності:</strong>
      </p>
      <ul>
        {marker.accessibilities.map((accessibility, index) => (
          <li key={index}>{accessibility.title}</li>
        ))}
      </ul>
    </>
  ) : null;

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
              {marker.type?.title && (
                <p className="card-text">
                  <strong>{marker.type.title}</strong>
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
