import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "../../styles/SolveProblems/ProblemCard.css";
import { Rating } from "primereact/rating";
import { Badge, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Loading from "../Utils/Loading";
import Error from "../Utils/Error";
const ProblemCard = ({
  id,
  title,
  card_description,
  created_by,
  difficulty,
  description,
  input_description,
  output_description,
  restrictions,
  sample_input,
  sample_output,
  category,
  isAuthorized,
}) => {
  const [ratingValue, setRatingValue] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSolveProblem = () => {
    const problemData = {
      id,
      title,
      card_description,
      created_by,
      difficulty,
      description,
      input_description,
      output_description,
      restrictions,
      sample_input,
      sample_output,
      category,
    };

    navigate(`/problems/${encodeURIComponent(id)}`, { state: problemData });
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [ratings, scores] = await Promise.all([
          getRatings(),
          getScores(),
        ]);
        setRatingValue(ratings.rating);
        setScore(scores.score);
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
  });

  const getRatings = async () => {
    try {
      const response = await api.get(`api/problems/${id}/getRating`);

      return response.data;
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "An unexpected error occurred. Please try again later!"
      );
      return [];
    }
  };

  const getScores = async () => {
    try {
      const response = await api.get(`api/problems/${id}/userScore`);
      return response.data;
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "An unexpected error occurred. Please try again later!"
      );
      return [];
    }
  };

  const ratingChange = async (event) => {
    try {
      const response = await api.post(`api/problems/${id}/setRating`, {
        rating: event.value,
      });
      setRatingValue(event.value);
      return response.data;
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "An unexpected error occurred. Please try again later!"
      );
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
  }
  return (
    <Card className="mb-5">
      <Card.Header as="h5">
        <Row className="align-items-center">
          <Col lg="1" className="d-flex align-items-center">
            {title}
          </Col>
          <Col lg="10" className="d-flex align-items-center">
            <Alert variant="danger" className="idAlert mb-0">
              #{id}
            </Alert>
          </Col>
          <Col lg="1">
            <Alert
              variant={
                score === 0
                  ? "danger"
                  : score === 100
                  ? "success"
                  : score > 0 && score < 100
                  ? "warning"
                  : "secondary"
              }
              className="idAlert mb-0"
            >
              {score}/100
            </Alert>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <Row className="mb-4">
          <Col md={10}>
            <Card.Title></Card.Title>
            <Card.Text>
              <div
                dangerouslySetInnerHTML={{
                  __html: card_description,
                }}
              />
            </Card.Text>
          </Col>
          <Col md={2} className="d-flex justify-content-end align-items-center">
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip id="button-tooltip">
                  {!isAuthorized
                    ? "You must be logged in to solve the problem."
                    : "Solve the problem!"}
                </Tooltip>
              }
            >
              <span className="solve-button">
                <Button
                  variant="primary"
                  onClick={handleSolveProblem}
                  disabled={!isAuthorized}
                  style={{ pointerEvents: !isAuthorized ? "none" : "auto" }} // Ensures the button does not trigger events when disabled
                >
                  Solve
                </Button>
              </span>
            </OverlayTrigger>
          </Col>
        </Row>
        <Row className="mt-4">
          <div className="learn-divider mb-4"></div>
          <Col>
            Created by : <strong>{created_by}</strong>
          </Col>
          <Col>
            Category : <strong>{category}</strong>
          </Col>
          <Col>
            Difficulty:{" "}
            <span className="ms-2">
              {difficulty === "Easy" ? (
                <Badge bg="success">Easy </Badge>
              ) : difficulty === "Medium" ? (
                <Badge bg="warning">Medium </Badge>
              ) : (
                <Badge bg="danger">Hard </Badge>
              )}
            </span>
          </Col>
          <Col>
            <Rating value={ratingValue} onChange={ratingChange} />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default ProblemCard;
