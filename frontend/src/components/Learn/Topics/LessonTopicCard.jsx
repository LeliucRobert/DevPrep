import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useState, useEffect } from "react";
import ModalLesson from "./View/ModalLesson";
import ModalQuiz from "./Quiz/ModalQuiz";
import api from "../../../api";
const LessonTopicCard = ({ initialStatus, topicId, topicContent }) => {
  const [status, setStatus] = useState("Not Completed");
  const [showLesson, setShowLesson] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [loading, setLoading] = useState(true);
  const [quizScore, setQuizScore] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`api/topics/${topicId}/userScores/`);

        const topicsData = response.data;
        if (topicsData.length > 0) {
          setQuizScore(topicsData[0].quizScore);

          console.log(topicsData[0].quizScore);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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

  useEffect(() => {
    if (!loading && quizScore > 0) {
      setStatus("Completed");
    }
  }, [loading, quizScore]);

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
          </Row>

          <Row>
            <Col>Status: {status}</Col>
          </Row>
          <Row>
            <Col>Quiz Grade: {quizScore} / 100%</Col>
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
