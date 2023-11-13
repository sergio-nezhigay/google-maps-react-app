import React from "react";
import {
  Col,
  Row,
  Form,
  Badge,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";

import { locationTypes } from "../utils/constants";

export default function DirectionForm({
  originType,
  handleOriginChange,
  currentLocation,
  destinationInput,
  handleDestinationInputChange,
  handleSubmit,
  isValidDestination,
  isWaypointsActive,
  toggleWaypointCheck,
}) {
  return (
    <>
      <Row className="align-items-start">
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>
                <strong>Пункт призначення</strong> (або виберіть на карті)
              </Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                className="mr-sm-2"
                value={destinationInput}
                onChange={handleDestinationInputChange}
                isInvalid={!isValidDestination}
              />

              <Form.Control.Feedback type="invalid">
                Введіть дійсне місце призначення
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>
              <strong>Пункт відправлення</strong>
            </Form.Label>
            <Form.Check
              type="radio"
              label="майдан Незалежності"
              value={locationTypes.DEFAULT_LOCATION}
              checked={originType === locationTypes.DEFAULT_LOCATION}
              onChange={handleOriginChange}
            />
            <Form.Check
              type="radio"
              label={
                <span>
                  моє місцезнаходження
                  {!currentLocation && (
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>Потрібен дозвіл з браузеру</Tooltip>}
                    >
                      <Badge bg="secondary">i</Badge>
                    </OverlayTrigger>
                  )}
                </span>
              }
              value={locationTypes.BROWSER_LOCATION}
              checked={originType === locationTypes.BROWSER_LOCATION}
              onChange={handleOriginChange}
              disabled={!currentLocation}
            />
          </Form.Group>
        </Col>
        <Col>
          <strong>
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Враховувати бордюри"
              onChange={toggleWaypointCheck}
              checked={isWaypointsActive}
            />
          </strong>
        </Col>
      </Row>
      <Row></Row>
    </>
  );
}
