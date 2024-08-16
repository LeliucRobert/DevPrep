import React, { useEffect, useState } from "react";
import api from "../../api";
import Pagination from "react-bootstrap/Pagination";
import ProblemCard from "./ProblemCard";

const Problems = ({ isAuthorized }) => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const problemsData = await getAllProblems();
        setProblems(problemsData);
      } catch (error) {
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getAllProblems = async () => {
    try {
      const response = await api.get("/api/problems/");
      console.log(response.data);
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

  const currentCards = problems.slice(indexOfFirstCard, indexOfLastCard);

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
          output_desrciption={problems.output_description}
          restrictions={problems.restrictions}
          sample_input={problems.sample_input}
          sample_output={problems.sample_output}
          category={problems.category}
        />
      ))}
      <Pagination className="justify-content-center">
        {renderPaginationItems()}
      </Pagination>
    </>
  );
};

export default Problems;
