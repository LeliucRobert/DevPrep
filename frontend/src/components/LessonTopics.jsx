import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useState, useEffect } from "react";
import ModalLesson from "./ModalLesson";
import ModalQuiz from "./ModalQuiz";

const LessonTopics = ({ initialStatus }) => {
  const [status, setStatus] = useState(initialStatus);
  const [showLesson, setShowLesson] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);

  useEffect(() => {
    setStatus(initialStatus);
  }, [initialStatus]);

  const handleStatusChange = () => {
    setStatus(status === "Completed" ? "Not Completed" : "Completed");
  };

  const cardStyle =
    status === "Completed"
      ? { backgroundColor: "#90EE90", color: "black" }
      : { backgroundColor: "#FFA07A", color: "black" };

  const handleShowLesson = () => {
    setShowLesson(true);
  };

  const handleShowQuiz = () => {
    setShowQuiz(true);
  };

  const handleCloseLesson = () => {
    setShowLesson(false);
  };

  const handleCloseQuiz = () => {
    setShowQuiz(false);
  };

  return (
    <>
      <Card style={cardStyle}>
        <Card.Body>
          <Row>
            <Col>
              <Card.Title>Special title treatment</Card.Title>
            </Col>
            <Col lg="1" xs="3">
              <Button variant="primary" onClick={handleShowLesson}>
                View
              </Button>
            </Col>
            <Col lg="2" xs="6">
              <Button variant="primary" onClick={handleShowQuiz}>
                Start Quiz
              </Button>
            </Col>
            {/* <Col lg="1" xs="3">
            <Button variant="primary">Reset</Button>
          </Col> */}
          </Row>
          <Row>
            <Col>Status: {status}</Col>
          </Row>
        </Card.Body>
      </Card>
      <ModalLesson show={showLesson} handleClose={handleCloseLesson} />
      <ModalQuiz show={showQuiz} handleClose={handleCloseQuiz} />
    </>
  );
};

export default LessonTopics;
