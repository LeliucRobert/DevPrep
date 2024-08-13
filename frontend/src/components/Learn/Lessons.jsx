import React, { useEffect, useState } from "react";
import api from "../../api";
import Pagination from "react-bootstrap/Pagination";
import LearnCard from "./LearnCard";

const Lessons = ({ isAuthorized }) => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [lessonsData, scoresData] = await Promise.all([
          getAllLessons(),
          setLoading(false),
        ]);
        setLessons(lessonsData);
        setScores(scoresData);
      } catch (error) {
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getAllLessons = async () => {
    try {
      const response = await api.get("/api/lessons/");

      return response.data;
    } catch (error) {
      console.error("Error fetching lessons:", error.message);
      return [];
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 4;
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;

  const currentCards = lessons.slice(indexOfFirstCard, indexOfLastCard);

  const totalPages = Math.ceil(lessons.length / cardsPerPage);

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
    <>
      {currentCards.map((lessons, index) => (
        <LearnCard
          key={index}
          title={lessons.title}
          text={lessons.description}
          level={lessons.difficulty}
          isAuthorized={isAuthorized}
          lessonId={lessons.id}
        />
      ))}
      <Pagination className="justify-content-center">
        {renderPaginationItems()}
      </Pagination>
    </>
  );
};

export default Lessons;
