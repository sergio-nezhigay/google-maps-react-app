import React from "react";

import { MarkerF, InfoWindowF } from "@react-google-maps/api";

export default function Marker({
  selectedMarker,
  index,
  openInfoWindow,
  closeInfoWindow,
  marker,
}) {
  const accessibilityBlock = marker.accessibilities?.length ? (
    <>
      <p>Зручності:</p>
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
          <>
            <h5>{marker.info}</h5>
            {marker.description && <p>{marker.description}</p>}
            {marker.type?.label && <p>{marker.type.label}</p>}
            {marker.schedule?.label && <p>{marker.schedule}</p>}
            {accessibilityBlock}
          </>
        </InfoWindowF>
      )}
    </MarkerF>
  );
}
