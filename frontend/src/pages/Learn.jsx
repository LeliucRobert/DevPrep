import React, { useContext, useState } from "react";
import LearnCard from "../components/LearnCard";
import "../styles/Learn.css";
import Pagination from "react-bootstrap/Pagination";
import { AuthContext } from "../contexts/AuthContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FilterBy from "../components/FilterBy";
import SortBy from "../components/SortBy";

const Learn = () => {
  const { isAuthorized } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 4;
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;

  const cards = [
    { title: "Card 1", text: "Content for card 1", level: "Easy" },
    { title: "Card 2", text: "Content for card 2", level: "Medium" },
    { title: "Card 3", text: "Content for card 3", level: "Hard" },
    { title: "Card 4", text: "Content for card 4", level: "Hard" },
    { title: "Card 5", text: "Content for card 5", level: "Medium" },
    { title: "Card 6", text: "Content for card 6", level: "Hard" },
    { title: "Card 7", text: "Content for card 7", level: "Easy" },
  ];

  const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(cards.length / cardsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const renderPaginationItems = () => {
    let items = [];
    for (let number = 1; number <= totalPages; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
    return items;
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
          {currentCards.map((card, index) => (
            <LearnCard
              key={index}
              title={card.title}
              text={card.text}
              level={card.level}
              isAuthorized={isAuthorized}
            />
          ))}
        </Col>
        <Col lg="2"></Col>
      </Row>
      <Row>
        <Pagination className="justify-content-center">
          {renderPaginationItems()}
        </Pagination>
      </Row>
    </div>
  );
};

export default Learn;
