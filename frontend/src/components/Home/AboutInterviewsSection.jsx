import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../../styles/HeroSection.css";

import "../../styles/AboutInterviewSection.css";
import Button from "react-bootstrap/Button";

const AboutInterviewsSection = () => {
  return (
    <Row className="hero-row">
      <Col className="hero-col">
        <div className="hero-sitename"></div>
        <span className="hero-title"> Practice Mock Interviews </span>
        <p className="hero-description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi ut
          neque suscipit doloribus repellat est reiciendis necessitatibus,
          pariatur reprehenderit ea quaerat rem autem aliquid at culpa, cumque
          assumenda. Aliquam, error.
        </p>
        <Button variant="info" className="hero-button">
          Practice Now
        </Button>{" "}
      </Col>
      <Col className="hero-col">
        <img
          src="public/images/aboutinterview1.png"
          alt=""
          className="hero-img"
        />
      </Col>
    </Row>
  );
};

export default AboutInterviewsSection;
