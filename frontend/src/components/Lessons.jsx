import React, { useEffect, useState } from "react";
import api from "../api";
import Pagination from "react-bootstrap/Pagination";
import LearnCard from "./LearnCard";

const Lessons = ({ isAuthorized }) => {
  const [lessons, setLessons] = useState([]);
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [lessonsData, scoresData] = await Promise.all([
          getAllLessons(),
          getUserScores(),
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

  const getUserScores = async () => {
    try {
      const response = await api.get("/api/scores/");
      return response.data;
    } catch (error) {
      console.error("Error fetching scores:", error.message);
      return [];
    }
  };

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

  //   const cards = [
  //     { title: "Card 3", text: "Content for card 1", level: "Easy" },
  //     { title: "Card 2", text: "Content for card 2", level: "Medium" },
  //     { title: "Card 3", text: "Content for card 3", level: "Hard" },
  //     { title: "Card 4", text: "Content for card 4", level: "Hard" },
  //     { title: "Card 5", text: "Content for card 5", level: "Medium" },
  //     { title: "Card 6", text: "Content for card 6", level: "Hard" },
  //     { title: "Card 7", text: "Content for card 7", level: "Easy" },
  //   ];

  //   console.log(lessons);
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
  console.log(scores);
  console.log(lessons);

  const lessonScoreMap = scores.reduce((acc, score) => {
    acc[score.lesson] = score.score;
    return acc;
  }, {});

  return (
    <>
      {currentCards.map((lessons, index) => (
        <LearnCard
          key={index}
          title={lessons.title}
          text={lessons.description}
          level={lessons.difficulty}
          isAuthorized={isAuthorized}
          score={lessonScoreMap[lessons.title] || "0"}
        />
      ))}
      <Pagination className="justify-content-center">
        {renderPaginationItems()}
      </Pagination>
    </>
  );
};

export default Lessons;
