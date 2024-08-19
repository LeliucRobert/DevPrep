import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Lessons from "../components/Learn/Lessons";
import FilterBy from "../components/Utils/FilterBy";
import SortBy from "../components/Utils/SortBy";
import ProblemCard from "../components/SolveProblems/ProblemCard";
import Problems from "../components/SolveProblems/Problems";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import { useState } from "react";

const SolveProblems = () => {
  const { isAuthorized } = useContext(AuthContext);
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortType, setSortType] = useState("oldest");

  const handleLevelChange = (levels) => {
    setSelectedLevels(levels);
  };

  const handleCategoryChange = (categories) => {
    setSelectedCategories(categories);
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
                <h2 className="learn-title">Problems</h2>
                <div className="learn-actions">
                  <FilterBy
                    type="Level"
                    options={["Hard", "Easy", "Medium"]}
                    onFilterChange={handleLevelChange}
                  />
                  <FilterBy
                    type="Category"
                    options={["other", "greedy", "graph", "Dijkstra"]}
                    onFilterChange={handleCategoryChange}
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
          <Problems
            isAuthorized={isAuthorized}
            selectedLevels={selectedLevels}
            selectedCategories={selectedCategories}
            sortType={sortType}
          />
        </Col>
        <Col lg="2"></Col>
      </Row>
    </div>
  );
};

export default SolveProblems;
