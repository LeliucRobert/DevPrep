import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../../styles/HeroSection.css";
import "../../styles/AboutLearnSection.css";
import Button from "react-bootstrap/Button";
const AboutLearnSection = () => {
  return (
    <>
      <Row className="about-learning">
        <Col className="hero-col">
          <img src="aboutlearning1.png" alt="" className="hero-img" />
        </Col>
        <Col className="hero-col">
          <div className="hero-sitename"></div>
          <span className="hero-title"> Start Your Learning Journey </span>
          <p className="hero-description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
            ut neque suscipit doloribus repellat est reiciendis necessitatibus,
            pariatur reprehenderit ea quaerat rem autem aliquid at culpa, cumque
            assumenda. Aliquam, error.
          </p>
          <Button variant="info" className="hero-button">
            Start Learning
          </Button>{" "}
        </Col>
      </Row>
    </>
  );
};

export default AboutLearnSection;
