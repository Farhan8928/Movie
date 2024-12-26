import React, { useState } from "react";
import { useSelector } from "react-redux";
import Card from "./Card";
import Pagination from "./Pagination";

const Home = () => {
  const { movies, searchQuery } = useSelector((state) => state.movies);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 10;

  const filteredMovies = movies.filter((movie) =>
    movie.original_title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);
  const startIndex = (currentPage - 1) * moviesPerPage;
  const paginatedMovies = filteredMovies.slice(
    startIndex,
    startIndex + moviesPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="cards-container">
      {paginatedMovies.map((movie) => (
        <Card key={movie.id} {...movie} />
      ))}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Home;
