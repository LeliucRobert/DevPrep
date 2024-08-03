import React, { useContext, useState } from "react";
import LearnCard from "../components/LearnCard";
import "../styles/Learn.css";
import Pagination from "react-bootstrap/Pagination";
import { AuthContext } from "../contexts/AuthContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FilterBy from "../components/FilterBy";
import SortBy from "../components/SortBy";
import api from "../api";
import Lessons from "../components/Lessons";

const Learn = () => {
  const { isAuthorized } = useContext(AuthContext);
  return (
    <div>
      <Row className="learn-row"></Row>
      <Row className="learn-header mb-4">
        <Col lg="2"></Col>
        <Col lg="8">
          <Col>
            <div className="learn-title-container">
              <div className="learn-title-header">
                <h2 className="learn-title">Lessons</h2>
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
          <Lessons isAuthorized={isAuthorized} />
        </Col>
        <Col lg="2"></Col>
      </Row>
    </div>
  );
};

export default Learn;
