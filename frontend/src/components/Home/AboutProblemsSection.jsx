import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../../styles/HeroSection.css";
import { useNavigate } from "react-router-dom";
import "../../styles/AboutProblemsSection.css";
import Button from "react-bootstrap/Button";

const AboutInterviewsSection = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/problems");
  };
  return (
    <Row className="about-problems">
      <Col className="hero-col">
        <div className="hero-sitename"></div>
        <span className="hero-title"> Master Problem-Solving Skills </span>
        <p className="hero-description">
          Sharpen your coding and analytical abilities with our extensive
          library of algorithmic challenges and real-world problems. Designed
          for all skill levels, our problem-solving platform is the perfect
          place to practice, learn, and grow.
        </p>
        <Button variant="info" className="hero-button" onClick={handleNavigate}>
          Solve Problems
        </Button>{" "}
      </Col>
      <Col className="hero-col">
        <img src="images/heroo2.png" alt="" className="hero-img" />
      </Col>
    </Row>
  );
};

export default AboutInterviewsSection;
