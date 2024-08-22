import React, { useEffect, useState } from "react";
import api from "../../api";
import Pagination from "react-bootstrap/Pagination";
import LearnCard from "./LearnCard";
import Loading from "../Utils/Loading";
import Error from "../Utils/Error";
const Lessons = ({ isAuthorized, selectedLevels = [], sortType }) => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const lessonsData = await getAllLessons();
        setLessons(lessonsData);
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "An unexpected error occurred. Please try again later!"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getAllLessons = async () => {
    try {
      const response = await api.get("/api/lessons/", {
        skipAuth: true,
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching lessons:", error.message);
      return [];
    }
  };

  const filteredLessons = lessons.filter((lesson) => {
    const matchesLevel =
      selectedLevels.length === 0 || selectedLevels.includes(lesson.difficulty);
    return matchesLevel;
  });

  const sortedLessons = [...filteredLessons].sort((a, b) => {
    if (sortType === "level-asc") {
      return a.difficulty > b.difficulty ? 1 : -1;
    } else if (sortType === "level-desc") {
      return a.difficulty < b.difficulty ? 1 : -1;
    } else if (sortType === "newest") {
      return a.created_at < b.created_at ? 1 : -1;
    } else if (sortType === "oldest") {
      return a.created_at > b.created_at ? 1 : -1;
    }
    return 0;
  });

  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 4;
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;

  const currentCards = sortedLessons.slice(indexOfFirstCard, indexOfLastCard);

  const totalPages = Math.ceil(lessons.length / cardsPerPage);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePageChange = (pageNumber) => {
    scrollToTop();
    setCurrentPage(pageNumber);
  };

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
      {currentCards.map((lessons, index) => (
        <LearnCard
          key={index}
          id={lessons.id}
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
