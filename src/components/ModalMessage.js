import React from "react";
import { Modal, Button } from "react-bootstrap";

function ModalMessage({ reportError, setReportError, messageText }) {
  return (
    <Modal show={reportError} onHide={() => setReportError(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Повідомлення</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{messageText}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setReportError(false)}
        >
          Закрити
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalMessage;
