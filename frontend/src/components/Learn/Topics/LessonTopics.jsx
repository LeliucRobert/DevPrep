import React, { useEffect } from "react";
import { useState } from "react";
import api from "../../../api";
import Pagination from "react-bootstrap/Pagination";
import LessonTopicCard from "./LessonTopicCard";

const LessonTopics = ({ lesson_id }) => {
  const [topics, setTopics] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`api/lessons/${lesson_id}/topics/`);
        const topicsData = response.data;
        setLoading(false);
        setTopics(topicsData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 4;
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;

  const currentCards = topics.slice(indexOfFirstCard, indexOfLastCard);

  const totalPages = Math.ceil(topics.length / cardsPerPage);

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

  if (loading) {
    return <p>Loading quiz data...</p>; // Render loading message while data is being fetched
  }

  return (
    <>
      {currentCards.map((topics, index) => (
        <LessonTopicCard
          key={index}
          topicId={topics.id}
          topicContent={topics.content}
        />
      ))}

      <Pagination className="justify-content-center">
        {renderPaginationItems()}
      </Pagination>
    </>
  );
};

export default LessonTopics;
