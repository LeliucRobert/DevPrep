import React, { useState, useEffect, useRef } from "react";
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
import { useToast } from "../../../../contexts/ToastContext";
import { confirmDialog } from "primereact/confirmdialog";
const ModalQuiz = ({ show, handleClose, topicId }) => {
  const showToast = useToast();

  const dialogClose = () => {
    confirmDialog({
      message: "Are you sure you want to close this modal?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        handleClose();
        showToast("info", "Confirmed", "You have finished", 3000);
      },
      reject: () => {
        showToast("info", "Confirmed", "You have finished", 3000);
      },
    });
  };
  return (
    <>
      <Modal
        show={show}
        backdrop="static"
        onHide={() => dialogClose()}
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
          <Quiz topicId={topicId} onFinish={handleClose} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalQuiz;
