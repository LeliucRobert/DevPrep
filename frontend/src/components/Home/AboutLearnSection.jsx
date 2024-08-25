import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../../styles/HeroSection.css";
import "../../styles/AboutLearnSection.css";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const AboutLearnSection = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/learn");
  };
  return (
    <>
      <Row className="about-learning">
        <Col className="hero-col">
          <img src="images/heroo11.png" alt="" className="hero-img" />
        </Col>
        <Col className="hero-col">
          <div className="hero-sitename"></div>
          <span className="hero-title"> Start Your Learning Journey </span>
          <p className="hero-description">
            Explore Topics Delve into a wide range of subjects, from
            foundational concepts to advanced techniques, all designed to build
            your knowledge and confidence.
          </p>
          <Button
            variant="info"
            className="hero-button"
            onClick={handleNavigate}
          >
            Start Learning
          </Button>{" "}
        </Col>
      </Row>
    </>
  );
};

export default AboutLearnSection;
