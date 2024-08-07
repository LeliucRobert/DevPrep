import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Container,
  Carousel,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";
import Quiz from "./Quiz";
const ModalQuiz = ({ show, handleClose, topicId }) => {
  return (
    <>
      <Modal
        show={show}
        backdrop="static"
        onHide={() => handleClose()}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            haha
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Quiz topicId={topicId} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalQuiz;
