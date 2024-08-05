import React from "react";
import { Modal, Button, Container, Carousel, Row, Col } from "react-bootstrap";
const ModalQuiz = ({ show, handleClose }) => {
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
            Custom Modal Styling
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Carousel indicators={false} controls={false}>
              <Carousel.Item>
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ height: "300px" }}
                >
                  <h3>hahah</h3>
                </div>
              </Carousel.Item>
            </Carousel>
            <Row className="mt-3 justify-content-between">
              <Col className="text-left d-flex justify-content-start">
                <Button variant="primary">Prev</Button>
              </Col>
              <Col className="text-right d-flex justify-content-end">
                <Button variant="primary">Next</Button>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalQuiz;
