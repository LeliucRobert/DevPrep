import React from "react";
import { useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../styles/LessonPage.css";
import Button from "react-bootstrap/Button";
import { useLocation, useNavigate } from "react-router-dom";
import LessonTopicCard from "../components/Learn/Topics/LessonTopicCard";
import LessonTopics from "../components/Learn/Topics/LessonTopics";

const LessonPage = () => {
  const { title } = useParams();

  const location = useLocation();

  const { lessonId } = location.state;

  const navigate = useNavigate();

  const handleGoToLearnPage = () => {
    navigate("/learn/");
  };

  return (
    <>
      <Row className="learn-row"></Row>
      <Row className="learn-header mb-4">
        <Col lg="2"></Col>
        <Col lg="8">
          <Col>
            <div className="learn-title-container">
              <div className="learn-title-header">
                <h2 className="learn-title">{title}</h2>
                <div className="learn-actions">
                  <Button variant="primary" onClick={handleGoToLearnPage}>
                    Back
                  </Button>{" "}
                </div>
              </div>
            </div>
            <div className="learn-divider"></div>
          </Col>
        </Col>
        <Col lg="2"></Col>
      </Row>
      <Row>
        <Col lg="2"></Col>
        <Col>
          <LessonTopics lesson_id={lessonId} />
        </Col>
        <Col lg="2"></Col>
      </Row>
    </>
  );
};

export default LessonPage;
