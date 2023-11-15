import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";

import geoObjectAPI1 from "../utils/geoObjectAPI";

function ErrorModal({ setIsErrorModalActive, isErrorModalActive, id }) {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await geoObjectAPI1.sendReport(id, message);
      setMessage("");
      setIsErrorModalActive(false);
      setError(null);
    } catch (error) {
      console.error("Error:", error);
      setError(
        "An error occurred while sending the message. Please try again."
      );
    }
  };

  return (
    <Modal
      show={isErrorModalActive}
      onHide={() => setIsErrorModalActive(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Відправити повідомлення про помилку</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form.Group controlId="message">
            <Form.Label>Enter your message:</Form.Label>
            <Form.Control
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit">
            Send Message
          </Button>
          <Button
            variant="secondary"
            type="button"
            onClick={() => setIsErrorModalActive(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default ErrorModal;
