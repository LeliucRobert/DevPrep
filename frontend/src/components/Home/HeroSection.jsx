import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../../styles/HeroSection.css";
import HeroTerminal from "./HeroTerminal";
import Typewriter from "typewriter-effect";

const HeroSection = () => {
  return (
    <>
      <Row className="hero-row1">
        <Col className="hero-col">
          <div className="hero-sitename">
            <img src="images/logo.png" /> DevPrep
          </div>

          <span className="hero-title">
            {" "}
            <Typewriter
              options={{
                strings: [
                  "Ace your coding interviews",
                  "Unlock Your Full Potential",
                  "Conquer Your Next Milestone",
                  "Empower Your Journey",
                ],
                autoStart: true,
                loop: true,
              }}
            />{" "}
          </span>
          <div className="terminal-container">
            <HeroTerminal />
          </div>
        </Col>
        <Col className="hero-col">
          <section class="hero">
            <div class="container">
              <div class="hero-content">
                <div class="hero-image-1">
                  <img src="images/hero-learning.png" alt="First Image" />
                </div>
                <div class="hero-image-2">
                  <img src="images/hero-problem.png" alt="Second Image" />
                </div>
              </div>
            </div>
          </section>
        </Col>
      </Row>
      <Row className="hero-row2">
        <Col lg="">
          <img
            src="images/hero-learning.png"
            alt=""
            className="hero-row2-images"
          ></img>
          <div className="hero-row2-text">Learning Phase</div>
        </Col>
        <Col lg="">
          <img
            src="images/hero-problem.png"
            alt=""
            className="hero-row2-images"
          ></img>
          <div className="hero-row2-text">Problem Solving</div>
        </Col>
        <Col lg="">
          <img
            src="images/hero-interview.png"
            alt=""
            className="hero-row2-images"
          ></img>
          <div className="hero-row2-text">Practicing Interviews</div>
        </Col>
      </Row>
    </>
  );
};

export default HeroSection;
