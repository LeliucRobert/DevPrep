import React, { useEffect, useState } from "react";
import api from "../../api";
import Pagination from "react-bootstrap/Pagination";
import ProblemCard from "./ProblemCard";
import Loading from "../Utils/Loading";
import Error from "../Utils/Error";

const Problems = ({
  isAuthorized,
  selectedLevels = [],
  selectedCategories = [],
  sortType,
}) => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const problemsData = await getAllProblems();
        setProblems(problemsData);
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

  const getAllProblems = async () => {
    try {
      const response = await api.get("/api/problems/", { skipAuth: true });
      return response.data;
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "An unexpected error occurred. Please try again later!"
      );
      return [];
    }
  };

  const filteredProblems = problems.filter((problem) => {
    const matchesLevel =
      selectedLevels.length === 0 ||
      selectedLevels.includes(problem.difficulty);
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(problem.category);
    return matchesLevel && matchesCategory;
  });

  const sortedProblems = [...filteredProblems].sort((a, b) => {
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

  const currentCards = sortedProblems.slice(indexOfFirstCard, indexOfLastCard);

  const totalPages = Math.ceil(problems.length / cardsPerPage);

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
      {currentCards.map((problems, index) => (
        <ProblemCard
          key={index}
          id={problems.id}
          title={problems.title}
          card_description={problems.card_description}
          created_by={problems.created_by.username}
          description={problems.description}
          difficulty={problems.difficulty}
          input_description={problems.input_description}
          output_description={problems.output_description}
          restrictions={problems.restrictions}
          sample_input={problems.sample_input}
          sample_output={problems.sample_output}
          category={problems.category}
          isAuthorized={isAuthorized}
        />
      ))}
      <Pagination className="justify-content-center">
        {renderPaginationItems()}
      </Pagination>
    </>
  );
};

export default Problems;
