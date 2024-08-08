import React from "react";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import { useState, useEffect, useRef } from "react";
import { useToast } from "../../../../contexts/ToastContext";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import { ListBox } from "primereact/listbox";
import {
  Carousel,
  Container,
  Spinner,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import api from "../../../../api";
const Quiz = ({ topicId, onFinish }) => {
  const [index, setIndex] = useState(0);

  const [quiz, setQuiz] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getAnswersForAllQuestions = async (questions) => {
    try {
      const answersPromises = questions.map((question) =>
        api.get(`api/questions/${question.id}/answers/`)
      );
      const answersResponses = await Promise.all(answersPromises);
      return answersResponses.map((response) => response.data);
    } catch (error) {
      console.error("Error fetching answers:", error.message);
      return [];
    }
  };

  const fetchData = async () => {
    setLoading(true);

    try {
      const quiz = await api.get(`api/topics/${topicId}/quiz/`);
      const quizData = quiz.data;

      setQuiz(quizData);
      if (quizData[0].id) {
        const questions = await api.get(
          `api/quiz/${quizData[0].id}/questions/`
        );
        const questionsData = questions.data;

        setQuestions(questionsData);

        if (questionsData.length > 0) {
          const allAnswers = await getAnswersForAllQuestions(questionsData);
          setAnswers(allAnswers);
        }
      }
      setError(null);
    } catch (error) {
      setError("Error fetching data");
      console.error("Error fetching data:", error.message);
      setQuiz([]);
      setQuestions([]);
      setAnswers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [topicId]);

  const handleAnswerChange = (questionId, selected) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: selected,
    }));
  };

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const handlePrev = () => {
    const prevIndex = index === 0 ? 1 : index - 1;
    setIndex(prevIndex);
  };

  const handleNext = () => {
    const nextIndex = index === 1 ? 0 : index + 1;
    setIndex(nextIndex);
  };
  const showToast = useToast();

  const confirmFinish = () => {
    confirmDialog({
      message: "Are you sure you want to finish?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        showToast("info", "Confirmed", "You have finished", 3000);
        onFinish();
      },
      reject: () => {
        showToast("warn", "Cancelled", "You have cancelled", 3000);
      },
    });
  };
  return (
    <>
      <ConfirmDialog />
      <Container>
        <Carousel
          indicators={false}
          controls={false}
          activeIndex={index}
          onSelect={handleSelect}
          interval={null}
        >
          {!loading &&
            questions.map((question) => (
              <Carousel.Item key={question.id}>
                <div
                  className="d-flex flex-column align-items-center"
                  style={{ height: "100px" }}
                >
                  <h3>Question: {question.question}</h3>
                  <div className="learn-divider"></div>
                </div>
                <div
                  className="d-flex flex-column align-items-center justify-content-center"
                  style={{ flex: 1 }}
                >
                  <ListBox
                    multiple
                    value={selectedAnswers[question.id] || []}
                    onChange={(e) => handleAnswerChange(question.id, e.value)}
                    options={answers[question.id - 1]}
                    optionLabel="answer" // Adjust based on the actual field name in your answers array
                    className="w-full md:w-14rem"
                  />
                </div>
              </Carousel.Item>
            ))}
        </Carousel>
        <Row className="mt-3 justify-content-between">
          <Col className="text-center d-flex justify-content-center"></Col>
        </Row>
        <Row>
          <div className="learn-divider"></div>
        </Row>
        <Row className="mt-3 justify-content-between">
          <Col className="text-left d-flex justify-content-start">
            <Button
              variant="primary"
              onClick={handlePrev}
              disabled={index === 0}
            >
              Prev
            </Button>
          </Col>
          <Col className="text-right d-flex justify-content-end">
            {index === 1 ? (
              <Button
                variant="primary"
                onClick={confirmFinish}
                hidden={index !== 1}
              >
                Finish
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={handleNext}
                hidden={index === 1}
              >
                Next
              </Button>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Quiz;
