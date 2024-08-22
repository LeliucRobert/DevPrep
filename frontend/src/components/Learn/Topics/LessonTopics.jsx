import React, { useEffect, useState, useContext } from "react";
import api from "../../../api";
import Pagination from "react-bootstrap/Pagination";
import LessonTopicCard from "./LessonTopicCard";
import { AuthContext } from "../../../contexts/AuthContext";
import Loading from "../../Utils/Loading";
import Error from "../../Utils/Error";

const LessonTopics = ({ lesson_id }) => {
  const { isAuthorized } = useContext(AuthContext);

  const [topics, setTopics] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`api/lessons/${lesson_id}/topics/`);
        const topicsData = response.data;

        setTopics(topicsData);
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "An unexpected error occurred. Please try again later!"
        );
      } finally {
        setLoading(false);
      }
    };

    if (isAuthorized) {
      fetchData();
    }
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
    return <Loading />;
  }
  if (error) {
    return <Error message={error} />;
  }
  return (
    <>
      {currentCards.map((topics, index) => (
        <LessonTopicCard
          key={index}
          topicId={topics.id}
          topicContent={topics.content}
          topicTitle={topics.title}
        />
      ))}

      <Pagination className="justify-content-center">
        {renderPaginationItems()}
      </Pagination>
    </>
  );
};

export default LessonTopics;
