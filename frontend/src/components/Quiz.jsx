import React from "react";
import { useState, useEffect } from "react";
import {
  Carousel,
  Container,
  Spinner,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import api from "../api";
const Quiz = ({ topicId }) => {
  const [index, setIndex] = useState(0);

  const [quiz, setQuiz] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

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

  return (
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
                style={{ height: "300px" }}
              >
                <h3>{question.question}</h3>
                {answers[question.id - 1]?.map((answer, aIndex) => (
                  <h3 key={aIndex}>{answer.answer}</h3>
                ))}
              </div>
            </Carousel.Item>
          ))}
      </Carousel>
      <Row className="mt-3 justify-content-between">
        <Col className="text-left d-flex justify-content-start">
          <Button variant="primary" onClick={handlePrev} disabled={index === 0}>
            Prev
          </Button>
        </Col>
        <Col className="text-right d-flex justify-content-end">
          <Button variant="primary" onClick={handleNext} disabled={index === 1}>
            Next
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Quiz;
