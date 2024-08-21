import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useState, useEffect, useRef } from "react";
import ModalLesson from "./View/ModalLesson";
import ModalQuiz from "./Quiz/ModalQuiz";
import api from "../../../api";
import { confirmDialog } from "primereact/confirmdialog";
import { useToast } from "../../../contexts/ToastContext";
import Loading from "../../Utils/Loading";
import Error from "../../Utils/Error";

const LessonTopicCard = ({ topicId, topicContent }) => {
  const [status, setStatus] = useState("Not Completed");
  const [showLesson, setShowLesson] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [loading, setLoading] = useState(true);
  const [quizScore, setQuizScore] = useState(0);
  const [error, setError] = useState("");
  const showToast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.get(`api/topics/${topicId}/userScores/`);

        const topicsData = response.data;
        if (topicsData.length > 0) {
          setQuizScore(topicsData[0].quizScore);
        }
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "An unexpected error occurred. Please try again later!"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const deleteUserTopicStatus = async () => {
    try {
      const response = await api.delete(
        `api/topics/${topicId}/deleteUserScore`
      );
      console.log(response);
      setQuizScore(0);
    } catch (error) {
      console.error("Error deleting data:", error.message);
    }
  };

  const confirmFinish = () => {
    confirmDialog({
      message: "Are you sure you want to delete the progress?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        showToast(
          "info",
          "Confirmed",
          `You have successfully reset the progress for this topic`,
          3000
        );
        deleteUserTopicStatus();
      },

      reject: () => {
        showToast("warn", "Cancelled", "You have cancelled", 3000);
      },
    });
  };

  useEffect(() => {
    if (!loading && quizScore > 50) {
      setStatus("Completed");
    }
  }, [loading, quizScore]);

  const cardStyle =
    quizScore >= 50
      ? { backgroundColor: "#90EE90", color: "black" }
      : quizScore > 0
      ? { backgroundColor: "#FFA07A", color: "black" }
      : { backgroundColor: "#e6e6fa", color: "black" };

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

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error message={error} />;
  }
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
            <Col className="d-flex justify-content-end gap-2" lg="2" xs="6">
              <Button variant="primary" onClick={handleShowQuiz}>
                Start Quiz
              </Button>

              <Button
                variant="primary"
                onClick={confirmFinish}
                disabled={quizScore === 0}
              >
                Reset
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
