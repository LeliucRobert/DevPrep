import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Lessons from "../components/Learn/Lessons";
import FilterBy from "../components/Utils/FilterBy";
import SortBy from "../components/Utils/SortBy";
import ProblemCard from "../components/SolveProblems/ProblemCard";
import Problems from "../components/SolveProblems/Problems";
const SolveProblems = () => {
  return (
    <div>
      <Row className="learn-row"></Row>
      <Row className="learn-header mb-4">
        <Col lg="2"></Col>
        <Col lg="8">
          <Col>
            <div className="learn-title-container">
              <div className="learn-title-header">
                <h2 className="learn-title">Problems</h2>
                <div className="learn-actions">
                  <FilterBy type="Level" options={["Hard", "Easy", "Medium"]} />
                  <FilterBy
                    type="Category"
                    options={["BKT", "BFS", "DFS", "Dijkstra"]}
                  />
                  <SortBy />
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
          <Problems />
        </Col>
        <Col lg="2"></Col>
      </Row>
    </div>
  );
};

export default SolveProblems;
