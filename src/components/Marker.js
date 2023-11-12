import React, { useState } from "react";

import { MarkerF, InfoWindowF } from "@react-google-maps/api";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import ModalMessage from "./ModalMessage";
import chooseIcon from "../utils/chooseIcon";

export default function Marker({
  selectedMarker,
  index,
  openInfoWindow,
  closeInfoWindow,
  marker,
}) {
  const [reportError, setReportError] = useState(false);

  const icon = chooseIcon(marker);

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

  const handleReportError = () => {
    setReportError(true);
  };

  return (
    <MarkerF
      key={index}
      onClick={() => openInfoWindow(marker)}
      position={marker.position}
      icon={icon}
    >
      {selectedMarker?.id === marker?.id && (
        <InfoWindowF position={marker.position} onCloseClick={closeInfoWindow}>
          <>
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
                <Button onClick={handleReportError} size="sm">
                  Повідомити про неточність
                </Button>
              </div>
            </div>
            <ModalMessage
              reportError={reportError}
              setReportError={setReportError}
              messageText="Повідомлення про неточність було відправлено."
            />
          </>
        </InfoWindowF>
      )}
    </MarkerF>
  );
}
