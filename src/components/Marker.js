import React from "react";

import { MarkerF, InfoWindowF } from "@react-google-maps/api";

export default function Marker({
  selectedMarker,
  index,
  openInfoWindow,
  closeInfoWindow,
  marker,
}) {
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
          <p>{marker.info}</p>
        </InfoWindowF>
      )}
    </MarkerF>
  );
}
