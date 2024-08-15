import React from "react";
import { Alert } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "../../styles/SolveProblems/ProblemCard.css";
import { useState } from "react";
import { Rating } from "primereact/rating";
import { Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
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
}) => {
  const [value, setValue] = useState(0);
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
            <Alert variant="dark" className="idAlert mb-0">
              0/100
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
            <Button
              variant="primary"
              className="solve-button"
              onClick={handleSolveProblem}
            >
              Solve
            </Button>
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
            <Rating value={value} onChange={(e) => setValue(e.value)} />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default ProblemCard;
