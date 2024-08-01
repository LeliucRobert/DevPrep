import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import "../styles/LearnCard.css";
import ProgressBar from "react-bootstrap/ProgressBar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";

const LearnCard = ({ title, text, level, isAuthorized }) => {
  return (
    <Card border="secondary" className="mb-3">
      <Card.Header as="h5" className="learn-card-header">
        <Col lg={2}>
          <div className="me-3">Featured</div>
        </Col>
        <Col>
          {level === "Easy" ? (
            <Badge bg="success">Easy Level</Badge>
          ) : level === "Medium" ? (
            <Badge bg="warning">Medium Level</Badge>
          ) : (
            <Badge bg="danger">Hard Level</Badge>
          )}
        </Col>
      </Card.Header>
      <Card.Body>
        <Row className="mb-3">
          <Card.Title>{title}</Card.Title>
        </Row>

        <Card.Text>{text}</Card.Text>
        <Row className="mb-4">
          <Col>
            <ProgressBar now={50} label="50%" />
          </Col>
        </Row>

        <Row>
          <Col>
            {isAuthorized ? (
              <Button variant="primary" className="w-100">
                Start Lesson
              </Button>
            ) : (
              <Alert key="danger" variant="danger" className="custom-alert">
                You must Log In to acces this!
              </Alert>
            )}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
export default LearnCard;
