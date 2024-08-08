import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../../styles/HeroSection.css";
import Button from "react-bootstrap/Button";

const HeroSection = () => {
  return (
    <Row className="hero-row">
      <Col className="hero-col">
        <div className="hero-sitename"></div>
        <span className="hero-title">
          {" "}
          Ace your Interviews and Master Problem Solving{" "}
        </span>
        <p className="hero-description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi ut
          neque suscipit doloribus repellat est reiciendis necessitatibus,
          pariatur reprehenderit ea quaerat rem autem aliquid at culpa, cumque
          assumenda. Aliquam, error.
        </p>
        <Button variant="info" className="hero-button">
          Get Started
        </Button>{" "}
      </Col>
      <Col className="hero-col">
        <img src="public/images/hero2.png" alt="" className="hero-img" />
      </Col>
    </Row>
  );
};

export default HeroSection;
