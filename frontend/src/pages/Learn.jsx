import React, { useContext, useState } from "react";
import LearnCard from "../components/Learn/LearnCard";
import "../styles/Learn.css";
import Pagination from "react-bootstrap/Pagination";
import { AuthContext } from "../contexts/AuthContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FilterBy from "../components/Utils/FilterBy";
import SortBy from "../components/Utils/SortBy";
import api from "../api";
import Lessons from "../components/Learn/Lessons";

const Learn = () => {
  const { isAuthorized } = useContext(AuthContext);
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [sortType, setSortType] = useState("oldest");

  const handleLevelChange = (levels) => {
    setSelectedLevels(levels);
  };

  const handleSortChange = (sortType) => {
    setSortType(sortType);
  };

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
                  <FilterBy
                    type="Level"
                    options={["Hard", "Easy", "Medium"]}
                    onFilterChange={handleLevelChange}
                  />
                  <FilterBy
                    type="Category"
                    options={["BKT", "BFS", "DFS", "Dijkstra"]}
                  />
                  <SortBy onSortChange={handleSortChange} />
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
          <Lessons
            isAuthorized={isAuthorized}
            selectedLevels={selectedLevels}
            sortType={sortType}
          />
        </Col>
        <Col lg="2"></Col>
      </Row>
    </div>
  );
};

export default Learn;
