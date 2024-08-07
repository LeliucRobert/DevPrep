import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useState, useEffect } from "react";
import ModalLesson from "./ModalLesson";
import ModalQuiz from "./ModalQuiz";
import api from "../api";
const LessonTopicCard = ({ initialStatus, topicId, topicContent }) => {
  const [status, setStatus] = useState(initialStatus);
  const [showLesson, setShowLesson] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);

  // const [quiz, setQuiz] = useState([]);
  // const [questions, setQuestions] = useState([]);

  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(false);

  // const fetchData = async () => {
  //   setLoading(true);

  //   try {
  //     const quiz = await api.get(`api/topics/${topicId}/quiz/`);

  //     const quizData = quiz.data;
  //     console.log(quizData[0].id);
  //     setQuiz(quizData);
  //     if (quizData[0].id) {
  //       const questions = await api.get(
  //         `api/quiz/${quizData[0].id}/questions/`
  //       );
  //       const questionsData = questions.data;
  //       console.log(questionsData);
  //       setQuestions(questionsData);
  //       setError(null);
  //     }
  //     setError(null);
  //   } catch (error) {
  //     setError("Error fetching data");
  //     console.error("Error fetching data:", error.message);
  //     setQuiz(null);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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

  const handleShowQuiz = async () => {
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
      <ModalLesson
        show={showLesson}
        handleClose={handleCloseLesson}
        content={topicContent}
      />
      <ModalQuiz
        show={showQuiz}
        handleClose={handleCloseQuiz}
        topicId={topicId}
      />
    </>
  );
};

export default LessonTopicCard;
