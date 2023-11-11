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

  return (
    <MarkerF
      key={index}
      onClick={() => openInfoWindow(marker)}
      position={marker.position}
      icon={{
        url: require("../images/pin.ico"),
        fillColor: "#EB00FF",
      }}
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
