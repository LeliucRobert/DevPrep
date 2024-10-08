import React from "react";

import Modal from "react-bootstrap/Modal";

const ModalLesson = ({ show, handleClose, content, title }) => {
  return (
    <>
      <Modal
        show={show}
        onHide={() => handleClose()}
        dialogClassName="custom-modal-width"
        aria-labelledby="example-custom-modal-styling-title"
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            {title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ maxWidth: "100%", overflowX: "auto" }}>
            <div
              dangerouslySetInnerHTML={{
                __html: content,
              }}
            />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalLesson;
