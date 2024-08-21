import React from "react";

import Modal from "react-bootstrap/Modal";

const ModalLesson = ({ show, handleClose, content }) => {
  return (
    <>
      <Modal
        show={show}
        onHide={() => handleClose()}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Custom Modal Styling
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{content}</p>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalLesson;
